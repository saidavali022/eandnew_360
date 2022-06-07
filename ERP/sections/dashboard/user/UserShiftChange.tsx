import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  ListItemAvatar,
  Avatar,
  Card,
  Grid,
  MenuItem,
  FormControl,
  InputLabel,
  Checkbox,
  ListItemText,
  OutlinedInput,
  TextField,
  Chip,
} from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import axios, { toast } from "@utils/defaultImports";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";

import {
  fTime,
  fDateTimeSuffix,
  fDistanceInHrsAndMinutes,
} from "@utils/formatTime";
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function UserShiftChange() {
  const [department, setDepartment] = useState(null);
  const [rows, setRows] = useState([]);
  const [shift_in, setShiftStart] = useState<Date | null>(null);
  const [shift_out, setShiftEnd] = useState<Date | null>(null);
  const [selectedUsers, setSelectedUsers] = useState<string[] | null>([]);
  const [formData, setformData] = useState({});
  useEffect(() => {
    getUserShifts();
  }, [department]);

  const getUserShifts = () => {
    axios
      .get(`/shifts`, {
        params: {
          department: department,
        },
      })
      .then((res: any) => {
        setRows(res.data);
      })
      .catch((err: any) => {
        console.error(err);
      });
  };

  const handleDepartmentChange = (event: SelectChangeEvent) => {
    setDepartment(event.target.value as string);
  };

  const handleUserChange = (event: SelectChangeEvent<typeof selectedUsers>) => {
    const {
      target: { value },
    } = event;
    setSelectedUsers(typeof value === "string" ? value.split(",") : value);
    setformData({ ...formData, employees: value });
  };

  const handleClearForm = () => {
    setDepartment(null);
    setSelectedUsers([]);
    setShiftStart(null);
    setShiftEnd(null);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    axios({
      method: "post",
      url: "/shifts",
      data: formData,
    })
      .then(function (response: any) {
        if (response.status === 201) {
          toast.success("success", {
            theme: "colored",
          });
          handleClearForm();
          getUserShifts();
        } else {
          toast.error("Error", {
            theme: "colored",
          });
        }
      })
      .catch(function (error: any) {
        console.error(error.response.data);
      });
  };

  const columns: GridColDef[] = [
    // {
    //   field: "id",
    //   hide: true,
    //   hideable: false,
    // },
    {
      field: "employee_id",
      headerName: "EMP ID",
      minWidth: 250,
      type: "string",
    },
    {
      field: "username",
      headerName: "User Name",
      minWidth: 150,
    },
    {
      field: "shift_in",
      headerName: "Shift In",
      width: 90,
      valueGetter: (params: GridValueGetterParams) => {
        return fTime(params.row.shifts[0]?.shift_in);
      },
    },
    {
      field: "shift_out",
      headerName: "Shift Out",
      width: 90,
      valueGetter: (params: GridValueGetterParams) => {
        return fTime(params.row.shifts[0]?.shift_out);
      },
    },
    {
      field: "created",
      headerName: "Last Updated",
      minWidth: 170,
      valueGetter: (params: GridValueGetterParams) => {
        return fDateTimeSuffix(params.row.shifts[0]?.created_at);
      },
    },
  ];

  return (
    <>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <Grid
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="flex-start"
          spacing={2}
          sx={{ marginBottom: 1 }}
        >
          <Grid item xs={12} sm={6} md={4}>
            <FormControl sx={{ minWidth: 300 }} fullWidth>
              <InputLabel id="demo-simple-select-label">Department</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="department"
                value={department == null ? "All" : department}
                label="Department"
                onChange={handleDepartmentChange}
              >
                <MenuItem value={null}>All</MenuItem>
                <MenuItem value="human resource management">
                  Human Resource Management
                </MenuItem>
                <MenuItem value="software development">
                  Software Development
                </MenuItem>
                <MenuItem value="lead generation">Lead Generation</MenuItem>
                <MenuItem value="tech support">Tech Support</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <FormControl sx={{ minWidth: 300 }} fullWidth>
              <InputLabel id="multiple-checkbox-label">Employees</InputLabel>
              <Select
                labelId="multiple-checkbox-label"
                id="multiple-checkbox"
                name="employees"
                multiple
                value={selectedUsers}
                onChange={handleUserChange}
                input={<OutlinedInput label="Chip" />}
                renderValue={(selected) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
                MenuProps={MenuProps}
              >
                {rows.map((user) => (
                  <MenuItem key={user.id} value={user.employee_id}>
                    <Checkbox
                      checked={selectedUsers.includes(user.employee_id)}
                    />
                    <ListItemAvatar>
                      <Avatar alt={user.username} src="" />
                    </ListItemAvatar>
                    <ListItemText
                      primary={user.username}
                      secondary={
                        <>
                          <Typography>{user.employee_id}</Typography>
                          <Typography>
                            {fTime(user.shifts[0]?.shift_in)}{" "}
                            {fTime(user.shifts[0]?.shift_out)}
                          </Typography>
                        </>
                      }
                    />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} sm={4} md={2}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <TimePicker
                label="Shift Start"
                name="shift_in"
                value={shift_in}
                onChange={(newValue) => {
                  setShiftStart(newValue);
                  setformData({ ...formData, shift_in: newValue });
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Grid>
          <Grid
            item
            xs={6}
            sm={2}
            sx={{ marginTop: "auto", marginBottom: "auto" }}
          >
            {shift_in && shift_out != null
              ? fDistanceInHrsAndMinutes(
                  shift_out.toString(),
                  shift_in.toString()
                )
              : "0 Hrs"}
          </Grid>
          <Grid item xs={6} sm={4} md={2}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <TimePicker
                label="Shift End"
                name="shift_out"
                value={shift_out}
                onChange={(newValue) => {
                  setShiftEnd(newValue);
                  setformData({ ...formData, shift_out: newValue });
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item sx={{ marginTop: "auto", marginBottom: "auto" }}>
            <Button variant="contained" onClick={handleClearForm}>
              Clear
            </Button>
          </Grid>
          <Grid item sx={{ marginTop: "auto", marginBottom: "auto" }}>
            <Button variant="contained" type="submit">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
      <Card
        sx={{
          width: 1,
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          // components={{ Toolbar: GridToolbar }}
          hideFooter={true}
          autoHeight={true}
          disableColumnMenu
        />
      </Card>
    </>
  );
}

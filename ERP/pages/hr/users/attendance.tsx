import { filter } from "lodash";
import { sentenceCase } from "change-case";
import { useState, useEffect, useMemo } from "react";
import type { ReactElement } from "react";
import DashboardLayout from "@layouts/dashboard";
import { differenceInMinutes } from "date-fns";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useSelector } from "react-redux";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import {
  fDate,
  fTime,
  fToNow,
  fformatRelative,
  fTimeDistanceInMinutes,
  fdifferenceInMinutes,
  fDistanceInHrsAndMinutes,
  fMinutesToWords,
  fSubMinutes,
  fAddHours,
} from "@utils/formatTime";
import NextLink from "next/link";
import { getSession, useSession } from "next-auth/react";
import { IBreak } from "@utils/interfaces/common";
// material
import {
  Card,
  Stack,
  Grid,
  Container,
  Typography,
  Button,
  Breadcrumbs,
  TextField,
  Avatar,
  Autocomplete,
  CircularProgress,
  ButtonBase,
} from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import {
  DataGrid,
  GridToolbar,
  GridColDef,
  GridValueGetterParams,
  GridRenderCellParams,
} from "@mui/x-data-grid";
// components
import Page from "@components/Page";
import Label from "@components/Label";
import {
  colorStatusPriority,
  renderBreakPills,
  getTotalBreakTime,
} from "@utils/pillColor";

const rows = [
  {
    id: "e69d9e5d-1aca-55ab-918f-faf1991b0090",
    log_in: "2022-04-12T02:30:45.738Z",
    log_out: "2022-04-12T12:50:45.738Z",
    employee_id: "END1111",
    breaks: [
      {
        break_start: "2022-04-12T02:30:00.000Z",
        break_end: "2022-04-12T02:45:45.738Z",
      },
      {
        break_start: "2022-04-12T05:00:00.000Z",
        break_end: "2022-04-12T05:45:45.738Z",
      },
    ],
  },
  {
    id: "e69d9e5d-1aca-55ab-918f-faf1991b0091",
    log_in: "2022-04-13T02:30:45.738Z",
    log_out: "2022-04-13T12:50:45.738Z",
    employee_id: "END1111",
    breaks: [
      {
        break_start: "2022-04-13T02:30:00.000Z",
        break_end: "2022-04-13T02:45:45.738Z",
      },
      {
        break_start: "2022-04-13T05:00:00.000Z",
        break_end: "2022-04-13T05:50:45.738Z",
      },
    ],
  },
];
interface Employee {
  id: string;
  sudo_name: string;
  name: string;
}

function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

const EmployeesList = [
  {
    id: "END1111",
    sudo_name: "Robert Smith",
    name: "Mohammed",
    profile_img: "/assets/images/avatar/1.jpg",
  },
  {
    id: "END1112",
    sudo_name: "Jonney Max",
    name: "Tarassal",
    profile_img: "/assets/images/avatar/1.jpg",
  },
  {
    id: "END1113",
    sudo_name: "Saif Smart",
    name: "Smart",
    profile_img: "/assets/images/avatar/1.jpg",
  },
  {
    id: "END1114",
    sudo_name: "Martin Cook",
    name: "Minhaj",
    profile_img: "/assets/images/avatar/1.jpg",
  },
  {
    id: "END1115",
    sudo_name: "Albert Wilson",
    name: "Shaik",
    profile_img: "/assets/images/avatar/1.jpg",
  },
];

export default function Attendance() {
  const globalState = useSelector((state) => state.globalState);
  const [presentUser, setPresentUser] = useState({});
  const [calDate, setCalDate] = useState<Date | null>(new Date());
  const [designation, setDesignation] = useState("");
  const [employeeId, setEmployeeId] = useState("END1111");
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<readonly Employee[]>([]);
  const loading = open && options.length === 0;
  const handleUserSelect = (event: SelectChangeEvent) => {
    setEmployeeId(event.target.value);
  };
  // useEffect(() => {
  //   if (!open) {
  //     setOptions([]);
  //   }
  // }, [open]);
  useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      // await sleep(1e3); // For demo purposes.

      if (active) {
        setOptions([...EmployeesList]);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  const handleCalDateChange = (newValue: Date | null) => {
    setCalDate(newValue);
  };

  const columns: GridColDef[] = [
    {
      field: "id",
      hide: true,
      hideable: false,
    },
    {
      field: "date_in",
      headerName: "Date",
      type: "date",
      width: 100,
      hideable: false,
      valueGetter: (params: GridValueGetterParams) =>
        params.row?.log_in && new Date(params.row.date_in),
    },
    {
      field: "shift_in",
      headerName: "Shift In",
      minWidth: 90,
      type: "string",
      valueGetter: (params: GridValueGetterParams) => {
        return fTime(params.row.shift_in);
      },
    },
    {
      field: "log_in",
      headerName: "Log In",
      width: 90,
      valueGetter: (params: GridValueGetterParams) => {
        return fTime(params.row.log_in);
      },
    },
    {
      field: "breaks",
      headerName: "Breaks",
      minWidth: 150,
      flex: 1,
      renderCell: (params: GridRenderCellParams) =>
        renderBreakPills(params.row.breaks),
    },
    {
      field: "shift_out",
      headerName: "Shift Out",
      minWidth: 90,
      type: "string",
      valueGetter: (params: GridValueGetterParams) => {
        return fTime(params.row.shift_out);
      },
    },
    {
      field: "log_out",
      headerName: "Log Out",
      width: 90,
      valueGetter: (params: GridValueGetterParams) => {
        if (params.row.log_out == null) {
          return "-";
        }
        return fTime(params.row.log_out);
      },
    },
    {
      field: "over_time",
      headerName: "Over Time",
      minWidth: 90,
      flex: 1,
      valueGetter: (params: GridValueGetterParams) => {
        // return fdifferenceInMinutes(params.row.shift_out, params.row.shift_in);
        if (params.row.log_out == null) {
          return "-";
        }

        let department = globalState?.department;
        const shiftMinutes = fdifferenceInMinutes(
          params.row.shift_out,
          params.row.shift_in
        );
        const workedMinute = fdifferenceInMinutes(
          params.row.log_out,
          params.row.log_in
        );
        let over_time_minutes = workedMinute - shiftMinutes;
        console.info(
          "user over time ",
          over_time_minutes,
          workedMinute,
          shiftMinutes
        );
        console.info("department", department);
        if (department === "software development" && over_time_minutes > 30) {
          return fMinutesToWords(over_time_minutes);
        }

        if (
          ["lead generation", "tech support"].includes(department) &&
          over_time_minutes > 60
        ) {
          return fMinutesToWords(over_time_minutes);
        }

        return "-";
      },
    },
    {
      field: "total_break",
      headerName: "Total Break",
      minWidth: 130,
      valueGetter: (params: GridValueGetterParams) => {
        return fMinutesToWords(getTotalBreakTime(params.row.breaks));
      },
    },
    {
      field: "total_available_time",
      headerName: "Total Available Time",
      minWidth: 150,
      flex: 1,
      valueGetter: (params: GridValueGetterParams) => {
        return fDistanceInHrsAndMinutes(params.row.log_out, params.row.log_in);
      },
    },
    {
      field: "total_work_hours",
      headerName: "Total Work Hours",
      minWidth: 150,
      flex: 1,
      valueGetter: (params: GridValueGetterParams) => {
        return fDistanceInHrsAndMinutes(
          fSubMinutes(params.row.log_out, getTotalBreakTime(params.row.breaks)),
          params.row.log_in
        );
      },
    },
  ];

  return (
    <Page title="Attendance | E & D 360">
      <Container maxWidth="false">
        <Stack
          direction="row"
          alignItems="start"
          justifyContent="space-between"
          mb={5}
        >
          {" "}
          <Stack
            direction="column"
            alignItems="start"
            justifyContent="space-between"
          >
            <Typography variant="h4" gutterBottom>
              Attendance
            </Typography>
            <Breadcrumbs aria-label="breadcrumb">
              <NextLink href="/hr">Dashboard</NextLink>
              <Typography color="text.primary">Attendance</Typography>
            </Breadcrumbs>
          </Stack>
        </Stack>

        <Grid container spacing={2} sx={{ paddingBottom: 2 }}>
          <Grid item>
            <ButtonBase sx={{ width: 100, height: 100 }}>
              <Avatar
                alt="Robert Smith"
                src="/static/images/avatar/1.jpg"
                sx={{ width: 100, height: 100 }}
              />
            </ButtonBase>
          </Grid>
          <Grid item xs="auto" md={3} container direction="column" spacing={2}>
            <Grid item>
              <Typography gutterBottom variant="subtitle1" component="div">
                {presentUser?.username}
              </Typography>
              <Typography variant="body2" gutterBottom>
                SUDO NAME: {presentUser?.sudo_name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                ID: {presentUser?.employee_id}
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs={12} md="auto" sx={{ padding: 2 }}>
              <Autocomplete
                id="asynchronous-demo"
                sx={{ width: 300 }}
                open={open}
                onOpen={() => {
                  setOpen(true);
                }}
                onClose={() => {
                  setOpen(false);
                }}
                isOptionEqualToValue={(option, value) =>
                  option.sudo_name === value.sudo_name
                }
                value={employeeId}
                onChange={handleUserSelect}
                getOptionLabel={(option) => option.sudo_name}
                options={options}
                loading={loading}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Employee"
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <>
                          {loading ? (
                            <CircularProgress color="inherit" size={20} />
                          ) : null}
                          {params.InputProps.endAdornment}
                        </>
                      ),
                    }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md="auto" sx={{ padding: 2 }}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  views={["year", "month"]}
                  label="Year and Month"
                  maxDate={new Date()}
                  value={calDate}
                  onChange={handleCalDateChange}
                  renderInput={(params) => (
                    <TextField {...params} helperText={null} />
                  )}
                />
              </LocalizationProvider>
            </Grid>
          </Grid>
        </Grid>
        <Card
          sx={{
            height: 350,
            width: 1,
          }}
        >
          {" "}
          <DataGrid
            rows={rows}
            columns={columns}
            components={{ Toolbar: GridToolbar }}
            hideFooter={true}
            disableColumnMenu
          />
        </Card>
      </Container>
    </Page>
  );
}

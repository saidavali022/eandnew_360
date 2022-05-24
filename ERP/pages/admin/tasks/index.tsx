import { useEffect, useState } from "react";
import styles from "@styles/Users.module.css";
import Drawer from "@mui/material/Drawer";
import Iconify from "@components/Iconify";
import { useSelector, useDispatch } from "react-redux";
import DashboardLayout from "@layouts/dashboard";
import axios, { toast, ToastContainer_box } from "@utils/defaultImports";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridToolbar,
} from "@mui/x-data-grid";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

// material
import {
  Stack,
  Button,
  Container,
  Typography,
  Breadcrumbs,
  Box,
  TextField,
  MenuItem,
  Menu,
} from "@mui/material";
// components
import Page from "@components/Page";
import { useMemo } from "react";
import NextLink from "next/link";
//-----------------------

export default function Task() {
  const [editId, setEditId] = useState();
  const [rowData, setrowData] = useState([]);
  const [anchor, setanchor] = useState(false);
  const [InputDate, setInputDate] = useState("text");
  const [optionEmp, setoptionEmp] = useState("");
  const [priorityTeam, setpriorityTeam] = useState("");
  const [departments, setdepartments] = useState();

  const [designationData, setDesignationData] = useState([]);

  const [userData, setuserData] = useState([]);
  const changeoptionEmp = (event: any) => {
    setoptionEmp(event.target.value);
  };

  const changepriorityTeam = (event: any) => {
    setpriorityTeam(event.target.value);
  };

  const [optionTeam, setoptionTeam] = useState("");
  const changeoptionTeam = (event: any) => {
    setoptionTeam(event.target.value);
    designation(event.target.value);
  };

  const designation = (value) => {
    const Data = userData.filter((item, index) => item.department == value);
    console.log(Data);
    setDesignationData(Data);
  };

  const [formData, setformData] = useState();

  const getFormData = (event: any) => {
    // setformData({ ...formData, [event.target.name]: event.target.value });
    if (event.target.name == "file") {
      setformData({
        ...formData,
        [event.target.name]: event.target.files[0],
      });
    } else {
      setformData({ ...formData, [event.target.name]: event.target.value });
    }
  };

  const submitFormData = (event: any) => {
    event.preventDefault();
    const formBindData = new FormData();
    formBindData.append("title", formData.title);
    formBindData.append("description", formData.description);
    formBindData.append("file", formData.file);
    formBindData.append("attachment", formData.attachment);
    formBindData.append("team", formData.team);
    formBindData.append("priority", formData.priority);
    formBindData.append("employee_id", formData.employee_id);
    formBindData.append("start_date", formData.start_date);
    formBindData.append("end_date", formData.end_date);
    const id = formData.id || 0;
    axios({
      method: "post",
      url: `${"/tasks/" + id}`,
      data: formBindData,
    })
      .then(function (response: any) {
        event.target.reset();
        if (response.status === 200) {
          getTasklist();
          toast.success("success", {
            theme: "colored",
          });
        }
      })
      .catch(function (error: any) {
        toast.error("error");
      });
  };

  const getTasklist = () => {
    axios({
      method: "get",
      url: "/tasks/",
    })
      .then(function (response: any) {
        if (response.status === 200) {
          setrowData(response.data.data);
        }
      })
      .catch(function (error: any) {});
  };

  const getuserData = () => {
    axios({
      method: "get",
      url: "/users/info/",
    })
      .then(function (response: any) {
        if (response.status === 200) {
          setuserData(response.data);
        }
      })
      .catch(function (error: any) {});
  };

  useEffect(() => {
    getTasklist();
    getuserData();
    // getDepartments();
  }, []);

  const departmentsData = userData.filter(
    (thing, index, self) =>
      index === self.findIndex((t) => t.department === thing.department)
  );

  const deleteTask = (event: Event) => {
    axios({
      method: "delete",
      url: `${"/tasks/" + event.target.id}`,
    }).then(function (response: any) {
      if (response.status === 200) {
        getTasklist();
        toast.success("success", {
          theme: "colored",
        });
      }
    });
  };
  useMemo(() => {
    const editDate = rowData.filter(
      (rowData: any) => rowData.id == editId || 0
    );
    if (editDate[0]) setformData(editDate[0]);
  }, [editId]);

  const columns: GridColDef[] = [
    { field: "id", headerName: "S.No", width: 100, hide: true },
    { field: "team", headerName: "Team", width: 250 },
    { field: "employee_id", headerName: "Employee id", width: 250 },
    { field: "priority", headerName: "priority", width: 250 },
    { field: "title", headerName: "Title", width: 250 },

    { field: "status", headerName: "Status", width: 250 },
    {
      field: "start_date",
      headerName: "Start Date",
      width: 250,
      renderCell: (params: GridRenderCellParams) =>
        moment(params.row.start_date).utc().format("DD-MM-YYYY"),
    },
    {
      field: "end_date",
      headerName: "End Date",
      width: 250,
      renderCell: (params: GridRenderCellParams) =>
        moment(params.row.end_date).utc().format("DD-MM-YYYY"),
    },

    {
      field: "action",
      headerName: "Action",
      type: "actions",
      width: 220,
      renderCell: renderAction,
    },
  ];

  // value={moment(formData?.end_date).utc().format("DD-MM-YYYY")}
  // console.log(store.getState());

  // const todo = useSelector((state) => state.changeNumber);
  // const dispatch = useDispatch();

  function renderAction(params: GridRenderCellParams) {
    return (
      <Stack direction="row" spacing={2}>
        <Button
          variant="contained"
          color="error"
          id={params.id}
          onClick={deleteTask}
          startIcon={<DeleteIcon />}
        >
          Delete
        </Button>
        <Button
          variant="contained"
          color="success"
          id={params.id}
          onClick={() => {
            setanchor(true);
            setEditId(params.id);
          }}
          startIcon={<EditIcon />}
        >
          Edit
        </Button>
      </Stack>
    );
  }

  return (
    <Page title="User | E&amp;D 360">
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={5}
      >
        <Stack
          direction="column"
          alignItems="start"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            Tasks
          </Typography>
          <Breadcrumbs aria-label="breadcrumb">
            <NextLink color="inherit" href="/admin">
              Dashboard
            </NextLink>
            <Typography color="text.primary">Tasks</Typography>
          </Breadcrumbs>
        </Stack>

        <Button
          variant="contained"
          startIcon={<Iconify icon="eva:plus-fill" />}
          onClick={() => {
            setanchor(true);
            setformData();
            setEditId("");
          }}
        >
          Add Task
        </Button>
      </Stack>

      <div style={{ height: 650, width: "100%" }}>
        <DataGrid
          rows={rowData}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          components={{
            Toolbar: GridToolbar,
          }}
        />
      </div>

      <Drawer anchor="right" open={anchor} onClose={() => setanchor(false)}>
        <Box sx={{ width: 450 }}>
          <Container>
            <form onSubmit={submitFormData}>
              <Typography variant="h4" sx={{ mt: 4 }}>
                Add Task
              </Typography>

              <TextField name="id" type="hidden" value={formData?.id} />
              <TextField
                name="attachment"
                type="hidden"
                value={formData?.attachment}
              />

              <TextField
                required
                label="Title"
                name="title"
                className={styles.taskInputField}
                onChange={getFormData}
                value={formData?.title}
              />
              <TextField
                required
                label="Priority"
                name="priority"
                className={styles.taskInputField}
                value={formData?.priority}
                select
                onChange={(event) => {
                  getFormData(event);
                  changepriorityTeam(event);
                }}
              >
                <MenuItem value="low">Low</MenuItem>
                <MenuItem value="high">High</MenuItem>
              </TextField>
              <TextField
                required
                label="Description"
                name="description"
                className={styles.taskInputField}
                multiline
                rows={3}
                value={formData?.description}
                onChange={getFormData}
              />
              <TextField
                type="file"
                className={styles.taskInputField}
                onChange={getFormData}
                name="file"
              />
              <TextField
                required
                label="Select Team"
                name="team"
                className={styles.taskInputField}
                select
                onChange={(event) => {
                  getFormData(event);
                  changeoptionTeam(event);
                }}
                value={formData?.team}
              >
                {departmentsData.map((item, index) => {
                  return (
                    <MenuItem value={userData[index].department}>
                      {userData[index].department}
                    </MenuItem>
                  );
                })}
              </TextField>

              <TextField
                required
                label="Select Employee"
                name="employee_id"
                className={styles.taskInputField}
                select
                value={formData?.employee_id}
                onChange={(event) => {
                  getFormData(event);
                  changeoptionEmp(event);
                }}
              >
                {designationData.map((ite, index) => {
                  return (
                    <MenuItem value={designationData[index].employee_id}>
                      {designationData[index].username}
                    </MenuItem>
                  );
                })}
                {/* <MenuItem value="123">shaik</MenuItem>
                  <MenuItem value="1234">saif</MenuItem> */}
              </TextField>
              <TextField
                required
                helperText="Start Date"
                name="start_date"
                type={InputDate}
                onChange={getFormData}
                className={styles.taskInputField}
                onClick={(e) => {
                  setInputDate("date");
                }}
                onBlur={() => {
                  setInputDate("text");
                }}
                value={moment(formData?.start_date).utc().format("DD-MM-YYYY")}
              />

              <TextField
                required
                helperText="End Date"
                name="end_date"
                type={InputDate}
                onChange={getFormData}
                className={styles.taskInputField}
                onFocus={(e) => {
                  setInputDate("date");
                }}
                onBlur={() => {
                  setInputDate("text");
                }}
                value={moment(formData?.end_date).utc().format("DD-MM-YYYY")}
              />

              <Stack
                direction="row"
                justifyContent="flex-end"
                alignItems="center"
                spacing={3}
              >
                <Button type="submit" variant="contained">
                  Add Task
                </Button>
                <Button type="reset" variant="contained" color="secondary">
                  Reset
                </Button>
              </Stack>
            </form>
          </Container>
        </Box>
      </Drawer>
      {ToastContainer_box}
    </Page>
  );
}
Task.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

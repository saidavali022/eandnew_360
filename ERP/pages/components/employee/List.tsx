import { useState, useEffect } from "react";
import Userprofile from "pages/components/userprofile/Index";
import {
  DataGrid,
  GridColDef,
  GridValueGetterParams,
  GridCallbackDetails,
  GridRowParams,
} from "@mui/x-data-grid";
import NextLink from "next/link";
import DashboardLayout from "@layouts/hrdashboard";
import { useRouter } from "next/router";
// require("dotenv").config();
// material
import {
  Stack,
  Button,
  Container,
  Typography,
  Breadcrumbs,
} from "@mui/material";
// components
import Page from "@components/Page";
import Iconify from "@components/Iconify";
import axios from "@utils/defaultImports";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", minWidth: 200, hide: true },
  { field: "first_name", headerName: "First name", minWidth: 200 },
  { field: "last_name", headerName: "Last name", minWidth: 200 },
  {
    field: "email",
    headerName: "Email",
    minWidth: 300,
  },
  {
    field: "phone",
    minWidth: 200,
    headerName: "Phone",
  },

  {
    field: "gender",
    minWidth: 100,
    headerName: "Gender",
  },
  {
    field: "doj",
    minWidth: 250,
    headerName: "Doj",
  },
  {
    field: "status",
    minWidth: 200,
    headerName: "status",
  },
];

export default function User({ data }) {
  const router = useRouter();
  const [rows, setrows] = useState([]);
  useEffect(() => {
    axios({
      method: "get",
      url: "/users/" + data.status,
      data: {
        status: data.status,
      },
    }).then(function (response: any) {
      if (response.status === 200) {
        setrows(response.data);
      }
    });
  }, [data.status]);

  const rowDoubleClick = (
    params: GridRowParams,
    event: MuiEvent<MouseEvent>,
    details: GridCallbackDetails
  ) => {
    event.preventDefault();
    router.push("./users/profile?id=" + params.row.id);
  };

  return (
    <Page title="User | E&D 360">
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
            {data.title}
          </Typography>
          <Breadcrumbs aria-label="breadcrumb">
            <NextLink color="inherit" href="/admin">
              Dashboard
            </NextLink>
            <Typography color="text.primary">Users</Typography>
          </Breadcrumbs>
        </Stack>
        {data.status == "pending" && (
          <NextLink href="./users/create">
            <Button
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
            >
              Paperless OnBoarding.
            </Button>
          </NextLink>
        )}
      </Stack>

      <div style={{ height: 650, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          onRowDoubleClick={rowDoubleClick}
        />
      </div>
    </Page>
  );
}

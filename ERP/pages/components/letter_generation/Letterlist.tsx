import { useState, useEffect } from "react";
import Link from "next/link";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridToolbar,
} from "@mui/x-data-grid";
import { Card, Stack } from "@mui/material";
import Router from "next/router";
const Letterlist = (props) => {
  const [rowData, setrowData] = useState([]);

  useEffect(() => {
    setrowData(props.data);
  }, [props.data]);

  const columns: GridColDef[] = [
    { field: "id", headerName: "S.No", width: 100 },
    { field: "employee_id", headerName: "Employee Id", width: 200 },
    {
      field: "action",
      headerName: "action",
      width: 300,
      renderCell: renderAction,
    },
  ];

  function renderAction(params: GridRenderCellParams) {
    return (
      <Stack direction="row" spacing={2}>
        <Link href={"http://localhost:3001/" + params.row.letter}>
          <a target="_blank">
            {" "}
            <InsertDriveFileIcon color="primary" />
          </a>
        </Link>
      </Stack>
    );
  }

  return (
    <Card
      sx={{
        height: 700,
        width: "100%",
      }}
    >
      <DataGrid
        rows={rowData}
        columns={columns}
        pageSize={10}
        components={{
          Toolbar: GridToolbar,
        }}
        rowsPerPageOptions={[10]}
      />
    </Card>
  );
};

export default Letterlist;

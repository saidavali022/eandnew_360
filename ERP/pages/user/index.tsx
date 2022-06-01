// material
import {
  Box,
  Grid,
  Container,
  Typography,
  Stack,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import UserDashboardLayout from "@layouts/userdashboard";
// components
import Page from "@components/Page";
import NextHead from "next/head";
import { useState, useEffect, ReactElement } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import {
  AppTasks,
  AppNewUsers,
  AppBugReports,
  AppItemOrders,
  AppNewsUpdate,
  AppWeeklySales,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppCurrentSubject,
  AppConversionRates,
} from "@sections/dashboard/app";
import { useSelector } from "react-redux";
import axios from "@utils/defaultImports";
// ----------------------------------------------------------------------

export default function DashboardApp() {
  const router = useRouter();
  const globalState = useSelector((state) => state.globalState);
  const [availabilityStatus, setAvailabilityStatus] = useState("unavailable");
  const handleAvailabilityChange = (event: SelectChangeEvent) => {
    axios
      .put(`/attendance/${globalState.Employee_id}/availability`, {
        status: event.target.value,
      })
      .then((res) => {
        console.info("update status to - ", event.target.value);
        setAvailabilityStatus(res.data.status);
      });
  };
  useEffect(() => {
    axios
      .get(`/attendance/${globalState.Employee_id}/availability`)
      .then((res: any) => {
        console.info("res - availibility - ", res.data);
        if (res.data.status == "unavailable") {
          axios.post(`/attendance/${globalState.Employee_id}`).then((res) => {
            console.info("mark attendance - ", res.data);
            setAvailabilityStatus(res.data.status);
          });
        } else {
          setAvailabilityStatus(res.data.status);
        }
      });
  }, []);
  return (
    <>
      <NextHead>
        <title>Dashboard</title>
      </NextHead>
      <Box>
        <Container maxWidth="xl">
          <Box sx={{ pb: 5 }}>
            <Typography variant="h4">Hi, Welcome back</Typography>
          </Box>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            mb={5}
          >
            {" "}
            <FormControl sx={{ m: 1, minWidth: 150 }}>
              <InputLabel id="availability-status">Status</InputLabel>
              <Select
                labelId="availability-status"
                id="availability-status-select"
                value={availabilityStatus}
                label="Status"
                onChange={handleAvailabilityChange}
              >
                <MenuItem value="notavailable">
                  <em>Not Available</em>
                </MenuItem>
                <MenuItem value="available">Available</MenuItem>
                <MenuItem value="break">Break</MenuItem>
                <MenuItem value="salah">Salah</MenuItem>
              </Select>
            </FormControl>
          </Stack>
          {/* <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <AppWeeklySales />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <AppNewUsers />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <AppItemOrders />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <AppBugReports />
            </Grid>

            <Grid item xs={12} md={6} lg={8}>
              <AppWebsiteVisits />
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
              <AppCurrentVisits />
            </Grid>

            <Grid item xs={12} md={6} lg={8}>
              <AppConversionRates />
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
              <AppCurrentSubject />
            </Grid>

            <Grid item xs={12} md={6} lg={8}>
              <AppNewsUpdate />
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
              <AppOrderTimeline />
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
              <AppTrafficBySite />
            </Grid>

            <Grid item xs={12} md={6} lg={8}>
              <AppTasks />
            </Grid>
          </Grid> */}
        </Container>
      </Box>
    </>
  );
}

DashboardApp.getLayout = (page: ReactElement) => (
  <UserDashboardLayout>{page}</UserDashboardLayout>
);

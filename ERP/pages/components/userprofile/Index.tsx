import React from "react";
import NextLink from "next/link";
import {
  Typography,
  Container,
  TextField,
  MenuItem,
  Grid,
  Card,
  CardContent,
  Switch,
  Button,
  Breadcrumbs,
  Stack,
} from "@mui/material";

import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Personal from "./Personal";
import Bankdetails from "./Bankdetails";
import Documents from "./Documents";
import moment from "moment";
import { useEffect } from "react";
const Index = ({ userData, role }) => {
  const [value, setValue] = React.useState("1");
  const [personalData, setpersonalData] = React.useState();
  const [bankdetails, setbankdetails] = React.useState();
  const [sideMenuData, setsideMenuData] = React.useState();
  const [documents, setdocuments] = React.useState({});

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (userData.id) {
      setpersonalData({
        first_Name: userData.first_name,
        last_Name: userData.last_name,
        father_Name: userData.father_name,
        mother_Name: userData.mother_name,
        highest_Qualification: userData.highest_qualification,
        doj: moment(userData.doj).utc().format("DD-MM-YYYY"),
        dob: moment(userData.dob).utc().format("DD-MM-YYYY"),
        email: userData.email,
        phone: userData.phone,
        guardian_Phone: userData.guardian_phone,
        gender: userData?.gender,
        blood_group: userData.blood_group,
        house_No: userData.house_no,
        street: userData.street,
        city: userData.city,
        state: userData.state,
        country: userData.country,
      });

      setbankdetails({
        bank_Account_No: userData.bank_account_no,
        IFSC_Code: userData.ifsc_code,
        account_Holder_Name: userData.account_holder_name,
        bank_Name: userData.bank_name,
        branch_Name: userData.branch_name,
        upi_id: userData.upi_id,
      });

      setsideMenuData({
        id: userData.id,
        role: role,
        employee_id: userData.employee_id,
        doj: userData.doj,
        dob: userData.dob,
        username: userData.username,
        designation: userData.designation,
        notice_period: userData.notice_period,
        email: userData.email,
        house_no: userData.house_no,
        street: userData.street,
        city: userData.city,
        state: userData.state,
        country: userData.country,
        status: userData.status,
        facebook_profile_link: userData.facebook_profile_link,
        instagram_profile_link: userData.instagram_profile_link,
        twitter_profile_link: userData.twitter_profile_link,
        linkedin_profile_ink: userData.linkedin_profile_ink,
      });

      setdocuments({
        Education: {
          ssc: userData.ssc,
          TC: userData.TC,
          diploma: userData.diploma,
          intermediate: userData.intermediate,
          bachelor: userData.bachelor,
          master: userData.master,
          marks_memo: userData.marks_memo,
        },
        Goverment_Ids: {
          aadhar_img: userData.aadhar_img,
          pancard_img: userData.pancard_img,
        },
        Previous_Employment: {
          pay_slips: userData.pay_slips,
          resignation_letter: userData.resignation_letter,
          increment_letter: userData.increment_letter,
          experience_certificate: userData.experience_certificate,
          offer_letter: userData.offer_letter,
        },
      });
    }
  }, [userData]);

  return (
    <div>
      {" "}
      <Stack
        direction="column"
        alignItems="start"
        justifyContent="space-between"
        mb={5}
      >
        <Typography variant="h4" gutterBottom>
          OnBoarding
        </Typography>
        <Breadcrumbs aria-label="breadcrumb">
          <NextLink color="inherit" href="/admin">
            Dashboard
          </NextLink>
          <Typography color="text.primary">Users</Typography>
          <Typography color="text.primary">Profile</Typography>
        </Breadcrumbs>
      </Stack>
      <Card>
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList onChange={handleChange}>
                <Tab label="Personal Details" value="1" />
                <Tab label="Bank Details" value="2" />
                <Tab label="Documents" value="3" />
                <Tab label="Compensation" value="4" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <Personal
                menu={sideMenuData}
                data={personalData != null ? personalData : 0}
              />
            </TabPanel>
            <TabPanel value="2">
              <Bankdetails
                menu={sideMenuData}
                data={bankdetails != null ? bankdetails : 0}
              />
            </TabPanel>
            <TabPanel value="3">
              <Documents
                menu={sideMenuData}
                data={documents != null ? documents : 0}
              />
            </TabPanel>

            <TabPanel value="4">
              <Documents
                menu={sideMenuData}
                data={documents != null ? documents : 0}
              />
            </TabPanel>
          </TabContext>
        </Box>
      </Card>
    </div>
  );
};

export default Index;

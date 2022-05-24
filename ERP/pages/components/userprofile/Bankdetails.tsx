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
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import MailIcon from "@mui/icons-material/Mail";
import Sidemenu from "./Sidemenu";
const style = {
  width: 270,
  m: 3,
};
const iconStyle = {
  position: "relative",
  top: "5px",
};

const Bankdetails = (props) => {
  const Textt = Object.keys(props.data).map((item, index) => {
    return (
      <TextField
        value={props.data[item]}
        variant="standard"
        label={item.replaceAll("_", " ")}
        disabled
        sx={style}
      />
    );
  });
  return (
    <div>
      <Grid container spacing={2}>
        <Sidemenu data={props.menu} />
        <Grid item xs={12} lg={9} md={7}>
          <div>{Textt}</div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Bankdetails;

import Page from "@components/Page";
import DatePicker from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
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
} from "@mui/material";
import styles from "@styles/Users.module.css";
import * as React from "react";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import DashboardLayout from "@layouts/hrdashboard";
import "react-toastify/dist/ReactToastify.css";
import axios from "@utils/defaultImports";
const label = { inputProps: "aria-label" };
export default function create() {
  const [formData, setformData] = useState({});
  const [Gender, setGender] = React.useState();
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGender(event.target.value);
  };
  const [Maritial, setMaritial] = React.useState();
  const MaritialhandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMaritial(event.target.value);
  };
  const [BloodGroup, setBloodGroup] = React.useState();
  const BloodGroupHandlechange = (even: any) => {
    setBloodGroup(event.target.value);
  };
  const BloodGroups = [
    "A",
    "B",
    "O",
    "A+",
    "A-",
    "B+",
    "B-",
    "O+",
    "O-",
    "AB+",
    "AB-",
  ];

  const getFormData = (event: any) => {
    if (event.target.type == "file") {
      setformData({
        ...formData,
        [event.target.name]: event.target.files[0],
      });
    } else {
      setformData({ ...formData, [event.target.name]: event.target.value });
    }
  };

  const formSubmit = (event: any) => {
    event.preventDefault();
    const formBindData = new FormData();
    // formBindData.append("first_name", formData.first_name);
    for (var key in formData) {
      // console.log(key + " - " + formData[key]);
      formBindData.append([key], formData[key]);
    }
    // console.log(formBindData);
    // const formBindData = new FormData();
    // formBindData.append("first_name", formData.first_name);

    axios({
      method: "post",
      url: "/users/",
      data: formBindData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(function (response: any) {
        console.log(response);
        event.target.reset();
        if (response.status === 200) {
          toast.success("success", {
            theme: "colored",
          });
        }
      })
      .catch(function (error: any) {
        console.log(error);
        toast.error("error");
      });
  };

  return (
    <>
      <Page title="E&D 360 | Create User">
        <Container>
          <form onSubmit={formSubmit}>
            <Grid container spacing={2} sx={{ my: 4 }}>
              <Grid item xs={12} sm={12} md={12} lg={12} sx={{ mx: "auto" }}>
                <div>
                  <Typography variant="h4"> Personal Details </Typography>

                  <TextField
                    className={styles.userCreateForm}
                    sx={{ m: 3 }}
                    label="Username"
                    onChange={getFormData}
                    name="username"
                  />

                  <TextField
                    className={styles.userCreateForm}
                    required
                    label="First Name"
                    sx={{ m: 3 }}
                    onChange={getFormData}
                    name="first_name"
                  />

                  <TextField
                    className={styles.userCreateForm}
                    required
                    label="Last Name"
                    sx={{ m: 3 }}
                    onChange={getFormData}
                    name="last_name"
                  />

                  <TextField
                    className={styles.userCreateForm}
                    required
                    label="Father Name"
                    sx={{ m: 3 }}
                    onChange={getFormData}
                    name="father_name"
                  />

                  <TextField
                    className={styles.userCreateForm}
                    required
                    label="Mother Name"
                    sx={{ m: 3 }}
                    onChange={getFormData}
                    name="mother_name"
                  />
                  <TextField
                    className={styles.userCreateForm}
                    required
                    label="Email"
                    sx={{ m: 3 }}
                    onChange={getFormData}
                    name="email"
                    type="email"
                  />

                  <TextField
                    className={styles.userCreateForm}
                    required
                    type="number"
                    label="Phone"
                    sx={{ m: 3 }}
                    onChange={getFormData}
                    name="phone"
                  />

                  <TextField
                    className={styles.userCreateForm}
                    required
                    label="Gender"
                    sx={{ m: 3 }}
                    onChange={getFormData}
                    name="gender"
                    select
                  >
                    {["Male", "Female", "Other"].map((item) => {
                      return <MenuItem value={item}>{item}</MenuItem>;
                    })}
                  </TextField>
                  <TextField
                    className={styles.userCreateForm}
                    required
                    label="Guardian Phone"
                    sx={{ m: 3 }}
                    onChange={getFormData}
                    name="guardian_phone"
                  />

                  <TextField
                    className={styles.userCreateForm}
                    required
                    sx={{ m: 3 }}
                    onChange={getFormData}
                    name="dob"
                    type="date"
                    helperText="Date Of Birth"
                  />

                  <TextField
                    className={styles.userCreateForm}
                    required
                    sx={{ m: 3 }}
                    onChange={getFormData}
                    name="doj"
                    type="date"
                    helperText="Date Of Joining"
                  />

                  <TextField
                    className={styles.userCreateForm}
                    required
                    label="Blood Group"
                    sx={{ m: 3 }}
                    onChange={getFormData}
                    name="blood_group"
                    select
                  >
                    {BloodGroups.map((item, index) => {
                      return <MenuItem value={item}>{item}</MenuItem>;
                    })}
                  </TextField>

                  <TextField
                    className={styles.userCreateForm}
                    required
                    label="House No"
                    sx={{ m: 3 }}
                    onChange={getFormData}
                    name="house_no"
                  />

                  <TextField
                    className={styles.userCreateForm}
                    required
                    label="Street"
                    sx={{ m: 3 }}
                    onChange={getFormData}
                    name="street"
                  />
                  <TextField
                    className={styles.userCreateForm}
                    required
                    label="City"
                    sx={{ m: 3 }}
                    onChange={getFormData}
                    name="city"
                  />

                  <TextField
                    className={styles.userCreateForm}
                    required
                    label="State"
                    sx={{ m: 3 }}
                    onChange={getFormData}
                    name="state"
                  />

                  <TextField
                    className={styles.userCreateForm}
                    required
                    label="Country"
                    sx={{ m: 3 }}
                    onChange={getFormData}
                    name="country"
                  />

                  <TextField
                    className={styles.userCreateForm}
                    required
                    label="Nationality"
                    sx={{ m: 3 }}
                    onChange={getFormData}
                    name="nationality"
                  />
                  <Typography variant="h4">Government Id </Typography>
                  <TextField
                    className={styles.userCreateForm}
                    required
                    sx={{ m: 3 }}
                    onChange={getFormData}
                    name="aadhar_img"
                    type="file"
                    helperText="Aadhar (PDF)"
                  />

                  <TextField
                    className={styles.userCreateForm}
                    required
                    label="aadhar No"
                    sx={{ m: 3 }}
                    onChange={getFormData}
                    name="aadhar_no"
                  />

                  <TextField
                    className={styles.userCreateForm}
                    required
                    sx={{ m: 3 }}
                    onChange={getFormData}
                    name="pancard_img"
                    type="file"
                    helperText="Pan Card (PDF)"
                  />

                  <TextField
                    className={styles.userCreateForm}
                    required
                    label="Pan Card No"
                    sx={{ m: 3 }}
                    onChange={getFormData}
                    name="pancard_no"
                  />

                  <TextField
                    className={styles.userCreateForm}
                    required
                    sx={{ m: 3 }}
                    onChange={getFormData}
                    name="passport_size_photo"
                    type="file"
                    helperText="Passport Size Photo (png)"
                  />

                  <Typography variant="h4">Educational Details </Typography>

                  <TextField
                    className={styles.userCreateForm}
                    sx={{ m: 3 }}
                    label="Highest Qualification"
                    onChange={getFormData}
                    name="highest_qualification"
                  />

                  <TextField
                    className={styles.userCreateForm}
                    sx={{ m: 3 }}
                    onChange={getFormData}
                    name="ssc"
                    helperText="ssc certificate (PDF)"
                    type="file"
                  />

                  <TextField
                    className={styles.userCreateForm}
                    sx={{ m: 3 }}
                    onChange={getFormData}
                    name="intermediate"
                    type="file"
                    helperText="Intermediate certificate (PDF) If Any"
                  />

                  <TextField
                    className={styles.userCreateForm}
                    sx={{ m: 3 }}
                    onChange={getFormData}
                    name="diploma"
                    type="file"
                    helperText="Diploma certificate (PDF) If Any"
                  />

                  <TextField
                    className={styles.userCreateForm}
                    sx={{ m: 3 }}
                    onChange={getFormData}
                    name="bachelor"
                    type="file"
                    helperText="Bachelor certificate (PDF) If Any"
                  />

                  <TextField
                    className={styles.userCreateForm}
                    sx={{ m: 3 }}
                    onChange={getFormData}
                    name="master"
                    type="file"
                    helperText="Master certificate (PDF) If Any"
                  />

                  <TextField
                    className={styles.userCreateForm}
                    sx={{ m: 3 }}
                    onChange={getFormData}
                    name="marks_memo"
                    type="file"
                    helperText="Marks Memo certificate (PDF)"
                  />

                  <TextField
                    className={styles.userCreateForm}
                    sx={{ m: 3 }}
                    onChange={getFormData}
                    name="transfer_certificate"
                    type="file"
                    helperText="TC (PDF)"
                  />

                  <TextField
                    className={styles.userCreateForm}
                    required
                    sx={{ m: 3 }}
                    onChange={getFormData}
                    name="pass_out_year"
                    label="Passout Year"
                    helperText="If Completed Graduation/Master Else 0"
                  />

                  <TextField
                    className={styles.userCreateForm}
                    required
                    label="Expected Passout Year"
                    sx={{ m: 3 }}
                    onChange={getFormData}
                    name="Expected Passout Year"
                    helperText="If pursuing else 0"
                  ></TextField>

                  <Typography variant="h4">Bank Details </Typography>

                  <TextField
                    className={styles.userCreateForm}
                    required
                    label="Bank Account No"
                    sx={{ m: 3 }}
                    onChange={getFormData}
                    name="bank_account_no"
                  />

                  <TextField
                    className={styles.userCreateForm}
                    required
                    label="IFSC Code"
                    sx={{ m: 3 }}
                    onChange={getFormData}
                    name="ifsc_code"
                  />

                  <TextField
                    className={styles.userCreateForm}
                    required
                    label="Account Holder Name"
                    sx={{ m: 3 }}
                    onChange={getFormData}
                    name="account_holder_name"
                  />
                  <TextField
                    className={styles.userCreateForm}
                    required
                    label="Bank Name"
                    sx={{ m: 3 }}
                    onChange={getFormData}
                    name="bank_name"
                  />

                  <TextField
                    className={styles.userCreateForm}
                    required
                    label="Branch Name"
                    sx={{ m: 3 }}
                    onChange={getFormData}
                    name="branch_name"
                  />

                  <TextField
                    className={styles.userCreateForm}
                    required
                    label="UPI Id"
                    sx={{ m: 3 }}
                    onChange={getFormData}
                    name="upi_id"
                  />

                  <Typography variant="h4">
                    Previous Employment Details (If any)
                  </Typography>

                  <TextField
                    className={styles.userCreateForm}
                    helperText="Offer Letter (PDF)"
                    sx={{ m: 3 }}
                    onChange={getFormData}
                    name="offer_letter"
                    type="file"
                  />

                  <TextField
                    className={styles.userCreateForm}
                    helperText="Experience Certificate (PDF)"
                    sx={{ m: 3 }}
                    onChange={getFormData}
                    name="experience_certificate"
                    type="file"
                  />

                  <TextField
                    className={styles.userCreateForm}
                    helperText="Increment Letter (PDF)"
                    sx={{ m: 3 }}
                    onChange={getFormData}
                    name="increment_letter"
                    type="file"
                  />

                  <TextField
                    className={styles.userCreateForm}
                    helperText="Payslips (PDF)"
                    sx={{ m: 3 }}
                    onChange={getFormData}
                    name="pay_slips"
                    type="file"
                  />

                  <TextField
                    className={styles.userCreateForm}
                    helperText="Resignation Letter"
                    sx={{ m: 3 }}
                    onChange={getFormData}
                    name="resignation_letter"
                    type="file"
                  />

                  <Typography variant="h4">Social Id's</Typography>
                  <TextField
                    className={styles.userCreateForm}
                    label="LinkedIn Profile Link"
                    sx={{ m: 3 }}
                    onChange={getFormData}
                    name="linkedin_profile_ink"
                  />
                  <TextField
                    className={styles.userCreateForm}
                    label="Facebook Profile Link"
                    sx={{ m: 3 }}
                    onChange={getFormData}
                    name="facebook_profile_link"
                  />

                  <TextField
                    className={styles.userCreateForm}
                    label="Instagram Profile Link"
                    sx={{ m: 3 }}
                    onChange={getFormData}
                    name="instagram_profile_link"
                  />

                  <TextField
                    className={styles.userCreateForm}
                    label="twitter_profile_link"
                    sx={{ m: 3 }}
                    onChange={getFormData}
                    name="Twitter Profile Link"
                  />
                </div>

                <div
                  style={{
                    textAlign: "center",
                    marginLeft: "auto",
                  }}
                >
                  <Button
                    variant="contained"
                    sx={{ mx: 2 }}
                    type="reset"
                    color="secondary"
                  >
                    Reset
                  </Button>

                  <Button type="submit" variant="contained" sx={{ mx: 2 }}>
                    Submit
                  </Button>
                </div>
              </Grid>
            </Grid>
          </form>
          <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </Container>
      </Page>
    </>
  );
}

// create.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

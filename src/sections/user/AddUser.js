import {
  Grid,
  Box,
  Button,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAuth } from "src/hooks/use-auth";
import { url } from "../../../constants";
import axios from "axios";
import { useEffect } from "react";

export const AddUser = (props) => {
  const { getCountries, countries, province, getProvince } = useAuth();
  const formik = useFormik({
    initialValues: {
      email: "",
      username: "",
      password: "",
      mobile: "",
      type: "",
      country: "",
      province: "",
      city: "",
      pin: "",
      submit: null,
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Must be a valid email").max(255).required("Email is required"),
      username: Yup.string().max(255).required("Name is required"),
      password: Yup.string().max(255).required("Password is required"),
      mobile: Yup.string().max(255).required("Mobile Number is required"),
      country: Yup.string().max(255).required("country is required"),
      province: Yup.string().max(255).required("province is required"),
      type: Yup.string().max(255).required("Type is required"),
      city: Yup.string().max(255).required("City is required"),
      pin: Yup.string().max(255).required("pin is required"),
    }),
    onSubmit: async (values, helpers) => {
      try {
        const res = await axios.post(`${url}/user/adduser`, values);
        if (res.data.status === 1) {
          window.location.reload();
        } else {
          alert(res.data.message);
        }
      } catch (err) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    },
  });
  useEffect(() => {
    getCountries();
  }, []);

  return (
    <>
      <Box
        sx={{
          flex: "1 1 auto",
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            maxWidth: "90%",
            width: "100%",
          }}
        >
          <div>
            <form
              noValidate
              onSubmit={formik.handleSubmit}
              sx={{
                display: "flex",
              }}
            >
              <Grid container spacing={2} margin={2}>
                <Grid item xs={6}>
                  <TextField
                    error={!!(formik.touched.username && formik.errors.username)}
                    fullWidth
                    helperText={formik.touched.username && formik.errors.username}
                    label="User Name"
                    name="username"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.username}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    error={!!(formik.touched.email && formik.errors.email)}
                    fullWidth
                    helperText={formik.touched.email && formik.errors.email}
                    label="Email Address"
                    name="email"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="email"
                    value={formik.values.email}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2} margin={2}>
                <Grid item xs={6}>
                  <TextField
                    error={!!(formik.touched.password && formik.errors.password)}
                    fullWidth
                    helperText={formik.touched.password && formik.errors.password}
                    label="Password"
                    name="password"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="password"
                    value={formik.values.password}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    error={!!(formik.touched.mobile && formik.errors.mobile)}
                    fullWidth
                    helperText={formik.touched.mobile && formik.errors.mobile}
                    label="Mobile Number"
                    name="mobile"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="number"
                    value={formik.values.mobile}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2} margin={2}>
                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <InputLabel id="country-select-label">Country</InputLabel>
                    <Select
                      fullWidth
                      labelId="country-select-label"
                      id="country-select"
                      error={!!(formik.touched.country && formik.errors.country)}
                      helperText={formik.touched.country && formik.errors.country}
                      name="country"
                      onBlur={formik.handleBlur}
                      type="select"
                      value={formik.values.country}
                      onChange={(event) => {
                        formik.setFieldValue("country", event.target.value);
                        formik.setFieldTouched("country", true);
                        const code = countries.find(
                          (each) => each.name === event.target.value
                        ).code;
                        getProvince(code);
                      }}
                    >
                      {countries.length > 0 &&
                        countries.map((each) => {
                          return (
                            <MenuItem key={each.code} value={each.name} name={each.code}>
                              {each.name}
                            </MenuItem>
                          );
                        })}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <InputLabel id="province-select-label">Province</InputLabel>
                    <Select
                      fullWidth
                      labelId="province-select-label"
                      id="province-select"
                      error={!!(formik.touched.province && formik.errors.province)}
                      helperText={formik.touched.province && formik.errors.province}
                      name="province"
                      onBlur={formik.handleBlur}
                      type="select"
                      value={formik.values.province}
                      onChange={(event) => {
                        formik.setFieldValue("province", event.target.value);
                        formik.setFieldTouched("province", true);
                      }}
                    >
                      {province.length > 0 &&
                        province.map((each) => {
                          return (
                            <MenuItem key={each.code} value={each.name} name={each.code}>
                              {each.name}
                            </MenuItem>
                          );
                        })}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
              <Grid container spacing={2} margin={2}>
                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <InputLabel id="type-select-label">Type</InputLabel>
                    <Select
                      fullWidth
                      labelId="type-select-label"
                      id="type-select"
                      error={!!(formik.touched.type && formik.errors.type)}
                      helperText={formik.touched.type && formik.errors.type}
                      name="type"
                      onBlur={formik.handleBlur}
                      type="select"
                      value={formik.values.type}
                      onChange={(event) => {
                        formik.setFieldValue("type", event.target.value);
                        formik.setFieldTouched("type", true);
                      }}
                    >
                      <MenuItem key="worker" value="worker">
                        Worker
                      </MenuItem>
                      <MenuItem key="job poster" value="job poster">
                        Job Poster
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    error={!!(formik.touched.city && formik.errors.city)}
                    fullWidth
                    helperText={formik.touched.city && formik.errors.city}
                    label="City"
                    name="city"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.city}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2} margin={2}>
                <Grid item xs={6}>
                  <TextField
                    error={!!(formik.touched.pin && formik.errors.pin)}
                    fullWidth
                    helperText={formik.touched.pin && formik.errors.pin}
                    label="Pin"
                    name="pin"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.pin}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Button
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    sx={{
                      backgroundColor: "#ec3e97",
                      "&:hover": {
                        backgroundColor: "#50c2b5",
                      },
                    }}
                  >
                    Add User
                  </Button>
                </Grid>
              </Grid>
              {formik.errors.submit && (
                <Typography color="error" sx={{ mt: 3 }} variant="body2">
                  {formik.errors.submit}
                </Typography>
              )}
            </form>
          </div>
        </Box>
      </Box>
    </>
  );
};

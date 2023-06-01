import { Grid, Box, Typography, Item, Paper, ImageListItem } from "@mui/material";
import { url } from "../../../constants";
export const UserDetails = ({ details }) => {
  const getComponents = () => {
    const components = [];
    for (let property in details) {
      if (
        details[property] !== null &&
        property !== "password" &&
        property !== "createdAt" &&
        property !== "updatedAt" &&
        property !== "status" &&
        property !== "verified" &&
        property !== "otp" &&
        property !== "profileId" &&
        property !== "profilePic"
      ) {
        let propertyName = "";
        if (property === "userId") propertyName = "Id";
        else if (property === "dob") propertyName = "Date Of Birth";
        else if (property === "accountNumber") propertyName = "Account Number";
        else if (property === "tn_rn") propertyName = "Transist Number & Routing Number";
        else if (property === "bankName") propertyName = "Bank Name";
        else propertyName = property;
        components.push(
          <Grid item xs={6} key={property}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                {propertyName.toUpperCase()}
              </Typography>
              <Typography variant="body1">{details[property]}</Typography>
            </Paper>
          </Grid>
        );
      }
    }

    return components;
  };
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
          <Grid container spacing={2} margin={2}>
            {details.profilePic && (
              <Grid
                item
                xs={12}
                sx={{
                  display: "flex",
                  justifyContent: "left",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    width: "192px",
                    height: "192px",
                    border: "6px solid #f4f4f4",
                    borderRadius: "50%",
                  }}
                >
                  <img
                    style={{
                      width: "182px",
                      height: "182px",
                      objectFit: "cover",
                      borderRadius: "100%",
                      background: "#f2f2f2",
                      margin: "0px auto",
                      marginBottom: "40px",
                    }}
                    src={`${url}/uploads/${details.profilePic}`}
                    alt="Profile"
                  />
                </div>
              </Grid>
            )}

            {getComponents()}
          </Grid>
        </Box>
      </Box>
    </>
  );
};

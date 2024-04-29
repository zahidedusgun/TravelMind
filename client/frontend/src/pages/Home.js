import React from "react";
import { Link } from "react-router-dom";
import image2 from "../images/image2.png";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
function Home() {
  return (
    <>
      <Box>
        <Grid
          container
          sx={{
            backgroundImage:
              "linear-gradient(162deg, rgba(49, 37, 102, 1) 61%, rgba(255, 255, 255, 1) 100%);",
            padding: "15px",
            borderRadius: "20px",
          }}
        >
          <Grid item xs={12} md={6}>
            <Box sx={{ color: "white", padding:"50px" }}>
              <h1>TravelMind </h1>
              <h1>Planlayıcısına Hoşgeldin!</h1>
              <br></br>
              <p>Seyahat planını oluşturmak için</p>
              <p>aşağıdaki butonu takip edebilirsin 👇</p>
            </Box>

            <Link to="/chat">
              {" "}
              <br></br>
              <Button variant="contained" size="medium" color="secondary">
                Planla
              </Button>
            </Link>
          </Grid>
          <Grid item xs={12} md={6}>
            <img src={image2} width="120%" />
          </Grid>
        </Grid>

      </Box>
    </>
  );
}

export default Home;

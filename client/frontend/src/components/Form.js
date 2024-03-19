import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const purposes = [
  {
    value: "work",
    label: "Work Travel",
  },
  {
    value: "tourist",
    label: "Tourist Trip",
  },
  {
    value: "honeymoon",
    label: "Honey Moon",
  },
];

const numbers = Array.from({ length: 6 }, (_, index) => index);

export default function Form() {
  const [loading, setLoading] = React.useState(false);
  const [advices, setAdvices] = React.useState([]);
  const [error, setError] = React.useState(false);
  const [data, setData] = React.useState({
    country: "",
    city: "",
    days: "",
    purpose: "",
    kids: "",
  });

  const isButtonDisabled =
    Object.values(data).some((value) => !value) || loading;

  const changeHandle = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandle = (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res?.error) {
          setError(true);
          setAdvices([]);
        } else {
          setAdvices(res);
          setError(false);
        }
      })
      .finally(() => setLoading(false));
    console.log(data);
    console.log(advices.days[0].history);
  };

  return (
    <Box sx={{ marginTop: "80px" }}>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Box
            component="form"
            noValidate
            autoComplete="off"
            sx={{ paddingRight: "10px" }}
          >
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  id="outlined-required-country"
                  label="Country Name"
                  color="secondary"
                  value={data.country}
                  name="country"
                  onChange={changeHandle}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="outlined-required-city1"
                  label="City Name "
                  color="secondary"
                  value={data.city}
                  name="city"
                  onChange={changeHandle}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="outlined-select-currency"
                  select
                  label="Days"
                  helperText="Have many days you travel?"
                  color="secondary"
                  value={data.days}
                  name="days"
                  onChange={changeHandle}
                >
                  {numbers.map((number) => (
                    <MenuItem key={number} value={number}>
                      {number}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="outlined-select-currency"
                  select
                  label="Purpose"
                  helperText="Select your travel purpose"
                  color="secondary"
                  value={data.purpose}
                  name="purpose"
                  onChange={changeHandle}
                >
                  {purposes.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="outlined-select-currency"
                  select
                  label="Select"
                  helperText="Have many do you have kids?"
                  color="secondary"
                  value={data.kids}
                  name="kids"
                  onChange={changeHandle}
                >
                  {numbers.map((number) => (
                    <MenuItem key={number} value={number}>
                      {number}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="secondary"
                  disabled={isButtonDisabled}
                  onClick={submitHandle}
                  sx={{
                    "&.Mui-disabled": { opacity: 0.5, pointerEvents: "none" },
                  }}
                >
                  Plan
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Grid>
        {error && (
          <div>
            <h1>Could not reach the city infos.</h1>
          </div>
        )}
        {advices.length >= 0 && (
          <Box>
            {advices.map(({advice}, index) => (
              <Grid item key={index} xs={6}>
                <Card sx={{ maxWidth: 345 }}>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {advice.days[0].history}
                    </Typography>

                    <hr />
                    <br />
                    <Typography variant="body2" color="text.secondary">
                      Lizards are a widespread group of squamate reptiles, with
                      over 6,000 species, ranging across all continents except
                      Antarctica
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Box>
        )}
      </Grid>
    </Box>
  );
}

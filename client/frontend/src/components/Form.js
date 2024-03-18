import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";

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
  const [data, setData] = React.useState({
    country: "",
    city: "",
    days: "",
    purpose: "",
    kids: "",
  });

  const isButtonDisabled = !(
    data.country &&
    data.city &&
    data.days &&
    data.purpose &&
    data.kids
  );

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
      .then((data) => console.log(data));
    console.log(data);
  };

  return (
    <Box
      component="form"
      sx={{
        marginTop: "80px",
      }}
      noValidate
      autoComplete="off"
    >
      <Grid container spacing={5}>
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
            disabled={isButtonDisabled} // Plan butonunu devre dışı bırak
            onClick={submitHandle}
          >
            Plan
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

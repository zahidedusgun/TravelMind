import React, { useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Typography from "@mui/joy/Typography";

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
  const [loading, setLoading] = useState(false);
  const [advices, setAdvices] = useState([]);
  const [error, setError] = useState(false);
  const [data, setData] = useState({
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
    setLoading(true);
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
      {loading ? (
        <Stack sx={{ color: "grey.500" }} spacing={2} direction="row">
          <CircularProgress color="secondary" />
        </Stack>
      ) : (
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Box
              component="form"
              noValidate
              autoComplete="off"
              sx={{ paddingRight: "10px" }}
              onSubmit={submitHandle}
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
        </Grid>
      )}

      <Grid>
        <Box>
          {advices && advices.info}
          <Box>
            {advices &&
              advices.info &&
              advices.info.map((info, infoIndex) => (
                <div key={infoIndex}>
                  <p>{info}</p>
                  {advices.option.map((option, optionIndex) => (
                    <div key={optionIndex}>
                      <Card
                        size="small"
                        variant="plain"
                        orientation="horizontal"
                        sx={{
                          textAlign: "center",
                          maxWidth: "50%",
                          color: "black",
                        }}
                      >
                        <CardOverflow
                          variant="solid"
                          color="primary"
                          sx={{
                            flex: "0 0 200px",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            px: "var(--Card-padding)",
                          }}
                        >
                          <Typography
                            fontSize="xl4"
                            fontWeight="xl"
                            textColor="#fff"
                          >
                            {option.option}.
                          </Typography>
                          <Typography textColor="primary.200">Öneri</Typography>
                        </CardOverflow>
                        <CardContent sx={{ gap: 1.5, minWidth: 150 }}>
                          <AspectRatio
                            ratio="16/9"
                            objectFit="contain"
                            variant="plain"
                          >
                            <img
                              alt=""
                              src="https://static.vecteezy.com/system/resources/previews/006/409/485/original/people-thinking-to-make-decision-problem-solving-and-find-creative-ideas-with-question-mark-in-flat-cartoon-background-for-poster-illustration-vector.jpg"
                            />
                          </AspectRatio>
                          <CardContent>
                            <Typography level="title-lg">
                              Need Some Help?
                            </Typography>
                            <Typography
                              fontSize="sm"
                              sx={{ mt: 0.5,  color: "#000000" }}
                            >
                              <p>Otel: {option.otel}</p>
                              <p>Kahve: {option.kahve}</p>
                              <p>Kahve Posta Kodu: {option.kahvePostcode}</p>
                              <p>History: {option.history}</p>
                              <p>
                                History Posta Kodu: {option.historyPostcode}
                              </p>
                              <p>Müze: {option.museum}</p>
                              <p>Müze Posta Kodu: {option.museumPostcode}</p>
                            </Typography>
                          </CardContent>
                          <Button
                            variant="outlined"
                            color="primary"
                            sx={{
                              "--variant-borderWidth": "2px",
                              borderRadius: 40,
                              borderColor: "primary.500",
                              mx: "auto",
                            }}
                          >
                            See FAQ
                          </Button>
                        </CardContent>
                      </Card>
                    </div>
                  ))}
                </div>
              ))}
          </Box>
        </Box>
      </Grid>
    </Box>
  );
}

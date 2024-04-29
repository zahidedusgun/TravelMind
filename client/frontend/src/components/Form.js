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
import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";
import image3 from "../images/image3.png";
import Spinner from "./Spinner";
import Chip from "@mui/material/Chip";

const purposes = [
  {
    value: "work",
    label: "İş Gezisi",
  },
  {
    value: "tourist",
    label: "Turistik Gezi",
  },
  {
    value: "honeymoon",
    label: "Balayı",
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
  const label = { inputProps: { "aria-label": "Checkbox demo" } };

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
    <Box>
      {loading ? (
        <Spinner />
      ) : (
        <Grid container spacing={12}>
          {/* form */}

          <Grid item xs={12} md={6}>
            <Box
              component="form"
              noValidate
              autoComplete="on"
              sx={{
                padding: "50px",
              }}
              onSubmit={submitHandle}
            >
              <Grid
                container
                spacing={3}
                justifyContent="center"
                alignItems="center"
              >
                <Grid item xs={12} md={12}>
                  <TextField
                    id="outlined-required-country"
                    label="Ülke İsmini Giriniz"
                    color="secondary"
                    value={data.country}
                    name="country"
                    onChange={changeHandle}
                    className="custom-text-field"
                  />
                </Grid>
                <Grid item xs={12} md={12}>
                  <TextField
                    id="outlined-required-city1"
                    label="Şehir İsmini Giriniz"
                    color="secondary"
                    value={data.city}
                    name="city"
                    onChange={changeHandle}
                  />
                </Grid>
                <Grid item xs={12} md={12}>
                  <TextField
                    id="outlined-select-currency"
                    label="Gün Sayısı"
                    type="number"
                    helperText="Kaç gün seyahat edeceksiniz?"
                    color="secondary"
                    value={data.days}
                    name="days"
                    onChange={changeHandle}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={12}>
                  <TextField
                    id="outlined-select-currency"
                    select
                    label="Seyahat Amacı"
                    helperText="Seyahat sebebinizi seçiniz."
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
                <Grid item xs={12} md={12}>
                  <TextField
                    id="outlined-select-currency"
                    select
                    label="Çocuk Sayısı"
                    helperText="Kaç çocuğa sahipsiniz?"
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
                <Grid item xs={12} md={12}>
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
          <Grid item xs={4} md={6}>
            <Box>
              {" "}
              <br></br> <br></br>
              <h4 style={{ color: "#402a4b" }}>
                Seyahat planına yandaki soruları cevaplayarak ulaşabilirsin.
              </h4>
              <br></br> <br></br>
              <img src={image3} />
            </Box>
          </Grid>
        </Grid>
      )}

      {/* advices */}
      <Grid container spacing={2}>
        <Box>
          <Box>
            {advices &&
              advices.info &&
              advices.info.map((info, infoIndex) => (
                <div key={infoIndex}>
                  <p>{info}</p>
                  <Grid container spacing={2}>
                    {advices.option.map((option, optionIndex) => (
                      <Grid item xs={12} sm={12} md={4} key={optionIndex}>
                        <Card variant="outlined" sx={{ width: 320 }}>
                          <CardOverflow variant="soft">
                            <Divider inset="context" />
                            <CardContent orientation="horizontal">
                              <Divider orientation="vertical" />
                              <Typography level="body-xl" >
                                Öneri {option.option}{" "}   
                                <Typography level="body-xl"sx={{color:"purple"}}>
                                  Plana Ekle
                                  <Checkbox
                                    {...label}
                                    defaultChecked
                                    color="success"
                                  />
                                </Typography>
                              </Typography>
                            </CardContent>
                          </CardOverflow>
                          <CardContent>
                            <CardContent>
                              <Typography level="body-sm">
                                {" "}
                                <Divider>
                                  <Chip
                                    label="Otel"
                                    size="small"
                                    sx={{
                                      backgroundColor: "#312566",
                                      color: "white",
                                    }}
                                  />
                                </Divider>
                                <p>{option.otel}</p>
                                <Divider>
                                  <Chip
                                    label="Kahve"
                                    size="small"
                                    sx={{
                                      backgroundColor: "#312566",
                                      color: "white",
                                    }}
                                  />
                                </Divider>
                                <p> {option.kahve}</p>{" "}
                                <Divider>
                                  <Chip
                                    label="Restoran"
                                    size="small"
                                    sx={{
                                      backgroundColor: "#312566",
                                      color: "white",
                                    }}
                                  />
                                </Divider>
                                <p>{option.restaurant}</p>
                                <Divider>
                                  <Chip
                                    label="Sanat Gezileri"
                                    size="small"
                                    sx={{
                                      backgroundColor: "#312566",
                                      color: "white",
                                    }}
                                  />
                                </Divider>
                                <p> {option.history}</p>
                                <Divider />
                                <p> Müze: {option.museum}</p>
                                <p>Galeri: {option.gallery}</p>
                                <Divider />
                                <p>Etkinlik: {option.event}</p>
                              </Typography>
                            </CardContent>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </div>
              ))}
          </Box>
        </Box>
      </Grid>
    </Box>
  );
}

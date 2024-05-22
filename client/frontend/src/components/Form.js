import React, { useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Switch from "@mui/material/Switch";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Spinner from "./Spinner";
import Advices from "./Advices";
import image3 from "../images/image3.png";

const numbers = Array.from({ length: 6 }, (_, index) => index);

export default function Form() {
  const [loading, setLoading] = useState(false);
  const [advices, setAdvices] = useState([]);
  const [error, setError] = useState(false);
  const [selectedActivities, setSelectedActivities] = useState([
    "muzeler",
    "alisveris",
    "tarihi",
  ]);
  const [hasKids, setHasKids] = useState(false);
  const [data, setData] = useState({
    country: "",
    city: "",
    days: "",
    purpose: selectedActivities,
    kids: "",
    date: dayjs(),
  });

  const isButtonDisabled = !data.country || !data.city || !data.days || !data.date || !data.purpose.length || loading;

  const changeHandle = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleActivityChange = (event, newActivities) => {
    setSelectedActivities(newActivities);
    setData({
      ...data,
      purpose: newActivities,
    });
  };

  const handleDateChange = (newValue) => {
    setData({
      ...data,
      date: newValue,
    });
  };

  const handleKidsSwitch = (event) => {
    setHasKids(event.target.checked);
    if (!event.target.checked) {
      setData({
        ...data,
        kids: "",
      });
    }
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
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      variant="filled"
                      value={data.date}
                      onChange={handleDateChange}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={12} md={12}>
                  <TextField
                    id="filled-required-country"
                    label="Ülke İsmini Giriniz"
                    color="secondary"
                    value={data.country}
                    name="country"
                    onChange={changeHandle}
                    className="custom-text-field"
                    variant="filled"
                  />
                </Grid>
                <Grid item xs={12} md={12}>
                  <TextField
                    id="filled-required-city1"
                    label="Şehir İsmini Giriniz"
                    color="secondary"
                    value={data.city}
                    name="city"
                    onChange={changeHandle}
                    variant="filled"
                  />
                </Grid>
                <Grid item xs={12} md={12}>
                  <TextField
                    id="filled-select-currency"
                    select
                    label="Gün"
                    helperText="Kaç gün seyahat edeceksiniz?"
                    color="secondary"
                    value={data.days}
                    name="days"
                    onChange={changeHandle}
                    variant="filled"
                  >
                    {numbers.map((number) => (
                      <MenuItem key={number} value={number}>
                        {number}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={12}
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <Typography variant="h6" sx={{ marginRight: 2 }}>
                    Çocuğun var mı?
                  </Typography>
                  <Switch
                    checked={hasKids}
                    onChange={handleKidsSwitch}
                    color="secondary"
                  />
                </Grid>

                {hasKids && (
                  <Grid item xs={12} md={12}>
                    <TextField
                      id="filled-select-currency"
                      select
                      label="Çocuk Sayısı"
                      helperText="Kaç çocuğa sahipsiniz?"
                      color="secondary"
                      value={data.kids}
                      name="kids"
                      onChange={changeHandle}
                      variant="filled"
                    >
                      {numbers.map((number) => (
                        <MenuItem key={number} value={number}>
                          {number}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                )}
                <Grid item xs={12} md={12}>
                  <Button
                    variant="contained"
                    color="secondary"
                    disabled={isButtonDisabled}
                    type="submit"
                    sx={{
                      "&.Mui-disabled": { opacity: 0.5, pointerEvents: "none" },
                    }}
                  >
                    Plan
                  </Button>
                  <Box sx={{ padding: 2 }}>
                    <Typography variant="h6">
                      Yapmak istediğiniz faaliyet türlerini seçin
                    </Typography>
                    <ToggleButtonGroup
                      value={selectedActivities}
                      onChange={handleActivityChange}
                      aria-label="faaliyetler"
                      sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 1,
                        marginTop: 1,
                      }}
                    >
                      <ToggleButton
                        value="cocuk-dostu"
                        sx={{
                          borderRadius: 2,
                          "&.Mui-selected": {
                            backgroundColor: "#312566",
                            color: "white",
                          },
                        }}
                      >
                        Çocuk Dostu
                      </ToggleButton>
                      <ToggleButton
                        value="muzeler"
                        sx={{
                          borderRadius: 2,
                          "&.Mui-selected": {
                            backgroundColor: "#312566",
                            color: "white",
                          },
                        }}
                      >
                        Müzeler
                      </ToggleButton>
                      <ToggleButton
                        value="alisveris"
                        sx={{
                          borderRadius: 2,
                          "&.Mui-selected": {
                            backgroundColor: "#312566",
                            color: "white",
                          },
                        }}
                      >
                        Alışveriş
                      </ToggleButton>
                      <ToggleButton
                        value="tarihi"
                        sx={{
                          borderRadius: 2,
                          "&.Mui-selected": {
                            backgroundColor: "#312566",
                            color: "white",
                          },
                        }}
                      >
                        Tarihi
                      </ToggleButton>
                      <ToggleButton
                        value="acik-hava-maceralar"
                        sx={{
                          borderRadius: 2,
                          "&.Mui-selected": {
                            backgroundColor: "#312566",
                            color: "white",
                          },
                        }}
                      >
                        Açık Hava Maceraları
                      </ToggleButton>
                      <ToggleButton
                        value="sanat-kulturel"
                        sx={{
                          borderRadius: 2,
                          "&.Mui-selected": {
                            backgroundColor: "#312566",
                            color: "white",
                          },
                        }}
                      >
                        Sanat & Kültürel
                      </ToggleButton>
                      <ToggleButton
                        value="eglence-parklar"
                        sx={{
                          borderRadius: 2,
                          "&.Mui-selected": {
                            backgroundColor: "#312566",
                            color: "white",
                          },
                        }}
                      >
                        Eğlence Parkları
                      </ToggleButton>
                    </ToggleButtonGroup>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Grid>

          {/* görsel alanı */}
          <Grid item xs={4} md={6}>
            <Box>
              <br></br>
              <br></br>
              <h4 style={{ color: "#402a4b" }}>
                Seyahat planına yandaki soruları cevaplayarak ulaşabilirsin.
              </h4>
              <br></br>
              <br></br>
              <img src={image3} />
            </Box>
          </Grid>
        </Grid>
      )}
      {/* advices */}
      <Advices advices={advices} />
    </Box>
  );
}
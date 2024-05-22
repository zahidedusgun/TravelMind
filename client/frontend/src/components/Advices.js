import React from "react";
import {
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import CardOverflow from "@mui/joy/CardOverflow";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Map from "./Map"; // Map bileşenini içe aktarın

function Advices({ advices }) {
  const settings = {
    className: "slider variable-width",
    dots: true,
    infinite: true,
    centerMode: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: true,
    adaptiveHeight: true,
    adaptiveWidth: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "#312566", borderRadius: "50%" }}
        onClick={onClick}
      />
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "#312566" }}
        onClick={onClick}
      />
    );
  }

  return (
    <Box>
      {advices.weather && Object.keys(advices.weather).length > 0 && (
        <Box sx={{ marginBottom: 4 }}>
          <Typography variant="h4" gutterBottom>
            Hava Durumu
          </Typography>
          <Grid container spacing={2}>
            {Object.keys(advices.weather).map((dayKey, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6">{dayKey}</Typography>
                    <Typography variant="body1">
                      {advices.weather[dayKey].date}
                    </Typography>
                    <Typography variant="body2">
                      {advices.weather[dayKey].temperature}°C
                    </Typography>
                    <Typography variant="body2">
                      {advices.weather[dayKey].weather}
                    </Typography>
                    <img src={https:${advices.weather[dayKey].icon}} alt="weather icon" />
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      <Grid container spacing={2}>
        <Box>
          <Box item xs={12} sm={12} md={6}>
            {advices &&
              advices.info &&
              <div>
                <p>{advices.info}</p>
                <Grid container spacing={2}>
                  {advices.option.map((option, optionIndex) => (
                    <Grid item xs={12} sm={12} md={6} key={optionIndex}>
                      <Card variant="outlined" sx={{ width: 400, height: 600 }}>
                        <CardOverflow variant="soft">
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              height: "100%",
                              textAlign: "center",
                            }}
                          >
                            <p>{option.option}</p>. Öneriniz Aşağıdadır.
                          </div>
                        </CardOverflow>
                        <CardContent>
                          <Typography level="body-sm">
                            <div className="slider-container">
                              <Slider {...settings}>
                                <div style={{ width: 120 }}>
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
                                  {option.otelPhotoUrl && (
                                    <img
                                      src={option.otelPhotoUrl}
                                      alt={Photo of ${option.otel}}
                                      style={{ width: "100%", height: "auto" }}
                                    />
                                  )}
                                  <p>{option.otel}</p>
                                  <Map latitude={option.otelLatitude} longitude={option.otelLongitude} />
                                </div>
                                <div>
                                  <Divider>
                                    <Chip
                                      label="Kafe"
                                      size="small"
                                      sx={{
                                        backgroundColor: "#312566",
                                        color: "white",
                                      }}
                                    />
                                  </Divider>
                                  {option.kahvePhotoUrl && (
                                    <img
                                      src={option.kahvePhotoUrl}
                                      alt={Photo of ${option.kahve}}
                                      style={{ width: "100%", height: "auto" }}
                                    />
                                  )}
                                  <p>{option.kahve}</p>
                                  <Map latitude={option.kahveLatitude} longitude={option.kahveLongitude} />
                                </div>
                                <div>
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
                                  {option.restaurantPhotoUrl && (
                                    <img
                                      src={option.restaurantPhotoUrl}
                                      alt={Photo of ${option.restaurant}}
                                      style={{ width: "100%", height: "auto" }}
                                    />
                                  )}
                                  <p>{option.restaurant}</p>
                                  <Map latitude={option.restaurantLatitude} longitude={option.restaurantLongitude} />
                                </div>
                                <div>
                                  <Divider>
                                    <Chip
                                      label="Müze"
                                      size="small"
                                      sx={{
                                        backgroundColor: "#312566",
                                        color: "white",
                                      }}
                                    />
                                  </Divider>
                                  {option.museumPhotoUrl && (
                                    <img
                                      src={option.museumPhotoUrl}
                                      alt={Photo of ${option.museum}}
                                      style={{ width: "100%", height: "auto" }}
                                    />
                                  )}
                                  <p>{option.museum}</p>
                                  <Map latitude={option.museumLatitude} longitude={option.museumLongitude} />
                                </div>
                                <div>
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
                                  <p>{option.history}</p>
                                </div>
                              </Slider>
                            </div>
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </div>
            }
          </Box>
        </Box>
      </Grid>
    </Box>
  );
}

export default Advices;
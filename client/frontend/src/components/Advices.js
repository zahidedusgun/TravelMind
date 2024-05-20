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
    <>
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
                      <Card variant="outlined" sx={{ width: 400, height: 500 }}>
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
                                        alt={`Photo of ${option.otel}`}
                                        style={{ width: "100%", height: "auto" }}
                                      />
                                    )}
                                    <p>{option.otel}</p>
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
                                        alt={`Photo of ${option.kahve}`}
                                        style={{ width: "100%", height: "auto" }}
                                      />
                                    )}
                                    <p>{option.kahve}</p>
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
                                        alt={`Photo of ${option.restaurant}`}
                                        style={{ width: "100%", height: "auto" }}
                                      />
                                    )}
                                    <p>{option.restaurant}</p>
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
                                        alt={`Photo of ${option.museum}`}
                                        style={{ width: "100%", height: "auto" }}
                                      />
                                    )}
                                    <p>{option.museum}</p>
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
    </>
  );
}

export default Advices;

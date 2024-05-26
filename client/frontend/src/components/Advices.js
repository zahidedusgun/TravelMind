import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  Typography,
  Button,
  Modal,
} from "@mui/material";
import { DirectionsWalk, DirectionsCar } from '@mui/icons-material';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Map from "./Map";

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

function Advices({ advices }) {
  const [open, setOpen] = useState(false);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [selectedDistances, setSelectedDistances] = useState([]);

  const handleOpen = (locations, distances) => {
    setSelectedLocations(locations);
    setSelectedDistances(distances);
    setOpen(true);
  };

  const handleClose = () => {
    setSelectedLocations([]);
    setSelectedDistances([]);
    setOpen(false);
  };

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

  if (!advices || !advices.option) {
    return null; // veya bir yükleme göstergesi döndürebilirsiniz
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
                    <img src={`https:${advices.weather[dayKey].icon}`} alt="weather icon" />
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      <Grid container spacing={2}>
        {advices.option.map((option, optionIndex) => {
          const locations = [
            {
              name: option.otel,
              latitude: option.otelLatitude,
              longitude: option.otelLongitude,
            },
            {
              name: option.kahve,
              latitude: option.kahveLatitude,
              longitude: option.kahveLongitude,
            },
            {
              name: option.restaurant,
              latitude: option.restaurantLatitude,
              longitude: option.restaurantLongitude,
            },
            {
              name: option.museum,
              latitude: option.museumLatitude,
              longitude: option.museumLongitude,
            },
          ];

          const distances = option.distances || [];

          return (
            <Grid item xs={12} sm={12} md={6} key={optionIndex}>
              <Card variant="outlined" sx={{ width: 400, height: 600 }}>
                <Box>
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
                </Box>
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
                      </Slider>
                    </div>
                    <Button variant="contained" color="primary" onClick={() => handleOpen(locations, distances)}>
                      Konumları Gör
                    </Button>
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle}>
          <Typography variant="h6" component="h2">
            Konumlar ve Mesafeler
          </Typography>
          <Map locations={selectedLocations} />
          <Box mt={2}>
            <Typography variant="h6">Mesafeler ve Süreler</Typography>
            {selectedDistances.map((distance, index) => (
              <Box key={index} display="flex" alignItems="center">
                {distance.mode === "walking" ? (
                  <DirectionsWalk />
                ) : (
                  <DirectionsCar />
                )}
                <Typography>
                  {distance.from} ile {distance.to} arası: {distance.distance} - {distance.duration}
                </Typography>
              </Box>
            ))}
          </Box>
          <Button onClick={handleClose}>Kapat</Button>
        </Box>
      </Modal>
    </Box>
  );
}

export default Advices;

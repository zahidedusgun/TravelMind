import React, { useEffect, useRef } from "react";

function Map({ locations }) {
  const mapRef = useRef(null);

  useEffect(() => {
    if (!locations || locations.length === 0) return;

    const map = new window.google.maps.Map(mapRef.current, {
      center: { lat: locations[0].latitude, lng: locations[0].longitude },
      zoom: 12,
    });

    const markers = locations.map((location) => {
      return new window.google.maps.Marker({
        position: { lat: location.latitude, lng: location.longitude },
        map,
        title: location.name,
      });
    });

    const path = locations.map((location) => {
      return { lat: location.latitude, lng: location.longitude };
    });

    const polyline = new window.google.maps.Polyline({
      path: path,
      geodesic: true,
      strokeColor: "#FF0000",
      strokeOpacity: 1.0,
      strokeWeight: 2,
    });

    polyline.setMap(map);
  }, [locations]);

  return <div ref={mapRef} style={{ height: "400px", width: "100%" }} />;
}

export default Map;

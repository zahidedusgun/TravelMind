import React, { useEffect, useRef } from "react";

function Map({ latitude, longitude }) {
  const mapRef = useRef(null);

  useEffect(() => {
    const map = new window.google.maps.Map(mapRef.current, {
      center: { lat: latitude, lng: longitude },
      zoom: 14,
    });

    new window.google.maps.Marker({
      position: { lat: latitude, lng: longitude },
      map,
    });
  }, [latitude, longitude]);

  return <div ref={mapRef} style={{ height: "400px", width: "100%" }} />;
}

export default Map;

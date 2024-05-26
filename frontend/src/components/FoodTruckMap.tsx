import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Flex, Spin } from "antd";
import "leaflet/dist/leaflet.css";
import { useGetGeolocation } from "../hooks/useGetGeolocation";
import { useAppContext } from "./AppContext";

const FoodTruckMap: React.FC = () => {
  const { position: center, loading: currentPositionLoading } =
    useGetGeolocation();
  const { data, setMap, map, handleChangeMapView } = useAppContext();

  useEffect(() => {
    handleChangeMapView(center[0], center[1], 13);
  }, [center, map, handleChangeMapView]);

  return (
    <>
      {currentPositionLoading && (
        <Flex align="center" justify="center" className="loading-overlay">
          <Spin spinning={currentPositionLoading} />
        </Flex>
      )}
      <MapContainer
        center={center as L.LatLngExpression}
        zoom={13}
        style={{ height: "100vh", width: "100%" }}
        ref={setMap}
        className="food-truck-map"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {center && (
          <Marker position={center as L.LatLngExpression}>
            <Popup>You are here!</Popup>
          </Marker>
        )}
        {data.map((marker, idx) => (
          <Marker key={idx} position={[marker.latitude, marker.longitude]}>
            <Popup>
              {marker.Applicant} <br /> {marker.Address}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </>
  );
};

export default FoodTruckMap;

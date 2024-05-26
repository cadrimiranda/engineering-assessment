import { Map } from "leaflet";
import { createContext, useContext } from "react";

export type FoodTruck = {
  Address: string;
  Applicant: string;
  FacilityType: string;
  foodItems?: string;
  dayshours?: string;
  LocationDescription: string;
  longitude: number;
  latitude: number;
};

export const AppContext = createContext<{
  data: FoodTruck[];
  map: Map | null;
  setMap: (map: Map) => void;
  handleChangeMapView: (lat: number, long: number, zoom?: number) => void;
}>({ data: [], map: null, setMap: () => {}, handleChangeMapView: () => {} });

export const useAppContext = () => useContext(AppContext);

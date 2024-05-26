import { Flex, Layout } from "antd";

const { Content } = Layout;

import "./App.css";
import React, { useCallback, useState } from "react";
import BottomList from "./components/BottomList";
import FoodTruckMap from "./components/FoodTruckMap";
import { useFetchFoodTrucks } from "./hooks/useFetchFoodTrucks";
import { AppContext } from "./components/AppContext";
import { Map } from "leaflet";

function App() {
  const [map, setMap] = useState<Map | null>(null);
  const { foodTrucks } = useFetchFoodTrucks();

  const handleChangeMapView = useCallback(
    (lat: number, long: number, zoom = 18) => {
      map?.setView([lat, long], zoom);
    },
    [map]
  );

  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <AppContext.Provider
        value={{ data: foodTrucks, map, setMap, handleChangeMapView }}
      >
        <Layout>
          <Content style={{ height: "100vh" }}>
            <Flex>
              <FoodTruckMap />
            </Flex>
            <BottomList />
          </Content>
        </Layout>
      </AppContext.Provider>
    </React.Suspense>
  );
}

export default App;

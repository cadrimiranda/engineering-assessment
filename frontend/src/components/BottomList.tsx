import React, { useState } from "react";

import { List, Card, Avatar, Badge, Flex } from "antd";
import {
  EnvironmentOutlined,
  ClockCircleOutlined,
  CaretDownOutlined,
  CaretUpOutlined,
  TruckOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { FoodTruck, useAppContext } from "./AppContext";
import { FoodTruckAutoComplete } from "./AppHeader";

function getIcon(type: string) {
  switch (type) {
    case "Truck":
      return <TruckOutlined />;
    case "Push Cart":
      return <ShoppingCartOutlined />;
    default:
      return <EnvironmentOutlined />;
  }
}

const BottomList: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const { data, map } = useAppContext();
  const [searchedData, setSearchedData] = useState<FoodTruck[] | null>(null);

  const handleToggleExpand = () => {
    setExpanded(!expanded);
  };

  const handleStartingLoading = () => {
    if (!isLoading) {
      setIsLoading(true);
    }
  };

  const handleOnSearch = (options: FoodTruck[] | null) => {
    setIsLoading(false);
    setSearchedData(options);
  };

  return (
    <div
      className="bottom-list"
      style={{
        height: expanded ? "80vh" : "80px",
      }}
    >
      <Flex
        justify="center"
        align="center"
        dir="column"
        wrap="nowrap"
        className="bottom-list-header"
      >
        {expanded ? (
          <CaretDownOutlined onClick={handleToggleExpand} />
        ) : (
          <CaretUpOutlined onClick={handleToggleExpand} />
        )}
        {expanded && (
          <FoodTruckAutoComplete
            onSearch={handleOnSearch}
            onStartSearching={handleStartingLoading}
          />
        )}
      </Flex>

      <List
        loading={isLoading}
        dataSource={searchedData ? searchedData : data}
        renderItem={(item) => (
          <List.Item
            onClick={() => {
              map?.setView([item.latitude, item.longitude], 20);
              setExpanded(false);
            }}
          >
            <Card className="food-truck-card">
              <Card.Meta
                avatar={<Avatar icon={getIcon(item.FacilityType)} />}
                title={<strong>{item.Applicant}</strong>}
                description={
                  <>
                    <p>{item.LocationDescription}</p>
                    {item.dayshours && (
                      <p style={{ margin: 0 }}>
                        <Badge status="success" text={item.dayshours} />
                        <ClockCircleOutlined style={{ marginLeft: 8 }} />
                      </p>
                    )}
                    <p>{item.foodItems}</p>
                  </>
                }
              />
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default BottomList;

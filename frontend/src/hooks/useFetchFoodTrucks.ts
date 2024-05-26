import { useEffect, useState } from "react";
import { parse } from "csv-parse/browser/esm/sync";
import { FoodTruck } from "../components/AppContext";

type RawData = Omit<FoodTruck, "longitude" | "latitude"> & {
  Longitude: string;
  Latitude: string;
  Status: "APPROVED" | "REQUESTED" | "EXPIRED" | "ISSUED" | "SUSPEND";
};

const useFetchFoodTrucks = () => {
  const [foodTrucks, setFoodTrucks] = useState<FoodTruck[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchFoodTrucks = async () => {
      setLoading(true);
      const response = await fetch(
        "https://data.sfgov.org/api/views/rqzj-sfat/rows.csv"
      );

      const text = await response.text();
      const parsedData: RawData[] = parse(text, {
        columns: true, // assumes the first row of CSV are headers
        skip_empty_lines: true,
        delimiter: ",",
      });
      setFoodTrucks(
        parsedData
          .filter((data) => data.Status === "APPROVED")
          .map((data) => {
            return {
              Address: data.Address,
              Applicant: data.Applicant,
              FacilityType: data.FacilityType,
              foodItems: data.foodItems,
              dayshours: data.dayshours,
              LocationDescription: data.LocationDescription,
              longitude: parseFloat(data.Longitude),
              latitude: parseFloat(data.Latitude),
            };
          })
      );
      setLoading(false);
    };

    fetchFoodTrucks();
  }, []);

  return { foodTrucks, loading };
};

export { useFetchFoodTrucks };

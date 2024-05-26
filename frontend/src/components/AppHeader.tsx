import { Input } from "antd";
import { useRef } from "react";
import { FoodTruck, useAppContext } from "./AppContext";

const FoodTruckAutoComplete = ({
  onSearch,
}: {
  onSearch: (options: FoodTruck[] | null) => void;
}) => {
  const { data } = useAppContext();
  const ref = useRef<number>(null);

  const handleSearchDebounce = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchText = event.target.value;
    if (searchText.length <= 3) {
      onSearch(null);
      return;
    }

    if (ref.current) {
      clearTimeout(ref.current);
    }

    // @ts-expect-error - setTimeout expects a number
    ref.current = setTimeout(() => {
      const filteredOptions = data.filter(
        (o) =>
          o.foodItems?.includes(searchText) || o.Applicant.includes(searchText)
      );
      onSearch(filteredOptions);
    }, 1500);
  };

  return (
    <Input
      allowClear
      className="search-input"
      onChange={handleSearchDebounce}
      placeholder="Search for name or food items"
      disabled={data.length === 0}
    />
  );
};

export { FoodTruckAutoComplete };

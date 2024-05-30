import { Input } from "antd";
import { useRef } from "react";
import { FoodTruck, useAppContext } from "./AppContext";

const FoodTruckAutoComplete = ({
  onSearch,
  onStartSearching,
}: {
  onSearch: (options: FoodTruck[] | null) => void;
  onStartSearching: (searching: boolean) => void;
}) => {
  const { data } = useAppContext();
  const ref = useRef<number>(null);

  const handleSearchDebounce = (event: React.ChangeEvent<HTMLInputElement>) => {
    onStartSearching(true);
    const searchText = event.target.value;

    if (ref.current) {
      clearTimeout(ref.current);
    }

    if (searchText.length <= 3) {
      onSearch(null);
      return;
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

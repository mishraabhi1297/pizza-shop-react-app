import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useState } from "react";
import { isNullOrEmpty } from "../utils/stringUtils";

function Order() {
  const [selectedLocation, setSelectedLocation] = useState<string>("");

  const locations = useSelector(
    (state: RootState) => state.locationSlice.locations
  );

  const onLocationChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLocation(event.target.value);
  };

  return (
    <div>
      <h2>Select a location to place an order</h2>
      {locations.length > 0 && (
        <select value={selectedLocation} onChange={onLocationChange}>
          <option value="">Select a location</option>
          {locations.map((location) => (
            <option key={location.id} value={location.id}>
              {location.name}
            </option>
          ))}
        </select>
      )}
      {!isNullOrEmpty(selectedLocation) && (
        <div>
          <h3>Here is the list of available pizzas to choose from</h3>
          {locations
            .find((x) => x.id.toString() === selectedLocation)
            ?.pizzas.map((pizza) => (
              <p key={pizza.id}>
                {pizza.name} - ${pizza.price}
              </p>
            ))}
        </div>
      )}
    </div>
  );
}

export default Order;

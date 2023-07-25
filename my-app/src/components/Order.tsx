import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useState } from "react";
import { isNullOrEmpty } from "../utils/stringUtils";
import { IPizza } from "../models/pizza";

function Order() {
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [orderedPizzas, setOrderedPizzas] = useState<IPizza[]>([]);

  const locations = useSelector(
    (state: RootState) => state.locationSlice.locations
  );

  const onLocationChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLocation(event.target.value);
  };

  const addPizzaToOrder = (pizza: IPizza) => {
    setOrderedPizzas((prev) => [...prev, pizza]);
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
              <span key={pizza.id} style={{ display: "flex" }}>
                <p style={{ margin: "5px" }}>
                  {pizza.name} - ${pizza.price}
                </p>
                <button
                  style={{ margin: "5px" }}
                  onClick={() => addPizzaToOrder(pizza)}
                >
                  Add
                </button>
              </span>
            ))}
          {orderedPizzas.length > 0 && (
            <div>
              <h3>Ordered Pizzas</h3>
              {orderedPizzas.map((orderedPizza, index) => (
                <p key={index}>
                  {orderedPizza.name} - ${orderedPizza.price}
                </p>
              ))}
              <h4>
                Total price: $
                {orderedPizzas.reduce((sum, pizza) => sum + pizza.price, 0)}
              </h4>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Order;

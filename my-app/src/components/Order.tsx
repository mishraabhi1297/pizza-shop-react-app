import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useState } from "react";
import { IPizza } from "../models/pizza";
import Dropdown, { IDropdownOption } from "./Dropdown";
import { ILocation } from "../models/location";

function Order() {
  const [selectedLocation, setSelectedLocation] = useState<
    ILocation | undefined
  >(undefined);
  const [orderedPizzas, setOrderedPizzas] = useState<IPizza[]>([]);

  const locations = useSelector(
    (state: RootState) => state.locationSlice.locations
  );

  const onLocationChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLocation(
      locations.find((x) => x.id.toString() === event.target.value)
    );
    setOrderedPizzas([]);
  };

  const addPizzaToOrder = (pizza: IPizza) => {
    setOrderedPizzas((prev) => [...prev, pizza]);
  };

  const locationDropdownOptions: IDropdownOption[] = locations.map(
    (location): IDropdownOption => ({
      value: location.id.toString(),
      label: location.name,
    })
  );

  return (
    <div>
      <h2>Select a location to place an order</h2>
      {locations.length > 0 && (
        <Dropdown
          options={locationDropdownOptions}
          onChange={onLocationChange}
        />
      )}
      {selectedLocation !== undefined && (
        <div>
          <h3>Available pizzas at {selectedLocation!.name}</h3>
          {selectedLocation!.pizzas.map((pizza) => (
            <span key={pizza.id} style={{ display: "flex" }}>
              <p style={{ margin: "5px" }}>
                {pizza.name} - {pizza.ingredients.join(", ")} - ${pizza.price}
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
                  {orderedPizza.name} - {orderedPizza.ingredients.join(", ")} -
                  ${orderedPizza.price}
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

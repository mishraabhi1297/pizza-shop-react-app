import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { useEffect, useState } from "react";
import { IPizza } from "../models/pizza";
import Dropdown, { IDropdownOption } from "./Dropdown";
import { ILocation } from "../models/location";
import {
  addPizza,
  addTopping,
  clearOrder,
  removeTopping,
  updatePizzaToppingSelection,
} from "../reduxSlices/orderSlice";

function Order() {
  const dispatch = useDispatch();

  const [selectedLocation, setSelectedLocation] = useState<
    ILocation | undefined
  >(undefined);

  const ingredients = useSelector(
    (state: RootState) => state.ingredientSlice.ingredients
  );
  const locations = useSelector(
    (state: RootState) => state.locationSlice.locations
  );
  const orderedPizzas = useSelector(
    (state: RootState) => state.orderSlice.pizzas
  );

  const onLocationChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLocation(
      locations.find((x) => x.id.toString() === event.target.value)
    );
    dispatch(clearOrder());
  };

  const addPizzaToOrder = (pizza: IPizza) => {
    dispatch(addPizza(pizza));
  };

  const changePizzaToppingSelection = (
    event: React.ChangeEvent<HTMLSelectElement>,
    index: number
  ) => {
    dispatch(
      updatePizzaToppingSelection({ index: index, topping: event.target.value })
    );
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
            <div key={pizza.id} style={{ display: "flex" }}>
              <p style={{ margin: "5px" }}>
                {pizza.name} - {pizza.ingredients.join(", ")} - ${pizza.price}
              </p>
              <button
                style={{ margin: "5px" }}
                onClick={() => addPizzaToOrder(pizza)}
              >
                Add
              </button>
            </div>
          ))}
          {orderedPizzas.length > 0 && (
            <div>
              <h3>Ordered Pizzas</h3>
              {orderedPizzas.map((orderedPizza, index) => (
                <div
                  key={index}
                  style={{
                    borderWidth: "1px",
                    borderStyle: "solid",
                    borderColor: "cyan",
                    padding: "5px",
                    marginTop: "10px",
                  }}
                >
                  <div>
                    <b>{orderedPizza.name}</b> -{" "}
                    {orderedPizza.ingredients.join(", ")} - $
                    {orderedPizza.price}
                  </div>
                  {orderedPizza.toppings &&
                    orderedPizza.toppings.length > 0 && (
                      <p>Toppings: {orderedPizza.toppings.join(", ")}</p>
                    )}
                  <div style={{ display: "flex" }}>
                    <p style={{ margin: "5px" }}>
                      Add or remove toppings ($1 extra for each topping)
                    </p>
                    <button
                      style={{ margin: "5px" }}
                      onClick={() => dispatch(removeTopping(index))}
                    >
                      -
                    </button>
                    <div style={{ margin: "5px" }}>
                      <Dropdown
                        options={ingredients.map((ingredient) => ({
                          value: ingredient,
                          label: ingredient,
                        }))}
                        onChange={(
                          event: React.ChangeEvent<HTMLSelectElement>
                        ) => changePizzaToppingSelection(event, index)}
                      />
                    </div>
                    <button
                      style={{ margin: "5px" }}
                      onClick={() => dispatch(addTopping(index))}
                    >
                      +
                    </button>
                  </div>
                </div>
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

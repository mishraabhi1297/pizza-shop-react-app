import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import {
  addTopping,
  removeTopping,
  updatePizzaToppingSelection,
} from "../reduxSlices/orderSlice";
import Dropdown from "./Dropdown";

function OrderedPizzas() {
  const dispatch = useDispatch();

  const orderedPizzas = useSelector(
    (state: RootState) => state.orderSlice.pizzas
  );
  const ingredients = useSelector(
    (state: RootState) => state.ingredientSlice.ingredients
  );

  return (
    <div>
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
                {orderedPizza.ingredients.join(", ")} - ${orderedPizza.price}
              </div>
              {orderedPizza.toppings && orderedPizza.toppings.length > 0 && (
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
                    onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
                      dispatch(
                        updatePizzaToppingSelection({
                          index: index,
                          topping: event.target.value,
                        })
                      )
                    }
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
  );
}

export default OrderedPizzas;

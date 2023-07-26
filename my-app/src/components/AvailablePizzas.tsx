import { useDispatch } from "react-redux";
import { addPizza } from "../reduxSlices/orderSlice";
import { ILocation } from "../models/location";

interface IAvailablePizzasProps {
  location: ILocation;
}

const AvailablePizzas: React.FC<IAvailablePizzasProps> = (props) => {
  const dispatch = useDispatch();

  return (
    <div>
      <h3>Available pizzas at {props.location.name}</h3>
      {props.location.pizzas.map((pizza) => (
        <div key={pizza.id} style={{ display: "flex" }}>
          <p style={{ margin: "5px" }}>
            {pizza.name} - {pizza.ingredients.join(", ")} - ${pizza.price}
          </p>
          <button
            style={{ margin: "5px" }}
            onClick={() => dispatch(addPizza(pizza))}
          >
            Add
          </button>
        </div>
      ))}
    </div>
  );
};

export default AvailablePizzas;

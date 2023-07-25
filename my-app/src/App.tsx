import { useSelector } from "react-redux";
import { RootState } from "./store";

function App() {
  const locations = useSelector(
    (state: RootState) => state.locationSlice.locations
  );

  return (
    <div>
      <h1>Welcome to Dynamite Pizza</h1>
      {locations.map((location) => (
        <h2>
          {location.id}: {location.name} - {location.pizzas.length}
        </h2>
      ))}
    </div>
  );
}

export default App;

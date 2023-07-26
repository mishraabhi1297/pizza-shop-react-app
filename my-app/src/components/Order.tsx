import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { useState } from "react";
import Dropdown, { IDropdownOption } from "./Dropdown";
import { ILocation } from "../models/location";
import { clearOrder } from "../reduxSlices/orderSlice";
import OrderedPizzas from "./OrderedPizzas";
import AvailablePizzas from "./AvailablePizzas";

function Order() {
  const dispatch = useDispatch();

  const [selectedLocation, setSelectedLocation] = useState<
    ILocation | undefined
  >(undefined);

  const locations = useSelector(
    (state: RootState) => state.locationSlice.locations
  );

  const onLocationChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLocation(
      locations.find((x) => x.id.toString() === event.target.value)
    );
    dispatch(clearOrder());
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
          <AvailablePizzas location={selectedLocation} />
          <OrderedPizzas />
        </div>
      )}
    </div>
  );
}

export default Order;

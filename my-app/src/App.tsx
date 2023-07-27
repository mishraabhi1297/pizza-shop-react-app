import { useState } from "react";
import "./App.css";
import Order from "./components/Order";
import { MenuItems } from "./constants/menuItemConstants";

function App() {
  const [currentMenu, setCurrentMenu] = useState(MenuItems.PlaceOrder);

  const changeMenu = (item: string) => {
    setCurrentMenu(item);
  };

  const displayMenuItem = () => {
    switch (currentMenu) {
      case MenuItems.AddLocation:
        return <div></div>;
      case MenuItems.UpdateMenu:
        return <div></div>;
      default:
        return <Order />;
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Welcome to Dynamite Pizza</h1>
      <div style={{ display: "flex" }}>
        <div
          className="menu-item"
          onClick={() => changeMenu(MenuItems.PlaceOrder)}
        >
          Place order
        </div>
        <div
          className="menu-item"
          onClick={() => changeMenu(MenuItems.AddLocation)}
        >
          Add new location
        </div>
        <div
          className="menu-item"
          onClick={() => changeMenu(MenuItems.UpdateMenu)}
        >
          Change menu
        </div>
      </div>
      {displayMenuItem()}
    </div>
  );
}

export default App;

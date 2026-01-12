import Menu from "./pages/menu.jsx";
import Switch from "./pages/Switch.jsx";
function App() {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", height: "100vh", padding: "0 20px" }}>
      <Menu />
      <div style={{ marginLeft: "auto" }}>
        <Switch />
      </div>
    </div>
  );
}

export default App;

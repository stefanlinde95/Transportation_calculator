import "./App.css";
import TransportationForm from "./pages/transportationForm";
import { Route, Link, Routes, BrowserRouter } from "react-router-dom";
import Orders from "./pages/orders";
import { Box, Container } from "@mui/system";
import { TabsContext } from "@mui/base";

function App() {
  return (
    <BrowserRouter>
      <nav id="main-nav">
        <Link to="/">Home</Link>
        <Link to="/orders">Orders</Link>
      </nav>
      <Routes>
        <Route index path="/" element={<TransportationForm />} />
        <Route path="/orders" element={<Orders />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

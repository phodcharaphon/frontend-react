import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./components/Login";
import Users from "./pages/Users";
import AddUser from "./pages/AddUser";
import EditUser from "./pages/EditUser";
import Products from "./pages/Products";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import Drivings from "./pages/Drivings";
import AddDriving from "./pages/AddDriving";
import EditDriving from "./pages/EditDriving";
import Stores from "./pages/Stores";
import AddStore from "./pages/AddStore";
import EditStore from "./pages/EditStore";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/add" element={<AddUser />} />
          <Route path="/users/edit/:id" element={<EditUser />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/add" element={<AddProduct />} />
          <Route path="/products/edit/:id" element={<EditProduct />} />
          <Route path="/stores" element={<Stores />} />
          <Route path="/stores/add" element={<AddStore />} />
          <Route path="/stores/edit/:id" element={<EditStore />} />
          <Route path="/drivings" element={<Drivings />} />
          <Route path="/drivings/add" element={<AddDriving />} />
          <Route path="/drivings/edit/:id" element={<EditDriving />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

import { useState } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import DashboardWrapper from "./pages/dashboard/DashboardWrapper";
import Dashboard from "./pages/dashboard/Dashboard";
import Inventory from "./pages/inventory/Inventory";
import Products from "./pages/products/Products";
import Users from "./pages/users/Users";
import Settings from "./pages/settings/Settings";
import Expenses from "./pages/expenses/Expenses";
import CreateProduct from "./pages/createProduct/CreateProduct";
import Category from "./pages/category/Category";

function App() {
  const [sidebar, setSidebar] = useState(false);

  const rootPath = import.meta.env.VITE_JSP_DEFAULT_PATH;

  return (
    <HashRouter>
      <DashboardWrapper sidebarState={{ sidebar, setSidebar }}>
        <Routes>
          <Route path={`${rootPath}/dashboard`} element={<Dashboard />} />
          <Route path={`${rootPath}/inventory`} element={<Inventory />} />
          <Route path={`${rootPath}/products`} element={<Products />} />
          <Route
            path={`${rootPath}/create-product`}
            element={<CreateProduct />}
          />
          <Route path={`${rootPath}/users`} element={<Users />} />
          <Route path={`${rootPath}/settings`} element={<Settings />} />
          <Route path={`${rootPath}/expenses`} element={<Expenses />} />
          <Route path={`${rootPath}/category`} element={<Category />} />
        </Routes>
      </DashboardWrapper>
    </HashRouter>
  );
}

export default App;

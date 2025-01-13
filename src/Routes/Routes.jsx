import { Route, Routes } from "react-router";
import App from "../App";
import Login from "../pages/Login";
import Register from "../pages/Register";

<Routes>
  <Route index element={App} />
  <Route path="login" element={<Login />} />
  <Route path="register" element={<Register />} />
</Routes>;

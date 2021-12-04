import React, { useEffect, useState } from "react";
import { Route} from "react-router-dom";
import { useDispatch } from "react-redux";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import "./App.css";
import Home from "./components/home/Home";
import ProductDetail from "./components/products/ProductDetail";
import Login from "./components/user/Login";
import Register from "./components/user/Register";
import Profile from "./components/user/Profile";
import { loadUser } from "./store/actions/userActions";
import ProtectedRoute from "./components/routes/ProtectedRoute";
import UpdateProfile from "./components/user/UpdateProfile";
import UpdatePassword from "./components/user/UpdatePassword";
import ForgotPassword from "./components/user/ForgotPassword";
import NewPassword from "./components/user/NewPassword";
import Cart from "./components/cart/Cart";
import Shipping from "./components/cart/Shipping";
import ConfirmOrder from "./components/cart/ConfirmOrder";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import Payment from "./components/cart/Payment";
import { Elements } from "@stripe/react-stripe-js";
import OrderSuccess from "./components/cart/OrderSuccess";
import ListOrder from "./components/order/ListOrder";
import OrderDetails from "./components/order/OrderDetails";
import Dashboard from "./components/admin/Dashboard";
import ProductList from "./components/admin/ProductList";
import NewProduct from "./components/admin/NewProduct";
import UpdateProduct from "./components/admin/UpdateProduct";
import OrdersList from "./components/admin/OrdersList";
import ProcessOrder from "./components/admin/ProcessOrder";
function App() {
  const dispatch = useDispatch();
  const [stripeApiKey, setstripeApiKey] = useState("");
  useEffect(() => {
    dispatch(loadUser());
    async function getStripeApiKey() {
      const { data } = await axios.get("/api/stripeapi");
      setstripeApiKey(data.stripeApiKey);
    }
    getStripeApiKey();
  });
  return (
    <div className="App">
      <Header />
   
      <div className="container container_fluid">
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/search/:keyword">
            <Home />
          </Route>
          <Route path="/product/:id" exact>
            <ProductDetail />
          </Route>
          <Route path="/login" exact>
            <Login />
          </Route>
          <Route path="/register" exact>
            <Register />
          </Route>
          <ProtectedRoute path="/profile" component={Profile} exact />
          <ProtectedRoute
            path="/profile/update"
            component={UpdateProfile}
            exact
          />
          <ProtectedRoute
            path="/password/change"
            component={UpdatePassword}
            exact
          />
          <Route path="/password/forgot" exact>
            <ForgotPassword />
          </Route>
          <Route path="/password/reset/:token" exact>
            <NewPassword />
          </Route>
          <Route path="/cart" exact>
            <Cart />
          </Route>
         
          <ProtectedRoute path="/order/:id" component={OrderDetails} exact />
          <ProtectedRoute path="/orders/me" component={ListOrder} exact />
          <ProtectedRoute path="/shipping" component={Shipping} exact />
          <ProtectedRoute
            path="/order/confirm"
            component={ConfirmOrder}
            exact
          />
              <ProtectedRoute path="/success" component={OrderSuccess} exact />
          {stripeApiKey && (
            <Elements stripe={loadStripe(stripeApiKey)}>
              <ProtectedRoute path="/payment" component={Payment} />
            </Elements>
          )}
      
      </div>
          {/* Admin Routes */}
          <ProtectedRoute path="/dashboard" component={Dashboard} exact  />
          <ProtectedRoute path="/admin/products" component={ProductList} />
          <ProtectedRoute path="/admin/product/new" component={NewProduct} />
          <ProtectedRoute path="/admin/product/:id" component={UpdateProduct} />
          <ProtectedRoute path="/admin/orders" component={OrdersList} />
          <ProtectedRoute path="/admin/order/:id" component={ProcessOrder} />
      <Footer />
    </div>
  );
}

export default App;

import React,{useEffect} from "react";
import { Route, Switch } from "react-router-dom";
import { useDispatch,} from "react-redux";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import "./App.css";
import Home from "./components/home/Home";
import ProductDetail from "./components/products/ProductDetail";
import Login from "./components/user/Login";
import Register from "./components/user/Register";
import Profile from "./components/user/Profile";
import {loadUser} from './store/actions/userActions'
import ProtectedRoute from "./components/routes/ProtectedRoute";
import UpdateProfile from "./components/user/UpdateProfile";

function App() {
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(loadUser())
  })
  return (
    <div className="App">
      <Header />
      <div className="container container_fluid">
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/search/:keyword" >
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
          <ProtectedRoute path="/profile/update" component={UpdateProfile} exact />
        </Switch>
      </div>
      <Footer />
    </div>
  );
}

export default App;

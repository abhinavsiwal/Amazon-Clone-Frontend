import React from "react";
import { Route, Switch } from "react-router-dom";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import "./App.css";
import Home from "./components/home/Home";
import ProductDetail from "./components/products/ProductDetail";

function App() {
  return (
    <div className="App">
      <Header />
      <div className="container container_fluid">
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/product/:id" exact>
            <ProductDetail />
          </Route>
        </Switch>
      </div>
      <Footer />
    </div>
  );
}

export default App;

import React from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import './App.css';
import Home from './components/home/Home';

function App() {
  return (
    <div className="App">
     <Header />
     <Home />
     <Footer />
    </div>
  );
}

export default App;

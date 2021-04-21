import React from 'react';
import { Container } from 'react-bootstrap'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Footer from './components/Footer';
import Header from './components/Header';
import './bootstrap.min (2).css'
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';

const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Route path='/login' component={LoginScreen} />
          <Route path='/product/:id' component={ProductScreen} />
          <Route path='/cart/:id?' component={CartScreen} />
          <Route exact path='/' component={HomeScreen} />
        </Container>
      </main>
      <Footer />
    </Router>
  );
}
// container is used here so that, the homescreen and the productscreen are in a container isolated from the header,
// which is common for both of them.

export default App;

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';


const Home = () => <div>Home Page</div>;
const Menu = () => <div>Menu Page</div>;
const Cart = () => <div>Cart Page</div>;
const Profile = () => <div>Profile Page</div>;

function App() {
  return (
    <Router>
      <div>
      <nav>
    <Link to="/">Home</Link>
    <Link to="/menu">Menu</Link>
    <Link to="/cart">Cart</Link>
    <Link to="/profile">Profile</Link>
  </nav>
        {/* You can place a Navbar component here to navigate between routes */}

        <Routes>
          <Route exact path="/" component={Home} />
          <Route path="/menu" component={Menu} />
          <Route path="/cart" component={Cart} />
          <Route path="/profile" component={Profile} />
          
          {/* Add more routes as needed */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;

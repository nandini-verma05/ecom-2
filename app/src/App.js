import HomePage from './components/homepage';
import ProductListing from './components/product_listingpage';
import ProductDescription from './components/product_detail';
import Payment from './components/payment';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import './App.css';

function App() {
  return (
    <Router>
       <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/ProductListing" element={<ProductListing />} />
        <Route path="/product" element={<ProductDescription />} />
        <Route path="/Payment" element={<Payment />} />
         
      </Routes>
  </Router>
  );;
}

export default App;

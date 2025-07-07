import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from "./landingpage/home/homepage";
import LostFoundPage from "./lost-found-page/LostFoundPage";
import ReportFound from './lost-found-page/reportfound';
import ReportLost from './lost-found-page/reportlost';
import 'bootstrap/dist/css/bootstrap.min.css';
import BuyAndSell from './buy-sell-page/Marketplace';
import AboutUs from './landingpage/about_and_contactus/AboutUs';
import ContactUs from './landingpage/about_and_contactus/ContactUs';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/lost-and-found" element={<LostFoundPage />} />
        <Route path="/report-lost" element={<ReportLost/>} />
        <Route path="/report-found" element={<ReportFound/>} />
        <Route path="/buy-sell" element={<BuyAndSell/>} />
        <Route path="/contact" element={<ContactUs/>} />
        <Route path="/about" element={<AboutUs/>} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)

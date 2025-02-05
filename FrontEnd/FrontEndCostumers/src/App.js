import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Pages/Login';
import PlotsPage from './Pages/realEstateDetails';
import VerificationPage from './Pages/VerifyPage';
import FileListViewer from './Pages/Document/Document';
import MainListPlots from './Pages/ListPlots/MainListPlots';
import Contact from './Pages/PlotDetiels/Contact';
import UpdateProfile from './Pages/UpdateProfile';
import ThankYou from './Pages/ThankYou';



function App() {
 
  return (
    <Router>
      <div className="app">
        <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/VerifyPage" element={<VerificationPage />} />

        {/* <Route path="/UploadImage" element={<UploadImage />} /> */}
        <Route path="/PlotsPage/:id" element={<PlotsPage/>} />
        <Route exact path="/PDFViewer" element={<FileListViewer/>} />

          <Route path="/MainListPlots" element={<MainListPlots />} />
          <Route path="/UpdateProfile" element={<UpdateProfile />} />
          <Route path="/ThankYou" element={<ThankYou />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

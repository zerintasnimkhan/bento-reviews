import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReviewPage from "./Pages/ReviewPage";
//import  Card  from "./components/Card"
import Feedback from "./components/Feedback";
import FeedbackPos from "./components/FeedbackPos";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/marketPlace" element={<Feedback />}/>
      <Route path="/pos" element={<FeedbackPos />}/>
      </Routes>
      </BrowserRouter>
  );
}

export default App;
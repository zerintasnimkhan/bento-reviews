import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReviewPage from "./Pages/ReviewPage";
//import  Card  from "./components/Card"
import Feedback from "./components/Feedback";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/card" element={<ReviewPage />}/>
      <Route path="/" element={<Feedback />}/>
      </Routes>
      </BrowserRouter>
  );
}

export default App;
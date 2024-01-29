import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReviewPage from "./Pages/ReviewPage";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<ReviewPage />}/>
      </Routes>
      </BrowserRouter>
  );
}

export default App;
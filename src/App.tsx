import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Question from "./pages/Question";
import Result from "./pages/Result";
import ErrorPage from "./pages/Error";
import Navbar from "./UI/Navbar";

export default function App() {
  return (
    <div className="container mx-auto h-screen overflow-hidden">
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<Home />} />
          <Route path="/question" element={<Question />} />
          <Route path="/result" element={<Result />} />

          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </div>
  );
}

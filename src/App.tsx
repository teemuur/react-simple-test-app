import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import QuestionList from "./pages/QuestionList";
import Result from "./pages/Result";
import ErrorPage from "./pages/Error";
import Navbar from "./UI/Navbar";
import Question from "./pages/Question";

export default function App() {
  return (
    <div className="container mx-auto h-screen overflow-hidden">
      //вынести в отдельную папку
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<Home />} />
          <Route path="/questionlist" element={<QuestionList />} />
          <Route path="/result" element={<Result />} />

          <Route path="*" element={<ErrorPage />} />
        </Route>
        <Route path="/question" element={<Question />} />
      </Routes>
    </div>
  );
}

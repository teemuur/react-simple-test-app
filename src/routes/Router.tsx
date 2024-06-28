import { Route, Routes } from "react-router-dom";
import Navbar from "../UI/Navbar";
import Home from "../pages/Home";
import QuestionList from "../pages/QuestionList";
import Result from "../pages/Result";
import Question from "../pages/Question";
import NotFound from "../pages/NotFound";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Navbar />}>
        <Route index element={<Home />} />
        <Route path="/questionlist" element={<QuestionList />} />
        <Route path="/result" element={<Result />} />
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route path="/question" element={<Question />} />
    </Routes>
  );
}

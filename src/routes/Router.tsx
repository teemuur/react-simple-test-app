import { Route, Routes } from 'react-router-dom';

import Navbar from '../ui/Navbar';
import Home from '../pages/Home';
import Result from '../pages/Result';
import Question from '../pages/Question';
import NotFound from '../pages/NotFound';

export default function Router(): React.ReactElement {
  return (
    <Routes>
      <Route path="/" element={<Navbar />}>
        <Route index element={<Home />} />
        <Route path="/result" element={<Result />} />
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route path="/question" element={<Question />} />
    </Routes>
  );
}

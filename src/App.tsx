import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { ResumeUnlock } from "./pages/ResumeUnlock";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="resume" element={<ResumeUnlock />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

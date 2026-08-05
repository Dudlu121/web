import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { ResumeUnlock } from "./pages/ResumeUnlock";
import { WriteupPage } from "./pages/WriteupPage";
import { ReviewPage } from "./pages/ReviewPage";
import { WriteupsIndexPage } from "./pages/WriteupsIndexPage";
import { ReviewsIndexPage } from "./pages/ReviewsIndexPage";
import { CertificationsIndexPage } from "./pages/CertificationsIndexPage";
import { useAnimatedFavicon } from "./hooks/useAnimatedFavicon";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  useAnimatedFavicon("/favicon.mp4");

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="resume" element={<ResumeUnlock />} />
          <Route path="writeups" element={<WriteupsIndexPage />} />
          <Route path="writeups/:id" element={<WriteupPage />} />
          <Route path="reviews" element={<ReviewsIndexPage />} />
          <Route path="reviews/thm-ai-cert" element={<ReviewPage />} />
          <Route path="certifications" element={<CertificationsIndexPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

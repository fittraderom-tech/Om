import { Suspense, lazy, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { VideoDataProvider } from './context/VideoDataProvider';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { BackToTop } from './components/layout/BackToTop';
import { HomePage } from './pages/HomePage';
import { VideosPage } from './pages/VideosPage';
import { PricingPage } from './pages/PricingPage';

const VideoModal = lazy(() => import('./components/video/VideoModal').then((m) => ({ default: m.VideoModal })));

// Client-side route changes don't touch the scroll position or jump to a
// hash on their own — this keeps `Link to="/#categories"`-style navigation
// (used to get back to homepage anchors from other pages) working, and
// resets to the top on a plain page change.
function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    window.scrollTo({ top: 0 });
  }, [pathname, hash]);

  return null;
}

function App() {
  const [searchValue, setSearchValue] = useState('');
  const [activeVideo, setActiveVideo] = useState(null);
  // Once true, VideoModal stays mounted (even with video=null) so its own
  // close animation can play — only the *first* open needs to lazy-load it.
  const [modalMounted, setModalMounted] = useState(false);

  const openVideo = (video) => {
    setModalMounted(true);
    setActiveVideo(video);
  };

  return (
    <BrowserRouter>
      <VideoDataProvider>
        <ScrollManager />
        <Navbar searchValue={searchValue} onSearchChange={setSearchValue} />
        <main>
          <Routes>
            <Route path="/" element={<HomePage searchValue={searchValue} onOpenVideo={openVideo} />} />
            <Route path="/videos" element={<VideosPage searchValue={searchValue} onOpenVideo={openVideo} />} />
            <Route path="/pricing" element={<PricingPage />} />
          </Routes>
        </main>
        <Footer />
        <BackToTop />
        {modalMounted && (
          <Suspense fallback={null}>
            <VideoModal video={activeVideo} onClose={() => setActiveVideo(null)} />
          </Suspense>
        )}
      </VideoDataProvider>
    </BrowserRouter>
  );
}

export default App;

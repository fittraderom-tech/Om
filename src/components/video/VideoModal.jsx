import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { FiX } from 'react-icons/fi';
import { useLockBodyScroll } from '../../hooks/useLockBodyScroll';
import { IconButton } from '../ui/IconButton';
import { VideoModalActions } from './VideoModalActions';

const FOCUSABLE_SELECTOR = 'button, a[href], [tabindex]:not([tabindex="-1"])';

export function VideoModal({ video, onClose }) {
  const contentRef = useRef(null);
  const iframeRef = useRef(null);
  const previouslyFocused = useRef(null);
  const userTargetedFrame = useRef(false);

  useLockBodyScroll(Boolean(video));

  useEffect(() => {
    if (!video) return;
    previouslyFocused.current = document.activeElement;
    userTargetedFrame.current = false;
    const closeButton = contentRef.current?.querySelector('[data-modal-close]');
    closeButton?.focus();

    function handleKeydown(event) {
      if (event.key === 'Escape') {
        onClose();
        return;
      }
      if (event.key !== 'Tab' || !contentRef.current) return;

      const focusables = contentRef.current.querySelectorAll(FOCUSABLE_SELECTOR);
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    // YouTube's embedded player can grab focus on its own once it finishes
    // initializing, even without a click — that would otherwise silently
    // defeat Escape/Tab handling below, since a cross-origin iframe's own
    // keydowns never bubble to this document. Only allow focus to settle
    // inside the iframe if the visitor actually clicked/tapped it first.
    function handlePointerDown(event) {
      userTargetedFrame.current = event.target === iframeRef.current;
    }

    function handleFocusIn(event) {
      if (event.target === iframeRef.current && !userTargetedFrame.current) {
        contentRef.current?.querySelector('[data-modal-close]')?.focus();
      }
    }

    document.addEventListener('keydown', handleKeydown);
    document.addEventListener('pointerdown', handlePointerDown, true);
    document.addEventListener('focusin', handleFocusIn, true);
    return () => {
      document.removeEventListener('keydown', handleKeydown);
      document.removeEventListener('pointerdown', handlePointerDown, true);
      document.removeEventListener('focusin', handleFocusIn, true);
      previouslyFocused.current?.focus?.();
    };
  }, [video, onClose]);

  const modalRoot = typeof document !== 'undefined' ? document.getElementById('modal-root') : null;
  if (!modalRoot) return null;

  return createPortal(
    <AnimatePresence>
      {video && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
        >
          <motion.div
            ref={contentRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="video-modal-title"
            initial={{ opacity: 0, scale: 0.94, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            onClick={(event) => event.stopPropagation()}
            className={video.orientation === 'landscape' ? 'relative w-full max-w-4xl' : 'relative w-full max-w-sm'}
          >
            <div
              className={
                video.orientation === 'landscape'
                  ? 'relative aspect-video w-full overflow-hidden rounded-[1.5rem] bg-black shadow-2xl'
                  : 'relative aspect-[9/16] w-full overflow-hidden rounded-[2rem] bg-black shadow-2xl'
              }
            >
              <iframe
                ref={iframeRef}
                key={video.uid}
                src={video.embedUrl}
                title={video.title}
                className="h-full w-full"
                allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                allowFullScreen
              />
            </div>

            <h2 id="video-modal-title" className="sr-only">
              {video.title}
            </h2>

            <div className="mt-4 flex items-center justify-between gap-3">
              <div className="min-w-0 text-sm text-white">
                <p className="truncate font-medium">{video.title}</p>
                {video.subtitle && <p className="truncate text-white/60">{video.subtitle}</p>}
              </div>
              <VideoModalActions video={video} />
            </div>

            <IconButton
              data-modal-close
              label="Close video"
              onClick={onClose}
              icon={<FiX size={18} />}
              className="absolute -right-3 -top-3 border-white/20 bg-black/70 text-white hover:text-accent"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    modalRoot,
  );
}

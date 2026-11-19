import { FiPlay } from 'react-icons/fi';

export function PlayButtonOverlay() {
  return (
    <span className="absolute inset-0 flex items-center justify-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white shadow-lg backdrop-blur-md transition-all duration-300 group-hover:scale-110 group-hover:border-accent group-hover:bg-accent/20 group-hover:text-accent">
        <FiPlay className="ml-0.5 h-5 w-5" aria-hidden="true" />
      </span>
    </span>
  );
}

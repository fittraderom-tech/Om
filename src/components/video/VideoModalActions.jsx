import { useState } from 'react';
import { FiCheck, FiCopy, FiShare2 } from 'react-icons/fi';
import { IconButton } from '../ui/IconButton';

const DARK_ICON_BUTTON = 'border-white/20 bg-black/40 text-white hover:border-accent hover:text-accent';

export function VideoModalActions({ video }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(video.watchUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard API unavailable (permissions/insecure context) — nothing more to do here.
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: video.title, url: video.watchUrl });
      } catch {
        // User dismissed the native share sheet — not an error.
      }
      return;
    }
    handleCopy();
  };

  return (
    <div className="flex items-center gap-2">
      <IconButton
        label={copied ? 'Copied!' : video.platform === 'instagram' ? 'Copy Instagram link' : 'Copy YouTube link'}
        onClick={handleCopy}
        icon={copied ? <FiCheck /> : <FiCopy />}
        className={DARK_ICON_BUTTON}
      />
      <IconButton label="Share" onClick={handleShare} icon={<FiShare2 />} className={DARK_ICON_BUTTON} />
    </div>
  );
}

import { useContext } from 'react';
import { VideoDataContext } from '../context/VideoDataProvider';

export function useVideoData() {
  const ctx = useContext(VideoDataContext);
  if (!ctx) {
    throw new Error('useVideoData must be used within a VideoDataProvider');
  }
  return ctx;
}

import { useSelector } from 'react-redux';
import { TimelineState } from './slice';

export const useTimelineState = () => {
  return useSelector((state: { timeline: TimelineState }) => state);
};
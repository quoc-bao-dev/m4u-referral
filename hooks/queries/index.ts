/**
 * Export tất cả query hooks
 * Import ví dụ:
 * - import { useHomePage } from '@/hooks/queries';
 * - import { useVideoReferral } from '@/hooks/queries';
 */

export {
    useHomePage,
    type HomePageData,
    type UseHomePageOptions,
} from './useHomePage';

export {
    useVideoReferral,
    type VideoReferralData,
    type UseVideoReferralOptions,
} from './useVideoReferral';


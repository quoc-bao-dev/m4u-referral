import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import axiosInstance from '@/lib/axios';

export interface VideoReferralData {
    video_referral: string;
    image_thumbnal_referral: string;
    title_thumbnal_referral: string;
    content_thumbnal_referral: string;
}

export type UseVideoReferralOptions = Omit<
    UseQueryOptions<VideoReferralData, Error>,
    'queryKey' | 'queryFn'
>;

/**
 * Hook để fetch thông tin video referral (ApiGetVideo)
 *
 * API: https://admin.maskforyou.vn/api/ApiGetVideo
 */
export const useVideoReferral = (options?: UseVideoReferralOptions) => {
    return useQuery<VideoReferralData, Error>({
        queryKey: ['videoReferral'],
        queryFn: async () => {
            const response = await axiosInstance.get<VideoReferralData>('/ApiGetVideo');
            return response.data;
        },
        staleTime: 5 * 60 * 1000, // 5 phút
        refetchOnWindowFocus: false,
        ...options,
    });
};


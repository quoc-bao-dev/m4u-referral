import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import axiosInstance from '@/lib/axios';

export interface ReviewClient {
    id: number;
    code: string;
    fullname: string;
    phone: string;
    address: string;
    type_client: number;
    active: number;
    avatar: string;
}

export interface ReviewListItem {
    id: number;
    id_review: number | null;
    type_object: string;
    id_transaction: number;
    code_review: string;
    id_product: number;
    variant_id: number;
    id_client: number;
    active: number;
    date_active_review: string | null;
    note_rejected: string | null;
    created_at: string;
    updated_at: string;
    is_review: number;
    video_review: string;
    is_render_view: number;
    video_review_render: string;
    small_image_video_review: string;
    evaluate: number;
    content_evaluate: string;
    date_review: string;
    view_see: number;
    quantity: number;
    client: ReviewClient;
}

export interface ListReviewData {
    current_page: number;
    data: ReviewListItem[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: Array<{
        url: string | null;
        label: string;
        active: boolean;
    }>;
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
}

export interface UseListReviewParams {
    current_page?: number;
    per_page?: number;
}

export type UseListReviewOptions = Omit<
    UseQueryOptions<ListReviewData, Error>,
    'queryKey' | 'queryFn'
>;

/**
 * Hook để fetch danh sách video review (GetListReview)
 *
 * API: https://admin.maskforyou.vn/api/GetListReview
 *
 * @param params - current_page & per_page (mặc định: page 1, 10 item)
 * @param options - React Query options
 */
export const useListReview = (
    params: UseListReviewParams = { current_page: 1, per_page: 10 },
    options?: UseListReviewOptions
) => {
    const { current_page = 1, per_page = 10 } = params;

    return useQuery<ListReviewData, Error>({
        queryKey: ['listReview', current_page, per_page],
        queryFn: async () => {
            const response = await axiosInstance.get<ListReviewData>('/GetListReview', {
                params: {
                    current_page,
                    per_page,
                },
            });
            return response.data;
        },
        staleTime: 5 * 60 * 1000, // 5 phút
        refetchOnWindowFocus: false,
        ...options,
    });
};


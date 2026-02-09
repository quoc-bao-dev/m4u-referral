import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import axiosInstance from '@/lib/axios';

export interface ReviewItem {
    id_review_detail: number;
    id_review: number;
    id_product: number;
    video_review: string;
    video_review_render: string;
    small_image_video_review: string;
    image_product: string;
    name: string;
    code: string;
    color_header: string;
    background_color: string;
    limit_people: number;
    count_join: number;
    average_star: number;
    quantity_reviews: number;
    slug: string;
    date_end_promotion: string;
    time_left_dd_hh_mm_ss: string;
    isSig: number | null;
    isLimit: number;
}

export interface HomePageData {
    result: boolean;
    data: {
        section1: {
            title: string;
            title_button: string;
            content: string;
            banner: Array<{
                title: string | null;
                content: string;
                is_background: number;
                hidden_button: number;
                image: string;
                image_mobile: string;
            }>;
        };
        section2: {
            title: string;
            title_button: string;
            content: string;
            content_join: string;
        };
        section3: {
            title: string;
            subtitle: string;
            tab: Array<{
                title: string;
                subtitle: string;
                img: string;
            }>;
        };
        section4: {
            title: string;
            subtitle: string;
            tab: Array<{
                title_header: string;
                title: string;
                subtitle: string;
                img: string;
                icon: string;
            }>;
        };
        section5: {
            title: string;
            subtitle: string;
            title_button: string;
            tab: Array<{
                title: string;
                subtitle: string;
                name_step: string;
                img: string;
            }>;
        };
        section6: {
            title: string;
            subtitle: string;
            title_button: string;
        };
        section7: {
            title: string;
            subtitle: string;
            title_button: string;
        };
        section8: {
            title: string;
            subtitle: string;
            title_button: string;
        };
        section9: {
            title: string;
            subtitle: string;
            title_button: string;
        };
        list_review_new: ReviewItem[];
        product_outstanding: Array<{
            id: number;
            code: string;
            color_header: string;
            background_color: string;
            limit_people: number;
            count_join: number;
            average_star: number;
            quantity_reviews: number;
            name: string;
            content: string;
            image: string;
            slug: string;
            date_end_promotion: string;
            time_left_dd_hh_mm_ss: string;
            isSig: number | null;
            isLimit: number;
        }>;
    };
}

export type UseHomePageOptions = Omit<
    UseQueryOptions<HomePageData, Error>,
    'queryKey' | 'queryFn'
>;

/**
 * Hook để fetch HomePage data
 * 
 * @param options - Query options
 * @returns Query result với data, isLoading, error, etc.
 * 
 * @example
 * ```tsx
 * const { data, isLoading, error } = useHomePage();
 * ```
 */
export const useHomePage = (options?: UseHomePageOptions) => {
    return useQuery<HomePageData, Error>({
        queryKey: ['homePage'],
        queryFn: async () => {
            const response = await axiosInstance.get('/HomePage');
            return response.data;
        },
        staleTime: 5 * 60 * 1000, // 5 phút
        refetchOnWindowFocus: false,
        ...options,
    });
};

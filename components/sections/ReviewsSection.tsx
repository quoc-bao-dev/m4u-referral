"use client";

import Image from "next/image";
import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';
import { useListReview, type ReviewListItem } from '@/hooks/queries';

const PER_PAGE = 2;

function ReviewsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 lg:gap-6">
      {Array.from({ length: PER_PAGE }).map((_, index) => (
        <div
          key={index}
          className="bg-white rounded-xl md:rounded-2xl p-3 md:p-4 lg:p-6 flex flex-col gap-3 md:gap-4 animate-pulse"
        >
          <div className="flex gap-3 md:gap-4">
            <div className="size-[50px] md:size-[60px] lg:size-[70px] rounded-full border-2 border-[#E5E7EB] bg-[#F3F4F6] shrink-0" />
            <div className="flex flex-col gap-1 flex-1">
              <div className="h-4 md:h-5 w-1/2 bg-[#E5E7EB] rounded" />
              <div className="h-3 md:h-4 w-1/3 bg-[#E5E7EB] rounded" />
              <div className="h-4 w-24 md:w-28 lg:w-32 bg-[#E5E7EB] rounded" />
            </div>
          </div>
          <div className="space-y-2">
            <div className="h-3 md:h-4 w-full bg-[#E5E7EB] rounded" />
            <div className="h-3 md:h-4 w-5/6 bg-[#E5E7EB] rounded" />
            <div className="h-3 md:h-4 w-2/3 bg-[#E5E7EB] rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function ReviewsSection() {
  const t = useTranslations();
  const [page, setPage] = useState(1);
  const [allReviews, setAllReviews] = useState<ReviewListItem[]>([]);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const [expandedIds, setExpandedIds] = useState<number[]>([]);
  const MAX_COLLAPSED_CHARS = 220;
  const isLoadingMoreRef = useRef(false);

  const {
    data,
    isLoading,
    isFetching,
    isError,
  } = useListReview(
    { current_page: page, per_page: PER_PAGE },
  );

  // Append dữ liệu mỗi khi đổi page
  useEffect(() => {
    if (!data?.data) return;

    setAllReviews((prev) => {
      const existingIds = new Set(prev.map((item) => item.id));
      const newItems = data.data.filter((item) => !existingIds.has(item.id));
      return [...prev, ...newItems];
    });

    // Đã load xong trang hiện tại, cho phép load tiếp
    isLoadingMoreRef.current = false;
  }, [data]);

  const hasMore = data ? data.current_page < data.last_page : false;

  // IntersectionObserver để auto load thêm khi scroll tới cuối
  useEffect(() => {
    if (!hasMore || isFetching) return;

    const target = loadMoreRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (
          entry.isIntersecting &&
          hasMore &&
          !isFetching &&
          !isLoadingMoreRef.current
        ) {
          isLoadingMoreRef.current = true;
          setPage((prev) => prev + 1);
        }
      },
      {
        root: null,
        // Load sớm hơn một chút trước khi chạm đáy để cảm giác mượt hơn
        rootMargin: '0px 0px 200px 0px',
        threshold: 0,
      }
    );

    observer.observe(target);

    return () => {
      observer.disconnect();
    };
  }, [hasMore, isFetching]);

  const handleToggleExpand = (id: number) => {
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  return (
    <section className="w-full px-3 md:px-6 lg:px-8">
      <div className="flex flex-col gap-4 md:gap-6 lg:gap-8">
        <div className="flex flex-col items-center justify-center gap-2 md:gap-3">
          <h2
            className="text-xl md:text-2xl lg:text-3xl font-bold bg-linear-to-r from-[#000087] to-[#000000] bg-[linear-gradient(118.41deg,#000087_1.2%,#000000_97.84%)] bg-clip-text text-transparent"
          >
            {t('section5.title')}
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-[#374151] text-center max-w-2xl">
            {t('section5.subtitle')}
          </p>
        </div>

        {isError && (
          <p className="text-center text-sm text-red-500">
            Không thể tải đánh giá. Vui lòng thử lại sau.
          </p>
        )}

        {isLoading && page === 1 ? (
          <ReviewsSkeleton />
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 lg:gap-6">
              {allReviews.map((review) => {
                const isExpanded = expandedIds.includes(review.id);
                const fullContent = review.content_evaluate || '';
                const isLong = fullContent.length > MAX_COLLAPSED_CHARS;
                const shouldShowToggle = isLong;
                const displayContent =
                  !isExpanded && isLong
                    ? `${fullContent.slice(0, MAX_COLLAPSED_CHARS).trimEnd()}...`
                    : fullContent;

                return (
                  <div
                    key={review.id}
                    className="bg-white rounded-xl md:rounded-2xl p-3 md:p-4 lg:p-6 flex flex-col gap-3 md:gap-4 transition-transform duration-300 ease-out hover:-translate-y-1 hover:shadow-[0px_10px_24px_0px_#00000012]"
                  >
                    <div className="flex gap-3 md:gap-4">
                      <Image
                        src={review.client.avatar || "/picture5.png"}
                        alt={review.client.fullname}
                        width={1000}
                        height={1000}
                        className="size-[50px] md:size-[60px] lg:size-[70px] rounded-full border-2 border-[#3B82F6] object-cover shrink-0"
                      />
                      <div className="flex flex-col gap-0.5 md:gap-1">
                        <h3 className="text-xl md:text-2xl font-extrabold text-[#555CF3]">
                          {review.client.fullname}
                        </h3>
                        {/* <p className="text-sm md:text-base text-[#6B7280] font-normal">
                          {review.client.address}
                        </p> */}
                        <Image
                          src="/stars.png"
                          alt="star"
                          width={1000}
                          height={1000}
                          className="w-24 md:w-28 lg:w-32 object-contain"
                        />
                      </div>
                    </div>

                    <p className="text-sm md:text-base lg:text-lg text-[#1F2937]">
                      {displayContent}
                      {shouldShowToggle && (
                        <button
                          type="button"
                          onClick={() => handleToggleExpand(review.id)}
                          className="ml-1 inline text-xs md:text-sm text-[#6B7280] underline underline-offset-2"
                        >
                          {isExpanded ? 'Thu gọn' : 'Xem thêm'}
                        </button>
                      )}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Skeleton khi load more */}
            {isFetching && page > 1 && (
              <div className="mt-2">
                <ReviewsSkeleton />
              </div>
            )}

            {/* Sentinel để tự động load thêm khi scroll xuống cuối */}
            {hasMore && (
              <div ref={loadMoreRef} className="h-6 md:h-8 w-full" />
            )}
          </>
        )}
      </div>
    </section>
  );
}



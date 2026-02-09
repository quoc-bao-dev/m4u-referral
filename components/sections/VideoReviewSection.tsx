"use client";

import useEmblaCarousel from 'embla-carousel-react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from "next/image";
import { useCallback, useEffect, useState } from 'react';
import { useHomePage } from '@/hooks/queries';
import VideoReviewSectionSkeleton from '@/components/skeletons/VideoReviewSectionSkeleton';

interface VideoReviewSectionProps {
  onDownloadApp?: () => void;
}

export default function VideoReviewSection({ onDownloadApp }: VideoReviewSectionProps) {
  const t = useTranslations();
  const { data: homePageData, isLoading } = useHomePage();

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: 'center',
      skipSnaps: false,
      dragFree: false,
    },
    []
  );
  const [selectedIndex, setSelectedIndex] = useState(0);

  const videoReviews = homePageData?.data?.list_review_new || [];

  // Update selected index khi Embla scroll
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);

    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

  // Handle click vào card để scroll đến slide đó
  const handleCardClick = useCallback((index: number) => {
    onDownloadApp?.();
    if (!emblaApi) return;
    if (index !== selectedIndex) {
      emblaApi.scrollTo(index);
    }
  }, [emblaApi, selectedIndex, onDownloadApp]);

  return (
    <section className="w-full">
      <div className="flex flex-col gap-4 md:gap-6 lg:gap-8">
        <div className="flex flex-col items-center justify-center gap-2 md:gap-3 px-3 md:px-6 lg:px-8">
          <h2
            className="text-xl md:text-2xl lg:text-3xl font-bold bg-linear-to-r from-[#000087] to-[#000000] bg-[linear-gradient(118.41deg,#000087_1.2%,#000000_97.84%)] bg-clip-text text-transparent"
          >
            {t('section3.title')}
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-[#374151] text-center max-w-2xl">{t('section3.subtitle')}</p>
        </div>

        {/* Horizontal scroll container */}
        <div
          ref={emblaRef}
          className="overflow-hidden h-[470px] lg:h-[700px] scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {isLoading ? (
            <VideoReviewSectionSkeleton count={5} />
          ) : (
            <div className="flex items-center gap-2 md:gap-4 lg:gap-6 h-full pl-2 md:pl-4 lg:pl-6 pr-2 md:pr-4 lg:pr-6">
              {videoReviews.map((review, index) => {
                const isActive = selectedIndex === index;
                const participationPercent = Math.min((review.count_join / review.limit_people) * 100, 100);
                const videoUrl = review.video_review_render || review.video_review;
                const showVideo = isActive && !!videoUrl;

                return (
                  <div
                    key={`review-${review.id_review_detail}`}
                    className="flex-[0_0_auto] min-w-0 mx-auto md:mx-0"
                  >
                    <div
                      onClick={() => handleCardClick(index)}
                      className="flex flex-col rounded-3xl bg-[#FEF0ED] overflow-hidden transition-transform duration-300 ease-out hover:-translate-y-1 hover:shadow-[0px_12px_28px_0px_#0000001A] w-[280px] md:w-[320px] lg:w-[380px] cursor-pointer"
                    >
                      <motion.div
                        animate={{
                          height: isActive ? 450 : 342,
                        }}
                        transition={{ type: 'spring', stiffness: 140, damping: 18 }}
                        className="overflow-hidden md:block hidden"
                      >
                        {showVideo ? (
                          <video
                            src={videoUrl}
                            className="w-full h-full object-cover"
                            autoPlay
                            muted
                            playsInline
                            loop
                            preload="metadata"
                          />
                        ) : (
                          <Image
                            src={review.small_image_video_review || review.image_product}
                            alt={review.name}
                            width={1000}
                            height={1000}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </motion.div>
                      <motion.div
                        animate={{
                          height: isActive ? 307 : 250,
                        }}
                        transition={{ type: 'spring', stiffness: 140, damping: 18 }}
                        className="overflow-hidden md:hidden"
                      >
                        {showVideo ? (
                          <video
                            src={videoUrl}
                            className="w-full h-full object-cover"
                            autoPlay
                            muted
                            playsInline
                            loop
                            preload="metadata"
                          />
                        ) : (
                          <Image
                            src={review.small_image_video_review || review.image_product}
                            alt={review.name}
                            width={1000}
                            height={1000}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </motion.div>
                      <div className="p-3 md:p-4 lg:p-5 flex gap-3 md:gap-4">
                        <div className="shrink-0 flex flex-col items-center justify-center">
                          <Image
                            src={review.image_product}
                            alt={review.name}
                            width={1000}
                            height={1000}
                            className="bg-white p-2 w-[60px] md:w-[70px] lg:w-[80px] aspect-60/76 object-cover  rounded-lg h-fit"
                          />
                        </div>

                        <div className="flex flex-col gap-1 md:gap-2 flex-1">
                          <div className="flex items-center gap-1 justify-between">
                            <h3 className="text-[10px] md:text-xs lg:text-sm font-bold text-[#111827]">{review.code}</h3>
                            {review.time_left_dd_hh_mm_ss && review.time_left_dd_hh_mm_ss !== '0:00:00:00' && (
                              <p className="text-[10px] md:text-xs lg:text-sm text-[#4B5563]">{review.time_left_dd_hh_mm_ss}</p>
                            )}
                          </div>
                          <p className="text-sm md:text-base lg:text-lg text-[#111827] font-medium line-clamp-2">{review.name}</p>
                          <div className="py-1 md:py-2">
                            <div className="relative w-full h-1.5 md:h-2">
                              <div
                                className="relative"
                                style={{ width: `${participationPercent}%`, maxWidth: "100%" }}
                              >
                                <div className="h-1.5 md:h-2 w-full rounded-full bg-linear-to-r from-[#FF9800] via-[#EF6C00] to-[#FF8500]"></div>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 25"
                                  className="size-6 md:size-7 lg:size-8 absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2"
                                >
                                  <path
                                    fill="#F3654A"
                                    stroke="#fff"
                                    d="M15.117 2.081a.25.25 0 0 1 .131.268l-1.377 6.883-.084.417.398.149 5.401 2.024v.001a.25.25 0 0 1 .1.069.25.25 0 0 1-.006.336l-.789.841h.007L9.184 23.479a.25.25 0 0 1-.429-.22l1.374-6.871.084-.417-.398-.15-5.402-2.028h-.001a.25.25 0 0 1-.154-.3.25.25 0 0 1 .06-.107l.003-.003L14.82 2.132v.001a.25.25 0 0 1 .297-.052Z"
                                  ></path>
                                </svg>
                              </div>
                              <div className="opacity-20 absolute top-0 left-0 h-1.5 md:h-2 w-full rounded-full bg-linear-to-r from-[#FF9800] via-[#EF6C00] to-[#FF8500]"></div>
                            </div>
                          </div>
                          <p className="text-xs md:text-sm text-[#374151]">{review.count_join}/{review.limit_people} {t('section3.participation')}</p>
                          <div className="flex items-center gap-1 justify-between pt-3 md:pt-4">
                            <h4 className="text-sm md:text-base lg:text-lg font-semibold text-[#FE6BBA]">{t('section3.register')}</h4>
                            <Image src="/ArrowRight.svg" alt="arrow-right" width={1000} height={1000} className="size-5 md:size-6 object-contain" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}


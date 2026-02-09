"use client";

import { motion } from 'framer-motion';

interface VideoReviewSectionSkeletonProps {
    count?: number;
}

export default function VideoReviewSectionSkeleton({ count = 5 }: VideoReviewSectionSkeletonProps) {
    return (
        <div className="flex items-center gap-2 md:gap-4 lg:gap-6 h-full pl-2 md:pl-4 lg:pl-6 pr-2 md:pr-4 lg:pr-6">
            {Array.from({ length: count }).map((_, index) => (
                <div
                    key={`skeleton-${index}`}
                    className="flex-[0_0_auto] min-w-0 mx-auto md:mx-0"
                >
                    <div className="flex flex-col rounded-3xl bg-[#FEF0ED] overflow-hidden w-[280px] md:w-[320px] lg:w-[380px]">
                        <div className="h-[342px] md:h-[450px] bg-gray-200 animate-pulse" />
                        <div className="p-3 md:p-4 lg:p-5 flex gap-3 md:gap-4">
                            <div className="w-[60px] md:w-[70px] lg:w-[80px] h-[76px] md:h-[89px] lg:h-[101px] bg-gray-200 rounded animate-pulse shrink-0" />
                            <div className="flex flex-col gap-1 md:gap-2 flex-1">
                                <div className="flex items-center gap-1 justify-between">
                                    <div className="h-3 md:h-4 w-16 bg-gray-200 rounded animate-pulse" />
                                    <div className="h-3 md:h-4 w-20 bg-gray-200 rounded animate-pulse" />
                                </div>
                                <div className="h-4 md:h-5 lg:h-6 w-full bg-gray-200 rounded animate-pulse" />
                                <div className="py-1 md:py-2">
                                    <div className="h-1.5 md:h-2 w-full bg-gray-200 rounded-full animate-pulse" />
                                </div>
                                <div className="h-3 md:h-4 w-24 bg-gray-200 rounded animate-pulse" />
                                <div className="flex items-center gap-1 justify-between pt-3 md:pt-4">
                                    <div className="h-4 md:h-5 lg:h-6 w-32 bg-gray-200 rounded animate-pulse" />
                                    <div className="w-5 md:w-6 h-5 md:h-6 bg-gray-200 rounded animate-pulse" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

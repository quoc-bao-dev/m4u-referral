"use client";

interface VideoSectionSkeletonProps {
    // Có thể mở rộng nếu cần trong tương lai
}

export default function VideoSectionSkeleton({ }: VideoSectionSkeletonProps) {
    return (
        <section className="w-full px-3">
            <div className="relative bg-linear-to-tr from-[#EF5EA2] via-[#F184B766] to-[#E869A4] rounded-[20px] p-1 shadow-[0px_8px_28px_0px_#7772935C]">
                <div className="bg-white rounded-[18px] overflow-hidden relative">
                    <div className="relative">
                        <div className="w-full aspect-video bg-gray-200 animate-pulse" />
                    </div>

                    <div className="px-4 py-3 flex flex-col gap-3 mr-[20%]">
                        <div className="flex items-center gap-1 md:gap-2">
                            <div className="size-[18px] rounded-full bg-gray-200 animate-pulse" />
                            <div className="h-4 w-40 bg-gray-200 rounded animate-pulse" />
                        </div>
                        <div className="space-y-2">
                            <div className="h-3 w-full bg-gray-200 rounded animate-pulse" />
                            <div className="h-3 w-5/6 bg-gray-200 rounded animate-pulse" />
                        </div>
                    </div>
                </div>
                <div className="absolute bottom-[-10%] -right-2 md:-right-4 lg:-right-6">
                    <div className="w-full max-w-[120px] md:max-w-[160px] lg:max-w-[200px] aspect-square bg-gray-200 rounded-full animate-pulse" />
                </div>
            </div>
        </section>
    );
}


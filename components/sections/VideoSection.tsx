"use client";

import Image from "next/image";
import { useState, useCallback } from "react";
import { useTranslations } from "next-intl";
import { useVideoReferral } from "@/hooks/queries";
import VideoSectionSkeleton from "@/components/skeletons/VideoSectionSkeleton";

export default function VideoSection() {
  const t = useTranslations();
  const { data: videoData, isLoading } = useVideoReferral();
  const [isPlaying, setIsPlaying] = useState(false);

  const isVideoAvailable = !!videoData?.video_referral;
  const thumbnailSrc = videoData?.image_thumbnal_referral || "/pic-video1.png";

  const handleTogglePlayPause = useCallback(() => {
    if (!isVideoAvailable) return;
    setIsPlaying((prev) => !prev);
  }, [isVideoAvailable, setIsPlaying]);

  if (isLoading) {
    return <VideoSectionSkeleton />;
  }

  return (
    <section className="w-full px-3">
      <div className="relative bg-linear-to-tr from-[#EF5EA2] via-[#F184B766] to-[#E869A4] rounded-[20px] p-1 shadow-[0px_8px_28px_0px_#7772935C]">
        <div className="bg-white bg-[url('/bg-video.png')] bg-size-[100%_100%] bg-no-repeat rounded-[18px] overflow-hidden relative">
          <div className="relative">
            {isPlaying && isVideoAvailable ? (
              <video
                src={videoData!.video_referral}
                className="w-full aspect-video object-cover"
                autoPlay
                muted
                playsInline
                controls
                preload="none"
              />
            ) : (
              <Image
                src={thumbnailSrc}
                alt="bg-section1"
                width={1000}
                height={1000}
                className="w-full aspect-video object-cover"
              />
            )}

            {/* Nút Play/Pause absolute trên hình */}
            {isVideoAvailable && !isPlaying && (
              <button
                onClick={handleTogglePlayPause}
                className="cursor-pointer absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/80 rounded-full p-3 shadow-lg transition-all duration-200 ease-out hover:scale-110 active:scale-95"
                aria-label={isPlaying ? "Pause video" : "Play video"}
              >
                {isPlaying ? (
                  // Pause icon
                  // <svg
                  //   xmlns="http://www.w3.org/2000/svg"
                  //   viewBox="0 0 24 24"
                  //   fill="currentColor"
                  //   className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 text-white"
                  // >
                  //   <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                  // </svg>
                  null
                ) : (
                  // Play icon
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6 text-white"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
              </button>
            )}
          </div>

          <div className="px-4 py-3 flex flex-col gap-3 mr-[20%]">
            <div className="flex items-center gap-1 md:gap-2">
              <Image
                src="/video.svg"
                alt="play"
                width={1000}
                height={1000}
                className="size-[18px] object-contain"
              />
              <h2 className="text-base font-bold text-[#171717]">
                {videoData?.title_thumbnal_referral}
              </h2>
            </div>
            <p className="text-xs text-[#525252] font-medium">
              {videoData?.content_thumbnal_referral}
            </p>
          </div>
        </div>
        <div className="absolute bottom-[-10%] -right-2">
          <Image
            src="/coins1.png"
            alt="bg-section1"
            width={1000}
            height={1000}
            className="w-full max-w-[110px] object-cover"
          />
        </div>
      </div>
    </section>
  );
}



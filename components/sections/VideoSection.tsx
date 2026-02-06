"use client";

import Image from "next/image";
import { useState, useCallback } from "react";
import { useTranslations } from 'next-intl';

export default function VideoSection() {
  const t = useTranslations();
  const [isPlaying, setIsPlaying] = useState(false);

  const handleTogglePlayPause = useCallback(() => {
    setIsPlaying((prev) => !prev);
    // TODO: Thêm logic điều khiển video thật ở đây
  }, []);

  return (
    <section className="w-full px-3 md:px-6 lg:px-8">
      <div className="relative bg-linear-to-tr from-[#EF5EA2] via-[#F184B766] to-[#E869A4] rounded-[20px] md:rounded-[24px] p-1 md:p-1.5 shadow-[0px_8px_28px_0px_#7772935C]">
        <div className="bg-white bg-[url('/bg-video.png')] bg-size-[100%_100%] bg-no-repeat rounded-[18px] md:rounded-[22px] overflow-hidden relative">
          <div className="relative">
            <Image src="/pic-video1.png" alt="bg-section1" width={1000} height={1000} className="w-full aspect-video object-cover" />

            {/* Nút Play/Pause absolute trên hình */}
            <button
              onClick={handleTogglePlayPause}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/80 rounded-full p-3 md:p-4 lg:p-5 shadow-lg transition-all duration-200 ease-out hover:scale-110 active:scale-95"
              aria-label={isPlaying ? "Pause video" : "Play video"}
            >
              {isPlaying ? (
                // Pause icon
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 text-white"
                >
                  <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                </svg>
              ) : (
                // Play icon
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 text-white"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>
          </div>

          <div className="px-4 md:px-6 lg:px-8 py-3 md:py-4 lg:py-5 flex flex-col gap-3 md:gap-4 mr-[20%]">
            <div className="flex items-center gap-1 md:gap-2">
              <Image src="/video.svg" alt="play" width={1000} height={1000} className="size-[18px] md:size-5 lg:size-6 object-contain" />
              <h2 className="text-base md:text-xl lg:text-2xl font-bold text-[#171717]">{t('section1.title')}</h2>
            </div>
            <p className="text-xs md:text-sm lg:text-base text-[#525252] font-medium">{t('section1.description')}</p>
          </div>
        </div>
        <div className="absolute bottom-[-10%] -right-2 md:-right-4 lg:-right-6">
          <Image src="/coins1.png" alt="bg-section1" width={1000} height={1000} className="w-full max-w-[120px] md:max-w-[160px] lg:max-w-[200px] object-cover" />
        </div>
      </div>
    </section>
  );
}


"use client";

import Image from "next/image";
import { useTranslations } from 'next-intl';

interface CTASectionProps {
  referralCode: string;
  onCopyCode: () => void;
}

export default function CTASection({ referralCode, onCopyCode }: CTASectionProps) {
  const t = useTranslations();

  return (
    <section className="w-full">
      <div className="mx-auto w-[70%] md:w-fit bg-[#E249AF] py-2 md:py-3 lg:py-4 px-6 md:px-8 lg:px-10 rounded-full flex items-center justify-center gap-2 md:gap-3 lg:gap-4 transition-transform duration-200 ease-out hover:-translate-y-px hover:shadow-[0px_10px_24px_0px_#E249AF55]">
        <Image src="/phone.svg" alt="play" width={1000} height={1000} className="size-9 md:size-12 lg:size-14 object-contain" />
        <div className="flex flex-col gap-1 md:gap-3">
          <h2 className="text-white text-sm md:text-base lg:text-lg font-bold uppercase font-baloo">{t('section4.title')}</h2>
          <div className="flex items-center gap-1 md:gap-2">
            <span className="text-white text-xs md:text-sm lg:text-base font-medium whitespace-nowrap">{t('section4.referralCode')}</span>
            <button onClick={onCopyCode} className="flex items-center gap-1 bg-[#FFF0F8] rounded-full px-2 md:px-3 py-1 md:py-1.5 hover:bg-[#FFE0F0] transition-all duration-200 ease-out hover:-translate-y-px cursor-pointer">
              <span className="text-[#111827] text-xs md:text-sm font-medium">{referralCode}</span>
              <Image src="/copy.svg" alt="copy" width={1000} height={1000} className="size-4 md:size-5 object-contain" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}


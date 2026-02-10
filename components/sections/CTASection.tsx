"use client";

import Image from "next/image";
import { useTranslations } from 'next-intl';

interface CTASectionProps {
  referralCode: string;
  onCopyCode: () => void;
  onDownloadApp: () => void;
}

export default function CTASection({ referralCode, onCopyCode, onDownloadApp }: CTASectionProps) {
  const t = useTranslations();

  return (
    <section className="w-full">
      <div className="mx-auto w-[70%] bg-[#E249AF] py-2 px-6 rounded-full flex items-center justify-center gap-2 md:gap-3 lg:gap-4 transition-transform duration-200 ease-out hover:-translate-y-px hover:shadow-[0px_10px_24px_0px_#E249AF55]"
        onClick={onDownloadApp}
      >
        <Image src="/phone.svg" alt="play" width={1000} height={1000} className="size-9 object-contain" />
        <div className="flex flex-col gap-1">
          <h2 className="text-white text-sm font-bold uppercase font-baloo">{t('section4.title')}</h2>
          <div className="flex items-center gap-1">
            <span className="text-white text-xs font-medium whitespace-nowrap">{t('section4.referralCode')}</span>
            <button onClick={onCopyCode} className="flex items-center gap-1 bg-[#FFF0F8] rounded-full px-2 py-1 hover:bg-[#FFE0F0] transition-all duration-200 ease-out hover:-translate-y-px cursor-pointer">
              <span className="text-[#111827] text-xs md:text-sm font-medium">{referralCode}</span>
              <Image src="/copy.svg" alt="copy" width={1000} height={1000} className="size-4 md:size-5 object-contain" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}


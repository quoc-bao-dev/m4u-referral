"use client";

import Image from "next/image";
import { useTranslations } from 'next-intl';

interface HeaderProps {
  referralCode: string;
  onCopyCode: () => void;
  onDownloadApp: () => void;
}

export default function Header({ referralCode, onCopyCode, onDownloadApp }: HeaderProps) {
  const t = useTranslations();

  return (
    <header className="p-4 md:p-6 w-full flex items-center gap-3 md:gap-4 bg-[#FFFFFFAB] shadow-[0px_6px_23.5px_0px_#00000026] backdrop-blur-md rounded-b-xl bg-[url('/bg-header.png')] bg-size-[100%_100%] bg-no-repeat">
      <div className="p-2">
        <Image src="/logo.png" alt="logo" width={1000} height={1000} className="size-[43px] md:size-[56px] object-contain" />
      </div>
      <div className="flex flex-col gap-1 flex-1">
        <h2 className="text-sm md:text-base lg:text-lg text-[#D726A1] font-black uppercase font-baloo">{t('header.title')}</h2>
        <div className="flex items-center gap-1 md:gap-2">
          <h3 className="text-xs md:text-sm text-[#111827] font-normal">{t('header.referralCode')}</h3>
          <button
            onClick={onCopyCode}
            className="flex items-center gap-1 bg-[#FFF0F8] rounded-full px-2 md:px-3 py-1 md:py-1.5 hover:bg-[#FFE0F0] transition-all duration-200 ease-out hover:-translate-y-px cursor-pointer"
          >
            <span className="text-[#111827] text-xs md:text-sm">{referralCode}</span>
            <Image src="/copy.svg" alt="copy" width={1000} height={1000} className="size-4 md:size-5 object-contain" />
          </button>
        </div>
      </div>
      <button
        onClick={onDownloadApp}
        className="flex items-center gap-1 md:gap-2 bg-[#E249AF] rounded-full px-2 md:px-4 py-1.5 md:py-2 hover:bg-[#D1399F] transition-all duration-200 ease-out hover:-translate-y-px cursor-pointer"
      >
        <Image src="/phone.svg" alt="google-play" width={1000} height={1000} className="size-4 md:size-5 object-contain" />
        <p className="capitalize text-xs md:text-sm font-semibold text-white whitespace-nowrap">{t('header.downloadButton')}</p>
      </button>
    </header>
  );
}


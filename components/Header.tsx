"use client";

import { useLocale, useTranslations } from 'next-intl';
import Image from "next/image";

interface HeaderProps {
  referralCode: string;
  onCopyCode: () => void;
  onDownloadApp: () => void;
}

export default function Header({ referralCode, onCopyCode, onDownloadApp }: HeaderProps) {
  const t = useTranslations();
  const locale = useLocale();
  const isEnglish = locale === 'en';

  return (
    <header className="p-4 w-full flex items-center gap-2 bg-[#FFFFFFAB] shadow-[0px_6px_23.5px_0px_#00000026] backdrop-blur-md rounded-b-xl bg-[url('/bg-header.png')] bg-size-[100%_100%] bg-no-repeat z-99">
      <div className="p-2">
        <Image src="/logo.png" alt="logo" width={1000} height={1000} className="size-[43px] object-contain shrink-0" />
      </div>
      <div className="flex flex-col gap-1 flex-1">
        <h2 className="text-sm text-[#D726A1] font-black uppercase font-baloo">{t('header.title')}</h2>
        <div className="flex items-center gap-1">
          <h3 className="text-xs text-[#111827] font-normal whitespace-nowrap">{t('header.referralCode')}</h3>
          <button
            onClick={onCopyCode}
            className="flex items-center gap-1 bg-[#FFF0F8] rounded-full px-2 py-1 hover:bg-[#FFE0F0] transition-all duration-200 ease-out hover:-translate-y-px cursor-pointer"
          >
            <span className="text-[#111827] text-xs md:text-sm">{referralCode}</span>
            <Image src="/copy.svg" alt="copy" width={1000} height={1000} className="size-4 object-contain" />
          </button>
        </div>
      </div>
      <button
        onClick={onDownloadApp}
        className={`flex items-center gap-1 bg-[#E249AF] rounded-full px-2 py-1.5 hover:bg-[#D1399F] transition-all duration-200 ease-out hover:-translate-y-px cursor-pointer ${isEnglish ? '-mr-3' : ''}`}
      >
        <Image src="/phone.svg" alt="google-play" width={1000} height={1000} className="size-4 object-contain" />
        <p className="capitalize text-xs md:text-sm font-semibold text-white whitespace-nowrap">{t('header.downloadButton')}</p>
      </button>
    </header>
  );
}


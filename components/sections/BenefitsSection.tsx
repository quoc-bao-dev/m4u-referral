"use client";

import Image from "next/image";
import { useTranslations } from 'next-intl';

export default function BenefitsSection() {
  const t = useTranslations();

  const benefits = [
    { step: 1, imageSrc: '/picture1.png', imageWidth: 'w-[90px]', bgColor: 'bg-[#DED3E6]' },
    { step: 2, imageSrc: '/picture2.png', imageWidth: 'w-[90px]', bgColor: 'bg-[#FFF2D0]' },
    { step: 3, imageSrc: '/picture3.png', imageWidth: 'w-[121px]', bgColor: 'bg-[#DAFFF0]' },
    { step: 4, imageSrc: '/picture4.png', imageWidth: 'w-[151px]', bgColor: 'bg-[#DEEEFF]' },
  ];

  return (
    <section className="w-full px-3">
      <div className="flex flex-col gap-4 md:gap-6 lg:gap-8">
        <div className="flex flex-col items-center justify-center gap-2">
          <h2
            className="text-xl font-bold bg-linear-to-r from-[#000087] to-[#000000] bg-[linear-gradient(118.41deg,#000087_1.2%,#000000_97.84%)] bg-clip-text text-transparent"
          >
            {t('section2.title')}
          </h2>
          <p className="text-base text-[#374151] text-center max-w-2xl">{t('section2.subtitle')}</p>
        </div>
        <div className="grid grid-cols-1 gap-3">
          {benefits.map((benefit) => (
            <div
              key={benefit.step}
              className={`grid grid-cols-2 flex-col h-[90px] gap-3 ${benefit.bgColor} rounded-xl p-0 shadow-[0px_4px_12.6px_0px_#0000001A] overflow-hidden transition-transform duration-300 ease-out hover:-translate-y-1 hover:shadow-[0px_8px_20px_0px_#0000001A]`}
            >
              <div className={`flex items-center ${benefit.step === 4 ? 'justify-start' : 'justify-center'}`}>
                <Image
                  src={benefit.imageSrc}
                  alt={`step${benefit.step}`}
                  width={1000}
                  height={1000}
                  className={`${benefit.imageWidth} object-cover`}
                />
              </div>
              <div className="flex flex-col items-start justify-center gap-0.5">
                <h3 className="text-sm font-semibold text-[#171717]">{t(`section2.step${benefit.step}.title`)}</h3>
                <p className="text-[8px] text-[#171717] font-medium">{t(`section2.step${benefit.step}.description`)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


"use client";

import Image from "next/image";
import { useTranslations } from 'next-intl';

export default function ReviewsSection() {
  const t = useTranslations();

  const reviews = [
    {
      name: "Linh Trần",
      role: "Beauty Blogger tại TP.HCM",
      review: "Thật sự bất ngờ! Mình đã được dùng thử sản phẩm xịn sò miễn phí, còn được học hỏi thêm nhiều kiến thức làm đẹp hữu ích. Rất recommend nha!",
    },
    {
      name: "Linh Trần",
      role: "Beauty Blogger tại TP.HCM",
      review: "Thật sự bất ngờ! Mình đã được dùng thử sản phẩm xịn sò miễn phí, còn được học hỏi thêm nhiều kiến thức làm đẹp hữu ích. Rất recommend nha!",
    },
  ];

  return (
    <section className="w-full px-3 md:px-6 lg:px-8">
      <div className="flex flex-col gap-4 md:gap-6 lg:gap-8">
        <div className="flex flex-col items-center justify-center gap-2 md:gap-3">
          <h2
            className="text-xl md:text-2xl lg:text-3xl font-bold bg-linear-to-r from-[#000087] to-[#000000] bg-[linear-gradient(118.41deg,#000087_1.2%,#000000_97.84%)] bg-clip-text text-transparent"
          >
            {t('section5.title')}
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-[#374151] text-center max-w-2xl">{t('section5.subtitle')}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 lg:gap-6">
          {reviews.map((review, index) => (
            <div key={index} className="bg-white rounded-xl md:rounded-2xl p-3 md:p-4 lg:p-6 flex flex-col gap-3 md:gap-4 transition-transform duration-300 ease-out hover:-translate-y-1 hover:shadow-[0px_10px_24px_0px_#00000012]">
              <div className="flex gap-3 md:gap-4">
                <Image src="/picture5.png" alt="avatar" width={1000} height={1000} className="size-[50px] md:size-[60px] lg:size-[70px] rounded-full border-2 border-[#3B82F6] object-cover shrink-0" />
                <div className="flex flex-col gap-0.5 md:gap-1">
                  <h3 className="text-xl md:text-2xl font-extrabold text-[#555CF3]">{review.name}</h3>
                  <p className="text-sm md:text-base text-[#6B7280] font-normal">{review.role}</p>
                  <Image src="/stars.png" alt="star" width={1000} height={1000} className="w-24 md:w-28 lg:w-32 object-contain" />
                </div>
              </div>
              <p className="text-sm md:text-base lg:text-lg text-[#1F2937]">{review.review}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


"use client";

import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useTranslations } from 'next-intl';
import Header from '@/components/Header';
import VideoSection from '@/components/sections/VideoSection';
import BenefitsSection from '@/components/sections/BenefitsSection';
import VideoReviewSection from '@/components/sections/VideoReviewSection';
import CTASection from '@/components/sections/CTASection';
import ReviewsSection from '@/components/sections/ReviewsSection';

export default function Home() {
  const t = useTranslations();

  // Lấy các tham số từ URL hoặc sử dụng giá trị mặc định
  const [urlParams, setUrlParams] = useState({
    pid: "referral_own_media",
    af_sub1: "29VD72",
    campaign: "referral",
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      setUrlParams({
        pid: params.get("pid") || "referral_own_media",
        af_sub1: params.get("af_sub1") || "29VD72",
        campaign: params.get("campaign") || "referral",
      });
    }
  }, []);

  // Link OneLink mặc định
  const onelinkBaseUrl = "https://m4u.onelink.me/C4Tg/bm2r4msg";

  // Hàm xử lý khi bấm nút "Tải app ngay"
  const handleDownloadApp = useCallback(() => {
    const onelinkUrl = `${onelinkBaseUrl}?pid=${urlParams.pid}&af_sub1=${urlParams.af_sub1}&campaign=${urlParams.campaign}`;
    window.open(onelinkUrl, "_blank");
  }, [urlParams]);

  // Hàm copy mã giới thiệu
  const handleCopyCode = useCallback(() => {
    const code = urlParams.af_sub1;
    navigator.clipboard.writeText(code).then(() => {
      toast.success(t('header.copySuccess'), {
        position: "top-center",
        duration: 2000,
      });
    }).catch(() => {
      toast.error(t('header.copyError'), {
        position: "top-center",
        duration: 2000,
      });
    });
  }, [urlParams.af_sub1, t]);

  return (
    <div className="flex flex-col gap-4 min-h-screen bg-[#F5F5F5] font-sans">
      <Header
        referralCode={urlParams.af_sub1}
        onCopyCode={handleCopyCode}
        onDownloadApp={handleDownloadApp}
      />
      <main className="flex flex-col gap-6 md:gap-8 w-full pb-6 max-w-7xl mx-auto">
        <VideoSection />
        <BenefitsSection />
        <VideoReviewSection />
        <CTASection
          referralCode={urlParams.af_sub1}
          onCopyCode={handleCopyCode}
        />
        <ReviewsSection />
      </main>
    </div>
  );
}


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
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useHomePage } from '@/hooks/queries';

export default function Home() {
  const t = useTranslations();

  // Gọi API HomePage
  const { data: homePageData, isLoading: isLoadingHomePage, error: homePageError } = useHomePage();

  // Log dữ liệu từ API HomePage
  useEffect(() => {
    if (homePageData) {
      console.log('HomePage Data:', homePageData);
    }
    if (homePageError) {
      console.error('HomePage Error:', homePageError);
    }
  }, [homePageData, homePageError]);

  // Lấy các tham số từ URL hoặc sử dụng giá trị mặc định
  const [urlParams, setUrlParams] = useState({
    pid: "referral_own_media",
    af_sub1: "29VD72",
    campaign: "referral",
  });

  // Thông tin liên hệ lấy từ API get_info
  const [contactInfo, setContactInfo] = useState<any | null>(null);

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

  // Gọi API get_info (GET)
  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_ADMIN_API_URL}/get_info`);
        if (!res.ok) {
          throw new Error(`Request failed with status ${res.status}`);
        }
        const data = await res.json();
        setContactInfo(data);
        // console.log("Contact info:", data);
      } catch (error) {
        console.error("Failed to fetch contact info", error);
      }
    };

    fetchContactInfo();
  }, []);

  // Link OneLink mặc định
  // const onelinkBaseUrl = "https://m4u.onelink.me/C4Tg/bm2r4msg";
  const onelinkBaseUrl = contactInfo?.short_link_referral;

  // Hàm xử lý khi bấm nút "Tải app ngay"
  const handleDownloadApp = useCallback(() => {
    if (!onelinkBaseUrl) {
      console.warn("short_link_referral chưa sẵn sàng, không thể mở link tải app");
      return;
    }

    const onelinkUrl = `${onelinkBaseUrl}?pid=${urlParams.pid}&af_sub1=${urlParams.af_sub1}&campaign=${urlParams.campaign}`;
    console.log(onelinkUrl);
    window.open(onelinkUrl, "_blank");
  }, [urlParams, onelinkBaseUrl]);

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
    <div className="flex flex-col gap-4 min-h-screen overflow-x-hidden bg-[#F5F5F5] font-sans">
      <Header
        referralCode={urlParams.af_sub1}
        onCopyCode={handleCopyCode}
        onDownloadApp={handleDownloadApp}
      />
      <main className="flex flex-col gap-6 md:gap-8 w-full  pb-6 max-w-7xl mx-auto">
        <LanguageSwitcher />
        <VideoSection />
        <BenefitsSection />
        <VideoReviewSection onDownloadApp={handleDownloadApp} />
        <CTASection
          referralCode={urlParams.af_sub1}
          onCopyCode={handleCopyCode}
        />
        <ReviewsSection />
      </main>
    </div>
  );
}


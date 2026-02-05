"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

export default function Home() {
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
      // Có thể thêm thông báo copy thành công nếu cần
      alert("Đã copy mã giới thiệu!");
    });
  }, [urlParams.af_sub1]);

  return (
    <div className="flex min-h-screen bg-zinc-50 font-sans">
      <main className="flex flex-col w-full">
        <header className="p-4 w-full flex items-center gap-3 bg-[#FFFFFFAB] shadow-[0px_6px_23.5px_0px_#00000026] backdrop-blur-md rounded-b-xl bg-[url('/bg-header.png')] bg-size-[100%_100%] bg-no-repeat">
          <div className="p-2">
            <Image src="/logo.png" alt="logo" width={1000} height={1000} className="size-[43px] object-contain" />
          </div>
          <div className="flex flex-col gap-1 flex-1">
            <h2 className="text-sm text-[#D726A1] font-black uppercase font-baloo">Tải app ngay để nhận voucher giảm 30%</h2>
            <div className="flex items-center gap-1">
              <h3 className="text-xs text-[#111827] font-normal">Mã giới thiệu</h3>
              <button 
                onClick={handleCopyCode}
                className="flex items-center gap-1 bg-[#FFF0F8] rounded-full px-2 py-1 hover:bg-[#FFE0F0] transition-colors cursor-pointer"
              >
                <span className="text-[#111827] text-xs">{urlParams.af_sub1}</span>
                <Image src="/copy.svg" alt="copy" width={1000} height={1000} className="size-4 object-contain" />
              </button>
            </div>
          </div>
          <button 
            onClick={handleDownloadApp}
            className="flex items-center gap-1 bg-[#E249AF] rounded-full px-2 py-1.5 hover:bg-[#D1399F] transition-colors cursor-pointer"
          >
            <Image src="/phone.svg" alt="google-play" width={1000} height={1000} className="size-4 object-contain" />
            <p className="capitalize text-xs font-semibold text-white whitespace-nowrap">Tải app ngay</p>
          </button>
        </header>
      </main>
    </div>
  );
}

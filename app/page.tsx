"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

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
      toast.success("Đã copy mã giới thiệu!", {
        position: "top-center",
        duration: 2000,
      });
    }).catch(() => {
      toast.error("Không thể copy mã giới thiệu!", {
        position: "top-center",
        duration: 2000,
      });
    });
  }, [urlParams.af_sub1]);

  return (
    <div className="flex min-h-screen bg-[#F5F5F5] font-sans">
      <main className="flex flex-col gap-6 w-full pb-6">
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
                className="flex items-center gap-1 bg-[#FFF0F8] rounded-full px-2 py-1 hover:bg-[#FFE0F0] transition-all duration-200 ease-out hover:-translate-y-px cursor-pointer"
              >
                <span className="text-[#111827] text-xs">{urlParams.af_sub1}</span>
                <Image src="/copy.svg" alt="copy" width={1000} height={1000} className="size-4 object-contain" />
              </button>
            </div>
          </div>
          <button
            onClick={handleDownloadApp}
            className="flex items-center gap-1 bg-[#E249AF] rounded-full px-2 py-1.5 hover:bg-[#D1399F] transition-all duration-200 ease-out hover:-translate-y-px cursor-pointer"
          >
            <Image src="/phone.svg" alt="google-play" width={1000} height={1000} className="size-4 object-contain" />
            <p className="capitalize text-xs font-semibold text-white whitespace-nowrap">Tải app ngay</p>
          </button>
        </header>

        {/* section 1 */}
        <section className="px-3 w-full">
          <div className="relative bg-linear-to-tr from-[#EF5EA2] via-[#F184B766] to-[#E869A4] rounded-[20px] p-1 shadow-[0px_8px_28px_0px_#7772935C]">
            <div className="bg-white bg-[url('/bg-video.png')] bg-size-[100%_100%] bg-no-repeat rounded-[18px] overflow-hidden">
              <Image src="/pic-video.png" alt="bg-section1" width={1000} height={1000} className="w-full aspect-video object-cover" />
              <div className="px-4 py-3 flex flex-col gap-3">
                <div className="flex items-center gap-1">
                  <Image src="/video.svg" alt="play" width={1000} height={1000} className="size-[18px] object-contain" />
                  <h2 className="text-base font-bold text-[#171717]">M4U là gì?</h2>
                </div>
                <p className="text-xs text-[#525252] font-medium">Nền tảng review - kiếm thưởng - đóng góp<br /> cộng đồng</p>
              </div>
            </div>
            <div className="absolute bottom-[-10%] -right-2">
              <Image src="/coins.png" alt="bg-section1" width={1000} height={1000} className="w-full object-cover" />
            </div>
          </div>
        </section>

        {/* section 2 */}
        <section className="px-3 w-full">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col items-center justify-center gap-2">
              <h2
                className="text-xl font-bold bg-linear-to-r from-[#000087] to-[#000000] bg-[linear-gradient(118.41deg,#000087_1.2%,#000000_97.84%)] bg-clip-text text-transparent"
              >
                Tham gia ngay, lợi ích liền tay!
              </h2>
              <p className="text-base text-[#374151] text-center">Quy trình hợp tác đơn giản, giúp bạn biến đam mê làm đẹp thành thu nhập.</p>
            </div>
            <div className="flex flex-col gap-3">
              <div className="grid grid-cols-2 h-[90px] gap-3 bg-[#DED3E6] rounded-xl shadow-[0px_4px_12.6px_0px_#0000001A] overflow-hidden transition-transform duration-300 ease-out hover:-translate-y-1 hover:shadow-[0px_8px_20px_0px_#0000001A]">
                <div className="flex items-center justify-center">
                  <Image src="/picture1.png" alt="step1" width={1000} height={1000} className="w-[90px] object-cover" />
                </div>
                <div className="flex flex-col items-start justify-center gap-0.5">
                  <h3 className="text-sm font-semibold text-[#171717]">Dùng thử sản phẩm</h3>
                  <p className="text-[8px] text-[#171717] font-medium">Đăng ký dùng thử - Thưởng tối đa 80%</p>
                </div>
              </div>
              <div className="grid grid-cols-2 h-[90px] gap-3 bg-[#FFF2D0] rounded-xl shadow-[0px_4px_12.6px_0px_#0000001A] overflow-hidden transition-transform duration-300 ease-out hover:-translate-y-1 hover:shadow-[0px_8px_20px_0px_#0000001A]">
                <div className="flex items-center justify-center">
                  <Image src="/picture2.png" alt="step1" width={1000} height={1000} className="w-[90px] object-cover" />
                </div>
                <div className="flex flex-col items-start justify-center gap-0.5">
                  <h3 className="text-sm font-semibold text-[#171717]">Đánh giá nhận thưởng</h3>
                  <p className="text-[8px] text-[#171717] font-medium">Đăng ký dùng thử - Thưởng tối đa 80%</p>
                </div>
              </div>
              <div className="grid grid-cols-2 h-[90px] gap-3 bg-[#DAFFF0] rounded-xl shadow-[0px_4px_12.6px_0px_#0000001A] overflow-hidden transition-transform duration-300 ease-out hover:-translate-y-1 hover:shadow-[0px_8px_20px_0px_#0000001A]">
                <div className="flex items-center justify-center">
                  <Image src="/picture3.png" alt="step1" width={1000} height={1000} className="w-[121px] object-cover" />
                </div>
                <div className="flex flex-col items-start justify-center gap-0.5">
                  <h3 className="text-sm font-semibold text-[#171717]">Chia sẻ sản phẩm</h3>
                  <p className="text-[8px] text-[#171717] font-medium">Chia sẻ sản phẩm - Nhận 30% Haru xu</p>
                </div>
              </div>
              <div className="grid grid-cols-2 h-[90px] gap-3 bg-[#DEEEFF] rounded-xl shadow-[0px_4px_12.6px_0px_#0000001A] overflow-hidden transition-transform duration-300 ease-out hover:-translate-y-1 hover:shadow-[0px_8px_20px_0px_#0000001A]">
                <div className="flex items-center">
                  <Image src="/picture4.png" alt="step1" width={1000} height={1000} className="w-[151px] object-cover" />
                </div>
                <div className="flex flex-col items-start justify-center gap-0.5">
                  <h3 className="text-sm font-semibold text-[#171717]">Giới thiệu bạn bè</h3>
                  <p className="text-[8px] text-[#171717] font-medium">Giới thiệu nhận ngay 5% Haru xu</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* section 3 */}
        <section className="px-3 w-full">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col items-center justify-center gap-2">
              <h2
                className="text-xl font-bold bg-linear-to-r from-[#000087] to-[#000000] bg-[linear-gradient(118.41deg,#000087_1.2%,#000000_97.84%)] bg-clip-text text-transparent"
              >
                Video Review
              </h2>
              <p className="text-base text-[#374151] text-center">Những video và hình ảnh đánh giá chân thật nhất từ cộng đồng người dùng đã trải nghiệm.</p>
            </div>
            <div className="flex gap-2">
              <div className="mx-10 flex flex-col rounded-3xl bg-[#FEF0ED] overflow-hidden transition-transform duration-300 ease-out hover:-translate-y-1 hover:shadow-[0px_12px_28px_0px_#0000001A]">
                <Image src="/picture6.jpg" alt="video-review" width={1000} height={1000} className="w-full aspect-280/307 object-cover" />
                <div className="p-3 flex gap-3">
                  <Image src="/picture7.png" alt="play" width={1000} height={1000} className="w-[60px] aspect-60/76 object-contain" />
                  <div className="flex flex-col gap-1 flex-1">
                    <div className="flex items-center gap-1 justify-between">
                      <h3 className="text-[10px] font-bold text-[#111827]">MANYO</h3>
                      <p className="text-[10px] text-[#4B5563]">09h 16m 30s</p>
                    </div>
                    <p className="text-sm text-[#111827] font-medium">Panthetoin Deep Moisture Mask</p>
                    <div className="py-1">
                      <div className="relative w-full h-1.5">
                        <div
                          className="relative"
                          style={{ width: "80%", maxWidth: "100%" }}
                        >
                          <div className="h-1.5 w-full rounded-full bg-linear-to-r from-[#FF9800] via-[#EF6C00] to-[#FF8500]"></div>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 25"
                            className="size-6 absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2"
                          >
                            <path
                              fill="#F3654A"
                              stroke="#fff"
                              d="M15.117 2.081a.25.25 0 0 1 .131.268l-1.377 6.883-.084.417.398.149 5.401 2.024v.001a.25.25 0 0 1 .1.069.25.25 0 0 1-.006.336l-.789.841h.007L9.184 23.479a.25.25 0 0 1-.429-.22l1.374-6.871.084-.417-.398-.15-5.402-2.028h-.001a.25.25 0 0 1-.154-.3.25.25 0 0 1 .06-.107l.003-.003L14.82 2.132v.001a.25.25 0 0 1 .297-.052Z"
                            ></path>
                          </svg>
                        </div>
                        <div className="opacity-20 absolute top-0 left-0 h-1.5 w-full rounded-full bg-linear-to-r from-[#FF9800] via-[#EF6C00] to-[#FF8500]"></div>
                      </div>
                    </div>
                    <p className="text-xs text-[#374151]">70/100 partcipation</p>
                    <div className="flex items-center gap-1 justify-between pt-3">
                      <h4 className="text-sm font-semibold text-[#FE6BBA]">Đăng ký dùng thử</h4>
                      <Image src="/ArrowRight.svg" alt="arrow-right" width={1000} height={1000} className="size-5 object-contain" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* section 4 */}
        <section className="px-3 w-full">
          <div className="mx-auto w-fit bg-[#E249AF] py-2 px-6 rounded-full flex items-center justify-center gap-2 transition-transform duration-200 ease-out hover:-translate-y-px hover:shadow-[0px_10px_24px_0px_#E249AF55]">
            <Image src="/phone.svg" alt="play" width={1000} height={1000} className="size-9 object-contain" />
            <div className="flex flex-col gap-2">
              <h2 className="text-white text-sm font-bold uppercase font-baloo">Tải app ngay để nhận<br /> voucher giảm 30%</h2>
              <div className="flex items-center gap-1">
                <span className="text-white text-xs font-medium">Mã giới thiệu:</span>
                <button onClick={handleCopyCode} className="flex items-center gap-1 bg-[#FFF0F8] rounded-full px-2 py-1 hover:bg-[#FFE0F0] transition-all duration-200 ease-out hover:-translate-y-px cursor-pointer">
                  <span className="text-[#111827] text-xs font-medium">{urlParams.af_sub1}</span>
                  <Image src="/copy.svg" alt="copy" width={1000} height={1000} className="size-4 object-contain" />
                </button>

              </div>
            </div>
          </div>
        </section>

        {/* section 5 */}
        <section className="px-3 w-full">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col items-center justify-center gap-2">
              <h2
                className="text-xl font-bold bg-linear-to-r from-[#000087] to-[#000000] bg-[linear-gradient(118.41deg,#000087_1.2%,#000000_97.84%)] bg-clip-text text-transparent"
              >
                Người dùng nói gì về sản phẩm
              </h2>
              <p className="text-base text-[#374151] text-center">Viết review nhận ngay ưu đãi</p>
            </div>
            <div className="bg-white rounded-xl p-3 flex flex-col gap-3 transition-transform duration-300 ease-out hover:-translate-y-1 hover:shadow-[0px_10px_24px_0px_#00000012]">
              <div className="flex gap-3">
                <Image src="/picture5.png" alt="avatar" width={1000} height={1000} className="size-[50px] rounded-full border-2 border-[#3B82F6] object-cover" />
                <div className="flex flex-col gap-0.5">
                  <h3 className="text-xl font-extrabold text-[#555CF3]">Linh Trần</h3>
                  <p className="text-sm text-[#6B7280] font-normal">Beauty Blogger tại TP.HCM</p>
                  <Image src="/stars.png" alt="star" width={1000} height={1000} className="w-24 object-contain" />
                </div>
              </div>
              <p className="text-sm text-[#1F2937]">Thật sự bất ngờ! Mình đã được dùng thử sản phẩm xịn sò miễn phí, còn được học hỏi thêm nhiều kiến thức làm đẹp hữu ích. Rất recommend nha!</p>
            </div>
            <div className="bg-white rounded-xl p-3 flex flex-col gap-3 transition-transform duration-300 ease-out hover:-translate-y-1 hover:shadow-[0px_10px_24px_0px_#00000012]">
              <div className="flex gap-3">
                <Image src="/picture5.png" alt="avatar" width={1000} height={1000} className="size-[50px] rounded-full border-2 border-[#3B82F6] object-cover" />
                <div className="flex flex-col gap-0.5">
                  <h3 className="text-xl font-extrabold text-[#555CF3]">Linh Trần</h3>
                  <p className="text-sm text-[#6B7280] font-normal">Beauty Blogger tại TP.HCM</p>
                  <Image src="/stars.png" alt="star" width={1000} height={1000} className="w-24 object-contain" />
                </div>
              </div>
              <p className="text-sm text-[#1F2937]">Thật sự bất ngờ! Mình đã được dùng thử sản phẩm xịn sò miễn phí, còn được học hỏi thêm nhiều kiến thức làm đẹp hữu ích. Rất recommend nha!</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

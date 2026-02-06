"use client";

import Image from "next/image";
import { useLocale } from "next-intl";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { routing, usePathname, useRouter } from "@/i18n/routing";

const LOCALE_LABELS: Record<string, string> = {
  vi: "Tiếng Việt",
  en: "English",
  kr: "한국어",
  cn: "中文",
  th: "ไทย"
};

const FLAG_SRC: Record<string, string> = {
  vi: "/vi.png",
  en: "/en.png",
  kr: "/kr.png",
  cn: "/cn.png",
  th: "/th.png"
};

function LocaleBadge({ locale, small = false }: { locale: string; small?: boolean }) {
  const code = locale.toUpperCase();
  const src = FLAG_SRC[locale];

  if (src) {
    return (
      <Image
        src={src}
        alt={code}
        width={32}
        height={32}
        className={`${small ? "size-5" : "size-7"} rounded-full object-cover border border-gray-200 shrink-0`}
      />
    );
  }

  return (
    <div
      className={`${small ? "size-5" : "size-7"} text-[10px] md:text-xs rounded-full bg-white border border-gray-200 flex items-center justify-center font-bold text-[#E249AF] shrink-0`}
      aria-hidden
    >
      {code}
    </div>
  );
}

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const query = useMemo(() => {
    if (!searchParams) return undefined;
    const entries = Array.from(searchParams.entries());
    if (entries.length === 0) return undefined;
    return Object.fromEntries(entries);
  }, [searchParams]);

  const handleSelect = useCallback(
    (nextLocale: string) => {
      router.replace({ pathname, query }, { locale: nextLocale as any });
      setIsOpen(false);
    },
    [router, pathname, query]
  );

  useEffect(() => {
    if (!isOpen) return;
    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node | null;
      if (containerRef.current && target && !containerRef.current.contains(target)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const currentLabel = LOCALE_LABELS[locale] ?? locale.toUpperCase();

  return (
    <div ref={containerRef} className="relative ml-auto -mb-4 mr-4">
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        className="inline-flex items-center gap-1 rounded-full pl-4 text-gray-800 hover:bg-white/60 transition-colors"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="hidden md:block text-sm font-medium">{currentLabel}</span>
        {/* Avatar lớn ở ngoài: size-7 */}
        <LocaleBadge locale={locale} small={false} />
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={`size-4 transition-transform ${isOpen ? "rotate-90" : ""}`}>
          <path d="M7.5 15L12.5 10L7.5 5" stroke="#99A1AF" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
        </svg>

      </button>

      {isOpen && (
        <ul
          role="listbox"
          className="absolute right-0 top-full w-28 overflow-hidden rounded-lg border border-[#D8DAE5] bg-white shadow-lg z-999"
        >
          {routing.locales.map((l) => {
            const label = LOCALE_LABELS[l] ?? l.toUpperCase();
            const isActive = l === locale;
            return (
              <li key={l}>
                <button
                  type="button"
                  onClick={() => handleSelect(l)}
                  className={`flex w-full items-center gap-2 p-2 text-left hover:bg-gray-50 ${isActive ? "bg-gray-50 font-semibold" : ""
                    }`}
                >
                    <LocaleBadge locale={l} small />
                    <span className="truncate text-xs text-[#5B5B5B]">{label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}



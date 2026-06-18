import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Leaf,
  Zap,
  Mail,
  Phone,
  MapPin,
  ArrowUpRight,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  // Mobile Dropdown States
  const [openBrand, setOpenBrand] = useState(false);
  const [openLinks, setOpenLinks] = useState(false);
  const [openContact, setOpenContact] = useState(false);

  return (
    <footer className="relative bg-[var(--bg)] border-t border-[var(--nav-border)] text-[var(--color-text-secondary)] overflow-hidden ">
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/3 w-72 h-72 bg-emerald-500/10 blur-3xl rounded-full" />
        <div className="absolute bottom-0 right-0 w-60 h-60 bg-cyan-500/10 blur-3xl rounded-full" />
      </div>

      <div className="relative max-w-7xl mx-auto px-5 lg:px-8 py-8">
        {/* ================= DESKTOP ================= */}
        <div className="hidden md:grid grid-cols-3 gap-8 items-start">
          {/* Brand */}
          <div className="space-y-4">
            <div>
              <h2 className="text-2xl font-bold text-[var(--color-text-primary)] tracking-tight">
                SidaMOV
              </h2>

              <p className="mt-2 text-sm leading-6 text-[var(--color-text-secondary)] max-w-sm">
                {t("footer.desc")}
              </p>
            </div>

            <div className="inline-flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/20 px-4 py-3 rounded-2xl backdrop-blur-sm">
              <div className="bg-emerald-500/15 p-2 rounded-xl">
                <Leaf size={18} className="text-emerald-400" />
              </div>

              <div>
                <p className="text-sm font-semibold text-emerald-400">
                  {t("footer.paperless")}
                </p>
                <p className="text-xs text-gray-500">
                  {t("footer.fastDigital")}
                </p>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:mx-auto">
            <h3 className="text-[var(--color-text-primary)] font-semibold mb-4 text-base">
              {t("footer.quickLinks")}
            </h3>

            <div className="flex flex-col gap-3 text-sm">
              {[
                { name: t("footer.help"), path: "/help" },
                { name: t("footer.privacy"), path: "/privacy" },
                { name: t("footer.terms"), path: "/terms" },
              ].map((item, index) => (
                <Link
                  key={index}
                  to={item.path}
                  className="group flex items-center gap-2 hover:text-[var(--color-text-primary)] transition-all duration-300"
                >
                  <ArrowUpRight
                    size={14}
                    className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
                  />
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="md:text-right">
            <h3 className="text-[var(--color-text-primary)] font-semibold mb-4 text-base">
              {t("footer.contact")}
            </h3>

            <div className="space-y-3 text-sm">
              <div className="flex md:justify-end items-center gap-2">
                <MapPin size={16} className="text-emerald-400" />
                <span>{t("footer.location")}</span>
              </div>

              <div className="flex md:justify-end items-center gap-2">
                <Mail size={16} className="text-emerald-400" />
                <a
                  href="mailto:info@smuc.gov.et"
                  className="hover:text-[var(--color-text-primary)] transition-colors"
                >
                  info@smuc.gov.et
                </a>
              </div>

              <div className="flex md:justify-end items-center gap-2">
                <Phone size={16} className="text-emerald-400" />
                <span>+251-46-XXX-XXXX</span>
              </div>
            </div>
          </div>
        </div>

        {/* ================= MOBILE ================= */}
        <div className="md:hidden space-y-4">
          {/* Brand Dropdown */}
          <div className="border border-[var(--nav-border)] rounded-2xl bg-[var(--surface-soft)] backdrop-blur-sm overflow-hidden">
            <button
              onClick={() => setOpenBrand(!openBrand)}
              className="w-full flex items-center justify-between px-4 py-4 text-[var(--color-text-primary)] font-semibold"
            >
              SidaMOV
              {openBrand ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>

            {openBrand && (
              <div className="px-4 pb-4 space-y-4">
                <p className="text-[var(--color-text-secondary)] leading-6 text-sm">
                  {t("footer.desc")}
                </p>

                <div className="inline-flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/20 px-4 py-3 rounded-2xl">
                  <div className="bg-emerald-500/15 p-2 rounded-xl">
                    <Leaf size={18} className="text-emerald-400" />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-emerald-400">
                      {t("footer.paperless")}
                    </p>

                    <p className="text-xs text-gray-500">
                      {t("footer.fastDigital")}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Quick Links Dropdown */}
          <div className="border border-[var(--nav-border)] rounded-2xl bg-[var(--surface-soft)] backdrop-blur-sm overflow-hidden">
            <button
              onClick={() => setOpenLinks(!openLinks)}
              className="w-full flex items-center justify-between px-4 py-4 text-[var(--color-text-primary)] font-semibold"
            >
              {t("footer.quickLinks")}
              {openLinks ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>

            {openLinks && (
              <div className="px-4 pb-4 flex flex-col gap-3 text-sm ">
                {[
                  { name: t("footer.help"), path: "/help" },
                  { name: t("footer.privacy"), path: "/privacy" },
                  { name: t("footer.terms"), path: "/terms" },
                ].map((item, index) => (
                  <Link
                    key={index}
                    to={item.path}
                    className="group flex items-center gap-2 hover:text-[var(--color-text-primary)] transition-all duration-300"
                  >
                    <ArrowUpRight size={14} />
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Contact Dropdown */}
          <div className="border border-[var(--nav-border)] rounded-2xl bg-[var(--surface-soft)] backdrop-blur-sm overflow-hidden">
            <button
              onClick={() => setOpenContact(!openContact)}
              className="w-full flex items-center justify-between px-4 py-4 text-[var(--color-text-primary)] font-semibold"
            >
              {t("footer.contact")}
              {openContact ? (
                <ChevronUp size={18} />
              ) : (
                <ChevronDown size={18} />
              )}
            </button>

            {openContact && (
              <div className="px-4 pb-4 space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-emerald-400" />
                  <span>{t("footer.location")}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Mail size={16} className="text-emerald-400" />

                  <a
                    href="mailto:info@smuc.gov.et"
                    className="hover:text-[var(--color-text-primary)] transition-colors"
                  >
                    info@smuc.gov.et
                  </a>
                </div>

                <div className="flex items-center gap-2">
                  <Phone size={16} className="text-emerald-400" />
                  <span>+251-46-XXX-XXXX</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-[var(--nav-border)] mt-8 pt-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-sm text-[var(--color-text-secondary)] text-center md:text-left">
            © {currentYear} SidaMOV. All rights reserved.
          </p>

          <div className="flex items-center gap-2 text-sm">
            <Zap size={15} className="text-yellow-400 fill-yellow-400" />

            <span className="bg-gradient-to-r from-gray-200 to-gray-500 bg-clip-text text-transparent font-medium">
              {t("footer.building")}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

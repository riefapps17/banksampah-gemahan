/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  RefreshCw,
  Maximize2,
  Minimize2,
  ExternalLink,
  Share2,
  Check,
  Globe,
  Leaf,
  FileCode2,
  ShieldCheck,
  Zap,
  Sparkles,
  X,
  Radio,
  Menu
} from 'lucide-react';

const GAS_URL = 'https://script.google.com/macros/s/AKfycbxf2Qohpm2UAwFJY3ZX9BxVXrDVe58e6GXgsNRSZw1EcKydGpFI_9ZaL6R1W9aU2D5gew/exec';
const APP_TITLE = 'Bank Sampah Barokah Gemahan RT 03';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(15);
  const [iframeKey, setIframeKey] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showSeoModal, setShowSeoModal] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedSitemap, setCopiedSitemap] = useState(false);
  const [isSlowNotice, setIsSlowNotice] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Progressive loading animation
  useEffect(() => {
    if (!isLoading) {
      setLoadProgress(100);
      return;
    }

    setLoadProgress(20);
    const t1 = setTimeout(() => setLoadProgress(45), 300);
    const t2 = setTimeout(() => setLoadProgress(70), 800);
    const t3 = setTimeout(() => setLoadProgress(88), 1500);
    const t4 = setTimeout(() => setIsSlowNotice(true), 12000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [isLoading, iframeKey]);

  // Fullscreen listener
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Click outside to close floating menu
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  const handleIframeLoad = () => {
    setLoadProgress(100);
    setTimeout(() => {
      setIsLoading(false);
      setIsSlowNotice(false);
    }, 200);
  };

  const handleRefresh = () => {
    setIsLoading(true);
    setIsSlowNotice(false);
    setLoadProgress(20);
    setIframeKey((prev) => prev + 1);
    setIsMenuOpen(false);
  };

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        if (containerRef.current?.requestFullscreen) {
          await containerRef.current.requestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          await document.exitFullscreen();
        }
      }
    } catch (err) {
      console.error('Fullscreen toggle error:', err);
    }
    setIsMenuOpen(false);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleCopySitemap = () => {
    const sitemapUrl = `${window.location.origin}/sitemap.xml`;
    navigator.clipboard.writeText(sitemapUrl);
    setCopiedSitemap(true);
    setTimeout(() => setCopiedSitemap(false), 2500);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-screen h-screen overflow-hidden bg-white flex flex-col font-sans select-none m-0 p-0"
    >
      {/* Dynamic Nano Loading Bar at Very Top (Only visible during loading) */}
      <div
        className={`fixed top-0 left-0 right-0 h-[2px] z-50 pointer-events-none transition-opacity duration-500 ${
          isLoading ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div
          className="h-full bg-emerald-600 transition-all duration-300 ease-out"
          style={{ width: `${loadProgress}%` }}
        />
      </div>

      {/* Semantic SEO & Crawler Content for Googlebot (Hidden visually, indexed organically) */}
      <div className="sr-only" aria-hidden="true">
        <h1>Bank Sampah Barokah Gemahan RT 03 - Portal Resmi dan Layanan Nasabah</h1>
        <p>
          Selamat datang di Portal Resmi Bank Sampah Barokah Gemahan RT 03, Ringinharjo, Bantul. Aplikasi sistem informasi
          pengelolaan tabungan sampah warga, pengecekan saldo buku tabungan nasabah online, pencatatan setoran
          sampah daur ulang (kardus, botol plastik, kertas, kaleng, besi, dan anorganik), jadwal penimbangan rutin,
          dan transparansi kas lingkungan warga RT 03.
        </p>
        <h2>Layanan Utama Bank Sampah Barokah Gemahan RT 03</h2>
        <ul>
          <li>Pengecekan Saldo Nasabah Bank Sampah Gemahan RT 03 secara real-time</li>
          <li>Pencatatan Penimbangan Sampah Warga Gemahan Ringinharjo Bantul</li>
          <li>Daftar Harga Beli Sampah Daur Ulang Terupdate</li>
          <li>Laporan Mutasi Tabungan dan Penarikan Kas Sosial Warga</li>
          <li>Informasi Jadwal Pelaksanaan Timbang Sampah Lingkungan RT 03</li>
        </ul>
      </div>

      {/* 100% Fullscreen Iframe: Starts seamlessly from top: 0 with NO header bar above */}
      <main className="relative w-full h-full flex-1 overflow-hidden bg-white m-0 p-0">
        <iframe
          ref={iframeRef}
          key={iframeKey}
          src={GAS_URL}
          title={APP_TITLE}
          onLoad={handleIframeLoad}
          className="w-full h-full border-0 block m-0 p-0 bg-white"
          style={{
            contain: 'content',
            colorScheme: 'light',
          }}
          loading="eager"
          allow="accelerometer; autoplay; camera; clipboard-read; clipboard-write; encrypted-media; fullscreen; geolocation; gyroscope; microphone; picture-in-picture; web-share"
        />

        {/* Clean White Progressive Loading Overlay */}
        {isLoading && (
          <div className="absolute inset-0 z-30 bg-white flex flex-col items-center justify-center p-6 text-center transition-opacity duration-300">
            {/* Logo Badge */}
            <div className="relative mb-3">
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-200/80 flex items-center justify-center text-emerald-600 shadow-sm">
                <Leaf className="w-7 h-7 text-emerald-600 animate-pulse" />
              </div>
            </div>

            {/* Brand Title */}
            <h2 className="text-lg sm:text-xl font-bold text-slate-800 tracking-tight">
              Bank Sampah Barokah
            </h2>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Gemahan RT 03, Ringinharjo, Bantul
            </p>

            {/* Beautiful Dual-Ring Orbital Spinner */}
            <div className="relative my-5 flex items-center justify-center">
              <div className="w-11 h-11 rounded-full border-[3px] border-emerald-100" />
              <div className="absolute w-11 h-11 rounded-full border-[3px] border-transparent border-t-emerald-600 border-r-emerald-500 animate-spin" />
              <div className="absolute w-2 h-2 rounded-full bg-emerald-500/80 animate-ping" />
            </div>

            {/* Visual Progress Line */}
            <div className="w-40 sm:w-48 h-1 bg-slate-100 rounded-full overflow-hidden mb-2">
              <div
                className="h-full bg-emerald-600 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${loadProgress}%` }}
              />
            </div>

            {/* Percentage Display Only */}
            <span className="text-xs font-semibold text-emerald-700 tracking-wider font-mono">
              {loadProgress}%
            </span>

            {/* Slow loading notice fallback */}
            {isSlowNotice && (
              <div className="mt-5 p-3 rounded-xl bg-amber-50 border border-amber-200 max-w-sm text-left text-xs text-slate-700 flex items-start gap-2.5 animate-fadeIn">
                <Radio className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <p className="text-amber-900 font-medium mb-1">Memerlukan waktu sedikit lebih lama</p>
                  <p className="text-slate-600 mb-2">
                    Server Google sedang menyiapkan instance. Anda dapat memuat ulang atau membuka langsung:
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={handleRefresh}
                      className="px-2.5 py-1 rounded bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 text-[11px] font-medium"
                    >
                      Muat Ulang
                    </button>
                    <a
                      href={GAS_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2.5 py-1 rounded bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-medium flex items-center gap-1"
                    >
                      Buka Langsung <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Discreet Floating Utility Widget in Bottom-Left (Leaves Bottom-Right WhatsApp clean) */}
      <div ref={menuRef} className="fixed bottom-4 left-4 z-40">
        {/* Floating Toggle Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          title="Menu Wrapper & SEO"
          aria-label="Menu Wrapper"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 hover:bg-white text-slate-700 shadow-md hover:shadow-lg border border-slate-200/80 backdrop-blur-md transition-all duration-200 text-xs font-medium group"
        >
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <Leaf className="w-3.5 h-3.5 text-emerald-600" />
          <span className="text-[11px] text-slate-700">Menu</span>
        </button>

        {/* Floating Menu Popover */}
        {isMenuOpen && (
          <div className="absolute bottom-11 left-0 w-60 bg-white rounded-2xl shadow-2xl border border-slate-200 p-2 text-slate-700 text-xs animate-fadeIn space-y-1">
            <div className="px-2.5 py-1.5 border-b border-slate-100 flex items-center justify-between">
              <span className="font-semibold text-slate-800 text-[11px]">Bank Sampah Barokah</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200/60 font-medium">
                RT 03 Gemahan
              </span>
            </div>

            {/* Muat Ulang */}
            <button
              onClick={handleRefresh}
              className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg hover:bg-slate-50 text-slate-700 transition"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-slate-500 ${isLoading ? 'animate-spin text-emerald-600' : ''}`} />
              <span>Muat Ulang Aplikasi</span>
            </button>

            {/* Layar Penuh */}
            <button
              onClick={toggleFullscreen}
              className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg hover:bg-slate-50 text-slate-700 transition"
            >
              {isFullscreen ? (
                <Minimize2 className="w-3.5 h-3.5 text-slate-500" />
              ) : (
                <Maximize2 className="w-3.5 h-3.5 text-slate-500" />
              )}
              <span>{isFullscreen ? 'Keluar Layar Penuh' : 'Mode Layar Penuh'}</span>
            </button>

            {/* Salin Tautan */}
            <button
              onClick={handleCopyLink}
              className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg hover:bg-slate-50 text-slate-700 transition"
            >
              {copiedLink ? (
                <Check className="w-3.5 h-3.5 text-emerald-600" />
              ) : (
                <Share2 className="w-3.5 h-3.5 text-slate-500" />
              )}
              <span>{copiedLink ? 'Tautan Tersalin!' : 'Salin Tautan Portal'}</span>
            </button>

            {/* Info SEO & Sitemap */}
            <button
              onClick={() => {
                setShowSeoModal(true);
                setIsMenuOpen(false);
              }}
              className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg hover:bg-emerald-50 text-emerald-800 font-medium transition"
            >
              <Globe className="w-3.5 h-3.5 text-emerald-600" />
              <span>Info SEO & Sitemap Dinamis</span>
            </button>

            {/* Buka Asli */}
            <a
              href={GAS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg hover:bg-slate-50 text-slate-600 transition"
            >
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
              <span>Buka Script Langsung</span>
            </a>
          </div>
        )}
      </div>

      {/* SEO & Dynamic Sitemap Information Modal */}
      {showSeoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-lg bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden text-slate-700">
            {/* Modal Header */}
            <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 border border-emerald-200 flex items-center justify-center text-emerald-700">
                  <Globe className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-slate-800">Status SEO & Sitemap Dinamis</h3>
                  <p className="text-xs text-slate-500">Konfigurasi Indeks Google Organik</p>
                </div>
              </div>
              <button
                onClick={() => setShowSeoModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-5 space-y-4 max-h-[75vh] overflow-y-auto text-xs sm:text-sm">
              {/* Status Badge */}
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200/80 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-emerald-900 text-sm">Teroptimasi Penuh untuk Googlebot</h4>
                  <p className="text-xs text-emerald-700/90 mt-0.5">
                    Meta tags, canonical tag, Schema.org (JSON-LD), OpenGraph, preconnect, dan sitemap dinamis telah aktif.
                  </p>
                </div>
              </div>

              {/* Dynamic Sitemap URL */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-600 flex items-center gap-1.5">
                  <FileCode2 className="w-3.5 h-3.5 text-emerald-600" />
                  URL Sitemap Dinamis (XML)
                </label>
                <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 border border-slate-200 font-mono text-xs text-slate-700 break-all">
                  <span className="flex-1 truncate">{window.location.origin}/sitemap.xml</span>
                  <button
                    onClick={handleCopySitemap}
                    className="p-1 px-2.5 rounded bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 shrink-0 flex items-center gap-1 text-[11px] font-medium"
                  >
                    {copiedSitemap ? <Check className="w-3 h-3 text-emerald-600" /> : <Share2 className="w-3 h-3" />}
                    <span>{copiedSitemap ? 'Tersalin' : 'Salin'}</span>
                  </button>
                  <a
                    href="/sitemap.xml"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1 px-2.5 rounded bg-emerald-600 hover:bg-emerald-700 text-white shrink-0 text-[11px] font-medium flex items-center gap-1"
                  >
                    Buka <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Robots.txt */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-600 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-teal-600" />
                  Robots.txt & Akses Perayapan
                </label>
                <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 border border-slate-200 font-mono text-xs text-slate-700">
                  <span className="flex-1 truncate">{window.location.origin}/robots.txt</span>
                  <a
                    href="/robots.txt"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1 px-2.5 rounded bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 shrink-0 text-[11px] font-medium flex items-center gap-1"
                  >
                    Lihat <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Panduan Google Search Console */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <h4 className="font-semibold text-slate-800 text-xs flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  Langkah Cepat Mendaftarkan ke Google Search Console:
                </h4>
                <ol className="list-decimal list-inside space-y-1 text-slate-600 text-xs">
                  <li>
                    Buka <span className="text-slate-800 font-medium">Google Search Console</span> (search.google.com).
                  </li>
                  <li>
                    Tambahkan URL properti: <code className="text-emerald-700 font-mono text-[11px] bg-emerald-50 px-1 rounded">{window.location.origin}</code>
                  </li>
                  <li>
                    Masuk ke menu <span className="text-slate-800 font-medium">Peta Situs (Sitemaps)</span> dan kirimkan <code className="text-emerald-700 font-mono text-[11px] bg-emerald-50 px-1 rounded">sitemap.xml</code>
                  </li>
                  <li>
                    Gunakan alat <span className="text-slate-800 font-medium">Inspeksi URL</span> lalu klik <span className="text-slate-800 font-medium">Minta Pengindeksan</span> untuk memproses indeks dalam 24–48 jam.
                  </li>
                </ol>
              </div>

              {/* Keyword Indexing Tags */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-600">Kata Kunci Utama Terindeks:</label>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    'Bank Sampah Barokah',
                    'Gemahan RT 03 Ringinharjo',
                    'Cek Saldo Bank Sampah',
                    'Tabungan Sampah Online',
                    'Jadwal Penimbangan Gemahan',
                    'Daur Ulang Sampah Ringinharjo',
                    'Setoran Sampah Warga'
                  ].map((kw) => (
                    <span
                      key={kw}
                      className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[11px] border border-slate-200"
                    >
                      {kw}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-5 py-3 border-t border-slate-100 bg-slate-50/70 flex justify-end">
              <button
                onClick={() => setShowSeoModal(false)}
                className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-medium transition"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

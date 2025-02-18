import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/sections/Navbar";
import Footer from "@/sections/Footer";
import { NextIntlClientProvider } from "next-intl";
<<<<<<< HEAD
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
=======
import { getMessages, getTranslations } from "next-intl/server";
import { redirect } from "next/navigation";
import Providers from "@/Components/Providers";
>>>>>>> 32dea61207435aded6c39fe7dd5ba05841664880
import { Poppins, Tajawal } from "next/font/google";
import BackToTopButton from "@/Components/BackToTopButton";
import { GoogleAnalytics } from "@next/third-parties/google";
import WhatsappContact from "@/Components/WhatsappContact";
import OfflineChat from "@/Components/OfflineChat";

<<<<<<< HEAD
// ✅ Load Google Fonts
const poppins = Poppins({ subsets: ["latin"], weight: "300" });
const tajawal = Tajawal({ subsets: ["arabic"], weight: "400" });

// ✅ Define Metadata
export const metadata: Metadata = {
  title: "Ocean Sport Tours",
  description: "Ocean Sport Tours",
};

// ✅ Fetch Messages (Fix for Async Issue)
async function fetchMessages(locale: string) {
  const validLocales = ["fr", "en", "ar"];
=======
const poppins = Poppins({ subsets: ["latin"], weight: "300" });
const tajawal = Tajawal({ subsets: ["arabic"], weight: "400" });

export async function generateMetadata({
  params,
}: Readonly<{
  params: { locale: string };
}>) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: {
      default: t("title"),
      template: `%s | ${t("title")}`,
    },
    description: t("description"),
    keywords: t("keywords"),
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const { locale } = await params;

  const messages = await getMessages();
  const validLocales = ["fr", "en", "ar", "es", "de"];

>>>>>>> 32dea61207435aded6c39fe7dd5ba05841664880
  if (!validLocales.includes(locale)) {
    redirect("/en");
  }
  return await getMessages({ locale });
}

// ✅ Fix: `params` must be awaited before destructuring
export default async function RootLayout({ children, params }: { children: React.ReactNode; params: { locale: string } }) {
  const { locale } = params; // ✅ Fix: Destructure inside the function
  const messages = await fetchMessages(locale);
  const direction = locale === "ar" ? "rtl" : "ltr";

  return (
<<<<<<< HEAD
    <html lang={locale} dir={direction}> {/* ✅ NO EXTRA SPACE HERE */}
      <body className={locale === "ar" ? tajawal.className : poppins.className}>
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          <BackToTopButton />
          {children}
          <Footer />
=======
    <html lang={locale} dir={direction} suppressHydrationWarning>
      <body className={locale === "ar" ? tajawal.className : poppins.className}>
        <GoogleAnalytics gaId={`${process.env.GOOGLE_ANALYTICS_ID}`} />
        <NextIntlClientProvider messages={messages}>
          <Providers>
            <OfflineChat />
            <Navbar />
            <BackToTopButton />
            <WhatsappContact />
            <main>{children}</main>
            <Footer />
          </Providers>
>>>>>>> 32dea61207435aded6c39fe7dd5ba05841664880
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

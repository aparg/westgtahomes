import Navbar from "@/components/Navbar";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";
import Footer from "@/components/Footer";
import Head from "next/head";
import GoogleAnalytics from "@/components/GoogleAnalytics";

export const metadata = {
  title: "westgtahomes.ca",
  description: "",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  // viewport: {
  //   width: "device-width",
  //   initialScale: 1,
  //   maximumScale: 1,
  // },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
    },
  },
  category: "Real Estate",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* <Head>
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-EXF0Z8ZNFH"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-EXF0Z8ZNFH');
          `,
          }}
        />
      </Head> */}

      <body className="bg-white text-black ">
        <NextTopLoader
          color="#c8b575"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={200}
          shadow="0 0 10px #00A1FF,0 0 5px #00A1FF"
        />
        <Navbar />
        <GoogleAnalytics />
        <main className="">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

import type { AppProps } from "next/app";
import { PrismicPreview } from "@prismicio/next";

import { repositoryName } from "@/prismicio";
import localFont from 'next/font/local';
import clsx from 'clsx';
import '../../public/reset.css'; // Import the reset CSS file

const RationalDisplay = localFont({ src: './RationalDisplay-Bold.otf', variable: "--font-rationaldisplay" })
const Satoshi = localFont({ src: './Satoshi-Bold.otf', variable: "--font-satoshi" })
const NanumPen = localFont({ src: './NanumPenScript-Regular.ttf', variable: "--font-nanumpen" })

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={clsx(RationalDisplay.variable, Satoshi.variable, NanumPen.variable, Satoshi.className)}>
      <Component {...pageProps} />
      <PrismicPreview repositoryName={repositoryName} />
    </div>
  );
}

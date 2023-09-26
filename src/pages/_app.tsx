import type { AppProps } from "next/app";
import { PrismicPreview } from "@prismicio/next";

import { repositoryName } from "@/prismicio";
import localFont from 'next/font/local';
import clsx from 'clsx';
import '../../public/reset.css'; // Import the reset CSS file

const RationalDisplay = localFont({ src: './RationalDisplay-Bold.otf', variable: "--font-rationaldisplay" })
const NanumPen = localFont({ src: './NanumPenScript-Regular.ttf', variable: "--font-nanumpen" })
const Satoshi = localFont({
  src: [
    {
      path: './Satoshi/Satoshi-Bold.otf',
      weight: '900',
      style: 'normal',
    },
    {
      path: './Satoshi/Satoshi-BoldItalic.otf',
      weight: '900',
      style: 'italic',
    },
    {
      path: './Satoshi/Satoshi-Medium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: './Satoshi/Satoshi-MediumItalic.otf',
      weight: '500',
      style: 'italic',
    },
  ],
  variable: "--font-satoshi"
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={clsx(RationalDisplay.variable, NanumPen.variable, Satoshi.variable, Satoshi.className)}>
      <Component {...pageProps} />
      <PrismicPreview repositoryName={repositoryName} />
    </div>
  );
}

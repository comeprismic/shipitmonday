import type { AppProps } from "next/app";
import { PrismicPreview } from "@prismicio/next";

import { repositoryName } from "@/prismicio";
import localFont from 'next/font/local';

const RationalDisplay = localFont({ src: './RationalDisplay-Bold.otf' })
const Satoshi = localFont({ src: './Satoshi-Bold.otf' })
export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={RationalDisplay.className}>
      <Component {...pageProps} />
      <PrismicPreview repositoryName={repositoryName} />
    </div>
  );
}

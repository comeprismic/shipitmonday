import type { InferGetStaticPropsType, GetStaticPropsContext } from "next";
import Head from "next/head";
import * as prismic from "@prismicio/client";
import { SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices/";
import Header from "@/components/header";

type PageProps = InferGetStaticPropsType<typeof getStaticProps>;

/**
 * This component renders your homepage.
 *
 * Use Next's Head component to render page metadata.
 *
 * Use the SliceZone to render the content of the page.
 */
export default function Index({ page }: PageProps) {
  return (
    <main>
      <Head>
        <title>{prismic.asText(page.data.title)}</title>
      </Head>
      <Header logoSrc="/logo.png" text1="Home" text2="About" />
      <SliceZone slices={page.data.slices} components={components} />
    </main>
  );
}

export async function getStaticProps({ previewData }: GetStaticPropsContext) {
  /**
   * The client queries content from the Prismic API
   */
  const client = createClient({ previewData });

  const page = await client.getByUID("page", "home");

  return {
    props: {
      page,
    },
  };
}

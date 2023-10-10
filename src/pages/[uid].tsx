// Import statements
import type { InferGetStaticPropsType, GetStaticPropsContext } from "next";
import Head from "next/head";
import * as prismic from "@prismicio/client";
import { PrismicRichText, SliceZone } from "@prismicio/react";
import { createClient } from "@/prismicio";
import { components } from "@/slices";
import Header from "@/components/header";
import { PrismicNextImage } from '@prismicio/next';
import { PrismicNextLink } from '@prismicio/next';

// Import CSS module
import styles from './blogPost.module.css';

type PageProps = InferGetStaticPropsType<typeof getStaticProps>;
type PageParams = { uid: string };

// Main component
export default function Index({ page }: PageProps) {
  return (
    <main>
      <Head>
        <title>{prismic.asText(page.data.title)}</title>
      </Head>
      <Header logoSrc="/logo.png" text1="Made with love" text2="by Prismic PM team" />
      <div className={styles.topcontainer}>
        <div className={styles.datacontainer}>
          <h1 className={styles.h1} ><PrismicRichText field={page.data.title} /></h1>
          <p>By <PrismicNextLink field={page.data.author}><>{page.data.authorname}</></PrismicNextLink></p>
        </div>
        <div className={styles.imagecontainer}>
          <PrismicNextImage field={page.data.image} className={styles.image}/>
        </div>
      </div>

      <SliceZone slices={page.data.slices} components={components} />
    </main>
  );
}

// Get static props function
export async function getStaticProps({
  params,
  previewData,
}: GetStaticPropsContext<PageParams>) {
  const client = createClient({ previewData });

  if (params && params.uid) {
    const page = await client.getByUID("page", params.uid);

    if (page) {
      return {
        props: {
          page,
        },
      };
    }
  }

  return {
    notFound: true,
  };
}

// Get static paths function
export async function getStaticPaths() {
  const client = createClient();

  const pages = await client.getAllByType("page", {
    predicates: [prismic.filter.not("my.page.uid", "home")],
  });

  return {
    paths: pages.map((page) => {
      return prismic.asLink(page);
    }),
    fallback: false,
  };
}

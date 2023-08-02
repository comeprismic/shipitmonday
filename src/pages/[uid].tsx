import type { InferGetStaticPropsType, GetStaticPropsContext } from "next";
import Head from "next/head";
import * as prismic from "@prismicio/client";
import { SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";
import Header from "@/components/header";
import { PrismicNextImage } from '@prismicio/next';
import { PrismicNextLink } from '@prismicio/next'

type PageProps = InferGetStaticPropsType<typeof getStaticProps>;
type PageParams = { uid: string };

/**
 * This page renders a Prismic Document dynamically based on the URL.
 */
export default function Index({ page }: PageProps) {
  return (
    <main>
      <Head>
        <title>{prismic.asText(page.data.title)}</title>
      </Head>
      <Header logoSrc="/logo.png" text1="still hardcoded text" text2="update it soon" />
      <div className="topcontainer">
        <div className="datacontainer">
          <h3>{page.data.date}</h3>
          <h1>House is on fire</h1>
          <p>By <PrismicNextLink field={page.data.author}>Link</PrismicNextLink></p>
        </div>
        <PrismicNextImage className="blogimage" field={page.data.image} />
      </div>

      <SliceZone slices={page.data.slices} components={components} />
      <style jsx>{`
        
        
        .topcontainer {
          display: flex;
          flex-direction:column;
          align-items: center;
          padding-top: 48px;
          margin-bottom:120px
        }
       
        .datacontainer {
          display: flex;
          flex-direction:column;
          align-items: center;
          padding-top: 48px;
          margin-bottom:72px
        }

        h3 {
          font-size:32px;
          font-family:Satoshi;
          color:black;
          margin-bottom:24px
        }

        h1 {
          font-size: 82px;
          font-family: RationalDisplay-Bold;
          color:black;
          text-transform: uppercase;
          margin-bottom:24px
        }

        .blogimage {
          border-color:black;
          border-radius:16px;
        }
      `}</style>


    </main >


  );
}

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

export async function getStaticPaths() {
  const client = createClient();

  /**
   * Query all Documents from the API, except the homepage.
   */
  const pages = await client.getAllByType("page", {
    predicates: [prismic.filter.not("my.page.uid", "home")],
  });

  /**
   * Define a path for every Document.
   */
  return {
    paths: pages.map((page) => {
      return prismic.asLink(page);
    }),
    fallback: false,
  };
}

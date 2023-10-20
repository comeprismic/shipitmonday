// Import statements
import type { InferGetStaticPropsType, GetStaticPropsContext } from "next";
import Head from "next/head";
import * as prismic from "@prismicio/client";
import { createClient } from "@/prismicio";
import Header from "@/components/header";
import BlogpostCard from "@/components/blogpostcard";

// Import the CSS module
import styles from './homepage.module.css';

type PageProps = InferGetStaticPropsType<typeof getStaticProps>;

export default function Index({ page, entries }: PageProps) {
  return (
    <main>
      <Head>
        <title>{prismic.asText(page.data.title)}</title>
      </Head>
      <Header logoSrc="/logo.png" text1="Made with love" text2="by Prismic PM team" />
      <div className="topcontainer">
        <div className={styles.datacontainer}>
          <h1>
            Fresh news from your favorite team
            <strong> every monday</strong>
          </h1>
        </div>
      </div>
      <div className={styles.cardscontainer}>
          {entries.map((entry) => (
            <BlogpostCard key={entry.uid} dataEntry={entry}></BlogpostCard>
          ))}
      </div>
    </main>
  );
}

export async function getStaticProps({ previewData }: GetStaticPropsContext) {
  const client = createClient({ previewData });
  const page = await client.getSingle("homepage");
  const entries = await client.getAllByType("page", {
    orderings: {
      field: 'document.first_publication_date',
      direction: 'desc',
    },
    graphQuery: `{
      page {
        ...pageFields
        author {
          ...on author {
            name
          }
        }
      }
    }`
  });

  return {
    props: {
      page,
      entries
    },
  };
}

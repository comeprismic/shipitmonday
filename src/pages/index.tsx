import type { InferGetStaticPropsType, GetStaticPropsContext } from "next";
import Head from "next/head";
import * as prismic from "@prismicio/client";
import { createClient } from "@/prismicio";
import Header from "@/components/header";
import BlogpostCard from "@/components/blogpostcard";

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
      <Header logoSrc="/logo.png" text1="This text is hardcoded" text2="todo : connect Prismic" />
      <div className="topcontainer">
        <div className="datacontainer">
          <h3>Fresh news from your favorite teams </h3>
          <h1>every monday</h1>
        </div>
      </div>
      <div className="cardscontainer">
        <section className="cards">
          <BlogpostCard></BlogpostCard>
          <BlogpostCard></BlogpostCard>
          <BlogpostCard></BlogpostCard>
          <BlogpostCard></BlogpostCard>
          <BlogpostCard></BlogpostCard>
          <BlogpostCard></BlogpostCard>
          <BlogpostCard></BlogpostCard>
          <BlogpostCard></BlogpostCard>
        </section>
      </div>

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
          color: #000;
          text-align: center;
          font-family: Rational Display;
          font-size: 33px;
          font-style: normal;
          font-weight: 700;
          line-height: normal;
          text-transform: uppercase;
        }

        h1 {
          Copy
          color: #000;
          font-family: Rational Display;
          font-size: 112px;
          font-style: normal;
          font-weight: 700;
          line-height: normal;
          text-transform: uppercase;
        }


        .cardscontainer {
          display: flex;
          justify-content: center;
        }
        
        .cards {
          display: grid;
          grid-template-columns: repeat(2,600px);
          grid-auto-rows: 800px;
          grid-row-gap: 124px;
          grid-column-gap: 124px;
        }
      

      `}</style>
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

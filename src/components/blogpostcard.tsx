import React from "react";
import { PrismicRichText } from '@prismicio/react'
import { PrismicNextLink, PrismicNextImage } from "@prismicio/next";
import Link from "next/link";
import { date } from "@prismicio/client/dist/helpers/isFilled";


const BlogpostCard = (dataEntry: any) => {
  console.log("my data entry - author", dataEntry.dataEntry.data.author)
  return (
    <Link href={dataEntry.dataEntry.url}>
      <div className="blogpostCard">
        <PrismicNextImage field={dataEntry.dataEntry.data.image} width={598} height={412} />
        <p className="title">
          <PrismicRichText field={dataEntry.dataEntry.data.title} />
        </p>
        <p className="description">
          Contrary to popular belief, Lorem Ipsum is not
          simply random text. It has roots.
        </p>
        <p className="author">
          <PrismicNextLink field={dataEntry.dataEntry.data.title}>{dataEntry.dataEntry.data.author.data.name}</PrismicNextLink>
        </p>

      </div>


      <style jsx>{`
        .a {
          text-decoration: none; 
        }

        .blogpostCard {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          
        }
        .blogImage {
          width: auto;
          height: auto;
          margin-bottom: 24px;
          border: 4px solid rgba(0, 0, 0, 1);
          border-radius: 4px;
        }
        .title {
            color: #000;
            font-family: var(--font-rationaldisplay);
            font-size: 64px;
            font-style: normal;
            font-weight: 700;
            line-height: normal;
            text-transform: uppercase;
            margin-bottom: 16px;
            align-self: stretch;

        }
        .description {
            color: #000;
            font-family: var(--font-satoshi);
            font-size: 32px;
            font-style: normal;
            font-weight: 700;
            line-height: 58px;
            margin-bottom: 16px;
        }
        .author {
          text-align: center;
          font-family: var(--font-satoshi);
          font-size: 32px;
          font-weight: 700;
          line-height: normal;
          color: rgba(77, 150, 132, 1);
        }
        .authorEmphasis0 {
          font-family: var(--font-satoshi);
          font-size: 32px;
          font-weight: 700;
          line-height: normal;
          color: rgba(0, 0, 0, 1);
        }

        .blogpostlink {
          color:#000;
        }

      `}</style>
    </Link>
  );
};


export default BlogpostCard;
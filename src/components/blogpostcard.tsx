import React from "react";
import { PrismicRichText } from '@prismicio/react'
import { PrismicNextLink, PrismicNextImage } from "@prismicio/next";
import Link from "next/link";
import { date } from "@prismicio/client/dist/helpers/isFilled";
import styles from './blogpostcard.module.css'; // Assuming you have a CSS module for this component


const BlogpostCard = (dataEntry: any) => {
  console.log("my data entry - author", dataEntry.dataEntry.data.author)
  return (
   
      <div className={styles.blogpostCard}>
        <Link href={dataEntry.dataEntry.url} className={styles.linkCard}>
        <PrismicNextImage field={dataEntry.dataEntry.data.image} className={styles.blogImage} />
        <p className={styles.title}>
          <PrismicRichText field={dataEntry.dataEntry.data.title} />
        </p>
        <p className={styles.description}>
          <PrismicRichText field={dataEntry.dataEntry.data.description} />
        </p>
        <p className={styles.author}>
          <PrismicNextLink field={dataEntry.dataEntry.data.title}>{dataEntry.dataEntry.data.author.data.name}</PrismicNextLink>
        </p>
        </Link>
      </div>


      

  );
};


export default BlogpostCard;
import type { Content } from "@prismicio/client";
import {
  PrismicRichText,
  SliceComponentProps,
  JSXMapSerializer,
} from "@prismicio/react";
import styles from "./index.module.css";
import { ApiError } from "next/dist/server/api-utils";

const components: JSXMapSerializer = {
  label: ({ node, children }) => {
    if (node.data.label === "codespan") {
      return <code>{children}</code>;
    }
  },
  paragraph: ({ node, children }) => {
    return <p className={styles.paragraph}>{children}</p>;
  },

  heading1: ({ node, children }) => {
    return <h1 className={styles.heading1}>{children}</h1>;
  },

  heading2: ({ node, children }) => {
    return <h2 className={styles.heading2}>{children}</h2>;
  },

  heading3: ({ node, children }) => {
    return <h3 className={styles.heading3}>{children}</h3>;
  },

  hyperlink:({node, children})=>{
    // @ts-ignore
    const target = node.data.target ? `${node.data.target}` : '';
    const url = node.data.url;
    return (<a className={styles.hyperlink} href={url} target={target}>{children}</a>)
  },

  strong: ({ children }) => {
    return <p className={styles.strong}>{children}</p>;
  },

  em: ({ children }) => {
    return <p className={styles.em}>{children}</p>;
  },

  listItem: ({ children }) => {
    return <li className={styles.listItem}>{children}</li>;
  },
  
  list: ({ children }) => {
    return <ul className={styles.list}>{children}</ul>;
  },
};

type RichTextProps = SliceComponentProps<Content.RichTextSlice>;

export default function RichText({ slice }: RichTextProps) {
  return (
    <section className={styles.richtext}>
      <PrismicRichText field={slice.primary.content} components={components} />
    </section>
  );
}

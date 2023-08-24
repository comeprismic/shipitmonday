import type { Content } from "@prismicio/client";
import {
  PrismicRichText,
  SliceComponentProps,
  JSXMapSerializer,
} from "@prismicio/react";
import styles from "./index.module.css";

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
    return <p className={styles.heading1}>{children}</p>;
  },

  heading2: ({ node, children }) => {
    return <p className={styles.heading2}>{children}</p>;
  },

  heading3: ({ node, children }) => {
    return <p className={styles.heading3}>{children}</p>;
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

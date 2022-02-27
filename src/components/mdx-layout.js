import React from "react";
import TeX from "@matejmazur/react-katex";
import { MDXProvider } from "@mdx-js/react";

const components = {
  div: (props) => {
    if (props.className.includes("math-display")) {
      import("katex/dist/katex.min.css");
      return <TeX block math={props.children} />;
    }
    return <div {...props} />;
  },
  span: (props) => {
    if (props.className.includes("math-inline")) {
      import("katex/dist/katex.min.css");
      return <TeX math={props.children} />;
    }
    return <span {...props} />;
  },
};

export default function MdXLayout(props) {
  return <MDXProvider components={components}>{props.children}</MDXProvider>;
}
/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
// import Img from "gatsby-image"
// import { useStaticQuery, graphql, Link } from "gatsby"
import "../style/style.scss"
// import { Link } from "gatsby"
import NavBar from "./nav"

// import TopIcon from "../images/top.svg"
// import scrollTo from "gatsby-plugin-smoothscroll"

const Layout = ({ children, cards }) => {
  const links = [
    { type: "item", url: "/", name: "Home", icon: "fas fa-home" },
    { type: "item", url: "/archive", name: "Archive", icon: "fas fa-archive" },
    { type: "item", url: "/tags/", name: "Tags", icon: "fas fa-tags" },
    {
      type: "menu",
      url: "#",
      name: "Categories",
      icon: "fas fa-boxes",
      items: [
        {
          type: "item",
          url: "/category/blog",
          name: "Blog",
          icon: "fas fa-star",
        },
        {
          type: "item",
          url: "/category/life",
          name: "Life",
          icon: "fas fa-headphones",
        },

        {
          type: "item",
          url: "https://algo.codeand.fun",
          name: "LeetCode",
          icon: "fas fa-code",
        },
        {
          type: "item",
          url: "/category/papers",
          name: "Papers",
          icon: "fas fa-book"
        }
      ],
    },
    { type: "item", url: "https://www.notion.so/wuxiaobai24/d39c32ef6d3c4d65808eebc80c1bd852?v=0f4f8b6618b3415caf01ef510c8ffd6c", name: "Books", icon: "fas fa-book" },
    { type: "item", url: "/about", name: "About", icon: "fas fa-user" },
  ]

  return (
    <>
      <NavBar links={links} />
      {children}
      {/* footer */}
      <footer className="footer">
        <div className="content has-text-centered">
          <p>
            Design by wuxiaobai24. Power by{" "}
            <a href="https://www.gatsbyjs.org/">Gatsby.js</a>. The website
            content is licensed{" "}
            <a href="http://creativecommons.org/licenses/by-nc-sa/4.0/">
              CC BY NC SA 4.0
            </a>
            .
          </p>
          <p>
            You can find the source code in{" "}
            <a href="https://github.com/wuxiaobai24/aa-gatsby-blog">Github</a>.
          </p>
        </div>
      </footer>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout

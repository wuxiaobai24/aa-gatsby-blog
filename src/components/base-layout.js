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
    { url: "/", name: "Home", icon: "fas fa-home" },
    { url: "/archive", name: "Archive", icon: "fas fa-archive" },
    { url: "/tags/", name: "Tags", icon: "fas fa-tags" },
    { url: "/bookshelf/", name: "Books", icon: "fas fa-book" },
    { url: "/about", name: "About", icon: "fas fa-user" },
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

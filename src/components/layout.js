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
import BaseLayout from "./base-layout"
import Card from "./card"
// import Avatar from "./avatar"
import Tags from "./cards/tags-card"
// import TopIcon from "../images/top.svg"
// import scrollTo from "gatsby-plugin-smoothscroll"

import Author from "./cards/author-card"

const Layout = ({ children, cards }) => {
  return (
    <BaseLayout>
      {/* main section */}
      <section className="section">
        <div className="container">
          <div className="columns">
            <div
              className={`column ${
                cards ? "is-three-quarters" : "is-fullwidth"
              }`}
            >
              {children}
            </div>
            {cards && (
              <div className="column">
                {cards.map(({ elem, title, icon }) => (
                  <Card key={title} title={title} icon={icon}>
                    {elem}
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </BaseLayout>
  )
}

Layout.defaultProps = {
  cards: [
    {
      elem: <Author />,
      title: "Author",
      icon: "fas fa-user",
    },
    {
      elem: <Tags />,
      title: "Tags",
      icon: "fas fa-tags",
    },
  ],
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout

import SEO from "../components/seo"
import React from "react"
import BaseLayout from "../components/base-layout"
import SearchBar from "../components/search"
export default () => {
  return (
    <BaseLayout>
      <SEO title="Home" />
      <section className="hero is-fullheight-with-navbar">
        <div className="hero-body">
          <div className="container">
            <h1 className="is-size-1 has-text-centered"
              style={{ fontFamily: "Annie Use Your Telescope" }}
            >CODE & FUN</h1>
            <div className="container" style={{maxWidth:"600px"}}>
              <SearchBar />
            </div>
          </div>
        </div>
      </section>
    </BaseLayout>
  )
}

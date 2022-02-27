import React from "react"

import Layout from "../components/layout"

const pagelayout =  ({ children }) => (
  <Layout>
    <div className="box">
      <div className="content">{children}</div>
    </div>
  </Layout>
)

export default pagelayout;
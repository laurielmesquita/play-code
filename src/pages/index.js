import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <h1>Quer Frango?</h1>
    <div style={{ maxWidth: "400px", marginBottom: "1rem" }}>
      <Image />
    </div>
    <Link to="/page-2/">Visite nossa outra página ></Link>
  </Layout>
)

export default IndexPage

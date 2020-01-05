import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const SecondPage = () => (
  <Layout>
    <SEO title="Page two" />
    <h1>Márcio meu fi</h1>
    <h2>Arranja o conteúdo do site e deixa de ser pilantra</h2>
    <Link to="/">Voltar ao quer frango</Link>
  </Layout>
)

export default SecondPage

import React from 'react'
import { MapPin, Smartphone, Mail } from 'react-feather'
import { graphql } from 'gatsby'

import PageHeader from '../components/PageHeader'
import HeaderSection from '../components/HeaderSection'
import GoogleMap from '../components/GoogleMap'
import Layout from '../components/Layout'

// Export Template for use in CMS preview
export const ContactPageTemplate = ({
  body,
  title,
  subtitle,
  featuredImage,
  address,
  phone1,
  phone2,
  email,
  hdSectionTt,
  hdSectionSubTt,
  locations
}) => (
  <main className="Contact">
    <PageHeader
      title={title}
      subtitle={subtitle}
      backgroundImage={featuredImage}
    />
    <section className="section Contact--Section1">
      <div className="container Contact--Section1--Container">
        <HeaderSection
          hdSectionTt={hdSectionTt}
          hdSectionSubTt={hdSectionSubTt}
        />
        <div className="Contact--Details">
          <h4 className="Contact--Details--Title"><MapPin /> Endereço</h4>
          {address && (
            <a
              className="Contact--Details--Item"
              href={`https://www.google.com.au/maps/search/${encodeURI(
              address
              )}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {address}
            </a>
          )}
          <h4 className="Contact--Details--Title"><Smartphone /> Telefones</h4>
          {phone1 && (
            <a className="Contact--Details--Item" href={`tel:${phone1}`}>
              {phone1}
            </a>
          )}
          {phone2 && (
            <a className="Contact--Details--Item" href={`tel:${phone2}`}>
              {phone2}
            </a>
          )}
          <h4 className="Contact--Details--Title"><Mail /> Email</h4>
          {email && (
            <a className="Contact--Details--Item" href={`mailto:${email}`}>
              {email}
            </a>
          )}
        </div>
      </div>
    </section>

    <GoogleMap locations={locations} />
  </main>
)

const ContactPage = ({ data: { page } }) => (
  <Layout
    meta={page.frontmatter.meta || false}
    title={page.frontmatter.title || false}
  >
    <ContactPageTemplate {...page.frontmatter} body={page.html} />
  </Layout>
)

export default ContactPage

export const pageQuery = graphql`
  query ContactPage($id: String!) {
    page: markdownRemark(id: { eq: $id }) {
      ...Meta
      html
      frontmatter {
        title
        template
        subtitle
        featuredImage
        address
        phone1
        phone2
        email
        hdSectionTt
        hdSectionSubTt
        locations {
          mapLink
          lat
          lng
        }
      }
    }
  }
`

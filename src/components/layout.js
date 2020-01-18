import React from 'react'
import PropTypes from 'prop-types'

import 'modern-normalize/modern-normalize.css'
import './layout.css'

const Layout = ({ children }) => {
  return (
    <>
      <div
        style={{
          margin: '0 auto',
          maxWidth: 660,
          paddingTop: '3rem',
          paddingLeft: '1.0875rem',
          paddingBottom: '2.45rem',
          paddingRight: '1.0875rem'
        }}
      >
        <main>{children}</main>
        <h2
          style={{
            padding: '2.5rem 0 2rem'
          }}
        >Em breve um site completo com tudo que você procura</h2>
        <footer>© {new Date().getFullYear()}, Brincadeira de Criança{' '}
        </footer>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired
}

export default Layout

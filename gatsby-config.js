/* eslint-disable quotes */
const postcssPresetEnv = require(`postcss-preset-env`)

module.exports = {
  siteMetadata: {
    title: `Brincadeira de Criança`,
    siteUrl: `https://brincadeira.co/`
  },
  plugins: [
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        short_name: `Brincadeira`,
        name: `Brincadeira de Criança`,
        description: `Site institucional da Brincadeira de Criança`,
        icon: `${__dirname}/static/images/logo.svg`,
        start_url: `/`,
        background_color: `#9EC12F`,
        display: `standalone`,
        scope: `/`,
        theme_color: `#9EC12F`
      }
    },
    {
      resolve: `gatsby-plugin-prefetch-google-fonts`,
      options: {
        fonts: [
          {
            family: `Lato`,
            variants: [`100`, `300`, `400`, `700`]
          },
          {
            family: `Quicksand`,
            variants: [`500`, `700`]
          }
        ]
      }
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-yaml`,
    {
      resolve: `gatsby-plugin-google-tagmanager`,
      options: {
        id: `GTM-P67TXJZ`,
        includeInDevelopment: false
      }
    },
    {
      resolve: `gatsby-plugin-offline`,
      options: {
        precachePages: [
          ``,
          `/sobre-nos/`,
          `/toy/`,
          `/toys/*`,
          `/toy-categories/*`,
          `/tent/`,
          `/tents/*`,
          `/tent-categories/*`,
          `/climt/`,
          `/climts/*`,
          `/climt-categories/*`,
          `/contato/`
        ]
      }
    },

    // Add static assets before markdown files
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/static/images`,
        name: `images`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/static/products`,
        name: `products`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content`,
        name: `pages`
      }
    },

    // images
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,

    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          `gatsby-remark-relative-images`,
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 800,
              linkImagesToOriginal: false
            }
          },
          `gatsby-remark-responsive-iframe`
        ]
      }
    },

    // css (replace with gatsby-plugin-sass for v2)
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        postCssPlugins: [
          postcssPresetEnv({
            browsers: `> 0.5%, last 2 versions, ie 11`
          })
        ]
      }
    },
    {
      resolve: `gatsby-plugin-postcss`,
      options: {
        postCssPlugins: [
          require(`rfs`),
          require(`postcss-preset-env`)({
            browsers: `> 0.5%, last 2 versions, ie 11`
          })
        ]
      }
    },
    {
      resolve: `gatsby-plugin-nprogress`,
      options: {
        // Setting a color is optional.
        color: `#9EC12F`,
        // Disable the loading spinner.
        showSpinner: true,
        minimum: 0.1,
        easing: `ease`,
        speed: 500
      }
    },
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-netlify` // make sure to keep it last in the array
  ]
}

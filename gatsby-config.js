module.exports = {
  siteMetadata: {
    title: 'Brincadeira de Criança',
    description: 'Alguma descrição aqui sobre a',
    author: '@brincadeira'
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-prefetch-google-fonts',
      options: {
        fonts: [
          {
            family: 'Averia Libre',
            variants: ['400', '700']
          }
        ]
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/static/images`
      }
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Brincadeira-de-Criança',
        short_name: 'Brincadeira',
        start_url: '/',
        background_color: '#E7134E',
        theme_color: '#E7134E',
        display: 'standalone',
        icon: `${__dirname}/static/images/icon.png`
      }
    }
    // 'gatsby-plugin-offline'
  ]
}

/* eslint-disable react/display-name */
import React from 'react'
import PropTypes from 'prop-types'

import Image from '../components/Image'

const Welcome = ({ welcomeImage, welcomeTitle }) => {
  return (
    <div className="Welcome">
      <div className="Welcome--Item">
        <p>
          Através de um trabalho diferenciado e empenho de toda uma equipe de
          profissionais treinados, a <strong>Brincadeira de Criança</strong> é
          hoje uma das maiores empresas nesse segmento. Atuamos no mercado desde
          2013 oferecendo qualidade e segurança.
        </p>
        <a
          className="Button Button--Large"
          href="/sobre-nos/"
          title="Saiba mais sobre a nossa empresa"
        >
          Saiba Mais
        </a>
      </div>
      <div className="Welcome--Item">
        <div className="Welcome--Image relative">
          <Image background src={welcomeImage} alt={welcomeTitle} />
        </div>
      </div>
    </div>
  )
}

Welcome.propTypes = {
  welcomeTitle: PropTypes.string
}

export default Welcome

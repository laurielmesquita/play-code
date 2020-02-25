/* eslint-disable react/display-name */
import React from 'react'

import HeaderSection from './HeaderSection'

export default () => (
  <div className="Welcome">
    <div className="Welcome--Item">
      <p>
        Através de um trabalho diferenciado e empenho de toda uma equipe de
        profissionais treinados, a <strong>Brincadeira de Criança</strong> é
        hoje uma das maiores empresas nesse segmento.
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
      <div className="Welcome--Image"></div>
    </div>
  </div>
)

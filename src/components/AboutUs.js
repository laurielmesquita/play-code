/* eslint-disable react/display-name */
import React from 'react'

import HeaderSection from './HeaderSection'

export default () => (
  <div className="Welcome">
    <div className="Welcome--Item">
      <HeaderSection
        hdSectionTt="Bem-vindo a Brincadeira de Criança"
        hdSectionSubTt="Sobre Nós"
      />
      <p>
        Atuamos no mercado desde 2013, prestando serviços de locação de
        brinquedos, tendas e climatizadores para qualquer tipo de evento.
      </p>
      <p>
        Através de um trabalho diferenciado e empenho de toda uma equipe de
        profissionais treinados, a Brincadeira de Criança é hoje uma das maiores
        empresas nesse segmento atendendo crianças, jovens e adultos de forma
        individual e personalizada às necessidades de cada tipo de evento.
      </p>
      <p>
        Nosso objetivo é satisfazer nossos clientes, prezando pela qualidade no
        atendimento, pontualidade, cordialidade e produtos em bom estado
        proporcionando maior segurança.
      </p>
    </div>
    <div className="Welcome--Item">
      <h1>Teste de conteúdo 2</h1>
    </div>
  </div>
)

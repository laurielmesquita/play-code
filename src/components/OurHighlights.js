/* eslint-disable react/display-name */
import React from 'react'
import tenda from '../../static/products/cat_tenda.png'
import aerohockey from '../../static/products/home_aerohockey.png'
import camaelastica from '../../static/products/home_camaelastica.png'
import pulapula from '../../static/products/home_pulapula.png'

export default () => (
  <div className="OurHighlights">
    <div className="OurHighlights--Item">
      <h2 className="OurHighlights--Tt">
        <a href="/tenda/">Tendas</a>
      </h2>
      <div className="OurHighlights--Img">
        <a href="/tenda/">
          <img src={tenda} title="Tendas" alt="Foto da Tenda" />
        </a>
        <p className="OurHighlights--Desc">
          Aqui você encontrará uma tenda para cada ocasião que precisar
        </p>
      </div>
    </div>
    <div className="OurHighlights--Item">
      <h2 className="OurHighlights--Tt">
        <a href="/brinquedos/aero-hockey/">Aero Hockey</a>
      </h2>
      <div className="OurHighlights--Img">
        <a href="/brinquedos/aero-hockey/">
          <img src={aerohockey} title="Tendas" alt="Foto da Tenda" />
        </a>
        <p className="OurHighlights--Desc">
          Aqui você encontrará uma tenda para cada situação que precisar
        </p>
      </div>
    </div>
    <div className="OurHighlights--Item">
      <h2 className="OurHighlights--Tt">
        <a href="/brinquedos/cama-elastica-3-05-m/">Cama Elástica</a>
      </h2>
      <div className="OurHighlights--Img">
        <a href="/brinquedos/cama-elastica-3-05-m/">
          <img src={camaelastica} title="Tendas" alt="Foto da Tenda" />
        </a>
        <p className="OurHighlights--Desc">
          Aqui você encontrará uma tenda para cada situação que precisar
        </p>
      </div>
    </div>
    <div className="OurHighlights--Item">
      <h2 className="OurHighlights--Tt">
        <a href="/brinquedos/castelinho/">Pula Pula</a>
      </h2>
      <div className="OurHighlights--Img">
        <a href="/brinquedos/castelinho/">
          <img src={pulapula} title="Tendas" alt="Foto da Tenda" />
        </a>
        <p className="OurHighlights--Desc">
          Aqui você encontrará uma tenda para cada situação que precisar
        </p>
      </div>
    </div>
  </div>
)

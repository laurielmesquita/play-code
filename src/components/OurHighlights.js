/* eslint-disable react/display-name */
import React from 'react'
import tenda from '../../static/products/home_tenda.png'
import aerohockey from '../../static/products/home_aerohockey.png'
import camaelastica from '../../static/products/home_camaelastica.png'
import pulapula from '../../static/products/home_pulapula.png'

export default () => (
  <div className="OurHighlights">
    <div className="OurHighlights--Item">
      <h2 className="OurHighlights--Tt">
        <a href="/tenda/">Tendas</a>
      </h2>
      <a href="/tenda/" className="OurHighlights--Img">
        <img src={tenda} title="Tendas" alt="Foto da Tenda" />
      </a>
    </div>
    <div className="OurHighlights--Item">
      <h2 className="OurHighlights--Tt">
        <a href="/brinquedos/aero-hockey/">Aero Hockey</a>
      </h2>
      <a href="/brinquedos/aero-hockey/" className="OurHighlights--Img">
        <img src={aerohockey} title="Tendas" alt="Foto da Tenda" />
      </a>
    </div>
    <div className="OurHighlights--Item">
      <h2 className="OurHighlights--Tt">
        <a href="/brinquedos/cama-elastica-3-05-m/">Cama Elástica</a>
      </h2>
      <a href="/brinquedos/cama-elastica-3-05-m/" className="OurHighlights--Img">
        <img src={camaelastica} title="Tendas" alt="Foto da Tenda" />
      </a>
    </div>
    <div className="OurHighlights--Item">
      <h2 className="OurHighlights--Tt">
        <a href="/brinquedos/castelinho/">Pula Pula Inflável</a>
      </h2>
      <a href="/brinquedos/castelinho/" className="OurHighlights--Img">
        <img src={pulapula} title="Tendas" alt="Foto da Tenda" />
      </a>
    </div>
  </div>
)

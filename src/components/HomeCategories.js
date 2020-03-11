/* eslint-disable react/display-name */
import React from 'react'
import tenda from '../../static/products/cat_tenda.png'
import brinquedo from '../../static/products/cat_brinquedo.png'
import climatizador from '../../static/products/cat_climatizador.png'

export default () => (
  <div className="HomeCategories">
    <div className="HomeCategories--Item">
      <a href="/tenda/" className="HomeCategories--Img">
        <img src={tenda} title="Tendas" alt="Foto da Tenda" />
      </a>
      <h2 className="HomeCategories--Tt">
        <a href="/tenda/">Tendas</a>
      </h2>
    </div>
    <div className="HomeCategories--Item">
      <a href="/brinquedo/" className="HomeCategories--Img">
        <img src={brinquedo} title="Tendas" alt="Foto da Tenda" />
      </a>
      <h2 className="HomeCategories--Tt">
        <a href="/brinquedo/">Brinquedos</a>
      </h2>
    </div>
    <div className="HomeCategories--Item">
      <a href="/climatizador/" className="HomeCategories--Img">
        <img src={climatizador} title="Tendas" alt="Foto da Tenda" />
      </a>
      <h2 className="HomeCategories--Tt">
        <a href="/climatizador/">Climatizadores</a>
      </h2>
    </div>
  </div>
)

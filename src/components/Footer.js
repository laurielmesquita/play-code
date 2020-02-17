/* eslint-disable react/display-name */
import React from 'react'
import InstagramFeed from './InstagramFeed'

import logofooter from '../../static/images/logo_footer.svg'
import facebook from '../../static/images/facebook.svg'
import instagram from '../../static/images/instagram.svg'
import whatsapp from '../../static/images/whatsapp.svg'

import './Footer.css'
import './SVGIcon.css'

export default () => (
  <div>
    <h2 className="taCenter">
      Siga-nos no{' '}
      <a href="https://www.instagram.com/brincadeiradecriancathe/">
        @brincadeiradecriancathe
      </a>
    </h2>
    <br />
    <InstagramFeed count="8" />
    <footer className="footer footer-Top">
      <div className="container taCenter">
        <figure className="Logo-Footer">
          <img
            src={logofooter}
            title="Brinadeira de Criança"
            alt="Brinadeira de Criança"
          />
        </figure>
      </div>
      <div className="container taCenter">
        <a href="https://www.facebook.com/brincadeiradecriancathe" className="SVGIcon">
          <img src={facebook} className="SVGIcon--icon" />
        </a>
        <a href="https://www.instagram.com/brincadeiradecriancathe" className="SVGIcon">
          <img src={instagram} className="SVGIcon--icon" />
        </a>
        <a href="https://wa.me/5586988487045" className="SVGIcon">
          <img src={whatsapp} className="SVGIcon--icon" />
        </a>
      </div>
    </footer>
    <footer className="footer footer-Bottom">
      <div className="container taCenter">
        <span>
          <p>
            Brincadeira de Criança © {new Date().getFullYear()} Todos os
            direitos reservados.
          </p>
          <p>
            Desenvolvido por{' '}
            <a href="mailto:laurielmesquita@me.com">Lauriel Mesquita</a>.
          </p>
        </span>
      </div>
    </footer>
  </div>
)

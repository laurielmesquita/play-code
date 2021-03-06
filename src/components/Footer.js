/* eslint-disable react/display-name */
import React from 'react'

import logofooter from '../../static/images/logo_footer.svg'

export default () => (
  <div>
    <footer className="footer footer-Top">
      <div className="container taCenter">
        <figure className="Logo-Footer">
          <img
            src={logofooter}
            title="Brinadeira de Criança"
            alt="Logo da Brinadeira de Criança"
          />
        </figure>
      </div>
      <div className="container taCenter">
        <div className="SVGIcon Icon-Instagram">
          <a
            href="https://www.instagram.com/brincadeiradecriancathe"
            className="SVGIcon--icon"
            target="_blank"
            rel="noopener noreferrer"
          />
        </div>
        <div className="SVGIcon Icon-Facebook">
          <a
            href="https://www.facebook.com/brincadeiradecriancathe"
            className="SVGIcon--icon"
            target="_blank"
            rel="noopener noreferrer"
          />
        </div>
        <div className="SVGIcon Icon-Whatsapp">
          <a
            href="https://wa.me/5586988487045"
            className="SVGIcon--icon"
            target="_blank"
            rel="noopener noreferrer"
          />
        </div>
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

/* eslint-disable react/display-name */
import React from "react"
import InstagramFeed from "./InstagramFeed"

export default () => (
  <div>
    <h2 className="taCenter">
      Siga-nos no{" "}
      <a href="https://www.instagram.com/brincadeiradecriancathe/">
        @brincadeiradecriancathe
      </a>
    </h2>
    <br />
    <InstagramFeed count="8" />
    <footer className="footer">
      <div className="container taCenter">
        <span>
          <p>
            Brincadeira de Criança © {new Date().getFullYear()} Todos os
            direitos reservados.
          </p>
          <p>
            Desenvolvido por{" "}
            <a href="mailto:laurielmesquita@me.com">Lauriel Mesquita</a>.
          </p>
        </span>
      </div>
    </footer>
  </div>
)

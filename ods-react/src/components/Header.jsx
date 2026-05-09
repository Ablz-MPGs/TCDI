import { useState } from "react"

const links = [
  { page: "inicio", label: "Início", href: "#/inicio" },
  { page: "galeria", label: "Galeria", href: "#/galeria" },
]

export default function Header({ activePage }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [infoOpen, setInfoOpen] = useState(false)
  const infoActive = activePage === "tasks" || activePage === "status"

  const closeMenus = () => {
    setMenuOpen(false)
    setInfoOpen(false)
  }

  return (
    <header className="cabecalho">
      <div className="topnav">
        <a className="logo" href="#/inicio" onClick={closeMenus}>
          <img className="logo_imagem" src="/img/logo.png" alt="Logo The Cursed Dinosaur Isle" />
          <span>The Cursed Dinosaur Isle</span>
        </a>
      </div>

      <nav className="navbar" aria-label="Navegação principal">
        <ul className={`nav-menu ${menuOpen ? "active" : ""}`}>
          {links.map((link) => (
            <li className="nav-item" key={link.page}>
              <a
                className={`nav-link ${activePage === link.page ? "active" : ""}`}
                href={link.href}
                onClick={closeMenus}
              >
                {link.label}
              </a>
            </li>
          ))}

          <li className="nav-item dropdown">
            <button
              className={`nav-link dropdown-toggle ${infoActive ? "active" : ""}`}
              type="button"
              aria-expanded={infoOpen}
              onClick={() => setInfoOpen((open) => !open)}
            >
              Info
            </button>
            <ul className={`dropdown-menu ${infoOpen ? "show" : ""}`}>
              <li>
                <a className="dropdown-item" href="#/tasks" onClick={closeMenus}>
                  Tasks
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#/status" onClick={closeMenus}>
                  Status
                </a>
              </li>
            </ul>
          </li>
        </ul>

        <button
          className={`hamburger ${menuOpen ? "active" : ""}`}
          type="button"
          aria-label="Abrir menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="bar" />
          <span className="bar" />
          <span className="bar" />
        </button>
      </nav>
    </header>
  )
}

import { useState } from "react"

const links = [
  { page: "inicio", label: "Início", href: "#/inicio" },
  { page: "galeria", label: "Galeria", href: "#/galeria" },
  { page: "status", label: "Status", href: "#/status" },
  { page: "tasks", label: "Tasks", href: "#/tasks" },
]

export default function Header({ activePage }) {
  const [menuOpen, setMenuOpen] = useState(false)

  const closeMenus = () => {
    setMenuOpen(false)
  }

  return (
    <>
      <style>
        {`
          /* Ajustes Cinematográficos - Apenas Desktop */
          @media (min-width: 901px) {
            .cinematic-subheader {
              position: relative;
              min-height: auto !important;
              padding: 0 !important;
              justify-content: center;
              background: linear-gradient(90deg, rgba(3, 4, 4, 0.95) 0%, rgba(15, 20, 18, 0.98) 50%, rgba(3, 4, 4, 0.95) 100%) !important;
              border-top: 1px solid rgba(226, 192, 115, 0.08) !important;
              border-bottom: 1px solid rgba(226, 192, 115, 0.25) !important;
              box-shadow: 0 15px 40px rgba(0, 0, 0, 0.9), inset 0 0 30px rgba(226, 192, 115, 0.03) !important;
              backdrop-filter: blur(16px);
            }
            
            .cinematic-subheader::after {
              content: '';
              position: absolute;
              bottom: -1px;
              left: 50%;
              transform: translateX(-50%);
              width: 35%;
              height: 1px;
              background: linear-gradient(90deg, transparent, rgba(226, 192, 115, 0.8), transparent);
              box-shadow: 0 0 15px rgba(226, 192, 115, 0.6);
            }

            .cinematic-nav-menu {
              gap: 3.5rem !important;
              padding: 0 !important;
              border: none !important;
              background: transparent !important;
            }

            .cinematic-nav-link {
              position: relative;
              display: inline-flex;
              min-height: 52px !important;
              align-items: center;
              justify-content: center;
              padding: 0 0.5rem !important;
              background: transparent !important;
              color: var(--muted) !important;
              font-family: var(--font-display) !important;
              font-size: 0.9rem;
              font-weight: 600 !important;
              letter-spacing: 0.2em !important;
              text-transform: uppercase;
              box-shadow: none !important;
              transition: color 0.4s ease, text-shadow 0.4s ease !important;
            }

            .cinematic-nav-link:hover,
            .cinematic-nav-link.active {
              color: var(--accent-strong) !important;
              text-shadow: 0 0 20px rgba(226, 192, 115, 0.5) !important;
              transform: none !important;
            }

            .cinematic-nav-link::after {
              content: '';
              position: absolute;
              bottom: 8px;
              left: 50%;
              width: 0;
              height: 1px;
              background: var(--accent-strong);
              box-shadow: 0 0 12px var(--accent-strong);
              transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
              transform: translateX(-50%);
              opacity: 0;
            }

            .cinematic-nav-link:hover::after,
            .cinematic-nav-link.active::after {
              width: 100%;
              opacity: 1;
            }
            
            .cinematic-logo-text {
              letter-spacing: 0.1em;
              text-shadow: 0 4px 15px rgba(0,0,0,0.8);
            }
          }

          /* Ajustes para Mobile */
          @media (max-width: 900px) {
            .cinematic-subheader {
              position: relative;
              min-height: 0 !important;
              padding: 0 !important;
              border: none !important;
              background: transparent !important;
              box-shadow: none !important;
            }
            
            .cinematic-logo-text {
              letter-spacing: 0.05em;
              text-shadow: 0 2px 10px rgba(0,0,0,0.8);
            }
            
            .hamburger-mobile {
              position: absolute;
              right: clamp(1rem, 4vw, 3.25rem);
              top: 50%;
              transform: translateY(-50%);
            }

            /* Estilização Premium para o Menu Aberto no Mobile */
            .nav-menu.cinematic-nav-menu {
              background: linear-gradient(180deg, rgba(15, 20, 18, 0.98), rgba(5, 7, 6, 0.98)) !important;
              border: 1px solid rgba(226, 192, 115, 0.25) !important;
              box-shadow: 0 20px 50px rgba(0, 0, 0, 0.95), inset 0 0 20px rgba(226, 192, 115, 0.05) !important;
              border-radius: var(--radius) !important;
              padding: 1rem 0 !important;
              gap: 0 !important;
              top: calc(100% + 0.5rem) !important;
            }

            .cinematic-nav-link {
              width: 100%;
              display: block;
              text-align: center;
              font-family: var(--font-display) !important;
              font-size: 1.15rem !important;
              font-weight: 600 !important;
              letter-spacing: 0.15em !important;
              text-transform: uppercase;
              padding: 1rem 2rem !important;
              color: var(--soft) !important;
              background: transparent !important;
              border-bottom: 1px solid rgba(255, 255, 255, 0.03) !important;
              transition: all 0.3s ease !important;
            }

            .nav-item:last-child .cinematic-nav-link {
              border-bottom: none !important;
            }

            .cinematic-nav-link:hover,
            .cinematic-nav-link.active {
              color: var(--accent-strong) !important;
              background: linear-gradient(90deg, transparent, rgba(226, 192, 115, 0.12), transparent) !important;
              text-shadow: 0 0 15px rgba(226, 192, 115, 0.4) !important;
              transform: scale(1.02);
            }
          }
        `}
      </style>
      <div className="header-wrapper" style={{ position: "sticky", top: 0, zIndex: 1000, display: "flex", flexDirection: "column" }}>
        
        {/* Primeiro Header - Logo e Hamburger (Mobile) */}
        <header className="cabecalho principal" style={{ position: "relative", borderBottom: "none", paddingBottom: "1.2rem", paddingTop: "1.2rem", justifyContent: "center", background: "rgba(3, 4, 4, 0.99)", boxShadow: "none" }}>
          
          <div className="topnav" style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <a className="logo" href="#/inicio" onClick={closeMenus}>
              <img className="logo_imagem" src="/img/logo.png" alt="Logo The Cursed Dinosaur Isle" />
              <span className="cinematic-logo-text">The Cursed Dinosaur Isle</span>
            </a>
          </div>

          <button
            className={`hamburger hamburger-mobile ${menuOpen ? "active" : ""}`}
            type="button"
            aria-label="Abrir menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="bar" />
            <span className="bar" />
            <span className="bar" />
          </button>
        </header>

        {/* Segundo Header - Navegação */}
        <header className="cabecalho secundario cinematic-subheader">
          <nav className="navbar" style={{ width: "100%", justifyContent: "center", position: "relative" }} aria-label="Navegação principal">
            <ul className={`nav-menu cinematic-nav-menu ${menuOpen ? "active" : ""}`}>
              {links.map((link) => (
                <li className="nav-item" key={link.page}>
                  <a
                    className={`nav-link cinematic-nav-link ${activePage === link.page ? "active" : ""}`}
                    href={link.href}
                    onClick={closeMenus}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </header>
      </div>
    </>
  )
}

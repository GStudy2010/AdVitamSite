import { useEffect } from "react";

function smoothScrollTo(targetY, duration = 800) {
  const startY = window.scrollY;
  const diff = targetY - startY;
  let start = null;

  function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  function step(timestamp) {
    if (!start) start = timestamp;
    const elapsed = timestamp - start;
    const progress = Math.min(elapsed / duration, 1);
    window.scrollTo(0, startY + diff * easeInOutCubic(progress));
    if (progress < 1) requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}

function handleNavClick(e, href) {
  e.preventDefault();
  if (href === "#") {
    smoothScrollTo(0);
  } else {
    const el = document.querySelector(href);
    if (el) {
      const offset = el.getBoundingClientRect().top + window.scrollY - 72;
      smoothScrollTo(offset);
    }
  }
}

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Lato:wght@300;400;700&display=swap');

  * { margin: 0; padding: 0; box-sizing: border-box; }

  .adv-root {
    font-family: 'Lato', sans-serif;
    background: #F7F4EE;
    color: #1E2D40;
    min-height: 100vh;
  }

  .adv-nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.2rem 3rem;
    background: rgba(247, 244, 238, 0.88);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    position: sticky;
    top: 0;
    z-index: 100;
    border-bottom: 1px solid rgba(30, 45, 64, 0.07);
    transition: box-shadow 0.3s;
  }

  .adv-nav.scrolled {
    box-shadow: 0 2px 20px rgba(30,45,64,0.08);
  }

  .adv-logo-link {
    text-decoration: none;
    cursor: pointer;
    transition: opacity 0.2s;
  }

  .adv-logo-link:hover { opacity: 0.75; }

  .adv-logo {
    font-family: 'Playfair Display', serif;
    font-size: 1.6rem;
    font-weight: 600;
    color: #1E2D40;
    letter-spacing: 0.04em;
  }

  .adv-logo span { color: #7A9E7E; }

  .adv-nav-links {
    display: flex;
    gap: 2rem;
    list-style: none;
  }

  .adv-nav-links a {
    text-decoration: none;
    color: #1E2D40;
    font-size: 0.9rem;
    font-weight: 400;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    opacity: 0.7;
    transition: opacity 0.2s;
  }

  .adv-nav-links a:hover { opacity: 1; }

  .adv-hero {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 4rem 3rem 5rem;
    gap: 3rem;
    min-height: 80vh;
  }

  .adv-hero-text {
    max-width: 480px;
    flex-shrink: 0;
  }

  .adv-eyebrow {
    font-size: 0.78rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: #7A9E7E;
    margin-bottom: 1.2rem;
    font-weight: 700;
  }

  .adv-hero h1 {
    font-family: 'Playfair Display', serif;
    font-size: clamp(2.2rem, 4vw, 3.2rem);
    font-weight: 600;
    line-height: 1.2;
    color: #1E2D40;
    margin-bottom: 1.5rem;
  }

  .adv-hero h1 em {
    font-style: italic;
    color: #7A9E7E;
  }

  .adv-hero p {
    font-size: 1.05rem;
    line-height: 1.75;
    color: #3a4f63;
    margin-bottom: 2.5rem;
    font-weight: 300;
  }

  .adv-btn-primary {
    display: inline-block;
    background: #1E2D40;
    color: #F7F4EE;
    padding: 0.9rem 2.2rem;
    border-radius: 2px;
    font-size: 0.88rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    font-family: 'Lato', sans-serif;
    font-weight: 700;
    transition: background 0.2s, transform 0.1s;
    border: none;
    cursor: pointer;
  }

  .adv-btn-primary:hover { background: #2c4159; transform: translateY(-1px); }

  .adv-btn-ghost {
    display: inline-block;
    color: #1E2D40;
    padding: 0.9rem 2.2rem;
    border-radius: 2px;
    font-size: 0.88rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    font-family: 'Lato', sans-serif;
    font-weight: 700;
    border: 1.5px solid #1E2D40;
    margin-left: 1rem;
    transition: background 0.2s;
    background: transparent;
    cursor: pointer;
  }

  .adv-btn-ghost:hover { background: rgba(30,45,64,0.07); }

  .adv-hero-visual {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 260px;
  }

  .adv-breath {
    width: 280px;
    height: 280px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .adv-breath-ring {
    position: absolute;
    border-radius: 50%;
    border: 1.5px solid #7A9E7E;
    animation: breathe 5s ease-in-out infinite;
  }

  .adv-breath-ring:nth-child(1) { width: 100%; height: 100%; opacity: 0.15; animation-delay: 0s; }
  .adv-breath-ring:nth-child(2) { width: 78%; height: 78%; opacity: 0.25; animation-delay: 0.4s; }
  .adv-breath-ring:nth-child(3) { width: 58%; height: 58%; opacity: 0.45; animation-delay: 0.8s; }

  .adv-breath-core {
    width: 38%;
    height: 38%;
    border-radius: 50%;
    background: #7A9E7E;
    opacity: 0.6;
    animation: breathe-core 5s ease-in-out infinite;
    position: relative;
    z-index: 1;
  }

  @keyframes breathe {
    0%, 100% { transform: scale(1); opacity: 0.15; }
    50% { transform: scale(1.06); opacity: 0.3; }
  }

  @keyframes breathe-core {
    0%, 100% { transform: scale(1); opacity: 0.6; }
    50% { transform: scale(1.1); opacity: 0.8; }
  }

  .adv-divider {
    width: 64px;
    height: 1.5px;
    background: #C9A96E;
    margin: 0 3rem;
  }

  .adv-services {
    padding: 5rem 3rem;
    background: #fff;
  }

  .adv-section-label {
    font-size: 0.75rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: #C9A96E;
    font-weight: 700;
    margin-bottom: 0.8rem;
  }

  .adv-services h2 {
    font-family: 'Playfair Display', serif;
    font-size: 2rem;
    font-weight: 600;
    color: #1E2D40;
    margin-bottom: 3rem;
    max-width: 400px;
  }

  .adv-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.5rem;
  }

  .adv-card {
    border: 1px solid rgba(30,45,64,0.1);
    border-radius: 2px;
    padding: 2rem 1.5rem;
    background: #F7F4EE;
    transition: border-color 0.2s, transform 0.15s;
  }

  .adv-card:hover { border-color: #7A9E7E; transform: translateY(-3px); }

  .adv-card-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #7A9E7E;
    margin-bottom: 1.2rem;
  }

  .adv-card h3 {
    font-family: 'Playfair Display', serif;
    font-size: 1.1rem;
    font-weight: 600;
    color: #1E2D40;
    margin-bottom: 0.6rem;
  }

  .adv-card p {
    font-size: 0.9rem;
    line-height: 1.65;
    color: #4a5f73;
    font-weight: 300;
  }

  .adv-about {
    padding: 5rem 3rem;
    display: flex;
    gap: 4rem;
    align-items: flex-start;
    background: #1E2D40;
    color: #F7F4EE;
  }

  .adv-about-text { max-width: 540px; }

  .adv-about .adv-section-label { color: #C9A96E; }

  .adv-about h2 {
    font-family: 'Playfair Display', serif;
    font-size: 2rem;
    font-weight: 600;
    color: #F7F4EE;
    margin-bottom: 1.2rem;
  }

  .adv-about p {
    font-size: 1rem;
    line-height: 1.8;
    color: rgba(247,244,238,0.75);
    font-weight: 300;
    margin-bottom: 1rem;
  }

  .adv-about-name {
    margin-top: 1.8rem;
    padding-top: 1.5rem;
    border-top: 1px solid rgba(247,244,238,0.15);
  }

  .adv-about-name strong {
    font-family: 'Playfair Display', serif;
    font-size: 1.1rem;
    color: #F7F4EE;
    display: block;
    margin-bottom: 0.2rem;
    font-weight: 600;
  }

  .adv-about-name span {
    font-size: 0.82rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #7A9E7E;
  }

  .adv-contact {
    padding: 5rem 3rem;
    background: #F7F4EE;
    text-align: center;
  }

  .adv-contact h2 {
    font-family: 'Playfair Display', serif;
    font-size: 2rem;
    font-weight: 600;
    color: #1E2D40;
    margin-bottom: 1rem;
  }

  .adv-contact > p {
    color: #4a5f73;
    font-size: 1rem;
    font-weight: 300;
    margin-bottom: 2.5rem;
  }

  .adv-contact-info {
    display: flex;
    justify-content: center;
    gap: 3rem;
    flex-wrap: wrap;
    margin-bottom: 3rem;
  }

  .adv-contact-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.4rem;
  }

  .adv-contact-item-label {
    font-size: 0.72rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #7A9E7E;
    font-weight: 700;
  }

  .adv-contact-item-value {
    font-size: 0.95rem;
    color: #1E2D40;
  }

  .adv-footer {
    padding: 1.5rem 3rem;
    background: #1E2D40;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .adv-footer-logo {
    font-family: 'Playfair Display', serif;
    font-size: 1.1rem;
    color: #F7F4EE;
    opacity: 0.7;
  }

  .adv-footer p {
    font-size: 0.78rem;
    color: rgba(247,244,238,0.4);
    letter-spacing: 0.04em;
  }

  @media (max-width: 640px) {
    .adv-nav { padding: 1rem 1.5rem; }
    .adv-nav-links { display: none; }
    .adv-hero { flex-direction: column; padding: 2.5rem 1.5rem; min-height: auto; }
    .adv-breath { width: 200px; height: 200px; }
    .adv-services, .adv-contact { padding: 3.5rem 1.5rem; }
    .adv-about { flex-direction: column; padding: 3.5rem 1.5rem; gap: 2rem; }
    .adv-footer { flex-direction: column; gap: 0.5rem; text-align: center; padding: 1.2rem 1.5rem; }
    .adv-divider { margin-left: 1.5rem; }
  }
`;

export default function AdVitam() {
  useEffect(() => {
    const styleTag = document.createElement("style");
    styleTag.textContent = styles;
    document.head.appendChild(styleTag);

    const nav = document.querySelector(".adv-nav");
    const onScroll = () => {
      if (nav) nav.classList.toggle("scrolled", window.scrollY > 10);
    };
    window.addEventListener("scroll", onScroll);

    return () => {
      document.head.removeChild(styleTag);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div className="adv-root">
      <nav className="adv-nav">
        <a
          className="adv-logo-link"
          href="#"
          onClick={(e) => handleNavClick(e, "#")}
          aria-label="Wróć na górę"
        >
          <div className="adv-logo">
            Ad<span>Vitam</span>
          </div>
        </a>
        <ul className="adv-nav-links">
          <li><a href="#oferta" onClick={(e) => handleNavClick(e, "#oferta")}>Oferta</a></li>
          <li><a href="#o-mnie" onClick={(e) => handleNavClick(e, "#o-mnie")}>O mnie</a></li>
          <li><a href="#kontakt" onClick={(e) => handleNavClick(e, "#kontakt")}>Kontakt</a></li>
        </ul>
      </nav>

      <section className="adv-hero">
        <div className="adv-hero-text">
          <p className="adv-eyebrow">Poradnia Psychologiczna</p>
          <h1>
            Przestrzeń, w której<br />
            <em>możesz być sobą</em>
          </h1>
          <p>
            Oferuję profesjonalną pomoc psychologiczną w atmosferze bezpieczeństwa
            i szacunku. Razem znajdziemy drogę do lepszego samopoczucia i wewnętrznej
            równowagi.
          </p>
        </div>
        <div className="adv-hero-visual">
          <div className="adv-breath">
            <div className="adv-breath-ring" />
            <div className="adv-breath-ring" />
            <div className="adv-breath-ring" />
            <div className="adv-breath-core" />
          </div>
        </div>
      </section>

      <div className="adv-divider" />

      <section className="adv-services" id="oferta">
        <p className="adv-section-label">Czym się zajmuję</p>
        <h2>Wsparcie dopasowane do Twoich potrzeb</h2>
        <div className="adv-cards">
          {[
            {
              title: "Terapia indywidualna",
              desc: "Praca z trudnymi emocjami, kryzysami życiowymi i problemami codziennego funkcjonowania.",
            },
            {
              title: "Lęk i depresja",
              desc: "Skuteczna pomoc w radzeniu sobie z zaburzeniami nastroju i stanami lękowymi.",
            },
            {
              title: "Stres i wypalenie",
              desc: "Wsparcie w sytuacjach przeciążenia, wypalenia zawodowego i chronicznego napięcia.",
            },
            {
              title: "Relacje i komunikacja",
              desc: "Praca nad trudnościami w relacjach z bliskimi, w pracy i z samym sobą.",
            },
          ].map((card) => (
            <div className="adv-card" key={card.title}>
              <div className="adv-card-dot" />
              <h3>{card.title}</h3>
              <p>{card.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="adv-about" id="o-mnie">
        <div className="adv-about-text">
          <p className="adv-section-label">O mnie</p>
          <h2>Towarzyszę w trudnych momentach</h2>
          <p>
          Realizuję konsultacje psychologiczne oraz psychoterapię osób dorosłych w obrębie Środowiskowego Centrum Psychiatrii i Psychoterapii CALMA.
          </p>
          <p>
          Ukończyłam psychologię na Uniwersytecie Wrocławskim. Od 2002 roku szkoliłam się w obszarze psychoterapii. W pierwszej kolejności był to Krakowski Ośrodek Terapii, a następnie Krakowskie Centrum Psychodynamiczne. Miałam możliwość pracować w Dolnośląskim Centrum Pediatrycznym na Oddziale Psychiatrii Dzieci i Młodzieży, Specjalistycznej Poradni Rodzinnej, Ośrodku Adopcyjnym oraz Dolnośląskim Centrum Psychoterapii. W 2006 roku podjęłam decyzję o założeniu prywatnej praktyki psychoterapeutycznej, w ramach której ściśle współpracowałam z lekarzem psychiatrą. W ramach dalszego pogłębiania wiedzy i gromadzenia doświadczenia odbyłam staż kliniczny w Wojewódzkim Szpitalu dla Nerwowo i Psychicznie Chorych w Lubiążu.
          </p>
          <div className="adv-about-name">
            <strong>Dominika Gajos</strong>
            <span>Psycholog · Poradnia AdVitam</span>
          </div>
        </div>
      </section>

      <section className="adv-contact" id="kontakt">
        <p className="adv-section-label">Kontakt</p>
        <h2>Zrób pierwszy krok</h2>
        <p>Pierwsza konsultacja to rozmowa bez zobowiązań. Napisz lub zadzwoń.</p>
        <div className="adv-contact-info">
          <div className="adv-contact-item">
            <span className="adv-contact-item-label">Telefon</span>
            <span className="adv-contact-item-value">+48 606 347 242</span>
          </div>
          <div className="adv-contact-item">
            <span className="adv-contact-item-label">E-mail</span>
            <span className="adv-contact-item-value">gajos.dominika@gmail.com</span>
          </div>
          <div className="adv-contact-item">
            <span className="adv-contact-item-label">Godziny przyjęć</span>
            <span className="adv-contact-item-value">Pon – Pt, 9:00–18:00</span>
          </div>
        </div>
      </section>

      <footer className="adv-footer">
        <div className="adv-footer-logo">AdVitam</div>
        <p>© 2025 Poradnia Psiychologiczna AdVitam · Dominika Gajos</p>
      </footer>
    </div>
  );
}

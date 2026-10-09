import { useEffect, useMemo, useState } from 'react';
import portraitImage from '../img/KyiPhyuKhant.jpg';

const navItems = [
  { id: 'about', label: 'About', href: 'index.html', icon: 'fas fa-user' },
  { id: 'expertise', label: 'Expertise', href: 'expertise.html', icon: 'fas fa-code' },
  { id: 'contact', label: 'Connect', href: 'contact.html', icon: 'fas fa-envelope' },
];

const stats = [
  ['8+', 'Years Experience'],
  ['CMS', 'WordPress, Drupal, Custom Admins'],
  ['Stack', 'HTML, CSS, JavaScript, PHP, MySQL'],
];

const focusItems = [
  ['fas fa-cart-shopping', 'E-commerce and CMS builds'],
  ['fas fa-mobile-screen-button', 'Responsive front-end interfaces'],
  ['fas fa-database', 'PHP and MySQL application work'],
];

const experiences = [
  ['Full Stack Developer', 'Numinix', 'https://numinix.com/', 'Full-time · Feb 2025 - Present', true],
  ['E-commerce WordPress Developer', 'TabacFree', 'https://tabacfree.com/', 'Full-time · Dec 2023 - Sep 2024'],
  ['Frontend Developer', 'UNICOMI', 'https://www.unicomi.com/', 'Full-time · Nov 2021 - Dec 2023'],
  ['Co-Founder & Operations Manager', 'Tine Yin May', 'https://www.facebook.com/TineYinnMay', 'Self-employed · May 2020 - Dec 2021'],
  ['Back End Developer', 'ERA Myanmar', 'https://eramyanmar.com/', 'Full-time · Dec 2019 - Oct 2021'],
  ['Senior Web Developer', 'ERA Myanmar', 'https://eramyanmar.com/', 'Full-time · Jun 2019 - Dec 2019'],
  ['PHP Web Developer', 'Etiqa Insurance Singapore', 'https://www.etiqa.com.sg/', 'Contract · May 2017 - Nov 2017'],
  ['Content Management System Developer', 'Nex Co., Ltd.', 'https://www.nexlabs.co/', 'Full-time · Jan 2016 - Feb 2017'],
  ['Web Developer', 'CREATiVe Web Studio', 'https://www.creative-webstudio.com/', 'Full-time · Jun 2012 - Nov 2015'],
];

const skills = [
  ['fas fa-code', 'HTML5 & CSS3'],
  ['fas fa-code-branch', 'jQuery / JavaScript'],
  ['fab fa-bootstrap', 'Bootstrap'],
  ['fas fa-desktop', 'Responsive UI'],
  ['fas fa-cogs', 'Drupal'],
  ['fab fa-wordpress', 'WordPress'],
  ['fas fa-shopping-cart', 'ZenCart'],
  ['fab fa-jira', 'Jira'],
  ['fas fa-code', 'PHP'],
  ['fas fa-database', 'MySQL'],
  ['fab fa-css3-alt', 'Tailwind CSS'],
  ['fab fa-react', 'React'],
  ['fas fa-paint-brush', 'Google Web Designer'],
  ['fas fa-image', 'Adobe Photoshop'],
  ['fas fa-file-alt', 'Microsoft Office'],
  ['fab fa-git-alt', 'GIT'],
  ['fas fa-code-branch', 'VS Code'],
  ['fas fa-server', 'cPanel'],
  ['fas fa-pencil-alt', 'Pencil'],
  ['fab fa-google', 'Google Services'],
];

const socialLinks = [
  ['fab fa-linkedin', 'LinkedIn', 'https://linkedin.com/in/kyiphyu-khant'],
  ['fab fa-stack-overflow', 'Stack Overflow', 'https://stackoverflow.com/users/9482702'],
  ['fab fa-github', 'GitHub', 'https://github.com/KyiPhyuKhant'],
  ['fab fa-twitter', 'X / Twitter', 'https://x.com/kyiphyukhant'],
  ['fab fa-facebook', 'Facebook', 'https://www.facebook.com/JeVeuxJusteEtreLibre'],
  ['fab fa-instagram', 'Instagram', 'https://www.instagram.com/kyi_phyu_khant/'],
  ['fab fa-youtube', 'YouTube', 'https://www.youtube.com/@julykhant/'],
];

function getPageFromPath() {
  const filename = window.location.pathname.split('/').pop();

  if (filename === 'expertise.html') {
    return 'expertise';
  }

  if (filename === 'contact.html') {
    return 'contact';
  }

  return 'about';
}

function useVisitorCount() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const savedCount = Number.parseInt(localStorage.getItem('visitCount') || '0', 10);
    const nextCount = Number.isNaN(savedCount) ? 1 : savedCount + 1;
    localStorage.setItem('visitCount', String(nextCount));
    setCount(nextCount);
  }, []);

  return count;
}

function useBackToTopVisibility() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(document.body.scrollTop > 100 || document.documentElement.scrollTop > 100);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return isVisible;
}

function useSpaceCursor() {
  useEffect(() => {
    const handlePointerMove = (event) => {
      document.body.style.setProperty('--cursor-x', `${event.clientX}px`);
      document.body.style.setProperty('--cursor-y', `${event.clientY}px`);
    };

    window.addEventListener('pointermove', handlePointerMove);

    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, []);
}

function useBodyClass(page) {
  useEffect(() => {
    document.body.className = ['home-page', page !== 'about' ? 'sub-page' : '', `${page}-page`]
      .filter(Boolean)
      .join(' ');
  }, [page]);
}

function handleTilt(event) {
  const card = event.currentTarget;
  const bounds = card.getBoundingClientRect();
  const x = event.clientX - bounds.left;
  const y = event.clientY - bounds.top;
  const rotateX = ((y / bounds.height) - 0.5) * -8;
  const rotateY = ((x / bounds.width) - 0.5) * 8;

  card.style.setProperty('--tilt-x', `${rotateY.toFixed(2)}deg`);
  card.style.setProperty('--tilt-y', `${rotateX.toFixed(2)}deg`);
  card.style.setProperty('--card-x', `${x}px`);
  card.style.setProperty('--card-y', `${y}px`);
}

function resetTilt(event) {
  const card = event.currentTarget;
  card.style.setProperty('--tilt-x', '0deg');
  card.style.setProperty('--tilt-y', '0deg');
  card.style.setProperty('--card-x', '50%');
  card.style.setProperty('--card-y', '20%');
}

function TiltSurface({ as: Component = 'div', className, children, ...props }) {
  return (
    <Component
      className={className}
      onPointerMove={handleTilt}
      onPointerLeave={resetTilt}
      {...props}
    >
      {children}
    </Component>
  );
}

function SpaceScene() {
  return (
    <div className="space-scene" aria-hidden="true">
      <span className="star-layer star-layer-one" />
      <span className="star-layer star-layer-two" />
      <span className="orbit-ring orbit-one" />
      <span className="orbit-ring orbit-two" />
      <span className="cursor-light" />
    </div>
  );
}

function Navigation({ activePage }) {
  return (
    <nav className="site-nav" aria-label="Main navigation">
      <a className="brand-mark" href="index.html">KPK</a>
      <ul>
        {navItems.map((item) => (
          <li key={item.id}>
            <a className={activePage === item.id ? 'active' : undefined} href={item.href}>
              <i className={item.icon} aria-hidden="true" />
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function HomePage({ activePage }) {
  return (
    <>
      <header className="home-hero">
        <Navigation activePage={activePage} />

        <div className="hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">Currently living in Tokyo</p>
            <h1>Kyi Phyu Khant</h1>
            <p className="hero-title">
              Full Stack, Front-End, and CMS Developer building practical web experiences for teams and customers.
            </p>
            <div className="hero-actions">
              <a className="button-primary" href="https://github.com/KyiPhyuKhant/kyiphyukhant.github.io/raw/main/img/Kyi_Phyu_Khant_Resume_Full_Stack_Web_Developer.pdf" target="_blank" rel="noopener noreferrer">
                <i className="fas fa-file-pdf" aria-hidden="true" />
                View Resume
              </a>
              <a className="button-secondary" href="expertise.html">
                <i className="fas fa-layer-group" aria-hidden="true" />
                See Expertise
              </a>
            </div>
          </div>

          <TiltSurface className="hero-portrait" aria-label="Portrait of Kyi Phyu Khant">
            <img src={portraitImage} alt="Kyi Phyu Khant" />
            <div className="portrait-caption">
              <span>Currently</span>
              <strong>Full Stack Developer at Numinix</strong>
            </div>
          </TiltSurface>
        </div>

        <div className="hero-stats" aria-label="Professional highlights">
          {stats.map(([value, label]) => (
            <div key={label}>
              <strong>{value}</strong>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </header>

      <main>
        <section id="about" className="home-section about-section">
          <div className="section-heading">
            <p className="eyebrow">About</p>
            <h2>Developer with product sense and production habits.</h2>
          </div>
          <div className="about-grid">
            <p>
              I'm Kyi, a Web Developer with over 8 years of experience and a Bachelor's degree in Information
              Technology. I am passionate about web development and continuously learning about the latest technologies.
              In my spare time, I study more about web development, watch TV sitcoms, and explore around Bangkok.
            </p>
            <div className="focus-list">
              {focusItems.map(([icon, label]) => (
                <TiltSurface key={label}>
                  <i className={icon} aria-hidden="true" />
                  <span>{label}</span>
                </TiltSurface>
              ))}
            </div>
          </div>
        </section>

        <section id="experience" className="home-section experience-section">
          <div className="section-heading">
            <p className="eyebrow">Experience</p>
            <h2>Recent roles and long-term web development background.</h2>
          </div>
          <div className="experience-list">
            {experiences.map(([role, company, href, detail, featured]) => (
              <TiltSurface as="article" className={`experience-item${featured ? ' featured' : ''}`} key={`${role}-${company}`}>
                <span className="role">{role}</span>
                <h3>
                  <a href={href} target="_blank" rel="noopener noreferrer">
                    {company}
                    <i className="fas fa-arrow-up-right-from-square" aria-hidden="true" />
                  </a>
                </h3>
                <p>{detail}</p>
              </TiltSurface>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}

function SubpageHero({ activePage, eyebrow, title, description }) {
  return (
    <header className="subpage-hero">
      <Navigation activePage={activePage} />
      <div className="subpage-copy">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
    </header>
  );
}

function ExpertisePage({ activePage }) {
  return (
    <>
      <SubpageHero
        activePage={activePage}
        eyebrow="Mission toolkit"
        title="Expertise"
        description="Technologies and tools I use to design, build, maintain, and ship responsive web experiences."
      />
      <main>
        <section id="skills" className="home-section skills-section">
          <div className="section-heading">
            <p className="eyebrow">Core Systems</p>
            <h2>Front-end, CMS, e-commerce, and operations skills.</h2>
          </div>
          <div className="skills-grid">
            {skills.map(([icon, label]) => (
              <TiltSurface as="article" className="skill-card" key={label}>
                <i className={icon} aria-hidden="true" />
                <h3>{label}</h3>
              </TiltSurface>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}

function ContactPage({ activePage }) {
  return (
    <>
      <SubpageHero
        activePage={activePage}
        eyebrow="Open channel"
        title="Contact"
        description="Reach out for project discussions, collaboration, or a quick web development conversation."
      />
      <main>
        <section id="contact" className="home-section contact-section">
          <div className="contact-grid">
            <TiltSurface as="article" className="contact-card primary-contact">
              <p className="eyebrow">Direct Signal</p>
              <h2>Get in touch</h2>
              <p>If you have any questions or want to discuss a project, feel free to reach out.</p>
              <a href="mailto:kp.khantkhant@gmail.com">
                <i className="fas fa-envelope" aria-hidden="true" />
                kp.khantkhant@gmail.com
              </a>
              <a href="tel:+660842720844">
                <i className="fas fa-phone-alt" aria-hidden="true" />
                +66 0842720844
              </a>
            </TiltSurface>

            <TiltSurface as="article" className="contact-card">
              <p className="eyebrow">Location</p>
              <h2>Tokyo orbit</h2>
              <p>Available for remote collaboration and web development work across front-end, CMS, and e-commerce projects.</p>
            </TiltSurface>
          </div>
        </section>

        <section id="social" className="home-section social-section">
          <div className="section-heading">
            <p className="eyebrow">Social Links</p>
            <h2>Connect across the web.</h2>
          </div>
          <div className="social-grid">
            {socialLinks.map(([icon, label, href]) => (
              <TiltSurface as="a" className="social-card" href={href} target="_blank" rel="nofollow noopener noreferrer" key={label}>
                <i className={icon} aria-hidden="true" />
                <span>{label}</span>
              </TiltSurface>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}

function Footer({ visitorCount }) {
  const year = useMemo(() => new Date().getFullYear(), []);

  return (
    <footer className="home-footer">
      <div className="container mx-auto px-6 text-center">
        <p className="text-xs font-light mb-4">&copy; {year} Kyi Phyu Khant. All rights reserved.</p>
        <p className="text-xs font-light">Visitor Count: <span>{visitorCount}</span></p>
      </div>
    </footer>
  );
}

function BackToTop() {
  const isVisible = useBackToTopVisibility();

  return (
    <button
      type="button"
      id="backToTop"
      className={`fixed bottom-10 right-10 bg-blue-600 text-white rounded-full p-3 shadow-lg transition-transform transform hover:scale-105${isVisible ? '' : ' hidden'}`}
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      ↑
    </button>
  );
}

function StructuredData() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Kyi Phyu Khant',
    jobTitle: 'Web Developer',
    url: 'https://kyiphyukhant.github.io/',
    sameAs: [
      'https://x.com/kyiphyukhant',
      'https://www.instagram.com/kyi_phyu_khant/',
      'https://www.linkedin.com/in/kyiphyu-khant',
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default function App() {
  const page = getPageFromPath();
  const visitorCount = useVisitorCount();

  useBodyClass(page);
  useSpaceCursor();

  return (
    <>
      <SpaceScene />
      {page === 'about' && <HomePage activePage={page} />}
      {page === 'expertise' && <ExpertisePage activePage={page} />}
      {page === 'contact' && <ContactPage activePage={page} />}
      <Footer visitorCount={visitorCount} />
      <StructuredData />
      <BackToTop />
    </>
  );
}

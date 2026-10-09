import { useEffect, useState } from 'react';
import resumeUrl from '../img/Kyi_Phyu_Khant_Frontend_Engineer.pdf';
import heroImage from '../img/workspace-hero.png';

const contentWidth = 'mx-auto w-[calc(100%_-_40px)] max-w-[1120px] tablet:w-[calc(100%_-_64px)]';
const sectionSpacing = 'py-9 tablet:py-12';
const buttonBase = 'inline-flex items-center justify-center whitespace-nowrap rounded-[7px] border font-medium transition-colors duration-150';
const primaryColors = 'border-transparent bg-brand text-white hover:bg-brand-hover';
const buttonSize = 'min-h-12 gap-3 px-4 py-3 text-[13px] tablet:px-[22px] tablet:text-sm';
const primaryButton = `${buttonBase} ${buttonSize} ${primaryColors}`;

const navItems = [
  { id: 'about', label: 'About' },
  { id: 'expertise', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
];

const experiences = [
  ['Senior Full-Stack Web Developer', 'Numinix', 'https://numinix.com/', 'Jan 2025 - Present', 'Vancouver, Canada'],
  ['Full Stack Developer', 'UrbanFlowers and Tabacfree', 'https://www.urbanflowers.co.th/', 'Dec 2023 - Sep 2024', 'Bangkok, Thailand'],
  ['Web App Developer', 'Unicomi', 'https://www.unicomi.com/', 'Nov 2021 - Dec 2023', 'Singapore'],
  ['Backend Developer', 'ERA Myanmar', 'https://eramyanmar.com/', 'Jun 2019 - Oct 2021', 'Yangon, Myanmar'],
  ['Web App Developer', 'ETIQA', 'https://www.etiqa.com.sg/', 'May 2017 - Nov 2017', 'Singapore'],
  ['Web Developer', 'NEX', 'https://www.nexlabs.co/', 'Jan 2016 - Feb 2017', 'Yangon, Myanmar'],
  ['Web Developer', 'Creative Web Studio', 'https://www.creative-webstudio.com/', 'Jun 2012 - Nov 2015', 'Yangon, Myanmar'],
];

const responsibilities = {
  Numinix: [
    'Develop and maintain responsive frontend features for production e-commerce applications using JavaScript, HTML5, CSS3, and PHP.',
    'Implement interactive checkout flows, forms, and customer-facing UI features.',
    'Improve frontend performance through lazy loading, image optimization, and asset minification.',
    'Resolve frontend bugs, browser compatibility issues, and production problems.',
    'Manage Git workflows, test changes in staging, and support production deployments with designers, QA, and stakeholders.',
  ],
  'UrbanFlowers and Tabacfree': [
    'Managed and maintained WordPress and WooCommerce e-commerce websites.',
    'Worked with marketing and design teams on content, promotions, and customer-facing improvements.',
    'Integrated Zoho CRM to support customer and business data workflows.',
    'Supported SEO, website performance, hosting, and DNS operations, and resolved e-commerce and UI issues.',
  ],
  Unicomi: [
    'Developed responsive web interfaces and reusable React components with interactive UI features.',
    'Integrated REST APIs and managed component state and user interactions.',
    'Converted Figma and PSD designs into responsive, production-ready interfaces.',
    'Tested across browsers and devices, resolved frontend issues, and supported ongoing application maintenance.',
  ],
  'ERA Myanmar': [
    'Developed responsive web applications using React, Vue, and JavaScript.',
    'Built and maintained CMS platforms, marketing websites, and microsites.',
    'Developed PHP/Laravel and MySQL functionality and integrated interfaces with REST APIs and backend services.',
    'Troubleshot UI and application issues and improved performance.',
  ],
  ETIQA: [
    'Customized CMS frameworks and implemented website features and responsive interfaces.',
    'Developed and maintained an internal PHP Staff Portal.',
    'Participated in system integration and user acceptance testing (SIT/UAT), resolved reported issues, and supported application and database maintenance.',
  ],
  NEX: [
    'Developed responsive WordPress and Drupal templates and frontend features using JavaScript, HTML5, CSS3, and Bootstrap.',
    'Maintained client websites and resolved UI and technical issues.',
    'Assisted with website design and content structure, collaborating with clients and project teams.',
  ],
  'Creative Web Studio': [
    'Developed responsive websites and web applications with JavaScript, HTML5, CSS3, and Bootstrap.',
    'Created wireframes and prototypes from client requirements.',
    'Supported backend development and deployed systems, and identified and resolved website issues.',
  ],
};

const skills = [
  'HTML5 & CSS3', 'JavaScript', 'React', 'Vue.js', 'Sass / SCSS',
  'Tailwind CSS', 'Bootstrap', 'Responsive UI',
  'PHP', 'Laravel', 'MySQL', 'WordPress', 'Zen Cart', 'Drupal', 'Shopify',
  'Git', 'Jira', 'Figma', 'Photoshop', 'Agile / Scrum', 'QA & Production Support',
];

const socialLinks = [
  ['fab fa-linkedin', 'LinkedIn', 'https://linkedin.com/in/kyiphyu-khant'],
  ['fab fa-github', 'GitHub', 'https://github.com/KyiPhyuKhant'],
  ['fab fa-stack-overflow', 'Stack Overflow', 'https://stackoverflow.com/users/9482702'],
  ['fab fa-youtube', 'YouTube', 'https://www.youtube.com/@julykhant/'],
];

function Icon({ name, className = '' }) {
  return <i className={`${name} ${className}`} aria-hidden="true" />;
}

function DownloadCV({ secondary = false, compact = false, className = '' }) {
  const variant = secondary
    ? `${buttonBase} border-[#505a70] bg-white/85 text-ink hover:border-brand hover:bg-[#eef3ff]`
    : `${buttonBase} ${primaryColors}`;
  const size = compact
    ? 'min-h-[38px] gap-[6px] px-2 py-2 text-xs tiny:gap-3 tiny:px-3 tablet:min-h-[42px] tablet:px-[18px] tablet:py-[9px] tablet:text-sm'
    : buttonSize;
  return (
    <a className={`${variant} ${size} ${className}`} href={resumeUrl} download="Kyi_Phyu_Khant_CV.pdf">
      <Icon name="fas fa-download" className="text-[17px]" />
      Download CV
    </a>
  );
}

function useSectionNavigation() {
  const [activeSection, setActiveSection] = useState('about');
  useEffect(() => {
    const filename = window.location.pathname.split('/').pop();
    const legacySection = { 'expertise.html': 'expertise', 'contact.html': 'contact' }[filename];
    if (legacySection) window.history.replaceState(null, '', `./#${legacySection}`);
    document.title = 'Kyi Phyu Khant | Frontend Engineer';
    const target = document.getElementById(window.location.hash.slice(1));
    if (target) target.scrollIntoView({ behavior: 'instant' });
    const updateSection = () => {
      const offset = document.querySelector('.navigation-bar').getBoundingClientRect().height + 40;
      let current = 'about';
      // Read the document order because Skills precedes Experience on the page.
      document.querySelectorAll('main section[id]').forEach(section => {
        if (section.getBoundingClientRect().top <= offset) current = section.id;
      });
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) current = 'contact';
      setActiveSection(current);
    };
    updateSection();
    window.addEventListener('scroll', updateSection, { passive: true });
    window.addEventListener('resize', updateSection);
    return () => {
      window.removeEventListener('scroll', updateSection);
      window.removeEventListener('resize', updateSection);
    };
  }, []);
  return activeSection;
}

function Navigation({ activeSection }) {
  return (
    <div className="navigation-bar sticky top-0 z-20 border-b border-[#eef0f4] bg-white/97">
      <nav className={`${contentWidth} flex min-h-[76px] flex-wrap items-center gap-x-4 gap-y-2 pt-3 pb-[10px] tablet:flex-nowrap tablet:gap-6 tablet:py-0 desktop:gap-9`} aria-label="Main navigation">
        <a className="whitespace-nowrap text-[15px] font-semibold tiny:text-[17px] tablet:text-lg desktop:text-[21px]" href="#top">Kyi Phyu Khant</a>
        <ul className="order-3 flex w-full justify-between gap-3 tablet:order-none tablet:ml-auto tablet:w-auto tablet:justify-start tablet:gap-[18px] desktop:gap-7">
          {navItems.map(({ id, label }) => (
            <li key={id}>
              <a className={`block py-[6px] text-[13px] transition-colors duration-150 hover:text-brand tablet:py-3 tablet:text-sm ${activeSection === id ? 'text-brand' : 'text-ink'}`} href={`#${id}`} aria-current={activeSection === id ? 'location' : undefined}>{label}</a>
            </li>
          ))}
        </ul>
        <div className="ml-auto tablet:ml-0"><DownloadCV compact /></div>
      </nav>
    </div>
  );
}

function SectionHeading({ label, children }) {
  return (
    <div className="mb-[18px]">
      <p className={`mb-[10px] text-xs font-medium uppercase after:mt-[5px] after:block after:h-[2px] after:w-8 after:bg-brand after:content-[''] ${label === 'Contact' ? 'text-brand' : 'text-[#59647d]'}`}>{label}</p>
      <h2 className="text-[28px] leading-[1.25] font-semibold tablet:text-[32px]">{children}</h2>
    </div>
  );
}

function Hero() {
  return (
    <header className="hero relative isolate bg-[#f7f7f7]" id="top">
      <img src={heroImage} alt="" aria-hidden="true" className="absolute inset-0 -z-10 h-full w-full object-cover object-[63%_center] opacity-[0.18] tablet:object-center tablet:opacity-100" />
      <div className={`${contentWidth} py-[52px] tablet:min-h-[430px] tablet:pt-[76px] tablet:pb-[78px] wide:py-[84px]`}>
        <p className="mb-3 text-xs font-semibold text-[#59647d] uppercase">Web Development</p>
        <h1 className="max-w-[620px] text-[34px] leading-[1.12] font-bold tiny:text-[40px] tablet:max-w-[500px] tablet:text-[46px] desktop:max-w-[620px] desktop:text-[52px]">Kyi Phyu Khant</h1>
        <p className="mt-2 max-w-[340px] text-xl leading-[1.4] font-semibold text-muted tablet:max-w-[480px] tablet:text-[22px] desktop:max-w-[600px] desktop:text-2xl">Web Engineer</p>
        <p className="mt-[10px] max-w-[330px] text-[15px] leading-[1.5] tablet:max-w-[430px] tablet:text-[17px]">Building clean, responsive, and user-friendly web applications.</p>
        <div className="hero-actions mt-6 flex flex-wrap gap-3 tablet:gap-4">
          <a className={`${primaryButton} max-tablet:px-4 max-tablet:text-[13px]`} href="#contact"><Icon name="far fa-envelope" className="text-[17px]" />Contact Me</a>

        </div>
      </div>
    </header>
  );
}

function About() {
  return <section id="about" className={sectionSpacing}><div className={`${contentWidth} grid items-center gap-7 tablet:grid-cols-[1.2fr_1fr] tablet:gap-8 desktop:gap-[52px]`}>
    <div><SectionHeading label="About">About Me</SectionHeading>
      <p className="text-[15px] leading-[1.65] text-[#424b60] tablet:text-base">A web developer with 9+ years of experience building web applications and responsive interfaces. I work with JavaScript, React, Vue.js, and REST APIs to turn designs into reusable, production-ready UI. I enjoy solving complex issues, improving frontend performance, and collaborating with designers, QA engineers, clients, and international teams.</p>
    </div>
    <dl className="grid gap-[18px] border-t border-line pt-6 tablet:gap-5 tablet:border-t-0 tablet:border-l tablet:pt-0 tablet:pl-7 desktop:pl-[42px] [&>div]:grid [&>div]:grid-cols-[28px_1fr] [&>div]:gap-x-5 [&_i]:row-span-2 [&_i]:self-center [&_i]:text-center [&_i]:text-[22px] [&_dt]:text-sm [&_dt]:font-medium [&_dd]:text-[13px] [&_dd]:text-muted">
      <div><Icon name="fas fa-map-marker-alt" /><dt>Tokyo, Japan</dt><dd>Currently based in Tokyo</dd></div>
      <div><Icon name="fas fa-briefcase" /><dt>Senior Full-Stack Web Developer</dt><dd>Currently at Numinix</dd></div>
      <div><Icon name="fas fa-laptop-code" /><dt>Frontend, CMS & E-commerce</dt><dd>Responsive web experiences</dd></div>
      <div><Icon name="fas fa-graduation-cap" /><dt>Information Technology</dt><dd>Bachelor's degree</dd></div>
    </dl>
  </div></section>;
}

function Skills() {
  return <section id="expertise" className="bg-[#fafbfd] py-9 tablet:py-[38px]"><div className={contentWidth}>
    <SectionHeading label="Skills">Technical Skills</SectionHeading>
    <ul className="skill-tags flex flex-wrap gap-[10px] tablet:gap-x-4 tablet:gap-y-3">{skills.map(skill => <li className="rounded-full bg-[#edf2f8] px-4 py-2 text-center text-xs tablet:px-6 tablet:py-[10px] tablet:text-[13px]" key={skill}>{skill}</li>)}</ul>
  </div></section>;
}

function Experience() {
  return <section id="experience" className={sectionSpacing}><div className={contentWidth}>
    <SectionHeading label="Experience">Work Experience</SectionHeading>
    <ol className="mt-6 pl-[10px]">{experiences.map(([role, company, href, dates, type]) => <li className="timeline-item relative grid gap-2 border-l border-[#8aafff] pb-[26px] pl-[26px] before:absolute before:top-[5px] before:-left-[7px] before:size-[13px] before:rounded-full before:bg-brand before:content-[''] last:pb-0 tablet:grid-cols-[220px_1fr] tablet:gap-5 tablet:pb-[30px] tablet:pl-10 desktop:grid-cols-[250px_1fr]" key={`${role}-${company}`}>
      <div><p className="text-[13px] font-semibold tablet:text-sm">{dates}</p><span className="text-[13px] text-muted">{type}</span></div>
      <div className="min-w-0">
        <h3 className="text-sm leading-[1.45] font-semibold tablet:text-[15px]">{role}</h3>
        <a className="text-sm text-[#4a5468] hover:text-brand" href={href} target="_blank" rel="noopener noreferrer">{company}<Icon name="fas fa-arrow-up-right-from-square" className="ml-2 text-[10px]" /></a>
        {responsibilities[company] && (
          <ul className="mt-2 list-disc space-y-1 pl-[18px] text-[13px] leading-[1.65] text-[#4a5468] tablet:text-sm">
            {responsibilities[company].map(task => <li key={task}>{task}</li>)}
          </ul>
        )}
      </div>
    </li>)}</ol>
  </div></section>;
}

function Contact() {
  return <section id="contact" className="bg-[#f2f7fd] py-9 tablet:py-[38px]"><div className={`${contentWidth} grid items-center gap-6 tablet:grid-cols-2 tablet:gap-8 desktop:grid-cols-[1.1fr_1fr_auto]`}>
    <div><SectionHeading label="Contact">Let's Work Together</SectionHeading><p className="max-w-[390px] text-sm text-muted">Feel free to contact me about web development projects, collaboration, or new opportunities.</p></div>
    <div className="grid gap-[14px] tablet:border-l tablet:border-line tablet:pl-[30px] [&>a]:flex [&>a]:items-center [&>a]:gap-[14px] [&>a]:text-xs [&>a]:text-[#4a5468] [&>a:hover]:text-brand [&_i]:w-[22px] [&_i]:shrink-0 [&_i]:basis-[22px] [&_i]:text-center [&_i]:text-xl [&_i]:text-ink [&_span]:wrap-anywhere">
      <a href="mailto:kp.khantkhant@gmail.com"><Icon name="far fa-envelope" /><span>kp.khantkhant@gmail.com</span></a>
      <a href="https://linkedin.com/in/kyiphyu-khant" target="_blank" rel="noopener noreferrer"><Icon name="fab fa-linkedin" /><span>linkedin.com/in/kyiphyu-khant</span></a>
      <a href="https://github.com/KyiPhyuKhant" target="_blank" rel="noopener noreferrer"><Icon name="fab fa-github" /><span>github.com/KyiPhyuKhant</span></a>
      </div>

  </div></section>;
}

function Footer() {
  return <footer className="border-t border-[#e9edf4] bg-white py-[22px]"><div className={`${contentWidth} flex flex-col items-start justify-between gap-3 tablet:flex-row tablet:items-center tablet:gap-5`}>
    <p className="text-xs text-muted">&copy; {new Date().getFullYear()} Kyi Phyu Khant</p>
    <div className="flex gap-4">{socialLinks.map(([icon, label, href]) => <a className="text-lg text-[#626d80] hover:text-brand" href={href} key={label} aria-label={label} title={label} target="_blank" rel="noopener noreferrer"><Icon name={icon} /></a>)}</div>
  </div></footer>;
}

function BackToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const update = () => setVisible(window.scrollY > 400);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);
  return visible && <a className="fixed right-[22px] bottom-[22px] z-10 flex size-10 items-center justify-center rounded-[7px] bg-brand text-white shadow-[0_3px_12px_#1c61ff25]" href="#top" aria-label="Back to top" title="Back to top"><Icon name="fas fa-arrow-up" /></a>;
}

export default function App() {
  const activeSection = useSectionNavigation();
  const schema = {
    '@context': 'https://schema.org', '@type': 'Person', name: 'Kyi Phyu Khant',
    jobTitle: 'Frontend Engineer', url: 'https://kyiphyukhant.github.io/',
    sameAs: socialLinks.map(([, , href]) => href),
  };
  return <>
    <Navigation activeSection={activeSection} /><Hero />
    <main><About /><Skills /><Experience /><Contact /></main>
    <Footer /><BackToTop />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
  </>;
}

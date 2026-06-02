import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import {
  blogPosts,
  contactCities,
  destinationDetails,
  faqItems,
  getBlogPost,
  homeStats,
  northHighlights,
  packageDetails,
  regionPages,
  southHighlights,
} from './siteData';
import { assets } from './assets';
import { HeroCarousel, PackageGallery, SiteFooter, SiteNavbar, useBodyClass } from './components';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/;
const phoneRegex = /^[0-9+\s-]{7,}$/;

function BookingForm({ compact = false }) {
  const [captchaParts] = useState(() => [Math.floor(Math.random() * 9) + 1, Math.floor(Math.random() * 9) + 1]);
  const [message, setMessage] = useState('');

  const fields = compact
    ? [
        ['Name *', 'text'],
        ['City of Residence *', 'text'],
        ['Email *', 'email'],
        ['Phone Number *', 'tel'],
        ['WhatsApp', 'tel'],
        ['Travel Destination *', 'text'],
        ['Date of Travel *', 'text'],
        ['No. of People *', 'number'],
        ['Vacation Type *', 'text'],
      ]
    : [
        ['Name *', 'text'],
        ['City of Residence *', 'text'],
        ['Email *', 'email'],
        ['Phone Number *', 'tel'],
        ['WhatsApp', 'tel'],
        ['Travel Destination *', 'text'],
        ['Date of Travel *', 'text'],
        ['No. of People *', 'number'],
        ['Vacation Type *', 'text'],
      ];

  const handleSubmit = (event) => {
    event.preventDefault();
    const answer = Number(event.currentTarget.elements.captcha?.value);
    if (answer !== captchaParts[0] + captchaParts[1]) {
      setMessage('Captcha incorrect. Please try again.');
      return;
    }

    setMessage('Thanks! Your enquiry has been submitted successfully.');
    event.currentTarget.reset();
  };

  return (
    <form className="row g-3" onSubmit={handleSubmit}>
      {fields.map(([placeholder, type], index) => {
        if (index === 3 && !compact) {
          return (
            <div className="col-12" key={placeholder}>
              <div className="input-group input-group-lg">
                <span className="input-group-text">🇮🇳</span>
                <input className="form-control" type={type} placeholder={placeholder} />
              </div>
            </div>
          );
        }

        if (index === 4 && !compact) {
          return (
            <div className="col-12" key={placeholder}>
              <div className="input-group input-group-lg">
                <span className="input-group-text">🇮🇳</span>
                <input className="form-control" type={type} placeholder={placeholder} />
              </div>
            </div>
          );
        }

        return (
          <div className="col-12" key={placeholder}>
            <input className="form-control form-control-lg" type={type} placeholder={placeholder} />
          </div>
        );
      })}
      <div className="col-12">
        <label className="form-label fw-semibold mb-1">Captcha *</label>
        <div className="captcha-line mb-2">{captchaParts[0]} + {captchaParts[1]} =</div>
        <input className="form-control form-control-lg" name="captcha" type="text" placeholder="Answer" />
      </div>
      <div className="col-12">
        <button type="submit" className="btn btn-warning btn-lg w-100 fw-semibold text-uppercase">
          Submit
        </button>
      </div>
      {message ? <div className="col-12 text-center fw-semibold text-success">{message}</div> : null}
    </form>
  );
}

function AuthShell({
  kicker,
  title,
  subtitle,
  stats,
  actionLabel,
  actionHref,
  actionText,
  rightTitle,
  rightText,
  highlight,
  chips,
  children,
}) {
  return (
    <main className="auth-wrapper">
      <div className="auth-card">
        <div className="auth-left">
          <div className="auth-topbar">
            <div className="auth-brand">DM Holidays</div>
            <Link className="auth-link-muted" to="/">
              Back to home
            </Link>
          </div>
          <div className="auth-kicker">{kicker}</div>
          <h1 className="auth-title">{title}</h1>
          <p className="auth-subtitle">{subtitle}</p>

          <div className="auth-stats">
            {stats.map((stat) => (
              <div className="auth-stat" key={stat.label}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>

          {children}
        </div>

        <div className="auth-right">
          <div className="auth-illustration">
            <h2>{rightTitle}</h2>
            <p>{rightText}</p>
            <div className="auth-highlight">{highlight}</div>
            <div className="auth-chip-row">
              {chips.map((chip) => (
                <span className="auth-chip" key={chip}>
                  {chip}
                </span>
              ))}
            </div>
            <div className="d-flex flex-wrap gap-3 mt-4">
              <Link className="btn auth-btn auth-btn-primary" to={actionHref}>
                {actionLabel}
              </Link>
              <span className="align-self-center auth-link">{actionText}</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export function HomePage() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const applyHash = () => {
      setActiveSlide(window.location.hash === '#north' ? 1 : 0);
      document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' });
    };

    applyHash();
    window.addEventListener('hashchange', applyHash);
    return () => window.removeEventListener('hashchange', applyHash);
  }, []);

  const goHash = (hash) => {
    window.location.hash = hash;
  };

  return (
    <>
      <SiteNavbar />
      <main>
        <section id="home" className="hero-section">
          <HeroCarousel
            slides={[
              { image: assets.heroTiger, alt: 'Tiger safari' },
              { image: assets.heroMan, alt: 'Travel guide' },
            ]}
            activeIndex={activeSlide}
            onChange={setActiveSlide}
          />
          <div className="container py-4 text-center">
            <div className="d-flex gap-3 justify-content-center flex-wrap">
              <button className="btn btn-warning fw-semibold" type="button" onClick={() => goHash('south')}>
                South India slide
              </button>
              <button className="btn btn-outline-dark fw-semibold" type="button" onClick={() => goHash('north')}>
                North India slide
              </button>
            </div>
          </div>
        </section>

        <section className="container py-5">
          <div className="row g-4 text-center">
            {homeStats.map((stat) => (
              <div className="col-12 col-lg-4" key={stat.label}>
                <div className="info-card h-100 p-4">
                  <h2>{stat.title}</h2>
                  <p className="title">{stat.label}</p>
                  <p className="mb-0 text-muted">{stat.text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="container pb-5">
          <div className="d-flex align-items-end justify-content-between flex-wrap gap-2 mb-4">
            <h3 className="section-heading mb-0">Popular Packages</h3>
            <span className="text-muted">Minimal, clean, and easy to browse</span>
          </div>
          <div className="row g-4">
            <div className="col-12 col-md-6">
              <img src={assets.popularOne} className="img-fluid package-image" alt="Popular package 1" />
            </div>
            <div className="col-12 col-md-6">
              <img src={assets.popularTwo} className="img-fluid package-image" alt="Popular package 2" />
            </div>
          </div>
        </section>

        <section className="container pb-5">
          <div className="row g-4">
            <div className="col-12 col-md-6">
              <div className="info-card h-100 p-4">
                <h2 className="mb-2">Group Tours</h2>
                <p className="mb-0 text-muted">
                  Plan coordinated group trips with practical scheduling, good support, and easy booking.
                </p>
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="info-card h-100 p-4">
                <h2 className="mb-2">Packages</h2>
                <p className="mb-0 text-muted">
                  Explore North India and South India routes using the new React pages and dynamic package details.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="booking-section py-5">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-12 col-lg-7 col-xl-6">
                <div className="booking-card p-4 p-md-5">
                  <h3 className="text-center mb-4">Book Your Dream Vacay Today!</h3>
                  <BookingForm compact />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

export function AboutPage() {
  return (
    <>
      <SiteNavbar />
      <main>
        <section id="story" className="about-section container">
          <h1 className="about-title">Our Story</h1>
          <p className="about-copy text-center">
            DM Holidays is an ISO-certified travel company built to make planning simple, clear, and dependable. We
            focus on thoughtful itineraries, transparent support, and meaningful travel experiences for families,
            groups, and business travelers across India and beyond.
          </p>
          <div className="row g-4 mt-4">
            <div className="col-12 col-md-6">
              <img src={assets.popularOne} className="about-image" alt="Travel experience" />
            </div>
            <div className="col-12 col-md-6">
              <img src={assets.popularTwo} className="about-image" alt="Travel planning" />
            </div>
          </div>
        </section>

        <section id="our-mission" className="about-section container pt-0">
          <div className="row g-5">
            <div className="col-12 col-lg-6">
              <h2 className="about-heading">Our Mission</h2>
              <p className="about-text">
                Our mission is to create reliable travel solutions with personalized care, clear communication, and
                complete support at every stage of the journey.
              </p>
            </div>
            <div className="col-12 col-lg-6">
              <h2 className="about-heading">Our Vision</h2>
              <p className="about-text">
                Our vision is to be a trusted travel partner known for quality service, customer-focused planning, and
                exceptional travel experiences that people return to again and again.
              </p>
            </div>
          </div>
        </section>

        <section className="container about-section pt-0">
          <div className="row g-4">
            <div className="col-6 col-lg-3"><div className="about-stat"><div className="stat-value">1000+</div><div className="stat-label">Partners</div></div></div>
            <div className="col-6 col-lg-3"><div className="about-stat"><div className="stat-value">2k+</div><div className="stat-label">Properties</div></div></div>
            <div className="col-6 col-lg-3"><div className="about-stat"><div className="stat-value">300k+</div><div className="stat-label">Destinations</div></div></div>
            <div className="col-6 col-lg-3"><div className="about-stat"><div className="stat-value">40k+</div><div className="stat-label">Bookings</div></div></div>
          </div>
        </section>

        <section id="ceo" className="about-section container pt-0 pb-5">
          <h2 className="about-heading text-center">DM Holidays</h2>
          <p className="about-note text-center">
            DM Holidays continues to grow with a simple promise: deliver honest guidance, dependable travel support,
            and smooth planning for every customer.
          </p>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

export function BlogPage() {
  useBodyClass('blog-page');

  return (
    <>
      <SiteNavbar />
      <main>
        <section className="blog-hero">
          <div className="container blog-hero-inner">
            <div className="blog-hero-copy">
              <p className="blog-kicker mb-2">Travel journal</p>
              <h1 className="blog-hero-title mb-3">Beautiful India blogs with calm, minimal styling</h1>
              <p className="blog-hero-text mb-0">
                A clean travel blog for North India and South India, inspired by minimalist layouts and premium
                photography.
              </p>
            </div>
            <div className="blog-hero-note">
              <div className="blog-note-card">
                <h2>10 curated stories</h2>
                <p className="mb-0">
                  Each card opens to a richer read-more page with a larger image, smooth spacing, and a professional
                  article layout.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="container py-5">
          <div className="row g-4">
            {blogPosts.map((post) => (
              <div className="col-12 col-md-6" key={post.slug}>
                <article className="blog-card h-100">
                  <Link className="blog-card-media" to={`/blog/${post.slug}`}>
                    <img src={post.thumbImage} alt={post.title} />
                    <span className="blog-source-badge">{post.sourceName}</span>
                  </Link>
                  <div className="blog-card-body">
                    <p className="blog-category mb-2">
                      {post.category} · {post.location}
                    </p>
                    <h2 className="blog-card-title">{post.title}</h2>
                    <p className="blog-card-text">{post.excerpt}</p>
                    <div className="d-flex align-items-center justify-content-between gap-3 flex-wrap">
                      <span className="blog-meta">{post.readTime}</span>
                      <Link className="btn btn-warning blog-read-more" to={`/blog/${post.slug}`}>
                        Read More
                      </Link>
                    </div>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter fullBleed />
    </>
  );
}

export function BlogPostPage() {
  useBodyClass('blog-page', 'blog-post-page');
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const post = getBlogPost(slug ?? searchParams.get('slug') ?? 'agra-taj-mahal-sunrise');

  const relatedNorth = blogPosts.filter((item) => item.category === 'North India' && item.slug !== post.slug).slice(0, 4);
  const relatedSouth = blogPosts.filter((item) => item.category === 'South India' && item.slug !== post.slug).slice(0, 4);

  useEffect(() => {
    document.title = `${post.title} - DM Holidays`;
  }, [post.title]);

  return (
    <>
      <SiteNavbar />
      <main>
        <section className="blog-detail-hero">
          <img src={post.heroImage} alt={post.title} />
          <div className="blog-detail-hero-overlay">
            <div className="container">
              <p className="blog-category mb-2">{post.category} · {post.location}</p>
              <h1 className="blog-detail-title mb-3">{post.title}</h1>
              <p className="blog-detail-excerpt mb-0">{post.excerpt}</p>
            </div>
          </div>
        </section>

        <section className="container py-5">
          <div className="row g-4 align-items-start">
            <div className="col-12 col-lg-8">
              <article className="blog-article">
                <div className="d-flex flex-wrap align-items-center gap-3 mb-4">
                  <span className="blog-meta">{post.readTime}</span>
                  <a className="source-chip" href={post.sourceLink} target="_blank" rel="noreferrer">
                    {post.sourceName}
                  </a>
                </div>
                <div className="blog-body">
                  {post.summary.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
                <footer className="blog-article-footer mt-4">
                  <div>
                    <span className="blog-meta d-block mb-1">Featured travel story</span>
                    <Link to="/blog" className="source-chip">
                      Back to blog
                    </Link>
                  </div>
                  <a className="source-chip" href={post.sourceLink} target="_blank" rel="noreferrer">
                    View photo source
                  </a>
                </footer>
                <div className="blog-highlight-box mt-5">
                  <h2 className="blog-section-heading">Quick travel notes</h2>
                  <ul className="blog-highlight-list mb-0">
                    {post.highlights.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </article>
            </div>
            <div className="col-12 col-lg-4">
              <aside className="blog-sidebar sticky-top">
                <div className="blog-widget">
                  <h3 className="widget-title">More North India</h3>
                  <div className="related-list">
                    {relatedNorth.map((item) => (
                      <Link className="related-item" to={`/blog/${item.slug}`} key={item.slug}>
                        <img src={item.thumbImage} alt={item.title} />
                        <div>
                          <strong>{item.location}</strong>
                          <span>{item.title}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
                <div className="blog-widget mt-4">
                  <h3 className="widget-title">More South India</h3>
                  <div className="related-list">
                    {relatedSouth.map((item) => (
                      <Link className="related-item" to={`/blog/${item.slug}`} key={item.slug}>
                        <img src={item.thumbImage} alt={item.title} />
                        <div>
                          <strong>{item.location}</strong>
                          <span>{item.title}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>
      </main>

      <section className="blog-page-footer py-5">
        <div className="container">
          <div className="row g-4 align-items-center">
            <div className="col-12 col-lg-6">
              <h2 className="blog-footer-title mb-2">More stories, more places, more ideas</h2>
              <p className="blog-footer-text mb-0">
                Use the quick links to move between regions, or return to the blog list for the full set of travel
                stories.
              </p>
            </div>
            <div className="col-12 col-lg-6">
              <div className="blog-footer-links">
                <Link to="/blog" className="source-chip">Back to blog</Link>
                <Link to="/north-india" className="source-chip">North India</Link>
                <Link to="/south-india" className="source-chip">South India</Link>
                <Link to="/faqs" className="source-chip">FAQs</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter fullBleed />
    </>
  );
}

function RegionPage({ regionKey, variant }) {
  const page = regionPages[regionKey];
  const packages = page.packages;

  return (
    <>
      <SiteNavbar />
      <main className="py-5">
        <div className="container">
          <div className="d-none d-md-block">
            <ul className="list-unstyled d-flex gap-4 mb-3 city-links" style={{ paddingLeft: 0 }}>
              <li>
                <Link className={`btn btn-sm px-3 py-2 ${variant === 'north' ? 'active' : ''}`} to="/north-india">
                  North India
                </Link>
              </li>
              <li>
                <Link className={`btn btn-sm px-3 py-2 ${variant === 'south' ? 'active' : ''}`} to="/south-india">
                  South India
                </Link>
              </li>
            </ul>
          </div>

          <nav aria-label="breadcrumb">
            <ol className="breadcrumb small mb-3">
              <li className="breadcrumb-item">
                <Link to="/">Home</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                {page.title.replace(' Tour Packages', '')}
              </li>
            </ol>
          </nav>

          <div className="row">
            <div className="col-lg-8">
              <h1 className="mb-3">{page.title}</h1>
              <img src={page.heroImage} alt={page.title} className="img-fluid rounded mb-3" style={{ width: '100%', height: 420, objectFit: 'cover' }} />
              <p className="text-muted">{page.intro}</p>

              <div className="row g-3 my-4">
                {page.facts.map((fact) => (
                  <div className="col-12 col-md-4" key={fact.label}>
                    <div className="fact-badge h-100">
                      <strong>{fact.value}</strong>
                      <span>{fact.label}</span>
                    </div>
                  </div>
                ))}
              </div>

              <section id="packages" className="mt-5">
                <h3>{page.title}</h3>
                <div className="row g-4 mt-3">
                  {packages.map((pkg) => (
                    <div className="col-md-4" key={pkg.slug}>
                      <article className="card h-100">
                        <Link to={`/packages/${pkg.slug}`}>
                          <img src={pkg.heroImage} className="card-img-top" alt={pkg.title} style={{ height: 200, objectFit: 'cover' }} />
                        </Link>
                        <div className="card-body">
                          <small className="text-muted">📍 {pkg.location}</small>
                          <h5 className="card-title mt-2">
                            <Link to={`/packages/${pkg.slug}`} className="text-decoration-none text-dark">
                              {pkg.title}
                            </Link>
                          </h5>
                          <p className="mb-0 small">🕐 <span style={{ color: '#f6c200' }}>{pkg.duration}</span></p>
                        </div>
                      </article>
                    </div>
                  ))}
                </div>
              </section>

              <section className="mt-5">
                <h3>Travel Tips</h3>
                <div className="row g-4 mt-3">
                  {(variant === 'north' ? northHighlights : southHighlights).slice(0, 3).map((tip, index) => (
                    <div className="col-md-4 text-center" key={tip}>
                      <div
                        style={{
                          width: 100,
                          height: 100,
                          borderRadius: '50%',
                          background: '#f6c200',
                          margin: '0 auto',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: '0 8px 30px rgba(0,0,0,0.08)',
                        }}
                      >
                        <span style={{ fontSize: 28 }}>{['📄', '🌡️', '🚆'][index]}</span>
                      </div>
                      <div className="card mt-3 p-3">
                        <h5>{tip.split(' — ')[0]}</h5>
                        <p className="mb-0 text-muted">{tip.split(' — ')[1]}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            <aside className="col-lg-4">
              <div className="d-flex flex-column gap-3">
                <div className="text-end">
                  <Link className="btn btn-warning mb-2" to="/booking">
                    Book Now
                  </Link>
                </div>
                <div className="p-4 bg-light rounded">
                  <h5 className="mb-3">{variant === 'north' ? 'North India Quick Facts' : 'South India Quick Facts'}</h5>
                  <div className="row">
                    {page.facts.map((fact) => (
                      <div className="col-6" key={fact.label}>
                        <p className="mb-1">
                          <strong>{fact.label}</strong>
                          <br />
                          <small className="text-muted">{fact.value}</small>
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}

export function NorthIndiaPage() {
  return <RegionPage regionKey="north" variant="north" />;
}

export function SouthIndiaPage() {
  return <RegionPage regionKey="south" variant="south" />;
}

export function BookingPage() {
  return (
    <>
      <SiteNavbar />
      <main>
        <section className="booking-section py-5">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-12 col-xl-10">
                <div className="booking-card p-4 p-lg-5">
                  <div className="row g-4 align-items-start">
                    <div className="col-12 col-lg-5">
                      <p className="text-uppercase fw-semibold text-muted mb-2">Plan your trip</p>
                      <h1 className="booking-page-title mb-3">Book Your Packages</h1>
                      <p className="text-muted mb-4">Simple, professional travel planning with trusted service and quick support.</p>
                      <div className="rating-row d-flex align-items-center gap-3 flex-wrap">
                        <span className="rating-score">4.8/5</span>
                        <span className="rating-stars">★★★★★</span>
                        <span className="rating-copy">Based on 12,450 traveler reviews</span>
                      </div>
                      <div className="booking-highlights mt-4">
                        <div className="mb-2"><strong>✔</strong> Custom itineraries</div>
                        <div className="mb-2"><strong>✔</strong> Friendly travel support</div>
                        <div className="mb-2"><strong>✔</strong> Trusted across India</div>
                      </div>
                    </div>
                    <div className="col-12 col-lg-7">
                      <section id="contact" className="booking-form-wrap">
                        <BookingForm />
                      </section>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

export function ContactPage() {
  useBodyClass('locations-page');
  const location = useLocation();
  const [cityKey, setCityKey] = useState('Mumbai');
  const keys = Object.keys(contactCities);
  const emptyContact = { name: '', phone: '', email: '', area: '', date: '', tripType: '', travelers: '', message: '' };
  const [contactForm, setContactForm] = useState(emptyContact);
  const [contactErrors, setContactErrors] = useState({});
  const [contactSubmitted, setContactSubmitted] = useState(false);

  const updateContact = (field) => (e) => {
    const updated = { ...contactForm, [field]: e.target.value };
    setContactForm(updated);
    localStorage.setItem('dmh_contact_draft', JSON.stringify({ ...updated, city: cityKey }));
    sessionStorage.setItem('dmh_contact_draft', JSON.stringify({ ...updated, city: cityKey }));
  };

  const submitContact = (e) => {
    e.preventDefault();
    const errs = {};
    if (!contactForm.name.trim()) errs.name = 'Please enter your name.';
    if (!phoneRegex.test(contactForm.phone)) errs.phone = 'Enter a valid phone number.';
    if (!emailRegex.test(contactForm.email)) errs.email = 'Enter a valid email address.';
    setContactErrors(errs);
    if (Object.keys(errs).length) return;

    const entry = { ...contactForm, city: cityKey, submittedAt: new Date().toISOString() };
    const existing = JSON.parse(localStorage.getItem('dmh_contact_messages') || '[]');
    localStorage.setItem('dmh_contact_messages', JSON.stringify([...existing, entry]));
    sessionStorage.setItem('dmh_last_contact', JSON.stringify(entry));
    localStorage.removeItem('dmh_contact_draft');
    sessionStorage.removeItem('dmh_contact_draft');
    setContactSubmitted(true);
    setContactForm(emptyContact);
  };

  useEffect(() => {
    const sync = () => {
      const hash = decodeURIComponent(window.location.hash.replace('#', ''));
      const nextCity = keys.find((item) => item.toLowerCase() === hash.toLowerCase()) ?? 'Mumbai';
      setCityKey(nextCity);
    };

    if (!window.location.hash) {
      window.location.hash = 'Mumbai';
    }

    sync();
    window.addEventListener('hashchange', sync);
    return () => window.removeEventListener('hashchange', sync);
  }, []);

  const city = contactCities[cityKey] ?? contactCities.Mumbai;

  return (
    <>
      <SiteNavbar variant="locations" />
      <main className="py-3 locations-shell locations-screen">
        <div className="container-fluid px-0">
          <div className="locations-row d-flex align-items-center gap-3 flex-nowrap">
            <ul className="nav locations-inline flex-nowrap">
              {keys.map((key) => (
                <li className="nav-item" key={key}>
                  <button
                    type="button"
                    className={`nav-link ${cityKey === key ? 'is-active' : ''}`}
                    onClick={() => {
                      window.location.hash = key;
                      setCityKey(key);
                    }}
                  >
                    {key}
                  </button>
                </li>
              ))}
            </ul>

            <Link className="btn btn-warning contact-button contact-corner" to="/booking#contact">
              Contact Us
            </Link>
          </div>

          <div className="location-hero mt-4" aria-live="polite">
            <p className="location-hero-kicker mb-2">Travel Agency in</p>
            <h1 className="location-hero-title mb-0">{cityKey}</h1>
          </div>
        </div>
      </main>

      <section id="city-section" className="mumbai-hero">
        <div className="container">
          <div className="row g-4 align-items-stretch">
            <div className="col-12 col-lg-6">
              <div className="mumbai-map-card h-100">
                <iframe
                  className="mumbai-map-frame"
                  title="Location map"
                  src={`https://www.google.com/maps?q=${encodeURIComponent(city.map)}&output=embed`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            <div className="col-12 col-lg-6">
              <div className="mumbai-visual-card h-100">
                <div className="mumbai-info-panel">
                  <div className="mumbai-info-title">DM Holidays Private Limited</div>
                  <div dangerouslySetInnerHTML={{ __html: city.address }} />
                  <p>{city.phone}</p>
                  <p className="mb-0">{city.email}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container pb-5">
        <div className="row g-5 align-items-start">
          <div className="col-12">
            <h1 className="mumbai-section-title text-center">Why DM Holidays is famous in {cityKey}</h1>
            <p className="mumbai-lead text-center mb-4">{city.lead}</p>
          </div>

          <div className="col-12 col-lg-7">
            <div className="mumbai-copy">
              <p>{city.copy1}</p>
              <p>{city.copy2}</p>
              <ul className="mumbai-reason-list">
                {city.reasons.map((reason) => (
                  <li key={reason}>{reason}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="col-12 col-lg-5">
            <div className="mumbai-form-card">
              <h2 className="mumbai-section-title mb-3">{cityKey} enquiry form</h2>
              <p className="mumbai-copy mb-4">Share your travel details below, and our team will get back with a plan made for your trip.</p>
              {contactSubmitted && (
                <div className="alert alert-success fw-semibold mb-3">✔ Message sent! We'll get back to you soon.</div>
              )}
              <form className="row g-3" onSubmit={submitContact} noValidate>
                <div className="col-12">
                  <input className="form-control form-control-lg" type="text" placeholder="Full name *" value={contactForm.name} onChange={updateContact('name')} />
                  {contactErrors.name && <small className="auth-error">{contactErrors.name}</small>}
                </div>
                <div className="col-12 col-md-6">
                  <input className="form-control form-control-lg" type="tel" placeholder="Mobile number *" value={contactForm.phone} onChange={updateContact('phone')} />
                  {contactErrors.phone && <small className="auth-error">{contactErrors.phone}</small>}
                </div>
                <div className="col-12 col-md-6">
                  <input className="form-control form-control-lg" type="email" placeholder="Email address *" value={contactForm.email} onChange={updateContact('email')} />
                  {contactErrors.email && <small className="auth-error">{contactErrors.email}</small>}
                </div>
                <div className="col-12 col-md-6">
                  <input className="form-control form-control-lg" type="text" placeholder={`${cityKey} area / locality`} value={contactForm.area} onChange={updateContact('area')} />
                </div>
                <div className="col-12 col-md-6">
                  <input className="form-control form-control-lg" type="date" placeholder="Travel date" value={contactForm.date} onChange={updateContact('date')} />
                </div>
                <div className="col-12 col-md-6">
                  <select className="form-select form-select-lg" value={contactForm.tripType} onChange={updateContact('tripType')}>
                    <option value="">Trip type</option>
                    <option>Family Holiday</option>
                    <option>Couple Trip</option>
                    <option>Business Travel</option>
                    <option>Group Tour</option>
                  </select>
                </div>
                <div className="col-12 col-md-6">
                  <input className="form-control form-control-lg" type="number" placeholder="Number of travelers" min="1" value={contactForm.travelers} onChange={updateContact('travelers')} />
                </div>
                <div className="col-12">
                  <textarea className="form-control form-control-lg" rows="4" placeholder={`Tell us what you are looking for in ${cityKey}`} value={contactForm.message} onChange={updateContact('message')} />
                </div>
                <div className="col-12">
                  <button type="submit" className="btn btn-warning btn-lg w-100 fw-semibold text-uppercase">
                    Send Enquiry
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter fullBleed />
    </>
  );
}

export function FaqsPage() {
  useBodyClass('faq-page');
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <>
      <SiteNavbar />
      <main>
        <section id="mission" className="faq-hero-section">
          <div className="faq-hero">
            <div className="container">
              <h1 className="faq-title">FAQs</h1>
            </div>
          </div>
          <div className="container py-5">
            <nav aria-label="breadcrumb" className="mb-4">
              <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                <li className="breadcrumb-item active" aria-current="page">FAQs</li>
              </ol>
            </nav>
            <div className="row">
              <div className="col-12 col-lg-10">
                <div className="accordion faq-accordion" id="faqAccordion">
                  {faqItems.map((item, index) => (
                    <div className="accordion-item" key={item.question}>
                      <h2 className="accordion-header">
                        <button
                          className={`accordion-button ${openIndex === index ? '' : 'collapsed'}`}
                          type="button"
                          onClick={() => setOpenIndex((current) => (current === index ? -1 : index))}
                        >
                          {item.question}
                        </button>
                      </h2>
                      <div className={`accordion-collapse collapse ${openIndex === index ? 'show' : ''}`}>
                        <div className="accordion-body">{item.answer}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

export function DestinationPage() {
  const { slug } = useParams();
  const destination = destinationDetails[slug] ?? destinationDetails.agra;

  return (
    <>
      <SiteNavbar />
      <main className="py-5">
        <div className="container">
          <nav aria-label="breadcrumb" className="mb-3">
            <ol className="breadcrumb small">
              <li className="breadcrumb-item"><Link to="/">Home</Link></li>
              <li className="breadcrumb-item"><Link to={destination.region === 'North India' ? '/north-india' : '/south-india'}>{destination.region}</Link></li>
              <li className="breadcrumb-item active" aria-current="page">{destination.title}</li>
            </ol>
          </nav>
          <div className="row g-4 align-items-start">
            <div className="col-lg-8">
              <h1 className="mb-1" style={{ fontFamily: 'Georgia,serif' }}>{destination.title}</h1>
              <p className="text-muted mb-3">{destination.region}</p>
              <img src={destination.heroImage} alt={destination.title} className="img-fluid rounded mb-3" style={{ width: '100%', height: 420, objectFit: 'cover' }} />
              <p className="text-muted">{destination.intro}</p>
              <div className="row g-3 mt-3">
                {destination.facts.map((fact) => (
                  <div className="col-12 col-md-4" key={fact}>
                    <div className="fact-badge h-100">
                      <strong>{fact.split(' — ')[0] ?? fact}</strong>
                      <span>{fact.split(' — ')[1] ?? 'Travel highlight'}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <aside className="col-lg-4">
              <div className="stay-card sticky-top" style={{ top: 80 }}>
                <h4>Plan this trip</h4>
                <p className="text-muted">
                  Use this route as a starting point and switch to the booking page when you’re ready to customize the
                  trip.
                </p>
                <Link className="btn btn-warning w-100 fw-bold" to="/booking">
                  Enquire Now
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}

export function PackagePage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const pkg = packageDetails[slug] ?? packageDetails['pkg-gulmarg-snow'];
  const [captchaParts] = useState(() => [Math.floor(Math.random() * 9) + 1, Math.floor(Math.random() * 9) + 1]);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const answer = Number(event.currentTarget.elements.captcha?.value);
    if (answer !== captchaParts[0] + captchaParts[1]) {
      window.alert('Captcha incorrect.');
      return;
    }

    setSubmitted(true);
    event.currentTarget.reset();
  };

  return (
    <>
      <SiteNavbar />
      <main className="py-4">
        <div className="container">
          <nav className="pkg-breadcrumb small mb-3">
            <Link to="/">Home</Link><span className="sep">›</span>
            <Link to={pkg.slug.startsWith('pkg-') ? (pkg.slug.includes('kerala') || pkg.slug.includes('coorg') || pkg.slug.includes('bangalore') || pkg.slug.includes('chennai') || pkg.slug.includes('araku') ? '/south-india' : '/north-india') : '/north-india'}>Packages</Link><span className="sep">›</span>
            <span>{pkg.title}</span>
          </nav>
          <div className="row g-4">
            <div className="col-lg-8">
              <h1 className="mb-1" style={{ fontFamily: 'Georgia,serif' }}>{pkg.title}</h1>
              <p className="text-muted mb-3">📍 {pkg.location}</p>
              <div className="pkg-meta-bar">
                <div className="row g-3">
                  {pkg.facts.map((fact) => (
                    <div className="col-6 col-md-3" key={fact.label}>
                      <div className="pkg-meta-item">
                        <span className="pkg-meta-icon">🕐</span>
                        <div>
                          <div className="pkg-meta-label">{fact.label}</div>
                          <div className="pkg-meta-val">{fact.value}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <PackageGallery images={pkg.gallery} alt={pkg.title} />

              <section className="mt-4">
                <h4 style={{ fontFamily: 'Georgia,serif' }}>Package Overview</h4>
                {pkg.overview.map((paragraph) => (
                  <p key={paragraph} className="text-muted">
                    {paragraph}
                  </p>
                ))}
              </section>

              <section className="mt-4">
                <h4 style={{ fontFamily: 'Georgia,serif' }}>Day-by-Day Itinerary</h4>
                <div className="mt-3">
                  {pkg.itinerary.map((day) => (
                    <div className="itinerary-day" key={day.title}>
                      <h6>{day.day} — {day.title}</h6>
                      <p className="text-muted mb-0">{day.description}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="mt-4">
                <div className="row g-3">
                  <div className="col-md-6">
                    <h5 style={{ color: '#1a7a4a' }}>✔ Inclusions</h5>
                    <ul className="text-muted small">
                      {pkg.inclusions.map((item) => <li key={item}>{item}</li>)}
                    </ul>
                  </div>
                  <div className="col-md-6">
                    <h5 style={{ color: '#c0392b' }}>✘ Exclusions</h5>
                    <ul className="text-muted small">
                      {pkg.exclusions.map((item) => <li key={item}>{item}</li>)}
                    </ul>
                  </div>
                </div>
              </section>

              <section className="mt-4 p-3" style={{ background: '#fffdf4', borderLeft: '4px solid #f6c200', borderRadius: 4 }}>
                <h5>Quick notes</h5>
                <ul className="text-muted small mb-0">
                  {pkg.faq.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </section>
            </div>
            <aside className="col-lg-4">
              <div className="stay-card sticky-top" style={{ top: 80 }}>
                <h4>Stay Connected</h4>
                <p className="mb-1"><strong>📞</strong> +91 9940882200</p>
                <p className="mb-3"><strong>✉️</strong> mail@dmholidays.in</p>
                <h5 className="mb-3">Enquiry Form</h5>
                <form className="enquiry-form" onSubmit={handleSubmit}>
                  <div className="mb-2"><input type="text" className="form-control" placeholder="Name *" required /></div>
                  <div className="mb-2"><input type="text" className="form-control" placeholder="City of Residence *" required /></div>
                  <div className="mb-2"><input type="email" className="form-control" placeholder="Email *" required /></div>
                  <div className="mb-2"><div className="input-group"><span className="input-group-text" style={{ borderRadius: 0, borderColor: '#d9d9d9' }}>🇮🇳 +91</span><input type="tel" className="form-control" placeholder="Phone Number *" required /></div></div>
                  <div className="mb-2"><div className="input-group"><span className="input-group-text" style={{ borderRadius: 0, borderColor: '#d9d9d9' }}>🇮🇳 +91</span><input type="tel" className="form-control" placeholder="WhatsApp" /></div></div>
                  <div className="mb-2"><input type="text" className="form-control" value={pkg.title} readOnly /></div>
                  <div className="mb-2"><input type="date" className="form-control" required /></div>
                  <div className="mb-2"><input type="number" className="form-control" placeholder="No. of People *" min="1" required /></div>
                  <div className="mb-2"><input type="text" className="form-control" placeholder="Vacation Type *" /></div>
                  <div className="mb-3">
                    <p className="mb-1 fw-bold small">Captcha *</p>
                    <div className="captcha-box mb-2" id="captchaQ">{captchaParts[0]} + {captchaParts[1]} = ?</div>
                    <input type="text" className="form-control" name="captcha" placeholder="Your answer" required />
                  </div>
                  <button type="submit" className="btn btn-warning w-100 fw-bold">SEND ENQUIRY</button>
                  {submitted ? <div className="mt-2 text-success fw-bold">✔ Enquiry sent! We'll contact you soon.</div> : null}
                </form>
              </div>
            </aside>
          </div>
        </div>
        <div className="mt-5"><SiteFooter fullBleed /></div>
      </main>
    </>
  );
}

export function EnquiryPage() {
  useBodyClass('auth-page');
  const [form, setForm] = useState({ name: '', email: '', phone: '', destination: '', date: '', people: '', message: '' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const update = (field) => (e) => {
    const updated = { ...form, [field]: e.target.value };
    setForm(updated);
    localStorage.setItem('dmh_enquiry_draft', JSON.stringify(updated));
    sessionStorage.setItem('dmh_enquiry_draft', JSON.stringify(updated));
  };

  const submit = (e) => {
    e.preventDefault();
    const nextErrors = {};
    if (!form.name.trim()) nextErrors.name = 'Please enter your name.';
    if (!emailRegex.test(form.email)) nextErrors.email = 'Enter a valid email address.';
    if (!phoneRegex.test(form.phone)) nextErrors.phone = 'Enter a valid phone number.';
    if (!form.destination.trim()) nextErrors.destination = 'Please enter a destination.';
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    const enquiry = { ...form, submittedAt: new Date().toISOString() };
    const existing = JSON.parse(localStorage.getItem('dmh_enquiries') || '[]');
    localStorage.setItem('dmh_enquiries', JSON.stringify([...existing, enquiry]));
    sessionStorage.setItem('dmh_last_enquiry', JSON.stringify(enquiry));
    localStorage.removeItem('dmh_enquiry_draft');
    sessionStorage.removeItem('dmh_enquiry_draft');
    setSubmitted(true);
    setForm({ name: '', email: '', phone: '', destination: '', date: '', people: '', message: '' });
  };

  return (
    <>
      <SiteNavbar />
      <main className="booking-section py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-xl-8">
              <div className="booking-card p-4 p-lg-5">
                <p className="text-uppercase fw-semibold text-muted mb-2">Get in touch</p>
                <h1 className="booking-page-title mb-3">Send an Enquiry</h1>
                <p className="text-muted mb-4">Fill in the details below and our team will get back to you with a tailored travel plan.</p>
                {submitted && (
                  <div className="alert alert-success fw-semibold">
                    ✔ Enquiry submitted! We'll contact you soon.
                  </div>
                )}
                <form className="row g-3" onSubmit={submit} noValidate>
                  <div className="col-12 col-md-6">
                    <input className="form-control form-control-lg" type="text" placeholder="Full Name *" value={form.name} onChange={update('name')} />
                    {errors.name && <small className="auth-error">{errors.name}</small>}
                  </div>
                  <div className="col-12 col-md-6">
                    <input className="form-control form-control-lg" type="email" placeholder="Email Address *" value={form.email} onChange={update('email')} />
                    {errors.email && <small className="auth-error">{errors.email}</small>}
                  </div>
                  <div className="col-12 col-md-6">
                    <input className="form-control form-control-lg" type="tel" placeholder="Phone Number *" value={form.phone} onChange={update('phone')} />
                    {errors.phone && <small className="auth-error">{errors.phone}</small>}
                  </div>
                  <div className="col-12 col-md-6">
                    <input className="form-control form-control-lg" type="text" placeholder="Travel Destination *" value={form.destination} onChange={update('destination')} />
                    {errors.destination && <small className="auth-error">{errors.destination}</small>}
                  </div>
                  <div className="col-12 col-md-6">
                    <input className="form-control form-control-lg" type="date" placeholder="Date of Travel" value={form.date} onChange={update('date')} />
                  </div>
                  <div className="col-12 col-md-6">
                    <input className="form-control form-control-lg" type="number" placeholder="No. of Travelers" min="1" value={form.people} onChange={update('people')} />
                  </div>
                  <div className="col-12">
                    <textarea className="form-control form-control-lg" rows="4" placeholder="Tell us more about your trip..." value={form.message} onChange={update('message')} />
                  </div>
                  <div className="col-12">
                    <button type="submit" className="btn btn-warning btn-lg w-100 fw-semibold text-uppercase">
                      Submit Enquiry
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}

export function LoginPage() {
  useBodyClass('auth-page');
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '', remember: true });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');

  const submit = (event) => {
    event.preventDefault();
    const nextErrors = {};

    if (!emailRegex.test(form.email)) nextErrors.email = 'Enter a valid email address.';
    if (!passwordRegex.test(form.password)) nextErrors.password = 'Password must be 8+ chars with letters and numbers.';
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length) return;

    const stored = localStorage.getItem('dmh_user') || sessionStorage.getItem('dmh_user');
    if (!stored) {
      setMessage('No account found. Please sign up first.');
      return;
    }

    const user = JSON.parse(stored);
    if (user.email !== form.email || user.password !== form.password) {
      setMessage('Email or password is incorrect.');
      return;
    }

    const payload = JSON.stringify(user);
    localStorage.setItem('dmh_logged_in', 'true');
    sessionStorage.setItem('dmh_logged_in', 'true');
    if (form.remember) localStorage.setItem('dmh_user', payload);
    else sessionStorage.setItem('dmh_user', payload);
    setMessage('Login successful! Welcome back.');
    navigate('/');
  };

  return (
    <AuthShell
      kicker="Member Access"
      title="Sign in to plan your next getaway"
      subtitle="Manage bookings, save favorites, and unlock curated itineraries built by our travel experts."
      stats={[
        { value: '50K+', label: 'Happy travelers' },
        { value: '24/7', label: 'Trip support' },
      ]}
      actionLabel="Create account"
      actionHref="/signup"
      actionText="Need a new account?"
      rightTitle="Luxury trips made effortless."
      rightText="Browse handpicked stays, premium tours, and custom routes curated for your travel style."
      highlight="Trusted by 50,000+ happy explorers."
      chips={['Verified guides', 'Best price', 'Instant support']}
    >
      <form className="auth-form" onSubmit={submit} noValidate>
        <label className="form-label" htmlFor="loginEmail">Email Address</label>
        <input className="form-control auth-input" type="email" id="loginEmail" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@dmholidays.com" autoComplete="email" />
        <small className="auth-error">{errors.email ?? ''}</small>

        <label className="form-label mt-3" htmlFor="loginPassword">Password</label>
        <input className="form-control auth-input" type="password" id="loginPassword" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="Minimum 8 characters" autoComplete="current-password" />
        <small className="auth-error">{errors.password ?? ''}</small>

        <div className="d-flex align-items-center justify-content-between auth-meta">
          <label className="form-check">
            <input className="form-check-input" type="checkbox" checked={form.remember} onChange={(e) => setForm({ ...form, remember: e.target.checked })} />
            <span className="form-check-label">Remember me</span>
          </label>
          <a className="auth-link" href="#">Forgot password?</a>
        </div>

        <div className="d-flex flex-wrap gap-3 mt-4">
          <button type="submit" className="btn auth-btn auth-btn-primary">Login</button>
          <Link className="btn auth-btn auth-btn-outline" to="/signup">Create account</Link>
        </div>

        <div className={`auth-message ${message ? 'auth-success' : ''}`}>{message}</div>
        <div className="auth-divider">Or continue with</div>
        <div className="auth-social">
          <a className="auth-link" href="#">Facebook</a>
          <a className="auth-link" href="#">LinkedIn</a>
          <a className="auth-link" href="#">Google</a>
        </div>
      </form>
    </AuthShell>
  );
}

export function SignupPage() {
  useBodyClass('auth-page');
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirm: '' });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');

  const submit = (event) => {
    event.preventDefault();
    const nextErrors = {};

    if (!form.name.trim()) nextErrors.name = 'Please enter your full name.';
    if (!emailRegex.test(form.email)) nextErrors.email = 'Enter a valid email address.';
    if (!phoneRegex.test(form.phone)) nextErrors.phone = 'Enter a valid phone number.';
    if (!passwordRegex.test(form.password)) nextErrors.password = 'Password must be 8+ chars with letters and numbers.';
    if (form.confirm !== form.password || !form.confirm) nextErrors.confirm = 'Passwords do not match.';
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length) return;

    const user = {
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      password: form.password,
    };

    const payload = JSON.stringify(user);
    localStorage.setItem('dmh_user', payload);
    sessionStorage.setItem('dmh_user', payload);
    setMessage('Account created! You can now log in.');
    navigate('/login');
  };

  return (
    <AuthShell
      kicker="New Member"
      title="Create your DM Holidays account"
      subtitle="Sign up once to build your wishlist, store traveler details, and receive exclusive holiday deals."
      stats={[
        { value: '120+', label: 'Handpicked tours' },
        { value: '4.9★', label: 'Avg. customer rating' },
      ]}
      actionLabel="I already have an account"
      actionHref="/login"
      actionText="Already a traveler?"
      rightTitle="Design the trip you’ll never forget."
      rightText="Get tailored itineraries, curated stays, and priority assistance from the DM Holidays team."
      highlight="Member perks + priority support."
      chips={['Secure booking', 'Custom itineraries', 'Exclusive offers']}
    >
      <form className="auth-form" onSubmit={submit} noValidate>
        <label className="form-label" htmlFor="signupName">Full Name</label>
        <input className="form-control auth-input" type="text" id="signupName" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your full name" autoComplete="name" />
        <small className="auth-error">{errors.name ?? ''}</small>

        <label className="form-label mt-3" htmlFor="signupEmail">Email Address</label>
        <input className="form-control auth-input" type="email" id="signupEmail" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@dmholidays.com" autoComplete="email" />
        <small className="auth-error">{errors.email ?? ''}</small>

        <label className="form-label mt-3" htmlFor="signupPhone">Mobile Number</label>
        <input className="form-control auth-input" type="tel" id="signupPhone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="Mobile number" autoComplete="tel" />
        <small className="auth-error">{errors.phone ?? ''}</small>

        <label className="form-label mt-3" htmlFor="signupPassword">Create Password</label>
        <input className="form-control auth-input" type="password" id="signupPassword" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="Minimum 8 characters" autoComplete="new-password" />
        <small className="auth-error">{errors.password ?? ''}</small>

        <label className="form-label mt-3" htmlFor="signupConfirm">Confirm Password</label>
        <input className="form-control auth-input" type="password" id="signupConfirm" value={form.confirm} onChange={(e) => setForm({ ...form, confirm: e.target.value })} placeholder="Repeat password" autoComplete="new-password" />
        <small className="auth-error">{errors.confirm ?? ''}</small>

        <div className="auth-meta">
          By continuing, you agree to our <a className="auth-link" href="#">Terms</a> and <a className="auth-link" href="#">Privacy Policy</a>.
        </div>

        <div className="d-flex flex-wrap gap-3 mt-4">
          <button type="submit" className="btn auth-btn auth-btn-primary">Create account</button>
          <Link className="btn auth-btn auth-btn-outline" to="/login">I already have an account</Link>
        </div>

        <div className={`auth-message ${message ? 'auth-success' : ''}`}>{message}</div>
        <div className="auth-divider">Or sign up with</div>
        <div className="auth-social">
          <a className="auth-link" href="#">Facebook</a>
          <a className="auth-link" href="#">LinkedIn</a>
          <a className="auth-link" href="#">Google</a>
        </div>
      </form>
    </AuthShell>
  );
}

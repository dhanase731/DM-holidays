import { useEffect, useMemo, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';

const companyLinks = [
  { to: '/about', label: 'About' },
  { to: '/faqs', label: 'FAQs' },
  { to: '/blog', label: 'Blog' },
];

const indiaLinks = [
  { to: '/north-india', label: 'North India' },
  { to: '/south-india', label: 'South India' },
];

const contactLinks = [
  { to: '/booking', label: 'Contact Us' },
  { to: '/contact', label: 'Our Locations' },
];

function isActivePath(pathname, paths) {
  return paths.some((path) => pathname === path || pathname.startsWith(`${path}/`));
}

export function useBodyClass(className) {
  useEffect(() => {
    const previous = document.body.className;
    if (className) {
      document.body.className = className;
    } else {
      document.body.removeAttribute('class');
    }

    return () => {
      document.body.className = previous;
    };
  }, [className]);
}

function DropdownMenu({ label, items, active, homeHash }) {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [location.pathname, location.search, location.hash]);

  return (
    <li
      className={`nav-item dropdown hover-dropdown ${open ? 'show' : ''}`}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        className={`nav-link dropdown-toggle btn btn-link p-0 border-0 ${active ? 'active' : ''}`}
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
      >
        {label}
      </button>
      <ul className={`dropdown-menu simple-menu ${open ? 'show' : ''}`}>
        {items.map((item) => (
          <li key={item.to}>
            <Link
              className="dropdown-item"
              to={item.to}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </li>
  );
}

export function SiteNavbar({ variant = 'default' }) {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(true);
  const navClassName = variant === 'locations' ? 'navbar navbar-expand-lg navbar-light sticky-top site-nav locations-nav' : 'navbar navbar-expand-lg navbar-light sticky-top site-nav';
  const indiaActive = isActivePath(location.pathname, ['/north-india', '/south-india', '/agra', '/amritsar', '/chandigarh', '/delhi', '/gulmarg', '/alleppey', '/bangalore', '/chennai', '/coorg', '/araku-valley']);
  const companyActive = isActivePath(location.pathname, ['/about', '/faqs', '/blog']);
  const contactActive = isActivePath(location.pathname, ['/booking', '/contact']);

  const homeLink = useMemo(() => {
    return location.pathname === '/' && (location.hash === '#north' || location.hash === '#south') ? `${location.hash}` : '/';
  }, [location.pathname, location.hash]);

  return (
    <nav className={navClassName}>
      <div className="container">
        <Link className="navbar-brand fw-semibold" to="/">
          DM Holidays
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          aria-label="Toggle navigation"
          aria-expanded={!collapsed}
          onClick={() => setCollapsed((value) => !value)}
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className={`collapse navbar-collapse ${collapsed ? '' : 'show'}`}>
          <ul className="navbar-nav ms-auto gap-lg-2 align-items-lg-center">
            <li className="nav-item">
              <NavLink className="nav-link" to={homeLink} end>
                Home
              </NavLink>
            </li>
            <DropdownMenu label="Company" items={companyLinks} active={companyActive} />
            <DropdownMenu label="India" items={indiaLinks} active={indiaActive} />
            <DropdownMenu label="Contact" items={contactLinks} active={contactActive} />
            <li className="nav-item ms-lg-2">
              <NavLink className="btn nav-cta" to="/login">
                Login
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export function SiteFooter({ fullBleed = false }) {
  return (
    <footer className={`site-footer text-light py-5${fullBleed ? ' full-bleed' : ''}`}>
      <div className="container">
        <div className="row g-4">
          <div className="col-12 col-md-4">
            <h4>Corporate Office</h4>
            <hr />
            <p className="mb-0">
              DM Holidays Pvt LTD,<br />Novel Tech Park,<br />Opposite to 1 MG Mall,<br />MG Road, Bangalore – 560042<br />Karnataka, India.
            </p>
          </div>
          <div className="col-12 col-md-4">
            <h4>Head Office</h4>
            <hr />
            <p className="mb-0">
              DM Holidays Pvt LTD,<br />No.1, Gemini Parsn,<br />Kodambakkam High Road,<br />Nungambakkam, Chennai – 600006<br />Tamil Nadu, India.
            </p>
          </div>
          <div className="col-12 col-md-4" />

          <div className="row g-4 mt-4 pt-4 footer-contact">
            <div className="col-12 col-md-4">
              <small>Call Us</small>
              <h5 className="mb-0">+91 9940882200</h5>
            </div>
            <div className="col-12 col-md-4">
              <small>Email Us</small>
              <h5 className="mb-0">mail@dmholidays.in</h5>
            </div>
            <div className="col-12 col-md-4">
              <small>Follow Us</small>
              <div className="social-row mt-2">
                <span>f</span>
                <span>◎</span>
                <span>in</span>
                <span>▶</span>
                <span>G</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function PageBreadcrumb({ items }) {
  return (
    <nav aria-label="breadcrumb" className="mb-3">
      <ol className="breadcrumb small mb-0">
        {items.map((item, index) => {
          const last = index === items.length - 1;
          return (
            <li
              key={`${item.label}-${index}`}
              className={`breadcrumb-item${last ? ' active' : ''}`}
              aria-current={last ? 'page' : undefined}
            >
              {last ? item.label : <Link to={item.to}>{item.label}</Link>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export function SectionHeading({ title, subtitle }) {
  return (
    <div className="d-flex align-items-end justify-content-between flex-wrap gap-2 mb-4">
      <h3 className="section-heading mb-0">{title}</h3>
      {subtitle ? <span className="text-muted">{subtitle}</span> : null}
    </div>
  );
}

export function PackageGallery({ images, alt }) {
  const [activeImage, setActiveImage] = useState(images?.[0] ?? '');

  useEffect(() => {
    setActiveImage(images?.[0] ?? '');
  }, [images]);

  if (!images?.length) {
    return null;
  }

  return (
    <>
      <img src={activeImage} alt={alt} className="img-fluid rounded mb-3" style={{ width: '100%', height: 420, objectFit: 'cover' }} />
      <div className="d-flex flex-wrap gap-2">
        {images.map((image) => (
          <button
            type="button"
            key={image}
            className={`p-0 border-0 bg-transparent pkg-thumb-button ${activeImage === image ? 'active' : ''}`}
            onClick={() => setActiveImage(image)}
          >
            <img src={image} alt={alt} className="pkg-thumb" />
          </button>
        ))}
      </div>
    </>
  );
}

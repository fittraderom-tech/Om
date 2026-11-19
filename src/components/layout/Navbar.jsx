import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import { useScrolled } from '../../hooks/useScrollDirection';
import { Container } from '../ui/Container';
import { SearchBar } from '../filters/SearchBar';
import { cn } from '../../utils/classNames';
import logo from '../../assets/logo.png';

const NAV_LINKS = [
  { to: '/#home', label: 'Home' },
  { to: '/videos', label: 'Videos' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/#contact', label: 'Contact Us' },
];

export function Navbar({ searchValue, onSearchChange }) {
  const scrolled = useScrolled(24);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  const isActive = (to) => pathname === (to.split('#')[0] || '/');

  return (
    <header className="fixed inset-x-0 top-3 z-40 flex justify-center px-4">
      <div
        className={cn(
          'w-full max-w-3xl rounded-[28px] border border-accent/15 bg-paper/85 backdrop-blur-xl transition-shadow duration-300',
          'dark:bg-transparent dark:bg-gradient-to-b dark:from-[#1c1c1c]/85 dark:to-black/85',
          (scrolled || open) && 'shadow-lg shadow-black/10 dark:shadow-black/40',
        )}
      >
        <Container className="flex items-center justify-between gap-4 py-3">
          <Link to="/#home" className="flex shrink-0 items-center">
            <img src={logo} alt="Omkar Visuals" width={531} height={158} className="h-9 w-auto" />
          </Link>

          <nav className="hidden items-center gap-7 text-xs font-medium md:flex" aria-label="Primary">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                aria-current={isActive(link.to) ? 'page' : undefined}
                className={cn('transition hover:text-accent', isActive(link.to) && 'text-accent')}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <SearchBar value={searchValue} onChange={onSearchChange} expandOnHover className="hidden md:flex" />

          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-full md:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <FiX size={18} /> : <FiMenu size={18} />}
          </button>
        </Container>

        {open && (
          <Container className="flex flex-col gap-4 border-t border-accent/15 py-4 md:hidden">
            <SearchBar value={searchValue} onChange={onSearchChange} />
            <nav className="flex flex-col gap-3 text-sm font-medium" aria-label="Primary mobile">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setOpen(false)}
                  aria-current={isActive(link.to) ? 'page' : undefined}
                  className={cn('hover:text-accent', isActive(link.to) && 'text-accent')}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </Container>
        )}
      </div>
    </header>
  );
}

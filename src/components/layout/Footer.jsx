import { FiInstagram, FiMail } from 'react-icons/fi';
import { Container } from '../ui/Container';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-accent/15 bg-card py-14 dark:bg-card-dark">
      <Container className="flex flex-col items-center gap-6 text-center">
        <p className="font-display text-2xl font-medium tracking-[-0.03em]">Let&rsquo;s tell your story.</p>
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
          <a
            href="mailto:omkarpatil49549@gmail.com"
            className="flex items-center gap-2 transition hover:text-accent"
          >
            <FiMail aria-hidden="true" /> omkarpatil49549@gmail.com
          </a>
          <a
            href="https://instagram.com/"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
            className="flex items-center gap-2 transition hover:text-accent"
          >
            <FiInstagram aria-hidden="true" /> Instagram
          </a>
        </div>
        <p className="text-xs text-ink/50 dark:text-paper/50">© {year} Omkar Visuals. All rights reserved.</p>
      </Container>
    </footer>
  );
}

import { useState } from 'react';
import { AnimatedSectionTitle } from '../ui/AnimatedSectionTitle';
import { Container } from '../ui/Container';
import { cn } from '../../utils/classNames';

const VIDEO_TYPE_OPTIONS = ['Short Form Videos', 'Long Form Videos', 'Motion Graphics/ VSL Videos'];
const BUDGET_OPTIONS = ['Under $500', '$500-$1000', '$1000-$2000', '$2000-$5000'];

const inputClass =
  'w-full rounded-[10px] bg-[rgba(120,120,120,0.12)] px-4 py-3 text-sm text-ink placeholder-ink/40 outline-none transition focus:bg-[rgba(120,120,120,0.2)] dark:bg-[rgba(187,187,187,0.15)] dark:text-white dark:placeholder-white/40 dark:focus:bg-[rgba(187,187,187,0.22)]';

// Google Apps Script Web App URL — appends each submission as a new row in
// Google Sheets. Configured via VITE_GOOGLE_SHEETS_ENDPOINT (see .env.local /
// .env.example) so swapping in a new sheet's deployment never needs a code change.
const GOOGLE_SHEETS_ENDPOINT = import.meta.env.VITE_GOOGLE_SHEETS_ENDPOINT;

export function ContactSection() {
  const [budget, setBudget] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success | error

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (status === 'loading') return;

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: formData.get('name') || '',
      email: formData.get('email') || '',
      videoType: formData.get('videoType') || '',
      budget,
      vision: formData.get('vision') || '',
    };

    if (!GOOGLE_SHEETS_ENDPOINT) {
      setStatus('error');
      return;
    }

    setStatus('loading');

    try {
      // Apps Script web apps don't answer CORS preflight requests, so this is
      // sent as text/plain — the browser treats that as a "simple request"
      // and never preflights it. The body is still the JSON payload; the
      // Apps Script side reads it with JSON.parse(e.postData.contents).
      const response = await fetch(GOOGLE_SHEETS_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error('Request failed');

      setStatus('success');
      form.reset();
      setBudget('');
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-20">
      <Container>
        <div className="mx-auto max-w-[560px]">
          <AnimatedSectionTitle eyebrow="Contact" title="Contact us for amazing video editing projects" align="center" />

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label className="mb-2 block text-sm font-medium">Name</label>
              <input type="text" name="name" placeholder="Jane Smith" className={inputClass} required />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Email</label>
              <input type="email" name="email" placeholder="jane@example.com" className={inputClass} required />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">What Kind of Video Do You Need?</label>
              <select name="videoType" className={inputClass} defaultValue="" required>
                <option value="" disabled>
                  Select...
                </option>
                {VIDEO_TYPE_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-3 block text-sm font-medium">What&rsquo;s Your Budget Range?</label>
              <div className="grid grid-cols-2 gap-3">
                {BUDGET_OPTIONS.map((opt) => (
                  <label
                    key={opt}
                    className={cn(
                      'flex cursor-pointer items-center gap-2 rounded-[10px] px-4 py-3 text-sm transition',
                      budget === opt
                        ? 'bg-accent/20 ring-1 ring-accent'
                        : 'bg-[rgba(120,120,120,0.12)] dark:bg-[rgba(187,187,187,0.15)]',
                    )}
                  >
                    <input
                      type="radio"
                      name="budget"
                      value={opt}
                      checked={budget === opt}
                      onChange={() => setBudget(opt)}
                      className="h-4 w-4 accent-accent"
                    />
                    {opt}
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Share Your Vision</label>
              <textarea
                name="vision"
                placeholder="Tell us about your project..."
                rows={4}
                className={cn(inputClass, 'resize-none')}
              />
            </div>

            <button
              type="submit"
              disabled={status === 'loading'}
              className="mt-2 rounded-[10px] bg-ink py-3 text-sm font-semibold text-paper transition hover:bg-ink/90 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-[#333333] dark:text-white dark:hover:bg-[#3f3f3f]"
            >
              {status === 'loading' ? 'Sending…' : 'Submit'}
            </button>

            {status === 'success' && (
              <p className="text-center text-sm font-medium text-accent">
                Thanks &mdash; your message is in! We&rsquo;ll be in touch soon.
              </p>
            )}
            {status === 'error' && (
              <p className="text-center text-sm font-medium text-red-500 dark:text-red-400">
                Something went wrong sending your message. Please try again.
              </p>
            )}
          </form>
        </div>
      </Container>
    </section>
  );
}

import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Send, CheckCircle, MapPin, Mail, Clock } from 'lucide-react';

// 1. Create a free form at https://formspree.io (takes ~2 minutes)
// 2. Point it at the email(s) you want inquiries sent to
// 3. Paste your form endpoint below (looks like "https://formspree.io/f/xxxxxxx")
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xnjejdjr';

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    business_name: '',
    service_interest: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-80px" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(false);
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          business_name: form.business_name,
          service_interest: form.service_interest,
          message: form.message,
          _subject: `New Inquiry from ${form.name}${form.business_name ? ` - ${form.business_name}` : ''}`,
        }),
      });
      if (!res.ok) throw new Error('Submission failed');
      setSubmitted(true);
    } catch (err) {
      console.error('Contact form error:', err);
      setError(true);
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-lg"
        >
          <div className="w-16 h-16 border border-velvet flex items-center justify-center mx-auto mb-8">
            <CheckCircle className="w-8 h-8 text-velvet" />
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">Message Sent.</h2>
          <p className="font-body text-base text-mercury/40 leading-relaxed mb-8">
            We'll be in touch shortly to learn about your project. 
            Expect a response within 24 hours.
          </p>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-mercury/30">
            — GreenSide Designs
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-20">
      {/* Header */}
      <section className="py-24 md:py-36 px-6 md:px-12 max-w-[1440px] mx-auto border-b border-border">
        <div ref={headerRef}>
          <motion.p
            initial={{ opacity: 0 }}
            animate={headerInView ? { opacity: 1 } : {}}
            className="font-mono text-xs uppercase tracking-[0.3em] text-velvet mb-6"
          >
            Contact
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.05] max-w-4xl"
          >
            Let's talk about your project.
          </motion.h1>
        </div>
      </section>

      {/* Form and info */}
      <section className="py-24 md:py-32 px-6 md:px-12 max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-20">
          {/* Form */}
          <div className="md:col-span-7">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label className="font-mono text-xs uppercase tracking-[0.15em] text-mercury/40">
                    Your Name *
                  </Label>
                  <Input
                    required
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    className="bg-white border-border text-foreground font-body h-14 px-4 focus:border-velvet transition-colors rounded-md"
                    placeholder="John Smith"
                  />
                </div>
                <div className="space-y-3">
                  <Label className="font-mono text-xs uppercase tracking-[0.15em] text-mercury/40">
                    Email *
                  </Label>
                  <Input
                    required
                    type="email"
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    className="bg-white border-border text-foreground font-body h-14 px-4 focus:border-velvet transition-colors rounded-md"
                    placeholder="john@business.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label className="font-mono text-xs uppercase tracking-[0.15em] text-mercury/40">
                    Business Name
                  </Label>
                  <Input
                    value={form.business_name}
                    onChange={e => setForm({ ...form, business_name: e.target.value })}
                    className="bg-white border-border text-foreground font-body h-14 px-4 focus:border-velvet transition-colors rounded-md"
                    placeholder="Your Business"
                  />
                </div>
                <div className="space-y-3">
                  <Label className="font-mono text-xs uppercase tracking-[0.15em] text-mercury/40">
                    Service Interest
                  </Label>
                  <Select
                    value={form.service_interest}
                    onValueChange={val => setForm({ ...form, service_interest: val })}
                  >
                    <SelectTrigger className="bg-white border-border text-foreground font-body h-14 px-4 rounded-md">
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-border rounded-md">
                      <SelectItem value="website_creation">Website Creation — $400</SelectItem>
                      <SelectItem value="website_moderation">6-Month Moderation — $120</SelectItem>
                      <SelectItem value="bundle">Bundle Package — $500</SelectItem>
                      <SelectItem value="other">Other / Not Sure</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-3">
                <Label className="font-mono text-xs uppercase tracking-[0.15em] text-mercury/40">
                  Tell us about your project
                </Label>
                <Textarea
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  rows={6}
                  className="bg-white border-border text-foreground font-body px-4 py-4 focus:border-velvet transition-colors resize-none rounded-md"
                  placeholder="What does your business do? What are your goals for this website? Any specific ideas or references?"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="flex items-center justify-center gap-3 w-full sm:w-auto font-mono text-xs uppercase tracking-[0.15em] bg-velvet text-white px-10 py-5 hover:bg-velvet/80 transition-all duration-300 disabled:opacity-50 min-w-[220px]"
              >
                {submitting ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    Send Message <Send className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
              {error && (
                <p className="font-body text-sm text-red-500">
                  Something went wrong sending your message — email me directly at mmelgoza081@gmail.com instead.
                </p>
              )}
            </form>
          </div>

          {/* Info sidebar */}
          <div className="md:col-span-4 md:col-start-9">
            <div className="space-y-12">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <MapPin className="w-4 h-4 text-velvet" />
                  <span className="font-mono text-xs uppercase tracking-[0.2em] text-mercury/40">Location</span>
                </div>
                <p className="font-body text-lg text-mercury/70">Lacey, WA</p>
                <p className="font-body text-sm text-mercury/30">United States</p>
              </div>

              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Mail className="w-4 h-4 text-velvet" />
                  <span className="font-mono text-xs uppercase tracking-[0.2em] text-mercury/40">Email</span>
                </div>
                <p className="font-body text-lg text-mercury/70">mmelgoza081@gmail.com</p>
              </div>

              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="w-4 h-4 text-velvet" />
                  <span className="font-mono text-xs uppercase tracking-[0.2em] text-mercury/40">Response Time</span>
                </div>
                <p className="font-body text-lg text-mercury/70">Within 24 hours</p>
                <p className="font-body text-sm text-mercury/30">Usually much sooner</p>
              </div>

              <div className="border-t border-border pt-8">
                <p className="font-body text-sm text-mercury/30 leading-relaxed">
                  Prefer to book directly? Check out our 
                  <a href="/services" className="text-velvet hover:underline ml-1">services page</a> for pricing details.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
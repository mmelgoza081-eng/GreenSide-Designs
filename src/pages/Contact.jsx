import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Send, CheckCircle, MapPin, Mail, Clock, MessageSquare, CalendarCheck, Wrench } from 'lucide-react';
import AmbientBackground from '@/components/ui/AmbientBackground';
import RainStreaks from '@/components/ui/RainStreaks';
import SideNav from '@/components/navigation/SideNav';

// 1. Create a free form at https://formspree.io (takes ~2 minutes)
// 2. Point it at the email(s) you want inquiries sent to
// 3. Paste your form endpoint below (looks like "https://formspree.io/f/xxxxxxx")
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xnjejdjr';

const INFO_ITEMS = [
  { icon: MapPin, label: 'Location', value: 'Lacey, WA' },
  { icon: Mail, label: 'Email', value: 'mmelgoza081@gmail.com' },
  { icon: Clock, label: 'Response Time', value: 'Within 24 hours' },
];

const NEXT_STEPS = [
  { icon: MessageSquare, title: 'We reach out', description: "You'll hear back from us within 24 hours, usually sooner." },
  { icon: CalendarCheck, title: 'We find a time', description: "We'll land on a date that actually works for your schedule." },
  { icon: Wrench, title: 'We get it done', description: 'We show up, clean every gutter, and leave your place spotless.' },
];

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    property_address: '',
    service_interest: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true, margin: "-80px" });
  const formRef = useRef(null);
  const formInView = useInView(formRef, { once: true, margin: "-60px" });

  // Submitting swaps the whole page for the much shorter "Message Sent"
  // view without a route change, so the router's scroll-to-top never fires
  // — the browser just leaves you at whatever scroll position you were at,
  // which on mobile (long, stacked form) is often well past where the short
  // confirmation view ends.
  useEffect(() => {
    if (submitted) window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [submitted]);

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
          property_address: form.property_address,
          service_interest: form.service_interest,
          message: form.message,
          _subject: `New Inquiry from ${form.name}${form.property_address ? ` - ${form.property_address}` : ''}`,
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
            We'll be in touch shortly to schedule your gutter cleaning.
            Expect a response within 24 hours.
          </p>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-mercury/30">
            — Green Gutters
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="relative">
      <AmbientBackground theme="amber" />

      {/* Hero — photo backdrop + amber rain streaks + next-steps card */}
      <div
        className="relative overflow-hidden"
        style={{
          backgroundImage: 'linear-gradient(160deg, rgba(23,15,5,0.8) 0%, rgba(36,21,5,0.85) 55%, rgba(20,12,4,0.92) 100%), url(/images/gutter-moss-pullout.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '64vh',
        }}
      >
        <RainStreaks count={36} color="rgba(252,211,77,0.5)" />
        <SideNav />
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 70% 25%, rgba(252,211,77,0.1) 0%, transparent 55%)' }} />
        <div ref={heroRef} className="relative z-10 pt-32 pb-20 px-6 md:px-12 max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-7">
            <motion.p
              initial={{ opacity: 0 }}
              animate={heroInView ? { opacity: 1 } : {}}
              className="font-mono text-xs uppercase tracking-[0.3em] text-amber-300/80 mb-6"
            >
              Contact
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1, duration: 0.8 }}
              className="font-display text-5xl md:text-7xl font-bold leading-[1.05] text-white"
            >
              Let's get your gutters cleaned.
            </motion.h1>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="lg:col-span-5 space-y-5"
          >
            {NEXT_STEPS.map((step) => {
              const Icon = step.icon;
              return (
                <div key={step.title} className="flex items-start gap-4 border border-amber-300/20 bg-white/[0.04] backdrop-blur-sm rounded-2xl p-5">
                  <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-300/30 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4 text-amber-300" />
                  </div>
                  <div>
                    <h3 className="font-display text-base font-bold text-white mb-1">{step.title}</h3>
                    <p className="font-body text-xs text-white/50 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* Form */}
      <section className="py-20 md:py-28 px-6 md:px-12" style={{ background: 'linear-gradient(160deg, #f2e9da 0%, #ece0c7 45%, #e6dbc1 100%)' }}>
        <div className="max-w-[900px] mx-auto">
        <motion.div
          ref={formRef}
          initial={{ opacity: 0, y: 30 }}
          animate={formInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="bg-white border border-border rounded-3xl p-6 md:p-12 shadow-sm"
        >
          <form onSubmit={handleSubmit} className="space-y-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-3">
                <Label className="font-mono text-xs uppercase tracking-[0.15em] text-mercury/40">
                  Your Name *
                </Label>
                <Input
                  required
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  className="bg-white border-border text-foreground font-body h-14 px-4 focus:border-velvet transition-colors rounded-xl"
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
                  className="bg-white border-border text-foreground font-body h-14 px-4 focus:border-velvet transition-colors rounded-xl"
                  placeholder="john@business.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-3">
                <Label className="font-mono text-xs uppercase tracking-[0.15em] text-mercury/40">
                  Property Address
                </Label>
                <Input
                  value={form.property_address}
                  onChange={e => setForm({ ...form, property_address: e.target.value })}
                  className="bg-white border-border text-foreground font-body h-14 px-4 focus:border-velvet transition-colors rounded-xl"
                  placeholder="123 Main St, Lacey, WA"
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
                  <SelectTrigger className="bg-white border-border text-foreground font-body h-14 px-4 rounded-xl">
                    <SelectValue placeholder="Select a service" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-border rounded-xl">
                    <SelectItem value="one_story">One Story Home</SelectItem>
                    <SelectItem value="two_story">Two Story Home</SelectItem>
                    <SelectItem value="three_story">Three Story Home</SelectItem>
                    <SelectItem value="other">Other / Not Sure</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-3">
              <Label className="font-mono text-xs uppercase tracking-[0.15em] text-mercury/40">
                Anything else we should know?
              </Label>
              <Textarea
                value={form.message}
                onChange={e => setForm({ ...form, message: e.target.value })}
                rows={5}
                className="bg-white border-border text-foreground font-body px-4 py-4 focus:border-velvet transition-colors resize-none rounded-xl"
                placeholder="Gate codes, pets, preferred dates, or anything else that'll help us get the job done."
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="flex items-center justify-center gap-3 w-full font-mono text-xs uppercase tracking-[0.15em] bg-velvet text-white px-10 py-5 hover:bg-velvet/80 transition-all duration-300 disabled:opacity-50 rounded-xl"
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

          {/* Info row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10 pt-8 border-t border-border">
            {INFO_ITEMS.map(item => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full bg-velvet/10 border border-velvet/30 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4 text-velvet" />
                  </div>
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-mercury/40">{item.label}</p>
                    <p className="font-body text-sm text-mercury/70">{item.value}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
        </div>
      </section>
    </div>
  );
}

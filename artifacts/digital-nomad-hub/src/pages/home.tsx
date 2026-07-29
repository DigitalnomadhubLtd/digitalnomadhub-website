import { useState, useEffect } from "react";
import { Link } from "wouter";
import ConsultationModal from "@/components/ConsultationModal";
import { 
  ArrowRight, 
  Globe2, 
  Cpu, 
  Code2, 
  Layers, 
  Zap, 
  LineChart, 
  Server, 
  ShoppingBag,
  CheckCircle2,
  ChevronRight,
  Menu,
  X,
  Mail,
  Building2,
  User,
  MessageSquare,
  Shield,
  Target,
  RefreshCcw,
  Quote
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useToast } from "@/hooks/use-toast";

const Logo = ({ variant = "nav" }: { variant?: "nav" | "footer" }) => {
  if (variant === "footer") {
    return (
      <img
        src="/images/logo-full.png"
        alt="Digital Nomad Hub Ltd."
        className="h-28 w-auto object-contain"
        style={{ mixBlendMode: "screen", filter: "drop-shadow(0 0 20px rgba(59,130,246,0.6))" }}
      />
    );
  }
  return (
    <div className="flex items-center gap-3">
      <img
        src="/images/logo-badge.png"
        alt="Digital Nomad Hub"
        className="h-11 w-11 object-contain transition-transform duration-500 group-hover:scale-110"
        style={{ mixBlendMode: "screen" }}
      />
      <span className="font-bold text-lg tracking-tight hidden sm:inline-block text-white">
        Digital Nomad Hub
      </span>
    </div>
  );
};

export default function Home() {
  const { toast } = useToast();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [consultationOpen, setConsultationOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleContactSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast({
      title: "Message Transmitted",
      description: "Our system has received your inquiry. A specialist will respond shortly.",
    });
    (e.target as HTMLFormElement).reset();
  };

  const handleNewsletterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast({
      title: "Subscription Confirmed",
      description: "You have successfully joined the founder network.",
    });
    (e.target as HTMLFormElement).reset();
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary/30">
      <ConsultationModal open={consultationOpen} onClose={() => setConsultationOpen(false)} />
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "glass-nav py-4" : "bg-transparent py-6"}`}>
        <div className="container mx-auto px-6 flex items-center justify-between">
          <Link href="/" className="group inline-block">
            <Logo />
          </Link>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#services" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Services</a>
            <a href="#products" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Products</a>
            <a href="#process" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Process</a>
            <a href="#why-us" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Why Us</a>
            <a href="#faq" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">FAQ</a>
            <button
              onClick={() => setConsultationOpen(true)}
              className="px-5 py-2.5 bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground rounded-full text-sm font-medium transition-all"
            >
              Initialize Project
            </button>
          </div>

          <button className="md:hidden p-2 text-foreground" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl pt-24 px-6 md:hidden animate-fade-in">
          <div className="flex flex-col gap-6">
            <a href="#services" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-semibold">Services</a>
            <a href="#products" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-semibold">Products</a>
            <a href="#process" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-semibold">Process</a>
            <a href="#why-us" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-semibold">Why Us</a>
            <a href="#faq" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-semibold">FAQ</a>
            <button onClick={() => { setMobileMenuOpen(false); setConsultationOpen(true); }} className="mt-4 px-6 py-4 bg-primary text-primary-foreground rounded-full text-center font-medium">
              Initialize Project
            </button>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative pt-40 pb-24 lg:pt-56 lg:pb-32 px-6">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-background/80 backdrop-blur-[2px]" />
          <img src="/images/hero-bg.png" alt="Abstract Tech Background" className="w-full h-full object-cover opacity-60 mix-blend-screen" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>
        
        <div className="container mx-auto relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-medium mb-4">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Global Infrastructure for Digital Founders
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold tracking-tight leading-[1.1]">
              The Operating System for <br />
              <span className="gradient-text-blue">Location-Independent</span> <br />
              Businesses.
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              We engineer scalable internet businesses using AI, automation, and premium software infrastructure. Build from anywhere. Scale everywhere.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
              <button
                onClick={() => setConsultationOpen(true)}
                className="w-full sm:w-auto px-8 py-4 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
              >
                Deploy Your Business
                <ArrowRight className="w-4 h-4" />
              </button>
              <a href="#services" className="w-full sm:w-auto px-8 py-4 bg-secondary/50 text-foreground border border-border rounded-full font-medium hover:bg-secondary transition-all flex items-center justify-center">
                Explore Capabilities
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Stats Section */}
      <section className="py-24 border-y border-border/50 bg-secondary/20 relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center">
            {[
              { value: "40+", label: "Global Deployments" },
              { value: "99.9%", label: "System Uptime" },
              { value: "$50M+", label: "Client Revenue" },
              { value: "15+", label: "Timezones Supported" }
            ].map((stat, i) => (
              <div key={i} className="space-y-2">
                <div className="text-4xl md:text-5xl font-bold gradient-text">{stat.value}</div>
                <div className="text-sm font-medium text-muted-foreground uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-32 px-6">
        <div className="container mx-auto">
          <div className="max-w-2xl mb-20">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">Enterprise-Grade <br/>Capabilities.</h2>
            <p className="text-lg text-muted-foreground">Comprehensive technical infrastructure to automate, scale, and manage your digital enterprise without physical constraints.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: <Cpu className="w-6 h-6" />, title: "AI & Automation", desc: "Intelligent workflow automation replacing manual operational overhead." },
              { icon: <Code2 className="w-6 h-6" />, title: "SaaS Development", desc: "Custom software applications built for recurring revenue models." },
              { icon: <Globe2 className="w-6 h-6" />, title: "Web Infrastructure", desc: "High-performance web architecture optimized for global delivery." },
              { icon: <Layers className="w-6 h-6" />, title: "Founder OS", desc: "Centralized operational dashboards mapping your entire business ecosystem." },
              { icon: <ShoppingBag className="w-6 h-6" />, title: "Digital Products", desc: "Automated delivery systems for high-margin informational assets." },
              { icon: <LineChart className="w-6 h-6" />, title: "Business Strategy", desc: "Data-driven architectures for entering and dominating digital markets." },
            ].map((service, i) => (
              <div key={i} className="glass-panel p-8 rounded-2xl group hover:border-primary/50 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Showcase (Coming Soon) */}
      <section id="products" className="py-32 px-6 bg-secondary/30 border-y border-border/50">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">Upcoming Infrastructure.</h2>
              <p className="text-lg text-muted-foreground">Our internal tools are being packaged for public release. The ultimate toolkit for digital autonomy.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="glass-panel rounded-3xl overflow-hidden border border-border flex flex-col relative group">
              <div className="absolute top-6 right-6 z-10 px-3 py-1 bg-primary/20 text-primary text-xs font-bold uppercase tracking-wider rounded-full backdrop-blur-md">
                In Development
              </div>
              <div className="h-64 bg-muted relative overflow-hidden">
                <img src="/images/founder-os.png" alt="Founder OS Preview" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="p-8 md:p-10 flex-1 flex flex-col justify-center">
                <h3 className="text-2xl font-bold mb-4">Founder OS Platform</h3>
                <p className="text-muted-foreground mb-6">A complete Notion-based operating system to manage projects, finances, team members, and strategy from a single terminal.</p>
                <div className="mt-auto flex items-center gap-4 text-sm font-medium text-primary">
                  <span>Join Waitlist</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-8">
              {[
                { title: "AI Prompt Library v2.0", desc: "800+ engineered prompts for business operations, marketing, and development." },
                { title: "Digital Automation Manuals", desc: "Step-by-step blueprints for replacing human capital with software scripts." },
                { title: "SaaS Boilerplate Codebase", desc: "The exact React/Node.js stack we use to launch products in days, not months." }
              ].map((prod, i) => (
                <div key={i} className="glass-panel p-8 rounded-2xl flex-1 flex flex-col justify-center group relative overflow-hidden">
                   <div className="absolute top-4 right-4 text-[10px] font-bold text-muted-foreground uppercase tracking-wider border border-border px-2 py-1 rounded">Q4 2026</div>
                  <h3 className="text-xl font-bold mb-2">{prod.title}</h3>
                  <p className="text-muted-foreground text-sm pr-12">{prod.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section id="why-us" className="py-32 px-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">Unfair Advantage.</h2>
              <p className="text-lg text-muted-foreground mb-8">
                We are not an agency; we are your technical co-founders. We build systems designed for leverage, scale, and absolute geographic freedom.
              </p>
              
              <div className="space-y-6">
                {[
                  { icon: <Shield className="text-primary" />, title: "Enterprise Reliability", desc: "Systems designed to handle millions of requests without manual intervention." },
                  { icon: <Target className="text-primary" />, title: "Founder-First Approach", desc: "We understand the unit economics of digital businesses, optimizing for profit margin." },
                  { icon: <RefreshCcw className="text-primary" />, title: "Automated Execution", desc: "If a human is doing it more than twice, we build a script to do it forever." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 p-4 rounded-xl hover:bg-secondary/20 transition-colors border border-transparent hover:border-border/50">
                    <div className="mt-1">{item.icon}</div>
                    <div>
                      <h4 className="font-bold mb-1">{item.title}</h4>
                      <p className="text-muted-foreground text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full" />
              <img src="/images/automation.png" alt="Automation Concept" className="relative z-10 w-full rounded-3xl border border-border/50 shadow-2xl shadow-primary/10" />
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="py-32 px-6 bg-secondary/10 border-y border-border/50">
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">Deployment Protocol.</h2>
            <p className="text-lg text-muted-foreground">A rigorous, deterministic methodology for translating abstract visions into profitable technical realities.</p>
          </div>

          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2 hidden md:block" />
            
            <div className="space-y-12 md:space-y-0">
              {[
                { step: "01", title: "Discovery", desc: "We analyze your market position, identifying leverage points where technology can create asymmetric advantages." },
                { step: "02", title: "Plan", desc: "Engineering the technical blueprint, selecting the optimal stack, and defining the database and API structures." },
                { step: "03", title: "Design", desc: "Crafting premium user interfaces that convert traffic into revenue with minimal friction." },
                { step: "04", title: "Build", desc: "Execution of the codebase. High-velocity sprinting to build scalable, secure infrastructure." },
                { step: "05", title: "Launch", desc: "Deploying to production environments with zero downtime and comprehensive monitoring." },
                { step: "06", title: "Scale", desc: "Iterating based on analytics, expanding server capacity, and automating new bottlenecks." },
              ].map((phase, i) => (
                <div key={i} className={`relative flex flex-col md:flex-row items-center gap-8 md:gap-16 ${i % 2 === 0 ? "md:flex-row-reverse" : ""}`}>
                  <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-background border border-primary text-primary items-center justify-center font-bold z-10 shadow-[0_0_15px_rgba(var(--primary),0.3)]">
                    {phase.step}
                  </div>
                  <div className={`w-full md:w-1/2 ${i % 2 === 0 ? "md:text-left" : "md:text-right"}`}>
                    <div className="glass-panel p-8 rounded-2xl md:bg-transparent md:border-none md:p-0">
                      <div className="text-primary font-bold mb-2 md:hidden">Phase {phase.step}</div>
                      <h3 className="text-2xl font-bold mb-4">{phase.title}</h3>
                      <p className="text-muted-foreground">{phase.desc}</p>
                    </div>
                  </div>
                  <div className="hidden md:block w-1/2" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Vision / Call to Action Image Area */}
      <section className="py-32 px-6 relative overflow-hidden">
         <div className="absolute inset-0 z-0">
          <img src="/images/global-network.png" alt="Global Network" className="w-full h-full object-cover opacity-30 mix-blend-luminosity" />
          <div className="absolute inset-0 bg-background/80" />
        </div>
        <div className="container mx-auto relative z-10 text-center">
          <div className="max-w-4xl mx-auto glass-panel p-12 md:p-20 rounded-3xl border border-primary/20 bg-background/40 backdrop-blur-xl">
             <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-8">Empowering Global Autonomy</h2>
             <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
               We believe geography should not dictate destiny. By leveraging code and automation, we help founders build systems that generate wealth regardless of their physical coordinates.
             </p>
             <button onClick={() => setConsultationOpen(true)} className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-all shadow-[0_0_30px_rgba(var(--primary),0.3)]">
                Start Building Today
                <Zap className="w-4 h-4" />
              </button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 px-6 bg-secondary/20 border-y border-border/50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">Verified Results.</h2>
            <p className="text-lg text-muted-foreground">Feedback from founders operating at scale.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                quote: "DNH completely rebuilt our entire operational stack. We scaled from $50k to $200k MRR without adding a single human to the payroll because of their automated infrastructure.", 
                author: "Sarah J.", 
                role: "Founder, SaaS OS" 
              },
              { 
                quote: "Working with them feels like having an elite engineering team in-house. They don't just write code, they understand the business logic behind it. Exceptional talent.", 
                author: "Marcus T.", 
                role: "Creator, Echo Digital" 
              },
              { 
                quote: "The web infrastructure they deployed for our e-commerce brand cut our load times in half and boosted our conversion rate by 34%. Absolute professionals.", 
                author: "Elena R.", 
                role: "Director, Nomad Goods" 
              }
            ].map((test, i) => (
              <div key={i} className="glass-panel p-8 rounded-2xl relative">
                <Quote className="absolute top-6 right-6 w-8 h-8 text-primary/20" />
                <p className="text-muted-foreground mb-8 leading-relaxed relative z-10">"{test.quote}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary">
                    {test.author.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold">{test.author}</div>
                    <div className="text-sm text-muted-foreground">{test.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-32 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">System Queries.</h2>
            <p className="text-lg text-muted-foreground">Answers to common operational questions.</p>
          </div>

          <Accordion type="single" collapsible className="w-full">
            {[
              { q: "How do we initiate a project?", a: "Begin by submitting the contact form below. We will review your requirements and schedule a technical discovery call to assess feasibility and architecture." },
              { q: "What specific services do you offer?", a: "We specialize in AI automation, full-stack web and SaaS development, Shopify implementations, digital product infrastructure, and comprehensive technical consulting." },
              { q: "Do you work with international clients?", a: "Yes. As a digital nomad infrastructure company, our operations are entirely remote. We interface asynchronously and synchronously with clients across all global timezones." },
              { q: "What technology stack do you utilize?", a: "We build primarily on modern, scalable frameworks: React, Node.js, Next.js, and specialized AI APIs (OpenAI, Anthropic). Our focus is always on performance and maintainability." },
              { q: "Can you automate existing business processes?", a: "Absolutely. We conduct audits of your current workflows to identify bottlenecks, then write custom scripts and integrate APIs to replace manual labor with deterministic software." },
              { q: "Are you hiring?", a: "We are always looking for elite engineers, designers, and systems architects who value location independence. Reach out via email." }
            ].map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-border/50">
                <AccordionTrigger className="text-left text-lg font-medium hover:text-primary transition-colors py-6">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base leading-relaxed pb-6">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-6 bg-secondary/10 border-t border-border/50 relative">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">Initialize<br/>Connection.</h2>
              <p className="text-lg text-muted-foreground mb-12">Ready to architect your digital infrastructure? Transmit your requirements and our engineering team will evaluate the parameters.</p>
              
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-primary mt-1">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-1">Direct Transmission</div>
                    <a href="mailto:hello@digitalnomadhub.online" className="text-xl font-medium hover:text-primary transition-colors">hello@digitalnomadhub.online</a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-primary mt-1">
                    <Globe2 className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-1">Global Headquarters</div>
                    <div className="text-xl font-medium">digitalnomadhub.online</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass-panel p-8 md:p-10 rounded-3xl">
              <form onSubmit={handleContactSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Operator Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                      <Input required className="pl-10 bg-background/50 border-border/50 focus:border-primary" placeholder="John Doe" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                      <Input required type="email" className="pl-10 bg-background/50 border-border/50 focus:border-primary" placeholder="john@company.com" />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Entity / Company</label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                    <Input className="pl-10 bg-background/50 border-border/50 focus:border-primary" placeholder="Acme Corp (Optional)" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Project Parameters</label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                    <Textarea required className="pl-10 min-h-[120px] bg-background/50 border-border/50 focus:border-primary" placeholder="Describe the infrastructure you need built..." />
                  </div>
                </div>

                <Button type="submit" className="w-full py-6 rounded-xl text-lg font-medium">
                  Transmit Request
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background pt-24 pb-12 px-6 border-t border-border/50">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="md:col-span-2 space-y-6">
              <Logo variant="footer" />
              <p className="text-muted-foreground max-w-sm">
                Engineering digital autonomy. We build the technological infrastructure that enables founders to operate highly profitable businesses from anywhere on Earth.
              </p>
              <form onSubmit={handleNewsletterSubmit} className="flex gap-2 max-w-sm pt-4">
                <Input required type="email" placeholder="Enter email for updates" className="bg-secondary/30 border-border/50" />
                <Button type="submit" variant="secondary">Subscribe</Button>
              </form>
            </div>
            
            <div>
              <h4 className="font-bold mb-6 uppercase tracking-wider text-sm">Navigation</h4>
              <ul className="space-y-4 text-muted-foreground">
                <li><a href="#services" className="hover:text-primary transition-colors">Services Overview</a></li>
                <li><a href="#products" className="hover:text-primary transition-colors">Upcoming Products</a></li>
                <li><a href="#process" className="hover:text-primary transition-colors">Deployment Process</a></li>
                <li><a href="#faq" className="hover:text-primary transition-colors">System FAQ</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-6 uppercase tracking-wider text-sm">Legal & Contact</h4>
              <ul className="space-y-4 text-muted-foreground">
                <li><a href="mailto:hello@digitalnomadhub.online" className="hover:text-primary transition-colors">hello@digitalnomadhub.online</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <div>© 2026 Digital Nomad Hub Ltd. All Rights Reserved.</div>
            <div className="flex gap-4">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                Systems Operational
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

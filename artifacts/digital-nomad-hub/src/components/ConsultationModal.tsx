import { useState } from "react";
import { X, ArrowRight, ArrowLeft, CheckCircle2, User, Mail, Building2, MessageSquare, DollarSign, Clock, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface FormData {
  name: string;
  email: string;
  company: string;
  projectDescription: string;
  services: string[];
  budget: string;
  timeline: string;
}

const SERVICES = [
  "AI & Automation",
  "Website Development",
  "Web Application",
  "SaaS Development",
  "Founder OS",
  "Digital Products",
  "Business Consulting",
  "Shopify Partner Services",
  "Business Infrastructure",
  "Internet Business Strategy",
];

const BUDGETS = [
  "Under $1,000",
  "$1,000 – $5,000",
  "$5,000 – $15,000",
  "$15,000 – $50,000",
  "$50,000+",
  "Not sure yet",
];

const TIMELINES = [
  "ASAP (under 2 weeks)",
  "1 – 2 months",
  "2 – 4 months",
  "4 – 6 months",
  "Ongoing / Retainer",
  "Flexible",
];

const TOTAL_STEPS = 4;

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function ConsultationModal({ open, onClose }: Props) {
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState("");
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    company: "",
    projectDescription: "",
    services: [],
    budget: "",
    timeline: "",
  });

  const set = (field: keyof FormData, value: string | string[]) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const toggleService = (s: string) => {
    set(
      "services",
      form.services.includes(s)
        ? form.services.filter((x) => x !== s)
        : [...form.services, s]
    );
  };

  const validateStep = (): boolean => {
    const next: Partial<Record<keyof FormData, string>> = {};
    if (step === 1) {
      if (!form.name.trim()) next.name = "Name is required.";
      if (!form.email.trim()) next.email = "Email is required.";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
        next.email = "Enter a valid email address.";
    }
    if (step === 2) {
      if (!form.projectDescription.trim())
        next.projectDescription = "Please describe your project.";
    }
    if (step === 3) {
      if (form.services.length === 0)
        next.services = "Select at least one service.";
    }
    if (step === 4) {
      if (!form.budget) next.budget = "Please select a budget range.";
      if (!form.timeline) next.timeline = "Please select a timeline.";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const next = () => {
    if (!validateStep()) return;
    setStep((s) => Math.min(s + 1, TOTAL_STEPS));
  };

  const back = () => {
    setErrors({});
    setStep((s) => Math.max(s - 1, 1));
  };

  const submit = async () => {
    if (!validateStep()) return;
    setSubmitting(true);
    setServerError("");
    try {
      // VITE_API_URL is set at build time for deployments where the API lives on
      // a different origin (e.g. Vercel frontend → Replit API server).
      // Falls back to "" (same-origin) when running on Replit.
      const apiBase = (import.meta.env.VITE_API_URL ?? "").replace(/\/$/, "");
      const res = await fetch(`${apiBase}/api/consultation`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        setServerError((body as { error?: string }).error ?? "Something went wrong. Please try again.");
        setSubmitting(false);
        return;
      }
      setSubmitted(true);
    } catch {
      setServerError("Network error. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setStep(1);
      setSubmitted(false);
      setServerError("");
      setErrors({});
      setForm({ name: "", email: "", company: "", projectDescription: "", services: [], budget: "", timeline: "" });
    }, 300);
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div className="relative w-full max-w-xl bg-[#06152D] border border-[#1e3a6e] rounded-3xl shadow-2xl shadow-blue-950/50 overflow-hidden animate-fade-in-up">
        {/* Header */}
        <div className="flex items-center justify-between px-8 pt-8 pb-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-400 mb-1">
              Consultation Request
            </p>
            {!submitted && (
              <p className="text-sm text-slate-400">
                Step {step} of {TOTAL_STEPS}
              </p>
            )}
          </div>
          <button
            onClick={handleClose}
            className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Progress bar */}
        {!submitted && (
          <div className="px-8 mb-6">
            <div className="h-1 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500 rounded-full transition-all duration-500"
                style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Content */}
        <div className="px-8 pb-8">
          {submitted ? (
            <SuccessScreen onClose={handleClose} name={form.name} />
          ) : (
            <>
              {step === 1 && <StepOne form={form} errors={errors} set={set} />}
              {step === 2 && <StepTwo form={form} errors={errors} set={set} />}
              {step === 3 && <StepThree form={form} errors={errors} toggleService={toggleService} />}
              {step === 4 && <StepFour form={form} errors={errors} set={set} />}

              {serverError && (
                <p className="mt-4 text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
                  {serverError}
                </p>
              )}

              <div className="flex items-center justify-between mt-8">
                <button
                  onClick={back}
                  className={`flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors ${step === 1 ? "invisible" : ""}`}
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>

                {step < TOTAL_STEPS ? (
                  <Button
                    onClick={next}
                    className="px-6 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-medium flex items-center gap-2"
                  >
                    Continue
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                ) : (
                  <Button
                    onClick={submit}
                    disabled={submitting}
                    className="px-6 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-medium flex items-center gap-2 disabled:opacity-60"
                  >
                    {submitting ? "Sending..." : "Submit Request"}
                    {!submitting && <ArrowRight className="w-4 h-4" />}
                  </Button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return <p className="text-xs text-red-400 mt-1">{msg}</p>;
}

function StepOne({ form, errors, set }: { form: FormData; errors: Partial<Record<keyof FormData, string>>; set: (f: keyof FormData, v: string) => void }) {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-white mb-1">Tell us about yourself.</h2>
        <p className="text-slate-400 text-sm">We'll use this to personalise our response to you.</p>
      </div>
      <div className="space-y-4 pt-2">
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5 block">Full Name *</label>
          <div className="relative">
            <User className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
            <Input
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
              className={`pl-9 bg-white/5 border-white/10 focus:border-blue-500 text-white placeholder:text-slate-600 ${errors.name ? "border-red-500/50" : ""}`}
              placeholder="Jane Smith"
            />
          </div>
          <FieldError msg={errors.name} />
        </div>
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5 block">Email Address *</label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
            <Input
              type="email"
              value={form.email}
              onChange={(e) => set("email", e.target.value)}
              className={`pl-9 bg-white/5 border-white/10 focus:border-blue-500 text-white placeholder:text-slate-600 ${errors.email ? "border-red-500/50" : ""}`}
              placeholder="jane@company.com"
            />
          </div>
          <FieldError msg={errors.email} />
        </div>
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5 block">Company / Entity</label>
          <div className="relative">
            <Building2 className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
            <Input
              value={form.company}
              onChange={(e) => set("company", e.target.value)}
              className="pl-9 bg-white/5 border-white/10 focus:border-blue-500 text-white placeholder:text-slate-600"
              placeholder="Acme Inc. (optional)"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function StepTwo({ form, errors, set }: { form: FormData; errors: Partial<Record<keyof FormData, string>>; set: (f: keyof FormData, v: string) => void }) {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-white mb-1">Describe your project.</h2>
        <p className="text-slate-400 text-sm">The more detail, the better we can help you.</p>
      </div>
      <div className="pt-2">
        <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5 block">Project Description *</label>
        <div className="relative">
          <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
          <Textarea
            value={form.projectDescription}
            onChange={(e) => set("projectDescription", e.target.value)}
            className={`pl-9 min-h-[160px] bg-white/5 border-white/10 focus:border-blue-500 text-white placeholder:text-slate-600 resize-none ${errors.projectDescription ? "border-red-500/50" : ""}`}
            placeholder="I want to build a SaaS platform that automates my client onboarding process. Currently we handle 50 new clients per month manually and the process takes 4 hours per client..."
          />
        </div>
        <FieldError msg={errors.projectDescription} />
      </div>
    </div>
  );
}

function StepThree({ form, errors, toggleService }: { form: FormData; errors: Partial<Record<keyof FormData, string>>; toggleService: (s: string) => void }) {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-white mb-1">Required services.</h2>
        <p className="text-slate-400 text-sm">Select all that apply to your project.</p>
      </div>
      <div className="pt-2">
        <div className="flex items-center gap-2 mb-3">
          <Layers className="w-4 h-4 text-blue-400" />
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">Services *</label>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {SERVICES.map((s) => {
            const active = form.services.includes(s);
            return (
              <button
                key={s}
                type="button"
                onClick={() => toggleService(s)}
                className={`text-left px-4 py-3 rounded-xl text-sm font-medium border transition-all ${
                  active
                    ? "bg-blue-600/20 border-blue-500 text-blue-300"
                    : "bg-white/5 border-white/10 text-slate-400 hover:border-white/20 hover:text-white"
                }`}
              >
                {active && <span className="mr-1.5 text-blue-400">✓</span>}
                {s}
              </button>
            );
          })}
        </div>
        <FieldError msg={errors.services} />
      </div>
    </div>
  );
}

function StepFour({ form, errors, set }: { form: FormData; errors: Partial<Record<keyof FormData, string>>; set: (f: keyof FormData, v: string) => void }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-1">Budget & timeline.</h2>
        <p className="text-slate-400 text-sm">This helps us match you with the right approach.</p>
      </div>
      <div>
        <div className="flex items-center gap-2 mb-3">
          <DollarSign className="w-4 h-4 text-blue-400" />
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">Estimated Budget *</label>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {BUDGETS.map((b) => (
            <button
              key={b}
              type="button"
              onClick={() => set("budget", b)}
              className={`text-left px-4 py-3 rounded-xl text-sm font-medium border transition-all ${
                form.budget === b
                  ? "bg-blue-600/20 border-blue-500 text-blue-300"
                  : "bg-white/5 border-white/10 text-slate-400 hover:border-white/20 hover:text-white"
              }`}
            >
              {form.budget === b && <span className="mr-1.5 text-blue-400">✓</span>}
              {b}
            </button>
          ))}
        </div>
        <FieldError msg={errors.budget} />
      </div>
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Clock className="w-4 h-4 text-blue-400" />
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">Preferred Timeline *</label>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {TIMELINES.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => set("timeline", t)}
              className={`text-left px-4 py-3 rounded-xl text-sm font-medium border transition-all ${
                form.timeline === t
                  ? "bg-blue-600/20 border-blue-500 text-blue-300"
                  : "bg-white/5 border-white/10 text-slate-400 hover:border-white/20 hover:text-white"
              }`}
            >
              {form.timeline === t && <span className="mr-1.5 text-blue-400">✓</span>}
              {t}
            </button>
          ))}
        </div>
        <FieldError msg={errors.timeline} />
      </div>
    </div>
  );
}

function SuccessScreen({ onClose, name }: { onClose: () => void; name: string }) {
  return (
    <div className="text-center py-4 space-y-6">
      <div className="flex justify-center">
        <div className="relative">
          <div className="absolute inset-0 bg-blue-500/20 blur-2xl rounded-full" />
          <div className="relative w-20 h-20 rounded-full bg-blue-600/20 border border-blue-500/30 flex items-center justify-center">
            <CheckCircle2 className="w-10 h-10 text-blue-400" />
          </div>
        </div>
      </div>
      <div>
        <h2 className="text-2xl font-bold text-white mb-3">
          Request Received, {name.split(" ")[0]}.
        </h2>
        <p className="text-slate-400 leading-relaxed max-w-sm mx-auto">
          Your consultation request has been submitted to the Digital Nomad Hub team. We review every submission personally and will respond within <span className="text-white font-medium">24 hours</span>.
        </p>
      </div>
      <div className="bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-left space-y-3">
        <p className="text-xs font-bold uppercase tracking-wider text-blue-400">What happens next</p>
        <ul className="space-y-2 text-sm text-slate-400">
          <li className="flex items-start gap-2"><span className="text-blue-400 mt-0.5">01</span> We review your project requirements.</li>
          <li className="flex items-start gap-2"><span className="text-blue-400 mt-0.5">02</span> A specialist prepares a tailored response.</li>
          <li className="flex items-start gap-2"><span className="text-blue-400 mt-0.5">03</span> You receive a reply at <span className="text-white font-medium break-all">{/* email shown in parent */}</span> within 24 hours.</li>
          <li className="flex items-start gap-2"><span className="text-blue-400 mt-0.5">04</span> We schedule a discovery call if the fit is right.</li>
        </ul>
      </div>
      <Button
        onClick={onClose}
        className="w-full rounded-full bg-white/10 hover:bg-white/15 text-white font-medium"
      >
        Close
      </Button>
    </div>
  );
}

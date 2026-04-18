import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { SERVICES, TIME_SLOTS } from "@/lib/services";
import { supabase } from "@/integrations/supabase/client";
import { whatsappUrl, SALON } from "@/lib/contact";
import { z } from "zod";
import { Calendar, Clock, Check, Loader2, MessageCircle, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

type Search = { service?: string };

export const Route = createFileRoute("/booking")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    service: typeof s.service === "string" ? s.service : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Book an Appointment — Glow Beauty Parlour" },
      { name: "description", content: "Reserve your slot online. Real-time availability for facials, hair, makeup, and bridal services." },
      { property: "og:title", content: "Book an Appointment — Glow Beauty Parlour" },
      { property: "og:description", content: "Reserve your beauty appointment online with real-time availability." },
    ],
  }),
  component: BookingPage,
});

const schema = z.object({
  customer_name: z.string().trim().min(2, "Please enter your name").max(100),
  customer_phone: z.string().trim().regex(/^[+\d\s\-()]{7,20}$/, "Enter a valid phone number"),
  service: z.string().min(1, "Choose a service"),
  booking_date: z.string().min(1, "Pick a date"),
  booking_time: z.string().min(1, "Pick a time"),
  notes: z.string().max(500).optional(),
});

function todayStr() {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 10);
}

function BookingPage() {
  const { service: preselected } = Route.useSearch();

  const [form, setForm] = useState({
    customer_name: "",
    customer_phone: "",
    service: preselected ?? "",
    booking_date: todayStr(),
    booking_time: "",
    notes: "",
  });
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<null | { id: string }>(null);

  const minDate = todayStr();

  // Fetch booked slots whenever date changes
  useEffect(() => {
    let cancelled = false;
    async function load() {
      if (!form.booking_date) return;
      setLoadingSlots(true);
      const { data, error } = await supabase.rpc("get_booked_slots", {
        target_date: form.booking_date,
      });
      if (cancelled) return;
      if (error) {
        console.error(error);
        setBookedSlots([]);
      } else {
        setBookedSlots((data ?? []).map((r: { booking_time: string }) => r.booking_time));
      }
      setLoadingSlots(false);
    }
    load();
    return () => { cancelled = true; };
  }, [form.booking_date]);

  const selectedService = useMemo(
    () => SERVICES.find((s) => s.id === form.service),
    [form.service],
  );

  function update<K extends keyof typeof form>(k: K, v: (typeof form)[K]) {
    setForm((f) => ({ ...f, [k]: v }));
    setError(null);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Please check the form");
      return;
    }

    setSubmitting(true);
    const serviceName = SERVICES.find((s) => s.id === parsed.data.service)?.name ?? parsed.data.service;

    const { data, error: insertErr } = await supabase
      .from("bookings")
      .insert({
        customer_name: parsed.data.customer_name,
        customer_phone: parsed.data.customer_phone,
        service: serviceName,
        booking_date: parsed.data.booking_date,
        booking_time: parsed.data.booking_time,
        notes: parsed.data.notes || null,
      })
      .select("id")
      .single();

    setSubmitting(false);

    if (insertErr) {
      if (insertErr.code === "23505") {
        setError("That slot was just booked. Please pick another time.");
        // refresh slots
        const { data: d } = await supabase.rpc("get_booked_slots", { target_date: form.booking_date });
        setBookedSlots((d ?? []).map((r: { booking_time: string }) => r.booking_time));
      } else {
        setError("Could not save your booking. Please try again or contact us on WhatsApp.");
      }
      return;
    }

    setSuccess({ id: data!.id });
  }

  if (success) {
    const sName = SERVICES.find((s) => s.id === form.service)?.name ?? form.service;
    const msg = `Hi ${SALON.name}! I just booked an appointment.%0A%0A*Name:* ${form.customer_name}%0A*Phone:* ${form.customer_phone}%0A*Service:* ${sName}%0A*Date:* ${form.booking_date}%0A*Time:* ${form.booking_time}${form.notes ? `%0A*Notes:* ${form.notes}` : ""}`;
    return (
      <SiteLayout>
        <section className="mx-auto max-w-2xl px-4 py-20 text-center sm:px-6">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-gold shadow-elegant">
            <Check className="h-9 w-9 text-gold-foreground" />
          </div>
          <h1 className="mt-6 font-serif text-3xl sm:text-4xl">Booking Confirmed</h1>
          <p className="mt-3 text-muted-foreground">
            Thank you, {form.customer_name}! We'll see you on <strong>{form.booking_date}</strong> at <strong>{form.booking_time}</strong>.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href={`https://wa.me/${SALON.whatsappRaw}?text=${msg}`}
              target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-medium text-white hover:scale-105 transition-transform"
            >
              <MessageCircle className="h-4 w-4" /> Send Details on WhatsApp
            </a>
            <button
              onClick={() => { setSuccess(null); setForm((f) => ({ ...f, booking_time: "" })); }}
              className="rounded-full border border-border bg-background px-6 py-3 text-sm hover:bg-accent"
            >
              Book Another
            </button>
          </div>
        </section>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <section className="bg-gradient-hero">
        <div className="mx-auto max-w-7xl px-4 py-14 text-center sm:px-6 md:py-20 lg:px-8">
          <p className="text-xs uppercase tracking-[0.25em] text-gold">Reserve</p>
          <h1 className="mt-3 font-serif text-4xl sm:text-5xl">Book Your Appointment</h1>
          <div className="gold-divider mx-auto my-5 w-24" />
          <p className="mx-auto max-w-xl text-muted-foreground">
            Real-time availability. Booked slots are hidden so you'll only see what's truly free.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
        <form onSubmit={handleSubmit} className="rounded-3xl border border-border/60 bg-card p-6 shadow-soft sm:p-10">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Full Name *">
              <input
                value={form.customer_name}
                onChange={(e) => update("customer_name", e.target.value)}
                maxLength={100}
                required
                className="input"
                placeholder="Aanya Sharma"
              />
            </Field>
            <Field label="Phone Number *">
              <input
                type="tel"
                value={form.customer_phone}
                onChange={(e) => update("customer_phone", e.target.value)}
                maxLength={20}
                required
                className="input"
                placeholder="+91 99999 99999"
              />
            </Field>
          </div>

          <div className="mt-5">
            <Field label="Service *">
              <select
                value={form.service}
                onChange={(e) => update("service", e.target.value)}
                required
                className="input"
              >
                <option value="">Choose a service…</option>
                {(["Skin Care", "Hair Care", "Makeup", "Bridal Packages"] as const).map((cat) => (
                  <optgroup key={cat} label={cat}>
                    {SERVICES.filter((s) => s.category === cat).map((s) => (
                      <option key={s.id} value={s.id}>{s.name} — ₹{s.price.toLocaleString("en-IN")} ({s.duration})</option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </Field>
            {selectedService && (
              <p className="mt-2 text-xs text-muted-foreground flex items-center gap-1.5">
                <Sparkles className="h-3 w-3 text-gold" /> {selectedService.description}
              </p>
            )}
          </div>

          <div className="mt-5">
            <Field label="Date *">
              <div className="relative">
                <Calendar className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gold" />
                <input
                  type="date"
                  min={minDate}
                  value={form.booking_date}
                  onChange={(e) => { update("booking_date", e.target.value); update("booking_time", ""); }}
                  required
                  className="input pl-11"
                />
              </div>
            </Field>
          </div>

          <div className="mt-5">
            <label className="mb-2 flex items-center gap-2 text-sm font-medium">
              <Clock className="h-4 w-4 text-gold" /> Available Times *
            </label>
            {loadingSlots ? (
              <div className="flex items-center gap-2 text-sm text-muted-foreground"><Loader2 className="h-4 w-4 animate-spin" /> Loading slots…</div>
            ) : (
              <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
                {TIME_SLOTS.map((t) => {
                  const taken = bookedSlots.includes(t);
                  const selected = form.booking_time === t;
                  return (
                    <button
                      type="button"
                      key={t}
                      disabled={taken}
                      onClick={() => update("booking_time", t)}
                      className={cn(
                        "rounded-full border px-3 py-2 text-sm transition-all",
                        taken && "cursor-not-allowed border-border bg-muted text-muted-foreground line-through opacity-60",
                        !taken && !selected && "border-border bg-background hover:border-primary hover:text-primary",
                        selected && "border-primary bg-primary text-primary-foreground shadow-soft",
                      )}
                    >
                      {t}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <div className="mt-5">
            <Field label="Notes (optional)">
              <textarea
                value={form.notes}
                onChange={(e) => update("notes", e.target.value)}
                maxLength={500}
                rows={3}
                className="input"
                placeholder="Any preferences or skin concerns…"
              />
            </Field>
          </div>

          {error && (
            <div className="mt-5 rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="mt-7 w-full rounded-full bg-primary px-6 py-4 text-sm font-medium text-primary-foreground transition hover:opacity-90 disabled:opacity-60"
          >
            {submitting ? <span className="inline-flex items-center gap-2"><Loader2 className="h-4 w-4 animate-spin" /> Booking…</span> : "Confirm Booking"}
          </button>
          <p className="mt-3 text-center text-xs text-muted-foreground">
            You'll get a WhatsApp confirmation step after booking.
          </p>
        </form>
      </section>

      <style>{`
        .input {
          width: 100%;
          border-radius: 12px;
          border: 1px solid var(--border);
          background: var(--background);
          padding: 12px 16px;
          font-size: 14px;
          color: var(--foreground);
          outline: none;
          transition: border-color .15s, box-shadow .15s;
        }
        .input:focus {
          border-color: var(--primary);
          box-shadow: 0 0 0 3px color-mix(in oklab, var(--primary) 15%, transparent);
        }
      `}</style>
    </SiteLayout>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium">{label}</span>
      {children}
    </label>
  );
}

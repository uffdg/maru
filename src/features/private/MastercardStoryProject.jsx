import { ArrowUpRight, Zap } from 'lucide-react';
import TrackedExternalLink from '../../shared/components/TrackedExternalLink';

const DEMO_URL = 'https://uffdg.github.io/priceless-demo/';

const SectionLabel = ({ number, total, title }) => (
  <div className="flex items-baseline gap-3">
    <span className="text-[11px] font-bold uppercase tracking-[0.24em] text-violet-600">
      {number}
      <span className="text-slate-400">/{total}</span>
    </span>
    <h2 className="text-3xl font-black tracking-tight text-slate-950 md:text-4xl">{title}</h2>
  </div>
);

const ProblemCard = ({ title, body }) => (
  <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-[0_4px_24px_rgba(15,23,42,0.04)]">
    <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.2em] text-violet-500">{title}</p>
    <p className="text-sm leading-7 text-slate-600">{body}</p>
  </div>
);

const ActorCard = ({ number, actor, role, items }) => (
  <div className="flex flex-col gap-4 rounded-2xl border border-violet-100 bg-white/80 p-6 shadow-[0_4px_24px_rgba(76,29,149,0.05)]">
    <div>
      <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.28em] text-violet-400">Actor {number}</p>
      <p className="text-xl font-black tracking-tight text-slate-950">{actor}</p>
      <p className="mt-1 text-sm font-semibold text-violet-700">{role}</p>
    </div>
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2 text-sm leading-6 text-slate-600">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-400" />
          {item}
        </li>
      ))}
    </ul>
  </div>
);

const ProcessStep = ({ number, title, description, tags }) => (
  <div className="grid gap-4 border-t border-slate-100 py-6 md:grid-cols-[auto_1fr_auto] md:items-start md:gap-8">
    <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-violet-50 text-[13px] font-black text-violet-700">
      {number}
    </span>
    <div>
      <p className="font-bold text-slate-950">{title}</p>
      <p className="mt-1.5 text-sm leading-7 text-slate-600">{description}</p>
    </div>
    <div className="flex flex-wrap gap-2 md:justify-end">
      {tags.map((tag) => (
        <span
          key={tag}
          className="rounded-full border border-violet-100 bg-violet-50/70 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-violet-700"
        >
          {tag}
        </span>
      ))}
    </div>
  </div>
);

const DeliverableCard = ({ icon, title, description }) => (
  <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-[0_4px_24px_rgba(15,23,42,0.04)]">
    <div className="mb-3 text-2xl">{icon}</div>
    <p className="font-bold text-slate-950">{title}</p>
    <p className="mt-2 text-sm leading-6 text-slate-500">{description}</p>
  </div>
);

const Quote = ({ text, attribution }) => (
  <blockquote className="my-8 rounded-2xl border-l-4 border-violet-400 bg-violet-50/60 px-6 py-5">
    <p className="text-base font-medium italic leading-8 text-slate-700">"{text}"</p>
    {attribution ? (
      <footer className="mt-3 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">{attribution}</footer>
    ) : null}
  </blockquote>
);

const MastercardStoryProject = () => {
  return (
    <article className="space-y-0">
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="rounded-[2rem] border border-white/70 bg-[linear-gradient(135deg,_rgba(124,58,237,0.12)_0%,_rgba(139,92,246,0.06)_50%,_rgba(255,255,255,0.9)_100%)] p-8 shadow-[0_24px_80px_rgba(76,29,149,0.08)] backdrop-blur-xl md:p-12">
        <div className="grid gap-8 md:grid-cols-[1fr_auto]">
          <div>
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-violet-200 bg-violet-50 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.24em] text-violet-700">
                Product Strategy & Design · 2026
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.24em] text-amber-700">
                <Zap className="h-3.5 w-3.5" />
                Built in 48 hours
              </span>
            </div>
            <h2 className="text-4xl font-black tracking-tight text-slate-950 md:text-5xl lg:text-6xl">
              Merchant<br />Offer Hub
            </h2>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-600">
              Designing the operating system for Mastercard's offer ecosystem — from fragmented manual campaigns to a governed, scalable network asset.
            </p>
          </div>

          <div className="flex flex-col justify-between gap-6 rounded-[1.5rem] border border-violet-100 bg-white/80 p-6 md:min-w-[260px]">
            <div className="space-y-4 text-sm">
              {[
                { label: 'My role', value: 'Strategic Product Lead' },
                { label: 'Context', value: 'Qurable × Mastercard' },
                { label: 'Output', value: 'Demo · Spec · Strategy' },
                { label: 'Built with', value: 'Claude AI · HTML · JS' },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">{label}</p>
                  <p className="mt-0.5 font-semibold text-slate-900">{value}</p>
                </div>
              ))}
            </div>
            <TrackedExternalLink
              href={DEMO_URL}
              eventName="mastercard_demo_click"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-violet-600 px-5 py-3 text-[11px] font-bold uppercase tracking-[0.24em] text-white transition hover:bg-violet-700"
            >
              View live demo
              <ArrowUpRight className="h-4 w-4" />
            </TrackedExternalLink>
          </div>
        </div>
      </section>

      {/* ── 01 · The Problem ─────────────────────────────────── */}
      <section className="space-y-6 pt-12">
        <SectionLabel number="01" total="07" title="The Problem" />
        <p className="max-w-2xl text-base leading-7 text-slate-600">
          Offers exist. A system to operate them doesn't. Mastercard has a global network of merchants, issuers, and cardholders — but no infrastructure to make offers work at scale.
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          <ProblemCard
            title="Fragmentation"
            body="Every campaign starts from scratch. Offers are managed across teams, markets, and channels with no shared inventory."
          />
          <ProblemCard
            title="Manual overhead"
            body="There's no self-service layer for merchants. Every intake is manual, every review is ad hoc, no audit trail."
          />
          <ProblemCard
            title="No reusability"
            body="Approved offers die after one campaign. No library of vetted, issuer-ready offers that a bank can activate without re-approving work already done."
          />
          <ProblemCard
            title="Missing monetization"
            body="Mastercard has the distribution. What's missing is the middleware: a platform that converts merchant intent into governed, reusable network value."
          />
        </div>
        <Quote
          text="The problem isn't that offers don't exist. It's that every offer is an island. We needed to design the mainland."
          attribution="Strategic framing — Qurable product alignment session, 2026"
        />
      </section>

      {/* ── 02 · The System ──────────────────────────────────── */}
      <section className="space-y-6 pt-12">
        <SectionLabel number="02" total="07" title="The System" />
        <p className="max-w-2xl text-base leading-7 text-slate-600">
          Three actors. One governed flow. The design decision that unlocked everything: stop modeling this as a tool for one actor — model it as an operating layer between three.
        </p>
        <div className="grid gap-4 md:grid-cols-3">
          <ActorCard
            number="01"
            actor="Merchant"
            role="Creates & configures"
            items={[
              'Self-service onboarding',
              'Reusable merchant profile',
              'Offer wizard with commercial step',
              'Funding model: merchant / co-funded / awareness',
              'Responds to governance change requests',
            ]}
          />
          <ActorCard
            number="02"
            actor="Platform"
            role="Governs & validates"
            items={[
              'Automated quality & content checks',
              'Rules engine (geo, issuer, channel)',
              'Multi-stage governance queue',
              'Approve / reject / request changes',
              'Full audit trail with SLA tracking',
            ]}
          />
          <ActorCard
            number="03"
            actor="Issuer"
            role="Discovers & activates"
            items={[
              'Searchable approved offer library',
              'Filter by market, category, segment',
              'One-click activation to allowed channels',
              'Issuer-level performance analytics',
              'Clone and renew workflows',
            ]}
          />
        </div>
      </section>

      {/* ── 03 · The Demo ────────────────────────────────────── */}
      <section className="space-y-6 pt-12">
        <SectionLabel number="03" total="07" title="The Demo" />
        <p className="max-w-2xl text-base leading-7 text-slate-600">
          A working prototype, not a slide deck. Built in HTML, CSS, and JavaScript — functional enough to walk through the complete merchant-to-issuer journey end-to-end.
        </p>

        <div className="overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
          {/* Browser chrome */}
          <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-slate-200" />
              <span className="h-3 w-3 rounded-full bg-slate-200" />
              <span className="h-3 w-3 rounded-full bg-slate-200" />
            </div>
            <span className="text-[11px] font-medium text-slate-400">uffdg.github.io/priceless-demo</span>
            <div />
          </div>

          {/* iframe preview with fade-out + CTA */}
          <div className="relative">
            <iframe
              src={DEMO_URL}
              title="Mastercard Merchant Offer Hub — Live Demo"
              className="w-full border-0 pointer-events-none"
              style={{ height: '680px' }}
              scrolling="no"
              loading="lazy"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-white via-white/80 to-transparent" />
            {/* CTA */}
            <div className="absolute inset-x-0 bottom-6 flex justify-center">
              <TrackedExternalLink
                href={DEMO_URL}
                eventName="mastercard_demo_click_preview"
                className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-6 py-3 text-[11px] font-bold uppercase tracking-[0.24em] text-white shadow-lg transition hover:bg-violet-700"
              >
                Explore full demo
                <ArrowUpRight className="h-4 w-4" />
              </TrackedExternalLink>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          {[
            'Full platform overview — merchant dashboard',
            'Offer creation wizard — commercial & distribution',
            'Governance queue — platform review view',
            'Approved offer library — issuer discovery',
            'Analytics dashboard — merchant performance',
          ].map((item) => (
            <span
              key={item}
              className="rounded-full border border-slate-200 bg-white px-4 py-2 text-[11px] font-medium text-slate-500"
            >
              {item}
            </span>
          ))}
        </div>
      </section>

      {/* ── 04 · The Process ─────────────────────────────────── */}
      <section className="space-y-2 pt-12">
        <SectionLabel number="04" total="07" title="The Process" />
        <p className="max-w-2xl pb-2 text-base leading-7 text-slate-600">
          From brief to working system in one sprint. A compressed cycle of strategic alignment, functional specification, and build — from deck to demo in 48 hours.
        </p>

        <div className="rounded-[2rem] border border-white/70 bg-white/60 px-6 py-2 shadow-[0_24px_80px_rgba(15,23,42,0.05)] backdrop-blur-xl md:px-10">
          <ProcessStep
            number="1"
            title="Strategic framing"
            description="The first question wasn't 'what should we build?' — it was 'what kind of asset are we creating for Qurable?' Mapping the three actors and their incentives before touching any screen design determined every decision that followed."
            tags={['Actor model', 'Network analysis', 'Competitive framing']}
          />
          <ProcessStep
            number="2"
            title="Functional specification"
            description="Before any screen was designed, I wrote a complete functional spec covering all 9 modules: state models, branching logic, if/then edge cases."
            tags={['28-page spec', 'State machines', 'Data model', '80+ requirements']}
          />
          <ProcessStep
            number="3"
            title="Roadmap correction"
            description="The original roadmap proposed a 14-week MVP that contained net-new modules the team had underestimated. I identified critical gaps and corrected the timeline to 16 weeks with explicit phase gates and dependency flags."
            tags={['Risk identification', 'Phased delivery', 'Dependency mapping']}
          />
          <ProcessStep
            number="4"
            title="Demo build with AI"
            description="Figma was used to extract the initial style foundations and navigation patterns from Qurable's existing product. From there, the demo was built in HTML, CSS, and JavaScript with Claude as build partner — the product runs on Qurable's infrastructure as a white label, so the design language had to start from that base."
            tags={['Claude AI', 'Codex', 'HTML / CSS / JS', 'Figma', 'White label']}
          />
          <ProcessStep
            number="5"
            title="C-suite presentation prep"
            description="The demo was built for a 15-minute slot with Mastercard executives. The script was written around conviction moments — not feature explanations — with objection handling pre-loaded for the three most likely questions."
            tags={['15-min exec demo', 'Scripted walkthrough', 'Objection prep']}
          />
        </div>
      </section>

      {/* ── 05 · Building with AI ────────────────────────────── */}
      <section className="space-y-6 pt-12">
        <SectionLabel number="05" total="07" title="Building with AI" />
        <p className="max-w-2xl text-base leading-7 text-slate-600">
          AI as build partner, not tool. Claude drove the strategy layer — spec, roadmap, functional doc, presentation script, and this portfolio page. Codex came in to refine UI details and polish the front-end output.
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          <DeliverableCard
            icon="📄"
            title="Functional specification"
            description="28-page implementation-ready spec. Covers 9 modules, 80+ requirements, 60+ if/then edge cases, state machines, and API boundaries."
          />
          <DeliverableCard
            icon="🗺️"
            title="Roadmap analysis"
            description="Identified 3 critical blockers in the original 14-week MVP timeline, corrected the phases, and mapped quick wins for Phase 0."
          />
          <DeliverableCard
            icon="⚙️"
            title="Working demo"
            description="Full merchant-to-issuer flow built in HTML/CSS/JS — no Figma, no manual code. Governance state machine and all three actor views are functional in the browser."
          />
          <DeliverableCard
            icon="🎯"
            title="Demo script & strategy"
            description="15-minute C-suite demo script structured around conviction moments, not feature walkthroughs. Plus a strategic framing document on network effects."
          />
        </div>
        <Quote
          text="I stopped thinking about Figma as the design surface. The browser is the design surface. The spec is the brief. The conversation is the process."
          attribution="Personal reflection on AI-assisted product design practice"
        />
      </section>

      {/* ── 06 · The Strategic Bet ───────────────────────────── */}
      <section className="space-y-6 pt-12">
        <SectionLabel number="06" total="07" title="The Strategic Bet" />
        <p className="max-w-2xl text-base leading-7 text-slate-600">
          This isn't a feature. It's the beginning of a network. The Mastercard deal converts Qurable from a bilateral SaaS into a multilateral network — with Mastercard as the first node, not the only one.
        </p>
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { metric: '1×', label: 'Merchant onboards once,\nactivates across all issuers' },
            { metric: '3', label: 'Actor model: Merchant,\nPlatform, Issuer' },
            { metric: '∞', label: 'Network nodes:\nMastercard is just the first' },
          ].map(({ metric, label }) => (
            <div
              key={metric}
              className="rounded-2xl border border-violet-100 bg-violet-50/60 p-6 text-center"
            >
              <p className="text-5xl font-black tracking-tight text-violet-700">{metric}</p>
              <p className="mt-3 text-sm leading-6 text-slate-600 whitespace-pre-line">{label}</p>
            </div>
          ))}
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_4px_24px_rgba(15,23,42,0.04)]">
          <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.2em] text-violet-500">The Snapp connection</p>
          <p className="text-sm leading-7 text-slate-600">
            Qurable's SMB product (Snapp) already has benefits, campaigns, missions, and tiers. An SMB merchant using Snapp is <strong>one toggle away</strong> from publishing their offer into the Mastercard network — no re-onboarding, no new integration. Snapp becomes the high-velocity onramp for the long tail of merchants that enterprise onboarding can't reach at scale.
          </p>
        </div>
        <Quote
          text="The critical contract clause: merchants must be entities of the Qurable platform — not of Mastercard. If that's not in the agreement, Qurable builds the moat for someone else."
          attribution="Strategic risk flag — network asset ownership analysis"
        />
      </section>

      {/* ── 07 · Outcomes & Next Steps ───────────────────────── */}
      <section className="space-y-6 pt-12">
        <SectionLabel number="07" total="07" title="Outcomes & Next Steps" />

        <div className="space-y-3">
          {[
            'Functional demo — complete merchant-to-issuer flow, working in browser, hosted on GitHub Pages',
            '28-page functional specification covering all 9 modules, implementation-ready for engineering scoping',
            'Corrected roadmap with critical blockers flagged and phase gates defined (Phase 0–3, 64 weeks total)',
            '15-minute C-suite demo script with objection handling for the Mastercard executive review',
            'Strategic framing document: network effect model, Snapp integration path, data ownership risk analysis',
          ].map((item) => (
            <div
              key={item}
              className="flex items-start gap-4 rounded-2xl border border-slate-200/80 bg-white px-5 py-4"
            >
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-violet-100 text-[10px] font-bold text-violet-700">
                ✓
              </span>
              <p className="text-sm leading-7 text-slate-700">{item}</p>
            </div>
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {[
            {
              phase: 'Phase 1 · Weeks 7–22',
              label: 'MVP Core',
              body: 'Merchant auth, full profile, extended wizard, basic governance, Offer Library, one live channel, merchant analytics.',
            },
            {
              phase: 'Phase 2 · Weeks 23–42',
              label: 'Scale',
              body: 'Rules Engine, Issuer Discovery, SLA automation, multi-channel distribution, Snapp integration, issuer reporting.',
            },
            {
              phase: 'Phase 3 · Weeks 43–64',
              label: 'Intelligence',
              body: 'ML-assisted validation, transaction attribution, settlement & reconciliation, AI optimization, network-scale model.',
            },
          ].map(({ phase, label, body }) => (
            <div key={phase} className="rounded-2xl border border-violet-100 bg-violet-50/40 p-6">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-violet-500">{phase}</p>
              <p className="mt-1 font-black text-slate-950">{label}</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">{body}</p>
            </div>
          ))}
        </div>

        <div className="flex justify-center pt-4">
          <TrackedExternalLink
            href={DEMO_URL}
            eventName="mastercard_demo_click_footer"
            className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-7 py-3.5 text-[11px] font-bold uppercase tracking-[0.24em] text-white transition hover:bg-violet-700"
          >
            Open live demo
            <ArrowUpRight className="h-4 w-4" />
          </TrackedExternalLink>
        </div>
      </section>
    </article>
  );
};

export default MastercardStoryProject;

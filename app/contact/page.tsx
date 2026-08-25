import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { MailIcon } from "@/components/icons";
import { getContactPage } from "@/lib/contact";
import { getIconComponent } from "@/lib/iconMap";
import { resolveRobots, resolveCanonical, resolveOg } from "@/lib/seo";

export const dynamic = "force-dynamic";

// Every field below (title, description, canonical, indexing, follow, OG)
// comes from the admin-editable Contact page content (lib/contact.ts) —
// nothing here is hardcoded. See /admin/contact.
export async function generateMetadata(): Promise<Metadata> {
  const contact = await getContactPage();
  const og = resolveOg(
    { ogTitle: contact.ogTitle, ogDescription: contact.ogDescription, ogImage: contact.ogImage },
    { title: contact.metaTitle, description: contact.metaDescription }
  );
  return {
    title: contact.metaTitle,
    description: contact.metaDescription,
    alternates: { canonical: resolveCanonical("/contact", contact.canonicalUrl) },
    robots: resolveRobots(contact.noIndex, contact.noFollow),
    openGraph: { title: og.title, description: og.description, url: "/contact", images: og.image ? [{ url: og.image }] : undefined },
    twitter: { card: "summary_large_image", title: og.title, description: og.description, images: og.image ? [og.image] : undefined },
  };
}

export default async function ContactPage() {
  const contact = await getContactPage();

  return (
    <>
      <Header />
      <main className="bg-bosphorus-ivory min-h-screen py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="text-center">
            <span className="inline-block rounded-md bg-white border border-bosphorus-sand/60 px-3 py-1 text-xs font-bold uppercase tracking-wider text-bosphorus-gold shadow-sm">
              {contact.heroEyebrow}
            </span>
            <h1 className="mt-3 font-display text-3xl font-bold text-bosphorus-navy sm:text-4xl">
              {contact.heroHeading}
            </h1>
            <div
              className="rich-content mx-auto mt-3 max-w-md text-bosphorus-charcoal/80 leading-relaxed text-sm sm:text-base"
              dangerouslySetInnerHTML={{ __html: contact.heroSubheading }}
            />
          </div>

          {/* Primary email card */}
          <div className="mt-10 flex flex-col items-center gap-3.5 rounded-2xl border border-bosphorus-sand/60 bg-white p-8 sm:p-10 text-center shadow-sm">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-bosphorus-navy text-white shadow-md">
              <MailIcon className="h-6 w-6" />
            </span>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-bosphorus-charcoal/60">{contact.emailLabel}</p>
              <a
                href={`mailto:${contact.email}`}
                className="mt-1 block break-all font-display text-2xl font-bold text-bosphorus-navy hover:text-bosphorus-gold transition-colors"
              >
                {contact.email}
              </a>
            </div>
            <p className="text-xs text-bosphorus-charcoal/80 max-w-sm">{contact.emailNote}</p>
          </div>

          {/* What we can help with */}
          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            {contact.reasons.map(({ icon, title, body }) => {
              const Icon = getIconComponent(icon);
              return (
                <div key={title} className="rounded-2xl border border-bosphorus-sand/60 bg-white p-5.5 shadow-sm text-center sm:text-left transition hover:shadow-md hover:border-bosphorus-gold/40">
                  <span className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-bosphorus-sky border border-bosphorus-sand/60 text-bosphorus-navy sm:mx-0">
                    <Icon className="h-5 w-5" />
                  </span>
                  <p className="mt-4 text-sm font-bold text-bosphorus-navy">{title}</p>
                  <div
                    className="rich-content mt-1.5 text-xs text-bosphorus-charcoal/80 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: body }}
                  />
                </div>
              );
            })}
          </div>

          <div
            className="rich-content mt-10 border-t border-bosphorus-sand/60 pt-8 text-center text-xs sm:text-sm text-bosphorus-charcoal/60"
            dangerouslySetInnerHTML={{ __html: contact.footerNote }}
          />

          <div className="mt-8 flex flex-col items-center gap-4 rounded-2xl bg-bosphorus-navy p-7 text-center text-white shadow-xl border border-bosphorus-navy">
            <p className="text-base font-bold text-white">{contact.ctaHeading}</p>
            <a
              href="/#tours"
              className="rounded-lg bg-bosphorus-gold px-6 py-2.5 text-xs font-bold text-white shadow-md transition hover:opacity-90 hover:scale-[1.02]"
            >
              {contact.ctaButtonLabel} →
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

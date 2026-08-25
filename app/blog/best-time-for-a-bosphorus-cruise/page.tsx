import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlogPostBody from "@/components/BlogPostBody";
import BlogSidebar from "@/components/BlogSidebar";
import QuickAnswer from "@/components/QuickAnswer";
import RelatedPosts from "@/components/RelatedPosts";
import SafeImage from "@/components/SafeImage";
import { CalendarIcon, ClockPayIcon, TicketIcon } from "@/components/icons";
import { getPost, getPosts } from "@/lib/posts";
import { getHomepageContent } from "@/lib/homepage";
import { resolveRobots, resolveCanonical, resolveOg, buildArticleJsonLd, buildBreadcrumbJsonLd } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";
import { extractTableOfContents } from "@/lib/tableOfContents";

const slug = "best-time-for-a-bosphorus-cruise";

// Content lives in /data/posts.json, editable from /admin/posts — render
// dynamically so edits show up without a rebuild.
export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const post = await getPost(slug);
  if (!post) return {};
  const og = resolveOg(
    { ogTitle: post.ogTitle, ogDescription: post.ogDescription, ogImage: post.ogImage },
    { title: post.metaTitle, description: post.metaDescription, image: post.image }
  );
  return {
    title: post.metaTitle,
    description: post.metaDescription,
    keywords: [
      "best time for a Bosphorus cruise",
      "Bosphorus cruise sunset",
      "when to take a Bosphorus cruise",
      "Bosphorus cruise crowds",
    ],
    alternates: { canonical: resolveCanonical(`/blog/${slug}`, post.canonicalUrl) },
    robots: resolveRobots(post.noIndex, post.noFollow),
    openGraph: {
      title: og.title,
      description: og.description,
      url: `/blog/${slug}`,
      type: "article",
      images: og.image ? [{ url: og.image, alt: post.imageAlt }] : undefined,
    },
    twitter: { card: "summary_large_image", title: og.title, description: og.description, images: og.image ? [og.image] : undefined },
  };
}

function formatDate(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default async function Post() {
  const [post, allPosts, { sections }] = await Promise.all([getPost(slug), getPosts(), getHomepageContent()]);
  const s = sections.blogPage;
  if (!post) notFound();

  const articleJsonLd = buildArticleJsonLd({
    headline: post.title,
    description: post.metaDescription,
    image: post.image,
    datePublished: post.date,
    dateModified: post.updatedAt || post.date,
    url: `${SITE_URL}/blog/${slug}`,
    authorName: "Bosphorus Boat Cruise Tickets",
    siteName: "Bosphorus Boat Cruise Tickets",
  });

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: post.title, path: `/blog/${slug}` },
  ]);

  // Auto-built from the article's own H2/H3 headings — see
  // lib/tableOfContents.ts. "Quick Answer" is prepended by hand since it's
  // its own component/field rather than a heading inside `content`.
  const { toc: headingToc, html: contentHtml } = extractTableOfContents(post.content);
  const toc = post.quickAnswer.trim()
    ? [{ id: "quick-answer", text: s.quickAnswerLabel, level: 2 as const }, ...headingToc]
    : headingToc;
  const popularPosts = allPosts.filter((p) => p.slug !== post.slug);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        <div className="mx-auto max-w-6xl px-4 pt-6 sm:px-6">
          <Link href="/blog" className="inline-flex items-center gap-1 text-sm font-medium text-bosphorus-navy hover:text-bosphorus-gold transition-colors">
            {s.backToGuidesText}
          </Link>

          <nav aria-label="Breadcrumb" className="mt-3 text-xs font-medium text-bosphorus-charcoal/80">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li>
                <Link href="/" className="hover:text-bosphorus-gold transition-colors">Home</Link>
              </li>
              <li className="text-bosphorus-charcoal/40">&gt;</li>
              <li>
                <Link href="/blog" className="hover:text-bosphorus-gold transition-colors">Blog</Link>
              </li>
              <li className="text-bosphorus-charcoal/40">&gt;</li>
              <li className="font-semibold text-bosphorus-navy line-clamp-1" aria-current="page">{post.title}</li>
            </ol>
          </nav>

          <div className="mt-5">
            <span className="inline-block rounded-md bg-white border border-bosphorus-sand/60 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-bosphorus-gold shadow-sm">
              {post.category}
            </span>

            <h1 className="mt-3.5 font-display text-3xl font-bold leading-tight text-bosphorus-navy sm:text-4xl lg:text-5xl">
              {post.title}
            </h1>

            {post.excerpt && (
              <p className="mt-3.5 max-w-3xl text-sm leading-relaxed text-bosphorus-charcoal/80 sm:text-base">
                {post.excerpt}
              </p>
            )}

            <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-medium text-bosphorus-charcoal/80">
              <span className="inline-flex items-center gap-1.5">
                <CalendarIcon className="h-4 w-4 text-bosphorus-gold" />
                {formatDate(post.date)}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <ClockPayIcon className="h-4 w-4 text-bosphorus-gold" />
                {post.readTime}
              </span>
            </div>

            <div className="relative mt-6 aspect-[16/9] sm:aspect-[21/10] w-full overflow-hidden rounded-2xl border border-bosphorus-sand/60 shadow-sm bg-bosphorus-navy">
              <SafeImage
                src={post.image}
                alt={post.imageAlt || post.title}
                fill
                priority
                quality={70}
                sizes="(min-width: 1152px) 1152px, 100vw"
                className="object-cover"
              />
            </div>
          </div>

          <div className="mt-10 pb-20 lg:grid lg:grid-cols-[1fr_280px] lg:gap-10">
            <div>
              {post.quickAnswer.trim() && (
                <QuickAnswer label={s.quickAnswerLabel}>{post.quickAnswer}</QuickAnswer>
              )}

              <BlogPostBody
                content={contentHtml}
                recommendedTourId={post.recommendedTourId}
                showRecommendedTour={!!post.recommendedTourAfterBlock}
              />

              <div className="mt-12 flex flex-col items-center justify-between gap-5 rounded-2xl bg-bosphorus-navy p-6 text-center text-white sm:flex-row sm:text-left shadow-md border border-bosphorus-navy">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/10 text-bosphorus-gold border border-white/15 shadow-sm">
                    <TicketIcon className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-display text-base font-bold text-white">{post.ctaHeading}</p>
                    <p className="mt-0.5 text-xs text-white/80">{post.ctaBody}</p>
                  </div>
                </div>
                <a
                  href={post.ctaButtonHref}
                  className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-bosphorus-gold px-5 py-2.5 text-xs font-bold text-white shadow-sm transition hover:opacity-90 hover:scale-[1.02]"
                >
                  {post.ctaButtonText}
                </a>
              </div>

              <div className="mt-12">
                <RelatedPosts slug={post.slug} />
              </div>
            </div>

            <div className="mt-12 lg:mt-0">
              <BlogSidebar
                slug={post.slug}
                popularPosts={popularPosts}
                toc={toc}
                tocLabel={s.tocLabel}
                relatedHeading={s.sidebarRelatedHeading}
                compareLinkText={s.sidebarCompareLinkText}
                recommendedBadge={s.sidebarRecommendedBadge}
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
    </>
  );
}

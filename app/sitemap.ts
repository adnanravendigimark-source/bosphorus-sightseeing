import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { getPosts } from "@/lib/posts";
import { getHomepageContent } from "@/lib/homepage";
import { getPrivacyPolicy } from "@/lib/legal";
import { getBlogSeoSettings } from "@/lib/settings";
import { getAboutPage } from "@/lib/about";
import { getContactPage } from "@/lib/contact";

// Cached for an hour instead of force-dynamic. This route was doing 6
// parallel live Neon queries on *every single request* with zero caching —
// fine for a normal browser fetch, but Googlebot's sitemap fetcher is far
// less patient than that, and a cold Vercel function + cold DB connection
// occasionally pushed the response past its timeout. That's the most likely
// cause of Search Console's "Sitemap could not be read" error even though
// the file loads fine when checked by hand. Revalidating hourly means
// almost every crawl gets served from cache in a few ms; a sitemap doesn't
// need to be real-time fresh, and a new blog post shows up within the hour.
export const revalidate = 3600;

// Auto-generated (revalidated hourly — see above) and served at
// /sitemap.xml. Submit that URL in Google Search Console once the site is
// live.
//
// A URL only belongs in the sitemap if it is indexable and do-follow (noIndex: false, noFollow: false).
// Every page is index/follow by default; a page only drops out of the sitemap
// once its toggle is switched off in the admin dashboard.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [homepage, policy, posts, blogSeo, about, contact] = await Promise.all([
    getHomepageContent(),
    getPrivacyPolicy(),
    getPosts(),
    getBlogSeoSettings(),
    getAboutPage(),
    getContactPage(),
  ]);

  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    ...(homepage.noIndex || homepage.noFollow
      ? []
      : [{ url: `${SITE_URL}/`, lastModified: now, changeFrequency: "daily" as const, priority: 1.0 }]),
    ...(about.noIndex || about.noFollow
      ? []
      : [{ url: `${SITE_URL}/about`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.8 }]),
    ...(contact.noIndex || contact.noFollow
      ? []
      : [{ url: `${SITE_URL}/contact`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.7 }]),
    ...(blogSeo.noIndex || blogSeo.noFollow
      ? []
      : [{ url: `${SITE_URL}/blog`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.8 }]),
    ...(policy.noIndex || policy.noFollow
      ? []
      : [{ url: `${SITE_URL}/privacy-policy`, lastModified: now, changeFrequency: "yearly" as const, priority: 0.3 }]),
  ];

  const postRoutes: MetadataRoute.Sitemap = posts
    .filter((post) => !post.noIndex && !post.noFollow)
    .map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: post.updatedAt || post.date ? new Date(post.updatedAt || post.date) : now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }));

  return [...staticRoutes, ...postRoutes];
}

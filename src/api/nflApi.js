import axios from "axios";

// ESPN's public (unofficial) NFL news API.
const ESPN_NEWS_URL =
  "https://site.api.espn.com/apis/site/v2/sports/football/nfl/news";

function normalizeArticle(article) {
  const id = String(article.id ?? article.dataSourceIdentifier ?? "");
  const headline = article.headline || article.title || "Untitled";
  const description = article.description || "";
  const story = article.story || description;

  const category =
    article.categories?.find((c) => c.type === "league")?.description ||
    article.categories?.[0]?.description ||
    article.type ||
    "NFL News";

  const team =
    article.categories?.find((c) => c.type === "team")?.description || "NFL";

  const image =
    article.images?.[0]?.url ||
    article.images?.[0]?.href ||
    null;

  const published = article.published || article.lastModified;
  const date = published
    ? new Date(published).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "Recent";

  // Rough read time based on description length (fallback)
  const wordCount = (story || description).split(/\s+/).length;
  const minutes = Math.max(1, Math.round(wordCount / 200));

  return {
    id,
    category,
    title: headline,
    excerpt: description,
    body: story,
    author: article.byline || "ESPN Staff",
    team,
    date,
    readTime: `${minutes} min read`,
    image,
    link: article.links?.web?.href || null,
  };
}

/**
 * Fetch the latest NFL news articles from ESPN.
 * @param {object} [opts]
 * @param {number} [opts.limit] - Max number of articles to return.
 * @returns {Promise<Array>} normalized posts
 */
export async function fetchNflPosts({ limit } = {}) {
  const { data } = await axios.get(ESPN_NEWS_URL, {
    params: limit ? { limit } : undefined,
  });

  const articles = Array.isArray(data?.articles) ? data.articles : [];
  return articles.map(normalizeArticle);
}

let cachedPosts = null;
let cachedAt = 0;
const CACHE_MS = 60_000; // 1 minute

export async function fetchNflPostById(id) {
  const now = Date.now();
  if (!cachedPosts || now - cachedAt > CACHE_MS) {
    cachedPosts = await fetchNflPosts({ limit: 50 });
    cachedAt = now;
  }
  return cachedPosts.find((p) => p.id === String(id)) || null;
}

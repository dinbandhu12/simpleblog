const app = document.querySelector("#app");
const themeToggle = document.querySelector(".theme-toggle");
const manifestPath = "blogpost/posts.json";

const escapeHtml = (value = "") =>
  value.replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  })[char]);

const slugify = (value = "") =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const visualThemes = [
  { className: "theme-sage", label: "Journal" },
  { className: "theme-ink", label: "Essay" },
  { className: "theme-clay", label: "Notes" },
  { className: "theme-mist", label: "Signal" },
  { className: "theme-olive", label: "Field" },
  { className: "theme-rust", label: "Study" },
];

async function loadPosts() {
  const response = await fetch(manifestPath);
  if (!response.ok) {
    throw new Error("Could not load blogpost/posts.json");
  }

  const manifest = await response.json();
  const posts = await Promise.all(
    manifest.posts.map(async (entry) => {
      const postResponse = await fetch(`blogpost/${entry.file}`);
      if (!postResponse.ok) {
        throw new Error(`Could not load blogpost/${entry.file}`);
      }

      const markdown = await postResponse.text();
      const parsed = parseMarkdownFile(markdown);
      const meta = {
        ...entry,
        ...parsed.meta,
      };

      meta.slug = meta.slug || slugify(meta.title || entry.file.replace(/\.md$/i, ""));
      meta.excerpt = meta.excerpt || createExcerpt(parsed.content);
      meta.date = meta.date || "";
      meta.category = meta.category || "Journal";
      meta.visual = visualThemes[Math.abs(hashString(meta.slug)) % visualThemes.length];

      const content = normalizeMarkdownContent(parsed.content, meta.title);

      return {
        ...meta,
        markdown: content,
        html: markdownToHtml(content),
      };
    })
  );

  return posts.sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));
}

function hashString(value) {
  return value.split("").reduce((total, char) => {
    return ((total << 5) - total + char.charCodeAt(0)) | 0;
  }, 0);
}

function normalizeTitle(value = "") {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function normalizeMarkdownContent(markdown, title = "") {
  const lines = markdown.trim().split(/\r?\n/);
  const firstContentIndex = lines.findIndex((line) => line.trim());

  if (firstContentIndex === -1) return "";

  const firstLine = lines[firstContentIndex].trim();
  const firstHeading = firstLine.match(/^#\s+(.+)$/);

  if (firstHeading && (title || normalizeTitle(firstHeading[1]) === normalizeTitle(title))) {
    lines.splice(firstContentIndex, 1);
  }

  return lines.join("\n").trim();
}

function parseMarkdownFile(markdown) {
  const frontmatter = markdown.match(/^---\s*([\s\S]*?)\s*---\s*([\s\S]*)$/);
  if (!frontmatter) {
    return {
      meta: {},
      content: markdown.trim(),
    };
  }

  const meta = {};
  frontmatter[1].split(/\r?\n/).forEach((line) => {
    const separator = line.indexOf(":");
    if (separator === -1) return;
    const key = line.slice(0, separator).trim();
    const value = line.slice(separator + 1).trim().replace(/^["']|["']$/g, "");
    meta[key] = value;
  });

  return {
    meta,
    content: frontmatter[2].trim(),
  };
}

function createExcerpt(markdown) {
  return markdown
    .replace(/^#+\s+/gm, "")
    .replace(/[*_`>#-]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 155);
}

function markdownToHtml(markdown) {
  const html = [];
  const lines = markdown.split(/\r?\n/);
  let paragraph = [];
  let listItems = [];
  let listType = "";
  let quote = [];
  let code = [];
  let inCode = false;

  const flushParagraph = () => {
    if (!paragraph.length) return;
    html.push(`<p>${inlineMarkdown(paragraph.join(" "))}</p>`);
    paragraph = [];
  };

  const flushList = () => {
    if (!listItems.length) return;
    const tag = listType === "ol" ? "ol" : "ul";
    html.push(`<${tag}>${listItems.map((item) => `<li>${inlineMarkdown(item)}</li>`).join("")}</${tag}>`);
    listItems = [];
    listType = "";
  };

  const flushQuote = () => {
    if (!quote.length) return;
    html.push(`<blockquote>${inlineMarkdown(quote.join(" "))}</blockquote>`);
    quote = [];
  };

  const flushCode = () => {
    html.push(`<pre><code>${escapeHtml(code.join("\n"))}</code></pre>`);
    code = [];
  };

  lines.forEach((line) => {
    const trimmed = line.trim();

    if (/^```/.test(trimmed)) {
      if (inCode) {
        flushCode();
        inCode = false;
      } else {
        flushParagraph();
        flushList();
        flushQuote();
        inCode = true;
      }
      return;
    }

    if (inCode) {
      code.push(line);
      return;
    }

    if (!trimmed) {
      flushParagraph();
      flushList();
      flushQuote();
      return;
    }

    if (/^!\[[^\]]*]\([^)]+\)$/.test(trimmed)) {
      flushParagraph();
      flushList();
      flushQuote();
      return;
    }

    const heading = trimmed.match(/^(#{1,3})\s+(.+)$/);
    if (heading) {
      flushParagraph();
      flushList();
      flushQuote();
      const tag = heading[1].length >= 3 ? "h3" : "h2";
      html.push(`<${tag}>${inlineMarkdown(heading[2])}</${tag}>`);
      return;
    }

    if (/^>\s?/.test(trimmed)) {
      flushParagraph();
      flushList();
      quote.push(trimmed.replace(/^>\s?/, ""));
      return;
    }

    const unordered = trimmed.match(/^[-*]\s+(.+)$/);
    if (unordered) {
      flushParagraph();
      flushQuote();
      if (listType && listType !== "ul") flushList();
      listType = "ul";
      listItems.push(unordered[1]);
      return;
    }

    const ordered = trimmed.match(/^\d+\.\s+(.+)$/);
    if (ordered) {
      flushParagraph();
      flushQuote();
      if (listType && listType !== "ol") flushList();
      listType = "ol";
      listItems.push(ordered[1]);
      return;
    }

    flushList();
    flushQuote();
    paragraph.push(trimmed);
  });

  flushParagraph();
  flushList();
  flushQuote();
  if (inCode) flushCode();

  return html.join("");
}

function inlineMarkdown(text) {
  return escapeHtml(text)
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(/`(.*?)`/g, "<code>$1</code>")
    .replace(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g, '<a href="$2" target="_blank" rel="noreferrer">$1</a>');
}

function formatDate(date) {
  if (!date) return "Undated";
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00`));
}

function readingTime(post) {
  const words = post.markdown.split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.ceil(words / 200))} min read`;
}

function applyTheme(theme) {
  const isDark = theme === "dark";
  document.body.dataset.theme = isDark ? "dark" : "light";
  themeToggle.setAttribute("aria-pressed", String(isDark));
  themeToggle.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
}

function renderHome(posts) {
  const lead = posts[0];
  const featured = posts.slice(0, 4);
  const articleRows = posts.map((post) => `
    <article class="post-card">
      <a class="visual-card ${post.visual.className}" href="#/post/${post.slug}" aria-label="Read ${escapeHtml(post.title)}">
        <span>${escapeHtml(post.category)}</span>
        <strong>${escapeHtml(post.visual.label)}</strong>
      </a>
      <div class="card-copy">
        <div class="article-meta">
          <span>${escapeHtml(post.category)}</span>
          <span>${formatDate(post.date)}</span>
          <span>${readingTime(post)}</span>
        </div>
        <h2>${escapeHtml(post.title)}</h2>
        <p>${escapeHtml(post.excerpt)}</p>
        <a class="text-button" href="#/post/${post.slug}">Continue reading</a>
      </div>
    </article>
  `).join("");

  app.innerHTML = `
    <section class="hero">
      <div class="hero-inner">
        <a class="hero-media visual-card ${lead.visual.className}" href="#/post/${lead.slug}" aria-label="Read ${escapeHtml(lead.title)}">
          <span>${escapeHtml(lead.category)}</span>
          <strong>${escapeHtml(lead.visual.label)}</strong>
        </a>
        <div class="hero-copy">
          <p class="eyebrow">Recent article</p>
          <h1>${escapeHtml(lead.title)}</h1>
          <p>${escapeHtml(lead.excerpt)}</p>
          <div class="hero-actions">
            <a class="text-button" href="#/post/${lead.slug}">Explore article</a>
          </div>
        </div>
      </div>
      <div class="hero-stats">
        <div class="stat"><strong>${posts.length}</strong><span>Journal essays</span></div>
        <div class="stat"><strong>${posts.reduce((total, post) => total + post.markdown.split(/\s+/).length, 0)}</strong><span>Words served</span></div>
        <div class="stat"><strong>MD</strong><span>File powered</span></div>
      </div>
    </section>

    <section class="section-title">
      <p class="eyebrow">Featured posts</p>
      <h2>The Notes</h2>
      <div class="section-rule"></div>
    </section>

    <section class="featured-grid">
      ${featured.map((post) => `
        <a class="feature-card" href="#/post/${post.slug}">
          <p class="eyebrow">${escapeHtml(post.category)}</p>
          <h3>${escapeHtml(post.title)}</h3>
          <figure class="visual-card ${post.visual.className}">
            <span>${escapeHtml(formatDate(post.date))}</span>
            <strong>${escapeHtml(post.visual.label)}</strong>
          </figure>
        </a>
      `).join("")}
    </section>

    <section class="section-title">
      <p class="eyebrow">All writing</p>
      <h2>The Articles</h2>
      <div class="section-rule"></div>
    </section>

    <section class="card-grid">
      ${articleRows}
    </section>
  `;
}

function renderPost(posts, slug) {
  const post = posts.find((item) => item.slug === slug);
  if (!post) {
    renderHome(posts);
    return;
  }

  const quoteCount = (post.html.match(/<blockquote>/g) || []).length;
  const contentClass = quoteCount > 20 ? "post-content-frame quote-collection" : "post-content-frame";

  document.title = `${post.title} | Quiet Pages`;
  app.innerHTML = `
    <article class="post-page">
      <section class="post-hero">
        <div class="article-media visual-card ${post.visual.className}">
          <span>${escapeHtml(post.category)}</span>
          <strong>${escapeHtml(post.visual.label)}</strong>
        </div>
        <div class="post-heading">
          <div class="article-meta">
            <span>${escapeHtml(post.category)}</span>
            <span>${formatDate(post.date)}</span>
            <span>${readingTime(post)}</span>
          </div>
          <h1>${escapeHtml(post.title)}</h1>
          <p class="post-excerpt">${escapeHtml(post.excerpt)}</p>
          <div class="post-stats">
            <span><strong>${readingTime(post).replace(" min read", "")}</strong>Min read</span>
            <span><strong>${post.markdown.split(/\s+/).filter(Boolean).length}</strong>Words</span>
            <span><strong>${escapeHtml(post.category)}</strong>Category</span>
          </div>
        </div>
      </section>
      <section class="${contentClass}">
        <div class="post-body">
          ${post.html}
        </div>
      </section>
      <a class="text-button back-link" href="#/">Back to articles</a>
    </article>
  `;
}

function renderError(error) {
  app.innerHTML = `
    <section class="error-box">
      <strong>Blog could not load</strong>
      <span>${escapeHtml(error.message)}</span>
    </section>
  `;
}

async function start() {
  try {
    applyTheme(localStorage.getItem("theme") || "light");
    themeToggle.addEventListener("click", () => {
      const nextTheme = document.body.dataset.theme === "dark" ? "light" : "dark";
      localStorage.setItem("theme", nextTheme);
      applyTheme(nextTheme);
    });

    const posts = await loadPosts();
    const route = () => {
      const [, page, slug] = window.location.hash.split("/");
      document.title = "Quiet Pages";
      if (page === "post" && slug) {
        renderPost(posts, slug);
      } else {
        renderHome(posts);
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    window.addEventListener("hashchange", route);
    route();
  } catch (error) {
    renderError(error);
  }
}

start();

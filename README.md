# Northfolk Journal

A static HTML, CSS, and JavaScript blog where posts are markdown files.

## Add a New Blog Post

1. Add a valid `.md` file inside `blogpost`.
2. Start the file with frontmatter:

```md
---
title: Your Article Title
date: 2026-04-22
category: Journal
image: assets/d1.jpg
excerpt: A short summary shown on the homepage.
---
```

3. Add the filename to `blogpost/posts.json`:

```json
{
  "posts": [
    {
      "file": "your-article-title.md"
    }
  ]
}
```

4. Run a local server and open the site in the browser.

```powershell
python -m http.server 5173
```

Then visit `http://localhost:5173`.

Opening `index.html` directly may block markdown loading in some browsers because the page uses `fetch()` to read `.md` files.

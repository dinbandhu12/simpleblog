---
title: Designing a Slower Content Workflow
date: 2026-04-05
category: Workflow
image: assets/d1.jpg
excerpt: How a markdown-first blog can keep publishing simple while still feeling polished and editorial.
---

## Markdown keeps the writing portable

A markdown post is easy to move, review, edit, and archive. It does not lock the writing inside a complicated editor, and it keeps the content separate from the page design.

That separation is useful. The design can improve over time while the articles remain simple files in a folder.

## Publishing a new article

Create a new `.md` file in the `blogpost` folder. Add valid frontmatter at the top, then add the filename to `blogpost/posts.json`.

```text
---
title: Your Article Title
date: 2026-04-22
category: Journal
image: assets/d1.jpg
excerpt: A short summary for the article list.
---
```

After that, refresh the website. The new article will appear automatically.

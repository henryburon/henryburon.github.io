# Henry Buron, Robotics Portfolio

Live at [henryburon.github.io](https://henryburon.github.io)

## Local development

```bash
bundle exec jekyll serve
```

Serves at <http://127.0.0.1:4000> and rebuilds automatically when you save a file.
That's the only command you normally need.

```bash
bundle exec jekyll build      # one-off build into _site/
bundle exec jekyll build --watch   # rebuild on change, but don't serve
```

If the Ruby toolchain misbehaves, `docker-compose up` runs the same thing in a container.

First time on a new machine: `bundle install` (gems install into `vendor/bundle`).

## Adding a project

Create `_posts/YYYY-MM-DD-project-name.md`:

```yaml
---
layout: post
title:  "Project Title"
categories: [ROS2, C++, SLAM]     # rendered as tech tags
image: assets/gifs/thumbnail.gif  # card thumbnail
description: "One sentence shown on the project card."
featured: true                    # true -> "Selected work" on the homepage
---
```

Everything below the front matter is normal Markdown. Don't add inline
`style=` attributes — styling lives in `assets/css/screen.css`.

## Structure

| Path | What it is |
| --- | --- |
| `assets/css/screen.css` | All site styling. Colors, type, and spacing are CSS variables in the `:root` block at the top — change the theme there. |
| `assets/css/main.scss` | Syntax highlighting for code blocks. |
| `_layouts/` | `default` (shell), `post` (project pages), `page` (About), plus category/tag archives. |
| `_includes/postbox.html` | The project card used on the homepage and archives. |
| `_pages/About.md` | The About page, served at `/HenryBuron_About`. |
| `index.html` | Homepage hero and project grid. |

## Deploying

Push to `main`; GitHub Pages builds and publishes the site.

# Run `just` on its own to start the dev server.

# Serve at http://127.0.0.1:4000, rebuilding on every save.
default: serve

serve:
    bundle exec jekyll serve

# Same, but reachable from other devices on your network (phone testing).
serve-lan:
    bundle exec jekyll serve --host 0.0.0.0

# One-off build into _site/
build:
    bundle exec jekyll build

# Force a clean rebuild — use when something looks stale.
rebuild:
    rm -rf _site
    bundle exec jekyll build

# First run on a new machine.
install:
    bundle install

# Regenerate the social preview card after editing tools/og-image.html
og:
    google-chrome --headless --disable-gpu --hide-scrollbars \
      --allow-file-access-from-files --virtual-time-budget=4000 \
      --window-size=1200,630 \
      --screenshot=assets/images/og-image.png \
      "file://$PWD/tools/og-image.html"

# Flag heavy media. Page weight is what hurts, so this goes by file size.
check-assets:
    #!/usr/bin/env bash
    echo "Files over 800 KB — compress these before committing:"
    found=0
    for f in assets/images/* assets/gifs/*; do
      [ -f "$f" ] || continue
      size=$(stat -c%s "$f")
      if [ "$size" -gt 800000 ]; then
        dims=$(identify -format "%wx%h" "$f" 2>/dev/null || echo "-")
        printf "  %7.2f MB  %-12s %s\n" "$(echo "scale=3;$size/1048576" | bc)" "$dims" "$f"
        found=1
      fi
    done
    [ "$found" -eq 0 ] && echo "  none — all good"
    exit 0

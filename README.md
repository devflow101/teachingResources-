# Teaching Resources

This repository hosts HTML teaching resources, auto-deployed via Netlify.

## Structure

- **root/**: Contains the main `index.html` listing all units.
- **Unit-X/**: Each unit has its own folder containing resources and a local `index.html`.
- **assets/**: Shared CSS and images.

## Rules

1. **Hierarchy**: Root index -> Unit index -> Resources.
2. **Paths**: ALWAYS use relative paths. Never absolute.
3. **Naming**: `Unit-X` format.
4. **Git**: Commit often. `git push` triggers deployment.

# HTML Management System

A pure HTML and CSS component library built using Nunjucks templating engine, BEM methodology, and modern CSS features.

## Project Structure

```
html-management/
├── src/
│   ├── components/          # Reusable components
│   │   ├── header/
│   │   │   ├── header.njk  # Component template
│   │   │   └── header.scss # Component styles
│   │   ├── footer/
│   │   │   ├── footer.njk
│   │   │   └── footer.scss
│   │   └── sidebar/
│   │       ├── sidebar.njk
│   │       └── sidebar.scss
│   ├── data/               # JSON data files
│   │   ├── navigation.json
│   │   ├── footer.json
│   │   └── sidebar.json
│   ├── pages/              # Page templates
│   │   └── index.njk
│   ├── templates/          # Base templates and layouts
│   │   └── layouts/
│   │       └── base.njk
│   ├── scss/              # Global styles
│   │   ├── abstracts/
│   │   │   ├── _variables.scss
│   │   │   └── _mixins.scss
│   │   ├── base/
│   │   │   └── _reset.scss
│   │   └── main.scss
│   └── assets/            # Static assets
├── dist/                  # Compiled files
├── gulpfile.js           # Build configuration
└── package.json
```

## Features

- Nunjucks templating engine
- BEM methodology for CSS
- SCSS preprocessing
- Responsive design
- Modern CSS features (Custom Properties, Flexbox, Grid)
- Component-based architecture
- Gulp automation for:
  - Nunjucks compilation
  - SCSS compilation
  - CSS minification
  - Auto-prefixing
  - Live reloading
  - Asset management

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start development server:

   ```bash
   npm start
   ```

3. Build for production:
   ```bash
   npm run build
   ```

## Using Components

Components are built using Nunjucks macros and can be imported and used in any page:

```njk
{# Import component #}
{% from "components/header/header.njk" import header %}

{# Use component with data #}
{{ header(navigation) }}
```

## Creating New Pages

1. Create a new .njk file in `src/pages/`
2. Extend the base layout:

```njk
{% extends "layouts/base.njk" %}

{% block content %}
  <!-- Your content here -->
{% endblock %}
```

## Creating New Components

1. Create a new directory in `src/components/`
2. Create component files:
   - `componentName.njk` - Component template
   - `componentName.scss` - Component styles
3. Define the component as a macro:

```njk
{% macro componentName(data) %}
  <!-- Component HTML -->
{% endmacro %}
```

4. Import the component's SCSS in `main.scss`

## Data Management

Data is stored in JSON files in the `src/data/` directory and can be accessed in templates:

```njk
{{ navigation.menu[0].text }}
```

## BEM Naming Convention

We follow the BEM (Block Element Modifier) methodology for naming CSS classes:

- Block: `block`
- Element: `block__element`
- Modifier: `block--modifier` or `block__element--modifier`

Example:

```html
<button class="button button--primary button--large">
  <span class="button__icon">→</span>
  Click me
</button>
```

## CSS Custom Properties

The project uses CSS Custom Properties for consistent theming. Main variables are defined in `src/scss/abstracts/_variables.scss`.

## Browser Support

The project supports all modern browsers and includes necessary polyfills and prefixes through Autoprefixer.

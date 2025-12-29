# Interactive US State Selector

A beautiful, Typeform-style interactive US map component with a liquid glass design aesthetic. Built with Next.js, React, and Tailwind CSS.

## Features

- **Interactive SVG Map** - Click any state on the map or use the dropdown selector
- **Liquid Glass Design** - Glassmorphism effects with smooth transitions and hover states
- **Dual Input Methods** - Select states via the map or searchable dropdown
- **Dark Mode Optimized** - Carefully crafted color palette for dark backgrounds
- **Fully Responsive** - Adapts seamlessly from mobile to desktop
- **Type-Safe** - Built with TypeScript for reliability

## Components

### MapStateSelector
The main component that combines the interactive map with state selection controls.

**Location:** `components/map-state-selector.tsx`

**Features:**
- Liquid glass visual effects with gradient overlays
- Hover and active state animations
- Automatic tooltip removal for cleaner UI
- State border visibility controls

### StateSelector
A searchable dropdown component for selecting states.

**Location:** `components/state-selector.tsx`

**Features:**
- Fuzzy search functionality
- Keyboard navigation support
- Custom styling with shadcn/ui components

## Customization

### Colors

Edit the color scheme in `components/map-state-selector.tsx`:

```typescript
const colors = useMemo(
  () => ({
    unselected: "#3d2a5c", // Base state color
    selected: "#c4b5fd",   // Selected state color
    default: "#2d2244",    // Fallback color
  }),
  [],
)
```

### Liquid Glass Effects

Modify the glassmorphism styling in the `liquidGlassStyles` section:

```typescript
const liquidGlassStyles = `
  /* Adjust drop-shadow, brightness, blur, etc. */
  [data-slot="usa-map-container"] > svg path {
    filter: drop-shadow(...);
    backdrop-filter: blur(...);
  }
`
```

### State Border Visibility

Adjust border opacity and width in the base state styling:

```css
stroke: rgba(255, 255, 255, 0.25); /* Border color and opacity */
stroke-width: 0.75; /* Border thickness */
```

### Container Background

Update the container's liquid glass background in the inline styles:

```typescript
style={{
  background: "linear-gradient(...)",
  backdropFilter: "blur(20px) saturate(180%)",
  border: "1px solid rgba(139, 92, 246, 0.15)",
}}
```

## Usage

```tsx
import { MapStateSelector } from "@/components/map-state-selector"

export default function Page() {
  return <MapStateSelector />
}
```

## Dependencies

- **react-usa-map** - Interactive US map SVG
- **shadcn/ui** - UI component library
- **Next.js 15** - React framework
- **Tailwind CSS v4** - Utility-first CSS

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## Deployment

This template is optimized for deployment on Vercel. Simply connect your repository and deploy.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/state-selection-component)

## License

MIT

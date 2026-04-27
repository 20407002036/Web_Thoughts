---
name: Thoughts
colors:
  surface: '#fcf9f4'
  surface-dim: '#dcdad5'
  surface-bright: '#fcf9f4'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3ee'
  surface-container: '#f0ede8'
  surface-container-high: '#ebe8e3'
  surface-container-highest: '#e5e2dd'
  on-surface: '#1c1c19'
  on-surface-variant: '#46483c'
  inverse-surface: '#31302d'
  inverse-on-surface: '#f3f0eb'
  outline: '#76786b'
  outline-variant: '#c6c8b8'
  surface-tint: '#56642b'
  primary: '#56642b'
  on-primary: '#ffffff'
  primary-container: '#8a9a5b'
  on-primary-container: '#253000'
  inverse-primary: '#bdce89'
  secondary: '#6e5b46'
  on-secondary: '#ffffff'
  secondary-container: '#f9dec3'
  on-secondary-container: '#75614c'
  tertiary: '#8c500a'
  on-tertiary: '#ffffff'
  tertiary-container: '#cb833d'
  on-tertiary-container: '#452400'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d9eaa3'
  primary-fixed-dim: '#bdce89'
  on-primary-fixed: '#161f00'
  on-primary-fixed-variant: '#3e4c16'
  secondary-fixed: '#f9dec3'
  secondary-fixed-dim: '#dcc2a9'
  on-secondary-fixed: '#261909'
  on-secondary-fixed-variant: '#554430'
  tertiary-fixed: '#ffdcc1'
  tertiary-fixed-dim: '#ffb877'
  on-tertiary-fixed: '#2e1600'
  on-tertiary-fixed-variant: '#6c3a00'
  background: '#fcf9f4'
  on-background: '#1c1c19'
  surface-variant: '#e5e2dd'
typography:
  h1:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  h2:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.3'
    letterSpacing: -0.01em
  h3:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Be Vietnam Pro
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.7'
  body-md:
    fontFamily: Be Vietnam Pro
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-caps:
    fontFamily: Be Vietnam Pro
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1.0'
    letterSpacing: 0.05em
rounded:
  sm: 0.5rem
  DEFAULT: 1rem
  md: 1.5rem
  lg: 2rem
  xl: 3rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1280px
  gutter: 32px
  margin: 64px
  card-padding: 40px
---

## Brand & Style
This design system centers on the intersection of organic tranquility and digital utility. The brand personality is grounded, nurturing, and quiet, designed to lower the user's heart rate upon entry. It avoids the clinical "tech" aesthetic in favor of a **Minimalist-Tactile** hybrid style. By utilizing a spacious, card-based layout on a large canvas, the interface mimics the physical act of laying out journals on a clean wooden desk. 

The emotional response should be one of "digital decompression"—moving away from high-stimulus patterns toward a meditative, slow-tech experience that encourages deep reflection for AI-assisted journaling.

## Colors
The palette is derived from natural earth tones, ensuring low eye strain during long writing sessions. 

- **Primary (Sage Green):** Used for growth-oriented actions, focus states, and primary brand moments.
- **Secondary (Sand):** The foundational tone for large structural elements and secondary containers.
- **Tertiary (Muted Terracotta):** Used sparingly for warmth, highlights, or to signal soft importance.
- **Neutral (Warm Stone):** The canvas color, providing a soft alternative to pure white to reduce glare.

Avoid high-contrast blacks; use the deep "Soft Brown" (`#4A443F`) for all primary text to maintain a gentle reading experience.

## Typography
The typographic hierarchy prioritizes readability and breathability. **Plus Jakarta Sans** provides a friendly, modern geometric touch for headlines, while **Be Vietnam Pro** offers a contemporary, approachable feel for long-form journaling text.

Line heights are intentionally generous (1.6x - 1.7x) to prevent the "wall of text" effect, allowing thoughts to feel distinct and manageable. Use the uppercase label style for metadata like timestamps or journal tags to create a clear structural distinction from narrative content.

## Layout & Spacing
The layout employs a **fixed-center grid** on a large canvas, emphasizing white space (or "sand space") to reduce cognitive load. 

- **The Canvas:** Desktop views should utilize wide margins (64px+) to prevent content from feeling crowded.
- **Card-Centricity:** Information is grouped into large, airy cards. 
- **Rhythm:** Use a consistent 8px base unit. For journaling areas, increase internal padding to 40px (card-padding) to evoke the feeling of a physical paper margin.
- **Composition:** Align the AI insight panel to the right in a 1/3 ratio, while the primary writing area occupies 2/3 of the container.

## Elevation & Depth
Depth is created through **Ambient Shadows** and **Tonal Layering** rather than hard borders. 

- **The Base:** The background is a flat, warm neutral.
- **The Cards:** Primary content cards use a very soft, multi-layered shadow (e.g., `0px 10px 40px rgba(74, 68, 63, 0.05)`). The shadow should be tinted with the "Soft Brown" color to keep it organic.
- **Interactions:** When a card is hovered or an input is focused, the shadow should expand slightly and the card may lift 2px, creating a tactile, "squishy" response that feels responsive but calm.

## Shapes
The shape language is extremely soft, leaning into the **Pill-shaped** (Level 3) category. 

- **Main Cards:** Use `rounded-3xl` (24px - 32px) to remove any visual "sharpness" from the interface.
- **Interactive Elements:** Buttons, tags, and search bars should be fully rounded (`rounded-full`) to emphasize the friendly, non-threatening nature of the AI assistant.
- **Selection States:** Active states for navigation or list items should use a subtle, rounded pill background rather than a line or checkmark.

## Components
- **Buttons:** Primary buttons use a solid Sage Green background with white text; secondary buttons use the Sand background with Brown text. All are `rounded-full`.
- **Journaling Cards:** Large white containers with `rounded-3xl` corners and soft shadows. Headers within cards should use Plus Jakarta Sans.
- **Input Fields:** Soft Brown outlines at 10% opacity, which transition to a solid Sage Green 1px border on focus. Backgrounds should be slightly off-white to distinguish from the card surface.
- **AI "Insights" Chips:** Pill-shaped elements using the Terracotta palette at low opacity (10-15%) for the background to draw soft attention to machine-generated suggestions.
- **Floating Action Button (FAB):** A large, circular button for "New Entry" should follow the user, utilizing a more pronounced version of the ambient shadow to signify its importance.
- **Mood Sliders:** Thick, rounded tracks with large, circular handles to make the interaction feel tactile and rewarding.
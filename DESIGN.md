# Design Brief

## Direction
YatraSync — Premium light-theme 3D travel platform. Bright, approachable, sophisticated. Realistic 3D hero visuals with improved lighting and depth. Saffron/amber warmth (exploration energy) + ocean blue (trust) + sage green (adventure) on clean, editorial layout. Premium SaaS aesthetic (Linear, Stripe).

## Tone
Refined, aspirational, immersive. Light backgrounds signal clarity; sophisticated 3D lighting conveys modernity. Confident use of negative space and subtle depth cues.

## Differentiation
Enhanced 3D scene with realistic materials (metallic globe, glowing airplane), improved shadow casting, and depth-of-field effects create visual wow-factor. Light theme with soft shadows (not harsh blacks) and refined card elevations convey premium quality.

## Color Palette

| Token       | OKLCH         | Role                                |
| ----------- | ------------- | ----------------------------------- |
| background  | 0.98 0.002 260| Clean off-white base                |
| foreground  | 0.18 0.01 260 | Dark navy text, high contrast       |
| card        | 0.96 0.003 260| Subtle elevated surfaces            |
| primary     | 0.72 0.18 70  | Warm saffron/amber, CTAs, energy   |
| accent      | 0.58 0.16 240 | Ocean blue, trust, secondary nav    |
| secondary   | 0.55 0.14 250 | Deeper blue for emphasis            |

## Typography

- Display: Space Grotesk — Bold, modern geometric for hero headings
- Body: DM Sans — Clean, refined for body and labels
- Scale: Hero 72px bold tight, H2 48px bold, Labels 12px uppercase, Body 16px

## Elevation & Depth

Subtle shadow hierarchy: background < card (light shadow) < elevated on hover (stronger shadow). No harsh blacks; use soft rgba(0,0,0,0.08-0.12) for naturalistic lighting. Inset highlights add refinement.

## Structural Zones

| Zone    | Background        | Border                    | Shadow         |
| ------- | ----------------- | ------------------------- | -------------- |
| Header  | card with border  | subtle 0.88 L color       | shadow-light   |
| Content | background        | none or border at 0.88 L  | card shadows   |
| Footer  | card/muted        | top border at 0.88 L      | shadow-light   |

## Spacing & Rhythm

Section gaps 4rem, card grid 1.5rem, micro 0.5rem. Generous padding emphasizes breathing room and 3D depth. Staggered entrance (200ms intervals), floating 3s loop.

## Component Patterns

- Buttons: Warm saffron primary, soft shadows, rounded 12px, smooth transitions
- Cards: Clean white bg, subtle border, refined shadows, smooth 3D hover
- Badges: Muted background with accent text, rounded-full, uppercase

## Motion

- Entrance: Fade-in-up 600ms, staggered per card (200ms intervals)
- Hover: Smooth tilt/rotate perspective, shadow elevation, scale 1.02
- Decorative: Floating 3s infinite for ambient elements

## 3D Enhancements

- Metallic globe with realistic specular highlights and ambient occlusion
- Glowing airplane with subsurface lighting on wings
- Depth-of-field and improved shadow mapping on all geometries
- Better post-processing: bloom, subtle color grading for warmth

## Constraints

- Light theme only (no dark mode variant)
- Soft shadows only (max 0.12 opacity for natural lighting)
- All colors use OKLCH tokens; no hex or rgb literals
- 3D transforms optimized for performance

## Signature Detail

Soft, realistic 3D lighting paired with clean light background creates premium modern aesthetic. Warm amber + ocean blue accents signal travel confidence without overwhelming visual noise.


# UI Specification

## Purpose

This page defines the visual contracts for the Hy-Climb SPA and corrects the older root UI notes against the live Tailwind 4 implementation. It is a reference for preserving the current mobile first interface, not a redesign brief.

## Contract

The global layout is a `zinc-50` page background with a centered `max-w-sm` white app shell. The shell is a full-height flex column with a sticky `Navbar`, routed `main`, and footer.

The app uses Pretendard Variable from jsDelivr in [`index.html`](../../../index.html), a Tailwind font family extension in [`tailwind.config.js`](../../../tailwind.config.js), and a global font rule in [`src/index.css`](../../../src/index.css). Tailwind is version `^4.2.4` in [`package.json`](../../../package.json), loaded through `@tailwindcss/vite` and `@import "tailwindcss"`.

Core tokens are `zinc-900` for primary text, active chips, and meeting buttons; `orange-600`, `orange-50`, and `orange-200` for affiliate emphasis; `zinc-200` and `zinc-100` for borders and quiet surfaces; `zinc-500` and `zinc-400` for secondary and muted text; `violet-50`, `violet-200`, `violet-700`, and `violet-900` for event banners.

Typography uses explicit Tailwind sizes. Home heading uses `text-[22px] font-extrabold tracking-tight text-zinc-900`. Detail heading uses `text-[20px] font-extrabold text-zinc-900 tracking-tight`. Card heading uses `text-[15px] font-bold text-zinc-900`. Body copy uses `text-[13px] text-zinc-700 leading-relaxed`. Section labels use `text-[10px] font-semibold uppercase tracking-widest text-zinc-400`.

Cards use `bg-white rounded-2xl border border-zinc-200 overflow-hidden`. Primary rounded controls use `rounded-xl`, chips use `rounded-full`, and small icon buttons use `rounded-lg`. Default direction buttons are white with `border-zinc-200` and `text-zinc-900`. Meeting direction buttons are `bg-zinc-900 text-white`. Disabled map buttons are `bg-zinc-100 text-zinc-400 border border-zinc-200 cursor-not-allowed`.

Center images use fixed heights: cards use `h-[160px]`, detail carousel uses `h-[220px]`, and thumbnails use `w-[72px] h-[56px]`. Failed image loads replace the source with `/images/placeholder.svg`.

Affiliate badges use a small rounded pill with `bg-orange-50 text-orange-700 border border-orange-200`. The affiliate price card uses `bg-orange-50 border border-orange-200 rounded-xl p-3` with `orange` separators and labels.

Event banners use a violet card style with `bg-violet-50 border border-violet-200 rounded-xl p-[14px] mx-4 mb-3`. Meeting banners use `bg-zinc-900 rounded-xl px-[14px] py-[10px] mx-4 mb-3`, a white badge, muted date text, and right-aligned center text.

## Invariants

The interface remains mobile first. Do not widen the app shell beyond `max-w-sm` unless the product scope changes. Keep horizontal page padding at `px-4` for page sections and use compact spacing inside cards.

The affiliate color system stays orange and the event color system stays violet so those concepts remain visually distinct from default zinc surfaces. Meeting banners stay dark so they stand apart from the white center list.

Controls must keep visible hover or disabled states. Disabled buttons must include the `disabled` attribute and visible unavailable copy. Clickable cards must keep map button clicks isolated with `stopPropagation()`.

Text and data rendering must remain bilingual. Layout should tolerate longer English labels by using the existing truncation and compact sizing patterns rather than adding new layouts.

## Validation

Visual checks should cover the home page in Korean and English, one center detail page with multiple images, one center with affiliate prices, one center without optional data, the event banner when active, and the meeting banner with and without a matching center.

Check chip states for all, region, affiliate only, and combined filters. Check the carousel controls, indicator dots, thumbnail ring state, and fallback image state. Check map buttons in normal and disabled states.

For data validation edge cases, inspect missing optional arrays and missing English fields. The expected UI is hidden optional sections and Korean fallback text. For malformed Naver place ids, the current UI may still enable the map button because it validates URL shape only.

## Code references

[`src/index.css`](../../../src/index.css), [`tailwind.config.js`](../../../tailwind.config.js), and [`vite.config.js`](../../../vite.config.js) define Tailwind and font wiring.

[`src/App.jsx`](../../../src/App.jsx) defines the mobile shell classes.

[`src/components/layout/Navbar.jsx`](../../../src/components/layout/Navbar.jsx), [`src/components/layout/LangToggle.jsx`](../../../src/components/layout/LangToggle.jsx), and [`src/components/layout/Footer.jsx`](../../../src/components/layout/Footer.jsx) define shared layout styling.

[`src/components/center/CenterFilter.jsx`](../../../src/components/center/CenterFilter.jsx), [`src/components/center/CenterCard.jsx`](../../../src/components/center/CenterCard.jsx), and [`src/components/center/CenterDetail.jsx`](../../../src/components/center/CenterDetail.jsx) define the main list and detail UI.

[`src/components/center/NaverMapButton.jsx`](../../../src/components/center/NaverMapButton.jsx), [`src/components/center/ImageCarousel.jsx`](../../../src/components/center/ImageCarousel.jsx), [`src/components/center/ParkingInfo.jsx`](../../../src/components/center/ParkingInfo.jsx), [`src/components/center/SnsLinks.jsx`](../../../src/components/center/SnsLinks.jsx), and [`src/components/center/AffiliateBadge.jsx`](../../../src/components/center/AffiliateBadge.jsx) define reusable center UI pieces.

[`src/components/EventBanner.jsx`](../../../src/components/EventBanner.jsx) and [`src/components/MeetingBanner.jsx`](../../../src/components/MeetingBanner.jsx) define announcement banner styling.

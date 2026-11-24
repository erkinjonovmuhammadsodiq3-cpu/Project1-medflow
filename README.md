# MedFlow — React launcher for the original project

The supplied `navbat med.zip` interface is loaded unchanged inside a full-screen React component. Its original HTML, CSS and JavaScript are preserved in `public/legacy/`.

## Run locally

1. Install Node.js 20 or newer.
2. Open this folder in a terminal.
3. Run `npm install`.
4. Run `npm run dev`.
5. Open the local URL printed by Vite.

## Production build

Run `npm run build`; the production site is generated in `dist/`.

## Original application

The React page displays `/legacy/index.html` in a viewport-sized frame. The original login/register demo, doctor search and filtering, queue tracking, payment demo, profile/history/settings, doctor onboarding, notifications, animations and other existing flows therefore keep their original layout and behavior without redesigning or rewriting them.

This keeps the supplied app intact; the original interface itself has not been rewritten into React components. Existing demo flows still require a backend for real authentication, payments, appointments, maps and live queue updates.

Fonts, icons and some images load from external services and require an internet connection.

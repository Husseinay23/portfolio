# HAy Portfolio

A premium portfolio website built with modern web technologies.

## Tech Stack

- **React 19** + **TypeScript**
- **Vite** - Build tool and dev server
- **TailwindCSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **React-i18next** - Internationalization (EN, FR, AR)
- **GSAP** - Advanced animations
- **Three.js** - 3D graphics (optional)

## Features

- ✨ Luxury minimal dark theme
- 🌍 Multilingual support (English, French, Arabic)
- 🔄 RTL support for Arabic
- 🌓 Light/Dark mode toggle
- 📱 Responsive design
- 🎨 Premium micro-interactions
- 🧩 Atomic design structure
- 🔒 Cloudflare Turnstile bot protection for contact information

## Project Structure

```
src/
├── components/
│   ├── atoms/          # Basic building blocks (Button, etc.)
│   ├── molecules/      # Simple component groups (LanguageSwitcher, ThemeToggle, etc.)
│   └── organisms/      # Complex components (NavBar, etc.)
├── pages/              # Page components (Home, About, Projects, Contact)
├── contexts/           # React contexts (ThemeContext)
├── i18n/               # Internationalization config and translations
│   ├── config.ts
│   └── locales/        # Translation files (en.json, fr.json, ar.json)
└── App.tsx             # Main app component
```

## Getting Started

### Installation

```bash
npm install
```

### Environment Setup

1. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and add your configuration:
   - Get your Cloudflare Turnstile site key from [Cloudflare Dashboard](https://dash.cloudflare.com/)
   - Add your contact email and phone number

3. See [TURNSTILE_SETUP.md](./TURNSTILE_SETUP.md) for detailed setup instructions.

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Brand Colors

- **Dark Primary**: `#0B0C0E`
- **Dark Secondary**: `#16181C`
- **Accent Blue**: `#4F7FFF`
- **Accent Purple**: `#7B61FF`

## Typography

- **Primary Font**: Inter (Latin scripts)
- **Arabic Font**: Cairo (Arabic script)

## Design Principles

- Rounded corners: 8-12px
- Smooth transitions and animations
- Glassmorphism effects
- Soft glowing accents
- Premium micro-interactions

## Security

- Contact information is protected by Cloudflare Turnstile
- Users must complete a verification challenge before viewing contact details
- Contact information is stored in environment variables for additional security

See [TURNSTILE_SETUP.md](./TURNSTILE_SETUP.md) for detailed security setup instructions.

## License

Private project - All rights reserved

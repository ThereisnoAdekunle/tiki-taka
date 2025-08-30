# ⚽ Tiki Taka - BanterFi Football Prediction Platform

A revolutionary blockchain-based platform where football banter meets prediction markets and crypto rewards.

![Tiki Taka Banner](https://img.shields.io/badge/BanterFi-Football%20Predictions-green?style=for-the-badge&logo=ethereum)
![Next.js](https://img.shields.io/badge/Next.js-15.5.2-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)

## 🚀 Live Demo

**Coming Soon** - Deploying to Vercel

## 🎯 What is BanterFi?

**BanterFi** is a new concept where football fans can turn their banter, memes, and social commentary into crypto rewards through prediction markets. Instead of traditional sports betting, users predict on football drama, controversies, and viral moments.

### 🌟 Key Features
- **Social Banter Markets** - Predict on transfer rumors, player drama, manager meltdowns
- **Banter2Earn** - Earn tokens for witty predictions and quality banter  
- **Viral Moments** - Predict on VAR controversies, touchline bust-ups, and chaos
- **Community-Driven** - Football memes and social interaction at the core

## 🚀 Current Status: Waitlist Phase

The platform is currently in development with a waitlist collecting early users. The dashboard and banter prediction features are preview-only.

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS 4.0
- **Backend**: Next.js API Routes
- **Storage**: File-based (temporary, will migrate to database)
- **Deployment**: Vercel (planned)

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Setup
```bash
# Clone the repository
git clone https://github.com/yourusername/tiki-taka-banterfi.git
cd tiki-taka-banterfi

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### Build for Production
```bash
# Build the application
npm run build

# Start production server
npm start
```

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── page.tsx           # Home page (waitlist)
│   ├── dashboard/         # Preview dashboard
│   ├── roadmap/           # Development roadmap
│   ├── admin/             # Admin panel
│   └── api/               # API routes
│       └── waitlist/      # Waitlist management
├── components/            # React components
│   ├── Header.tsx         # Navigation header
│   └── PredictionModal.tsx # Prediction modal
└── layout.tsx             # Root layout

data/
└── waitlist.json          # Waitlist storage (temporary)

public/                    # Static assets
```

## 🎮 Features

### Current Features
- ✅ **Waitlist System** - Email collection with admin panel
- ✅ **BanterFi Concept** - Football banter-focused prediction markets
- ✅ **Responsive Design** - Mobile-first approach
- ✅ **Admin Dashboard** - View and export waitlist data
- ✅ **Roadmap Page** - Development phases and tokenomics

### Preview Features
- 🎯 **Prediction Markets** - Pep's meltdowns, VAR controversies, transfer drama
- 📊 **Dashboard** - User stats, leaderboard, recent predictions
- 💬 **Banter Integration** - Social prediction markets

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Or connect GitHub repository for automatic deployments
```

### Environment Variables
Create a `.env.local` file:
```env
# Add any environment variables here
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
```

## 📊 Development Roadmap

### Phase 1: Foundation ✅
- BanterFi platform design
- Social prediction markets
- Community banter features
- Meme integration

### Phase 2: TIKI Pre-TGE 🚧
- Beta testing launch
- TIKI token distribution
- Football meme partnerships
- Social features testing

### Phase 3: TAKA Mainnet 📅
- TAKA token launch
- 1:1 TIKI → TAKA conversion
- Full governance activation
- Multi-sport expansion

## 🎯 Tokenomics

### TIKI (Pre-TGE)
- **Total Supply**: 100,000,000 TIKI
- **Network**: Polygon
- **Use Cases**: Predictions, governance, staking

### TAKA (Mainnet)
- **Total Supply**: 100,000,000 TAKA  
- **Network**: Ethereum L2
- **Use Cases**: Platform governance, revenue sharing

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🏆 Team

- **Founder** - Building the future of football banter and crypto rewards

## 📞 Contact

- **Twitter**: [@TikiTakaBanterFi](https://twitter.com/TikiTakaBanterFi) (coming soon)
- **Discord**: [Join our community](https://discord.gg/tikitaka) (coming soon)
- **Email**: hello@tikitaka.banterfi

---

**Tiki Taka** - Where football banter meets crypto rewards! ⚽💬💎🚀

*Built with ❤️ for the football community*

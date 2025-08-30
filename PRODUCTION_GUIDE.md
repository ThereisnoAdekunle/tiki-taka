# Tiki Taka Production Guide

## 🚀 From Prototype to Production

This guide will help you transform the current Tiki Taka prototype into a fully functional, production-ready platform.

## 📋 Phase 1: Foundation (Week 1-2)

### 1.1 Environment Setup

```bash
# Clone the repository
git clone [your-repo-url]
cd tiki-taka

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
```

### 1.2 Database Setup

```bash
# Install PostgreSQL
# Ubuntu/Debian
sudo apt-get install postgresql postgresql-contrib

# macOS
brew install postgresql

# Create database
createdb tikitaka_production
createdb tikitaka_development
```

### 1.3 Environment Configuration

```env
# .env.local
DATABASE_URL="postgresql://username:password@localhost:5432/tikitaka_production"
REDIS_URL="redis://localhost:6379"
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# Email service (SendGrid, Mailgun, etc.)
EMAIL_SERVICE_API_KEY="your-api-key"
EMAIL_FROM="noreply@tikitaka.com"

# Football data APIs
OPTA_API_KEY="your-opta-key"
STATS_PERFORM_API_KEY="your-stats-key"

# Blockchain
POLYGON_RPC_URL="https://polygon-rpc.com"
ARBITRUM_RPC_URL="https://arb1.arbitrum.io/rpc"
PRIVATE_KEY="your-deployer-private-key"
```

## 📋 Phase 2: Backend Development (Week 3-4)

### 2.1 Database Schema

Create `prisma/schema.prisma`:

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id            String   @id @default(cuid())
  email         String   @unique
  walletAddress String?  @unique
  username      String?  @unique
  avatar        String?
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
  
  predictions   Prediction[]
  waitlistEntry WaitlistEntry?
}

model WaitlistEntry {
  id        String   @id @default(cuid())
  email     String   @unique
  userId    String?  @unique
  user      User?    @relation(fields: [userId], references: [id])
  createdAt DateTime @default(now())
  
  @@map("waitlist_entries")
}

model PredictionMarket {
  id          String   @id @default(cuid())
  title       String
  description String
  category    String
  options     Json     // Array of prediction options
  poolSize    Float    @default(0)
  endDate     DateTime
  status      String   @default("active") // active, settled, cancelled
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  predictions Prediction[]
  
  @@map("prediction_markets")
}

model Prediction {
  id        String   @id @default(cuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id])
  marketId  String
  market    PredictionMarket @relation(fields: [marketId], references: [id])
  option    Int
  amount    Float
  status    String   @default("active") // active, won, lost
  createdAt DateTime @default(now())
  
  @@map("predictions")
}
```

### 2.2 API Routes Enhancement

Update `src/app/api/waitlist/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { sendWelcomeEmail } from '@/lib/email';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      );
    }

    // Check if already exists
    const existing = await prisma.waitlistEntry.findUnique({
      where: { email }
    });

    if (existing) {
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 409 }
      );
    }

    // Create waitlist entry
    const entry = await prisma.waitlistEntry.create({
      data: { email }
    });

    // Send welcome email
    await sendWelcomeEmail(email);

    // Add to email marketing list
    await addToEmailList(email);

    return NextResponse.json({
      success: true,
      message: 'Successfully joined waitlist!',
      id: entry.id
    });

  } catch (error) {
    console.error('Waitlist submission error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

### 2.3 Email Service Integration

Create `src/lib/email.ts`:

```typescript
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export async function sendWelcomeEmail(email: string) {
  const msg = {
    to: email,
    from: 'noreply@tikitaka.com',
    subject: 'Welcome to Tiki Taka! 🚀',
    templateId: 'd-your-template-id',
    dynamicTemplateData: {
      email: email,
      signupDate: new Date().toLocaleDateString()
    }
  };

  try {
    await sgMail.send(msg);
  } catch (error) {
    console.error('Email sending failed:', error);
  }
}

export async function sendLaunchNotification(email: string) {
  const msg = {
    to: email,
    from: 'noreply@tikitaka.com',
    subject: 'Tiki Taka is Live! ⚽💎',
    templateId: 'd-your-launch-template-id'
  };

  try {
    await sgMail.send(msg);
  } catch (error) {
    console.error('Launch notification failed:', error);
  }
}
```

## 📋 Phase 3: Smart Contract Development (Week 5-6)

### 3.1 Contract Setup

```bash
# Install Hardhat
npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox

# Initialize Hardhat
npx hardhat init

# Install OpenZeppelin
npm install @openzeppelin/contracts
```

### 3.2 TIKI Token Contract

Create `contracts/TikiToken.sol`:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TikiToken is ERC20, Ownable {
    address public takaToken;
    bool public conversionEnabled;
    
    mapping(address => bool) public authorizedMinters;
    
    event TokensMinted(address indexed to, uint256 amount);
    event ConversionEnabled(address indexed takaToken);
    
    constructor() ERC20("Tiki Token", "TIKI") Ownable(msg.sender) {
        _mint(msg.sender, 100000000 * 10**decimals()); // 100M tokens
    }
    
    modifier onlyMinter() {
        require(authorizedMinters[msg.sender] || msg.sender == owner(), "Not authorized");
        _;
    }
    
    function mint(address to, uint256 amount) external onlyMinter {
        _mint(to, amount);
        emit TokensMinted(to, amount);
    }
    
    function addMinter(address minter) external onlyOwner {
        authorizedMinters[minter] = true;
    }
    
    function removeMinter(address minter) external onlyOwner {
        authorizedMinters[minter] = false;
    }
    
    function enableConversion(address _takaToken) external onlyOwner {
        require(_takaToken != address(0), "Invalid address");
        takaToken = _takaToken;
        conversionEnabled = true;
        emit ConversionEnabled(_takaToken);
    }
}
```

### 3.3 Prediction Market Contract

Create `contracts/PredictionMarket.sol`:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract PredictionMarket is ReentrancyGuard, Ownable {
    struct Market {
        string title;
        string description;
        uint256 endTime;
        uint256 totalPool;
        bool settled;
        uint256 winningOption;
        mapping(uint256 => uint256) optionPools;
        mapping(address => mapping(uint256 => uint256)) userPredictions;
    }
    
    mapping(uint256 => Market) public markets;
    uint256 public marketCount;
    
    event MarketCreated(uint256 indexed marketId, string title, uint256 endTime);
    event PredictionPlaced(uint256 indexed marketId, address indexed user, uint256 option, uint256 amount);
    event MarketSettled(uint256 indexed marketId, uint256 winningOption);
    
    function createMarket(
        string memory title,
        string memory description,
        uint256 endTime
    ) external onlyOwner returns (uint256) {
        require(endTime > block.timestamp, "End time must be in future");
        
        marketCount++;
        Market storage market = markets[marketCount];
        market.title = title;
        market.description = description;
        market.endTime = endTime;
        
        emit MarketCreated(marketCount, title, endTime);
        return marketCount;
    }
    
    function placePrediction(uint256 marketId, uint256 option) external payable nonReentrant {
        Market storage market = markets[marketId];
        require(!market.settled, "Market already settled");
        require(block.timestamp < market.endTime, "Market ended");
        require(msg.value > 0, "Amount must be greater than 0");
        
        market.userPredictions[msg.sender][option] += msg.value;
        market.optionPools[option] += msg.value;
        market.totalPool += msg.value;
        
        emit PredictionPlaced(marketId, msg.sender, option, msg.value);
    }
    
    function settleMarket(uint256 marketId, uint256 winningOption) external onlyOwner {
        Market storage market = markets[marketId];
        require(!market.settled, "Market already settled");
        require(block.timestamp >= market.endTime, "Market not ended");
        
        market.settled = true;
        market.winningOption = winningOption;
        
        emit MarketSettled(marketId, winningOption);
    }
    
    function claimWinnings(uint256 marketId) external nonReentrant {
        Market storage market = markets[marketId];
        require(market.settled, "Market not settled");
        
        uint256 userAmount = market.userPredictions[msg.sender][market.winningOption];
        require(userAmount > 0, "No winnings to claim");
        
        uint256 totalWinningPool = market.optionPools[market.winningOption];
        uint256 userShare = (userAmount * market.totalPool) / totalWinningPool;
        
        // Reset user prediction
        market.userPredictions[msg.sender][market.winningOption] = 0;
        
        payable(msg.sender).transfer(userShare);
    }
}
```

## 📋 Phase 4: Frontend Enhancement (Week 7-8)

### 4.1 Authentication System

Install dependencies:

```bash
npm install next-auth @rainbow-me/rainbowkit wagmi viem
```

Create `src/lib/auth.ts`:

```typescript
import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@/lib/prisma';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Implement your authentication logic
        const user = await prisma.user.findUnique({
          where: { email: credentials?.email }
        });
        
        if (user) {
          return user;
        }
        return null;
      }
    })
  ],
  session: {
    strategy: 'jwt'
  },
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub!;
      }
      return session;
    }
  }
};

export default NextAuth(authOptions);
```

### 4.2 Wallet Integration

Create `src/components/WalletConnect.tsx`:

```typescript
'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useBalance } from 'wagmi';
import { TIKI_TOKEN_ADDRESS } from '@/lib/constants';

export default function WalletConnect() {
  const { address, isConnected } = useAccount();
  const { data: tikiBalance } = useBalance({
    address,
    token: TIKI_TOKEN_ADDRESS as `0x${string}`,
  });

  return (
    <div className="flex items-center space-x-4">
      {isConnected && (
        <div className="text-green-100">
          TIKI: {tikiBalance?.formatted || '0'}
        </div>
      )}
      <ConnectButton />
    </div>
  );
}
```

## 📋 Phase 5: Data Integration (Week 9-10)

### 5.1 Football Data APIs

Create `src/lib/football-data.ts`:

```typescript
import { prisma } from '@/lib/prisma';

const OPTA_API_KEY = process.env.OPTA_API_KEY;
const STATS_PERFORM_API_KEY = process.env.STATS_PERFORM_API_KEY;

export async function fetchPlayerStats(playerId: string) {
  const response = await fetch(
    `https://api.opta.com/v1/players/${playerId}/stats`,
    {
      headers: {
        'Authorization': `Bearer ${OPTA_API_KEY}`,
        'Content-Type': 'application/json'
      }
    }
  );
  
  return response.json();
}

export async function fetchTeamData(teamId: string) {
  const response = await fetch(
    `https://api.opta.com/v1/teams/${teamId}`,
    {
      headers: {
        'Authorization': `Bearer ${OPTA_API_KEY}`,
        'Content-Type': 'application/json'
      }
    }
  );
  
  return response.json();
}

export async function createPredictionMarket(data: {
  title: string;
  description: string;
  category: string;
  options: any[];
  endDate: Date;
}) {
  return await prisma.predictionMarket.create({
    data: {
      title: data.title,
      description: data.description,
      category: data.category,
      options: data.options,
      endDate: data.endDate
    }
  });
}
```

### 5.2 Real-time Updates

Install Socket.IO:

```bash
npm install socket.io socket.io-client
```

Create `src/lib/socket.ts`:

```typescript
import { io } from 'socket.io-client';

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3001';

export const socket = io(SOCKET_URL, {
  autoConnect: false
});

export const connectSocket = () => {
  socket.connect();
};

export const disconnectSocket = () => {
  socket.disconnect();
};

export const subscribeToMarket = (marketId: string) => {
  socket.emit('subscribe', { marketId });
};

export const unsubscribeFromMarket = (marketId: string) => {
  socket.emit('unsubscribe', { marketId });
};
```

## 📋 Phase 6: Testing & Security (Week 11-12)

### 6.1 Unit Tests

Create `__tests__/prediction-market.test.ts`:

```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { PredictionModal } from '@/components/PredictionModal';

describe('PredictionModal', () => {
  const mockMarket = {
    title: 'Test Market',
    description: 'Test Description',
    options: [
      { label: 'Option 1', percentage: 50 },
      { label: 'Option 2', percentage: 50 }
    ],
    pool: '$1000',
    endsIn: '7 days'
  };

  it('renders market information correctly', () => {
    render(
      <PredictionModal
        isOpen={true}
        onClose={() => {}}
        market={mockMarket}
      />
    );

    expect(screen.getByText('Test Market')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  it('handles prediction submission', async () => {
    const mockOnClose = jest.fn();
    
    render(
      <PredictionModal
        isOpen={true}
        onClose={mockOnClose}
        market={mockMarket}
      />
    );

    // Select option
    fireEvent.click(screen.getByText('Option 1'));
    
    // Enter amount
    const amountInput = screen.getByPlaceholderText('Enter amount');
    fireEvent.change(amountInput, { target: { value: '100' } });
    
    // Submit
    fireEvent.click(screen.getByText('Place Prediction'));
    
    // Verify submission
    expect(mockOnClose).toHaveBeenCalled();
  });
});
```

### 6.2 Security Audit

```bash
# Install security tools
npm install --save-dev eslint-plugin-security
npm install --save-dev @typescript-eslint/eslint-plugin

# Run security audit
npm audit

# Run ESLint with security rules
npm run lint:security
```

## 📋 Phase 7: Deployment (Week 13-14)

### 7.1 Production Environment

```bash
# Build the application
npm run build

# Start production server
npm start
```

### 7.2 Docker Deployment

Create `Dockerfile`:

```dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json package-lock.json* ./
RUN npm ci --only=production

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
ENV NEXT_TELEMETRY_DISABLED 1

RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
```

### 7.3 Environment Variables

```env
# Production .env
NODE_ENV=production
DATABASE_URL="postgresql://user:pass@prod-db:5432/tikitaka"
REDIS_URL="redis://prod-redis:6379"
NEXTAUTH_SECRET="your-production-secret"
NEXTAUTH_URL="https://tikitaka.com"

# Blockchain
POLYGON_RPC_URL="https://polygon-rpc.com"
ARBITRUM_RPC_URL="https://arb1.arbitrum.io/rpc"
PRIVATE_KEY="your-production-private-key"

# Monitoring
SENTRY_DSN="your-sentry-dsn"
DATADOG_API_KEY="your-datadog-key"
```

## 📋 Phase 8: Marketing & Launch (Week 15-16)

### 8.1 Launch Checklist

- [ ] **Technical**
  - [ ] All tests passing
  - [ ] Security audit completed
  - [ ] Performance optimization
  - [ ] Monitoring setup
  - [ ] Backup systems

- [ ] **Legal**
  - [ ] Terms of Service
  - [ ] Privacy Policy
  - [ ] KYC/AML compliance
  - [ ] Gambling licenses (if required)

- [ ] **Marketing**
  - [ ] Website launch
  - [ ] Social media presence
  - [ ] Email marketing setup
  - [ ] Influencer partnerships
  - [ ] Press releases

- [ ] **Community**
  - [ ] Discord server
  - [ ] Telegram group
  - [ ] Twitter account
  - [ ] YouTube channel

### 8.2 Launch Sequence

1. **Soft Launch** (Week 15)
   - Invite-only beta
   - Feedback collection
   - Bug fixes

2. **Public Launch** (Week 16)
   - Full platform release
   - Marketing campaigns
   - Community activation

3. **Post-Launch** (Week 17+)
   - User feedback integration
   - Feature updates
   - Community growth

## 🎯 Success Metrics

### Technical Metrics
- **Uptime**: 99.9%+
- **Response Time**: <200ms
- **Error Rate**: <0.1%
- **Security**: Zero critical vulnerabilities

### Business Metrics
- **User Growth**: 10K+ active users by Q2 2024
- **TVL**: $1M+ total value locked
- **Revenue**: $100K+ monthly recurring revenue
- **Community**: 50K+ Discord members

## 🚀 Next Steps

1. **Follow the phases** in order
2. **Test thoroughly** at each stage
3. **Get feedback** from early users
4. **Iterate and improve** continuously
5. **Scale gradually** as you grow

---

**Remember**: This is a living document. Update it as you progress and learn from the development process.

**Tiki Taka** - Building the future of football predictions! ⚽💎🚀

# T3 Stack + Payload CMS + Better Auth

A modern, full-stack TypeScript starter built on the [T3 Stack](https://create.t3.gg/) with integrated [Payload CMS](https://payloadcms.com/) for content management and [Better Auth](https://www.better-auth.com/) for authentication.

## What Makes This Different?

This project extends the standard T3 Stack with powerful, production-ready features:

- **🎨 Payload CMS** - Headless CMS with a beautiful admin UI at `/admin`, GraphQL API, and type-safe collections
- **🔐 Better Auth** - Modern authentication with Google OAuth, email/password, role-based access control, and session management
- **⚡ tRPC + TanStack Query** - Type-safe APIs using `@trpc/tanstack-react-query` for optimal data fetching
- **📦 MongoDB** - Flexible document database powering both Payload CMS and Better Auth
- **🎯 Full Type Safety** - End-to-end TypeScript from database schemas to frontend components
- **🛡️ Role-Based Access** - Built-in admin/user roles with middleware protection
- **🎨 Modern UI** - Tailwind CSS 4 + shadcn/ui components + React 19

## Quick Start

```bash
# 1. Clone and install
git clone <your-repo-url>
cd t3-x-payloadcms
pnpm install

# 2. Set up environment variables
cp .env.example .env
# Edit .env with your MongoDB URI and secrets

# 3. Start the development server
pnpm dev
```

Visit `http://localhost:3001` to see your app!

## Setup

### Prerequisites

- Node.js (18.x or later)
- pnpm (or npm/yarn)
- MongoDB database (either MongoDB Atlas or local Docker instance)
- Google Cloud Platform account (optional, for OAuth authentication)

### 1. Clone and Install Dependencies

```bash
git clone <your-repo-url>
cd t3-x-payloadcms
pnpm install
```

### 2. Environment Variables

Copy the example environment file:

```bash
cp .env.example .env
```

### 3. Setup Google OAuth (Better Auth)

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Configure OAuth consent screen:
   - Go to "APIs & Services" → "OAuth consent screen"
   - Choose "External" user type
   - Fill in required fields (App name, User support email, Developer contact)
4. Create OAuth 2.0 credentials:
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "OAuth 2.0 Client IDs"
   - Choose "Web application"
   - Set application name (e.g., "T3 Payload CMS App")
   - **Add authorized redirect URIs**:
     - For development: `http://localhost:3001/api/auth/callback/google`
     - For production: `https://yourdomain.com/api/auth/callback/google`
5. **Copy your credentials**:
   - **Client ID**: Copy this value for `GOOGLE_CLIENT_ID`
   - **Client Secret**: Copy this value for `GOOGLE_CLIENT_SECRET`
   - Save these credentials securely

### 4. Setup MongoDB

#### Option A: MongoDB Atlas (Recommended)

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free account and cluster
3. Create a database user with read/write permissions
4. Whitelist your IP address (or use 0.0.0.0/0 for development)
5. Get your connection string from the "Connect" button

#### Option B: Local Docker Instance

```bash
docker run --name mongodb -d -p 27017:27017 mongo:latest
```

Your connection string will be: `mongodb://localhost:27017/your-database-name`

### 5. Configure Environment Variables

Update your `.env` file with the following variables:

```env
# Database
DATABASE_URI="mongodb://localhost:27017/your-database-name"
# or for Atlas: "mongodb+srv://username:password@cluster.mongodb.net/database-name"

# Better Auth
BETTER_AUTH_SECRET="your-better-auth-secret"
NEXT_PUBLIC_BETTER_AUTH_URL="http://localhost:3001"

# Google OAuth (from Google Cloud Console - step 3)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Payload CMS
PAYLOAD_SECRET="your-payload-secret"
```

Generate secrets using:
```bash
openssl rand -hex 32
```

### 6. Start Development Server

```bash
pnpm dev
```

Your app will be available at `http://localhost:3001`

- Frontend: `http://localhost:3001`
- Payload Admin: `http://localhost:3001/admin`
- GraphQL Playground: `http://localhost:3001/api/graphql-playground`
- tRPC API: `http://localhost:3001/api/trpc`

## Features Overview

### Authentication (Better Auth)

- **Multiple providers**: Google OAuth, Email/Password
- **Role-based access**: Admin and User roles with middleware protection
- **Session management**: Device tracking, account linking, secure sessions
- **Admin features**: API key generation, enhanced session data
- **Auth pages**: Pre-built sign-in/sign-up/verify flows at `/auth/*`

### Content Management (Payload CMS)

**Collections:**
- **Users**: User accounts with Better Auth integration
- **Accounts**: OAuth provider accounts (Google, etc.)
- **Sessions**: Active user sessions
- **Verifications**: Email verification tokens
- **Pages**: Dynamic CMS pages with slug-based routing

**Features:**
- Beautiful admin panel at `/admin`
- GraphQL API for flexible queries
- REST API for CRUD operations
- Lexical rich text editor
- Type generation for TypeScript
- MongoDB adapter with full relationship support

### API Layer (tRPC + TanStack Query)

- **Type-safe RPC**: End-to-end type safety from server to client
- **TanStack Query integration**: Uses `@trpc/tanstack-react-query` for optimal caching
- **Server-side rendering**: Data prefetching with automatic hydration
- **Batching**: HTTP batch streaming for efficient requests
- **SuperJSON**: Enhanced serialization for dates, maps, sets, etc.
- **Development tools**: Artificial latency simulation, request logging

### Tech Stack

- **Framework**: Next.js 16 (App Router + Turbopack)
- **Language**: TypeScript 5.8
- **Database**: MongoDB 6.17
- **CMS**: Payload CMS 3.62
- **Auth**: Better Auth 1.3.2
- **API**: tRPC 11 + TanStack Query 5
- **UI**: React 19, Tailwind CSS 4, shadcn/ui
- **Validation**: Zod 4.0
- **Image Processing**: Sharp

## Shopify Integration (Optional)

To enable ecommerce functionality, you'll need to configure Shopify and obtain the required environment variables.

### 1. Create Shopify Store

If you don't have a Shopify store:
1. Go to [Shopify](https://www.shopify.com/) and create a new store
2. Complete the basic store setup

### 2. Setup Custom App for API Access

1. In your Shopify admin, go to **Settings** → **Apps and sales channels**
2. Click **"Develop apps"** → **"Create an app"**
3. Name your app (e.g., "T3 Payload CMS Integration")
4. **Configure Admin API access**:
   - Click **"Configure Admin API scopes"**
   - Enable these scopes:
     - `read_products` - Read product data
     - `read_orders` - Read order data
     - `read_customers` - Read customer data
     - `write_orders` - Create orders
     - `read_inventory` - Read inventory levels
5. **Install the app** to your store
6. **Copy Admin API credentials**:
   - **Admin API access token**: Copy for `SHOPIFY_ACCESS_TOKEN`
   - **API key**: Copy for `SHOPIFY_API_KEY`
   - **API secret**: Copy for `SHOPIFY_API_SECRET`

### 3. Setup Storefront API Access

1. In your Shopify admin, go to **Settings** → **Apps and sales channels**
2. Scroll down to **"Storefront API access"**
3. Click **"Create private app"** or **"Manage private apps"**
4. Create/edit a private app with:
   - **Private app name**: "T3 Storefront Access"
   - **Storefront API access scopes**:
     - `unauthenticated_read_product_listings`
     - `unauthenticated_read_product_inventory`
     - `unauthenticated_write_checkouts`
     - `unauthenticated_read_checkouts`
5. **Save** and copy the **Storefront access token** for `SHOPIFY_STOREFRONT_ACCESS_TOKEN`

### 4. Get Shop Domain

Your shop domain is your Shopify store URL:
- Format: `your-store-name.myshopify.com`
- Example: `my-awesome-store.myshopify.com`
- Copy this for `SHOPIFY_SHOP_DOMAIN`

### 5. Update Environment Variables

Add the following to your `.env` file:

```env
# Shopify Configuration
SHOPIFY_SHOP_DOMAIN="your-store-name.myshopify.com"
SHOPIFY_STOREFRONT_ACCESS_TOKEN="your-storefront-access-token"
SHOPIFY_API_KEY="your-api-key"
SHOPIFY_API_SECRET="your-api-secret"
SHOPIFY_ACCESS_TOKEN="your-admin-api-access-token"
```

### What This Enables

With these credentials configured, your application can:
- Read product data from your Shopify store
- Create and manage orders
- Access customer information
- Fetch real-time data on each request
- Use Shopify's admin interface for product and inventory management

## Project Structure

```
/src
├── /app                           # Next.js App Router
│   ├── /(frontend)               # Frontend pages and layout
│   │   ├── /auth/[pathname]      # Better Auth flow pages
│   │   ├── /[slug]               # Dynamic CMS pages
│   │   └── page.tsx              # Home page
│   ├── /(payload)                # Payload admin section
│   └── /api                      # API routes
│       ├── /auth/[...all]        # Better Auth API
│       └── /trpc/[trpc]          # tRPC handler
│
├── /auth                         # Better Auth configuration
│   ├── config.ts                 # Roles, plugins, providers
│   ├── client.ts                 # Browser auth client
│   └── utils.ts                  # Server-side auth utilities
│
├── /components                   # React components
│   ├── /auth                     # Authentication components
│   └── /dev                      # Development utilities
│
├── /payload                      # Payload CMS
│   ├── /collections              # Collection definitions
│   │   ├── Users.ts              # User accounts
│   │   ├── Accounts.ts           # OAuth accounts
│   │   ├── Sessions.ts           # User sessions
│   │   ├── Verifications.ts      # Email verifications
│   │   └── Pages.ts              # CMS pages
│   └── payload.config.ts         # CMS configuration
│
├── /server/api                   # Backend API
│   ├── /routers                  # tRPC routers
│   ├── root.ts                   # Root router
│   └── trpc.ts                   # tRPC setup
│
├── /trpc                         # tRPC client
│   ├── client.tsx                # Browser client
│   ├── server.tsx                # Server client
│   └── query-client.ts           # TanStack Query config
│
└── /ui                           # shadcn/ui components
```

## What's next? How do I make an app with this?

This starter provides a solid foundation with authentication, content management, and type-safe APIs already configured. You can start building your application features immediately.

### Learn More

If you are not familiar with the technologies used in this project, please refer to the respective docs:

- **[Next.js](https://nextjs.org)** - React framework with App Router
- **[Better Auth](https://www.better-auth.com/)** - Modern authentication library
- **[Payload CMS](https://payloadcms.com/docs)** - Headless CMS documentation
- **[tRPC](https://trpc.io)** - Type-safe API framework
- **[TanStack Query](https://tanstack.com/query)** - Data fetching and caching
- **[Tailwind CSS](https://tailwindcss.com)** - Utility-first CSS framework
- **[shadcn/ui](https://ui.shadcn.com/)** - Re-usable component library

For T3 Stack resources:
- [T3 Stack Documentation](https://create.t3.gg/)
- [T3 Discord Community](https://t3.gg/discord)

### Key Differences from Standard T3 Stack

1. **Better Auth instead of NextAuth.js**: More flexible, modern authentication with better TypeScript support
2. **Payload CMS integration**: Full-featured headless CMS with admin panel
3. **@trpc/tanstack-react-query**: Uses the official TanStack Query integration instead of the legacy React Query wrapper
4. **MongoDB**: Document database instead of SQL (easily adaptable to other databases via Payload adapters)
5. **Enhanced type safety**: Payload generates types, Better Auth provides type-safe auth utilities

## How do I deploy this?

Follow our deployment guides for [Vercel](https://create.t3.gg/en/deployment/vercel), [Netlify](https://create.t3.gg/en/deployment/netlify) and [Docker](https://create.t3.gg/en/deployment/docker) for more information.

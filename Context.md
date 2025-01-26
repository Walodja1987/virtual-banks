
## Project Structure

```
├── src/                            # Application source code
│   ├── app/                        # Next.js App Router
│   │   ├── (auth)/                 # Auth-related routes (grouped for organizational purposes; this won't appear in URLs)
│   │   │   ├── login/              # Login page accessible at /login (not at /auth/login)
│   │   │   └── register/           # Register page accessible at /register (not at /auth/register)
│   │   ├── api/                    # API routes
│   │   │   ├── users/              # Users API endpoints
│   │   │   │   ├── route.ts        # Users API route handler
│   │   │   │   └── [id]/           # Dynamic user routes
│   │   │   │       └── route.ts    # Dynamic user API route
│   │   │   ├── auth/               # Authentication endpoints
│   │   │   │   ├── login/          # Login endpoints
│   │   │   │   │   └── route.ts    # Login route handler
│   │   │   │   └── signup/         # Signup endpoints
│   │   │   │       └── route.ts    # Signup route handler
│   │   │   └── posts/              # Posts endpoints
│   │   │       └── route.ts        # Posts route handler
│   │   ├── layout.tsx              # Root layout
│   │   ├── page.tsx                # Home / index page accessible at /
│   │   ├── globals.css             # Global styles
│   │   ├── blog/                   # Blog route
│   │   │   ├── layout.tsx          # Optional layout for /blog and its children
│   │   │   ├── page.tsx            # Blog page accessible at /blog
│   │   │   └── [slug]              # Dynamic blog post route
│   │   │       └── page.tsx        # Individual blog post page accessible at /blog/[slug]
│   │   ├── dashboard/              # Dashboard route
│   │   │   ├── page.tsx            # Dashboard page accessible at /dashboard
│   ├── components/                 # React components
│   │   ├── ui/                     # Shadcn components
│   │   ├── navigation/             # Navigation components (navbar, sidebar, etc.)
│   │   ├── forms/                  # Form-related components
│   │   └── shared/                 # Reusable components
│   ├── lib/                        # Utility functions
│   │   ├── utils.ts                # Helper functions
│   │   └── constants.ts            # App constants
│   ├── hooks/                      # Custom React hooks
│   ├── types/                      # TypeScript definitions
│   └── styles/                     # Component styles
├── public/                         # Static assets
│   ├── images/                     # Image files
│   └── fonts/                      # Font files
├── tests/                          # Test files
├── .env.local                      # Local environment variables
├── .env.example                    # Example environment variables
├── tailwind.config.js              # Tailwind configuration
└── tsconfig.json                   # TypeScript configuration
```
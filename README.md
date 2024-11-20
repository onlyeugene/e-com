# Product Management System

A modern web application built with Next.js for managing products with features like viewing, editing, and deleting products.

## 🚀 Features

- Product listing with image previews
- Real-time product management (Create, Read, Update, Delete)
- Responsive data table using TanStack Table
- Modern UI components with shadcn/ui
- PostgreSQL database integration with Neon
- Email functionality using Resend

## 🛠️ Tech Stack

- **Framework:** Next.js
- **Language:** TypeScript
- **Database:** PostgreSQL (Neon)
- **Styling:** Tailwind CSS
- **Components:** shadcn/ui
- **Data Table:** TanStack Table
- **Email Service:** Resend
- **Schema Validation:** Zod

## 🔧 Installation

1. Clone the repository:

```bash
git clone <repository-url>
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Create a `.env` file in the root directory with the following variables:
```env
DATABASE_URL=your_postgresql_connection_string
RESEND_API_KEY
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📁 Project Structure

```
├── app/
│   ├── api/
│   │   └── products/
│   │       ├── [id]/
│   │       │   ├── route.ts    # Product API endpoints (GET, PUT, DELETE)
│   │       └── route.ts        # Products collection endpoints (GET, POST)
│   ├── products/
│   │   ├── columns.tsx         # Product table column definitions
│   │   ├── data-table.tsx      # TanStack table implementation
│   │   ├── loading.tsx         # Loading state component
│   │   └── page.tsx            # Products page component
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ui/                     # Reusable UI components
│   │   ├── button.tsx
│   │   ├── dialog.tsx
│   │   ├── dropdown-menu.tsx
│   │   ├── input.tsx
│   │   ├── table.tsx
│   │   └── ...
│   └── products/               # Product-specific components
│       ├── create-product.tsx
│       ├── delete-product.tsx
│       ├── edit-product.tsx
│       └── product-form.tsx           
├── lib/
│   ├── db.ts                   # Database configuration
│   └── utils.ts                # Utility functions
├── public/
│   ├── images/
│   └── icons/
├── styles/
│   └── globals.css             # Global styles
├── types/
│   └── product-schema.ts       # Product type definitions
├── utils/
│   └── formatPrice.ts          # Price formatting utility
├── .env
├── .env.example
├── .gitignore
├── next.config.js
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── tsconfig.json
```

This structure follows Next.js 13+ App Router conventions and includes:

- `app/`: Next.js application routes and API endpoints
- `components/`: Reusable UI components and product-specific components
- `config/`: Application configuration files
- `lib/`: Core utilities and database setup
- `public/`: Static assets
- `styles/`: Global styles and CSS modules
- `types/`: TypeScript type definitions
- `utils/`: Helper functions and utilities

## 💡 Usage

The application provides a user interface for managing products with the following features:

- View all products in a table format with images
- Edit product details through a modal interface
- Delete products with confirmation
- Format prices automatically
- Responsive image handling

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📝 License

This project is licensed under the [MIT License](LICENSE).
# Leben in Deutschland Test

A comprehensive web application for preparing for the official German integration test "Leben in Deutschland". The application provides interactive quizzes, progress tracking, and multi-language support.

## Features

### 🎯 Core Features
- **Interactive Quiz System**: Practice with 300+ questions covering all test categories
- **Multi-language Support**: German, English, French, Spanish, Turkish, Arabic
- **Progress Tracking**: Monitor your learning progress and identify areas for improvement
- **Wrong Answers Review**: Learn from mistakes with detailed explanations
- **Premium Features**: Access to advanced analytics and additional content

### 📚 Question Categories
- Politics (50 questions)
- Law (40 questions)
- Culture (35 questions)
- Economy (30 questions)
- Education (25 questions)
- Society (45 questions)
- History (40 questions)
- Integration (30 questions)

### 🌍 Language Support
- **Primary**: German (Deutsch)
- **Secondary Languages**: English, French, Spanish, Turkish, Arabic
- Questions are always displayed in German (as per official test requirements)
- Explanations and translations available in selected language

## Technology Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: NextAuth.js
- **Database**: SQLite with Prisma ORM
- **Payments**: Stripe
- **Testing**: Playwright

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/neslihanbozer/lebenindeutschland.git
cd leben-in-deutschland-quiz
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp env.example .env.local
```

4. Configure your `.env.local` file:
```env
# Database
DATABASE_URL="file:./prisma/dev.db"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# Stripe (optional for development)
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_PRICE_ID="price_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
```

5. Set up the database:
```bash
npx prisma db push
```

6. Start the development server:
```bash
npm run dev
```

7. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   │   ├── auth/          # Authentication endpoints
│   │   ├── payment/       # Payment processing
│   │   └── webhook/       # Stripe webhooks
│   ├── auth/              # Authentication pages
│   ├── quiz/              # Quiz functionality
│   ├── pricing/           # Pricing page
│   ├── premium-dashboard/ # Premium user dashboard
│   └── progress/          # Progress tracking
├── components/            # Reusable React components
├── lib/                   # Utility functions and configurations
│   ├── auth.ts           # NextAuth configuration
│   ├── questions.ts      # Question data
│   └── stripe.ts         # Stripe configuration
└── types/                # TypeScript type definitions

prisma/
├── schema.prisma         # Database schema
└── dev.db               # SQLite database

public/
├── logo/                # Application logos
└── Brandenburger_Tor_abends.jpg  # Hero image

locales/
├── en/                  # English translations
└── de/                  # German translations
```

## Usage

### Free Version
- Access to first 50 questions
- Basic progress tracking
- German-only interface

### Premium Version (€5.99 for 3 months)
- Access to all 300+ questions
- Multi-language support
- Advanced progress analytics
- Wrong answers review
- Detailed explanations

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/[...nextauth]` - NextAuth endpoints

### Payments
- `POST /api/create-checkout-session` - Create Stripe checkout session
- `POST /api/webhook` - Handle Stripe webhooks
- `GET /api/payment/success` - Payment success page

### Quiz & Progress
- `GET /api/wrong-answers` - Get user's wrong answers
- `DELETE /api/wrong-answers/[id]` - Delete specific wrong answer

## Development

### Running Tests
```bash
npm run test
```

### Building for Production
```bash
npm run build
npm start
```

### Database Management
```bash
# View database in Prisma Studio
npx prisma studio

# Reset database
npx prisma db push --force-reset

# Generate Prisma client
npx prisma generate
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit your changes: `git commit -am 'Add new feature'`
4. Push to the branch: `git push origin feature/new-feature`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions, please contact [your-email@example.com]

## Acknowledgments

- German Federal Office for Migration and Refugees (BAMF) for official test content
- Brandenburg Gate image by [photographer name]
- Icons from [icon library name]

---

**Note**: This application is for educational purposes and test preparation. Always refer to official sources for the most current information about the "Leben in Deutschland" test.

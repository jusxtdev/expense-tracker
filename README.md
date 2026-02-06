# Expense Tacker App

## Core Features
### User Authentication

Users register with email/password (validated with Zod)
Login returns a JWT token for authenticated requests
Middleware protects routes so users only see their own expenses

### Expense Management

Create expenses with amount, category, description, and date
Categories like Food, Transport, Entertainment, Bills, Shopping, etc.
Edit or delete existing expenses
Retrieve all expenses with optional filtering

### Filtering & Queries

Get expenses by date range (this month, last week, custom dates)
Filter by category to see spending patterns
Search by description
Sort by date or amount

### Analytics & Summaries

Total spending for a time period
Breakdown by category (how much spent on Food vs Transport)
Monthly comparisons (spending this month vs last month)
Average daily/weekly spending


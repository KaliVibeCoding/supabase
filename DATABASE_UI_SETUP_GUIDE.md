# Supabase Database Setup and UI Customization Guide

This guide demonstrates how to set up your database and customize the UI in Supabase.

## 🗄️ Database Setup

### 1. Configuration (`/supabase/config.toml`)

The main configuration file controls database settings, API configuration, authentication, and storage:

```toml
[db]
port = 54322
major_version = 15

[api]
port = 54321
schemas = ["public", "content", "storage", "graphql_public", "app"]
max_rows = 1000

[auth]
site_url = "http://localhost:3000"
enable_signup = true

[storage]
file_size_limit = "50MiB"
```

### 2. Database Migrations (`/supabase/migrations/`)

Create migration files to define your database schema. Example: `20250622042500_custom_app_schema.sql`

```sql
-- Create a custom schema
create schema if not exists app;

-- Create custom tables with RLS
create table app.user_profiles (
  id uuid references auth.users on delete cascade not null primary key,
  username text unique,
  full_name text,
  created_at timestamp with time zone default now() not null
);

-- Enable Row Level Security
alter table app.user_profiles enable row level security;

-- Create policies
create policy "Public profiles are viewable by everyone." 
  on app.user_profiles for select using ( true );
```

### 3. Seed Data (`/supabase/seed.sql`)

Add initial data to your database:

```sql
-- Custom seed data for your application
insert into app.posts (user_id, title, content, published)
values
  ('user-id-here', 'Welcome Post', 'Welcome to our platform!', true);
```

### 4. Running Migrations

```bash
# Start Supabase locally
supabase start

# Apply migrations
supabase db reset

# Or apply specific migration
supabase migration up
```

## 🎨 UI Customization

### 1. Custom Components (`/apps/studio/components/`)

Create custom React components with Tailwind CSS:

```tsx
// CustomDatabaseDashboard.tsx
import { useState } from 'react'
import { Button } from 'ui'

export const CustomDatabaseDashboard = ({ projectRef }) => {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-green-500 to-blue-600 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold">Custom Database Dashboard</h1>
      </div>
      {/* Your custom UI components */}
    </div>
  )
}
```

### 2. Modifying Pages (`/apps/studio/pages/`)

Update existing pages to include your custom components:

```tsx
// /pages/project/[ref]/database/index.tsx
import CustomDatabaseDashboard from 'components/interfaces/Database/CustomDatabaseDashboard'

const Database: NextPageWithLayout = () => {
  const { ref: projectRef } = useParams()
  
  return (
    <div className="p-6">
      <CustomDatabaseDashboard projectRef={projectRef} />
    </div>
  )
}
```

### 3. Styling with Tailwind CSS

Use Tailwind utility classes for responsive design:

```tsx
<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
    {/* Card content */}
  </div>
</div>
```

## 🚀 Development Workflow

### 1. Local Development Setup

```bash
# Install dependencies
pnpm install

# Start Supabase services
cd docker
docker compose up

# Start Studio development server
pnpm dev:studio
```

### 2. Access Points

- **Studio Dashboard**: http://localhost:8082
- **Database**: localhost:54322
- **API**: http://localhost:54321
- **Auth**: http://localhost:54321/auth/v1

### 3. Testing Database Changes

```bash
# Reset database with new migrations
supabase db reset

# Test API endpoints
curl http://localhost:54321/rest/v1/app/user_profiles

# View database in Studio
# Navigate to http://localhost:8082/project/default/database
```

## 📁 Key Files Modified

### Database Files:
- `/supabase/config.toml` - Main configuration
- `/supabase/migrations/20250622042500_custom_app_schema.sql` - Custom schema
- `/supabase/seed.sql` - Updated with custom seed data

### UI Files:
- `/apps/studio/components/interfaces/Database/CustomDatabaseDashboard.tsx` - Custom component
- `/apps/studio/pages/project/[ref]/database/index.tsx` - Modified database page

## 🛠️ Advanced Customizations

### 1. Custom API Endpoints

Create Edge Functions in `/supabase/functions/`:

```typescript
// /supabase/functions/custom-api/index.ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

serve(async (req) => {
  return new Response(
    JSON.stringify({ message: "Custom API endpoint" }),
    { headers: { "Content-Type": "application/json" } }
  )
})
```

### 2. Real-time Subscriptions

```typescript
// Subscribe to database changes
const subscription = supabase
  .channel('app-changes')
  .on('postgres_changes', 
    { event: '*', schema: 'app', table: 'posts' },
    (payload) => console.log('Change received!', payload)
  )
  .subscribe()
```

### 3. Custom Authentication

```typescript
// Custom auth provider
const { data, error } = await supabase.auth.signInWithOAuth({
  provider: 'github',
  options: {
    redirectTo: 'http://localhost:3000/auth/callback'
  }
})
```

## 🔧 Troubleshooting

### Common Issues:

1. **Migration Errors**: Check SQL syntax and dependencies
2. **Permission Issues**: Verify RLS policies and grants
3. **UI Component Errors**: Check import paths and TypeScript types
4. **Docker Issues**: Ensure Docker is running and ports are available

### Useful Commands:

```bash
# Check Supabase status
supabase status

# View logs
supabase logs

# Generate TypeScript types
supabase gen types typescript --local > types/database.ts
```

## 📚 Next Steps

1. **Add Authentication**: Implement user registration and login
2. **Create APIs**: Build custom API endpoints
3. **Add Real-time Features**: Implement live updates
4. **Deploy**: Deploy to production with Vercel/Netlify
5. **Monitor**: Set up logging and analytics

## 🎯 Best Practices

1. **Database Design**: Use proper indexing and constraints
2. **Security**: Always enable RLS and create proper policies
3. **Performance**: Optimize queries and use pagination
4. **UI/UX**: Follow accessibility guidelines and responsive design
5. **Testing**: Write tests for both database and UI components

This setup provides a solid foundation for building scalable applications with Supabase!

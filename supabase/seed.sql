-- Original seed data
insert into meetups
  (title, country, launch_week, start_at, is_published)
values
  ('New York', 'USA', 'lw12', now(), true),
  ('London', 'UK', 'lw12', now(), true),
  ('Singapore', 'Singapore', 'lw12', now(), true);

insert into public.launch_weeks (id) values ('lw14');

-- Insert mock error codes for testing
insert into content.error (code, service, http_status_code, message)
values
  (
    'test_code',
    (select id from content.service where name = 'AUTH'),
    500,
    'This is a test error message'
  ),
  ('test_code2', (select id from content.service where name = 'AUTH'), 429, 'Too many requests'),
  (
    'test_code3',
    (select id from content.service where name = 'REALTIME'),
    500,
    'A realtime error message'
  );

-- Custom seed data for our app schema
-- Note: In a real application, user_profiles would be populated via triggers when users sign up
-- This is just for demonstration purposes

-- Sample posts data (assuming some users exist)
-- insert into app.posts (user_id, title, content, slug, published)
-- values
--   ('00000000-0000-0000-0000-000000000001', 'Welcome to My Blog', 'This is my first blog post!', 'welcome-to-my-blog', true),
--   ('00000000-0000-0000-0000-000000000001', 'Getting Started with Supabase', 'Supabase is an amazing platform...', 'getting-started-supabase', true),
--   ('00000000-0000-0000-0000-000000000002', 'Draft Post', 'This is a draft post', 'draft-post', false);

-- Note: Uncomment and modify the above inserts with actual user IDs after users are created

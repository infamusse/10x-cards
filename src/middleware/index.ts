import { defineMiddleware } from 'astro:middleware';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

export const onRequest = defineMiddleware(async (context, next) => {
  if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase environment variables');
    return new Response('Server configuration error', { status: 500 });
  }

  // Create Supabase client
  const supabase = createClient(supabaseUrl, supabaseKey);
  
  // Add to context
  context.locals.supabase = supabase;

  // Continue to endpoint
  return next();
});

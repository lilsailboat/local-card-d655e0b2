// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://judyswgijriopberqipv.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp1ZHlzd2dpanJpb3BiZXJxaXB2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIxNTYwNTksImV4cCI6MjA2NzczMjA1OX0.OM2gsQ-qV4R5pqE33y3xJtO5KZJbLhQw0HLbq1P7OY8";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});
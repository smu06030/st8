import { Database } from '@/types/supabase/database.type';
import { createBrowserClient } from '@supabase/ssr';
import { SupabaseClient } from '@supabase/supabase-js';

export const createClient = (): SupabaseClient =>
  createBrowserClient<Database>(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

const browserClient: SupabaseClient = createClient();

export default browserClient;

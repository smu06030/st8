import { createBrowserClient } from '@supabase/ssr';
import { SupabaseClient } from '@supabase/supabase-js';
<<<<<<< HEAD
export const createClient = (): SupabaseClient =>
  createBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
const browserClient: SupabaseClient = createClient();
=======

export const createClient = (): SupabaseClient =>
  createBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

const browserClient: SupabaseClient = createClient();

>>>>>>> 51441b5171d17ec4cbf6a309fe20a7a6be1e9e4e
export default browserClient;

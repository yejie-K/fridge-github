import { createClient } from '@supabase/supabase-js';

const envUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const anon = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

// 在生产环境(Cloudflare Pages)下，使用同域代理 /api/supabase
// 在开发环境(Localhost)下，直接连接 Supabase (通常开发机有梯子)
const isProd = import.meta.env.PROD;
const url = isProd ? `${window.location.origin}/api/supabase` : envUrl;

export const isSupabaseEnabled = Boolean(envUrl && anon);

export const supabase = isSupabaseEnabled
  ? createClient(url!, anon!, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: false, // 避免 URL 干扰
        storage: localStorage // 明确指定存储位置
      }
    })
  : undefined as any;


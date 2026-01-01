export const onRequest: PagesFunction = async (context) => {
  const { request, env } = context;
  const url = new URL(request.url);
  
  // 从环境变量获取真实的 Supabase URL，如果没有则使用硬编码的备份（为了防止 env 没生效）
  // 注意：在 Pages Functions 中，环境变量通过 env 参数访问，而不是 import.meta.env
  const SUPABASE_URL = env.VITE_SUPABASE_URL || 'https://zuxjzawzfqdqxmsputpk.supabase.co';

  // 将请求路径中的 /api/supabase 去掉，替换为真实的 Supabase 路径
  // 例如: /api/supabase/auth/v1/token -> /auth/v1/token
  const targetPath = url.pathname.replace('/api/supabase', '');
  const targetUrl = new URL(targetPath + url.search, SUPABASE_URL);

  // 构造新的请求
  const newRequest = new Request(targetUrl.toString(), {
    method: request.method,
    headers: request.headers,
    body: request.body,
    redirect: 'follow',
  });

  // 转发请求
  const response = await fetch(newRequest);

  // 重新构造响应，确保 CORS 头正确（虽然同域代理通常不需要，但为了保险）
  const newResponse = new Response(response.body, response);
  newResponse.headers.set('Access-Control-Allow-Origin', '*');
  
  return newResponse;
};

import { getAppHTML } from './html-template.js';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export default {
  async fetch(request) {
    const url = new URL(request.url);

    // Serve the SPA
    if (url.pathname === '/' || url.pathname === '') {
      return new Response(getAppHTML(), {
        headers: { 'Content-Type': 'text/html; charset=utf-8', 'X-Content-Type-Options': 'nosniff' },
      });
    }

    // RPC proxy — forwards JSON-RPC requests server-side to bypass client CORS
    if (url.pathname === '/rpc') {
      if (request.method === 'OPTIONS') {
        return new Response(null, { headers: CORS_HEADERS });
      }
      if (request.method !== 'POST') {
        return new Response('Method Not Allowed', { status: 405 });
      }

      const target = url.searchParams.get('target');
      if (!target) return new Response('Missing ?target= param', { status: 400 });

      try {
        const body = await request.text();
        const upstream = await fetch(target, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body,
        });
        const text = await upstream.text();
        return new Response(text, {
          status: upstream.status,
          headers: { 'Content-Type': 'application/json', ...CORS_HEADERS },
        });
      } catch (e) {
        return new Response(JSON.stringify({ error: e.message }), {
          status: 502,
          headers: { 'Content-Type': 'application/json', ...CORS_HEADERS },
        });
      }
    }

    return new Response('Not Found', { status: 404 });
  },
};

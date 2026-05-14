# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Local dev server (http://localhost:8787)
npx wrangler dev

# Deploy to Cloudflare Workers
npx wrangler deploy

# Push to GitHub (SSH key authenticates as wrong account — use HTTPS with token)
TOKEN=$(gh auth token --user binhtruong9418) && git push "https://binhtruong9418:${TOKEN}@github.com/binhtruong9418/blockchain-interactor.git" main
```

## Architecture

Two files total:

**`src/worker.js`** — Cloudflare Worker entry point. Handles two routes:
- `GET /` → serves the SPA by calling `getAppHTML()`
- `POST /rpc?target=<url>` → server-side proxy that forwards JSON-RPC requests to `target`, bypassing CORS restrictions on private/internal RPC endpoints

**`src/html-template.js`** — exports `getAppHTML()`, returns a ~1100-line self-contained HTML string (CSS + HTML + JS all inlined). This is the entire frontend. Key JS state: `_prov`, `_signer`, `_contract`, `_net`, `_abi`, `_txHistory`.

## Critical: Template Literal Escaping

`html-template.js` is one big JS template literal. Two escaping rules that **will break the app** if violated:

1. **Single quotes in generated onclick HTML** — use `\\'` (not `\'`). Inside the template literal, `\\'` outputs `\'` in the HTML, which the browser sees as an escaped quote in a JS string.
   ```js
   // Correct:
   html += '<button onclick="toggleCard(\\'' + id + '\\')">';
   // Wrong (produces JS syntax error):
   html += '<button onclick="toggleCard(\'' + id + '\')">'; 
   ```

2. **Newlines in JS strings** — use `\\n` (not `\n`). A bare `\n` in the template literal becomes an actual newline, breaking single-line string literals.
   ```js
   showRes(id, 'TX: ' + tx.hash + '\\nWaiting…', 'info'); // correct
   ```

## RPC Proxy

The ethers.js provider always routes through the worker proxy:
```js
var proxyUrl = window.location.origin + '/rpc?target=' + encodeURIComponent(rpc);
_prov = new ethers.JsonRpcProvider(proxyUrl);
```
`window.location.origin` is required — ethers.js v6 rejects relative URLs (treats them as an unknown protocol).

## Frontend Features

- **Network presets** — dropdown populates the RPC URL field
- **ABI auto-parse** — paste triggers `onAbiInput()` which normalizes old ABI format (`constant:true` → `stateMutability`) and renders function cards
- **Fetch ABI** — `fetchAbi()` tries Sourcify API then repo CDN across multiple chains
- **LocalStorage** — RPC URL (`sc-rpc`), contract address (`sc-addr`), ABI (`sc-abi`), saved wallets (`sc-wallets`), ABI history (`sc-abi-hist`), TX history (`sc-txs`)
- **Event logs** — `queryEvents()` uses ethers `contract.queryFilter()`; supports relative block range (e.g. `-1000`)
- **TX history** — `addTxHistory()` upserts by hash so pending→confirmed updates in place

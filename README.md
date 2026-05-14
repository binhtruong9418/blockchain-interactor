# SC Interactor — Cloudflare Worker

Browser-based smart contract interaction tool served as a Cloudflare Worker.

## Features

- **Wallet connection** — private key + any EVM RPC URL
- **ABI-driven UI** — paste any contract ABI to auto-generate call forms for read and write functions
- **Type-aware inputs** — uint/int (BigInt), address, bool (select), bytes (hex), string, arrays & tuples (JSON)
- **Read functions** — `eth_call` via ethers.js; results decoded and displayed inline
- **Write functions** — sign & broadcast transactions; shows TX hash + confirmation block
- **Payable support** — ETH value field shown automatically for payable functions
- **Native token transfer** — send ETH/BNB/MATIC with ETH / Gwei / Wei unit selector
- **Balance refresh** — live balance display with manual refresh

## Dev

```bash
wrangler dev
# open http://localhost:8787
```

## Deploy

```bash
wrangler deploy
```

## Stack

- Cloudflare Worker (serves HTML)
- [ethers.js v6](https://docs.ethers.org/v6/) via CDN (all signing/encoding in-browser)
- Zero server-side key handling — private key never leaves the browser

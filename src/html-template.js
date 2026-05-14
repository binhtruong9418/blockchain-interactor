// Returns the complete single-page app HTML served by the worker
export function getAppHTML() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Blockchain Interactor</title>
<style>
:root {
  --bg0:#0d1117;--bg1:#161b22;--bg2:#21262d;--border:#30363d;--text:#e6edf3;
  --muted:#8b949e;--blue:#58a6ff;--green:#3fb950;--red:#f85149;--orange:#e3b341;--purple:#bc8cff;
}
*{box-sizing:border-box;margin:0;padding:0;}
body{background:var(--bg0);color:var(--text);font:14px/1.5 -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;min-height:100vh;}
.hdr{background:var(--bg1);border-bottom:1px solid var(--border);padding:10px 24px;display:flex;align-items:center;gap:12px;position:sticky;top:0;z-index:100;}
.hdr h1{font-size:15px;font-weight:600;}
.dot{width:8px;height:8px;border-radius:50%;background:var(--muted);transition:background .3s;flex-shrink:0;}
.dot.on{background:var(--green);}
.tabs{display:flex;gap:2px;margin-left:auto;}
.tab{background:transparent;color:var(--muted);border:1px solid transparent;border-radius:6px;padding:4px 14px;font-size:13px;font-weight:500;cursor:pointer;transition:all .15s;}
.tab:hover{color:var(--text);}
.tab.active{background:var(--bg2);color:var(--text);border-color:var(--border);}
.wrap{max-width:1400px;margin:0 auto;padding:20px 24px;}
.card{background:var(--bg1);border:1px solid var(--border);border-radius:8px;padding:16px;margin-bottom:14px;}
.card-title{font-size:11px;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:.6px;margin-bottom:12px;}
.card-hdr{display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;}
.card-hdr .card-title{margin-bottom:0;}
.grid2{display:grid;grid-template-columns:1fr 1fr;gap:10px;}
.grid3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;}
.span2{grid-column:1/-1;}
.fg{display:flex;flex-direction:column;gap:3px;}
label{font-size:11px;color:var(--muted);font-weight:500;}
input,textarea,select{background:var(--bg2);border:1px solid var(--border);border-radius:6px;color:var(--text);padding:7px 10px;font-size:13px;font-family:'Courier New',monospace;outline:none;width:100%;transition:border-color .15s;}
input:focus,textarea:focus,select:focus{border-color:var(--blue);}
textarea{resize:vertical;}
button{background:var(--blue);color:#fff;border:none;border-radius:6px;padding:7px 16px;font-size:13px;font-weight:600;cursor:pointer;transition:opacity .15s,transform .1s;white-space:nowrap;}
button:hover{opacity:.85;}
button:active{transform:scale(.98);}
button:disabled{opacity:.35;cursor:not-allowed;transform:none;}
button.sec{background:var(--bg2);border:1px solid var(--border);color:var(--text);}
button.sm{padding:4px 8px;font-size:11px;font-weight:600;}
button.danger{background:var(--red);}
.btn-row{display:flex;gap:8px;margin-top:10px;flex-wrap:wrap;}
.wbar{background:var(--bg1);border:1px solid var(--border);border-radius:8px;padding:10px 16px;display:none;align-items:center;gap:18px;flex-wrap:wrap;margin-bottom:14px;}
.wbar.on{display:flex;}
.wchip{display:flex;align-items:center;gap:6px;font-size:12px;}
.wchip .lbl{color:var(--muted);}
.wchip .val{font-family:monospace;cursor:pointer;}
.wchip .val:hover{color:var(--blue);}
.tag{padding:2px 7px;border-radius:999px;font-size:11px;font-weight:600;display:inline-block;}
.t-chain{background:rgba(88,166,255,.15);color:var(--blue);}
.t-read{background:rgba(63,185,80,.15);color:var(--green);}
.t-write{background:rgba(227,179,65,.15);color:var(--orange);}
.t-pay{background:rgba(188,140,255,.15);color:var(--purple);}
.fgrid{display:grid;grid-template-columns:1fr 1fr;gap:16px;}
.col-hdr{font-size:13px;font-weight:600;margin-bottom:8px;display:flex;align-items:center;gap:8px;}
.fc{background:var(--bg1);border:1px solid var(--border);border-radius:8px;margin-bottom:7px;overflow:hidden;}
.fc-hdr{padding:9px 13px;display:flex;align-items:center;justify-content:space-between;cursor:pointer;user-select:none;transition:background .15s;}
.fc-hdr:hover{background:var(--bg2);}
.fc-name{font-weight:600;font-family:monospace;font-size:13px;display:flex;align-items:center;gap:6px;}
.fc-sig{font-family:monospace;font-size:11px;color:var(--muted);margin-top:2px;}
.fc-arr{color:var(--muted);font-size:11px;transition:transform .2s;}
.fc-arr.open{transform:rotate(180deg);}
.fc-body{display:none;padding:12px 13px;border-top:1px solid var(--border);background:var(--bg0);}
.fc-body.open{display:block;}
.pr{margin-bottom:8px;}
.plbl{font-size:11px;color:var(--muted);margin-bottom:3px;display:flex;align-items:center;gap:5px;}
.tbadge{background:var(--bg2);border:1px solid var(--border);padding:1px 5px;border-radius:3px;font-family:monospace;font-size:10px;color:var(--purple);}
.input-row{display:flex;gap:4px;align-items:center;}
.input-row input,.input-row textarea{flex:1;}
.mul-btns{display:flex;flex-direction:column;gap:2px;flex-shrink:0;}
.mul-btn{background:var(--bg2);border:1px solid var(--border);color:var(--orange);border-radius:4px;padding:2px 6px;font-size:10px;font-weight:700;cursor:pointer;white-space:nowrap;line-height:1.4;}
.mul-btn:hover{border-color:var(--orange);background:rgba(227,179,65,.1);}
.rbox{margin-top:10px;padding:8px 10px;background:var(--bg2);border:1px solid var(--border);border-radius:6px;font-family:monospace;font-size:12px;word-break:break-all;white-space:pre-wrap;display:none;}
.rbox.show{display:block;}
.rbox.ok{border-color:var(--green);color:var(--green);}
.rbox.err{border-color:var(--red);color:var(--red);}
.rbox.info{border-color:var(--blue);color:var(--blue);}
.rlbl{font-size:10px;font-weight:700;text-transform:uppercase;opacity:.65;margin-bottom:4px;}
.tgrid{display:grid;grid-template-columns:2fr 1fr 120px auto;gap:10px;align-items:end;}
/* Saved wallets */
.wallet-list{display:flex;flex-direction:column;gap:6px;margin-bottom:8px;}
.wallet-item{display:flex;align-items:center;gap:8px;background:var(--bg2);border:1px solid var(--border);border-radius:6px;padding:8px 10px;font-size:12px;}
.wallet-lbl{font-weight:600;flex:0 0 100px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
.wallet-addr{font-family:monospace;color:var(--muted);flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
.wallet-btns{display:flex;gap:4px;flex-shrink:0;}
/* TX history */
.tx-list{display:flex;flex-direction:column;gap:4px;}
.tx-item{display:flex;align-items:center;gap:8px;background:var(--bg2);border:1px solid var(--border);border-radius:6px;padding:7px 10px;font-size:12px;}
.tx-fn{font-weight:600;font-family:monospace;flex:0 0 130px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
.tx-hash{font-family:monospace;color:var(--muted);flex:1;overflow:hidden;text-overflow:ellipsis;cursor:pointer;white-space:nowrap;}
.tx-hash:hover{color:var(--blue);}
.tx-status{flex:0 0 75px;text-align:center;}
.tx-block{flex:0 0 65px;color:var(--muted);text-align:right;font-family:monospace;font-size:11px;}
.tx-link{flex:0 0 55px;text-align:right;}
.tx-link a{color:var(--blue);font-size:11px;text-decoration:none;}
.tx-link a:hover{text-decoration:underline;}
/* Events */
.evt-item{background:var(--bg2);border:1px solid var(--border);border-radius:6px;padding:8px 10px;margin-bottom:6px;}
.evt-name{font-weight:700;color:var(--purple);font-family:monospace;font-size:12px;margin-bottom:4px;}
.evt-args{font-family:monospace;font-size:11px;color:var(--text);white-space:pre-wrap;word-break:break-all;}
.evt-meta{font-size:10px;color:var(--muted);margin-top:4px;}
/* Utils */
.util-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px;}
.util-card{background:var(--bg1);border:1px solid var(--border);border-radius:8px;padding:14px;}
.util-title{font-size:12px;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:.5px;margin-bottom:10px;}
.util-row{display:flex;gap:6px;align-items:center;margin-bottom:8px;flex-wrap:wrap;}
.util-row input,.util-row select{flex:1;min-width:80px;}
.util-out{background:var(--bg2);border:1px solid var(--border);border-radius:6px;padding:7px 10px;font-family:monospace;font-size:12px;word-break:break-all;min-height:34px;color:var(--blue);cursor:pointer;}
.util-out:hover{border-color:var(--blue);}
.spin{display:inline-block;width:11px;height:11px;border:2px solid rgba(255,255,255,.3);border-top-color:#fff;border-radius:50%;animation:sp .6s linear infinite;}
@keyframes sp{to{transform:rotate(360deg);}}
#toast{position:fixed;bottom:22px;right:22px;background:var(--bg1);border:1px solid var(--border);border-radius:8px;padding:11px 15px;font-size:13px;max-width:360px;word-break:break-all;z-index:999;display:none;box-shadow:0 8px 24px rgba(0,0,0,.55);}
#toast.show{display:block;}
#toast.ok{border-color:var(--green);}
#toast.err{border-color:var(--red);}
.hidden{display:none!important;}
.empty{text-align:center;color:var(--muted);padding:20px;font-size:12px;}
.hint{font-size:11px;color:var(--muted);margin-top:6px;}
@media(max-width:860px){
  .fgrid{grid-template-columns:1fr;}
  .grid2{grid-template-columns:1fr;}
  .grid3{grid-template-columns:1fr;}
  .tgrid{grid-template-columns:1fr 1fr;}
  .util-grid{grid-template-columns:1fr;}
  .tx-fn,.tx-block,.tx-link{display:none;}
}
</style>
</head>
<body>

<header class="hdr">
  <div id="dot" class="dot"></div>
  <h1>⛓ Blockchain Interactor</h1>
  <div class="tabs">
    <button class="tab active" id="tab-contract" onclick="switchTab('contract')">Contract</button>
    <button class="tab" id="tab-utils" onclick="switchTab('utils')">Utils</button>
  </div>
</header>

<!-- CONTRACT PAGE -->
<div id="page-contract" class="wrap">

  <div class="card">
    <div class="card-title">Configuration</div>
    <div class="fg span2" style="margin-bottom:10px">
      <label>Quick Network Select</label>
      <select id="netPreset" onchange="selectNetwork(this.value)">
        <option value="">— select preset or enter RPC manually —</option>
        <option value="https://eth.llamarpc.com">Ethereum Mainnet</option>
        <option value="https://bsc-dataseed.binance.org">BSC Mainnet</option>
        <option value="https://data-seed-prebsc-1-s1.binance.org:8545">BSC Testnet</option>
        <option value="https://polygon-rpc.com">Polygon Mainnet</option>
        <option value="https://arb1.arbitrum.io/rpc">Arbitrum One</option>
        <option value="https://mainnet.optimism.io">Optimism</option>
        <option value="https://api.avax.network/ext/bc/C/rpc">Avalanche C-Chain</option>
        <option value="https://mainnet.base.org">Base</option>
        <option value="https://rpc.ftm.tools">Fantom</option>
      </select>
    </div>
    <div class="grid2">
      <div class="fg">
        <label>Private Key</label>
        <input type="password" id="pk" placeholder="0x..." autocomplete="off" />
      </div>
      <div class="fg">
        <label>RPC URL</label>
        <input type="text" id="rpc" placeholder="https://..." oninput="lsSet('sc-rpc',this.value)" onchange="lsSet('sc-rpc',this.value)" />
      </div>
      <div class="fg">
        <label>Contract Address <span style="color:var(--muted)">(optional)</span></label>
        <div class="input-row">
          <input type="text" id="addr" placeholder="0x..." oninput="onAddrInput()" onchange="onAddrInput()" />
          <button class="sm sec" id="fetchAbiBtn" onclick="fetchAbi()" title="Fetch ABI from Sourcify">📥 ABI</button>
        </div>
      </div>
      <div class="fg span2">
        <label>Contract ABI — paste to see functions instantly</label>
        <textarea id="abi" rows="4" placeholder='[{"type":"function","name":"balanceOf","inputs":[{"name":"account","type":"address"}],"outputs":[{"type":"uint256"}],"stateMutability":"view"}]' oninput="onAbiInput()" onpaste="setTimeout(onAbiInput,100)" onchange="onAbiInput()"></textarea>
        <div style="display:flex;align-items:center;gap:8px;margin-top:6px;flex-wrap:wrap">
          <button type="button" onclick="onAbiInput()" style="background:var(--purple);padding:5px 12px;font-size:12px">⟳ Load ABI</button>
          <div id="abiStatus" style="font-size:11px;color:var(--muted);flex:1;min-width:100px"></div>
          <select id="abiHistSel" style="max-width:200px;font-size:12px;padding:4px 8px">
            <option value="">— Load saved ABI —</option>
          </select>
          <button class="sm sec" onclick="loadAbiFromHistory()">Load</button>
          <button class="sm sec" onclick="saveAbiToHistory()" title="Save ABI to history">💾</button>
        </div>
      </div>
    </div>
    <div class="btn-row">
      <button onclick="doConnect()">Connect Wallet</button>
      <button class="sec" onclick="doDisconnect()">Disconnect</button>
      <button class="sm sec" style="margin-left:auto" onclick="togglePanel('walletPanel')">👛 Wallets</button>
    </div>
    <div class="hint">⚡ Paste ABI → see functions instantly &nbsp;·&nbsp; RPC+Address+ABI auto-saved &nbsp;·&nbsp; Numbers passed as raw integers</div>
  </div>

  <!-- Saved Wallets -->
  <div id="walletPanel" class="card hidden">
    <div class="card-hdr">
      <div class="card-title">Saved Wallets</div>
      <button class="sm" onclick="saveCurrentWallet()">+ Save Current PK</button>
    </div>
    <div class="hint" style="margin-bottom:10px">⚠ Private keys stored in localStorage — use dev/test wallets only.</div>
    <div id="walletList" class="wallet-list"></div>
  </div>

  <div class="wbar" id="wbar">
    <div class="wchip"><span class="lbl">Chain</span><span class="tag t-chain" id="wChain">—</span></div>
    <div class="wchip"><span class="lbl">Address</span><span class="val" id="wAddr" title="" onclick="copyText(this.title)">—</span></div>
    <div class="wchip"><span class="lbl">Balance</span><span class="val" id="wBal">—</span></div>
    <div class="wchip" id="wExplorer" style="display:none">
      <a id="wExplorerLink" href="#" target="_blank" style="color:var(--blue);font-size:12px">Explorer ↗</a>
    </div>
    <button class="sec" style="margin-left:auto;font-size:11px;padding:4px 10px" onclick="refreshBal()">↻</button>
  </div>

  <div class="card">
    <div class="card-title">Transfer Native Token</div>
    <div class="tgrid">
      <div class="fg"><label>Recipient</label><input type="text" id="txTo" placeholder="0x..." /></div>
      <div class="fg"><label>Amount</label><input type="text" id="txAmt" placeholder="0.01" /></div>
      <div class="fg">
        <label>Unit</label>
        <select id="txUnit">
          <option value="ether">ETH / 18 dec</option>
          <option value="gwei">Gwei / 9 dec</option>
          <option value="wei">Wei (raw)</option>
        </select>
      </div>
      <div class="fg"><label>&nbsp;</label><button id="txBtn" onclick="sendNative()">Send ↗</button></div>
    </div>
    <div class="rbox" id="txResult"></div>
  </div>

  <div id="fnSection" class="hidden">
    <div class="fgrid">
      <div>
        <div class="col-hdr"><span class="tag t-read">READ</span> View / Pure</div>
        <div id="readFns"></div>
      </div>
      <div>
        <div class="col-hdr"><span class="tag t-write">WRITE</span> State-changing</div>
        <div id="writeFns"></div>
      </div>
    </div>
  </div>

  <!-- Event Logs -->
  <div id="evtSection" class="card hidden" style="margin-top:4px">
    <div class="card-title">Query Event Logs</div>
    <div class="grid3">
      <div class="fg">
        <label>Event</label>
        <select id="evtSel"><option value="">— select event —</option></select>
      </div>
      <div class="fg">
        <label>From Block <span style="color:var(--muted)">(-1000 = last 1000 blocks)</span></label>
        <input type="text" id="evtFrom" placeholder="-1000" />
      </div>
      <div class="fg">
        <label>To Block</label>
        <input type="text" id="evtTo" placeholder="latest" />
      </div>
    </div>
    <div class="btn-row" style="margin-bottom:10px">
      <button onclick="queryEvents()" style="background:var(--purple)">Query ↓</button>
    </div>
    <div id="evtResults"></div>
  </div>

  <!-- TX History -->
  <div class="card" style="margin-top:14px">
    <div class="card-hdr">
      <div class="card-title" style="cursor:pointer" onclick="togglePanel('txHistBody')">Recent Transactions</div>
      <button class="sm sec" onclick="clearTxHist()">Clear</button>
    </div>
    <div id="txHistBody">
      <div id="txList" class="tx-list"></div>
    </div>
  </div>

</div>

<!-- UTILS PAGE -->
<div id="page-utils" class="wrap hidden">
  <div class="util-grid">
    <div class="util-card">
      <div class="util-title">Token Amount Converter</div>
      <div class="util-row">
        <input type="text" id="u-amt" placeholder="1.5" />
        <select id="u-dec" style="max-width:90px">
          <option value="18" selected>18 dec</option>
          <option value="9">9 dec</option>
          <option value="8">8 dec</option>
          <option value="6">6 dec</option>
          <option value="0">0 dec</option>
        </select>
      </div>
      <div class="util-row">
        <button onclick="utilParseAmt()" style="background:var(--green)">→ Raw integer</button>
        <button onclick="utilFormatAmt()" class="sec">← Format from raw</button>
      </div>
      <div class="util-out" id="u-amt-out" onclick="copyOut(this)">result</div>
    </div>

    <div class="util-card">
      <div class="util-title">Hex ↔ Decimal</div>
      <div class="util-row">
        <input type="text" id="u-hex" placeholder="0x1a" />
        <button onclick="utilHexToDec()" style="background:var(--purple)">→ Dec</button>
      </div>
      <div class="util-row">
        <input type="text" id="u-dec2" placeholder="26" />
        <button onclick="utilDecToHex()" style="background:var(--purple)">→ Hex</button>
      </div>
      <div class="util-out" id="u-hex-out" onclick="copyOut(this)">result</div>
    </div>

    <div class="util-card">
      <div class="util-title">Hex ↔ UTF-8 String</div>
      <div class="util-row">
        <input type="text" id="u-hexstr" placeholder="0x48656c6c6f" />
        <button onclick="utilHexToStr()" style="background:var(--blue)">→ String</button>
      </div>
      <div class="util-row">
        <input type="text" id="u-str" placeholder="Hello" />
        <button onclick="utilStrToHex()" style="background:var(--blue)">→ Hex</button>
      </div>
      <div class="util-out" id="u-str-out" onclick="copyOut(this)">result</div>
    </div>

    <div class="util-card">
      <div class="util-title">Keccak256 Hash</div>
      <div class="util-row">
        <input type="text" id="u-k256" placeholder="transfer(address,uint256)" />
        <select id="u-k256-type" style="max-width:80px">
          <option value="str">string</option>
          <option value="hex">hex</option>
        </select>
        <button onclick="utilKeccak()" style="background:var(--orange)">Hash</button>
      </div>
      <div style="font-size:11px;color:var(--muted);margin-bottom:6px">First 4 bytes = function selector</div>
      <div class="util-out" id="u-k256-out" onclick="copyOut(this)">result</div>
    </div>

    <div class="util-card">
      <div class="util-title">Address Checksum (EIP-55)</div>
      <div class="util-row">
        <input type="text" id="u-chk" placeholder="0xd8da6bf26964af9d7eed9e03e53415d37aa96045" />
        <button onclick="utilChecksum()" style="background:var(--green)">Checksum</button>
      </div>
      <div class="util-out" id="u-chk-out" onclick="copyOut(this)">result</div>
    </div>

    <div class="util-card">
      <div class="util-title">Private Key → Address</div>
      <div class="util-row">
        <input type="password" id="u-pk2addr" placeholder="0x..." autocomplete="off" />
        <button onclick="utilPkToAddr()" style="background:var(--blue)">Derive</button>
      </div>
      <div class="util-out" id="u-pk2addr-out" onclick="copyOut(this)">result</div>
    </div>

    <div class="util-card">
      <div class="util-title">Bytes32 ↔ String</div>
      <div class="util-row">
        <input type="text" id="u-b32" placeholder="0x48656c6c6f..." />
        <button onclick="utilBytes32ToStr()" style="background:var(--purple)">→ String</button>
      </div>
      <div class="util-row">
        <input type="text" id="u-b32str" placeholder="Hello" />
        <button onclick="utilStrToBytes32()" style="background:var(--purple)">→ Bytes32</button>
      </div>
      <div class="util-out" id="u-b32-out" onclick="copyOut(this)">result</div>
    </div>

    <div class="util-card">
      <div class="util-title">Unix Timestamp ↔ DateTime</div>
      <div class="util-row">
        <input type="text" id="u-unix" placeholder="1700000000" />
        <button onclick="utilUnixToDate()" style="background:var(--blue)">→ Date</button>
      </div>
      <div class="util-row">
        <input type="datetime-local" id="u-date" />
        <button onclick="utilDateToUnix()" style="background:var(--blue)">→ Unix</button>
      </div>
      <div class="util-out" id="u-ts-out" onclick="copyOut(this)">result</div>
    </div>

    <div class="util-card span2">
      <div class="util-title">ABI Encode / Decode</div>
      <div class="util-row">
        <input type="text" id="u-abi-sig" placeholder='transfer(address,uint256)' style="flex:2" />
        <input type="text" id="u-abi-args" placeholder='["0xabc...", "1000000000000000000"]' style="flex:3" />
        <button onclick="utilAbiEncode()" style="background:var(--orange)">Encode</button>
      </div>
      <div style="font-size:11px;color:var(--muted);margin-bottom:6px">Decode calldata:</div>
      <div class="util-row">
        <input type="text" id="u-abi-dec-sig" placeholder='transfer(address,uint256)' style="flex:2" />
        <input type="text" id="u-abi-dec-data" placeholder="0xa9059cbb..." style="flex:3" />
        <button onclick="utilAbiDecode()" class="sec">Decode</button>
      </div>
      <div class="util-out" id="u-abi-out" onclick="copyOut(this)">result</div>
    </div>
  </div>
</div>

<div id="toast"></div>

<script src="https://cdn.jsdelivr.net/npm/ethers@6/dist/ethers.umd.min.js"></script>
<script>
// ── Constants ─────────────────────────────────────────────────────────────────
var EXPLORERS={1:'https://etherscan.io',56:'https://bscscan.com',97:'https://testnet.bscscan.com',137:'https://polygonscan.com',80001:'https://mumbai.polygonscan.com',80002:'https://amoy.polygonscan.com',42161:'https://arbiscan.io',10:'https://optimistic.etherscan.io',43114:'https://snowtrace.io',250:'https://ftmscan.com',8453:'https://basescan.org',25:'https://cronoscan.com',100:'https://gnosisscan.io',59144:'https://lineascan.build',534352:'https://scrollscan.com'};

// ── State ─────────────────────────────────────────────────────────────────────
var _prov=null,_signer=null,_contract=null,_net=null,_abi=null,_txHistory=[];

// ── LocalStorage helpers ──────────────────────────────────────────────────────
function lsGet(k){try{return localStorage.getItem(k);}catch(_){return null;}}
function lsSet(k,v){try{localStorage.setItem(k,v);}catch(_){}}
function lsGetJ(k){try{return JSON.parse(lsGet(k)||'null');}catch(_){return null;}}
function lsSetJ(k,v){lsSet(k,JSON.stringify(v));}

// ── Init ──────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded',function(){
  var r=lsGet('sc-rpc'),a=lsGet('sc-addr'),b=lsGet('sc-abi');
  if(r) document.getElementById('rpc').value=r;
  if(a) document.getElementById('addr').value=a;
  if(b){document.getElementById('abi').value=b;onAbiInput();}
  var savedTxs=lsGetJ('sc-txs');
  if(savedTxs) _txHistory=savedTxs;
  renderWallets();
  renderAbiHistory();
  renderTxHistory();
});

// ── Tabs ──────────────────────────────────────────────────────────────────────
function switchTab(name){
  document.getElementById('page-contract').classList.toggle('hidden',name!=='contract');
  document.getElementById('page-utils').classList.toggle('hidden',name!=='utils');
  document.getElementById('tab-contract').classList.toggle('active',name==='contract');
  document.getElementById('tab-utils').classList.toggle('active',name==='utils');
}
function togglePanel(id){
  document.getElementById(id).classList.toggle('hidden');
}

// ── Network preset ────────────────────────────────────────────────────────────
function selectNetwork(rpc){
  if(!rpc) return;
  document.getElementById('rpc').value=rpc;
  lsSet('sc-rpc',rpc);
}

// ── Address input ─────────────────────────────────────────────────────────────
function onAddrInput(){
  var addr=document.getElementById('addr').value.trim();
  lsSet('sc-addr',addr);
  if(addr.length===42&&addr.startsWith('0x')&&!document.getElementById('abi').value.trim()){
    document.getElementById('abiStatus').textContent='💡 Click "📥 ABI" to fetch from Sourcify';
    document.getElementById('abiStatus').style.color='var(--muted)';
  }
}

// ── Fetch ABI from Sourcify ───────────────────────────────────────────────────
async function fetchAbi(){
  var addr=document.getElementById('addr').value.trim();
  if(!addr) return toast('Enter contract address first','err');
  var chainId=_net?Number(_net.chainId):null;
  var chains=chainId?[chainId]:[1,56,137,42161,10,8453,97,80001,43114,250];
  var btn=document.getElementById('fetchAbiBtn');
  btn.disabled=true;btn.innerHTML='<span class="spin"></span>';
  var found=null;
  for(var i=0;i<chains.length&&!found;i++){
    try{
      var r=await fetch('https://sourcify.dev/server/v2/contract/'+chains[i]+'/'+addr+'?fields=abi');
      if(r.ok){var d=await r.json();if(d&&d.abi){found={abi:d.abi,chain:chains[i]};break;}}
    }catch(_){}
    try{
      var r2=await fetch('https://repo.sourcify.dev/contracts/full_match/'+chains[i]+'/'+addr+'/metadata.json');
      if(r2.ok){var m=await r2.json();if(m&&m.output&&m.output.abi){found={abi:m.output.abi,chain:chains[i]};break;}}
    }catch(_){}
  }
  btn.disabled=false;btn.textContent='📥 ABI';
  if(!found) return toast('Not found on Sourcify — contract may not be verified','err');
  var s=JSON.stringify(found.abi,null,2);
  document.getElementById('abi').value=s;
  lsSet('sc-abi',s);
  onAbiInput();
  toast('ABI loaded from Sourcify (chain '+found.chain+')','ok');
}

// ── ABI input ─────────────────────────────────────────────────────────────────
function onAbiInput(){
  var raw=document.getElementById('abi').value.trim();
  var statusEl=document.getElementById('abiStatus');
  function setStatus(m,c){statusEl.textContent=m;statusEl.style.color=c;}
  if(!raw){setStatus('','');return;}
  var parsed;
  try{parsed=JSON.parse(raw);}
  catch(e){setStatus('✗ JSON error: '+e.message,'var(--red)');return;}
  if(!Array.isArray(parsed)){setStatus('⚠ ABI must be a JSON array','var(--orange)');return;}
  var normalized=parsed.map(function(item){
    if(!item||typeof item!=='object') return item;
    if(item.type==='function'&&!item.stateMutability)
      item.stateMutability=item.constant?'view':'nonpayable';
    return item;
  });
  var fns=normalized.filter(function(x){return x.type==='function'&&x.name;});
  if(!fns.length){setStatus('⚠ No callable functions found','var(--orange)');return;}
  _abi=normalized;
  lsSet('sc-abi',raw);
  if(_prov){
    var addr=document.getElementById('addr').value.trim();
    if(addr){try{_contract=new ethers.Contract(addr,_abi,_signer||_prov);}catch(_){}}
  }
  try{
    renderFns(normalized);
    renderEventSelector(normalized);
    setStatus('✓ '+fns.length+' functions loaded','var(--green)');
  }catch(e){setStatus('✗ Render error: '+e.message,'var(--red)');console.error(e);}
}

// ── Event selector ────────────────────────────────────────────────────────────
function renderEventSelector(abi){
  var events=abi.filter(function(x){return x.type==='event'&&x.name;});
  var sel=document.getElementById('evtSel');
  sel.innerHTML='<option value="">— select event —</option>';
  events.forEach(function(e){
    var opt=document.createElement('option');
    opt.value=e.name;
    opt.textContent=e.name+'('+(e.inputs||[]).map(function(i){return i.type;}).join(',')+')';
    sel.appendChild(opt);
  });
  document.getElementById('evtSection').classList.toggle('hidden',events.length===0);
}

// ── Connect / Disconnect ──────────────────────────────────────────────────────
async function doConnect(){
  var pk=document.getElementById('pk').value.trim();
  var rpc=document.getElementById('rpc').value.trim();
  var addr=document.getElementById('addr').value.trim();
  var abiS=document.getElementById('abi').value.trim();
  if(!rpc) return toast('RPC URL required','err');
  try{
    var proxyUrl=window.location.origin+'/rpc?target='+encodeURIComponent(rpc);
    _prov=new ethers.JsonRpcProvider(proxyUrl);
    if(pk){
      _signer=new ethers.Wallet(pk,_prov);
      _net=await _prov.getNetwork();
      var bal=await _prov.getBalance(_signer.address);
      showWalletBar(_net,_signer.address,bal);
      toast('Connected — chain '+_net.chainId,'ok');
    }else{
      _net=await _prov.getNetwork();
      toast('RPC connected (read-only) — chain '+_net.chainId,'ok');
    }
    document.getElementById('dot').classList.add('on');
    if(abiS&&addr){
      try{
        if(!_abi) _abi=JSON.parse(abiS);
        _contract=new ethers.Contract(addr,_abi,_signer||_prov);
        if(_abi) renderFns(_abi);
      }catch(e){toast('ABI error: '+e.message,'err');}
    }
  }catch(e){toast('Connect failed: '+e.message,'err');}
}

function doDisconnect(){
  _prov=_signer=_contract=_net=null;
  document.getElementById('wbar').classList.remove('on');
  document.getElementById('dot').classList.remove('on');
  document.getElementById('wExplorer').style.display='none';
  toast('Disconnected');
}

async function refreshBal(){
  if(!_signer||!_prov) return;
  var bal=await _prov.getBalance(_signer.address);
  document.getElementById('wBal').textContent=parseFloat(ethers.formatEther(bal)).toFixed(6)+' '+nativeSym(_net);
}

function showWalletBar(net,addr,bal){
  document.getElementById('wbar').classList.add('on');
  var label=(net.name&&net.name!=='unknown')?net.name+' #'+net.chainId:'#'+net.chainId;
  document.getElementById('wChain').textContent=label;
  var addrEl=document.getElementById('wAddr');
  addrEl.textContent=addr.slice(0,6)+'...'+addr.slice(-4);
  addrEl.title=addr;
  document.getElementById('wBal').textContent=parseFloat(ethers.formatEther(bal)).toFixed(6)+' '+nativeSym(net);
  var base=EXPLORERS[Number(net.chainId)];
  if(base){
    document.getElementById('wExplorer').style.display='flex';
    document.getElementById('wExplorerLink').href=base+'/address/'+addr;
  }
}

function nativeSym(net){
  var m={56:'BNB',97:'BNB',137:'MATIC',80001:'MATIC',80002:'POL',43114:'AVAX',250:'FTM',25:'CRO'};
  return m[Number(net&&net.chainId)]||'ETH';
}

// ── Toast / copy ──────────────────────────────────────────────────────────────
var _tt;
function toast(msg,type){
  var el=document.getElementById('toast');
  el.textContent=msg;
  el.className='show'+(type?' '+type:'');
  clearTimeout(_tt);_tt=setTimeout(function(){el.classList.remove('show');},4000);
}
function copyText(text){
  navigator.clipboard.writeText(text).then(function(){toast('Copied!','ok');});
}
function copyOut(el){
  var t=el.textContent.trim();
  if(t&&t!=='result') copyText(t);
}

// ── Saved Wallets ─────────────────────────────────────────────────────────────
function getWallets(){return lsGetJ('sc-wallets')||[];}

function saveCurrentWallet(){
  var pk=document.getElementById('pk').value.trim();
  if(!pk) return toast('Enter private key first','err');
  var label=prompt('Wallet label (e.g. "dev wallet 1"):');
  if(!label) return;
  try{
    var addr=new ethers.Wallet(pk).address;
    var wallets=getWallets();
    if(wallets.find(function(w){return w.addr===addr;})) return toast('Already saved','err');
    wallets.push({label:label,pk:pk,addr:addr});
    lsSetJ('sc-wallets',wallets);
    renderWallets();
    toast('Wallet saved','ok');
  }catch(e){toast('Invalid key: '+e.message,'err');}
}

function loadWallet(idx){
  var w=getWallets()[idx];
  if(!w) return;
  document.getElementById('pk').value=w.pk;
  toast('Loaded — click Connect to activate','ok');
}

function deleteWallet(idx){
  if(!confirm('Delete this wallet?')) return;
  var wallets=getWallets();
  wallets.splice(idx,1);
  lsSetJ('sc-wallets',wallets);
  renderWallets();
}

function renderWallets(){
  var wallets=getWallets();
  var el=document.getElementById('walletList');
  if(!wallets.length){el.innerHTML='<div class="empty">No saved wallets</div>';return;}
  el.innerHTML=wallets.map(function(w,i){
    return '<div class="wallet-item">'+
      '<span class="wallet-lbl">'+esc(w.label)+'</span>'+
      '<span class="wallet-addr">'+w.addr+'</span>'+
      '<div class="wallet-btns">'+
      '<button class="sm" onclick="loadWallet('+i+')">Load</button>'+
      '<button class="sm danger" onclick="deleteWallet('+i+')">✕</button>'+
      '</div></div>';
  }).join('');
}

// ── ABI History ───────────────────────────────────────────────────────────────
function getAbiHist(){return lsGetJ('sc-abi-hist')||[];}

function saveAbiToHistory(){
  var raw=document.getElementById('abi').value.trim();
  if(!raw) return toast('No ABI to save','err');
  var addr=document.getElementById('addr').value.trim();
  var label=(addr?addr.slice(0,10)+'… ':'')+(new Date().toLocaleDateString());
  var hist=getAbiHist();
  hist.unshift({label:label,addr:addr,abi:raw,date:Date.now()});
  if(hist.length>10) hist.pop();
  lsSetJ('sc-abi-hist',hist);
  renderAbiHistory();
  toast('ABI saved','ok');
}

function loadAbiFromHistory(){
  var idx=parseInt(document.getElementById('abiHistSel').value);
  if(isNaN(idx)) return;
  var h=getAbiHist()[idx];
  if(!h) return;
  document.getElementById('abi').value=h.abi;
  if(h.addr) document.getElementById('addr').value=h.addr;
  lsSet('sc-abi',h.abi);
  onAbiInput();
  toast('ABI loaded from history','ok');
}

function renderAbiHistory(){
  var hist=getAbiHist();
  var sel=document.getElementById('abiHistSel');
  sel.innerHTML='<option value="">— Load saved ABI —</option>';
  hist.forEach(function(h,i){
    var opt=document.createElement('option');
    opt.value=i;opt.textContent=h.label||('ABI '+(i+1));
    sel.appendChild(opt);
  });
}

// ── TX History ────────────────────────────────────────────────────────────────
function addTxHistory(hash,fnName,status,blockNum){
  var chainId=_net?Number(_net.chainId):0;
  var existing=_txHistory.find(function(t){return t.hash===hash;});
  if(existing){
    existing.status=status;
    if(blockNum!==null) existing.block=blockNum;
  }else{
    _txHistory.unshift({hash:hash,fn:fnName||'tx',status:status,block:blockNum,chainId:chainId,time:Date.now()});
    if(_txHistory.length>50) _txHistory.pop();
  }
  lsSetJ('sc-txs',_txHistory);
  renderTxHistory();
}

function renderTxHistory(){
  var el=document.getElementById('txList');
  if(!_txHistory.length){el.innerHTML='<div class="empty">No transactions yet</div>';return;}
  el.innerHTML=_txHistory.slice(0,20).map(function(tx){
    var base=EXPLORERS[tx.chainId];
    var txUrl=base?base+'/tx/'+tx.hash:null;
    var short=tx.hash?tx.hash.slice(0,10)+'...'+tx.hash.slice(-6):'?';
    var badge=tx.status==='confirmed'?'<span class="tag t-read" style="font-size:10px">✓</span>':
              tx.status==='failed'   ?'<span class="tag" style="background:rgba(248,81,73,.15);color:var(--red);font-size:10px">✗</span>':
                                      '<span class="tag t-chain" style="font-size:10px">⏳</span>';
    return '<div class="tx-item">'+
      '<span class="tx-fn">'+esc(tx.fn)+'</span>'+
      '<span class="tx-hash" onclick="copyText(\\''+ tx.hash +'\\')" title="Click to copy">'+short+'</span>'+
      '<span class="tx-status">'+badge+'</span>'+
      '<span class="tx-block">'+(tx.block?'#'+tx.block:'')+'</span>'+
      '<span class="tx-link">'+(txUrl?'<a href="'+txUrl+'" target="_blank">View ↗</a>':'')+'</span>'+
      '</div>';
  }).join('');
}

function clearTxHist(){
  _txHistory=[];lsSetJ('sc-txs',[]);renderTxHistory();
}

// ── Query Events ──────────────────────────────────────────────────────────────
async function queryEvents(){
  if(!_prov) return toast('Connect RPC first','err');
  var addr=document.getElementById('addr').value.trim();
  if(!addr) return toast('Enter contract address','err');
  if(!_abi)  return toast('ABI not loaded','err');
  var evtName=document.getElementById('evtSel').value;
  if(!evtName) return toast('Select an event','err');
  var fromRaw=document.getElementById('evtFrom').value.trim();
  var toRaw=document.getElementById('evtTo').value.trim()||'latest';
  var fromBlock;
  if(!fromRaw){
    fromBlock=0;
  }else if(fromRaw.startsWith('-')){
    try{var latest=await _prov.getBlockNumber();fromBlock=latest+parseInt(fromRaw);if(fromBlock<0)fromBlock=0;}
    catch(_){fromBlock=0;}
  }else{
    fromBlock=parseInt(fromRaw)||0;
  }
  var resEl=document.getElementById('evtResults');
  resEl.innerHTML='<div class="empty">Querying…</div>';
  try{
    if(!_contract) _contract=new ethers.Contract(addr,_abi,_signer||_prov);
    var events=await _contract.queryFilter(evtName,fromBlock,toRaw);
    if(!events.length){resEl.innerHTML='<div class="empty">No events in range</div>';return;}
    var evtDef=_abi.find(function(x){return x.type==='event'&&x.name===evtName;});
    var base=_net?EXPLORERS[Number(_net.chainId)]:null;
    resEl.innerHTML=events.slice(0,100).map(function(e){
      var args={};
      if(e.args&&evtDef&&evtDef.inputs){
        evtDef.inputs.forEach(function(inp,i){args[inp.name||'arg'+i]=fmtVal(e.args[i]);});
      }
      var txLink=base?'<a href="'+base+'/tx/'+e.transactionHash+'" target="_blank" style="color:var(--blue);font-size:10px">tx ↗</a>':'';
      return '<div class="evt-item">'+
        '<div class="evt-name">'+esc(evtName)+' '+txLink+'</div>'+
        '<div class="evt-args">'+esc(JSON.stringify(args,null,2))+'</div>'+
        '<div class="evt-meta">Block '+e.blockNumber+' · '+e.transactionHash.slice(0,14)+'…</div>'+
        '</div>';
    }).join('');
    if(events.length>100) resEl.innerHTML+='<div class="hint">Showing first 100 of '+events.length+'</div>';
  }catch(e){resEl.innerHTML='<div class="empty" style="color:var(--red)">Error: '+esc(e.message)+'</div>';}
}

// ── Render ABI functions ──────────────────────────────────────────────────────
function renderFns(abi){
  var fns=abi.filter(function(x){return x.type==='function'&&x.name;});
  var reads=fns.filter(function(f){return f.stateMutability==='view'||f.stateMutability==='pure';});
  var writes=fns.filter(function(f){return f.stateMutability==='nonpayable'||f.stateMutability==='payable';});
  document.getElementById('readFns').innerHTML=reads.length?reads.map(function(f){return buildCard(f,'read');}).join(''):'<div class="empty">No view/pure functions</div>';
  document.getElementById('writeFns').innerHTML=writes.length?writes.map(function(f){return buildCard(f,'write');}).join(''):'<div class="empty">No write functions</div>';
  document.getElementById('fnSection').classList.remove('hidden');
}

function buildCard(fn,mode){
  var safeName=fn.name||'unknown';
  var id=mode+'_'+safeName+'_'+Math.random().toString(36).slice(2,7);
  var params=fn.inputs||[];
  var outs=(fn.outputs||[]).map(function(o){return o&&o.type?o.type:'?';}).join(', ');
  var isPayable=fn.stateMutability==='payable';
  var sig=safeName+'('+params.map(function(p){return (p.type||'?')+(p.name?' '+p.name:'');}).join(', ')+')'+(outs?' → '+outs:'');
  var html='<div class="fc">';
  html+='<div class="fc-hdr" onclick="toggleCard(\\'' +id+ '\\')">';
  html+='<div><div class="fc-name">'+esc(safeName)+(isPayable?' <span class="tag t-pay">payable</span>':'')+'</div>';
  html+='<div class="fc-sig">'+esc(sig)+'</div></div>';
  html+='<span class="fc-arr" id="'+id+'_arr">▼</span></div>';
  html+='<div class="fc-body" id="'+id+'_body">';
  params.forEach(function(p,i){html+=buildParamInput(p,id+'_p'+i);});
  if(isPayable){
    html+='<div class="pr"><div class="plbl">value <span class="tbadge">ETH — payable</span></div>';
    html+='<input type="text" id="'+id+'_val" placeholder="0.0" /></div>';
  }
  var btnStyle=mode==='read'?'background:var(--green)':'background:var(--orange)';
  var btnLabel=mode==='read'?'Call &#9654;':'Send &#8599;';
  var callFn=mode==='read'?'doRead':'doWrite';
  html+='<div class="btn-row">';
  html+='<button id="'+id+'_btn" style="'+btnStyle+'" onclick="'+callFn+'(\\'' +safeName+ '\\',\\'' +id+ '\\',' +params.length+ ',' +(isPayable?1:0)+ ')">'+btnLabel+'</button>';
  html+='</div><div class="rbox" id="'+id+'_res"></div></div></div>';
  return html;
}

function buildParamInput(p,eid){
  var pType=(p&&p.type)?p.type:'bytes';
  var isArray=pType.indexOf('[')!==-1;
  var isTuple=pType.indexOf('tuple')===0;
  var isBool=pType==='bool';
  var isNum=!isArray&&!isTuple&&(pType.indexOf('uint')===0||pType.indexOf('int')===0);
  var lbl=((p&&p.name)||'param')+' <span class="tbadge">'+esc(pType)+((isArray||isTuple)?' JSON':'')+'</span>';
  var html='<div class="pr"><div class="plbl">'+lbl+'</div>';
  if(isBool){
    html+='<select id="'+eid+'"><option value="true">true</option><option value="false">false</option></select>';
  }else if(isArray||isTuple){
    html+='<textarea id="'+eid+'" rows="2" placeholder="'+esc(jsonHint(pType))+'"></textarea>';
  }else if(isNum){
    html+='<div class="input-row"><input type="text" id="'+eid+'" placeholder="0" />';
    html+='<div class="mul-btns">';
    html+='<button type="button" class="mul-btn" onclick="mulInput(\\'' +eid+ '\\',18)">×10¹⁸</button>';
    html+='<button type="button" class="mul-btn" onclick="mulInput(\\'' +eid+ '\\',6)">×10⁶</button>';
    html+='</div></div><div style="font-size:10px;color:var(--muted);margin-top:2px">raw integer — ×10ⁿ to scale</div>';
  }else{
    html+='<input type="text" id="'+eid+'" placeholder="'+esc(inputHint(pType))+'" />';
  }
  return html+'</div>';
}

function mulInput(id,exp){
  var el=document.getElementById(id);
  var val=(el.value||'').trim();
  if(!val){el.value='1'+'0'.repeat(exp);return;}
  try{el.value=ethers.parseUnits(val,exp).toString();}
  catch(e){toast('Cannot scale "'+val+'": '+e.message,'err');}
}
function inputHint(t){
  if(t==='address') return '0x1234...';
  if(t==='string')  return 'Hello world';
  if(t.indexOf('bytes')===0) return '0x';
  return '';
}
function jsonHint(t){
  if(t.indexOf('address')!==-1) return '["0xabc...","0xdef..."]';
  if(t.indexOf('uint')!==-1||t.indexOf('int')!==-1) return '[1,2,3]';
  if(t.indexOf('tuple')===0) return '["field1",123]';
  return '[]';
}
function toggleCard(id){
  var body=document.getElementById(id+'_body');
  var arr=document.getElementById(id+'_arr');
  arr.classList.toggle('open',body.classList.toggle('open'));
}

// ── Collect args ──────────────────────────────────────────────────────────────
function collectArgs(fnName,id,count){
  var fnDef=_abi&&_abi.find(function(x){return x.type==='function'&&x.name===fnName;});
  if(!fnDef) return null;
  var args=[];
  for(var i=0;i<count;i++){
    var p=fnDef.inputs[i];
    var el=document.getElementById(id+'_p'+i);
    if(!el){args.push('');continue;}
    try{args.push(parseVal(el.value.trim(),p.type));}
    catch(e){toast('Bad input "'+(p.name||i)+'": '+e.message,'err');return null;}
  }
  return args;
}

function parseVal(raw,type){
  if(/\[\d*\]$/.test(type)){
    var base=type.replace(/\[\d*\]$/,'');
    return JSON.parse(raw).map(function(v){return parseVal(String(v),base);});
  }
  if(type.indexOf('tuple')===0) return JSON.parse(raw);
  if(type==='bool') return raw==='true';
  if(type.indexOf('uint')===0||type.indexOf('int')===0) return BigInt(raw);
  if(type.indexOf('bytes')===0) return raw;
  return raw;
}

function fmtVal(v){
  if(v===null||v===undefined) return 'null';
  if(typeof v==='bigint') return v.toString();
  if(typeof v==='boolean') return String(v);
  if(Array.isArray(v)) return '['+v.map(fmtVal).join(', ')+']';
  if(typeof v==='object'){
    var keys=Object.keys(v).filter(function(k){return isNaN(k);});
    if(keys.length){var out={};keys.forEach(function(k){out[k]=fmtVal(v[k]);});return JSON.stringify(out,null,2);}
    try{return '['+Array.from(v).map(fmtVal).join(', ')+']';}catch(_){}
  }
  return String(v);
}

function showRes(id,content,cls){
  var el=document.getElementById(id+'_res');
  el.innerHTML='<div class="rlbl">'+cls+'</div>'+esc(content);
  el.className='rbox show '+cls;
}

function esc(s){
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

// ── Read ──────────────────────────────────────────────────────────────────────
async function doRead(fnName,id,count){
  if(!_contract){
    var addr=document.getElementById('addr').value.trim();
    if(!addr) return toast('Enter Contract Address','err');
    if(!_prov) return toast('Enter RPC URL and Connect','err');
    if(!_abi)  return toast('ABI not loaded','err');
    _contract=new ethers.Contract(addr,_abi,_prov);
  }
  var args=collectArgs(fnName,id,count);
  if(args===null) return;
  var btn=document.getElementById(id+'_btn');
  btn.disabled=true;btn.innerHTML='<span class="spin"></span>';
  try{
    var result=await _contract[fnName].apply(_contract,args);
    showRes(id,fmtVal(result),'ok');
  }catch(e){showRes(id,e.message,'err');}
  finally{btn.disabled=false;btn.innerHTML='Call &#9654;';}
}

// ── Write ─────────────────────────────────────────────────────────────────────
async function doWrite(fnName,id,count,isPayable){
  if(!_signer) return toast('Private key required — Connect Wallet','err');
  if(!_contract){
    var addr=document.getElementById('addr').value.trim();
    if(!addr) return toast('Enter Contract Address','err');
    if(!_abi)  return toast('ABI not loaded','err');
    _contract=new ethers.Contract(addr,_abi,_signer);
  }
  var args=collectArgs(fnName,id,count);
  if(args===null) return;
  if(isPayable){
    var valEl=document.getElementById(id+'_val');
    if(valEl&&valEl.value.trim()){
      try{args.push({value:ethers.parseEther(valEl.value.trim())});}
      catch(e){return toast('Bad ETH value: '+e.message,'err');}
    }
  }
  var btn=document.getElementById(id+'_btn');
  btn.disabled=true;btn.innerHTML='<span class="spin"></span>';
  showRes(id,'Sending transaction…','info');
  try{
    var tx=await _contract[fnName].apply(_contract,args);
    addTxHistory(tx.hash,fnName,'pending',null);
    showRes(id,'TX: '+tx.hash+'\\nWaiting for confirmation…','info');
    var receipt=await tx.wait();
    addTxHistory(tx.hash,fnName,'confirmed',receipt.blockNumber);
    showRes(id,'Confirmed block '+receipt.blockNumber+'\\nTX: '+tx.hash,'ok');
    toast('Confirmed block '+receipt.blockNumber,'ok');
    refreshBal();
  }catch(e){
    showRes(id,e.message,'err');
    toast('TX failed','err');
  }
  finally{btn.disabled=false;btn.innerHTML='Send &#8599;';}
}

// ── Transfer native ───────────────────────────────────────────────────────────
async function sendNative(){
  if(!_signer) return toast('Connect wallet first','err');
  var to=document.getElementById('txTo').value.trim();
  var amt=document.getElementById('txAmt').value.trim();
  var unit=document.getElementById('txUnit').value;
  if(!to)  return toast('Recipient address required','err');
  if(!amt) return toast('Amount required','err');
  var value;
  try{
    if(unit==='ether')     value=ethers.parseEther(amt);
    else if(unit==='gwei') value=ethers.parseUnits(amt,'gwei');
    else                   value=BigInt(amt);
  }catch(e){return toast('Invalid amount: '+e.message,'err');}
  var btn=document.getElementById('txBtn');
  btn.disabled=true;btn.innerHTML='<span class="spin"></span>';
  var res=document.getElementById('txResult');
  res.innerHTML='<div class="rlbl">info</div>Sending…';res.className='rbox show info';
  try{
    var tx=await _signer.sendTransaction({to:to,value:value});
    addTxHistory(tx.hash,'transfer','pending',null);
    res.innerHTML='<div class="rlbl">info</div>'+esc('TX: '+tx.hash+'\\nWaiting…');
    var receipt=await tx.wait();
    addTxHistory(tx.hash,'transfer','confirmed',receipt.blockNumber);
    res.innerHTML='<div class="rlbl">ok</div>'+esc('Confirmed block '+receipt.blockNumber+'\\nTX: '+tx.hash);
    res.className='rbox show ok';
    toast('Transfer confirmed','ok');
    refreshBal();
  }catch(e){
    res.innerHTML='<div class="rlbl">err</div>'+esc(e.message);
    res.className='rbox show err';
    toast('Transfer failed','err');
  }finally{btn.disabled=false;btn.innerHTML='Send &#8599;';}
}

// ═══ UTILS ════════════════════════════════════════════════════════════════════
function setUtilOut(id,text){document.getElementById(id).textContent=text;}
function utilParseAmt(){
  var amt=document.getElementById('u-amt').value.trim(),dec=parseInt(document.getElementById('u-dec').value);
  if(!amt) return;
  try{setUtilOut('u-amt-out',ethers.parseUnits(amt,dec).toString());}catch(e){setUtilOut('u-amt-out','Error: '+e.message);}
}
function utilFormatAmt(){
  var raw=document.getElementById('u-amt').value.trim(),dec=parseInt(document.getElementById('u-dec').value);
  if(!raw) return;
  try{setUtilOut('u-amt-out',ethers.formatUnits(BigInt(raw),dec));}catch(e){setUtilOut('u-amt-out','Error: '+e.message);}
}
function utilHexToDec(){
  var hex=document.getElementById('u-hex').value.trim();if(!hex) return;
  try{setUtilOut('u-hex-out',BigInt(hex.startsWith('0x')?hex:'0x'+hex).toString());}catch(e){setUtilOut('u-hex-out','Error: '+e.message);}
}
function utilDecToHex(){
  var dec=document.getElementById('u-dec2').value.trim();if(!dec) return;
  try{setUtilOut('u-hex-out','0x'+BigInt(dec).toString(16));}catch(e){setUtilOut('u-hex-out','Error: '+e.message);}
}
function utilHexToStr(){
  var hex=document.getElementById('u-hexstr').value.trim();if(!hex) return;
  try{setUtilOut('u-str-out',ethers.toUtf8String(hex));}catch(e){setUtilOut('u-str-out','Error: '+e.message);}
}
function utilStrToHex(){
  var str=document.getElementById('u-str').value;if(!str) return;
  try{setUtilOut('u-str-out',ethers.hexlify(ethers.toUtf8Bytes(str)));}catch(e){setUtilOut('u-str-out','Error: '+e.message);}
}
function utilKeccak(){
  var input=document.getElementById('u-k256').value.trim(),type=document.getElementById('u-k256-type').value;
  if(!input) return;
  try{
    var bytes=type==='hex'?ethers.getBytes(input):ethers.toUtf8Bytes(input);
    var hash=ethers.keccak256(bytes);
    setUtilOut('u-k256-out',hash+'\\nSelector: '+hash.slice(0,10));
  }catch(e){setUtilOut('u-k256-out','Error: '+e.message);}
}
function utilChecksum(){
  var addr=document.getElementById('u-chk').value.trim();if(!addr) return;
  try{setUtilOut('u-chk-out',ethers.getAddress(addr));}catch(e){setUtilOut('u-chk-out','Error: '+e.message);}
}
function utilPkToAddr(){
  var pk=document.getElementById('u-pk2addr').value.trim();if(!pk) return;
  try{setUtilOut('u-pk2addr-out',new ethers.Wallet(pk).address);}catch(e){setUtilOut('u-pk2addr-out','Error: '+e.message);}
}
function utilBytes32ToStr(){
  var b32=document.getElementById('u-b32').value.trim();if(!b32) return;
  try{setUtilOut('u-b32-out',ethers.decodeBytes32String(b32));}catch(e){setUtilOut('u-b32-out','Error: '+e.message);}
}
function utilStrToBytes32(){
  var str=document.getElementById('u-b32str').value.trim();if(!str) return;
  try{setUtilOut('u-b32-out',ethers.encodeBytes32String(str));}catch(e){setUtilOut('u-b32-out','Error: '+e.message);}
}
function utilUnixToDate(){
  var unix=parseInt(document.getElementById('u-unix').value.trim());if(isNaN(unix)) return;
  var d=new Date(unix*1000);setUtilOut('u-ts-out',d.toISOString()+'\\n'+d.toLocaleString());
}
function utilDateToUnix(){
  var val=document.getElementById('u-date').value;if(!val) return;
  setUtilOut('u-ts-out',String(Math.floor(new Date(val).getTime()/1000)));
}
function utilAbiEncode(){
  var sig=document.getElementById('u-abi-sig').value.trim(),args=document.getElementById('u-abi-args').value.trim();
  if(!sig) return;
  try{
    var iface=new ethers.Interface([sig.startsWith('function')?sig:'function '+sig]);
    var fnName=sig.replace('function ','').split('(')[0].trim();
    setUtilOut('u-abi-out',iface.encodeFunctionData(fnName,args?JSON.parse(args):[]));
  }catch(e){setUtilOut('u-abi-out','Error: '+e.message);}
}
function utilAbiDecode(){
  var sig=document.getElementById('u-abi-dec-sig').value.trim(),data=document.getElementById('u-abi-dec-data').value.trim();
  if(!sig||!data) return;
  try{
    var iface=new ethers.Interface([sig.startsWith('function')?sig:'function '+sig]);
    var fnName=sig.replace('function ','').split('(')[0].trim();
    var result=iface.decodeFunctionData(fnName,data);
    setUtilOut('u-abi-out',JSON.stringify(Array.from(result).map(function(v){return typeof v==='bigint'?v.toString():v;}),null,2));
  }catch(e){setUtilOut('u-abi-out','Error: '+e.message);}
}
</script>
</body>
</html>`;
}

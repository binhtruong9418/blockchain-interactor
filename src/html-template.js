// Returns the complete single-page app HTML served by the worker
export function getAppHTML() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>SC Interactor</title>
<style>
:root {
  --bg0: #0d1117; --bg1: #161b22; --bg2: #21262d;
  --border: #30363d; --text: #e6edf3; --muted: #8b949e;
  --blue: #58a6ff; --green: #3fb950; --red: #f85149;
  --orange: #e3b341; --purple: #bc8cff;
}
* { box-sizing: border-box; margin: 0; padding: 0; }
body { background: var(--bg0); color: var(--text); font: 14px/1.5 -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; min-height: 100vh; }

.hdr { background: var(--bg1); border-bottom: 1px solid var(--border); padding: 10px 24px; display: flex; align-items: center; gap: 12px; position: sticky; top: 0; z-index: 100; }
.hdr h1 { font-size: 15px; font-weight: 600; }
.dot { width: 8px; height: 8px; border-radius: 50%; background: var(--muted); transition: background .3s; flex-shrink: 0; }
.dot.on { background: var(--green); }

/* ── Tabs ── */
.tabs { display: flex; gap: 2px; margin-left: auto; }
.tab { background: transparent; color: var(--muted); border: 1px solid transparent; border-radius: 6px; padding: 4px 14px; font-size: 13px; font-weight: 500; cursor: pointer; transition: all .15s; }
.tab:hover { color: var(--text); }
.tab.active { background: var(--bg2); color: var(--text); border-color: var(--border); }

.wrap { max-width: 1400px; margin: 0 auto; padding: 20px 24px; }
.card { background: var(--bg1); border: 1px solid var(--border); border-radius: 8px; padding: 16px; margin-bottom: 14px; }
.card-title { font-size: 11px; font-weight: 700; color: var(--muted); text-transform: uppercase; letter-spacing: .6px; margin-bottom: 12px; }

.grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
.span2 { grid-column: 1 / -1; }
.fg { display: flex; flex-direction: column; gap: 3px; }
label { font-size: 11px; color: var(--muted); font-weight: 500; }
input, textarea, select {
  background: var(--bg2); border: 1px solid var(--border); border-radius: 6px;
  color: var(--text); padding: 7px 10px; font-size: 13px; font-family: 'Courier New', monospace;
  outline: none; width: 100%; transition: border-color .15s;
}
input:focus, textarea:focus, select:focus { border-color: var(--blue); }
textarea { resize: vertical; }
button {
  background: var(--blue); color: #fff; border: none; border-radius: 6px;
  padding: 7px 16px; font-size: 13px; font-weight: 600; cursor: pointer;
  transition: opacity .15s, transform .1s; white-space: nowrap;
}
button:hover { opacity: .85; }
button:active { transform: scale(.98); }
button:disabled { opacity: .35; cursor: not-allowed; transform: none; }
button.sec { background: var(--bg2); border: 1px solid var(--border); color: var(--text); }
button.sm { padding: 4px 8px; font-size: 11px; font-weight: 600; }
.btn-row { display: flex; gap: 8px; margin-top: 10px; flex-wrap: wrap; }

/* ── Wallet bar ── */
.wbar { background: var(--bg1); border: 1px solid var(--border); border-radius: 8px; padding: 10px 16px; display: none; align-items: center; gap: 18px; flex-wrap: wrap; margin-bottom: 14px; }
.wbar.on { display: flex; }
.wchip { display: flex; align-items: center; gap: 6px; font-size: 12px; }
.wchip .lbl { color: var(--muted); }
.wchip .val { font-family: monospace; cursor: pointer; }
.wchip .val:hover { color: var(--blue); }

.tag { padding: 2px 7px; border-radius: 999px; font-size: 11px; font-weight: 600; display: inline-block; }
.t-chain  { background: rgba(88,166,255,.15);  color: var(--blue); }
.t-read   { background: rgba(63,185,80,.15);   color: var(--green); }
.t-write  { background: rgba(227,179,65,.15);  color: var(--orange); }
.t-pay    { background: rgba(188,140,255,.15); color: var(--purple); }

/* ── Functions grid ── */
.fgrid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.col-hdr { font-size: 13px; font-weight: 600; margin-bottom: 8px; display: flex; align-items: center; gap: 8px; }
.fc { background: var(--bg1); border: 1px solid var(--border); border-radius: 8px; margin-bottom: 7px; overflow: hidden; }
.fc-hdr { padding: 9px 13px; display: flex; align-items: center; justify-content: space-between; cursor: pointer; user-select: none; transition: background .15s; }
.fc-hdr:hover { background: var(--bg2); }
.fc-name { font-weight: 600; font-family: monospace; font-size: 13px; display: flex; align-items: center; gap: 6px; }
.fc-sig  { font-family: monospace; font-size: 11px; color: var(--muted); margin-top: 2px; }
.fc-arr  { color: var(--muted); font-size: 11px; transition: transform .2s; }
.fc-arr.open { transform: rotate(180deg); }
.fc-body { display: none; padding: 12px 13px; border-top: 1px solid var(--border); background: var(--bg0); }
.fc-body.open { display: block; }

/* ── Param row ── */
.pr { margin-bottom: 8px; }
.plbl { font-size: 11px; color: var(--muted); margin-bottom: 3px; display: flex; align-items: center; gap: 5px; }
.tbadge { background: var(--bg2); border: 1px solid var(--border); padding: 1px 5px; border-radius: 3px; font-family: monospace; font-size: 10px; color: var(--purple); }

/* ── Input with multiply buttons ── */
.input-row { display: flex; gap: 4px; align-items: center; }
.input-row input, .input-row textarea { flex: 1; }
.mul-btns { display: flex; flex-direction: column; gap: 2px; flex-shrink: 0; }
.mul-btn { background: var(--bg2); border: 1px solid var(--border); color: var(--orange); border-radius: 4px; padding: 2px 6px; font-size: 10px; font-weight: 700; cursor: pointer; white-space: nowrap; line-height: 1.4; }
.mul-btn:hover { border-color: var(--orange); background: rgba(227,179,65,.1); }

/* ── Result box ── */
.rbox { margin-top: 10px; padding: 8px 10px; background: var(--bg2); border: 1px solid var(--border); border-radius: 6px; font-family: monospace; font-size: 12px; word-break: break-all; white-space: pre-wrap; display: none; }
.rbox.show { display: block; }
.rbox.ok   { border-color: var(--green); color: var(--green); }
.rbox.err  { border-color: var(--red);   color: var(--red); }
.rbox.info { border-color: var(--blue);  color: var(--blue); }
.rlbl { font-size: 10px; font-weight: 700; text-transform: uppercase; opacity: .65; margin-bottom: 4px; }

/* ── Transfer ── */
.tgrid { display: grid; grid-template-columns: 2fr 1fr 120px auto; gap: 10px; align-items: end; }

/* ── Utils page ── */
.util-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
.util-card { background: var(--bg1); border: 1px solid var(--border); border-radius: 8px; padding: 14px; }
.util-title { font-size: 12px; font-weight: 700; color: var(--muted); text-transform: uppercase; letter-spacing: .5px; margin-bottom: 10px; }
.util-row { display: flex; gap: 6px; align-items: center; margin-bottom: 8px; flex-wrap: wrap; }
.util-row input, .util-row select { flex: 1; min-width: 80px; }
.util-out { background: var(--bg2); border: 1px solid var(--border); border-radius: 6px; padding: 7px 10px; font-family: monospace; font-size: 12px; word-break: break-all; min-height: 34px; color: var(--blue); cursor: pointer; }
.util-out:hover { border-color: var(--blue); }
.util-out[title]:hover::after { content: " 📋"; }

/* ── Spinner ── */
.spin { display: inline-block; width: 11px; height: 11px; border: 2px solid rgba(255,255,255,.3); border-top-color: #fff; border-radius: 50%; animation: sp .6s linear infinite; }
@keyframes sp { to { transform: rotate(360deg); } }

/* ── Toast ── */
#toast { position: fixed; bottom: 22px; right: 22px; background: var(--bg1); border: 1px solid var(--border); border-radius: 8px; padding: 11px 15px; font-size: 13px; max-width: 360px; word-break: break-all; z-index: 999; display: none; box-shadow: 0 8px 24px rgba(0,0,0,.55); }
#toast.show { display: block; }
#toast.ok  { border-color: var(--green); }
#toast.err { border-color: var(--red); }

.hidden { display: none !important; }
.empty  { text-align: center; color: var(--muted); padding: 20px; font-size: 12px; }
.hint   { font-size: 11px; color: var(--muted); margin-top: 6px; }

@media (max-width: 860px) {
  .fgrid { grid-template-columns: 1fr; }
  .grid2 { grid-template-columns: 1fr; }
  .tgrid { grid-template-columns: 1fr 1fr; }
  .util-grid { grid-template-columns: 1fr; }
}
</style>
</head>
<body>

<header class="hdr">
  <div id="dot" class="dot"></div>
  <h1>⛓ SC Interactor</h1>
  <div class="tabs">
    <button class="tab active" id="tab-contract" onclick="switchTab('contract')">Contract</button>
    <button class="tab" id="tab-utils" onclick="switchTab('utils')">Utils</button>
  </div>
</header>

<!-- ═══ CONTRACT PAGE ════════════════════════════════════════════════════════ -->
<div id="page-contract" class="wrap">

  <div class="card">
    <div class="card-title">Configuration</div>
    <div class="grid2">
      <div class="fg">
        <label>Private Key</label>
        <input type="password" id="pk" placeholder="0x..." autocomplete="off" />
      </div>
      <div class="fg">
        <label>RPC URL</label>
        <input type="text" id="rpc" placeholder="https://mainnet.infura.io/v3/..." />
      </div>
      <div class="fg">
        <label>Contract Address <span style="color:var(--muted)">(optional)</span></label>
        <input type="text" id="addr" placeholder="0x..." />
      </div>
      <div class="fg span2">
        <label>Contract ABI — paste to see functions instantly</label>
        <textarea id="abi" rows="4" placeholder='[{"type":"function","name":"balanceOf","inputs":[{"name":"account","type":"address"}],"outputs":[{"type":"uint256"}],"stateMutability":"view"}]' oninput="onAbiInput()" onpaste="setTimeout(onAbiInput,100)" onchange="onAbiInput()"></textarea>
        <div style="display:flex;align-items:center;gap:8px;margin-top:6px">
          <button type="button" onclick="onAbiInput()" style="background:var(--purple);padding:5px 12px;font-size:12px">⟳ Load ABI</button>
          <div id="abiStatus" style="font-size:11px;color:var(--muted)"></div>
        </div>
      </div>
    </div>
    <div class="btn-row">
      <button onclick="doConnect()">Connect Wallet</button>
      <button class="sec" onclick="doDisconnect()">Disconnect</button>
    </div>
    <div class="hint">⚡ Paste ABI to see functions instantly &nbsp;·&nbsp; RPC required for Read &nbsp;·&nbsp; Private key required for Write &nbsp;·&nbsp; Numbers passed as raw integers</div>
  </div>

  <div class="wbar" id="wbar">
    <div class="wchip"><span class="lbl">Chain</span><span class="tag t-chain" id="wChain">—</span></div>
    <div class="wchip"><span class="lbl">Address</span><span class="val" id="wAddr" title="" onclick="copyText(this.title)">—</span></div>
    <div class="wchip"><span class="lbl">Balance</span><span class="val" id="wBal">—</span></div>
    <button class="sec" style="margin-left:auto;font-size:11px;padding:4px 10px" onclick="refreshBal()">↻</button>
  </div>

  <div class="card">
    <div class="card-title">Transfer Native Token</div>
    <div class="tgrid">
      <div class="fg"><label>Recipient Address</label><input type="text" id="txTo" placeholder="0x..." /></div>
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

</div>

<!-- ═══ UTILS PAGE ═══════════════════════════════════════════════════════════ -->
<div id="page-utils" class="wrap hidden">

  <div class="util-grid">

    <!-- Token amount converter -->
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

    <!-- Hex ↔ Decimal -->
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

    <!-- Hex ↔ UTF-8 String -->
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

    <!-- Keccak256 -->
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

    <!-- Address checksum -->
    <div class="util-card">
      <div class="util-title">Address Checksum (EIP-55)</div>
      <div class="util-row">
        <input type="text" id="u-chk" placeholder="0xd8da6bf26964af9d7eed9e03e53415d37aa96045" />
        <button onclick="utilChecksum()" style="background:var(--green)">Checksum</button>
      </div>
      <div class="util-out" id="u-chk-out" onclick="copyOut(this)">result</div>
    </div>

    <!-- Private key → Address -->
    <div class="util-card">
      <div class="util-title">Private Key → Address</div>
      <div class="util-row">
        <input type="password" id="u-pk2addr" placeholder="0x..." autocomplete="off" />
        <button onclick="utilPkToAddr()" style="background:var(--blue)">Derive</button>
      </div>
      <div class="util-out" id="u-pk2addr-out" onclick="copyOut(this)">result</div>
    </div>

    <!-- Bytes32 ↔ String -->
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

    <!-- Unix timestamp ↔ DateTime -->
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

    <!-- ABI encode function call -->
    <div class="util-card span2">
      <div class="util-title">ABI Encode / Decode</div>
      <div class="util-row">
        <input type="text" id="u-abi-sig" placeholder='transfer(address,uint256)' style="flex:2" />
        <input type="text" id="u-abi-args" placeholder='["0xabc...", "1000000000000000000"]' style="flex:3" />
        <button onclick="utilAbiEncode()" style="background:var(--orange)">Encode</button>
      </div>
      <div style="font-size:11px;color:var(--muted);margin-bottom:6px">Decode calldata (with sig):</div>
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
// ── State ────────────────────────────────────────────────────────────────────
var _prov = null, _signer = null, _contract = null, _net = null, _abi = null;

// ── Tab navigation ────────────────────────────────────────────────────────────
function switchTab(name) {
  document.getElementById('page-contract').classList.toggle('hidden', name !== 'contract');
  document.getElementById('page-utils').classList.toggle('hidden', name !== 'utils');
  document.getElementById('tab-contract').classList.toggle('active', name === 'contract');
  document.getElementById('tab-utils').classList.toggle('active', name === 'utils');
}

// ── Auto-parse ABI on input ───────────────────────────────────────────────────
function onAbiInput() {
  var raw = document.getElementById('abi').value.trim();
  var statusEl = document.getElementById('abiStatus');
  if (!raw) { statusEl.textContent = ''; return; }

  // Step 1: parse JSON
  var parsed;
  try { parsed = JSON.parse(raw); }
  catch(e) { setStatus('✗ JSON error: ' + e.message, 'var(--red)'); return; }

  if (!Array.isArray(parsed)) { setStatus('⚠ ABI must be a JSON array', 'var(--orange)'); return; }

  // Step 2: normalize — old format uses constant:true instead of stateMutability
  var normalized = parsed.map(function(item) {
    if (!item || typeof item !== 'object') return item;
    if (item.type === 'function' && !item.stateMutability) {
      item.stateMutability = item.constant ? 'view' : 'nonpayable';
    }
    return item;
  });

  // Only count named functions (skip receive/fallback which have no name)
  var fns = normalized.filter(function(x) { return x.type === 'function' && x.name; });
  if (!fns.length) { setStatus('⚠ No callable functions found in ABI', 'var(--orange)'); return; }

  _abi = normalized;

  // Step 3: wire contract if already connected
  if (_prov) {
    var addr = document.getElementById('addr').value.trim();
    if (addr) {
      try { _contract = new ethers.Contract(addr, _abi, _signer || _prov); }
      catch(e) { /* ethers may not be loaded yet — will wire on Connect */ }
    }
  }

  // Step 4: render (separate try so JSON errors don't mask render errors)
  try {
    renderFns(normalized);
    setStatus('✓ ' + fns.length + ' functions loaded', 'var(--green)');
  } catch(e) {
    setStatus('✗ Render error: ' + e.message, 'var(--red)');
    console.error('ABI render error:', e);
  }

  function setStatus(msg, color) { statusEl.textContent = msg; statusEl.style.color = color; }
}

// ── Connect / Disconnect ─────────────────────────────────────────────────────
async function doConnect() {
  var pk  = document.getElementById('pk').value.trim();
  var rpc = document.getElementById('rpc').value.trim();
  var addr = document.getElementById('addr').value.trim();
  var abiS = document.getElementById('abi').value.trim();
  if (!rpc) return toast('RPC URL required', 'err');
  try {
    // Route through /rpc proxy to avoid CORS issues with private/internal RPC endpoints
    var proxyUrl = '/rpc?target=' + encodeURIComponent(rpc);
    _prov = new ethers.JsonRpcProvider(proxyUrl);
    if (pk) {
      _signer = new ethers.Wallet(pk, _prov);
      _net    = await _prov.getNetwork();
      var bal = await _prov.getBalance(_signer.address);
      showWalletBar(_net, _signer.address, bal);
      toast('Connected — chain ' + _net.chainId, 'ok');
    } else {
      _net = await _prov.getNetwork();
      toast('RPC connected (read-only) — chain ' + _net.chainId, 'ok');
    }
    document.getElementById('dot').classList.add('on');
    if (abiS && addr) {
      try {
        if (!_abi) _abi = JSON.parse(abiS);
        _contract = new ethers.Contract(addr, _abi, _signer || _prov);
        if (_abi) renderFns(_abi);
      } catch(e) { toast('ABI error: ' + e.message, 'err'); }
    }
  } catch(e) { toast('Connect failed: ' + e.message, 'err'); }
}

function doDisconnect() {
  _prov = _signer = _contract = _net = null;
  document.getElementById('wbar').classList.remove('on');
  document.getElementById('dot').classList.remove('on');
  toast('Disconnected — ABI functions still visible');
}

async function refreshBal() {
  if (!_signer || !_prov) return;
  var bal = await _prov.getBalance(_signer.address);
  document.getElementById('wBal').textContent =
    parseFloat(ethers.formatEther(bal)).toFixed(6) + ' ' + nativeSym(_net);
}

function showWalletBar(net, addr, bal) {
  document.getElementById('wbar').classList.add('on');
  var label = (net.name && net.name !== 'unknown') ? net.name + ' #' + net.chainId : '#' + net.chainId;
  document.getElementById('wChain').textContent = label;
  var addrEl = document.getElementById('wAddr');
  addrEl.textContent = addr.slice(0,6) + '...' + addr.slice(-4);
  addrEl.title = addr;
  document.getElementById('wBal').textContent =
    parseFloat(ethers.formatEther(bal)).toFixed(6) + ' ' + nativeSym(net);
}

function nativeSym(net) {
  var m = { 56:'BNB', 97:'BNB', 137:'MATIC', 80001:'MATIC', 43114:'AVAX', 250:'FTM' };
  return m[Number(net && net.chainId)] || 'ETH';
}

// ── Toast / copy ──────────────────────────────────────────────────────────────
var _tt;
function toast(msg, type) {
  var el = document.getElementById('toast');
  el.textContent = msg;
  el.className = 'show' + (type ? ' ' + type : '');
  clearTimeout(_tt);
  _tt = setTimeout(function() { el.classList.remove('show'); }, 4000);
}
function copyText(text) {
  navigator.clipboard.writeText(text).then(function() { toast('Copied!', 'ok'); });
}
function copyOut(el) {
  var text = el.textContent.trim();
  if (text && text !== 'result') copyText(text);
}

// ── Render ABI functions ─────────────────────────────────────────────────────
function renderFns(abi) {
  // Only render named functions (skip receive/fallback)
  var fns    = abi.filter(function(x) { return x.type === 'function' && x.name; });
  var reads  = fns.filter(function(f) { return f.stateMutability === 'view' || f.stateMutability === 'pure'; });
  var writes = fns.filter(function(f) { return f.stateMutability === 'nonpayable' || f.stateMutability === 'payable'; });
  document.getElementById('readFns').innerHTML  = reads.length  ? reads.map(function(f)  { return buildCard(f, 'read');  }).join('') : '<div class="empty">No view/pure functions</div>';
  document.getElementById('writeFns').innerHTML = writes.length ? writes.map(function(f) { return buildCard(f, 'write'); }).join('') : '<div class="empty">No write functions</div>';
  document.getElementById('fnSection').classList.remove('hidden');
}

function buildCard(fn, mode) {
  var safeName = fn.name || 'unknown';
  var id   = mode + '_' + safeName + '_' + Math.random().toString(36).slice(2,7);
  var params = fn.inputs || [];
  var outs   = (fn.outputs || []).map(function(o) { return o && o.type ? o.type : '?'; }).join(', ');
  var isPayable = fn.stateMutability === 'payable';
  var sig = safeName + '(' + params.map(function(p) { return (p.type || '?') + (p.name ? ' ' + p.name : ''); }).join(', ') + ')' + (outs ? ' → ' + outs : '');

  var html = '<div class="fc">';
  html += '<div class="fc-hdr" onclick="toggleCard(\\'' + id + '\\')">';
  html += '<div><div class="fc-name">' + esc(safeName) + (isPayable ? ' <span class="tag t-pay">payable</span>' : '') + '</div>';
  html += '<div class="fc-sig">' + esc(sig) + '</div></div>';
  html += '<span class="fc-arr" id="' + id + '_arr">▼</span></div>';
  html += '<div class="fc-body" id="' + id + '_body">';

  params.forEach(function(p, i) { html += buildParamInput(p, id + '_p' + i); });

  if (isPayable) {
    html += '<div class="pr"><div class="plbl">value <span class="tbadge">ETH — payable</span></div>';
    html += '<input type="text" id="' + id + '_val" placeholder="0.0" /></div>';
  }

  var btnStyle = mode === 'read' ? 'background:var(--green)' : 'background:var(--orange)';
  var btnLabel = mode === 'read' ? 'Call &#9654;' : 'Send &#8599;';
  var callFn   = mode === 'read' ? 'doRead' : 'doWrite';

  html += '<div class="btn-row">';
  html += '<button id="' + id + '_btn" style="' + btnStyle + '" onclick="' + callFn + '(\\'' + safeName + '\\',\\'' + id + '\\',' + params.length + ',' + (isPayable ? 1 : 0) + ')">' + btnLabel + '</button>';
  html += '</div>';
  html += '<div class="rbox" id="' + id + '_res"></div>';
  html += '</div></div>';
  return html;
}

function buildParamInput(p, eid) {
  var pType = (p && p.type) ? p.type : 'bytes';  // fallback if type missing
  var isArray   = pType.indexOf('[') !== -1;
  var isTuple   = pType.indexOf('tuple') === 0;
  var isBool    = pType === 'bool';
  var isNumeric = !isArray && !isTuple && (pType.indexOf('uint') === 0 || pType.indexOf('int') === 0);
  var label = ((p && p.name) || 'param') + ' <span class="tbadge">' + esc(pType) + ((isArray || isTuple) ? ' JSON' : '') + '</span>';

  var html = '<div class="pr"><div class="plbl">' + label + '</div>';

  if (isBool) {
    html += '<select id="' + eid + '"><option value="true">true</option><option value="false">false</option></select>';
  } else if (isArray || isTuple) {
    html += '<textarea id="' + eid + '" rows="2" placeholder="' + esc(jsonHint(pType)) + '"></textarea>';
  } else if (isNumeric) {
    html += '<div class="input-row">';
    html += '<input type="text" id="' + eid + '" placeholder="0" />';
    html += '<div class="mul-btns">';
    html += '<button type="button" class="mul-btn" onclick="mulInput(\\'' + eid + '\\',18)" title="multiply by 10^18">×10¹⁸</button>';
    html += '<button type="button" class="mul-btn" onclick="mulInput(\\'' + eid + '\\',6)"  title="multiply by 10^6">×10⁶</button>';
    html += '</div></div>';
    html += '<div style="font-size:10px;color:var(--muted);margin-top:2px">raw integer — ×10ⁿ to scale decimals</div>';
  } else {
    html += '<input type="text" id="' + eid + '" placeholder="' + esc(inputHint(pType)) + '" />';
  }

  html += '</div>';
  return html;
}

// Multiply input value by 10^exp using ethers.parseUnits for decimal handling
function mulInput(id, exp) {
  var el  = document.getElementById(id);
  var val = (el.value || '').trim();
  if (!val) { el.value = '1' + '0'.repeat(exp); return; }
  try {
    var result = ethers.parseUnits(val, exp);
    el.value = result.toString();
  } catch(e) { toast('Cannot scale "' + val + '": ' + e.message, 'err'); }
}

function inputHint(t) {
  if (t === 'address') return '0x1234...';
  if (t === 'string')  return 'Hello world';
  if (t.indexOf('bytes') === 0) return '0x';
  return '';
}
function jsonHint(t) {
  if (t.indexOf('address') !== -1) return '["0xabc...", "0xdef..."]';
  if (t.indexOf('uint') !== -1 || t.indexOf('int') !== -1) return '[1, 2, 3]';
  if (t.indexOf('tuple') === 0) return '["field1", 123]';
  return '[]';
}

function toggleCard(id) {
  var body = document.getElementById(id + '_body');
  var arr  = document.getElementById(id + '_arr');
  arr.classList.toggle('open', body.classList.toggle('open'));
}

// ── Collect inputs ────────────────────────────────────────────────────────────
function collectArgs(fnName, id, count) {
  var fnDef = _abi && _abi.find(function(x) { return x.type === 'function' && x.name === fnName; });
  if (!fnDef) return null;
  var args = [];
  for (var i = 0; i < count; i++) {
    var p = fnDef.inputs[i];
    var el = document.getElementById(id + '_p' + i);
    if (!el) { args.push(''); continue; }
    try { args.push(parseVal(el.value.trim(), p.type)); }
    catch(e) { toast('Bad input "' + (p.name || i) + '": ' + e.message, 'err'); return null; }
  }
  return args;
}

// Raw integer parsing — numbers are passed as-is to the SC
function parseVal(raw, type) {
  if (/\[\d*\]$/.test(type)) {
    var base = type.replace(/\[\d*\]$/, '');
    return JSON.parse(raw).map(function(v) { return parseVal(String(v), base); });
  }
  if (type.indexOf('tuple') === 0) return JSON.parse(raw);
  if (type === 'bool') return raw === 'true';
  if (type.indexOf('uint') === 0 || type.indexOf('int') === 0) return BigInt(raw);
  if (type.indexOf('bytes') === 0) return raw;
  return raw;
}

function fmtVal(v) {
  if (v === null || v === undefined) return 'null';
  if (typeof v === 'bigint')  return v.toString();
  if (typeof v === 'boolean') return String(v);
  if (Array.isArray(v))       return '[' + v.map(fmtVal).join(', ') + ']';
  if (typeof v === 'object') {
    var keys = Object.keys(v).filter(function(k) { return isNaN(k); });
    if (keys.length) { var out = {}; keys.forEach(function(k) { out[k] = fmtVal(v[k]); }); return JSON.stringify(out, null, 2); }
    try { return '[' + Array.from(v).map(fmtVal).join(', ') + ']'; } catch(_) {}
  }
  return String(v);
}

function showRes(id, content, cls) {
  var el = document.getElementById(id + '_res');
  el.innerHTML = '<div class="rlbl">' + cls + '</div>' + esc(content);
  el.className = 'rbox show ' + cls;
}

function esc(s) {
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

// ── Read function ─────────────────────────────────────────────────────────────
async function doRead(fnName, id, count) {
  if (!_contract) {
    var addr = document.getElementById('addr').value.trim();
    var rpc  = document.getElementById('rpc').value.trim();
    if (!addr) return toast('Enter Contract Address', 'err');
    if (!_prov) return toast('Enter RPC URL and click Connect', 'err');
    if (!_abi)  return toast('ABI not loaded', 'err');
    _contract = new ethers.Contract(addr, _abi, _prov);
  }
  var args = collectArgs(fnName, id, count);
  if (args === null) return;

  var btn = document.getElementById(id + '_btn');
  btn.disabled = true; btn.innerHTML = '<span class="spin"></span>';
  try {
    var result = await _contract[fnName].apply(_contract, args);
    showRes(id, fmtVal(result), 'ok');
  } catch(e) { showRes(id, e.message, 'err'); }
  finally { btn.disabled = false; btn.innerHTML = 'Call &#9654;'; }
}

// ── Write function ────────────────────────────────────────────────────────────
async function doWrite(fnName, id, count, isPayable) {
  if (!_signer) return toast('Private key required — fill in and click Connect Wallet', 'err');
  if (!_contract) {
    var addr = document.getElementById('addr').value.trim();
    if (!addr) return toast('Enter Contract Address', 'err');
    if (!_abi)  return toast('ABI not loaded', 'err');
    _contract = new ethers.Contract(addr, _abi, _signer);
  }
  var args = collectArgs(fnName, id, count);
  if (args === null) return;

  if (isPayable) {
    var valEl = document.getElementById(id + '_val');
    if (valEl && valEl.value.trim()) {
      try { args.push({ value: ethers.parseEther(valEl.value.trim()) }); }
      catch(e) { return toast('Bad ETH value: ' + e.message, 'err'); }
    }
  }

  var btn = document.getElementById(id + '_btn');
  btn.disabled = true; btn.innerHTML = '<span class="spin"></span>';
  showRes(id, 'Sending transaction…', 'info');
  try {
    var tx = await _contract[fnName].apply(_contract, args);
    showRes(id, 'TX: ' + tx.hash + '\\nWaiting for confirmation…', 'info');
    var receipt = await tx.wait();
    showRes(id, 'Confirmed block ' + receipt.blockNumber + '\\nTX: ' + tx.hash, 'ok');
    toast('Confirmed block ' + receipt.blockNumber, 'ok');
    refreshBal();
  } catch(e) { showRes(id, e.message, 'err'); toast('TX failed', 'err'); }
  finally { btn.disabled = false; btn.innerHTML = 'Send &#8599;'; }
}

// ── Transfer native token ─────────────────────────────────────────────────────
async function sendNative() {
  if (!_signer) return toast('Connect wallet first', 'err');
  var to   = document.getElementById('txTo').value.trim();
  var amt  = document.getElementById('txAmt').value.trim();
  var unit = document.getElementById('txUnit').value;
  if (!to)  return toast('Recipient address required', 'err');
  if (!amt) return toast('Amount required', 'err');
  var value;
  try {
    if (unit === 'ether') value = ethers.parseEther(amt);
    else if (unit === 'gwei') value = ethers.parseUnits(amt, 'gwei');
    else value = BigInt(amt);
  } catch(e) { return toast('Invalid amount: ' + e.message, 'err'); }

  var btn = document.getElementById('txBtn');
  btn.disabled = true; btn.innerHTML = '<span class="spin"></span>';
  var res = document.getElementById('txResult');
  res.innerHTML = '<div class="rlbl">info</div>Sending…'; res.className = 'rbox show info';
  try {
    var tx = await _signer.sendTransaction({ to: to, value: value });
    res.innerHTML = '<div class="rlbl">info</div>' + esc('TX: ' + tx.hash + '\\nWaiting…');
    var receipt = await tx.wait();
    res.innerHTML = '<div class="rlbl">ok</div>' + esc('Confirmed block ' + receipt.blockNumber + '\\nTX: ' + tx.hash);
    res.className = 'rbox show ok';
    toast('Transfer confirmed block ' + receipt.blockNumber, 'ok');
    refreshBal();
  } catch(e) {
    res.innerHTML = '<div class="rlbl">err</div>' + esc(e.message);
    res.className = 'rbox show err';
    toast('Transfer failed', 'err');
  } finally { btn.disabled = false; btn.innerHTML = 'Send &#8599;'; }
}

// ═══ UTILS ═══════════════════════════════════════════════════════════════════

function setUtilOut(id, text) {
  var el = document.getElementById(id);
  el.textContent = text;
}

// Token amount: human-readable ↔ raw integer
function utilParseAmt() {
  var amt = document.getElementById('u-amt').value.trim();
  var dec = parseInt(document.getElementById('u-dec').value);
  if (!amt) return;
  try { setUtilOut('u-amt-out', ethers.parseUnits(amt, dec).toString()); }
  catch(e) { setUtilOut('u-amt-out', 'Error: ' + e.message); }
}
function utilFormatAmt() {
  var raw = document.getElementById('u-amt').value.trim();
  var dec = parseInt(document.getElementById('u-dec').value);
  if (!raw) return;
  try { setUtilOut('u-amt-out', ethers.formatUnits(BigInt(raw), dec)); }
  catch(e) { setUtilOut('u-amt-out', 'Error: ' + e.message); }
}

// Hex ↔ Decimal
function utilHexToDec() {
  var hex = document.getElementById('u-hex').value.trim();
  if (!hex) return;
  try { setUtilOut('u-hex-out', BigInt(hex.startsWith('0x') ? hex : '0x' + hex).toString()); }
  catch(e) { setUtilOut('u-hex-out', 'Error: ' + e.message); }
}
function utilDecToHex() {
  var dec = document.getElementById('u-dec2').value.trim();
  if (!dec) return;
  try { setUtilOut('u-hex-out', '0x' + BigInt(dec).toString(16)); }
  catch(e) { setUtilOut('u-hex-out', 'Error: ' + e.message); }
}

// Hex ↔ UTF-8
function utilHexToStr() {
  var hex = document.getElementById('u-hexstr').value.trim();
  if (!hex) return;
  try { setUtilOut('u-str-out', ethers.toUtf8String(hex)); }
  catch(e) { setUtilOut('u-str-out', 'Error: ' + e.message); }
}
function utilStrToHex() {
  var str = document.getElementById('u-str').value;
  if (!str) return;
  try { setUtilOut('u-str-out', ethers.hexlify(ethers.toUtf8Bytes(str))); }
  catch(e) { setUtilOut('u-str-out', 'Error: ' + e.message); }
}

// Keccak256
function utilKeccak() {
  var input = document.getElementById('u-k256').value.trim();
  var type  = document.getElementById('u-k256-type').value;
  if (!input) return;
  try {
    var bytes = type === 'hex' ? ethers.getBytes(input) : ethers.toUtf8Bytes(input);
    var hash  = ethers.keccak256(bytes);
    var sel   = hash.slice(0, 10);
    setUtilOut('u-k256-out', hash + '\\nSelector (first 4 bytes): ' + sel);
  } catch(e) { setUtilOut('u-k256-out', 'Error: ' + e.message); }
}

// Address checksum
function utilChecksum() {
  var addr = document.getElementById('u-chk').value.trim();
  if (!addr) return;
  try { setUtilOut('u-chk-out', ethers.getAddress(addr)); }
  catch(e) { setUtilOut('u-chk-out', 'Error: ' + e.message); }
}

// Private key → address
function utilPkToAddr() {
  var pk = document.getElementById('u-pk2addr').value.trim();
  if (!pk) return;
  try {
    var wallet = new ethers.Wallet(pk);
    setUtilOut('u-pk2addr-out', wallet.address);
  } catch(e) { setUtilOut('u-pk2addr-out', 'Error: ' + e.message); }
}

// Bytes32 ↔ string
function utilBytes32ToStr() {
  var b32 = document.getElementById('u-b32').value.trim();
  if (!b32) return;
  try { setUtilOut('u-b32-out', ethers.decodeBytes32String(b32)); }
  catch(e) { setUtilOut('u-b32-out', 'Error: ' + e.message); }
}
function utilStrToBytes32() {
  var str = document.getElementById('u-b32str').value.trim();
  if (!str) return;
  try { setUtilOut('u-b32-out', ethers.encodeBytes32String(str)); }
  catch(e) { setUtilOut('u-b32-out', 'Error: ' + e.message); }
}

// Unix timestamp ↔ date
function utilUnixToDate() {
  var unix = parseInt(document.getElementById('u-unix').value.trim());
  if (isNaN(unix)) return;
  var d = new Date(unix * 1000);
  setUtilOut('u-ts-out', d.toISOString() + '\\n' + d.toLocaleString());
}
function utilDateToUnix() {
  var val = document.getElementById('u-date').value;
  if (!val) return;
  setUtilOut('u-ts-out', String(Math.floor(new Date(val).getTime() / 1000)));
}

// ABI encode / decode
function utilAbiEncode() {
  var sig  = document.getElementById('u-abi-sig').value.trim();
  var args = document.getElementById('u-abi-args').value.trim();
  if (!sig) return;
  try {
    var iface   = new ethers.Interface([sig.startsWith('function') ? sig : 'function ' + sig]);
    var fnName  = sig.replace('function ', '').split('(')[0].trim();
    var parsed  = args ? JSON.parse(args) : [];
    var encoded = iface.encodeFunctionData(fnName, parsed);
    setUtilOut('u-abi-out', encoded);
  } catch(e) { setUtilOut('u-abi-out', 'Error: ' + e.message); }
}
function utilAbiDecode() {
  var sig  = document.getElementById('u-abi-dec-sig').value.trim();
  var data = document.getElementById('u-abi-dec-data').value.trim();
  if (!sig || !data) return;
  try {
    var iface  = new ethers.Interface([sig.startsWith('function') ? sig : 'function ' + sig]);
    var fnName = sig.replace('function ', '').split('(')[0].trim();
    var result = iface.decodeFunctionData(fnName, data);
    setUtilOut('u-abi-out', JSON.stringify(
      Array.from(result).map(function(v) { return typeof v === 'bigint' ? v.toString() : v; }),
      null, 2
    ));
  } catch(e) { setUtilOut('u-abi-out', 'Error: ' + e.message); }
}
</script>
</body>
</html>`;
}

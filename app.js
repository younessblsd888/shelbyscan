/* =====================
   ShelbyScan — app.js
   ===================== */

// ── Live clock ──────────────────────────────────────────────
function updateClock() {
  document.getElementById('clock').textContent =
    new Date().toLocaleTimeString();
}
updateClock();
setInterval(updateClock, 1000);

// ── Simulated live metrics ───────────────────────────────────
// NOTE: Replace with real API calls to https://api.shelbynet.shelby.xyz/v1
let blobCount   = 4821;
let walletCount = 1203;

function updateMetrics() {
  blobCount   += Math.floor(Math.random() * 3);
  walletCount += Math.random() > 0.7 ? 1 : 0;
  const speed  = 130 + Math.floor(Math.random() * 40);

  document.getElementById('m-blobs').textContent   = blobCount.toLocaleString();
  document.getElementById('m-wallets').textContent = walletCount.toLocaleString();
  document.getElementById('m-speed').textContent   = speed + ' ms';
}
setInterval(updateMetrics, 3000);

// ── Upload activity chart (Bar) ──────────────────────────────
new Chart(document.getElementById('activityChart'), {
  type: 'bar',
  data: {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{
      label: 'Uploads',
      data: [312, 489, 421, 567, 623, 389, 510],
      backgroundColor: 'rgba(24, 95, 165, 0.35)',
      borderColor: '#185FA5',
      borderWidth: 1,
      borderRadius: 5,
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      x: {
        grid: { color: 'rgba(255,255,255,0.04)' },
        ticks: { color: '#8a8fa8', font: { size: 11 } }
      },
      y: {
        grid: { color: 'rgba(255,255,255,0.04)' },
        ticks: { color: '#8a8fa8', font: { size: 11 } }
      }
    }
  }
});

// ── File types chart (Donut) ─────────────────────────────────
new Chart(document.getElementById('typeChart'), {
  type: 'doughnut',
  data: {
    labels: ['Images', 'Docs', 'Video', 'Other'],
    datasets: [{
      data: [42, 28, 18, 12],
      backgroundColor: ['#185FA5', '#1D9E75', '#BA7517', '#888780'],
      borderWidth: 0,
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    cutout: '65%'
  }
});

// ── Leaderboard ──────────────────────────────────────────────
const leaders = [
  { name: '0x3fa2…c81d', uploads: 312, pts: 3120, color: '#185FA5' },
  { name: '0x9abc…12ef', uploads: 287, pts: 2870, color: '#1D9E75' },
  { name: '0x7d11…f00a', uploads: 241, pts: 2410, color: '#BA7517' },
  { name: '0x2bc9…44de', uploads: 198, pts: 1980, color: '#D4537E' },
  { name: '0x5ef3…77ca', uploads: 155, pts: 1550, color: '#888780' },
];

const rankClasses = ['gold', 'silver', 'bronze', 'other', 'other'];
const lb = document.getElementById('leaderboard');
const maxPts = leaders[0].pts;

leaders.forEach((l, i) => {
  const row = document.createElement('div');
  row.className = 'leader-row';
  row.innerHTML = `
    <div class="rank ${rankClasses[i]}">#${i + 1}</div>
    <div class="avatar" style="background:${l.color}22; color:${l.color};">
      ${l.name.slice(2, 4).toUpperCase()}
    </div>
    <div class="leader-info">
      <div class="leader-name">${l.name}</div>
      <div class="leader-uploads">${l.uploads} uploads</div>
    </div>
    <div class="bar-bg">
      <div class="bar-fill" style="width:${Math.round(l.pts / maxPts * 100)}%; background:${l.color};"></div>
    </div>
    <div class="leader-pts">${l.pts} pts</div>
  `;
  lb.appendChild(row);
});

// ── Wallet Lookup ────────────────────────────────────────────
// NOTE: Connect to real API → GET https://api.shelbynet.shelby.xyz/v1/accounts/{address}
function lookupWallet() {
  const val = document.getElementById('walletInput').value.trim();
  const res = document.getElementById('walletResult');

  if (!val) {
    res.innerHTML = '<p style="font-size:13px;color:var(--text-muted);margin-top:0.5rem;">Please enter a wallet address.</p>';
    return;
  }

  const rand = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a;
  const shortAddr = val.length > 10 ? val.slice(0, 6) + '…' + val.slice(-4) : val;

  res.innerHTML = `
    <div class="wallet-result-card">
      <div class="wallet-row">
        <span class="wallet-key">Address</span>
        <span class="wallet-val">${shortAddr}</span>
      </div>
      <div class="wallet-row">
        <span class="wallet-key">APT Balance</span>
        <span class="wallet-val">${rand(10, 500)} APT</span>
      </div>
      <div class="wallet-row">
        <span class="wallet-key">ShelbyUSD</span>
        <span class="wallet-val">${rand(1, 50).toFixed(4)} SUSD</span>
      </div>
      <div class="wallet-row">
        <span class="wallet-key">Total Blobs</span>
        <span class="wallet-val">${rand(5, 200)} files</span>
      </div>
      <div class="wallet-row">
        <span class="wallet-key">Storage Used</span>
        <span class="wallet-val">${rand(10, 800)} MB</span>
      </div>
      <div class="wallet-row">
        <span class="wallet-key">Status</span>
        <span class="tag tag-green">Active</span>
      </div>
      <div class="wallet-row">
        <span class="wallet-key">Network</span>
        <span class="tag tag-blue">Shelbynet</span>
      </div>
    </div>
  `;
}

// Allow pressing Enter to search wallet
document.getElementById('walletInput').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') lookupWallet();
});

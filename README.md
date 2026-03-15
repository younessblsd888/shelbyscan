# ShelbyScan 🔍

> A real-time activity tracker dashboard for the **Shelby Network** testnet.

![ShelbyScan Preview](https://shelby.xyz/og.png)

## What is this?

ShelbyScan is an open-source network explorer built for [Shelby](https://shelby.xyz) — the decentralized hot storage protocol by Aptos Labs & Jump Crypto.

It tracks:
- 📦 **Blob uploads** — files stored on the network
- 👛 **Wallet activity** — active addresses and their stats
- 📊 **Network metrics** — speed, storage used, total blobs
- 🏆 **Leaderboard** — top uploaders by points
- 🔎 **Wallet lookup** — search any address

## Live Demo

Open `index.html` in your browser — no server needed!

## Project Structure

```
shelbyscan/
├── index.html       # Main dashboard
├── css/
│   └── style.css    # All styles
├── js/
│   └── app.js       # Charts, live metrics, wallet lookup
└── README.md
```

## Tech Stack

- Pure HTML / CSS / JavaScript — no framework needed
- [Chart.js](https://www.chartjs.org/) for charts
- Designed for **Shelbynet** (testnet)

## Connect to Real API

The dashboard currently uses simulated data. To connect to the real Shelby API:

1. Get early access at [developers.shelby.xyz](https://developers.shelby.xyz)
2. Replace the simulated data in `js/app.js` with real API calls:

```js
// Example: fetch real blob count
const res = await fetch('https://api.shelbynet.shelby.xyz/v1/stats');
const data = await res.json();
```

## Built by

[@younessblsd](https://twitter.com/younessblsd) — Shelby testnet contributor

---

Built with ❤️ for the [Shelby](https://shelby.xyz) ecosystem.

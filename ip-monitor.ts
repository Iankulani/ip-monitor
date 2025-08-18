#!/usr/bin/env ts-node

// Simple Cyber Security Tool (IP Monitor) in TypeScript
// Uses ip-api.com to get info about an IP and flags possible risks.

import { isIP } from "node:net";

// --- Helper to fetch JSON ---
async function fetchJson(url: string) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

// --- Main function ---
async function monitorIP(ip: string) {
  if (!isIP(ip)) {
    console.error(`❌ Invalid IP: ${ip}`);
    return;
  }

  console.log(`🔍 Monitoring IP: ${ip}`);

  try {
    // Query ip-api
    const url = `http://ip-api.com/json/${ip}?fields=status,message,country,regionName,city,isp,org,as,proxy,hosting,mobile,query`;
    const data: any = await fetchJson(url);

    if (data.status !== "success") {
      console.error("❌ Lookup failed:", data.message);
      return;
    }

    // Print details
    console.log("\n📊 IP Information");
    console.log(`Country       : ${data.country}`);
    console.log(`Region/City   : ${data.regionName} / ${data.city}`);
    console.log(`ISP           : ${data.isp}`);
    console.log(`Org / ASN     : ${data.org} / ${data.as}`);
    console.log(`Proxy         : ${data.proxy ? "Yes" : "No"}`);
    console.log(`Hosting       : ${data.hosting ? "Yes" : "No"}`);
    console.log(`Mobile        : ${data.mobile ? "Yes" : "No"}`);

    // Simple risk logic
    let risk = 0;
    if (data.proxy) risk += 40;
    if (data.hosting) risk += 30;
    if (data.mobile) risk += 10;

    console.log("\n⚠️ Risk Assessment");
    if (risk >= 60) {
      console.log(`Risk Score: ${risk} → HIGH`);
    } else if (risk >= 30) {
      console.log(`Risk Score: ${risk} → MEDIUM`);
    } else {
      console.log(`Risk Score: ${risk} → LOW`);
    }

  } catch (err: any) {
    console.error("❌ Error:", err.message);
  }
}

// --- Entry point ---
const ip = process.argv[2];
if (!ip) {
  console.log("Usage: ts-node ip-monitor.ts <IP_ADDRESS>");
  process.exit(1);
}

monitorIP(ip);

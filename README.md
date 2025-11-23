# ip-monitor
A simple TypeScript tool that checks an IP’s details, detects proxy or hosting, and provides basic cyber threat risk assessment.

## How to Clone the Repo**
```bash
git https://github.com/Iankulani/ip-monitor

cd ip-monitor
```
## Compile then run with Node

Instead of running directly, compile to JS first:

npx tsc ip-monitor.ts

node ip-monitor.js 0.0.0.0




## Example output:**

🔍 Monitoring IP: 0.0.0.0

📊 IP Information

* Country       : Malawi

* Region/City   : Malawi

* ISP           : TNM

* Org / ASN     : 

* Proxy         : No
* 
* Hosting       : Yes
 
* Mobile        : No

⚠️ Risk Assessment
Risk Score: 30 → MEDIUM


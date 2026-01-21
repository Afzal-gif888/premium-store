import https from 'https';
import dns from 'dns';

const targets = [
    'api.cloudinary.com',
    'res.cloudinary.com',
    'google.com',
    'github.com'
];

async function checkDNS(host) {
    return new Promise((resolve) => {
        dns.lookup(host, (err, address, family) => {
            if (err) resolve({ host, status: 'DNS FAIL', error: err.message });
            else resolve({ host, status: 'DNS OK', address });
        });
    });
}

async function checkHTTP(host) {
    return new Promise((resolve) => {
        const start = Date.now();
        const req = https.get(`https://${host}`, { timeout: 5000 }, (res) => {
            resolve({ host, status: 'HTTP OK', code: res.statusCode, time: `${Date.now() - start}ms` });
        });

        req.on('error', (err) => {
            resolve({ host, status: 'HTTP FAIL', error: err.message });
        });

        req.on('timeout', () => {
            req.destroy();
            resolve({ host, status: 'TIMEOUT', error: 'Request timed out after 5s' });
        });
    });
}

async function run() {
    console.log('--- Network Diagnostics ---');
    console.log('Time:', new Date().toISOString());

    console.log('\n1. DNS Checks:');
    for (const t of targets) {
        process.stdout.write(`  ${t.padEnd(20)}: `);
        const res = await checkDNS(t);
        console.log(res.status === 'DNS OK' ? `OK (${res.address})` : `FAIL: ${res.error}`);
    }

    console.log('\n2. HTTPS Checks (5s timeout):');
    for (const t of targets) {
        process.stdout.write(`  ${t.padEnd(20)}: `);
        const res = await checkHTTP(t);
        console.log(res.status === 'HTTP OK' ? `OK (Status ${res.code}, ${res.time})` : `FAIL: ${res.status} - ${res.error}`);
    }
}

run();

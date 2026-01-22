import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api';

async function measureLatency(url, label) {
    const start = performance.now();
    try {
        await axios.get(url);
        const duration = performance.now() - start;
        console.log(`✅ ${label}: ${duration.toFixed(2)}ms`);
        return duration;
    } catch (err) {
        console.error(`❌ ${label} Failed: ${err.message}`);
        return null;
    }
}

async function runPerfTest() {
    console.log('Starting API Performance Test...');
    console.log('--------------------------------');

    // Warmup
    await measureLatency(`${BASE_URL}/products`, 'Product List (Warmup check)');

    const times = [];
    times.push(await measureLatency(`${BASE_URL}/products`, 'Product List (Run 1)'));
    times.push(await measureLatency(`${BASE_URL}/products`, 'Product List (Run 2)'));
    times.push(await measureLatency(`${BASE_URL}/announcements`, 'Announcements List'));

    const validTimes = times.filter(t => t !== null);
    const avg = validTimes.reduce((a, b) => a + b, 0) / validTimes.length;

    console.log('--------------------------------');
    console.log(`Average Response API Time: ${avg.toFixed(2)}ms`);
    if (avg < 200) {
        console.log('✅ PERFORMANCE STATUS: EXCELLENT (< 200ms)');
    } else if (avg < 500) {
        console.log('⚠️ PERFORMANCE STATUS: GOOD (< 500ms)');
    } else {
        console.log('❌ PERFORMANCE STATUS: NEEDS IMPROVEMENT (> 500ms)');
    }
}

runPerfTest();

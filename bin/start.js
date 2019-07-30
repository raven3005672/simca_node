const startTime = Date.now();
// const Logger = require('...');
// const config = require('...');
// Logger.init(true, config.logger);

// const qmonitor = require('...');
const multiprocess = require('./multiprocess');
const os = require('os');

const app = require('../app');
const port = process.env.PORT || '3000';

const opts = {
    numCPUs: process.env.NODE_ENV !== 'production' ? 1 : os.cpus().length,
    prot: port,
    workerMessage: (msg, workers) => {
        // monitor.messageHandler(msg, workers);
        console.log('msg', msg)
        // console.log('workers', workers)
    },
    ready: (workers) => {
        // initMonitor();
        const startupTime = Date.now() - startTime;
        // qmonitor.addTime('startupTime', startupTime);
        console.log('startupTime', startupTime);
    }
}

function initMonitor() {
    const env = process.env.NODE_ENV;
    const monitorConfig = config.monitor;
    const envConfig = monitorConfig.env[env] || monitorConfig.env['default'];
    if (envConfig) {
        const {host, prot, category, rate} = envConfig;
        qmonitor.initMonitor(host, port, category + monitorConfig.prefix, rate);
    }
}

multiprocess.listen(app, opts);

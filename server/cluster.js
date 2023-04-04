const cluster = require('cluster');
const os = require('os');

const PORT = 3000;
const pid = process.pid;

if (cluster.isMaster) {
    const cpus = os.cpus().length;
    console.log(`CPUS: ${cpus}`);
    console.log(`Master started on PORT ${PORT} PID ${pid}`);

    for (let i = 0; i < cpus - 1; i++) {
        const worker = cluster.fork();            
    }

    cluster.on('exit', (worker, code) => {
        console.log(`Worker is died ${worker.process.pid}`);

        if (code === 1) {
            cluster.fork();
        }
    });
}

if (cluster.isWorker) {
    require('./app');
}
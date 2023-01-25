
const path = require('path')
const {Worker} = require('worker_threads')



const MainToWorker = (dataToWorker) => {

    let target = path.join(__dirname,'WorkerToMain.js')

    return new Promise((resolve,reject)=>{
        const worker = new Worker(target,{
            workerData:dataToWorker
        })
        worker.on('message', data =>{
            resolve(JSON.parse(data))
        })
        worker.on('error', err =>{
            reject(err)
        })
        worker.on('exit',exitCode =>{
            if(exitCode !=0)
            reject(new Error('Error codigo',exitCode))
        })
    })
}

module.exports = {
    MainToWorker
}
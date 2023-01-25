const {parentPort,workerData} = require('worker_threads')




// ACTUALIZACION DE LOS EVENTOS lIVE
const update = async (dataToWorker) =>{
    
    try {
        // logica en el hilo
    

        // enviar el resultado al hilo principal
        parentPort.postMessage(JSON.stringify({LiveEvntes,LiveEvntesNoActive}))
    } catch (error) {
            
    }
}

update(workerData)



console.log("¡Hola Mundo!");

const express = require('express'); const app = express();
const path = require('path'); app.use('/car-rental-online-p2', express.static(path.join(__dirname, 'public')));
const PORT = 3000; app.listen(PORT, ()=>{
    console.log('Ejecutando Servidor en el puerto '+PORT);
})
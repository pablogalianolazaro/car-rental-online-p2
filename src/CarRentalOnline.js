const Vehiculo = require('./vehiculo');
const Cliente = require('./cliente'); 
const Empleado = require('./empleado'); 
const Reserva = require('./reserva');

class CarRentalOnline {

    constructor() {
        this._vehiculos = [];
        this._clientes = [];
        this._empleados = [];
        this._reservas = [];
        this.lastId = 0;
        this.usuario = null;
    }
  
    genId() { return ++this._lastId; }
  
    getClientes() {
        return this._clientes;
    }
  
    getVehiculos() {
        return this._vehiculos;
    }
  
    getReservas() {
        return this._reservas;
    }
  
    getEmpleados() {
        return this._empleados;
    }

    agregarCliente(obj) {
        if (this._clientes.some(cliente => cliente._dni == obj._dni)) {
          throw new Error("Cliente ya existente.");
        }
    
        let cliente = new Cliente(
            obj._dni,
            obj._nombres,
            obj.apellidos,
            obj._direccion,
            obj._email,
            obj._password,
            obj._telefono,
            obj._rol,
        );
    
        this._clientes.push(cliente);
    }

    agregarEmpleado(obj) {
        if (this._empleados.some(empleado => empleado.dni == obj.dni)) {
            throw new Error("Empleado ya existente.");
        }
    
        let empleado = new Empleado(
            obj._dni,
            obj._nombres,
            obj._apellidos,
            obj._direccion,
            obj._email,
            obj._password,
            obj._telefono,
            obj._rol,
        );
    
        this._empleados.push(empleado);
    }

    signin(email, password, rol) {
        let usuario = null;
    
        if (rol == "cliente") {
            usuario = this._clientes.find(cliente => cliente._email == email && cliente._password == password);
        } else if (rol == "empleado") {
            usuario = this._empleados.find(empleado => empleado._email == email && empleado._password == password);
        }
    
        if (usuario) {
            this.usuario = usuario;
        } else {
            throw new Error("Credenciales incorrectas.");
        }
    }

    signup(obj){
        if (rol == "cliente") {
            if (this._clientes.some(cliente => cliente._email == email)){
                throw new Error("Email ya registrado.");
            } else {
                this.agregarCliente(obj);
            }
        } else if (rol == "empleado") {
            if (this._empleados.some(empleado => empleado._email == email)){
                throw new Error("Email ya registrado.")
            } else {
                this.agregarEmpleado(obj);
            }
        }
    }

    signout(){
        this.usuario = null;
    }

    diponibilidad(vehiculoId, inicio, fin){
        if (this._reservas.some(reserva => 
            (reserva._inicio == inicio && reserva._vehiculoId == vehiculoId) || 
            (reserva._fin == fin && reserva._vehiculoId == vehiculoId))) 
            {
            return false;
        }
        return true;
    }

    disponibles(marca, modelo, tipo, etiqueta, costoDia, inicio, fin){
        let _vehiculosDisponibles = [];
        return _vehiculosDisponibles;
    }

    perfil(){
        if (this.usuario == null){
            throw new Error("No se ha iniciado sesión.");
        }
        return this.usuario;
    }

    reservar(vehiculoId, inicio, fin){
        
    }

    cancelar(numero){
        let eliminada = this._reservas.findIndex(reserva => reserva._numero == numero);
        if (eliminada >= 0 && eliminada <= this._reservas.length){
            this._reservas.splice(eliminada, 1);
        } else {
            throw new Error("Reserva no encontrada.");
        }
    }

    agregarVehiculo(obj){

    }

    eliminarVehiculo(vehiculoId){
        let eliminado = this._vehiculo.findIndex(vehiculo => vehiculo._vehiculoId == vehiculoId);
        if (eliminado >= 0 && eliminado <= this._vehiculos.length && eliminado._disponible == true && eliminado._eliminado == false){
            this._vehiculos[eliminado]._eliminado == true;
        } else {
            throw new Error("Vehiculo no encontrado o no disponible.");
        }
    }

    entregarVehiculo(numero){

    }

    devolverVehiculo(numero){

    }

    reservas(clienteId){

    }

    clienteByEmail(email){
        let cliente = this._clientes.find(cliente => cliente._email == email);
        if (cliente == null){
            throw new Error("No existe un cliente con ese email.")
        }
        return cliente;
    }

    empleadoByEmail(email){
        let empleado = this._empleados.find(empleado => empleado._email == email);
        if (empleado == null){
            throw new Error("No existe un empleado con ese email.")
        }
        return empleado;
    }

    vehiculoPorMatricula(matricula){
        let vehiculo = this._vehiculos.find(vehiculo => vehiculo._matricula == matricula);
        if (vehiculo == null){
            throw new Error("No existe un vehiculo con esa matricula.")
        }
        return vehiculo;
    }

    reservaByNumero(numero){
        let reserva = this._reservas.find(reserva => reserva._numero == numero);
        if (reserva == null){
            throw new Error("No existe una reserva con ese numero.")
        }
        return reserva;
    }

    clienteById(clienteId){
        let cliente = this._clientes.find(cliente => cliente._id == clienteId);
        if (cliente == null){
            throw new Error("No existe un cliente con ese email.")
        }
        return cliente;
    }

    empleadoById(empleadoId){
        let empleado = this._empleados.find(empleado => empleado._id == empleadoId);
        if (empleado == null){
            throw new Error("No existe un empleado con ese email.")
        }
        return empleado;
    }

    vehiculoById(vehiculoId){
        let vehiculo = this._vehiculos.find(vehiculo => vehiculo._id == vehiculoId);
        if (vehiculo == null){
            throw new Error("No existe un vehiculo con esa matricula.")
        }
        return vehiculo;
    }

    reservaById(vehiculoId){
        let reserva = this._reservas.find(reserva => reserva._vehiculoId == vehiculoId);
        if (reserva == null){
            throw new Error("No existe una reserva que contenga el ID del vehículo.")
        }
        return reserva;
    }
}

module.exports = CarRentalOnline;
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

    signup(obj) {
        if (rol == "cliente") {
            if (this._clientes.some(cliente => cliente._email == email)) {
                throw new Error("Email ya registrado.");
            } else {
                this.agregarCliente(obj);
            }
        } else if (rol == "empleado") {
            if (this._empleados.some(empleado => empleado._email == email)) {
                throw new Error("Email ya registrado.")
            } else {
                this.agregarEmpleado(obj);
            }
        }
    }

    signout() {
        this.usuario = null;
    }

    diponibilidad(vehiculoId, inicio, fin) {
        if (this._reservas.some(reserva =>
            (reserva._inicio == inicio && reserva._vehiculoId == vehiculoId) ||
            (reserva._fin == fin && reserva._vehiculoId == vehiculoId))) {
            return false;
        }
        return true;
    }

    disponibles(marca, modelo, tipo, etiqueta, costoDia, inicio, fin) {
        let _vehiculosDisponibles = [];
        return _vehiculosDisponibles;
    }

    perfil() {
        if (this.usuario == null) {
            throw new Error("No se ha iniciado sesión.");
        }
        return this.usuario;
    }

    reservar(vehiculoId, inicio, fin) {
        //comprobamos que ha iniciado sesion 
        perfil();
        //comprobamos que el vehiculo esta disponible en esas fechas
        if (disponibilidad(vehiculoId, inicio, fin) == true) {
            //si esta disponible, calculamos el costo y creamos una nueva reserva
            //para el costo, obtenemos las fechas en milisegundos
            //primero las pasamos a string 
            const s1 = inicio.toISOString();
            const s2 = inicio.toISOString();
            //ahora las obtenemos en milisegundos
            const t1 = Date.parse(s1);
            const t2 = Date.parse(s2);
            //calculamos la diferencia en milisegundos
            const dif_ms = t2 - t1;
            //ahora la pasamos a dias 
            const dif_dias = dif_ms / (1000 * 60 * 60 * 24);
            let costo = vehiculoId.costoDia * dif_dias;
            let nueva_reserva = new Reserva(_id, inicio, fin, costo, _numero, _entrega, _devolución,
                _fecha, this.usuario._id, vehiculoId);
            this._reservas.push(nueva_reserva);
        } else {
            //si no esta disponible devuelve excepcion
            throw new Error("Vehiculo no disponible");
        }
    }

    cancelar(numero) {
        let eliminada = this._reservas.findIndex(reserva => reserva._numero == numero);
        if (eliminada >= 0 && eliminada <= this._reservas.length) {
            this._reservas.splice(eliminada, 1);
        } else {
            throw new Error("Reserva no encontrada.");
        }
    }

    agregarVehiculo(obj) {
        //comprobamos si el objeto esta en el array 
        if (this._vehiculos.includes(obj._matricula) == true) {
            // si lo esta, tiramos excepcion
            throw new Error("El Vehiculo ya estaba agregado");
        } else {
            //si no estaba lo creamos y añadimos
            let vehiculo1 = new Vehiculo(obj._id, obj._matricula, obj._marca, obj._modelo, obj._etiqueta, obj._tipo, obj._disponible,
                obj._eliminado, obj._costoDia, obj._descripcion);
            this._vehiculos.push(vehiculo1);
        }
    }

    eliminarVehiculo(vehiculoId) {
        let eliminado = this._vehiculo.findIndex(vehiculo => vehiculo._vehiculoId == vehiculoId);
        if (eliminado >= 0 && eliminado <= this._vehiculos.length && eliminado._disponible == true && eliminado._eliminado == false) {
            this._vehiculos[eliminado]._eliminado == true;
        } else {
            throw new Error("Vehiculo no encontrado o no disponible.");
        }
    }

    entregarVehiculo(numero) {
        //recorremos las reservas para cambiar la disponibilidad del vehiculo asociado a la reserva de numero "numero"
        for (let i = 0; i < this._reservas.length; i++) {
            if (this.reservas[i]._numero == numero) {
                //si el id del vehiculo no existe o no esta disponible-->error
                if (this.reservas[i]._vehiculoId = null || this.reservas[i]._disponible == false) {
                    throw new Error("Vehiculo no existente o no disponible");
                } else {
                    // cambiamos la disponibilidad de ese vehiculo
                    this.reservas[i]._disponible = false;
                    //establecemos la fecha de entrega en la reserva 
                    const fecha = new Date();
                    this.reservas[i]._entrega = fecha;
                }
            }
        }
    }

    devolverVehiculo(numero) {
        //recorremos las reservas para cambiar la disponibilidad del vehiculo asociado a la reserva de numero "numero"
        for (let i = 0; i < this._reservas.length; i++) {
            if (this.reservas[i]._numero == numero) {
                //si el id del vehiculo no existe o no esta disponible-->error
                if (this.reservas[i]._vehiculoId = null || this.reservas[i]._disponible == true) {
                    throw new Error("Vehiculo no existente o ya disponible");
                } else {
                    // cambiamos la disponibilidad de ese vehiculo
                    this.reservas[i]._disponible = true;
                    //establecemos la fecha de entrega en la reserva 
                    const fecha = new Date();
                    this.reservas[i]._devolución = fecha;
                }
            }
        }
    }

    reservas(clienteId) {
        const reservas_cliente = [];
        for (let i = 0; i < this._reservas.length; i++) {
            if (this._reservas[i]._clienteId == clienteId) {
                reservas_cliente.push(this._reservas[i]);
            } else {
                throw new Error("no existe cliente con ese id");
            }
            return reservas_cliente;
        }
    }

    clienteByEmail(email) {
        let cliente = this._clientes.find(cliente => cliente._email == email);
        if (cliente == null) {
            throw new Error("No existe un cliente con ese email.")
        }
        return cliente;
    }

    empleadoByEmail(email) {
        let empleado = this._empleados.find(empleado => empleado._email == email);
        if (empleado == null) {
            throw new Error("No existe un empleado con ese email.")
        }
        return empleado;
    }

    vehiculoPorMatricula(matricula) {
        let vehiculo = this._vehiculos.find(vehiculo => vehiculo._matricula == matricula);
        if (vehiculo == null) {
            throw new Error("No existe un vehiculo con esa matricula.")
        }
        return vehiculo;
    }

    reservaByNumero(numero) {
        let reserva = this._reservas.find(reserva => reserva._numero == numero);
        if (reserva == null) {
            throw new Error("No existe una reserva con ese numero.")
        }
        return reserva;
    }

    clienteById(clienteId) {
        let cliente = this._clientes.find(cliente => cliente._id == clienteId);
        if (cliente == null) {
            throw new Error("No existe un cliente con ese email.")
        }
        return cliente;
    }

    empleadoById(empleadoId) {
        let empleado = this._empleados.find(empleado => empleado._id == empleadoId);
        if (empleado == null) {
            throw new Error("No existe un empleado con ese email.")
        }
        return empleado;
    }

    vehiculoById(vehiculoId) {
        let vehiculo = this._vehiculos.find(vehiculo => vehiculo._id == vehiculoId);
        if (vehiculo == null) {
            throw new Error("No existe un vehiculo con esa matricula.")
        }
        return vehiculo;
    }

    reservaById(vehiculoId) {
        let reserva = this._reservas.find(reserva => reserva._vehiculoId == vehiculoId);
        if (reserva == null) {
            throw new Error("No existe una reserva que contenga el ID del vehículo.")
        }
        return reserva;
    }
}

module.exports = CarRentalOnline;
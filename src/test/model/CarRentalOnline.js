const assert = require("chai").assert;
const { expect } = require("chai");
const CarRentalOnline = require("../../src/model/CarRentalOnline");

//1
describe("CarRentalOnline", function () {
    const VEHICULOS = [
        new Vehiculo(1, 'ABC123', 'Toyota', 'Camry', 'Sedán', 'Automóvil', true, false, 50, 'Vehículo cómodo y confiable'),
        new Vehiculo(2, 'XYZ789', 'Honda', 'Civic', 'Sedán', 'Automóvil', true, false, 45, 'Vehículo económico y eficiente'),
        new Vehiculo(3, 'LMN456', 'Ford', 'Focus', 'Sedán', 'Automóvil', true, false, 55, 'Vehículo versátil y moderno'),
    ];
    const RESERVAS = [
        new Reserva(1, new Date('2023-10-25'), new Date('2023-10-30'), 500, '12345', 'LugarA', 'LugarB', new Date(), 1, 1),
        new Reserva(2, new Date('2023-9-25'), new Date('2023-9-30'), 600, '34556', 'Lugar1', 'Lugar2', new Date(), 2, 2),
        new Reserva(3, new Date('2023-8-25'), new Date('2023-8-30'), 700, '78922', 'Lugar3', 'Lugar4', new Date(), 3, 3)];
    const CLIENTES = [
        new Cliente(1, '123456789', 'Juan', 'Pérez', 'Calle 123', 'juan@email.com', 'contraseña', 'Cliente', '555-555-555'),
        new Cliente(2, '967854321', 'Pepe', 'López', 'Calle 456', 'pepe@email.com', 'contraseña', 'Cliente', '666-666-666'),
        new Cliente(3, '345612789', 'Marta', 'Martínez', 'Calle 789', 'marta@email.com', 'contraseña', 'Cliente', '777-777-777')];

    const EMPLEADOS = [
        new Empleado(1, '987654321', 'María', 'González', 'Avenida 456', 'maria@email.com', 'contraseña', 'Empleado', '555-555-556'),
        new Empleado(2, '978456312', 'David', 'Sánchez', 'Avenida 123', 'david@email.com', 'contraseña', 'Empleado', '555-555-557'),
        new Empleado(3, '478264645', 'Pepa', 'Muñoz', 'Avenida 789', 'pepa@email.com', 'contraseña', 'Empleado', '555-555-558')];

    let car_rental_online;

    beforeEach(function () { car_rental_online = new CarRentalOnline(); });

    //2
    it("constructor CarRentalOnline ", function () {
        assert.deepEqual(car_rental_online._lastId, 0);
        assert.deepEqual(car_rental_online._cliente, []);
        expect(car_rental_online._cliente).deep.equal([]);
        assert.deepEqual(car_rental_online._empleados, []);
        expect(car_rental_online._empleados).deep.equal([]);
        assert.deepEqual(car_rental_online._vehiculos, []);
        expect(car_rental_online._vehiculos).deep.equal([]);
        assert.deepEqual(car_rental_online._reservas, []);
        expect(car_rental_online._reservas).deep.equal([]);

    });

    //3
    it("getter clientes", function () {
        assert.deepEqual(car_rental_online._clientes, []);
    });

    //4
    it("getter empleados", function () {
        assert.deepEqual(car_rental_online._empleados, []);
    });

    //5

    it("getter vehiculos", function () {
        assert.deepEqual(car_rental_online._vehiculos, []);
    });

    //6
    it("getter reservas", function () {
        assert.deepEqual(car_rental_online._reservas, []);
    });

    //7
    it("agregar Cliente", function () {
        let clientes = CLIENTES.map(u => car_rental_online.agregarCliente(u._nombres));
        assert.equal(car_rental_online._clientes.length, CLIENTES.length); CLIENTES.forEach((u, i) => {
            assert.equal(car_rental_online._clientes[i]._nombres, CLIENTES[i]._nombres);
            assert.equal(car_rental_online._clientes[i]._nombres, clientes[i]._nombres);
            //comprobamos que los clientes tienen su correspondiente rol 
            assert.strictEqual(car_rental_online._clientes[i]._rol, 'Cliente', `El cliente ${i + 1} no tiene el rol 'Cliente'`);
        })
        //verificr que al agregar un cliente con email existente tira excepcion
        try {
            car_rental_online.agregarCliente(CLIENTES[1]._email);
            // Si no se lanza una excepción, la prueba debería fallar
            assert.fail('Se esperaba una excepción, pero no se lanzó.');
        } catch (error) {
            // Se espera que se lance una excepción, por lo que la prueba debería tener éxito
            assert.equal(error.message, 'El cliente ya existe en el sistema');
        }
    });

    //8
    it("agregar Empleado", function () {
        let empleados = EMPLEADOS.map(u => car_rental_online.agregarEmpleado(u._nombres));
        assert.equal(car_rental_online._empleados.length, EMPLEADOS.length); EMPLEADOS.forEach((u, i) => {
            assert.equal(car_rental_online._empleados[i]._nombres, EMPLEADOS[i]._nombres);
            assert.equal(car_rental_online._empleados[i]._nombres, empleados[i]._nombres);
            //comprobamos que los empleados tienen su correspondiente rol 
            assert.strictEqual(car_rental_online._empleados[i]._rol, 'Empleado', `El empleado ${i + 1} no tiene el rol 'Empleado'`);
        })
        //verificr que al agregar un empleado con email existente tira excepcion
        try {
            car_rental_online.agregarEmpleado(EMPLEADOS[1]._email);
            // Si no se lanza una excepción, la prueba debería fallar
            assert.fail('Se esperaba una excepción, pero no se lanzó.');
        } catch (error) {
            // Se espera que se lance una excepción, por lo que la prueba debería tener éxito
            assert.equal(error.message, 'El empleado ya existe en el sistema');
        }

    });


    //9
    it("agregar Vehiculo", function () {
        let vehiculos = VEHICULOS.map(u => car_rental_online.agregarVehiculo(u._id));
        assert.equal(car_rental_online._vehiculos.length, VEHICULOS.length); VEHICULOS.forEach((u, i) => {
            assert.equal(car_rental_online._vehiculos[i]._id, VEHICULOS[i]._id);
            assert.equal(car_rental_online._vehiculos[i]._id, vehiculos[i]._id);
        })
        //verificr que al agregar un vehiculo con matricula existente tira excepcion
        try {
            car_rental_online.agregarVehiculo(VEHICULOS[1]._matricula);
            // Si no se lanza una excepción, la prueba debería fallar
            assert.fail('Se esperaba una excepción, pero no se lanzó.');
        } catch (error) {
            // Se espera que se lance una excepción, por lo que la prueba debería tener éxito
            assert.equal(error.message, 'El vehiculo ya existe en el sistema');
        }

    });



    //10
    it("sign in cliente", function () {
        const emailNoExistente = 'email_no_existente@email.com';
        //comprobamos que si no es el correo de un cliente da excepcion 
        assert.throws(() => {
            car_rental_online.signin(emailNoExistente, CLIENTES[1]._password, CLIENTES[1]._rol);
        }, Error, 'El email no corresponde a un Cliente existente');
        //comprobamos que si la contraseña no es correcta da error
        assert.throws(() => {
            car_rental_online.signin(CLIENTES[1]._email, CLIENTES[2]._password, CLIENTES[1]._rol);
        }, Error, 'El cliente ha utilizado un password erróneo');
        //comprobamos que el rol es correcto
        assert.throws(() => {
            car_rental_online.signin(CLIENTES[2]._email, CLIENTES[2]._password, EMPLEADOS[1]._rol);
        }, Error, 'El usuario no es cliente');

    });

    //11
    it("sign in empleado", function () {
        const emailNoExistente = 'email_no_existente@email.com';
        //comprobamos que si no es el correo de un empleado da excepcion 
        assert.throws(() => {
            car_rental_online.signin(emailNoExistente, EMPLEADOS[1]._password, EMPLEADOS[1]._rol);
        }, Error, 'El email no corresponde a un Empleado existente');
        //comprobamos que si la contraseña no es correcta da error
        assert.throws(() => {
            car_rental_online.signin(EMPLEADOS[1]._email, EMPLEADOS[2]._password, EMPLEADOS[1]._rol);
        }, Error, 'El empleado ha utilizado un password erróneo');
        //comprobamos que el rol es correcto
        assert.throws(() => {
            car_rental_online.signin(EMPLEADOS[1]._email, EMPLEADOS[1]._password, CLIENTES[1]._rol);
        }, Error, 'El usuario no es Empleado');

    });


    //12

    it("sign up", function () {
        //usuario
        const usuarioOriginal = car_rental_online.usuario;
        const usuarioNuevo = {
            _dni: '123456789',
            _nombres: 'Usuario Nuevo',
            _apellidos: 'Apellido Nuevo',
            _direccion: 'Nueva Dirección',
            _email: 'usuario_nuevo@email.com',
            _password: 'nuevo_password',
            _telefono: '555-555-555',
            _rol: 'Cliente'
        };

        car_rental_online.signup(usuarioNuevo);

        assert.strictEqual(car_rental_online.usuario, usuarioOriginal, 'La variable de instancia usuario no ha sido modificada');

        //cliente y empleados registrados correctamente
        car_rental_online.signup(CLIENTES[1]);
        car_rental_online.signup(EMPLEADOS[1]);

        // Verificar que los clientes y empleados han sido registrados correctamente
        assert.strictEqual(car_rental_online.clienteByEmail(CLIENTES[1]._email), CLIENTES[1], 'El cliente ha sido registrado correctamente');
        assert.strictEqual(car_rental_online.empleadoByEmail(EMPLEADOS[1]._email), EMPLEADOS[1], 'El empleado ha sido registrado correctamente');

        //Verificar que no se agregan con el mismo email
        // Primero los registramos
        car_rental_online.signup(CLIENTES[2]);
        car_rental_online.signup(EMPLEADOS[2]);

        // Intentar registrar al mismo cliente nuevamente debería lanzar una excepción
        assert.throws(() => {
            car_rental_online.signup(CLIENTES[2]);
        }, Error, 'No se pueden registrar 2 clientes con el mismo email');
        // Intentar registrar al mismo empleado nuevamente debería lanzar una excepción
        assert.throws(() => {
            car_rental_online.signup(EMPLEADOS[2]);
        }, Error, 'No se pueden registrar 2 empleados con el mismo email');
        //un cliente se puede registrr como empleado y viceversa con distinta password

        car_rental_online.signup(CLIENTES[3]);

        // El cliente/Empleado ha sido registrado como cliente
        const clienteRegistrado = car_rental_online.clienteByEmail(CLIENTES[3]._email);
        assert.strictEqual(clienteRegistrado._email, CLIENTES[3]._email, 'El cliente/Empleado ha sido registrado como cliente');
        // Ahora intentamos registrarlo como empleado utilizando una contraseña diferente
        CLIENTES[3]._rol = 'Empleado';

        car_rental_online.signup(CLIENTES[3]);

        // El cliente/Empleado ha sido registrado como empleado
        const empleadoRegistrado = car_rental_online.empleadoByEmail(CLIENTES[3]._email);
        assert.strictEqual(empleadoRegistrado._email, CLIENTES[3]._email, 'El cliente/Empleado ha sido registrado como empleado');
    });


    //13
    it("sign out cliente", function () {
        
        // Verificar que al inicio no hay usuario logueado
        assert.strictEqual(CLIENTES[1], null, 'Al inicio no hay usuario logueado');
        // Verificar que el cliente ha ingresado
        car_rental_online.signup(CLIENTES[1]);
        assert.strictEqual(CLIENTES[1], _clientes[_clientes.length-1], 'El cliente ha ingresado');
        //Verificar que ha hecho sign out
        car_rental_online.signout();
        assert.strictEqual(CLIENTES[1], null, 'El cliente ha salido');
        
    });


    //14

    it("sign out empleado", function () {
        
        // Verificar que al inicio no hay usuario logueado
        assert.strictEqual(EMPLEADOS[1], null, 'Al inicio no hay usuario logueado');
        // Verificar que el empleado ha ingresado
        car_rental_online.signup(EMPLEADOS[1]);
        assert.strictEqual(EMPLEADOS[1], _empleados[_empleados.length-1], 'El empleado ha ingresado');
        //Verificar que ha hecho sign out
        car_rental_online.signout();
        assert.strictEqual(EMPLEADOS[1], null, 'El cliente ha salido');
        
    });

    //15


    it("reservar", function () {
    car_rental_online.signout(CLIENTES[1]);
    assert.throws(() => {
      car_rental_online.reservar(RESERVAS[1]);
    }, Error, 'No hay un cliente que ha ingresado en el sistema');

    car_rental_online.signin(CLIENTES[1]);
    car_rental_online.reservar(RESERVAS[2]);
    assert.throws(() => {
      car_rental_online.reservar(RESERVAS[2]);
    }, Error, 'Existe otra reserva en conflicto con el mismo vehículo');
    assert.throws(() => {
        car_rental_online.reservar(5, new Date('2023-10-25'), new Date('2023-10-30'), 500, '12345', 'LugarA', 'LugarB', new Date(), 1, 9);
      }, Error, 'El vehículo no existe');

      assert.strictEqual(RESERVAS[2]._numero, 34556, 'El número de reserva es correcto');
      assert.deepStrictEqual(RESERVAS[2]._inicio, new Date('2023-9-25'), 'La fecha de inicio es correcta');
      assert.deepStrictEqual(RESERVAS[2]._fin, new Date('2023-9-30'), 'La fecha de fin es correcta');
      assert.strictEqual(RESERVAS[2]._clienteId, 2, 'El ID del cliente es correcto');
      assert.strictEqual(RESERVAS[2]._vehiculoId, 2, 'El ID del vehículo es correcto');
      assert.strictEqual(RESERVAS[2]._costo, 600, 'El costo de la reserva es correcto');
});

});
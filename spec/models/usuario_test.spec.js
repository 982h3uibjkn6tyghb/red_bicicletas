var mongoose = require('mongoose');
var Bicicleta = require('../../models/bicicleta');
var Usuario = require('../../models/usuario');
var Reserva = require('../../models/reserva');


describe('Testing Bicicletas', function() {
    beforeEach(function(done) {
        var mongoDB = 'mongodb+srv://redBici:IlzI5Vv5Bf3Kjua7@cluster0.aqw1v.mongodb.net/testdb';
        mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

        const db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error'));
        db.once('open', function() {
            console.log('Connection test successful...');
            done();
        });
    });

    afterEach(function(done) {
        Reserva.deleteMany({}, function(err, success) {
            if (err) console.log(err);
            Usuario.deleteMany({}, function(err, success) {
                if (err) console.log(err);
                Bicicleta.deleteMany({}, function(err, success) {
                    if (err) console.log(err);
                    done();
                });
            });
        });


    });



    describe('Cuando un Usuario reserva una bici', () => {
        it('debe existir la reserva', (done) => {
            const usuario = new Usuario({ nombre: 'Juancho' });
            usuario.save();
            const bicicleta = new Bicicleta({ code: 1, color: "verde", modelo: "urbana" });
            bicicleta.save();

            var hoy = new Date();
            var mañana = new Date();
            mañana.setDate(hoy.getDate() + 1);
            usuario.reservar(bicicleta.id, hoy, mañana, function(err, reserva) {
                Reserva.find({}).populate('bicicleta').populate('usuario').exec(function(err, reservas) {
                    console.log(reservas[0]);
                    expect(reservas[0].diasDeReserva()).toBe(2);
                    expect(reservas[0].bicicleta.code).toBe(1);
                    expect(reservas[0].usuario.nombre).toBe(usuario.nombre);
                    done();
                });
            });
        });
    });

});
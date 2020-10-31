var mongoose = require('mongoose');
var Bicicleta = require('../../models/bicicleta');
var server = require('../../bin/www');
var request = require('request');

var base_url = "http://localhost:3000/api/bicicletas";


describe('Bicicleta API', () => {
    beforeEach(function(done) {
        var mongoDB = 'mongodb://localhost/red_bicicletas';
        mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

        const db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error'));
        db.once('open', function() {
            console.log('Test database successfuls...');
            done();
        });
    });

    afterEach(function(done) {
        Bicicleta.deleteMany({}, function(err, success) {
            if (err) console.log(err);
            mongoose.disconnect(err);
            done();
        });
    });


    describe('GET BICICLETAS /', () => {
        it('Status 200', (done) => {
            request.get(base_url, function(error, response, body) {
                var result = JSON.parse(body);
                expect(response.statusCode).toBe(200);
                expect(result.bicicletas.length).toBe(0);
                done();
            });
        });
    });


    describe('POST BICICLETAS /create', () => {
        it('STATUS 200', (done) => {
            var headers = { 'content-type': 'application/json' };
            var aBici = '{ "id": 10, "color": "rojo", "modelo": "urbana", "lat": -34, "lng": -54 }';
            request.post({
                headers: headers,
                url: base_url + '/create',
                body: aBici
            }, function(error, response, body) {
                expect(response.statusCode).toBe(200);
                var bici = JSON.parse(body).bicicleta;
                console.log(bici);
                expect(bici.color).toBe("rojo");
                expect(bici.ubicacion[0]).toBe(-34);
                expect(bici.ubicacion[1]).toBe(-54);
                done();
            });
        });
    });


    // describe('UPDATE BICICLETAS /update', () => {
    //     // console.log('UPDATE TEST'); //debug
    //     it('Status 200', (done) => {
    //         expect(Bicicleta.allBicis.length).toBe(0);

    //         //Crea una bici
    //         var headers = { 'content-type': 'application/json' };
    //         var Bici = '{ "id": 3, "color": "no informa", "modelo": "no informa", "lat": 0, "lng": 0 }';
    //         Bicicleta.add(Bici);
    //         request.post({
    //             headers: headers,
    //             url: 'http://localhost:3000/api/bicicletas/create',
    //             body: Bici
    //         }, function(error, response, body) {
    //             expect(response.statusCode).toBe(200);
    //             done();
    //         });
    //         //Actualiza los datos
    //         expect(Bicicleta.allBicis.length).toBe(1);
    //         var updBici = '{ "id": 3, "color": "verde-mod", "modelo": "mondial", "lat": -34, "lng": -52 }';
    //         request.post({
    //             headers: headers,
    //             url: 'http://localhost:3000/api/bicicletas/update',
    //             body: updBici
    //         }, function(error, response, body) {
    //             Bicicleta.updateById(updBici);
    //             expect(Bicicleta.findById(3).color).toBe("verde-mod");
    //             expect(response.statusCode).toBe(200);
    //             done();
    //         });
    //     });
    // });


    describe('DELETE BICICLETAS /delete', () => {
        // console.log('DELETE TEST'); //debug
        it('Status 204', (done) => {
            var a = Bicicleta.createInstance(1, 'negro', 'urbana', [-34.6012424, -58.3861]);
            Bicicleta.add(a, function(err, newBici) {
                var headers = { 'content-type': 'application/json' };

            });




            // var aBici1 = '{ "id": 4, "color": "amarillo", "modelo": "urbana", "lat": -34, "lng": -54 }';
            // Bicicleta.add(aBici1);

            // request.post({
            //     headers: headers,
            //     url: 'http://localhost:3000/api/bicicletas/create',
            //     body: aBici1
            // }, function(error, response, body) {
            //     Bicicleta.removeById(4);
            //     expect(Bicicleta.allBicis.length).toBe(0);
            //     expect(response.statusCode).toBe(200);
            //     done();
            // });
        });
    });

});
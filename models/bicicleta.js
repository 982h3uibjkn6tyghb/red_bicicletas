var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var bicicletaSchema = new Schema({
    code: Number,
    color: String,
    modelo: String,
    ubicacion: {
        type: [Number],
        index: { type: '2dsphere', sparse: true }
    }
});

bicicletaSchema.statics.createInstance = function(code, color, modelo, ubicacion) {
    return new this({
        code: code,
        color: color,
        modelo: modelo,
        ubicacion: ubicacion
    });
};

bicicletaSchema.methods.toString = function() {
    return 'code: ' + this.code + ' | color: ' + this.color;
};

bicicletaSchema.statics.allBicis = function(cb) {
    return this.find({}, cb); //cb -> call back
};

bicicletaSchema.statics.add = function(aBici, cb) {
    this.create(aBici, cb);
};

bicicletaSchema.statics.findByCode = function(aCode, cb) {
    return this.findOne({ code: aCode }, cb);
};

bicicletaSchema.statics.removeByCode = function(aCode, cb) {
    return this.deleteOne({ code: aCode }, cb);
};



module.exports = mongoose.model('Bicicleta', bicicletaSchema);






// var Bicicleta = function(id, color, modelo, ubicacion) {
//     this.id = id;
//     this.color = color;
//     this.modelo = modelo;
//     this.ubicacion = ubicacion;
// }




// Bicicleta.allBicis = [];

// Bicicleta.add = function(aBici) {
//     Bicicleta.allBicis.push(aBici);
// }

// Bicicleta.findById = function(aBiciId) {
//     var aBici = Bicicleta.allBicis.find(x => x.id == aBiciId);
//     if (aBici)
//         return aBici;
//     else
//         throw new Error(`No existe una bicicleta con el id ${aBiciId}`);
// }

// Bicicleta.removeById = function(aBiciId) {
//     for (var i = 0; i < Bicicleta.allBicis.length; i++) {
//         if (Bicicleta.allBicis[i].id == aBiciId) {
//             Bicicleta.allBicis.splice(i, 1);
//             break;
//         }
//     }
// }

// Bicicleta.getUbicacion = function(aBiciId) {
//     var aBici = Bicicleta.allBicis.find(x => x.id == aBiciId.id);
//     if (aBici)
//         return aBici.ubicacion;
//     else
//         throw new Error(`No existe una bicicleta con el id ${aBiciId}`);
// }

// Bicicleta.updateById = function(uBici) {
//     var aBici = Bicicleta.allBicis.find(x => x.id == uBici.id);

//     if (aBici) {
//         if (uBici.color != null) {
//             aBici.color = uBici.color;
//         }
//         if (uBici.modelo != null) {
//             aBici.modelo = uBici.modelo;
//         }

//         if (uBici.ubicacion[0] != null) {
//             aBici.ubicacion[0] = uBici.ubicacion[0];
//         }
//         if (uBici.ubicacion[1] != null) {
//             aBici.ubicacion[1] = uBici.ubicacion[1];
//         }

//         return aBici;
//     } else {
//         throw new Error(`No existe una bicicleta con el id ${uBici}`);
//     }
// }


// var a = new Bicicleta(1, 'rojo', 'urbana', [-34.6012424, -58.3861497]);
// var b = new Bicicleta(2, 'blanca', 'urbana', [-34.596932, -58.3808287]);

// Bicicleta.add(a);
// Bicicleta.add(b);



// module.exports = Bicicleta;
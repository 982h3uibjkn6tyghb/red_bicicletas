const Usuario = require("../../models/usuario");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
    authenticate: function(req, res, next) {
        // const { email, password } = req.body;
        // Usuario.findOne({ email }, function(err, userInfo) {
        Usuario.findOne({ email: req.body.email }, function(err, userInfo) {
            if (err) {
                next(err);
            } else {
                if (userInfo === null) { return res.status(401).json({ status: "error", message: "Usuario inválido", data: null }); }
                // if (userInfo !== null && bcrypt.compareSync(password, userInfo.password)) {
                if (userInfo !== null && bcrypt.compareSync(req.body.password, userInfo.password)) {
                    // userInfo.save(function(err, usuario) {
                    const token = jwt.sign({ id: userInfo._id }, req.app.get('secretKey'), { expiresIn: "7d" });
                    res.status(200).json({ message: "Usuario encontrado", data: { usuario: userInfo, token: token } });
                    // });
                } else {
                    res.status(401).json({ status: "error", message: "Invalido email/password", data: null });
                }
            }
        });
    },

    forgotPassword: function(req, res, next) {
        // const { email } = req.body;
        // Usuario.findOne({ email }, function(err, userInfo) {
        Usuario.findOne({ email: req.body.email }, function(err, usuario) {
            if (!usuario) return res.status(401).json({ message: "No existe el usuario", data: null });
            usuario.resetPassword(function(err) {
                if (err) { return next(err); }
                // res.status(200).json({ message: "Se envió un mensaje a ${email} para reestablecer la contraseña`,
                res.status(200).json({ message: "Se envió un mensaje para reestablecer la contraseña", data: null, });
            });
        });
    },
    authFacebookToken: function(req, res, next) {
        if (req.user) {
            req.user.save().then(() => {
                const token = jwt.sign({ id: req.user.id }, req.app.get('secretKey'), { expiresIn: '7d' });
                res.status(200).json({ message: "Usuario encontrado o creado!", data: { user: req.user, token: token } });
            }).catch((err) => {
                console.log(err);
                res.status(500).json({ message: err.message });
            });
        } else {
            res.status(401);
        }
    },
};
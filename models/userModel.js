const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator')

const Roles = {
    values: ['Admin', 'User'],
    message: '{VALUE} role no permitido'
}

const userSchema = Schema({
    nombre: {
        type: String,
        unique: true,
        required: [true, 'El nombre es necesario']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Es email es necesario']
    },
    password: {
        type: String,
        required: [true, 'Es necesario el password']
    },
    role: {
        type: String,
        default: 'User',
        required: [true, 'Role es necesario'],
        enum: Roles
    }
});

userSchema.plugin(uniqueValidator, {message: '{PATH} debe ser único'});

module.exports = mongoose.model('user', userSchema);
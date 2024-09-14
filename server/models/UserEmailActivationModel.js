const {Schema, model} = require('mongoose');

const UserEmailActivationSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    activationCode: {type: String, required: true}
});

module.exports = model('UserEmailActivation', UserEmailActivationSchema);
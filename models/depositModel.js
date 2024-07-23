const mongoose = require('mongoose');

const depositSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user'}, 
        proofOfPayment: {
        public_id: { type: String},
         url:{ type: String, },
         createdAt: { type: Date, default: Date.now },
    },
});

module.exports = mongoose.model('Deposit', depositSchema);

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LoyaltyDealSchema = new Schema({
    reward: { type: String, required: true }, 
    stampsRequired: { type: Number, required: true },
    shop: { type: Schema.Types.ObjectId, ref: 'Shop', required: true, unique: true }
});
  
LoyaltyDealSchema.index({ shop: 1 });

const LoyaltyDeal = mongoose.model('LoyaltyDeal', LoyaltyDealSchema);

module.exports = { LoyaltyDeal };

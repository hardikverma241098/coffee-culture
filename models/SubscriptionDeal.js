const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SubscriptionDealSchema = new Schema({
  variant: { type: String, required: true }, // e.g. "Basic", "Premium"
  drinksAllowance: { type: Number, required: true }, // e.g. 3 drinks per week
  price: { type: Number, required: true },
  frequency: { type: String, enum: ['daily', 'weekly', 'monthly'], required: true },
  coffeeTypes: { type: [String], required: true }, // e.g. ["Cappuccino", "Espresso", "Latte"]
  shop: { type: Schema.Types.ObjectId, ref: 'Shop', required: true }
});

SubscriptionDealSchema.index({ shop: 1 });

const SubscriptionDeal = mongoose.model('SubscriptionDeal', SubscriptionDealSchema);

module.exports = { SubscriptionDeal };

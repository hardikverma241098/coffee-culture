const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LocationSchema = new Schema({
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zipCode: { type: String, required: true },
  country: { type: String, required: true },
}, {
  timestamps: true
});

const ShopSchema = new Schema({
  name: { type: String, required: true },
  openingHours: { type: String, required: true },
  logo: { type: String, required: true },
  description: { type: String, required: true },
  locations: [LocationSchema],
  loyaltyDeals: { type: Schema.Types.ObjectId, ref: 'LoyaltyDeal' },
  subscriptionDeals: [{ type: Schema.Types.ObjectId, ref: 'SubscriptionDeal' }],
}, {
  timestamps: true
});

ShopSchema.index({ name: 1 });

const Shop = mongoose.model('Shop', ShopSchema);

module.exports = { Shop };
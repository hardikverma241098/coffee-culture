const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StampHistorySchema = new Schema({
  date: { type: Date, required: true },
  shop: { type: Schema.Types.ObjectId, ref: 'Shop', required: true },
  stampType: { type: String, enum: ['reward', 'normal'], required: true },
  loyaltyCard: { type: Schema.Types.ObjectId, ref: 'LoyaltyCard', required: true },
});

const LoyaltyCardSchema = new Schema({
  shop: { type: Schema.Types.ObjectId, ref: 'Shop', required: true },
  loyaltyDeal: { type: Schema.Types.ObjectId, ref: 'LoyaltyDeal', required: true },
  currentStamps: { type: Number, required: true },
  totalStampsCollected: { type: Number, required: true },
});

const SubscriptionCardSchema = new Schema({
  shop: { type: Schema.Types.ObjectId, ref: 'Shop', required: true },
  subscriptionDeal: { type: Schema.Types.ObjectId, ref: 'SubscriptionDeal', required: true },
  drinksCompleted: { type: Number, required: true },
  isActive: { type: Boolean, required: true },
  startDate: { type: Date, required: true },
});

const CustomerSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  loyaltyCards: { type: [LoyaltyCardSchema] },
  subscriptionCards: { type: [SubscriptionCardSchema] },
  stampHistory: { type: [StampHistorySchema] },
});

CustomerSchema.index({ email: 1 });

CustomerSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
      return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

module.exports = mongoose.model('Customer', CustomerSchema);

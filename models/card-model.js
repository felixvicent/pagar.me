const mongoose = require("mongoose");

const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const cardModel = new Schema(
  {
    card_id: { type: String },
    cardNumber: { type: String },
    holder_name: { type: String },
    brand: { type: String },
    street: { type: String },
    street_number: { type: String },
    city: { type: String },
    state: { type: String },
    zipcode: { type: String },
    phone: { type: String },
    cpf: { type: String },
    name: { type: String },
    email: { type: String },
    userId: {
      type: ObjectId,
      ref: "User",
    },
    active: {
      type: String,
      required: true,
      default: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionKey: false,
  }
);

cardModel.pre("save", (next) => {
  const now = new Date();

  if (!this.createdAt) this.createdAt = now;

  next();
});

module.exports = mongoose.model("Card", cardModel);

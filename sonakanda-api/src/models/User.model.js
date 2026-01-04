const mongoose = require('mongoose');

/**
 * User Schema
 * Required:
 *  - name_en
 *  - nid_number (unique)
 *  - mobile_number (unique)
 *  - password (hashed)
 */

const birthplaceSchema = new mongoose.Schema(
  {
    village: { type: String },
    union: { type: String },
    ward_no: { type: String },
    upazila: { type: String },
    zila: { type: String },
  },
  { _id: false },
);

const permanentAddressSchema = new mongoose.Schema(
  {
    village: { type: String },
    union: { type: String },
    ward_no: { type: String },
    upazila: { type: String },
  },
  { _id: false },
);

const userSchema = new mongoose.Schema(
  {
    // Required
    name_en: {
      type: String,
      required: true,
      trim: true,
    },
    nid_number: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    mobile_number: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },

    // Account balance (for banking-style UI)
    balance: {
      type: Number,
      default: 0,
    },

    // Optional
    name_bn: { type: String, trim: true },
    date_of_birth: { type: Date },
    emergency_mobile_number: { type: String, trim: true },
    blood_group: { type: String, trim: true },
    birthplace: birthplaceSchema,
    father_name: { type: String, trim: true },
    mother_name: { type: String, trim: true },
    permanent_address: permanentAddressSchema,
    school_or_college_name: { type: String, trim: true },
    current_profession: { type: String, trim: true },
  },
  {
    timestamps: true,
  },
);

// Hide password when converting to JSON
userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

const User = mongoose.model('User', userSchema);

module.exports = User;

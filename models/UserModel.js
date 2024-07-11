import mongoose from "mongoose";
const { Schema } = mongoose;

const addressSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  companyName: {
    type: String,
  },
  flatNo: {
    // Can be used for apartment/flat number
    type: String,
  },
  buildingName: {
    type: String,
  },
  street: {
    type: String,
  },
  locality: {
    type: String,
  },
  village: {
    // Can be included for rural addresses
    type: String,
  },
  city: {
    type: String,
    required: true,
  },
  district: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  pincode: {
    type: String,
    required: true,
    validate: {
      validator: (v) => /\d{6}$/.test(v),
      message: "Pincode must be a 6-digit number",
    },
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  alternatePhoneNumber: {
    type: String,
  },
});
//for signup schema
const userSchema = new Schema(
  {
    uid: {
      type: String,
      required: true,
    },
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    dob: {
      type: Date,
      required: true,
    },
    email: {
      type: String,
    },
    addresses: [addressSchema],
    // shoppinng preferences
    typeOfProducts: {
      type: Array,
      default: [],
    },
    budgetRange: {
      type: Array,
      default: [],
    },
    modeOfShopping: {
      type: String,
      enum: ["Online", "Offline"],
    },
    interestInEcofriendly: {
      type: Boolean,
      default: false,
    },

    // frequently visited places
    locations: {
      type: Array,
      default: [],
    },
    shops: {
      type: Array,
      default: [],
    },
    restaurants: {
      type: Array,
      default: [],
    },
    phoneNumber: {
      type: Number,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    orders: {
      type: Array,
      default: [],
    },
    loyaltyPoints: {
      type: Number,
      default: 0,
    },
    salt: {
      type: String,
    },
  },
  { timestamps: true }
);

const UserModel = new mongoose.model("User", userSchema); //collection name in database: user
export default UserModel;

// chirag

const mongoose = require("mongoose");
const Schema = mongoose.Schema(
  {
    fname: {
      type: String,
      required: [true, "First name is required"],
    },
    lname: {
      type: String,
      required: [true, "Last name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
    },
    phone: {
      type: String,
      required: [true, "Phone is required"],
    },
    cin: {
      type: String,
      required: [true, "CIN is required"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Student", Schema);

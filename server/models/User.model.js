const { Schema, model } = require("mongoose");

const userSchema = new Schema (
    {
        firstName: String,
        lastName: String,
        email: String,
        talent: Boolean,
        location: String,
        extWeb: String,
        userImg: String,
        creativeFields: String,
        about: String,
    }
    {
        timestamps: true,
      }
);

module.exports = model("User", userSchema);

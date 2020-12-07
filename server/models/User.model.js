const { Schema, model } = require("mongoose");

const userSchema = new Schema (
    {
        firstName: String,
        lastName: String,
        email:{
            type: String,
            required: [true, 'Email is required.'],
            match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.'],
            unique: true,
            lowercase: true,
            trim: true,
          },
        password: { type: String, required: [true, 'Password is required.'] },
        type: { type: String, required: [true, 'Please specify'] },
        location: String,
        extWeb: String,
        userImg: String,
        creativeFields: String,
        about: String,
    },
    {
        timestamps: true,
      }
);

module.exports = model("User", userSchema);
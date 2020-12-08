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
        creativeFields: { type: String, default: "No field added yet"},
        location: { type: String, default: "No location yet"},
        extWeb: { type: String, default: "No portfolio added yet"},
        userImg: { type: String, default: "No profile pic yet"},
        about: { type: String, default: "No description yet"},
        projects: [{ type: Schema.Types.ObjectId, ref: "Project" }],
    },
    {
        timestamps: true,
      }
);

module.exports = model("User", userSchema);
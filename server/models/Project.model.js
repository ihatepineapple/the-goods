const { Schema, model } = require("mongoose");

const userSchema = new Schema (
    {
        title: String,
        // owner: { type: Schema.Types.ObjectId, ref: "User" },
        creativeField: String, 
        description: String,
        heroImage: String,
        images: [String],
    },
    {
        timestamps: true,
      }
);

module.exports = model("Project", userSchema);
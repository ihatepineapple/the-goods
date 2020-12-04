const { Schema, model } = require("mongoose");

const projectSchema = new Schema (
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

module.exports = model("Project", projectSchema);
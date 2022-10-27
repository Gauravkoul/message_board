var mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chat_schema = new Schema(
  {
    message: {
      type: String,
    },
    sender: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const chat_model = mongoose.model("Chat", chat_schema);
export default chat_model;

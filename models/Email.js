const mongoose = require("mongoose");
const timestamp = require("mongoose-timestamp");

const EmailSchema = new mongoose.Schema({
  header: {
    type: {},
    required: true
  },
  body: {
    type: {},
    required: true
  },
  owner: String,
  tags: [
    {
      type: String,
      required: true
    }
  ],
  // userTags: [Strings],
  attachments: {}
});

EmailSchema.plugin(timestamp);

const Email = mongoose.model("Email", EmailSchema);
module.exports = Email;

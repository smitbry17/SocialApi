const {Schema, model} = require("mongoose");

const userSchema = new Schema(
  {
    username: { type: String, required: 'Username is required', unique: true, trim: true },
    email: {
      type: String,
      required: 'Email is required',
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    thoughts: [{ type: Schema.Types.ObjectId, ref: "Thought" }],

    friends: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

userSchema.virtual("friendsCount").get(function () {
  return this.friends.length;
});

const User = model("User", userSchema);

module.exports = User;

const mongoose = require("mongoose");

let UserSchema = mongoose.Schema({
  gender: {
    type: String,
    enum: ["male", "female"],
  },
  name: {
    title: { type: String },
    first: { type: String },
    last: { type: String },
  },
  location: {
    street: {
      number: { type: Number },
      name: { type: String },
    },
    city: { type: String },
    state: { type: String },
    country: { type: String },
    postcode: { type: String },
    coordinates: {
      latitude: { type: String },
      longitude: { type: String },
    },
    timezone: {
      offset: { type: String },
      description: { type: String },
    },
  },
  email: {
    type:String,
    required:true,
    unique:true
},
  login: {
    uuid: { type: String },
    username: { type: String },
    password: { type: String },
    salt: { type: String },
    md5: { type: String },
    sha1: { type: String },
    sha256: { type: String },
  },
  dob: {
    date: { type: Date },
    age: { type: Number },
  },
  registered: {
    date: { type: Date },
    age: { type: Number },
  },
  phone: { type: String },
  cell: { type: String },
//   id: {
//     name:{type: String},
//     value:{type: String},
//   },
    picture: {
      large: { type: String },
      medium: { type: String },
      thumbnail: { type: String },
    },
    nat: String
});


const UserModel = mongoose.model("randomUser", UserSchema) 

module.exports = {UserModel};

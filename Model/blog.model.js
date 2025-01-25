const { Schema, model } = require("mongoose");

const common = {
  type: String,
  required: true,
  trim: true,
};
const blogSchema = new Schema(
  {
    category: common,
    title: common,
    author: common,
    description: common,
    post: String,
  },
  {
    timestamps: true,
  }
);

const Blog = model("Blog", blogSchema); 
module.exports = Blog;

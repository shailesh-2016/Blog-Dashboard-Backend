const Blog = require("../Model/blog.model");

exports.store = async (req, res) => {
  try {
    console.log(req.body);
    const { category, title, author, description } = req.body; // Removed post from req.body
    const post = req.file ? req.file.filename : ""; // The uploaded image filename is in req.file

    const existBlog = await Blog.findOne({ title }).countDocuments().exec();
    if (existBlog > 0) {
      res.json({
        success: true,
        message: "Blog already exists",
      });
    } else {
      await Blog.create({ category, title, author, description, post });
      res.redirect("/viewBlog");
    }
  } catch (error) {
    console.log(error);
  }
};

exports.trash = async (req, res) => {
  const { id } = req.params;
  await Blog.findByIdAndDelete(id);
  res.redirect("/viewBlog");
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { category, title, author, description, post } = req.body;
    await Blog.findByIdAndUpdate(
      { _id: id },
      { category, title, author, description, post }
    ),
      res.redirect("/viewBlog");
  } catch (error) {
    console.log(error);
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const blogData = ({ category, title, author, description } = req.body);

    if (req.file) {
      blogData.post = req.file.filename;
    }
    await Blog.findByIdAndUpdate(id, blogData);
    res.redirect("/viewBlog");
  } catch (error) {
    console.log(error);
  }
};

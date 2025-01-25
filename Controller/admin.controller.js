const Admin = require("../Model/admin.model");
const { plainToHash, hashToPlain } = require("../utils/password");

exports.register = async (req, res) => {
  // console.log(req.body)
  try {
    const { username, email, password, confirm_password } = req.body;
    const existEmail = await Admin.findOne({ email: email })
      .countDocuments()
      .exec();
    if (existEmail > 0) {
      res.json("email already exist");
    } else {
      // await Admin.create({ username, email, password, confirm_password });
      res.redirect("/login");
      const hash = await plainToHash(password);
      await Admin.create({ username, email, password: hash, confirm_password });
      // console.log(hash)
    }
  } catch (err) {
    res.json(err);
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const existEmail = await Admin.findOne({ email }).countDocuments().exec();
  if (existEmail > 0) {
    const existUser = await Admin.findOne({ email });
    await hashToPlain(password, existUser.password);
    // console.log(existUser.password)
    const match_pass = await hashToPlain(password, existUser.password);
    if (match_pass) {
      const payload = {
        username: existUser.username,
        email: existUser.email,
      };
      res.cookie("admin", payload, { httpOnly: true });
      res.redirect("/");
      // res.json("password match")
    } else {
      res.json("password not match");
    }
  } else {
    res.json("email is not exist");
  }
};
exports.updateProfile = async (req, res) => {
  try {
    const { email, username } = req.body;
    const existemail = await Admin.findOne({ email }).countDocuments().exec();
    if (existemail > 0) {
      await Admin.updateOne(
        {
          email: email,
        },
        {
          username,
          admin_profile: req?.file?.filename,
        }
      );
      res.redirect("/myProfile");
    } else {
      res.json("email not exist");
    }
  } catch (err) {
    console.log(err);
  }
};

const sendEmail = require("../config/mail");
const Admin = require("../Model/admin.model");
const { forgotMailer } = require("../utils/mailFormate");
const { plainToHash, hashToPlain } = require("../utils/password");
const otpGenerator = require("otp-generator");

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
  try {
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
  } catch (error) {
    console.log(error);
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

exports.changePass = async (req, res) => {
  // console.log(req.body);
  try {
    const { email, password, new_pass, confirm_pass } = req.body;
    const existEmail = await Admin.findOne({ email }).countDocuments().exec();
    if (existEmail > 0) {
      const admin = await Admin.findOne({ email });
      const match = await hashToPlain(password, admin.password);

      if (match) {
        console.log(new_pass);
        console.log(confirm_pass);

        if (new_pass === confirm_pass) {
          const hash_pass = await plainToHash(new_pass);
          await Admin.updateOne({ email: email }, { password: hash_pass });
          res.redirect("/changePassword");
        } else {
          res.json("confirm password is not match");
        }
      } else {
        res.json("password does not match!");
      }
    } else {
      res.json("email not exist");
    }
  } catch (error) {
    console.log(error);
  }
};

//forgot pass

exports.forgotPass = async (req, res) => {
  try {
    const { email } = req.body;
    const existEmail = await Admin.findOne({ email }).countDocuments().exec();
    if (existEmail > 0) {
      var otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        specialChars: false,
      });
      await Admin.updateOne(
        { email: email },
        {
          token: otp,
        }
      );
      await sendEmail(email, "forgot-pass", otp);

      res.redirect("/updatePass");
    } else {
      res.redirect("/login");
    }
  } catch (err) {
    console.error(err);
    res.redirect("/updatePass");
  }
};

exports.updatePass = async (req, res) => {
  const { token, new_password, confirm_password } = req.body;

  const existToken = await Admin.findOne({ token }).countDocuments().exec();
  if (existToken) {
    if (new_password === confirm_password) {
      const hash = await plainToHash(new_password);

      const admin = await Admin.findOne({ token });

      await Admin.findByIdAndUpdate(
        { _id: admin._id },
        { password: hash, token: "" }
      );

      res.redirect("/login");
    } else {
      res.redirect("/updatePass");
    }
  } else {
    res.redirect("/updatePass");
  }
};
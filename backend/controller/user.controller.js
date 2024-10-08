import cloudinary from 'cloudinary';
import User from '../model/user.model.js';

export const registerUser = async (req, res) => {
  try {
    const { name, phone, password, about = "Hi There! I'm using FK Chat" } = req.body;

    if (!name || !phone || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, Phone, and Password are required."
      });
    }
    const existedUser = await User.findOne({ phone });
    if (existedUser) {
      return res.status(400).json({
        success: false,
        message: `User with phone number ${phone} already exists.`
      });
    }

    let avatar = {
      public_id: "",
      url: ""
    };

    if (req.file) {
      const myCloud = await cloudinary.v2.uploader.upload(req.file.path, {
        folder: "FKChatAvatars",
        width: 250,
        crop: "scale"
      });

      avatar = {
        public_id: myCloud.public_id,
        url: myCloud.secure_url
      };
    }

    const user = await User.create({
      name,
      phone,
      password,
      avatar,
      about
    });
    const token = user.getJWTtoken();

    // Set cookie options for token
    const options = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',  // Protect from CSRF attacks
      expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    };

    res.cookie('token', token, options).status(201).json({
      success: true,
      message: `Welcome, ${name}`,
      token
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { phone, password } = req.body;

    if (!phone || !password) {
      return res.status(400).json({
        success: false,
        message: "Phone, and Password are required."
      });
    }
    const existedUser = await User.findOne({ phone });
    if (!existedUser) {
      return res.status(400).json({
        success: false,
        message: `User with phone number ${phone} does not exists.`
      });
    }
    const isPassword = await existedUser.comparePassword(password);
    if (!isPassword) {
      return res.status(404).json({
        success: false,
        message: `Incorrect Password`
      });
    }
    const token = existedUser.getJWTtoken();
    const options = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',  // Protect from CSRF attacks
      expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    };

    res.cookie('token', token, options).status(201).json({
      success: true,
      message: `Welcome Back`,
      token,
      user: {
        _id: existedUser._id,
        name: existedUser.name,
        phone: existedUser.phone,
        avatar: existedUser.avatar,
        isOnline: existedUser.isOnline,
        about: existedUser.about,
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const loginUserDetail = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(400).json({
        success: false,
        message: `User does not exists.`
      });
    }
    res.status(201).json({
      success: true,
      user
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).select("-password");
    if (!users) {
      return res.status(400).json({
        success: false,
        message: `Users does not exists.`
      });
    }
    res.status(201).json({
      success: true,
      users
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const getOtherUsers = async (req, res) => {
  try {
    const users = await User.find({ _id: { $ne: req.user._id } }).select("-password");
    if (!users || users.length === 0) {
      return res.status(400).json({
        success: false,
        message: `No other users found`
      });
    }
    res.status(201).json({
      success: true,
      users
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const logoutUser = async (req, res) => {
  try {
    if (!req.user) {
      return res.json({
        success: false,
        message: "Logout Already"
      })
    }
    const options = {
      httpOnly: true,
      secure: true,
      expires: new Date(Date.now())
    }
    return res.cookie("token", null, options).status(201).json({
      success: true,
      message: "Logout Successfully"
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const user = req.user;
    const { name, about, phone } = req.body;
    if (name) user.name = name;
    if (about) user.about = about;
    if (phone) user.phone = phone;
    if (req.file) {
      if (user.avatar && user.avatar.public_id) {
        await cloudinary.v2.uploader.destroy(user.avatar.public_id)
      }
      const myCloud = await cloudinary.v2.uploader.upload(req.file.path, {
        folder: "FKChatAvatars",
        width: 250,
        crop: "scale"
      });
      user.avatar.public_id = myCloud.public_id;
      user.avatar.url = myCloud.secure_url
    }
    await user.save();
    res.status(200).json({
      success: true,
      user,
      message: "Profile Updated! Back Home to See Change"
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}
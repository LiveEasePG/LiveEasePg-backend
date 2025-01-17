import { User } from "../../models/user.model.js";
import  uploadOnCloudinary  from "../../utils/cloudinary.js";
import { asyncHandler } from "../../utils/asyncHander.js";
import { ApiResponse } from "../../utils/apiResponse.js";
import { ApiError } from "../../utils/ApiError.js";


export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, mobileNumber, address, universityRegNo,dateOfBirth } = req.body;

  if(!name || !email || !password || !mobileNumber || !address || !universityRegNo || !dateOfBirth) {
    throw new ApiError(400, "All fields are required");
  }

  const exitedUser = await User.findOne({
    $or: [{ mobileNumber }, { email }]
 });

  if(exitedUser) {
    throw new ApiError(400, "User already exists");
  }

  const profileImage = req.files?.profileImage[0]?.path;
  // console.log(req.files);
  if(!profileImage) {
    throw new ApiError(400, "Profile image is required");
  }
  const cloudinaryResponse = await uploadOnCloudinary(profileImage);
  const profileImageUrl = cloudinaryResponse?.url;

  const user = await User.create({
    name,
    email,
    password,
    mobileNumber,
    address,
    universityRegNo,
    dateOfBirth:dateOfBirth,
    profileImage: profileImageUrl
  })
  console.log(user);

  const createdUser = await User.findById(user._id).select("-password -refreshToken");
  if(!createdUser) {
    throw new ApiError(400, "Failed to create user");
  }
  return res.status(201).json(new ApiResponse(201, "User created successfully", createdUser));
})

// export { registerUser };
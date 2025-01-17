import mongoose,{Schema} from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new Schema({
    name:{
        type:String,
        required:true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        // Index this field for faster queries
    },
    mobileNumber:{
        type:String,
        unique: true,
        required:true,
        trim:true,
        index: true, 
    },
    password:{
        type:String,
        required:true,
    },
    address:{
        type:String,
        required:true,
    },
    dateOfBirth:{
        type:Date,
        required:true,
    },
    universityRegNo:{
        type:String,
        required:true,
    },
    refreshToken:{
        type:String,
    },
    roomId:{
        type:String,
        default:null,
    },
    pgBookingId:{
        type:String,
        default:null,
    },
    adhaarImage:{
        type:String,
        default:null,
    },
    profileImage:{
        type:String,
        required:true,
    }


},{timestamps:true})

userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        return next();
    }
    this.password = await bcrypt.hash(this.password,10);
    next();
});

userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password,this.password);
}

userSchema.methods.generateToken = function(){
    return jwt.sign({
        _id:this._id,
        email:this.email,
        name:this.name,
        mobileNumber:this.mobileNumber

    },
        process.env.JWT_SECRET,
        {expiresIn:process.env.ACCESS_TOKEN_EXPIRY});
}
userSchema.methods.generateRefreshToken = function(){
    return jwt.sign({
        _id:this._id,
        },
        process.env.JWT_SECRET,
        {expiresIn:process.env.REFRESH_TOKEN_EXPIRY});
}


export const User = mongoose.model("User",userSchema);
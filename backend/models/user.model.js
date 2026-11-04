import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    firebaseUID: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    profilePic: {
        type: String,
        default: ""
    }
}, {
    timestamps: true
});

const UserModel = mongoose.model("user", UserSchema);
export default UserModel;
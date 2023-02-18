import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: {
        type: String,
        required: true,
        match: /.+\@.+\..+/, //adding some validations to email
        unique: true, //email must be unique
      },
    password:{type:String,required:true}

});

const userModel = mongoose.model("User", UserSchema);

export default userModel;
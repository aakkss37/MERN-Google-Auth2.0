import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
	googleID: {
		type: String,
		unique: true,
		required: true
	},
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	picture: {
		type:String,
		required: true
	},
	phone: String,
	cgpa: String,
	activeBack: Boolean,
})

const User = mongoose.model('User', userSchema);

export default User;
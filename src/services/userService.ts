import { User } from "../schemas/userSchema";
import { generateToken } from "../middleware/token";

const userService = { createUser, loginUser, changeUserPassword };

async function createUser(name: string, email: string, password: string) {
    const userExists = await User.findOne({ email });
    if (userExists) {
        throw new Error("E-mail already in use!");
    }
    const user = new User({ name, email, password });
    await user.save();
    return user;
}

async function loginUser(email: string, password: string) {
    const user = await User.findOne({ email, password });
    if (!user) {
        throw new Error("Invalid credentials!");
    }
    const token = generateToken(user._id.toString());
    const userNoPassword = user.toJSON();
    delete (userNoPassword as { password?: string }).password;
    return { user, token };
}

async function changeUserPassword(userId: string, newPassword: string) {
    const user = await User.findOne({ _id: userId });
    if (!user) {
        throw new Error("User not found!");
    }
    const userPassword = user?.password;
    if (userPassword === newPassword) {
        throw new Error("The password must be different!");
    }
    await User.updateOne({ password: newPassword });
    return { message: "Password was successfully changed!" };
}

export default userService;

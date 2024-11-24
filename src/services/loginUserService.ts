import { generateToken } from "../middleware/token";
import { User } from "../schemas/userSchema";

export async function loginUser(email: string, password: string) {
    const user = await User.findOne({ email, password });
    if (!user) {
        throw new Error("Invalid credentials!");
    }
    const token = generateToken(user._id.toString());
    const userNoPassword = user.toJSON();
    delete (userNoPassword as { password?: string }).password;
    return { user, token };
}

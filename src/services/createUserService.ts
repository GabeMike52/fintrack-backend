import { User } from "../schemas/userSchema";

export async function createUser(name: string, email: string, password: string) {
    const userExists = await User.findOne({ email });
    if (userExists) {
        throw new Error("E-mail already in use!");
    }
    const user = new User({ name, email, password });
    await user.save();
    return user;
}

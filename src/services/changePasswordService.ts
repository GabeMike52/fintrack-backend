import { User } from "../schemas/userSchema";

export async function changeUserPassword(userId: string, newPassword: string) {
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

import { Schema, model } from "mongoose";

interface IUser {
    name: string;
    email: string;
    password: string;
    theme: boolean;
}

const userSchema = new Schema<IUser>({
    name: { type: String, required: true, minLength: 3 },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minLength: 4 },
    theme: Boolean,
});

const User = model<IUser>("User", userSchema);

export { User, IUser, userSchema };

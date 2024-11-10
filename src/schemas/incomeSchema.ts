import { Schema, model } from "mongoose";

interface IIncome {
    title: string;
    value: number;
    isRecurrent: boolean;
}

const incomeSchema = new Schema<IIncome>({
    title: { type: String, required: true },
    value: { type: Number, required: true, default: 0.0 },
    isRecurrent: { type: Boolean, required: true, default: true },
});

const Income = model<IIncome>("Income", incomeSchema);

export { Income };

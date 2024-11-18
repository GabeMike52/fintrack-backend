import { Schema, model } from "mongoose";

interface IIncome {
    title: string;
    value: number;
    description?: string;
    isMonthly: boolean;
    receiptDate: Date;
    userId: object;
}

const incomeSchema = new Schema<IIncome>({
    title: { type: String, required: true, unique: true },
    value: { type: Number, required: true, default: 0.0 },
    description: { type: String, required: false },
    isMonthly: { type: Boolean, required: true, default: true },
    receiptDate: { type: Date, required: true },
    userId: { type: Object },
});

const Income = model<IIncome>("Income", incomeSchema);

export { Income };

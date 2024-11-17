import { Schema, model } from "mongoose";

interface IExpense {
    title: string;
    value: number;
    description?: string;
    isMonthly: boolean;
    paymentDate: Date;
    userId: object;
}

const expenseSchema = new Schema<IExpense>({
    title: { type: String, required: true },
    value: { type: Number, required: true, default: 0.0 },
    description: { type: String, required: false },
    isMonthly: { type: Boolean, required: true, default: true },
    paymentDate: { type: Date, required: true },
    userId: Object,
});

const Expense = model<IExpense>("Expense", expenseSchema);

export { Expense };

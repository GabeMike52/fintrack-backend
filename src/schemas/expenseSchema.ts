import { Schema, model } from "mongoose";

interface IExpense {
    title: string;
    value: number;
    isMonthly: boolean;
    userId: object;
}

const expenseSchema = new Schema<IExpense>({
    title: { type: String, required: true },
    value: { type: Number, required: true, default: 0.0 },
    isMonthly: Boolean,
    userId: Object,
});

const Expense = model<IExpense>("Expense", expenseSchema);

export { Expense };

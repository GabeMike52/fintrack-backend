import { Schema, model } from "mongoose";

interface IExpense {
    title: string;
    value: number;
}

const expenseSchema = new Schema<IExpense>({
    title: { type: String, required: true },
    value: { type: Number, required: true, default: 0.0 },
});

const Expense = model<IExpense>("Expense", expenseSchema);

export { Expense };

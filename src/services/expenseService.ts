import { Expense } from "../schemas/expenseSchema";

const expenseService = { expenseCreate, expensesGet, expenseUpdate, expenseDelete };

async function expenseCreate(
    title: string,
    description: string,
    value: number,
    userId: string | undefined,
    isMonthly: boolean,
    paymentDate: Date
) {
    const expense = new Expense({
        title,
        description,
        value,
        userId,
        isMonthly,
        paymentDate,
    });
    await expense.save();
    return expense;
}

async function expensesGet(userId: string | undefined) {
    const expenses = await Expense.find({ userId });
    return expenses;
}

async function expenseUpdate(
    expenseId: string,
    title?: string,
    description?: string,
    value?: number,
    isMonthly?: boolean,
    paymentDate?: Date
) {
    const expense = await Expense.findOne({ _id: expenseId });
    if (!title && !description && !value && !isMonthly && !paymentDate) {
        throw new Error("You need to fill at least one field to update the expense!");
    }
    await expense?.updateOne({
        title: title,
        description: description,
        value: value,
        isMonthly: isMonthly,
        paymentDate: paymentDate,
    });
    const updatedExpense = await Expense.findOne({ _id: expenseId });
    return updatedExpense;
}

async function expenseDelete(expenseId: string) {
    const expense = await Expense.findOne({ _id: expenseId });
    await expense?.deleteOne();
}

export default expenseService;

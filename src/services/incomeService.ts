import { Income } from "../schemas/incomeSchema";

const incomeService = { incomeCreate, incomesGet, incomeUpdate, incomeDelete };

async function incomeCreate(
    title: string,
    description: string,
    value: number,
    userId: string | undefined,
    isMonthly: boolean,
    receiptDate: Date
) {
    const income = new Income({
        title,
        description,
        value,
        userId,
        isMonthly,
        receiptDate,
    });
    await income.save();
    return income;
}

async function incomesGet(userId: string | undefined) {
    const incomes = await Income.find({ userId });
    return incomes;
}

async function incomeUpdate(
    incomeId: string,
    title?: string,
    description?: string,
    value?: number,
    isMonthly?: boolean,
    receiptDate?: Date
) {
    const income = await Income.findOne({ _id: incomeId });
    if (!title && !description && !value && !isMonthly && !receiptDate) {
        throw new Error("You need to fill at least one field to update the income!");
    }
    await income?.updateOne({
        title: title,
        description: description,
        value: value,
        isMonthly: isMonthly,
        receiptDate: receiptDate,
    });
    return income;
}

async function incomeDelete(incomeId: string) {
    const income = await Income.findOne({ _id: incomeId });
    await income?.deleteOne();
}

export default incomeService;

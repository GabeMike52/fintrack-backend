import dotenv from "dotenv";

dotenv.config();

const ENV = {
    PORT: process.env.PORT || 3000,
    MONGO_URI: process.env.MONGO_URI || "",
    JWT_SECRET: process.env.JWT_SECRET || "",
};

if (!ENV.MONGO_URI || !ENV.JWT_SECRET) {
    throw new Error("Missing necessary environment variables!");
}

export default ENV;

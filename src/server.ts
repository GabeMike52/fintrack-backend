import app from "./app";
import ENV from "./config/env";
import logger from "./config/logger";

//Setting the listen method for the server to run
const PORT = ENV.PORT;

app.listen(PORT, () => logger.info(`Server running on http://localhost:${PORT}`));

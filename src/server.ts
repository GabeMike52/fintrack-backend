import app from "./app";
import ENV from "./config/env";

//Setting the listen method for the server to run
const PORT = ENV.PORT;

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

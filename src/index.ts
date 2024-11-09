import { app } from "./server/server";

//Setting the liste method for the server to run
const port: number = 3000;
app.listen(3000, () =>
    console.log(`Server running on http://localhost:${port}`)
);

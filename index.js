// require your server and launch it
const server = require("./api/server");
const port = 9001;

server.listen(port, () => console.log("API running on port " + port));

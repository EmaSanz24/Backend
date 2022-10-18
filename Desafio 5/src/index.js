import express from "express";
import router from "./routes/products.js";
//import { URL } from "url";
import handlebars from "express-handlebars";
import pug from "pug";
import ejs from "ejs";
import ViewsRouter from "./routes/ViewsRouter.js";

const app = express();
const PORT = process.env.PORT || 8080;
//const __dirname = new URL(".", import.meta.url).pathname;
const server = app.listen(PORT, () => console.log(`Server listening on PORT ${PORT}`));
server.on("error", (err) => console.log(`Error: ${err}`));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//-------- HBS --------
// personalmente prefiero HBS para el proyecto dado que es el que me resulta mas sencillo de usar
app.engine(
  "hbs",
  handlebars.engine({
    extname: ".hbs",
    defaultLayout: "main.hbs",
  })
);

app.set("view engine", "hbs");
app.set("views", "./views");

// --------- PUG -----------

// app.set("view engine", "pug");
// app.set("views", "./views");

// --------- EJS --------

// app.set("view engine", "ejs");
// app.set("views", "./views");

app.use("/", ViewsRouter);
app.use("/api/products", router);

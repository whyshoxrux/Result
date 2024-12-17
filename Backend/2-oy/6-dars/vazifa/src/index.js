import express from "express";
// import kitoblarRouter from "./controller/kitoblar.controller.js";
// import oyinlarRouter from "./controller/oyinlar.controller.js";
import kinolarRouter from "./controller/kinolar.controller.js";
// import baholarRouter from "./controller/oliygohbaho.controller.js";
const PORT = 3000;
const app = express();

// app.use("/oyin", oyinlarRouter);
// app.use("/kitob", kitoblarRouter);
app.use("/kino", kinolarRouter);
// app.use("/baho", baholarRouter);

app.listen(PORT, () => {
  console.log(`Server ${PORT} da ishladi`);
});


//?  Lyuboyini komentdan chiqarib ishlatoras (Ozim ishladim domla bilsez bilarsiz)
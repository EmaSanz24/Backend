import { Router } from "express";

const router = Router();
router.get("/", async (req, res) => {
  const quantity = req.query.cant;
  let countObj = {};
  let numbers = [];

  if (!quantity) {
    //10e7 = 100.000.000
    for (let i = 0; i < 10e7; i++) {
      const numb = Math.floor(Math.random() * 1000) + 1;
      numbers.push(numb);
    }
  } else {
  }

  // let countObj = {};
  // let arr = [1,2,3,1,2,3,4];

  // let countFunc = keys => {
  //   countObj[keys] = ++countObj[keys] || 1;
  // }

  // arr.forEach(countFunc);

  // console.log(countObj)

  const numb = Math.floor(Math.random() * 1000) + 1;

  res.send(`
    `);
});
export { router as RandomsRouter };

import { Router } from "express";
//import { ProductDao } from "../../dao/Dao.Factory.js";
import { DATE_UTILS, ERRORS_UTILS, JOI_VALIDATOR } from "../../utils/index.js";
import { verifyRole } from "../../middlewares/index.js";
import { ProductRepo } from "../../repositories/Products.Repository.js";

const router = Router();
//  empieza en /api/products
router.get("/", async (req, res) => {
  const product = await ProductRepo.getAll();

  if (!product) {
    return res.send({ error: true, message: ERRORS_UTILS.MESSAGES.NO_PRODUCTS });
  } else {
    res.send(product);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const product = await ProductRepo.getById(id);
    if (!product) {
      throw Error();
    }
    res.send(product);
  } catch {
    return res.send({ error: true, message: ERRORS_UTILS.MESSAGES.NO_PRODUCT_FOUND(id) });
  }
});
router.post("/", verifyRole, async (req, res) => {
  try {
    const { title, description, code, thumbnail, price, stock } = req.body;

    const product = await JOI_VALIDATOR.product.validateAsync({
      timestamp: DATE_UTILS.getTimestamp(),
      title,
      description,
      code,
      thumbnail,
      price,
      stock,
    });

    const createdProduct = await ProductRepo.save(product);

    res.send(createdProduct);
  } catch (error) {
    res.send({ error: ERRORS_UTILS.MESSAGES.ADD_FAILED });
  }
});

router.put("/:id", verifyRole, async (req, res) => {
  const { id } = req.params;
  try {
    const { title, description, code, thumbnail, price, stock } = req.body;

    const product = await JOI_VALIDATOR.product.validateAsync({
      timestamp: DATE_UTILS.getTimestamp(),
      title,
      description,
      code,
      thumbnail,
      price,
      stock,
    });
    const updatedProduct = await ProductRepo.updateById(id, product);
    if (!updatedProduct) {
      throw Error();
    }
    res.send(updatedProduct);
  } catch (error) {
    res.send({ error: true, message: ERRORS_UTILS.MESSAGES.PRODUCT_UPDATE_FAILED(id) });
  }
});

router.delete("/:id", verifyRole, async (req, res) => {
  try {
    const { id } = req.params;
    const element = await ProductRepo.deleteById(id);
    if (!element) throw new Error();
    res.send({ success: true });
  } catch (error) {
    res.send({ error: ERRORS_UTILS.MESSAGES.DELETE_FAILED });
  }
});

export { router as ProductRouter };

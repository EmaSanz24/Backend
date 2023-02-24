const IS_ADMIN = true;

const verifyRole = (req, res, next) => {
  if (!IS_ADMIN)
    return res.send({ error: "permisos para utilizar el metodo " + req.method + " en la ruta " + req.baseUrl + req.route.path + " insuficientes" });

  next();
};

export { verifyRole };

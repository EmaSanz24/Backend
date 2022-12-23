const root = (req, res) => {
  if (req.session) {
    res.status(200).send(`Bienvenido ${req.session.name}`);
  } else {
    const name = req.body.nombre || "sin nombre";
    req.session.name = name;
    res.status(200).send(`Bienvenido ${name}`);
  }
};

const logout = (req, res) => {
  try {
    req.session.destroy();
    res.status(200).send(`Hasta Luego ${req.session.name}`);
  } catch (error) {
    res.send(500, "" + error);
  }
};

export { root, logout };

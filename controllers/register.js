const handleRegister = (req, res, db, bcrypt) => {
  const { email, name, password } = req.body;
  if (!email || !name || !password) {
    return res.status(400).json("inccorrect form submission");
  }
  const hash = bcrypt.hashSync(password);
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  db.transaction((trx) => {
    trx
      .insert({
        hash: hash,
        email: email,
      })
      .into("login")
      .returning("email")
      .then((loginEmail) => {
        return trx("users")
          .returning("*")
          .insert({
            email: loginEmail[0],
            name: name,
            joined: new Date(),
          })
          .then((userReg) => {
            res.json(userReg[0]);
          });
      })
      .then(trx.commit)
      .catch(trx.rollback);
  // }).catch((err) => res.status(400).json("unable to register"));
}).catch((err) => res.status(400).json(err));

};

module.exports = {
  handleRegister: handleRegister,
};

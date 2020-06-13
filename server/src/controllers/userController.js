const { pool1, pool2 } = require("../database");

exports.list = async (req, res) => {
  const process = await pool2.query("SELECT * FROM USUARIOS limit 3;");
  res.json(process);
};

exports.checkuser = async (req, res) => {
  var user = req.body.user;
  var password = req.body.password;

  const process = await pool2.query(
    "SELECT emp_ruc as ruc, usu_id as id, usu_nombre as nom, usu_apellido as ape FROM USUARIOS WHERE usu_usuario = '" +
      user +
      "' AND usu_password = '" +
      password +
      "' limit 1;"
  );

  if (process != 0) {
    var data = process;
  } else {
    var data = { message: false };
  }

  res.json(data);
};

exports.registerUser = async (req, res) => {
  var nombre = req.body.nombre;
  var apellido = req.body.apellido;
  var email = req.body.email;
  var telefono = req.body.telefono;
  var password = req.body.password;

  const process = await pool2.query(
    "INSERT INTO USUARIOS (usu_nombre, usu_apellido, usu_email, usu_telefono, usu_usuario, usu_password) VALUES ('" +
      nombre +
      "','" +
      apellido +
      "','" +
      email +
      "','" +
      telefono +
      "','" +
      email +
      "','" +
      password +
      "')"
  );

  if (process.affectedRows > 0) {
    var msg = process.insertId;
  } else {
    var msg = 0;
  }

  res.send({ id: msg });
};

exports.registerCompany = async (req, res) => {
  var ruc = req.body.ruc;
  var nombre = req.body.nombre;
  var fecha = req.body.fecha;
  var rubro = req.body.rubro;
  var pais = req.body.pais;
  var ciudad = req.body.ciudad;
  var region = req.body.region;
  var direccion = req.body.direccion;

  const process = await pool2.query(
    "SELECT * FROM EMPRESA WHERE emp_ruc = '" + ruc + "' limit 1;"
  );

  if (process.length == 0 ) {

    const process = await pool2.query(
      "INSERT INTO EMPRESA (emp_ruc, emp_nombre, emp_estado, emp_fecha, emp_tipocliente, emp_function, emp_rubro, emp_pais, emp_ciudad, emp_region, emp_direccion) VALUES ('" +
        ruc +
        "','" +
        nombre +
        "','" +
        "inactivo" +
        "','" +
        fecha +
        "','" +
        "demo" +
        "','" +
        "1" +
        "','" +
        rubro +
        "','" +
        pais +
        "','" +
        ciudad +
        "','" +
        region +
        "','" +
        direccion +
        "')"
    );

    var data = ruc;

  } else {
    var data = "exist";
  }

  res.send({ message: data });
};

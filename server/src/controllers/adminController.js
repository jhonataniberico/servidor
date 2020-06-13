const { pool1, pool2 } = require("../database");

exports.listUser = async (req, res) => {
  const process = await pool2.query(
    "SELECT * FROM USUARIOS WHERE emp_ruc = '" + req.params.ruc + "' "
  );
  res.json(process);
};

exports.addUser = async (req, res) => {
  var ruc = req.body.ruc;
  var idsede = req.body.idsede;
  var nivel = req.body.usunivel;
  var fecnac = req.body.usufecnac;
  var lenguaje = req.body.usulenguaje;
  var pais = req.body.usupais;
  var genero = req.body.genero;
  var nombre = req.body.nombre;
  var apellido = req.body.apellido;
  var email = req.body.email;
  var telefono = req.body.telefono;
  var password = req.body.password;

  const process = await pool2.query(
    "INSERT INTO USUARIOS (emp_ruc, id_sede, usu_nivel, usu_fecnaci, usu_lenguaje, usu_pais, usu_genero, usu_nombre, usu_apellido, usu_email, usu_telefono, usu_usuario, usu_password) VALUES ('" +
      ruc +
      "','" +
      idsede +
      "','" +
      nivel +
      "','" +
      fecnac +
      "','" +
      lenguaje +
      "','" +
      pais +
      "','" +
      genero +
      "','" +
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

exports.updateUser = async (req, res) => {
  var ruc = req.body.ruc;
  var iduser = req.body.iduser;
  var idsede = req.body.idsede;
  var nivel = req.body.usunivel;
  var fecnac = req.body.usufecnac;
  var lenguaje = req.body.usulenguaje;
  var pais = req.body.usupais;
  var genero = req.body.genero;
  var nombre = req.body.nombre;
  var apellido = req.body.apellido;
  var email = req.body.email;
  var telefono = req.body.telefono;
  var password = req.body.password;

  const process = await pool2.query(
    'UPDATE USUARIOS SET id_sede = "' + idsede + '",' +
                         'usu_nivel = "' + nivel + '",' +
                         'usu_fecnaci = "' + fecnac + '",' +
                         'usu_lenguaje = "' + lenguaje + '",' +
                         'usu_pais = "' + pais + '",' +
                         'usu_genero = "' + genero + '",' +
                         'usu_nombre = "' + nombre + '",' +
                         'usu_apellido = "' + apellido + '",' +
                         'usu_email = "' + email + '",' +
                         'usu_telefono = "' + telefono + '",' +
                         'usu_usuario = "' + email + '",' +
                         'usu_password = "' + password + '"' +
                         'WHERE emp_ruc = ' + ruc + ' AND usu_id = ' + iduser + ' '
  );

  if (process.affectedRows > 0) {
    var msg = iduser;
  } else {
    var msg = 0;
  }

  res.send({ id: msg });
};

exports.deleteUser = async (req, res) => {
  var ruc = req.body.ruc;
  var iduser = req.body.iduser;

  const process = await pool2.query('DELETE FROM USUARIOS WHERE emp_ruc = ' + ruc + ' AND usu_id = ' + iduser + ' ');

  if (process.affectedRows > 0) {
    var msg = true;
  } else {
    var msg = false;
  }

  res.send({ msg: msg });
};

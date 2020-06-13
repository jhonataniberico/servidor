const {pool1, pool2} = require('../database');

exports.testing_list = async (req, res) => {
    console.log(req.params.id);
    console.log(req.params.ruc);
    console.log(req.params.envio);
    
    res.json({text: "parametros"});
};

exports.testing2_list = async (req, res) => {
    const process = await pool2.query('SELECT * FROM USUARIOS limit 5;');
    res.json(process);
};

exports.textingpost_list = async (req, res) => {
    console.log(req.body);
    res.send({message: 'Saved'})
}
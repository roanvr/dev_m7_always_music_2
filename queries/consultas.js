import pool from '../config/db.js';
const argumento = process.argv.slice(2);
const opcion = argumento[0];
const genero = argumento[1];
const fdn = argumento[2];
const telefono = argumento[3];
const email = argumento[4];
const pais = argumento[5];
const nombre = argumento[6];

const agregarEstudiante = async(genero, fdn, telefono, email, pais, nombre) => {
    try {
        const consulta = {
            text: 'INSERT INTO estudiantes (genero, fdn,telefono, email, pais, nombre) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            values: [genero, fdn, telefono, email, pais, nombre]
        };
        
        const response = await pool.query(consulta);
        console.log('El estudiante fue agregado exitosamente', response.rows[0]);
    } catch (error){
        console.log(error.code, error.message);
    }
};

agregarEstudiante(genero, fdn, telefono, email, pais, nombre);


const mostrarEstudiantes = async () => {
    try {
        const consulta = {
            text: 'SELECT * FROM estudiantes',
        };
        const response = await pool.query(consulta);
        console.log('El registro actual de estudiantes es:', response.rows);
    } catch (error) {
        console.log(error.code, error.message)
    };
}

mostrarEstudiantes();

const mostrarXtelefono = async (telefono) => {
    try {
        const consulta = {
            text: 'SELECT * FROM estudiantes WHERE telefono = $1',
            values: [telefono],
        };
        const response = await pool.query(consulta);
        console.log('El estudiante es:', response.rows[0]);

    } catch (error) {
        console.log(error.code, error.message);
    }
};

mostrarXtelefono(telefono);

const actEstudiantes = async (genero, fdn, telefono, email, pais, nombre) => {
    try {
        const consulta = {
            text: 'UPDATE estudiantes SET genero = $1, fdn = $2, telefono = $3, email = $4, pais = $5 WHERE nombre = $6',
            values: [genero, fdn, telefono, email, pais, nombre],
        };
        const response = await pool.query(consulta);
        console.log('La base de datos ha sido actualizada', response.rowCount);
    } catch (error) {
        console.log(error.code, error.message)
    }
}

if (opcion === 'agregar'){
    agregarEstudiante();
}
if (opcion === 'mostrar'){
    mostrarEstudiantes();
}
if (opcion === 'mostrarTelefono'){
    const telefono = argumento[1];
    mostrarXtelefono(telefono);
}
if (opcion === 'actualizar') {
    actEstudiantes(genero, fdn, telefono, email, pais, nombre);
}
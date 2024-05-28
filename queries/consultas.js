import pool from '../config/db.js';

const agregarEstudiante = async(genero, fdn, telefono, email, pais, nombre) => {
    try {
        const consulta = {
            sql: 'INSERT INTO estudiantes (genero, fdn,telefono, email, pais, nombre) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            values: [genero, fdn, telefono, email, pais, nombre]
        }
        
        const response = await pool.query(consulta);
        console.log('El estudiante fue agregado exitosamente', response.rows[0]);
    } catch (error){
        console.log(error.code, error.message);
    }
}
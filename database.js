const { response } = require('express')

const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    port: 5432,
    password: 'asli12345',
    database: 'ExpressDB'
})

//CRUD FOR GETTING THE USER INFO
const getUserById = (req, res) => {
    const id = parseInt(req.params.id)

    pool.query('SELECT * FROM Users WHERE id=$1', [id], (error, results) => {
        if(error){
            throw error
        }
        res.status(200).json(res.rows)
    })
}

//CRUD FOR POSTING A NEW USER
const createUser = (req, res) => {
    const { email } = request.body

    pool.query('INSERT INTO Users (email) VALUES ($1) RETURNING *', [email], (error, results) => {
        if(error){
            throw error
        }
        response.status(201).send('User added with ID: ${results.row[0].id}')
    })
}

//CRUD FOR UPDATING USER DATA
const updateUser = (req, res) => {
    const id = parseInt(req.params.id)
    const {firstname, lastname} = request.body

    pool.query(
        'UPDATE Users SET firstname = $1, lastname = $2 WHERE id = $3',
        [firstname, lastname, id],
        (error, results) => {
            if(error) {
                throw error
            }
            response.status(200).send('User modified with ID: ${id}')
        }
    )
}

module.exports = {
    getUserById,
    createUser,
    updateUser,
}
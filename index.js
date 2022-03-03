const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const { pool } = require('./config')

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())

const getEquipe = (request, response) => {
    pool.query('SELECT * FROM equipe', (error, results) => {
        if (error) {
            return response.status(401).json({
                status: 'error',
                message: 'Erro: ' + error
            });
        }
        response.status(200).json(results.rows)
    })
}

const addEquipe = (request, response) => {
    const { nome, fundacao, esporte, estado } = request.body

    pool.query(
        'INSERT INTO equipe (nome, fundacao, esporte, estado) VALUES ($1, $2, $3, $4)',
        [nome, fundacao, esporte, estado],
        (error) => {
            if (error) {
                return response.status(401).json({
                    status: 'error',
                    message: 'Erro: ' + error
                });
            }
            response.status(201).json({ status: 'success', message: 'Equipe criada.' })
        },
    )
}

const updateEquipe = (request, response) => {
    const { codigo, nome, fundacao, esporte, estado } = request.body
    pool.query('UPDATE equipe set nome=$1, fundacao=$2, esporte=$3, estado=$4 where codigo=$5',
        [nome, fundacao, esporte, estado, codigo], error => {
            if (error) {
                return response.status(401).json({
                    status: 'error',
                    message: 'Erro: ' + error
                });
            }
            response.status(201).json({ status: 'success', message: 'Equipe atualizada.' })
        })
}

const deleteEquipe = (request, response) => {
    const codigo = parseInt(request.params.id);
    pool.query('DELETE FROM equipe where codigo = $1', [codigo], error => {
        if (error) {
            return response.status(401).json({
                status: 'error',
                message: 'Erro: ' + error
            });
        }
        response.status(201).json({ status: 'success', message: 'Equipe apagada.' })
    })
}

const getEquipePorID = (request, response) => {
    const codigo = parseInt(request.params.id);
    pool.query('SELECT * FROM equipe where codigo = $1', [codigo], (error, results) => {
        if (error) {
            return response.status(401).json({
                status: 'error',
                message: 'Erro: ' + error
            });
        }
        response.status(200).json(results.rows)
    })
}

app
    .route('/equipe')
    // GET endpoint
    .get(getEquipe)
    // POST endpoint
    .post(addEquipe)
    // PUT
    .put(updateEquipe)

app.route('/equipe/:id')
    .get(getEquipePorID)
    .delete(deleteEquipe)


// Start server
app.listen(process.env.PORT || 3003, () => {
    console.log(`Servidor rodando nas porta 3003`)
})
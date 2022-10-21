import mysql from 'mysql2/promise'


export default async function handler(request, response) {

    const dbconnection = await mysql.createConnection({
        host: process.env.REACT_APP_HOST,
        database: process.env.REACT_APP_DB_NAME,
        port: process.env.REACT_APP_HOST_PORT,
        user: process.env.REACT_APP_HOST_USER,
        password: process.env.REACT_APP_HOST_PASSWORD,
    })

    const table = 'products'

    if (request.method === 'GET') {
        let query = ''
        try {

            query = getExpressionCreator(table, request)

            const [data] = await dbconnection.execute(query)
          
            response.status(200).json(data)

        } catch (error) {

            response.status(500).json({ error: error.message, query: query })

        }
    }

    else if (request.method === 'POST') {

        try {
            const query = postExpressionCreator(table, request.body)
            const [data] = await dbconnection.execute(query)

            response.status(200).json({ message: "add success", results: data })

        } catch (error) {

            response.status(500).json({ error: error.message })

        }
    }

    else if (request.method === 'PATCH') {

        try {
            const query = patchExpressionCreator(table, request.body, request.query['id'])
            const values = []
            const [data] = await dbconnection.execute(query)

            response.status(200).json({ message: "update success", results: data })

        } catch (error) {

            response.status(500).json({ error: error.message })

        }
    }

    else if (request.method === 'PUT') {

        response.status(200).json({ message: 'usar método patch' })

    }

    else if (request.method === 'DELETE') {

        try {
            const query = `DELETE FROM ${table} WHERE id = ${request.query['id']}`

            const [data] = await dbconnection.execute(query)

            response.status(200).json({ message: "delete success", results: data })

        } catch (error) {

            response.status(500).json({ error: error.message })

        }
    }

    else {
        response.status(500).json({ message: 'wrong method' })
    }

    dbconnection.end()
}



export const getExpressionCreator = (table, request) => {

    const condition = Object.entries(request.query)[0] ? "WHERE " + Object.entries(request.query)[0][0] + "='" + Object.entries(request.query)[0][1] + "'" : ""

    return `SELECT * FROM ${table} ${condition}`
}



export const postExpressionCreator = (table, body) => {

    let fields = ''
    let contents = ''

    Object.entries(body).forEach(([key, value]) => {

        fields = fields + (fields != "" ? ", " : "") + key
        contents = contents + (contents != "" ? ", " : "") + "'" + value + "'"

    })

    return `INSERT INTO ${table} (${fields}) VALUES (${contents});`

}



export const patchExpressionCreator = (table, body, id) => {

    let expression = ''

    Object.entries(body).forEach(([key, value]) => {

        expression = expression + (expression != "" ? ", " : "") + key + "=" + "'" + value + "'"

    })

    return (`UPDATE ${table} SET ${expression} where id=${id};`)
}
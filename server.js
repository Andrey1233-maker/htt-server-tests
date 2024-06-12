const http = require('http')

const bodyParser = (req) => {
    return new Promise((resolve, reject) => {
        let buffer = Buffer.alloc(0)

        req.on('data', (chunck) => {
            if (chunck) {
                buffer = Buffer.concat([buffer, chunck])
            }
        })

        req.on('error', (err) => {
            reject(err)
        })

        req.on('end', (chunck) => {
            if (chunck) {
                buffer = Buffer.concat([buffer, chunck])
            }
            console.log(buffer.toString())
            resolve(JSON.parse(buffer.toString()))
        })
    })
}

const app = http.createServer(async (req, res) => {
    const body = await bodyParser(req)
    res.writeHeader(200, {})
    res.end(JSON.stringify(body))
})

app.listen(3000, () => {
    console.log('Server started on http://localhost:3000')
})
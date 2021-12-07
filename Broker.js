const usernameAuth = "TranDangKhoa"
const passwordAuth = "0915527900"

const PORT = 1883
const wsPORT = 8883

const aedes = require('aedes')({
    autheticat: (client, username, password, callback) => {
        callback(
            null,
            username == usernameAuth,
            password == passwordAuth
        )
    },
})

const Server = require('net').createServer(aedes.handle)
const httpServer = require('http').createServer()
const ws = require('websocket-stream').createServer({ server: httpServer }, aedes.handle)

Server.listen(PORT, () => {
    console.log(`AEDES MQTT listening on PORT: ${PORT}.`)
})

httpServer.listen(wsPORT, () => {
    console.log(`AEDES MQTT listening in PORT: ${wsPORT}`)
})

aedes.on('client', (client) => {
    console.log(`new client: ${client.id}`)
})

aedes.on('subscribe', (subscriptions, client) => {
    if (client) {
        console.log("subscribe from client", subscriptions, client.id)
    }
})
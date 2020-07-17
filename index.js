const express    = require('express')
const bodyParser = require('body-parser')
const Routes     = require('./Routes')
class App {
    /**
     * Se setean las propiedades que van a ser usada en la creación del servidor
     */
    constructor()
    {
        this.expressApp = express()
        this.configs =
        {
            get port()
            {
                return process.env.PORT || 4000
            }
        }
    }
    /**
     * Se aplica algún middleware que necesita ser llamada en la aplicación
     */
    applyMiddleware()
    {
        //Permite al servidor parsear los JSON
        this.expressApp.use(bodyParser.json())
        //Se registran las rutas que serán usadas: GET Y POST
        new Routes(this.expressApp)
    }
    /**
     * Se corre la aplicación
     */
    run()
    {
        this.expressApp.listen(this.configs.port, () =>
        {
            console.log("Servidor express está corriendo en el puerto " + this.configs.port + ".")
            console.log(`Environment: ${process.env.STAGE || "development"}`)
        })
    }
}
//Se llaman los métodos
const app = new App()
app.applyMiddleware()
app.run()
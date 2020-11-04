import mysql = require('mysql');

export default class MySQL {
    private static _instance: MySQL;

    cnn: mysql.Connection;
    connected: boolean = false;

    constructor() {
        console.log('Clase inicializada');

        this.cnn = mysql.createConnection({
            host: 'localhost',
            user: 'node_user',
            password: '123456',
            database: 'cursos_fh_node_db'
        });

        this.conectDB();
    }

    /* Implementación singleton */
    public static get instance() {
        return this._instance || (this._instance = new this());
    }

    /* Método de ejecuón de queries */
    static ejecutarQuery(query: string, callback: (err:any, res:Object[]) => void) {
        this.instance.cnn.query(query, (err, results: Object[], fields) => {
            if (err) {
                console.log('Error en query');
                console.log(err.message);
                
                return callback(err, []);
            }

            if (results.length === 0) {
                callback('El registro solicitado no existe', []);
            } else {
                callback(null, results);
            }
        });
    }

    private conectDB() {
        this.cnn.connect((err: mysql.MysqlError) => {
            if (err) {
                console.log(err.message);
                return;

            }

            this.connected = true;
            console.log('BD online!!!');
        });
    }

}
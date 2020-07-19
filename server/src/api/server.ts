import express, {Express} from 'express';
import bodyParser from "body-parser";
import database from "../persistence/database";
import userDao from "../persistence/user.dao";
import {PoolClient} from "pg";

export class Server {

    public start() {
        const app = express();

        this.configureApi(app);
        this.openAPI(app);
        this.initServer(app);
    }

    private initServer(app: Express) {
        const port = 3000;
        database.initPool().subscribe(
            (connexion: PoolClient) => {
                console.log('[database] connection success');
                app.listen(port, err => {
                    if (err) console.log('error', err);
                    console.log(`Server is listening on http://localhost:${port}`)
                })
            },
            (err) => console.log('[database] connection err', err)
        );
    }

    private configureApi(app: Express) {
        app.use(bodyParser.json())
        app.use(
            bodyParser.urlencoded({extended: true})
        )
    }

    private openAPI(app: Express) {
        app.get('/', (req, res) => {
            res.send('Server OK !');
        });

        app.get('/users', (req, res) => {
            userDao.getUsers().subscribe(
                (users) => res.status(200).json({users: users}),
                (err) => res.status(500).json({message: err.message})
            );
        });
    }

}

import {PoolConfig, Pool, PoolClient} from "pg";
import * as process from "process";
import {from, Observable, pipe, Subject} from "rxjs";
import {switchMap, tap} from "rxjs/operators";

export class Database {

    private pool: Pool;

    public initPool(): Observable<PoolClient> {
        this.pool = new Pool({
            host: 'postgres',
            max: 10,
            connectionString: this.getURL(),
            port: 5432,
            user: 'postgres',
            password: 'das-bdd-password',
            database: 'das-bdd'
        });

        return from(this.pool.connect());
    }

    public getPool(): Pool {
        return this.pool;
    }

    private getURL(): string {
        return 'postgres://postgres:password@localhost:5432/das-bdd';
    }
}

const database = new Database();
export default database;
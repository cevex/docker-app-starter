import {Observable, Subject} from "rxjs";
import database from "./database";
import {UserApi} from "../business/user.model";
import {UserEntity} from "./user.entity";

export class UserDao {

    private SELECT_ALL = 'SELECT * FROM t_user';

    /**
     * Retreive all user in data base
     */
    public getUsers(): Observable<UserApi[]> {
        const subject = new Subject<UserApi[]>();

        database.getPool().query(this.SELECT_ALL)
            .then(res => {
                const users = !res ? [] : res.rows.map(row => this.mapUserToApi(row));
                subject.next(users);
                subject.complete();
            })
            .catch(e => subject.error(e));

        return subject;
    }

    // ####################################################################################
    //                      MAPPER
    // ####################################################################################

    private mapUserToApi(userData: UserEntity): UserApi {
        return {
            id: userData.user_id,
            email: userData.user_email,
            password: userData.user_password,
            name: userData.user_name,
            phone: userData.user_phone,
            image : userData.user_image
        };
    }

    private mapUserToEntity(userApi: UserApi): UserEntity {
        return {
            user_id: userApi.id,
            user_email: userApi.email,
            user_password: userApi.password,
            user_name: userApi.name,
            user_phone: userApi.phone,
            user_image : userApi.image
        };
    }
}

const userDao = new UserDao();
export default userDao;

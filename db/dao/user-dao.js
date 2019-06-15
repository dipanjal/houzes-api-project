let User = require('../../modules/oauth/auth_models').User;
let hashUtlis = require('../../components/utils/hash-utils');
const userAccTypeEnums = require('../../components/enums/user-status-types-enum');

let dao = function(){};
/**
 * USER START
 */

dao.findAllUsers = () => {
    console.log('findAllUsers()');
    return new Promise((resolve, reject) => {
        User.findAll({
            attributes: ['email','phone','first_name','last_name','status']
        }).then(users => {
            resolve(users);
        }).catch( err => {
            console.log("findAllUsers - Err: ", err);
            reject(err)
        });
    });

};

dao.findUserByEmail = email => {
    console.log('findUserByEmail()');
    return new Promise((resolve,reject)=>{
        User.findOne({
            where:{email:email},
        }).then(user => {
            resolve(user)
        }).catch( err => {
            console.log("findUserByEmail - Err: ", err);
            reject(err);
        });
    });
};

dao.findUser = whereContition => {
    console.log('findUserByEmail()');
    return new Promise((resolve,reject)=>{
        User.findOne({
            where:whereContition,
        }).then(user => {
            resolve(user)
        }).catch( err => {
            console.log("findUserByEmail - Err: ", err);
            reject(err);
        });
    });
};

dao.findActivatedUserByEmail = email => {
    console.log('findUserByEmail()');
    return new Promise((resolve,reject)=>{
        User.findOne({
            where:{
                email:email,
                status:userAccTypeEnums.ACTIVATED
            }
        }).then(user => {
            resolve(user)
        }).catch( err => {
            console.log("findUserByEmail - Err: ", err);
            reject(err);
        });
    });
};

dao.findUserByPhone = phone => {
    console.log('findUserByPhone()');
    return new Promise((resolve, reject) => {
        User.findOne({
            where:{phone:phone}
        }).then(user => {
            resolve(user)
            // if (user) resolve(user);
            // else reject('no user found');
        }).catch( err => {
            console.log("findUserByEmail - Err: ", err);
            reject(err);
        });
    });


};

dao.findUserByEmailAndPassword = (email, password) => {
    console.log('findUserByEmail&Pass()');
    return new Promise( (resolve, reject) => {
        User.findOne({
            where:{email:email},
            attributes: ['id', 'email', 'password', 'scope']
        }).then(user => {
            if (hashUtlis.isEqualMD5Hash(password,user.password)){
                resolve(user);
            } else {
                reject('wrong password');
            }
        }).catch( err => {
            console.log("findUserByEmailAndPassword - Err: ", err);
            reject(err);
        });
    });

};

/**
 * User ==> saveOAuthUser()
 */

dao.saveOAuthUser = (UserData) => {
    return new Promise((resolve, reject) => {
        User.create(UserData).then(user => {
            resolve(user);
        }).catch(err => {
            reject(err);
        });
    });
};

dao.saveOrUpdate = (UserData) => {
    return new Promise((resolve, reject) => {
        User.findOne({
            where:{email:UserData.email},
        }).then(user => {
            if(user){
                resolve('update');
            }else{
                resolve('create new');
            }
        }).catch(err => reject(err));
    });
};

dao.activeateUser = (user_id) => {
    console.log('activateUser()');
    return new Promise((resolve, reject) => {
        User.update(
            {status:userAccTypeEnums.ACTIVATED},
            {
                where:
                    {
                        id:user_id,
                        status:userAccTypeEnums.PENDING
                    }
            }
        ).then(([affectedCount,affectedRows]) => {
            // resolve(count);
            resolve({
                count: affectedCount,
                is_updated: affectedCount > 0 ? true:false
            });
            // resolve([affectedCount,affectedRows])
        }).catch( err => reject(err));
    });
};

module.exports = dao;

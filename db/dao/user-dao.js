let User = require('../../modules/oauth/sequlizer_models').User;
let hashUtlis = require('../../components/utils/hash-utils');

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
            // if(users) resolve(users);
            // else reject('no user found');
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

module.exports = dao;

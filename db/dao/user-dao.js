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
            // callback(null, users);
            resolve(users)
        }).catch( err => {
            console.log("findAllUsers - Err: ", err);
            reject(err)
        });
    });

};

dao.findUserByEmail = (email) => {
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

dao.findUserByPhone = (phone, callback) => {
    console.log('findUserByEmail()');
    User.findOne({
        where:{phone:phone},
        // attributes: ['id', 'username', 'password', 'scope']
    }).then(user => {
        callback(null, user);
    }).catch( err => {
        console.log("findUserByEmail - Err: ", err);
        callback(err,null);
    });
};

dao.findUserByEmailAndPassword = (email, password, callback) => {
    console.log('findUserByEmail()');
    User.findOne({
        where:{email:email},
        attributes: ['id', 'email', 'password', 'scope']
    }).then(user => {

        if (hashUtlis.isEqualMD5Hash(password,user.password)){
            callback(null, user)
        } else {
            callback('wrong password', null);
        }
        // user.password === password ? callback(null, user) : callback(null,null);
        // return user.password === password ? user : null;
    }).catch( err => {
        console.log("findUserByEmailAndPassword - Err: ", err);
        callback(err,null);
        // return null;
    });
};

/**
 * User ==> saveOAuthUser()
 */

dao.saveOAuthUser = (UserData, callback) => {
    User.create({
        email: UserData.email,
        password: hashUtlis.generateMD5Hash(UserData.password),
        first_name: UserData.first_name,
        last_name: UserData.last_name,
        scope: UserData.scope,
        phone: UserData.phone
    }).then(user => {
        callback(null,user);
    }).catch(err => {
        callback(err,null);
    });
};

module.exports = dao;

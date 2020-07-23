const dbConn = require('../db/portfolio');
const argon2 = require('argon2');


function errorHandler(err) {
    if (err.response) {
        return err.response;
    } else {
        return err;
    }
}


async function loginUser(userData) {
    return new Promise (async (resolve, reject) => {
        let userInfo = await dbConn.select('*').from('users').where('username', userData.username);
        if (userInfo.length !== 0) {
            if (await argon2.verify(userInfo[0].password, userData.password)) {
                resolve({
                    username: userInfo[0].username,
                    firstName: userInfo[0].firstName,
                    lastName: userInfo[0].lastName
                });
            } else {
                resolve({
                    status: 404,
                    message: 'Username or Password dont match'
                });
            }
        } else {
            resolve({
                status: 404,
                message: 'Username or Password incorrect'
            });
        }
    }).catch(err => {
        console.log('Error from loginUser() --->', err);
        return (errorHandler(err));
    });
}

module.exports = {
    loginUser
}
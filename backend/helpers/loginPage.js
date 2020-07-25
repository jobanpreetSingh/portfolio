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
    return new Promise(async (resolve, reject) => {
        if (!userData.username || !userData.password) {
            resolve({
                status: 400,
                message: 'Both username and Password are required'
            });
        } else {
            let userInfo = await dbConn.select('*').from('users').where('username', userData.username);
            if (userInfo.length !== 0) {
                if (await argon2.verify(userInfo[0].password, userData.password + userInfo[0].salt)) {
                    let userDetails = await dbConn.select('users.username', 'users.role', 'user_details.*').from('user_details').innerJoin('users', 'users.id', 'user_details.userId').where('users.username', userData.username);
                    resolve({
                        username: userDetails[0].username,
                        role: userDetails[0].role,
                        firstName: userDetails[0].firstName,
                        lastName: userDetails[0].lastName,
                        phone: userDetails[0].phone,
                        address: userDetails[0].address,
                        city: userDetails[0].city,
                        state: userDetails[0].state,
                        country: userDetails[0].country,
                        postalCode: userDetails[0].postalCode,
                        alternateEmail: userDetails[0].alternateEmail,
                    });
                } else {
                    resolve({
                        status: 404,
                        message: 'Username or Password incorrect'
                    });
                }
            } else {
                resolve({
                    status: 404,
                    message: 'Username or Password incorrect'
                });
            }
        }
    }).catch(err => {
        console.log('Error from loginUser() --->', err);
        return (errorHandler(err));
    });
}

module.exports = {
    loginUser
}
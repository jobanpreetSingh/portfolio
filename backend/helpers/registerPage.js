const dbConn = require('../db/portfolio');
const argon2 = require('argon2');
var validator = require("email-validator");
var passwordValidator = require('password-validator');
var schema = new passwordValidator();

/**password properties or rejection rules */
schema
    .is().min(6)                                    // Minimum length 6
    .is().max(100)                                  // Maximum length 100
    .has().uppercase()                              // Must have uppercase letters
    .has().lowercase()                              // Must have lowercase letters
    .has().digits()                                 // Must have digits
    .has().not().spaces()                           // Should not have spaces
    .is().not().oneOf(['Passw0rd', 'Password123', 'Password']) // Blacklist these values
    .has().symbols();                               // Should have Special Characters


function errorHandler(err) {
    if (err.response) {
        return err.response;
    } else {
        return err;
    }
}


async function registerUser(userData) {
    return new Promise(async (resolve, reject) => {
        if (!userData.role || (userData.role.toLowerCase() !== 'owner' && userData.role.toLowerCase() !== 'manager' && userData.role.toLowerCase() !== 'employee') || !userData.username || !userData.password || !userData.firstName || !userData.phone || !userData.address || !userData.city || !userData.state || !userData.country || !userData.postalCode || !userData.alternateEmail || (userData.username.toLowerCase() !== userData.verifyUsername.toLowerCase()) || (userData.password !== userData.verifyPassword)) {
            resolve({
                status: 400,
                message: {
                    reason: 'Invalid or missing Details',
                    error: {
                        role: (!userData.role || (userData.role.toLowerCase() !== 'owner' && userData.role.toLowerCase() !== 'manager' && userData.role.toLowerCase() !== 'employee')) ? 'Please Select valid Role for user' : null,
                        username: (!userData.username || (userData.username.toLowerCase() !== userData.verifyUsername.toLowerCase())) ? 'Username not entered or not matching' : null,
                        password: (!userData.password || userData.password !== userData.verifyPassword) ? 'Password not entered or mismatching' : null,
                        firstName: !userData.firstName ? 'Please enter firstName' : null,
                        lastName: !userData.lastName ? 'Please enter lastName' : null,
                        address: !userData.address ? 'Address details required' : null,
                        city: !userData.city ? 'City is required' : null,
                        state: !userData.state ? 'State is required' : null,
                        country: !userData.country ? 'Country is required' : null,
                        postalCode: !userData.postalCode ? 'Postal Code is required' : null,
                        alternateEmail: !userData.alternateEmail ? 'Please Enter Alternate Email' : null
                    }
                }
            });
        } else {
            await dbConn.select('*').from('users').where('username', userData.username)
                .then(async (userExists) => {
                    if (userExists.length > 0) {
                        resolve({
                            status: 403,
                            message: {
                                reason: 'Username Already Exists',
                                error: {
                                    username: 'Username occupied'
                                }
                            }
                        });
                    } else {
                        let salt = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
                        let verifiedSalt = await verifyUniqueSalt(salt);
                        let usernameValidated = validator.validate(userData.username);
                        let passwordValidated = schema.validate(userData.password);
                        let alternateEmailValidated = validator.validate(userData.alternateEmail);
                        if (!usernameValidated || !passwordValidated || !alternateEmailValidated || (userData.alternateEmail.toLowerCase() === userData.username.toLowerCase())) {
                            resolve({
                                status: 403,
                                message: {
                                    reason: 'Username or Password Error',
                                    error: {
                                        username: !usernameValidated ? 'Invalid Email or Username' : null,
                                        password: !passwordValidated ? 'Password Requirements not met' : null,
                                        alternateEmail: (!alternateEmailValidated || (userData.alternateEmail.toLowerCase() === userData.username.toLowerCase())) ? 'Please enter valid email different than username' : null
                                    }
                                }
                            });
                        } else {
                            await dbConn('users').insert([{
                                username: userData.username,
                                password: await argon2.hash(userData.password + verifiedSalt),
                                salt: verifiedSalt,
                                role: userData.role
                            }]).then(async (userId) => {
                                await dbConn('user_details').insert([{
                                    userId: userId,
                                    firstName: userData.firstName,
                                    lastName: !userData.lastName ? null : userData.lastName,
                                    phone: userData.phone,
                                    address: userData.address,
                                    city: userData.city,
                                    state: userData.state,
                                    country: userData.country,
                                    postalCode: userData.postalCode,
                                    alternateEmail: userData.alternateEmail
                                }]).then(() => {
                                    resolve({
                                        status: 200,
                                        message: 'User registered Succesfully'
                                    });
                                }).catch(err => {
                                    console.log('Error logging User_details --->', err);
                                    return (errorHandler(err));
                                })
                            }).catch(err => {
                                console.log('Error logging User to DB --->', err);
                                return (errorHandler(err));
                            });
                        }
                    }
                });
        }
    }).catch(err => {
        console.log('Error from registerUser() --->', err);
        return (errorHandler(err));
    });
}


async function verifyUniqueSalt(salt) {
    return new Promise(async (resolve, reject) => {
        await dbConn.select('id').from('users').where('salt', salt)
            .then(async (saltExists) => {
                if (saltExists.length !== 0) {
                    let newSalt = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
                    await verifyUniqueSalt(newSalt);
                } else {
                    resolve(salt);
                }
            }).catch(err => {
                console.log('Error reading salt from DB -->', err);
            });
    }).catch(err => {
        console.log('Error from verifyUniqueSalt() -->', err);
        return (errorHandler(err));
    });
}


module.exports = {
    registerUser
}
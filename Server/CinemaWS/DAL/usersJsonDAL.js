const jsonfile = require('jsonfile');

const getusersJSON = () => {
    return new Promise((resolve,reject) => {
        jsonfile.readFile("./Data/users.json", (err, usersJson) => {
            if (err) {
                reject(err)
            } else {
                resolve(usersJson);
            }
        })
    })
}

const setusersJSON = (usersJson) => {
    return new Promise((resolve,reject) => {
        jsonfile.writeFile("./Data/users.json", usersJson, (err) => {
            if (err) {
                reject(err)
            } else {
                resolve("Users JSONfile updated successfully!");
            }
        })
    })
}


module.exports = {
    getusersJSON,
    setusersJSON
}
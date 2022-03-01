const jsonfile = require('jsonfile');

const getpermissions = () => {
    return new Promise((resolve,reject) => {
        jsonfile.readFile("./Data/permissions.json", (err, permissions) => {
            if (err) {
                reject(err)
            } else {
                resolve(permissions);
            }
        })
    })
}

const setpermissions = (permissions) => {
    return new Promise((resolve,reject) => {
        jsonfile.writeFile("./Data/permissions.json", permissions, (err) => {
            if (err) {
                reject(err)
            } else {
                resolve("Permissions JSONfile updated successfully!");
            }
        })
    })
}


module.exports = {
    getpermissions,
    setpermissions
}
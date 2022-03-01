const permissionsDAL = require('../DAL/permissionsDAL');

const getAllPermissions = async () => {
    const permissions = await permissionsDAL.getpermissions();
    return [...permissions];
} 

const getPermissionById = async (id) => {
    const permissions = await permissionsDAL.getpermissions();
    const permission = permissions.find((permission) => permission.id === id);
    return {...permission};
} 

const createPermission = async (permissionObj) => {
    const permissions = await permissionsDAL.getpermissions();
    permissions.push({...permissionObj});
    const res = await permissionsDAL.setpermissions([...permissions]);
    return res;   
} 

const updatePermission = async (id, permissionObj) => {
    const permissions = await permissionsDAL.getpermissions();
    const index = permissions.findIndex((user) => user.id === id);
    if(index !== -1){
        permissions[index] = {...permissionObj};
        const res = await permissionsDAL.setpermissions([...permissions]);
        return res;
    }
    else{
        return 'Not found';
    }
} 

const deletePermission = async (id) => {
    const permissions = await permissionsDAL.getpermissions();
    const index = permissions.findIndex((user) => user.id === id);
    if(index !== -1){
        permissions.splice(index,1)
        const res = await permissionsDAL.setpermissions([...permissions]);
        return res;
    }
    else{
        return 'Not found';
    }
} 

module.exports = {
    getAllPermissions,
    getPermissionById,
    createPermission,
    updatePermission,
    deletePermission
}

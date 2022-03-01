const isLogin = (bool) => {
    return{
        type:'IsLogin',
        payload:bool
    }
}

const isManager = (bool) => {
    return{
        type:'IsManager',
        payload:bool
    }
}

const updateUser = (objUser) => {
    return{
        type:'UpdateUser',
        payload:objUser
    }
}

const updateLoginData = (objUser) => {
    return{
        type:'UpdateLoginData',
        payload:objUser
    }
}

const updateMessage = (objUser) => {
    return{
        type:'UpdateMessage',
        payload:objUser
    }
}

const updatePerm = (obj) => {
    return{
        type:'UpdatePerm',
        payload:obj
    }
}

const updateMembers = (arr) => {
    return{
        type:'UpdateMembers',
        payload:arr
    }
}

const EditMovie = (movieObj) => {
    return{
        type:'EditMovie',
        payload:movieObj
    }
}

const EditMember = (memberObj) => {
    return{
        type:'EditMember',
        payload:memberObj
    }
}

const EditArraysObj = (obj) => {
    return{
        type:'UpdateArraysObj',
        payload:obj 
    }
}

export { isLogin, isManager, updateUser, updateLoginData, updateMessage, updateMembers,
         updatePerm, EditMember, EditMovie, EditArraysObj };
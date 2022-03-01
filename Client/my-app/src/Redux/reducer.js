const initialState = {
    islogin:false,
    isManager:false,
    message:'',
    loginData:{},
    user:{},
    movie:{},
    member:{},
    members:[],
    arraysObj:{users:[], usersJson:[], permissions:[]},
    permissions:{View_Subscriptions:false, Create_Subscriptions:false, Delete_Subscriptions:false,
      Update_Subscriptions:false, View_Movies:false, Create_Movies:false, Delete_Movies:false, Update_Movies:false},
};

const applyChanges = (state = initialState, action) => { 
  switch (action.type) {
    case 'IsLogin':
      return  {...state, islogin: action.payload};
    case 'IsManager':
      return  {...state, isManager: action.payload};  
    case 'UpdateUser':
      return  {...state, user: {...action.payload}};
    case 'EditMovie':
      return  {...state, movie: {...action.payload}};   
    case 'EditMember':
      return  {...state, member: {...action.payload}};   
    case 'UpdateMembers':
      return  {...state, members: [...action.payload]};       
    case 'UpdateLoginData':
      return  {...state, loginData: action.payload};       
    case 'UpdateMessage':
      return  {...state, message: action.payload};   
    case 'UpdatePerm':
      return  {...state, permissions: action.payload}; 
    case 'UpdateArraysObj':
      return  {...state, arraysObj: action.payload};         
    default:
      return state;
  }
};

export default applyChanges;

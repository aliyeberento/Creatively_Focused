const teacherReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_TEACHER':
            
            return action.payload;
        case 'UNSET_TEACHER':
            return [];
        default:
            return state;
    }
};


export default teacherReducer;
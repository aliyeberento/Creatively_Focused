const teacherReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_TEACHERS':  
            return action.payload;
        case 'UNSET_TEACHERS':
            return [];
        default:
            return state;
    }
};


export default teacherReducer;
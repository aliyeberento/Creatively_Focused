const schoolReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_SCHOOLS':  
            return action.payload;
        case 'UNSET_SCHOOLS':
            return [];
        default:
            return state;
    }
};

export default schoolReducer;
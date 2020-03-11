const studentReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_STUDENTS':
            return action.payload;
        case 'UNSET_STUDENTS':
            return [];
        default:
            return state;
    }
};

export default studentReducer;
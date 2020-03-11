const studentDetailReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_STUDENT':
            return action.payload;
        case 'UNSET_STUDENT':
            return [];
        default:
            return state;
    }
}

export default studentDetailReducer;
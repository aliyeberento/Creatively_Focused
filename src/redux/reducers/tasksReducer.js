const tasksReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_TASKS':
            return action.payload;
        case 'UNSET_TASKS':
            return [];
        default:
            return state;
    }
};

export default tasksReducer;
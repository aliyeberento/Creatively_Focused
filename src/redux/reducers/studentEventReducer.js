const studentEventReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_STUDENTEVENT':
            return action.payload;
        case 'UNSET_STUDENTEVENT':
            return [];
        default:
            return state;
    }
};


export default studentEventReducer;
const districtReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_DISTRICTS':  
            return action.payload;
        case 'UNSET_DISTRICTSS':
            return [];
        default:
            return state;
    }
};

export default districtReducer;
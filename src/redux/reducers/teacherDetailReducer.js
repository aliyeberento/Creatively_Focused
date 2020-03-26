const teacherDetailReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_TEACHER':
            return action.payload;
        case 'UPDATE_USER':
            console.log(state, action);
            return {
                ...state,
                [action.payload.key]: action.payload.value
            };
        default:
            return state;
    }
}

export default teacherDetailReducer;
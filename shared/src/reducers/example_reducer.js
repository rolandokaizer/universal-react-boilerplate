export default (state = '', action) => {
    switch (action.type) {
        case 'UPDATE_CONTENT':
            return action.payload;
        default:
            return state;
    }
}

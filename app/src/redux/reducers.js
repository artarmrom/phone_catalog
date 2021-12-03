import { MODIFY, DELETE } from "./constants";

function rootReducer(state = [], action) {
    if (action.type === MODIFY) {
        let newState;
        switch (action.payload.phoneList) {
            case 'daySleep':

                return {
                    ...state,
                    phoneList: action.payload.text
                }
            default:
                break;
        }

        newState = { ...state};

        return newState;
    } else if (action.type === DELETE) {
        state = [];
        return state;
    } else
        return state;

}


export default rootReducer;
import { BREAKING_BAD_DATA, BREAKING_BAD_FAVORITES_DATA, BREAKING_BAD_KEY, BREAKING_BAD_REQUEST_LOADING, BREAKING_BAD_REQUEST_STATUS, BREAKING_BAD_RESET, BREAKING_BAD_SEARCH_DATA, BREAKING_BAD_SEARCH_REQUEST_LOADING, BREAKING_BAD_UPDATE, LOG_OUT, MESSAGE, STATUS } from "../Types";

const INIT_STATE = {
    [BREAKING_BAD_KEY]: {
        [BREAKING_BAD_REQUEST_LOADING]: false,
        [BREAKING_BAD_DATA]:undefined,
        [BREAKING_BAD_REQUEST_STATUS]:{
            [STATUS]:undefined,
            [MESSAGE]:undefined
        },
        [BREAKING_BAD_FAVORITES_DATA]:[],

        [BREAKING_BAD_SEARCH_REQUEST_LOADING]:false,
        [BREAKING_BAD_SEARCH_DATA]:[]
        
    }
}

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case BREAKING_BAD_UPDATE:
            return { ...state, [BREAKING_BAD_KEY]: action.payload };
        case BREAKING_BAD_RESET:
        case LOG_OUT:
            return {
                ...state,
                ...{
                    [BREAKING_BAD_KEY]: {
                        [BREAKING_BAD_REQUEST_LOADING]: false,
                        [BREAKING_BAD_DATA]:undefined,
                        [BREAKING_BAD_REQUEST_STATUS]:{
                            [STATUS]:undefined,
                            [MESSAGE]:undefined
                        },
                        [BREAKING_BAD_FAVORITES_DATA]:[],
                        [BREAKING_BAD_SEARCH_REQUEST_LOADING]:false,
        [BREAKING_BAD_SEARCH_DATA]:[]
                        
                    }
                }
            }
        default:
            return state;
    }
};
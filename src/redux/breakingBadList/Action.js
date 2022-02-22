import { GetBreakingBadCharactersApi, GetBreakingBadSearchCharactersApi } from "../../apis/APIs";
import Utils from "../../common/util/Utils";
import { BREAKING_BAD_DATA, BREAKING_BAD_KEY, BREAKING_BAD_REQUEST_LOADING, BREAKING_BAD_REQUEST_STATUS, BREAKING_BAD_RESET, BREAKING_BAD_ROOT, BREAKING_BAD_UPDATE, EMPTY, ERROR, MESSAGE, STATUS, BREAKING_BAD_SEARCH_DATA, BREAKING_BAD_SEARCH_REQUEST_LOADING } from "../Types";

/** Manage Breaking Bad UI Constraints */
export const updateBreakingBadUIConstraints = (obj) => {
    return (dispatch, getState) => {
        try {
            const formData = getState()[BREAKING_BAD_ROOT][BREAKING_BAD_KEY];
            const data = Object.assign(formData, obj);

            dispatch(updateBreakingBadState(data));
        } catch (error) {
            Utils.log("Update Breaking Bad UI Constraints ===> error ", error);
        }
    }
}

/** Update Breaking Bad data state */
const updateBreakingBadState = (obj) => {
    return (dispatch, getState) => {
        try {
            const formData = getState()[BREAKING_BAD_ROOT][BREAKING_BAD_KEY];

            dispatch({
                type: BREAKING_BAD_UPDATE,
                payload: Object.assign(formData, obj)
            })
        } catch (error) {
            Utils.log("Update Breaking Bad State ===> error ", error);
        }
    }
}

/** Reset Breaking Bad data state */
export const resetBreakingBadState = () => {
    return (dispatch) => {
        try {
            dispatch({
                type: BREAKING_BAD_RESET,
                payload: {}
            })
        } catch (error) {
            Utils.log("Reset Breaking Bad State ===> error ", error);
        }
    }
}


export const getBreakingBadCharacters = () => {
    return async (dispatch, getState) => {
        try {

            dispatch(updateBreakingBadUIConstraints({
                [BREAKING_BAD_REQUEST_STATUS]: {
                    [STATUS]: EMPTY,
                    [MESSAGE]: ""
                },
                [BREAKING_BAD_REQUEST_LOADING]: true,
            }));

            const body = {
                token: '',
            }
            Utils.log('breaking bad data body ===', body)
            try {
                const res = await GetBreakingBadCharactersApi(body);
                Utils.log('breaking bad data response ===', res)
                if (res.status === 'error') {
                    dispatch(updateBreakingBadUIConstraints({
                        [BREAKING_BAD_REQUEST_LOADING]: true,
                    }))
                }
                if (res && res.length) {
                    dispatch(updateBreakingBadUIConstraints({
                        [BREAKING_BAD_REQUEST_LOADING]: false,
                        [BREAKING_BAD_DATA]: res
                    }))

                } else {
                    dispatch(updateBreakingBadUIConstraints({
                        [BREAKING_BAD_REQUEST_STATUS]: {
                            [STATUS]: ERROR,
                            [MESSAGE]: res.message
                        },
                        [BREAKING_BAD_REQUEST_LOADING]: false,
                    }))
                }
            } catch (error) {
                const message = error && error.message ? error.message : "Please try again";
                Utils.log("get breaking bad data ===> error", error);
                dispatch(updateBreakingBadUIConstraints({
                    [BREAKING_BAD_REQUEST_STATUS]: {
                        [STATUS]: ERROR,
                        [MESSAGE]:message
                    },
                    [BREAKING_BAD_REQUEST_LOADING]: false,
                }))
            }
        } catch (error) {
            Utils.log("get breaking bad data ===> error ", error);
            const message = error && error.message ? error.message : "Please try again";
            dispatch(updateBreakingBadUIConstraints({
                [BREAKING_BAD_REQUEST_STATUS]: {
                    [STATUS]: ERROR,
                    [MESSAGE]: message
                },
                [BREAKING_BAD_REQUEST_LOADING]: false,
            }))
        }
    }
}


export const getBreakingBadSearchCharacters = (txt) => {
    return async (dispatch, getState) => {
        try {

            dispatch(updateBreakingBadUIConstraints({
                [BREAKING_BAD_REQUEST_STATUS]: {
                    [STATUS]: EMPTY,
                    [MESSAGE]: ""
                },
                [BREAKING_BAD_SEARCH_REQUEST_LOADING]: true,
            }));

            const body = {
                searchTxt: txt,
            }
            Utils.log('breaking bad search data body ===', body)
            try {
                const res = await GetBreakingBadSearchCharactersApi(body);
                Utils.log('breaking bad search data response ===', res)
                if (res.status === 'error') {
                    dispatch(updateBreakingBadUIConstraints({
                        [BREAKING_BAD_SEARCH_REQUEST_LOADING]: true,
                    }))
                }
                if (res && res.length) {
                    dispatch(updateBreakingBadUIConstraints({
                        [BREAKING_BAD_SEARCH_REQUEST_LOADING]: false,
                        [BREAKING_BAD_SEARCH_DATA]: res
                    }))

                } else {
                    dispatch(updateBreakingBadUIConstraints({
                        [BREAKING_BAD_REQUEST_STATUS]: {
                            [STATUS]: ERROR,
                            [MESSAGE]: res.message
                        },
                        [BREAKING_BAD_SEARCH_REQUEST_LOADING]: false,
                    }))
                }
            } catch (error) {
                const message = error && error.message ? error.message : "Please try again";
                Utils.log("get breaking bad search data ===> error", error);
                dispatch(updateBreakingBadUIConstraints({
                    [BREAKING_BAD_REQUEST_STATUS]: {
                        [STATUS]: ERROR,
                        [MESSAGE]:message
                    },
                    [BREAKING_BAD_SEARCH_REQUEST_LOADING]: false,
                }))
            }
        } catch (error) {
            Utils.log("get breaking bad search data ===> error ", error);
            const message = error && error.message ? error.message : "Please try again";
            dispatch(updateBreakingBadUIConstraints({
                [BREAKING_BAD_REQUEST_STATUS]: {
                    [STATUS]: ERROR,
                    [MESSAGE]: message
                },
                [BREAKING_BAD_SEARCH_REQUEST_LOADING]: false,
            }))
        }
    }
}
import { combineReducers } from 'redux';

function safelyParseJSON(json) {
    let parsed
    try {
        parsed = JSON.parse(json)
    } catch (e) {
    }
    return parsed
}

const persistedTacticiansState = localStorage.getItem('tacticians')
    ? safelyParseJSON(localStorage.getItem('tacticians'))
    : undefined

const persistedArenasState = localStorage.getItem('arenas')
    ? safelyParseJSON(localStorage.getItem('arenas'))
    : undefined

const persistedBoomsState = localStorage.getItem('booms')
    ? safelyParseJSON(localStorage.getItem('booms'))
    : undefined

const modalsReducer = (state = false, action) => {
    switch (action.type) {
        case 'SHOW_MODAL':
            return true;
        case 'HIDE_MODAL':
            return false;
        default:
            return state;
    };
};

const searchReducer = (state = { searchTerm: '' }, action) => {
    switch (action.type) {
        case 'SEARCH_TERM':
            return { ...state, searchTerm: action.payload };
        default:
            return state;
    };
};

const companionsReducer = (state = [], action) => {
    switch (action.type) {
        case 'FETCH_COMPANIONS':
            return action.payload.map((o1) => {
                if (persistedTacticiansState && persistedTacticiansState.find(o2 => o2.id === o1.id)) {
                    const o2 = persistedTacticiansState.find(o2 => o2.id === o1.id)
                    return { ...o1, currentLevel: o2.currentLevel, selected: o2.selected }
                }
                return o1
            })
        case 'UPDATE_LEVEL':
            return state.map(object => {
                if (object.id === action.payload.id) {
                    return { ...object, currentLevel: action.payload.currentLevel }
                }
                return object
            })
        case 'TOGGLE_SELECTED':
            return state.map(object => {
                if (object.id === action.payload.id) {
                    return { ...object, selected: !action.payload.selected }
                }
                return object
            })
        case 'SELECT_ALL_TACTICIANS':
            return state.map(object => {
                return { ...object, selected: true }
            })
        case 'DESELECT_ALL_TACTICIANS':
            return state.map(object => {
                return { ...object, selected: false }
            })
        case 'RESET_TACTICIANS':
            return state.map(object => {
                return { ...object, selected: true, currentLevel: 1 }
            })
        default:
            return state;
    };
};

const arenasReducer = (state = [], action) => {
    switch (action.type) {
        case 'FETCH_ARENAS':
            return action.payload.map((o1) => {
                if (persistedArenasState && persistedArenasState.find(o2 => o2.id === o1.id)) {
                    const o2 = persistedArenasState.find(o2 => o2.id === o1.id)
                    return { ...o1, selected: o2.selected }
                }
                return o1
            })
        case 'TOGGLE_SELECTED':
            return state.map(object => {
                if (object.id === action.payload.id) {
                    return { ...object, selected: !action.payload.selected }
                }
                return object
            })
        case 'SELECT_ALL_ARENAS':
            return state.map(object => {
                return { ...object, selected: true }
            })
        case 'DESELECT_ALL_ARENAS':
            return state.map(object => {
                return { ...object, selected: false }
            })
        case 'RESET_ARENAS':
            return state.map(object => {
                return { ...object, selected: true }
            })
        default:
            return state;
    };
};

const boomsReducer = (state = [], action) => {
    switch (action.type) {
        case 'FETCH_BOOMS':
            return action.payload.map((o1) => {
                if (persistedBoomsState && persistedBoomsState.find(o2 => o2.id === o1.id)) {
                    const o2 = persistedBoomsState.find(o2 => o2.id === o1.id)
                    return { ...o1, currentLevel: o2.currentLevel, selected: o2.selected }
                }
                return o1
            })
        case 'UPDATE_LEVEL':
            return state.map(object => {
                if (object.id === action.payload.id) {
                    return { ...object, currentLevel: action.payload.currentLevel }
                }
                return object
            })
        case 'TOGGLE_SELECTED':
            return state.map(object => {
                if (object.id === action.payload.id) {
                    return { ...object, selected: !action.payload.selected }
                }
                return object
            })
        case 'SELECT_ALL_BOOMS':
            return state.map(object => {
                return { ...object, selected: true }
            })
        case 'DESELECT_ALL_BOOMS':
            return state.map(object => {
                return { ...object, selected: false }
            })
        case 'RESET_BOOMS':
            return state.map(object => {
                return { ...object, selected: true, currentLevel: 1 }
            })
        default:
            return state;
    };
};

const randomReducer = (state =
    { tactician: {}, arena: {}, boom: {} }, action) => {
    switch (action.type) {
        case 'RANDOM_TACTICIAN':
            return { ...state, tactician: action.payload }
        case 'RANDOM_ARENA':
            return { ...state, arena: action.payload }
        case 'RANDOM_BOOM':
            return { ...state, boom: action.payload }
        default:
            return state;
    };
};

const tabReducer = (state = 'tacticians', action) => {
    switch (action.type) {
        case 'ACTIVE_TAB':
            return action.payload
        default:
            return state;
    };
};

const previewReducer = (state = null, action) => {
    switch (action.type) {
        case 'ON_HOVER':
            return action.payload
        case 'LEVEL_CHANGE':
            return { ...state, image: action.payload.image }
        default:
            return state;
    };
};

export default combineReducers({
    randomResults: randomReducer,
    modals: modalsReducer,
    search: searchReducer,
    tab: tabReducer,
    preview: previewReducer,
    companions: companionsReducer,
    arenas: arenasReducer,
    booms: boomsReducer
});
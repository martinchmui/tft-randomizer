import companions from '../apis/companions';
import tftmapskins from '../apis/tftmapskins';
import tftdamageskins from '../apis/tftdamageskins';

export const showModal = () => {
    return {
        type: 'SHOW_MODAL'
    };
};

export const hideModal = () => {
    return {
        type: 'HIDE_MODAL'
    };
};

export const activeTab = (tabName) => {
    return {
        type: 'ACTIVE_TAB',
        payload: tabName
    }
};

export const searchTerm = (term) => {
    return {
        type: 'SEARCH_TERM',
        payload: term
    };
};

export const fetchCompanions = () => async (dispatch) => {
    const response = await companions.get();
    const data = response.data.sort((a, b) => {
        if (a.itemId < b.itemId) { return -1; }
        if (a.itemId > b.itemId) { return 1; }
        return 0
    })
        .sort((a, b) => {
            if (a.rarityValue < b.rarityValue) { return -1; }
            if (a.rarityValue > b.rarityValue) { return 1; }
            return 0
        })
        .reduce((a, { itemId, name, speciesName, level, loadoutsIcon, contentId }) => {
            const foundTactician = a.find(({ tacticianName }) => tacticianName === name);
            if (foundTactician) foundTactician.levels.push({ itemId, level, loadoutsIcon });
            else a.push({ tacticianName: name, species: speciesName, id: contentId, currentLevel: 1, selected: true, levels: [{ itemId, level, loadoutsIcon }] });
            return a;
        }, [])
        .sort((a, b) => {
            return (b.species === 'River Sprite') - (a.species === 'River Sprite') || a.species.localeCompare(b.species);
        })
    dispatch({ type: 'FETCH_COMPANIONS', payload: data });
};

export const fetchArenas = () => async (dispatch) => {
    const response = await tftmapskins.get();
    const data = response.data.sort((a, b) => {
        if (a.itemId < b.itemId) { return -1; }
        if (a.itemId > b.itemId) { return 1; }
        return 0
    })
        .map(object => {
            return {id: object.contentId, itemId: object.itemId, name: object.name, loadoutsIcon: object.loadoutsIcon, groupName: object.groupName, selected: true}
        })
        .sort((a, b) => {
            return (b.groupName === 'Base') - (a.groupName === 'Base') || a.groupName.localeCompare(b.groupName);
        })

    dispatch({ type: 'FETCH_ARENAS', payload: data });
};

export const fetchBooms = () => async (dispatch) => {
    const response = await tftdamageskins.get();
    const data = response.data.sort((a, b) => {
        if (a.itemId < b.itemId) { return -1; }
        if (a.itemId > b.itemId) { return 1; }
        return 0
    })
        .reduce((a, { itemId, name, level, loadoutsIcon, contentId }) => {
            const foundBoom = a.find(({ boomName }) => boomName === name);
            if (foundBoom) foundBoom.levels.push({ itemId, level, loadoutsIcon });
            else a.push({ boomName: name, id: contentId, currentLevel: 1, selected: true, levels: [{ itemId, level, loadoutsIcon }] });
            return a;
        }, [])
    dispatch({ type: 'FETCH_BOOMS', payload: data });
};

export const updateLevel = (object) => {
    return {
        type: 'UPDATE_LEVEL',
        payload: object
    };
};

export const toggleSelected = (object) => {
    return {
        type: 'TOGGLE_SELECTED',
        payload: object
    };
};

export const randomTactician = (tactician) => {
    return {
        type: 'RANDOM_TACTICIAN',
        payload: tactician
    };
};

export const randomArena = (arena) => {
    return {
        type: 'RANDOM_ARENA',
        payload: arena
    };
};

export const randomBoom = (boom) => {
    return {
        type: 'RANDOM_BOOM',
        payload: boom
    };
};

export const onHover = (img) => {
    return {
        type: 'ON_HOVER',
        payload: img
    };
};

export const levelChange = (image) => {
    return {
        type: 'LEVEL_CHANGE',
        payload: image
    };
};

export const selectAllTacticians = () => {
    return {
        type: 'SELECT_ALL_TACTICIANS'
    };
};

export const deselectAllTacticians = () => {
    return {
        type: 'DESELECT_ALL_TACTICIANS'
    };
};

export const resetTacticians = () => {
    return {
        type: 'RESET_TACTICIANS'
    };
};

export const selectAllArenas = () => {
    return {
        type: 'SELECT_ALL_ARENAS'
    };
};

export const deselectAllArenas = () => {
    return {
        type: 'DESELECT_ALL_ARENAS'
    };
};

export const resetArenas = () => {
    return {
        type: 'RESET_ARENAS'
    };
};

export const selectAllBooms = () => {
    return {
        type: 'SELECT_ALL_BOOMS'
    };
};

export const deselectAllBooms = () => {
    return {
        type: 'DESELECT_ALL_BOOMS'
    };
};

export const resetBooms = () => {
    return {
        type: 'RESET_BOOMS'
    };
};
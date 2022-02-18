import axios from 'axios';

export default axios.create({
    baseURL: 'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/tftdamageskins.json'
});
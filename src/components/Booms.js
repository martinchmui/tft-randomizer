import React from 'react';
import '../styles/TacticiansCSS.css';
import { connect } from 'react-redux';
import { updateLevel, toggleSelected, onHover, levelChange } from '../actions';
import { saveBoomsState } from '../index.js';
import { Rating } from '@mui/material';

const Booms = (props) => {
    const filteredBooms = props.booms.filter(object => object.boomName.toLowerCase().includes(props.searchTerm))

    if (filteredBooms.length === 0) {
        return (
            <div>
                No results found
            </div>
        )
    };
    return (
        <div id="overflow">
            <h3>Booms</h3>
            {filteredBooms.map((boom, key) => {
                if (filteredBooms.length === 0) {
                    return null
                }
                return (
                    <div
                        key={key}
                        className='imageContainer'
                        onMouseEnter={() => props.onHover({
                            name: boom.boomName,
                            image: `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default${boom.levels[boom.currentLevel - 1].loadoutsIcon.toLowerCase().slice(21)}`
                        })}
                        onMouseLeave={() => props.onHover(null)}
                    >
                        <img
                            className={`thumbnail ${!boom.selected ? 'unselected' : null}`}
                            src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default${boom.levels[boom.currentLevel - 1].loadoutsIcon.toLowerCase().slice(21)}`}
                            alt={boom.boomName}
                            title={boom.boomName}
                            onClick={e => {
                                props.toggleSelected({ id: boom.id, selected: boom.selected })
                                saveBoomsState()
                            }}
                        />
                        <Rating
                            value={parseInt(boom.currentLevel)}
                            max={boom.levels.length}
                            key={key}
                            onChange={async e => {
                                props.updateLevel({ ...boom, currentLevel: e.target.value })
                                props.levelChange({ image: `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default${boom.levels[e.target.value - 1].loadoutsIcon.toLowerCase().slice(21)}` })
                                saveBoomsState()
                            }}
                            className={`rating-${boom.levels.length}`}
                            size='small'
                        />
                    </div>
                )

            })}
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        searchTerm: state.search.searchTerm,
        booms: state.booms,
        preview: state.preview
    };
};

export default connect(mapStateToProps, { updateLevel, toggleSelected, onHover, levelChange })(Booms);
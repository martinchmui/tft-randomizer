import React from 'react';
import '../styles/TacticiansCSS.css';
import { connect } from 'react-redux';
import { updateLevel, toggleSelected, onHover, levelChange } from '../actions';
import { saveTacticiansState } from '../index.js';
import { Rating } from '@mui/material';

const Tacticians = (props) => {
    const filteredCompanions = props.companions.filter(object => object.tacticianName.toLowerCase().includes(props.searchTerm))
        .reduce((a, { tacticianName, species, id, currentLevel, levels, selected }) => {
            const foundSpecies = a.find(({ speciesName }) => speciesName === species);
            if (foundSpecies) foundSpecies.companions.push({ tacticianName, id, currentLevel, levels, selected });
            else a.push({ speciesName: species, companions: [{ tacticianName, id, currentLevel, levels, selected }] });
            return a;
        }, [])

    if (filteredCompanions.length === 0) {
        return (
            <div>
                No results found
            </div>
        )
    };
    return (
        <div id="overflow">
            {filteredCompanions.map((data, key) => {
                if (data.companions.length === 0) {
                    return null
                }
                return (
                    <div key={key}>
                        <h3>{data.speciesName}</h3>
                        {data.companions.map((tactician, key) => {
                            return (
                                <div
                                    key={key}
                                    className='imageContainer'
                                    onMouseEnter={() => props.onHover({
                                        name: tactician.tacticianName,
                                        image: `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default${tactician.levels[tactician.currentLevel - 1].loadoutsIcon.toLowerCase().slice(21)}`
                                    })}
                                    onMouseLeave={() => props.onHover(null)}
                                >
                                    <img
                                        className={`thumbnail ${!tactician.selected ? 'unselected' : null}`}
                                        src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default${tactician.levels[tactician.currentLevel - 1].loadoutsIcon.toLowerCase().slice(21)}`}
                                        alt={tactician.tacticianName}
                                        title={tactician.tacticianName}
                                        onClick={e => {
                                            props.toggleSelected({ id: tactician.id, selected: tactician.selected })
                                            saveTacticiansState()
                                        }}
                                        loading='lazy'
                                    />
                                    <Rating
                                        value={parseInt(tactician.currentLevel)}
                                        max={tactician.levels.length}
                                        key={key}
                                        onChange={async e => {
                                            props.updateLevel({ ...tactician, currentLevel: e.target.value })
                                            props.levelChange({ image: `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default${tactician.levels[e.target.value - 1].loadoutsIcon.toLowerCase().slice(21)}`})
                                            saveTacticiansState()
                                        }}
                                        className={`rating-${tactician.levels.length}`}
                                        size='small'
                                    />
                                </div>
                            )
                        })}
                    </div>
                )
            })}
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        searchTerm: state.search.searchTerm,
        companions: state.companions,
        preview: state.preview
    };
};

export default connect(mapStateToProps, { updateLevel, toggleSelected, onHover, levelChange })(Tacticians);
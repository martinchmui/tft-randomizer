import React from 'react';
import '../styles/TacticiansCSS.css';
import { connect } from 'react-redux';
import { toggleSelected, onHover } from '../actions';
import { saveArenasState } from '../index.js';

const Arenas = (props) => {
    const filteredArenas = props.arenas.filter(object => object.name.toLowerCase().includes(props.searchTerm))
        .reduce((a, { name, groupName, id, selected, loadoutsIcon }) => {
            const foundGroup = a.find(({ group }) => group === groupName);
            if (foundGroup) foundGroup.arenas.push({ name, id, selected, loadoutsIcon });
            else a.push({ group: groupName, arenas: [{ name, id, selected, loadoutsIcon }] });
            return a;
        }, [])

    if (filteredArenas.length === 0) {
        return (
            <div>
                No results found
            </div>
        )
    };
    return (
        <div id="overflow">
            {filteredArenas.map((data, key) => {
                if (data.arenas.length === 0) {
                    return null
                }
                return (
                    <div key={key}>
                        <h3>{data.group}</h3>
                        {data.arenas.map((arena, key) => {
                            return (
                                <div
                                    key={key}
                                    className='imageContainer'
                                    onMouseEnter={() => props.onHover({
                                        name: arena.name,
                                        image: `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default${arena.loadoutsIcon.toLowerCase().slice(21)}`
                                    })}
                                    onMouseLeave={() => props.onHover(null)}
                                >
                                    <img
                                        className={`thumbnail ${!arena.selected ? 'unselected' : null}`}
                                        src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default${arena.loadoutsIcon.toLowerCase().slice(21)}`}
                                        alt={arena.name}
                                        title={arena.name}
                                        onClick={e => {
                                            props.toggleSelected({ id: arena.id, selected: arena.selected })
                                            saveArenasState()
                                        }}
                                        loading='lazy'
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
        arenas: state.arenas,
        preview: state.preview
    };
};

export default connect(mapStateToProps, { toggleSelected, onHover })(Arenas);
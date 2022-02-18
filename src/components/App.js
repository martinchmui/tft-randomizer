import React from 'react';
import Settings from './Settings';
import { connect } from 'react-redux';
import { showModal, hideModal, fetchCompanions, randomTactician, activeTab, fetchArenas, randomArena, fetchBooms, randomBoom } from '../actions';
import { Container, Row, Col, Carousel } from 'react-bootstrap';
import '../styles/App.css'
import { BiShuffle } from 'react-icons/bi';
import { GiRollingDices } from 'react-icons/gi';

class App extends React.Component {
    async componentDidMount() {
        await this.props.fetchCompanions();
        await this.props.fetchArenas();
        await this.props.fetchBooms();
        this.randomCompanion()
        this.randomStage()
        this.randomAttack()
    };

    randomFunction = (array) => {
        const random = Math.floor(Math.random() * array.length);
        return array[random]
    }

    randomCompanion = () => {
        const result = this.randomFunction(this.props.companions.filter(object => object.selected === true))

        if (!result) {
            this.props.randomTactician({
                name: 'River Sprite',
                image: 'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/loadouts/companions/tooltip_tft_avatar_blue.png'
            })
            alert("Please select at least 1 Tactician");
        } else {
            this.props.randomTactician({
                name: result.tacticianName,
                image: `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default${result.levels[result.currentLevel - 1].loadoutsIcon.toLowerCase().slice(21)}`
            })
        }
    }

    randomStage = () => {
        const result = this.randomFunction(this.props.arenas.filter(object => object.selected === true))

        if (!result) {
            this.props.randomArena({
                name: 'Default Arena',
                image: 'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/loadouts/tftmapskins/square_battlefield_lg_base.png'
            })
            alert("Please select at least 1 Arena");
        } else {
            this.props.randomArena({
                name: result.name,
                image: `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default${result.loadoutsIcon.toLowerCase().slice(21)}`
            })
        }
    }

    randomAttack = () => {
        const result = this.randomFunction(this.props.booms.filter(object => object.selected === true))

        if (!result) {
            this.props.randomBoom({
                name: 'Default Boom',
                image: 'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/loadouts/tftdamageskins/lcu/boom_default_large.png'
            })
            alert("Please select at least 1 Boom");
        } else {
            this.props.randomBoom({
                name: result.boomName,
                image: `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default${result.levels[result.currentLevel - 1].loadoutsIcon.toLowerCase().slice(21)}`
            })
        }
    }

    render() {
        return (
            <div>
                <Container fluid>
                    <Row className='displayRow' id='desktop'>
                        <Col className='displayCol'>
                            <img
                                src={this.props.randomResults.tactician.image}
                                alt={this.props.randomResults.tactician.name}
                                onClick={() => {
                                    this.props.showModal()
                                    this.props.activeTab('tacticians')
                                }}
                                className='display'
                            />
                            <h3 className='displayName'>{this.props.randomResults.tactician.name}</h3>
                        </Col>
                        <Col className='displayCenterCol'>
                            <img
                                src={this.props.randomResults.arena.image}
                                alt={this.props.randomResults.arena.name}
                                onClick={() => {
                                    this.props.showModal()
                                    this.props.activeTab('arenas')
                                }}
                                className='display'
                            />
                            <h3 className='displayName'>{this.props.randomResults.arena.name}</h3>
                        </Col>
                        <Col className='displayCol'>
                            <img
                                src={this.props.randomResults.boom.image}
                                alt={this.props.randomResults.boom.name}
                                onClick={() => {
                                    this.props.showModal()
                                    this.props.activeTab('booms')
                                }}
                                className='display'
                            />
                            <h3 className='displayName'>{this.props.randomResults.boom.name}</h3>
                        </Col>
                    </Row>
                    <Row className='displayRow' id='mobile'>
                        <Carousel className='carousel' touch='true' interval={null}>
                            <Carousel.Item>
                                <img
                                    src={this.props.randomResults.tactician.image}
                                    alt={this.props.randomResults.tactician.name}
                                    onClick={() => {
                                        this.props.showModal()
                                        this.props.activeTab('tacticians')
                                    }}
                                    className='display d-block w-100'
                                />
                                <Carousel.Caption>
                                    <h3 className='displayName'>{this.props.randomResults.tactician.name}</h3>
                                </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                    src={this.props.randomResults.arena.image}
                                    alt={this.props.randomResults.arena.name}
                                    onClick={() => {
                                        this.props.showModal()
                                        this.props.activeTab('arenas')
                                    }}
                                    className='display d-block w-100'
                                />
                                <Carousel.Caption>
                                    <h3 className='displayName'>{this.props.randomResults.arena.name}</h3>
                                </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                    src={this.props.randomResults.boom.image}
                                    alt={this.props.randomResults.boom.name}
                                    onClick={() => {
                                        this.props.showModal()
                                        this.props.activeTab('booms')
                                    }}
                                    className='display d-block w-100'
                                />
                                <Carousel.Caption>
                                    <h3 className='displayName'>{this.props.randomResults.boom.name}</h3>
                                </Carousel.Caption>
                            </Carousel.Item>
                        </Carousel>
                    </Row>
                    <Row id='buttonRow'>
                        <Col className='buttonCol'>
                            <h1 className='appName'><GiRollingDices />TFT Randomizer</h1>
                            <button id='buttonRandom' onClick={() => { this.randomCompanion(); this.randomStage(); this.randomAttack() }}><BiShuffle /></button>
                        </Col>
                    </Row>
                    <Settings />
                </Container>
            </div>
        );
    };
};

const mapStateToProps = (state) => {
    return {
        viewModal: state.viewModal,
        companions: state.companions,
        randomResults: state.randomResults,
        arenas: state.arenas,
        booms: state.booms
    };
};

export default connect(mapStateToProps, { showModal, hideModal, fetchCompanions, randomTactician, activeTab, fetchArenas, randomArena, fetchBooms, randomBoom })(App);
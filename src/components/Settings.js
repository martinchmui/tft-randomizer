import React from 'react';
import { connect } from 'react-redux';
import { showModal, hideModal, selectAllTacticians, deselectAllTacticians, resetTacticians, selectAllArenas, deselectAllArenas, resetArenas, selectAllBooms, deselectAllBooms, resetBooms, searchTerm } from '../actions';
import Tacticians from './Tacticians';
import Arenas from './Arenas';
import Booms from './Booms';
import { Modal, Tab, Row, Col, Nav } from 'react-bootstrap';
import SearchBar from './SearchBar';
import '../styles/Settings.css';
import { saveTacticiansState, saveArenasState, saveBoomsState, clearTacticiansState, clearArenasState, clearBoomsState } from '../index.js';

const Settings = (props) => {
    return (
        <div>
            <Modal show={props.viewModal} onHide={() => { props.hideModal(); props.searchTerm('') }} animation={false} size="xl">
                <Modal.Body>
                    <Tab.Container id="left-tabs-example" defaultActiveKey={props.activeTab}>
                        <Row>
                            <Col id="tabs" lg={2} xl={1}>
                                <Nav fill variant="pills" className="flex-column" id="tabsDirection">
                                    <Nav.Item>
                                        <Nav.Link eventKey="tacticians" onClick={() => props.searchTerm('')}>Tacticians</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="arenas" onClick={() => props.searchTerm('')}>Arena Skins</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="booms" onClick={() => props.searchTerm('')}>Booms</Nav.Link>
                                    </Nav.Item>
                                </Nav>
                            </Col>
                            <Col id="settings" lg={10} xl={8}>
                                <Tab.Content>
                                    <Tab.Pane eventKey="tacticians">
                                        <Row id="searchBarRow">
                                            <Col className="contentColumn">
                                                <SearchBar
                                                    selectAll={() => { props.selectAllTacticians(); saveTacticiansState() }}
                                                    deselectAll={() => { props.deselectAllTacticians(); saveTacticiansState() }}
                                                    reset={() => { props.resetTacticians(); clearTacticiansState() }}
                                                />
                                            </Col>
                                        </Row>
                                        <Row id="contentRow">
                                            <Col className="contentColumn">
                                                <Tacticians />
                                            </Col>
                                        </Row>
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="arenas">
                                        <Row id="searchBarRow">
                                            <Col className="contentColumn">
                                                <SearchBar
                                                    selectAll={() => { props.selectAllArenas(); saveArenasState() }}
                                                    deselectAll={() => { props.deselectAllArenas(); saveArenasState() }}
                                                    reset={() => { props.resetArenas(); clearArenasState() }}
                                                />
                                            </Col>
                                        </Row>
                                        <Row id="contentRow">
                                            <Col className="contentColumn">
                                                <Arenas />
                                            </Col>
                                        </Row>
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="booms">
                                        <Row id="searchBarRow">
                                            <Col className="contentColumn">
                                                <SearchBar
                                                    selectAll={() => { props.selectAllBooms(); saveBoomsState() }}
                                                    deselectAll={() => { props.deselectAllBooms(); saveBoomsState() }}
                                                    reset={() => { props.resetBooms(); clearBoomsState() }}
                                                />
                                            </Col>
                                        </Row>
                                        <Row id="contentRow">
                                            <Col className="contentColumn">
                                                <Booms />
                                            </Col>
                                        </Row>
                                    </Tab.Pane>
                                </Tab.Content>
                            </Col>
                            <Col id="preview" xl={3}>
                                <button type="button" className="btn-close" aria-label="Close" onClick={() => { props.hideModal(); props.searchTerm('') }}></button>
                                <Tab.Content>
                                    <Tab.Pane eventKey="tacticians">
                                        <div
                                            className='blur'
                                            style={{ backgroundImage: `url(${!props.preview ? props.randomResults.tactician.image : props.preview.image})` }}
                                        >
                                        </div>
                                        <h3 id="previewName">{!props.preview ? props.randomResults.tactician.name : props.preview.name}</h3>
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="arenas">
                                        <div
                                            className='blur'
                                            style={{ backgroundImage: `url(${!props.preview ? props.randomResults.arena.image : props.preview.image})` }}
                                        >
                                        </div>
                                        <h3 id="previewName">{!props.preview ? props.randomResults.arena.name : props.preview.name}</h3>
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="booms">
                                        <div
                                            className='blur'
                                            style={{ backgroundImage: `url(${!props.preview ? props.randomResults.boom.image : props.preview.image})` }}
                                        >
                                        </div>
                                        <h3 id="previewName">{!props.preview ? props.randomResults.boom.name : props.preview.name}</h3>
                                    </Tab.Pane>
                                </Tab.Content>
                            </Col>
                        </Row>
                    </Tab.Container>
                </Modal.Body>
            </Modal>
        </div >
    );
};

const mapStateToProps = (state) => {
    return {
        viewModal: state.modals,
        activeTab: state.tab,
        randomResults: state.randomResults,
        preview: state.preview
    };
};

export default connect(mapStateToProps, { showModal, hideModal, selectAllTacticians, deselectAllTacticians, resetTacticians, selectAllArenas, deselectAllArenas, resetArenas, selectAllBooms, deselectAllBooms, resetBooms, searchTerm })(Settings);
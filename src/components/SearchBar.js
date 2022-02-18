import React from 'react';
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import { BiSearch } from 'react-icons/bi';
import '../styles/SearchBar.css'
import { connect } from 'react-redux';
import _ from 'lodash';
import { searchTerm, hideModal } from '../actions';

const SearchBar = (props) => {
    const onChange = _.debounce((e) => props.searchTerm(e.target.value), 250);

    return (
        <div className='searchContainer'>
            <InputGroup className="mb-3">
                <InputGroup.Text className="icon"><BiSearch /></InputGroup.Text>
                <FormControl
                    placeholder="Search"
                    onChange={onChange}
                />
            </InputGroup>
            <Button variant="primary" size="sm" className='searchButton' onClick={() => props.selectAll()}>Select All</Button>
            <Button variant="primary" size="sm" className='searchButton' onClick={() => props.deselectAll()}>Deselect All</Button>
            <Button variant="danger" size="sm" className='searchButton' onClick={() => { if (window.confirm('Are you sure?')) props.reset() }}>Reset</Button>
            <button type="button" className="btn-close" id='responsiveCloseButton' aria-label="Close" onClick={() => { props.hideModal(); props.searchTerm('') }}></button>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        search: state.search.searchTerm
    };
};

export default connect(mapStateToProps, { searchTerm, hideModal })(SearchBar);
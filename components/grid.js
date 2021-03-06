import React from 'react';
import PropTypes from 'prop-types';
import {hashHistory} from 'react-router';
import { connect } from 'react-redux';
import {filterGrid, toggleActive} from '../actions';

//const dataSource = [
//    {firstName: 'John', lastName: "Doe", active: false, id:1},
//    {firstName: "Mary", lastName: "Moe", active: false, id:2},
//    {firstName: "Peter", lastName: "Noname", active: true, id:3}
//];


export class GridRecord extends React.Component {
    handleLastNameChange(e){
        this.props.updateLastName(e.target.value);
    }

    showUserDetails(e){
        e.preventDefault();
        hashHistory.push(`/details/${this.props.record.id}`);
    }


    render(){
        let {record} = this.props;
        /*console.log(record.firstName);*/
        return <tr>
            <th onClick={this.showUserDetails.bind(this)}><a href="#">{record.id}</a></th>
            <th>{record.firstName}</th>
            <th><input type="text" value={record.lastName} onChange={this.handleLastNameChange.bind(this)}/></th>
            <th><input type="checkbox" checked={record.active} onChange={this.props.toggleActive}/></th>
        </tr>
    }
}

GridRecord.defaultProps = {
    record: {firstName: "N/A", lastName: "N/A", active: false}
};

GridRecord.propTypes = {
    record: PropTypes.shape({
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
        active: PropTypes.bool.isRequired
    })
};

export class GridComponent extends React.Component {
    constructor(){
        super();
        this.props = {
            records:[]
        }
    }
    componentDidMount(){
        this.refs.filterInput && this.refs.filterInput.focus();
        this.loadData();
    }
    loadData(){
        let {dispatch} = this.props;
        dispatch(startLoading());
        fetch('http://localhost:4730')
            .then(function(response) {
                return response.json();
            }).then(function(json) {
            dispatch(addData(json.gridRecords))
        }).then(function(){
            dispatch(stopLoading());
        })
    }


    toggleActive(index){
        let {dispatch} = this.props;
        dispatch(toggleActive(index));
    }

    handleFilterChange(e){
        let {dispatch} = this.props;
        dispatch(filterGrid(e.target.value));
    }

    updateLastName(index, newValue){
        let {records} = this.props;
        records[index].lastName = newValue;
        this.setState({
            records:records
        })
    }

    render(){
        /*console.log(this.state.records[0]);*/

        return (
            <div style={{width:500, height: 300, padding: 20}}>
                <p>
                    <input ref="filterInput" onChange={this.handleFilterChange.bind(this)} type="text" placeholder="Filter by..."/>
                </p>
                <table className="table table-condensed">
                    <thead>
                    <tr>
                        <th>Id</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Active</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.props.records.map((record, index)=>{
                        return <GridRecord record={record} key={index} toggleActive={this.toggleActive.bind(this, index)} updateLastName={this.updateLastName.bind(this, index)}/>
                    })}
                    </tbody>
                </table>
                <div>{this.props.children && React.cloneElement(this.props.children, {records:this.props.records})}</div>
            </div>
        )
    }
}

GridComponent.propTypes= {
    records: PropTypes.array.isRequired,
    filtered: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
    return {
        records: state.grid.records,
        filtered: state.grid.filtered,
        loading: state.grid.loading

    }
}

export default connect(
    mapStateToProps
)(GridComponent)
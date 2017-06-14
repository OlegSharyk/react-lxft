import React from 'react';
import PropTypes from 'prop-types';

const dataSource = [
    {firstName: 'Oleg', lastName: "Doe", active: false},
    {firstName: "Mary", lastName: "Moe", active: false},
    {firstName: "Peter", lastName: "Noname", active: true}
];

export class GridRecord extends React.Component {
    handleLastNameChange(e){
        this.props.updateLastName(e.target.value);
    }

    render(){
        let {record} = this.props;
        /*console.log(record.firstName);*/
        return <tr>
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

export default class GridComponent extends React.Component {
    constructor(){
        super();
        this.state = {
            records:[]
        }
    }
    componentDidMount(){
        this.refs.filterInput && this.refs.filterInput.focus();
        this.setState({
            records:dataSource
        })
    }

    toggleActive(index){
        let {records} = this.state;
        records[index].active = !records[index].active;
        this.setState({
            records:records
        })
    }

    handleFilterChange(e){
        let value = e.target.value;
        console.log(value);
        var records = dataSource.filter((record) => record.firstName.toUpperCase().includes(value.toUpperCase()));
        this.setState({
            records:records
        })
    }

    updateLastName(index, newValue){
        let {records} = this.state;
        records[index].lastName = newValue;
        this.setState({
            records:records
        })
    }

    render(){
        /*console.log(this.state.records[0]);*/

        return (
            <div style={{width:300, height: 300, padding: 20}}>
                <p>
                    <input ref="filterInput" onChange={this.handleFilterChange.bind(this)} type="text" placeholder="Filter by..."/>
                </p>
                <table className="table table-condensed">
                    <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Active</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.records.map((record, index)=>{

                        return <GridRecord record={record} key={index} toggleActive={this.toggleActive.bind(this, index)} updateLastName={this.updateLastName.bind(this, index)}/>
                    })}
                    </tbody>
                </table>
                <div>{this.props.children && React.cloneElement(this.props.children, {records:this.state.records})}</div>
            </div>
        )
    }
}
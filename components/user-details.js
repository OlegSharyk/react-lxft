import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import UserDetail from './user-detail';
import {filterDetails} from '../actions';

class  UserDetailsComponent extends React.Component{

    componentDidMount(){
        let {dispatch} = this.props;
        dispatch(filterDetails(this.props.params.id));
    }

    render(){
        return (
            <div>
                <h1>THIS IS PARAM FROM GRIDCOMPONENT: {this.props.params.id}</h1>
                {this.props.details.map((detail, i)=>{
                    return <UserDetail key={i} detail={detail}/>
                })}
            </div>
        )
    }
}

UserDetailsComponent.propTypes= {
    details: PropTypes.array.isRequired
};

function mapStateToProps(state) {
    return {
        details: state.details
    }
}

export default connect(
    mapStateToProps
)(UserDetailsComponent)


UserDetailsComponent.defaultProps = {
    detail: {
        name: 'Name N/A',
        prof: "Professional",
        hobbies: ["N/A"],
        skills: ["N/A"]
    }
};

//UserDetailsComponent.propTypes = {
//    record: PropTypes.shape({
//        name: PropTypes.string.isRequired,
//        prof: PropTypes.string.isRequired
//    })
//};

import React from 'react';
import PropTypes from 'prop-types';

const user = {
        name: 'Nicole Pearson',
        prof: "Frontend Developer",
        hobbies: ["Read", "out with friends", "listen to music", "play football"],
        skills: ["html5","css3","react", "Angular2", "Javascript"],
        avatar: "https://avatars.io/twitter/AVA"
};

export default class UserDetailsComponent extends React.Component {
    constructor(){
        super();
        this.state = {
            userInfo:{}
        }
    }

    componentWillMount(){
        this.setState({
            userInfo:user
        })
    }

    render(){
        let detail = this.state.userInfo;
        console.log(detail);
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-offset-2 col-md-8 col-lg-offset-3 col-lg-6">
                        <div className="well profile">
                            <div className="col-sm-12">
                                <div className="col-xs-12 col-sm-8">
                                    <h2>{detail.name}</h2>
                                    <p><strong>About: </strong> {detail.prof} </p>
                                    <p><strong>Hobbies: </strong> {detail.hobbies.join(', ')}</p>
                                    <p><strong>Skills: </strong>
                                        {detail.skills.map((skill, i)=>{
                                            return <span key={i} className="tags">{skill}</span>
                                        })}
                                    </p>
                                </div>
                                <div className="col-xs-12 col-sm-4 text-center">
                                    <figure>
                                        <img src={detail.avatar} alt="" className="img-circle img-responsive"/>
                                    </figure>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


UserDetailsComponent.defaultProps = {
    detail: {
        name: 'Name N/A',
        prof: "Professional",
        hobbies: ["N/A"],
        skills: ["N/A"]
    }
};

UserDetailsComponent.propTypes = {
    record: PropTypes.shape({
        name: PropTypes.string.isRequired,
        prof: PropTypes.string.isRequired
    })
};

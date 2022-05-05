import React, { Component } from "react";
import { Link, withRouter  } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import classnames from "classnames";

class Register extends Component {

    constructor() {
        super();
        this.state = {
            name: "",
            email: "",
            password: "",
            errors: {}
        };
    }

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push("/dashboard");
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();
        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
        };
        this.props.registerUser(newUser, this.props.history);
    };

    render() {
        const { errors } = this.state;
        return (
            <div className="container">
                <div className="row mt-5">
                    <div className="col-md-5 mx-auto mt-5 card shadow-lg">
                        <div className="card-body p-1">
                        <h5 className="text-center text-primary mt-3" style={{'color':'#d93a32'}}>Register below</h5>
                        <form noValidate onSubmit={this.onSubmit} className="white">     
            <label htmlFor="name">Name</label>
                <input
                    onChange={this.onChange}
                    value={this.state.name}
                    id="name"
                    type="text"
                    error={errors.name}
                    className={classnames("form-control", {
                        invalid: errors.name
                    })}
                />
                <span className="text-danger">{errors.name}</span> 
                <br/>    
            <label htmlFor="email">Email</label>
                <input
                    onChange={this.onChange}
                    value={this.state.email}
                    error={errors.email}
                    id="email"
                    type="email"
                    className={classnames("form-control", {
                        invalid: errors.email
                    })}
                />
                <span className="text-danger">{errors.email}</span> 
                <br/>    
            <label htmlFor="password">Password</label>
                <input
                    onChange={this.onChange}
                    value={this.state.password}
                    error={errors.password}
                    id="password"
                    type="password"
                    className={classnames("form-control", {
                        invalid: errors.password
                    })}
                />
                <span className="text-danger">{errors.password}</span>
            <p className="text-center pb-0 mt-2">
                                    <button
                                        type="submit"
                                        className="btn btn-large btn-primary mt-2 px-5">
                                        Sign Up
                                    </button>
                                </p>
        </form>
        <div class="text-center">
                            <p className="grey-text text-darken-1">
                            Already have an account? <Link to="/login">Login</Link>
                            </p>
                                </div>

                        </div>
                   </div>
                </div>  
            </div>           
        );
    }
}

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { registerUser }
)(withRouter(Register));
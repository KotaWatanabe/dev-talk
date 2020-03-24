import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';

const Login = ({ login, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        email:'',
        password:'',
    });

    const { email, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]:e.target.value})

    const onSubmit = async e => {
        e.preventDefault();
        login(email, password)
    };

    if(isAuthenticated) {
        return <Redirect to="/dashboadr" />
    }

    return (
        <>
            <h1 className="large text-primary">Sign In</h1>
            <p className="lead"><i className="fas fa-user"></i> Sign  Into Your Account</p>
            <form className="form" onSubmit={e => onSubmit(e)}>
              <div className="form-group">
                <input 
                    type="email" 
                    placeholder="Email Address" 
                    name="email" 
                    onChange={e => onChange(e)}
                    value={email}
                    required
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={password}
                  onChange={e => onChange(e)}
                  minLength="6"
                  required
                />
              </div>
              <input type="submit" className="btn btn-primary" value="Login" />
            </form>
            <p className="my-1">
              Don't have an account? <Link to="/register">Sign Up</Link>
            </p>
        </>
    )
}

login.protoTypes = {
    login:PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
};

const mapStatetoProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStatetoProps, {login})(Login);


import React, { PureComponent } from 'react';
import { Formik } from 'formik';

import './Auth.css';
import Logo from '../../assets/logo/Logo.svg';

class Auth extends PureComponent {
  state = {
    hideRegister: true
  };

  onEnterClick = e => {
    this.setState({ hideRegister: true });
  };

  onRegClick = e => {
    this.setState({ hideRegister: false });
  };

  render() {
    const { onRegistrationSubmit, onEnterSubmit } = this.props,
      { hideRegister } = this.state;

    return (
      <div className="Auth">
        <div className="Logo">
          <img className="LogoPic" src={Logo} alt="Logo" />
        </div>
        <Formik
          initialValues={{
            email: '',
            password: ''
          }}
          validate={values => {
            let errors = {};

            if (!values.email) {
              errors.email = 'Required';
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
            ) {
              errors.email = 'Invalid email address';
            }

            if (!values.password) {
              errors.password = 'Required';
            } else if (!/^[0-9a-zA-Z]{1,8}$/.test(values.password)) {
              errors.password = 'Invalid password';
            }
            return errors;
          }}
          onSubmit={(values, actions) => {
            console.log('onSubmit');
            console.log('actions =', actions);

            onRegistrationSubmit(values);
            onEnterSubmit(values);
            // LoginToMyApp(values).then(
            //   user => {
            //     setSubmitting(false);
            //     // do whatevs...
            //     // props.updateUser(user)
            //   },
            //   errors => {
            //     setSubmitting(false);
            //     // Maybe transform your API's errors into the same shape as Formik's
            //     setErrors(transformMyApiErrors(errors));
            //   }
            // );
          }}
          render={({
            values,
            errors,
            touched,
            handleSubmit,
            handleChange,
            isSubmitting
          }) => (
            <form className="AuthForm" onSubmit={handleSubmit}>
              <div className="AuthFormField_Login">
                <input
                  className="AuthFormField"
                  type="email"
                  name="email"
                  onChange={handleChange}
                  value={values.email}
                  placeholder="email"
                />
                {touched.email &&
                  errors.email && (
                    <div className="AuthFormField__Error">{errors.email}</div>
                  )}
              </div>
              <div className="AuthFormField_Password">
                <input
                  className="AuthFormField"
                  type="password"
                  name="password"
                  onChange={handleChange}
                  value={values.password}
                  placeholder="password"
                />
                {touched.password &&
                  errors.password && (
                    <div className="AuthFormField__Error">
                      {errors.password}
                    </div>
                  )}
              </div>
              {!hideRegister && (
                <button
                  className="AuthFormSubmit"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Войти
                </button>
              )}
              {hideRegister && (
                <button
                  className="AuthFormSubmit"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Зарегистрироваться
                </button>
              )}
            </form>
          )}
        />
        {!hideRegister && (
          <div className="AuthAction">
            Впервые на сайте?&nbsp;<a
              onClick={this.onEnterClick}
              className="AuthActionName"
            >
              Регистрация
            </a>
          </div>
        )}
        {hideRegister && (
          <div className="AuthAction">
            Уже зарегистрированы?&nbsp;<a
              onClick={this.onRegClick}
              className="AuthActionName"
            >
              Войти
            </a>
          </div>
        )}
      </div>
    );
  }
}

export default Auth;

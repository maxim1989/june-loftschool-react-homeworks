import React, { PureComponent } from 'react';
import { Formik } from 'formik';

import './Auth.css';
import Logo from '../../assets/logo/Logo.svg';

class Auth extends PureComponent {
  render() {
    const { onSubmit } = this.props;

    return (
      <div className="Auth">
        <div className="Logo">
          <img src={Logo} alt="Logo" />
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
            onSubmit(values);
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
            <form className="Auth-Form" onSubmit={handleSubmit}>
              <input
                className="Auth-Form-Field"
                type="email"
                name="email"
                onChange={handleChange}
                value={values.email}
              />
              {touched.email && errors.email && <div>{errors.email}</div>}
              <input
                className="Auth-Form-Field"
                type="password"
                name="password"
                onChange={handleChange}
                value={values.password}
              />
              {touched.password &&
                errors.password && <div>{errors.password}</div>}
              <button type="submit" disabled={isSubmitting}>
                Войти
              </button>
            </form>
          )}
        />
        <div>
          <p>
            Впервые на сайте? <a>Регистрация</a>
          </p>
        </div>
      </div>
    );
  }
}

export default Auth;

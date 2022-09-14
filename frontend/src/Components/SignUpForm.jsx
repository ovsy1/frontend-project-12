import React, { useState, useEffect, useRef } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import validationForm from '../helpers/validation.js';
import routes from '../routes.js';
import { useAuth } from '../hooks/useAuth.js';

function SignUpForm() {
  const [registrationFailed, setRegistrationFailed] = useState(false);
  const { toLogIn } = useAuth();
  const inputRef = useRef();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { signupForm } = validationForm();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: signupForm,
    onSubmit: async (values) => {
      try {
        setRegistrationFailed(false);
        const res = await axios.post(routes.signupPagePath(), values);
        toLogIn(res.data);
        navigate('/');
      } catch (error) {
        if (error.response.status === 409) {
          setRegistrationFailed(true);
          inputRef.current.select();
        }
        if (!error.isAxiosError) {
          throw error;
        }
      }
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit} className="w-50">
      <h1 className="text-center mb-4">{t('signup.header')}</h1>
      <Form.Group className="form-floating mb-3">
        <Form.Control
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.username}
          placeholder={t('signup.usernameConstraints')}
          name="username"
          id="username"
          autoComplete="username"
          isInvalid={
            (formik.errors.username && formik.touched.username)
            || registrationFailed
          }
          required
          ref={inputRef}
        />
        <Form.Label htmlFor="username">{t('signup.username')}</Form.Label>
        <Form.Control.Feedback type="invalid" tooltip placement="right">
          {t(formik.errors.username)}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="form-floating mb-3">
        <Form.Control
          type="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          placeholder={t('signup.passMin')}
          name="password"
          id="password"
          aria-describedby="passwordHelpBlock"
          isInvalid={
            (formik.errors.password && formik.touched.password)
            || registrationFailed
          }
          required
          autoComplete="new-password"
        />
        <Form.Control.Feedback type="invalid" tooltip>
          {t(formik.errors.password)}
        </Form.Control.Feedback>
        <Form.Label htmlFor="password">{t('signup.password')}</Form.Label>
      </Form.Group>
      <Form.Group className="form-floating mb-4">
        <Form.Control
          type="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.confirmPassword}
          placeholder={t('signup.mustMatch')}
          name="confirmPassword"
          id="confirmPassword"
          isInvalid={
            (formik.errors.confirmPassword && formik.touched.confirmPassword)
            || registrationFailed
          }
          required
          autoComplete="new-password"
        />
        <Form.Control.Feedback type="invalid" tooltip>
          {registrationFailed
            ? t('signup.alreadyExists')
            : t(formik.errors.confirmPassword)}
        </Form.Control.Feedback>
        <Form.Label htmlFor="confirmPassword">{t('signup.confirm')}</Form.Label>
      </Form.Group>
      <Button type="submit" variant="outline-primary" className="w-100">
        {t('signup.submit')}
      </Button>
    </Form>
  );
}

export default SignUpForm;

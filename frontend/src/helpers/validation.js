import * as yup from 'yup';
import { useTranslation } from 'react-i18next';

function validationForm() {
  const { t } = useTranslation(); // eslint-disable-line

  const loginForm = yup.object({
    username: yup.string().trim().required(t('errors.loginErr')),
    password: yup.string().required(t('errors.loginErr')),
  });

  const signupForm = yup.object({
    username: yup
      .string()
      .required(t('signup.required'))
      .min(3, t('signup.usernameConstraints'))
      .max(20, t('signup.usernameConstraints')),
    password: yup
      .string()
      .required(t('signup.required'))
      .min(6, t('signup.passMin')),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], t('signup.mustMatch'))
      .required(t('signup.required')),
  });

  const addChannelForm = (channels) => yup.object().shape({
    name: yup
      .string()
      .trim()
      .min(3, 'errors.channelMinLength')
      .max(20, 'errors.channelMaxLength')
      .notOneOf(channels, 'errors.channelUniqName')
      .required(t('errors.required')),
  });

  return {
    loginForm,
    signupForm,
    addChannelForm: (channels) => addChannelForm(channels),
  };
}

export default validationForm;

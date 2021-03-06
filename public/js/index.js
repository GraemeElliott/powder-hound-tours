/* eslint-disable*/
import '@babel/polyfill';
import { displayMap } from './mapbox';
import { login, logout } from './login';
import { updateSettings } from './updateSettings';

const mapBox = document.getElementById('map');
const loginForm = document.querySelector('.form--login');
const logoutButton = document.querySelector('.nav__el.nav--logout');
const userDataForm = document.querySelector('.form-user-data');
const userPasswordForm = document.querySelector('.form-user-password');

if (mapBox) {
  const locations = JSON.parse(mapBox.dataset.locations);
  displayMap(locations)
};

if (loginForm) {
  loginForm.addEventListener('submit', e => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password)
  })
};

if (logoutButton) logoutButton.addEventListener('click', logout);

if (userDataForm)
  userDataForm.addEventListener('submit', element => {
    element.preventDefault();
    const form = new FormData();
    form.append('name', document.getElementById('name').value);
    form.append('email', document.getElementById('email').value);
    form.append('photo', document.getElementById('photo').files[0]);
    updateSettings(form , 'data');
  });

  if (userPasswordForm)
  userPasswordForm.addEventListener('submit', async element => {
    element.preventDefault();
    document.querySelector('.btn--save-password').textContent = 'Saving Password...'
    const passwordCurrent = document.getElementById('password-current').value;
    const password = document.getElementById('password').value;
    const passwordConfirmation = document.getElementById('password-confirm').value;

    await updateSettings({ passwordCurrent, password, passwordConfirmation }, 'password');

    document.querySelector('.btn--save-password').textContent = 'Save Password'
    document.getElementById('password-current').value = '';
    document.getElementById('password').value = '';
    document.getElementById('password-confirm').value = '';

  });


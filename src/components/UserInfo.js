export default class UserInfo {
  constructor({ profileNameSelector, profileInfoSelector }) {
    this._name = document.querySelector(profileNameSelector);
    this._info = document.querySelector(profileInfoSelector);
  }

  getUserInfo() {
    const userData = {name: this._name.textContent, info: this._info.textContent};
    return userData;
  }

  setUserInfo({ name, about }) {
    this._name.textContent = name;
    this._info.textContent = about;
  }
}
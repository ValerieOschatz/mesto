export default class UserInfo {
  constructor({ profileNameSelector, profileInfoSelector, avatarSelector }) {
    this._name = document.querySelector(profileNameSelector);
    this._info = document.querySelector(profileInfoSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    const userData = {name: this._name.textContent, info: this._info.textContent};
    return userData;
  }

  setUserInfo({ name, about, avatar, _id }) {
    this._name.textContent = name;
    this._info.textContent = about;
    this._avatar.style.backgroundImage = `url('${avatar}')`;
    this.userId = _id;
  }
}
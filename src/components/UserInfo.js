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

  setUserInfo({ name, about }) {
    this._name.textContent = name;
    this._info.textContent = about;
  }

  setAvatar({ avatar }) {
    this._avatar.src = avatar;
  }

  setUserId({ _id }) {
    this.userId = _id;
  }
}
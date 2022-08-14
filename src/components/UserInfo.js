export class UserInfo {
  constructor(nameSelector, aboutSelector, avatarSelector) {
    this._nameSelector = nameSelector;
    this._aboutSelector = aboutSelector;
    this._avatarSelector = avatarSelector;

    this._userName = document.querySelector(this._nameSelector);
    this._userAbout = document.querySelector(this._aboutSelector);
    this._userAvatar = document.querySelector(this._avatarSelector);
  }

  //getUserInfo - возвращает объект с данными пользователя со страницы
  getUserInfo() {
    const data = {
      name: this._userName.textContent,
      about: this._userAbout.textContent,
      //avatar: this._userAvatar.src,
    };
    console.log(data);
    return data;
  }

  //setUserInfo - принимает новые данные пользователя и добавляет их на страницу
  setUserInfo(data) {
    this._userName.textContent = data.name;
    this._userAbout.textContent = data.about;
    //this._userAvatar.src = data.avatar;
    this._id = data._id;
  }

  setUserAvatar(data) {
    this._userAvatar.src = data.avatar;
  }

  getId() {
    return this._id;
  }
}

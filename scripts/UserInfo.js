export class UserInfo {
  constructor(userSelector) {
    this._userName = userSelector.nameProfile.textContent;
    this._userAbout = userSelector.jobProfile.textContent;
  }

  //getUserInfo - возвращает объект с данными пользователя
  getUserInfo() {
    const data = {
      userName: this._userName,
      userAbout: this._userAbout,
    };
    return data;
  }

  //setUserInfo - принимает новые данные пользователя и добавляет их на страницу
  setUserInfo(data) {
    this._userName = data.userName;
    this._userAbout = data.userAbout;
  }
}

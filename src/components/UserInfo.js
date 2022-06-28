import { nameInput, jobInput } from "../constants/constants.js";

export class UserInfo {
  constructor(nameSelector, aboutSelector) {
    this._nameSelector = nameSelector;
    this._aboutSelector = aboutSelector;

    this._userName = document.querySelector(this._nameSelector);
    this._userAbout = document.querySelector(this._aboutSelector);
  }

  //getUserInfo - возвращает объект с данными пользователя
  getUserInfo() {
    const data = {
      userName: this._userName.textContent,
      userAbout: this._userAbout.textContent,
    };
    return data;
  }

  //setUserInfo - принимает новые данные пользователя и добавляет их на страницу
  setUserInfo() {
    this._userName.textContent = nameInput.value;
    this._userAbout.textContent = jobInput.value;
  }
}

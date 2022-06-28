import "./index.css";

import {
  buttonEditProfile,
  nameSelector,
  aboutSelector,
  addButton,
  nameInput,
  jobInput,
  placeInput,
  linkInput,
  areaElements,
  editForm,
  addCardForm,
  config,
} from "../constants/constants.js";

import { Section } from "../components/Section.js";
import { initialCards } from "../constants/cards.js";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";

//Валидация
const editFormValidator = new FormValidator(config, editForm);
const addCardFormValidator = new FormValidator(config, addCardForm);

editFormValidator.enableValidation();
addCardFormValidator.enableValidation();

//Превью попап
const popupPreview = new PopupWithImage("#popup__img");
popupPreview.setEventListeners();

//попап NewPlace
const popupNewPlaceForm = new PopupWithForm(
  "#popup__new-place",
  handleAddCardFormSubmit
);

//попап EditProfile
const popupEditProfileForm = new PopupWithForm(
  "#popup__edit-profile",
  handleProfileFormSubmit
);
//попап EditProfile
const userInfo = new UserInfo(nameSelector, aboutSelector);

//Добавление карточки
const cardsList = new Section(
  {
    data: initialCards,
    renderer: (item) => {
      const card = createCard(item);
      //const cardElement = card.generateCard();
      cardsList.addItem(card);
    },
  },
  areaElements
);

//Создание карточки
const createCard = (data) => {
  const card = new Card(data, "#card-template", {
    handleCardClick: () => {
      popupPreview.open(data);
    },
  });
  return card.generateCard();
};

//добавление на страницу карточки по Input
function handleAddCardFormSubmit() {
  const card = createCard({
    name: placeInput.value,
    link: linkInput.value,
  });
  cardsList.addItem(card);
  popupNewPlaceForm.close();
}

//попап EditProfile функция Сохранение изменений
function handleProfileFormSubmit(data) {
  userInfo.setUserInfo(data);
  popupEditProfileForm.close();
}

popupNewPlaceForm.setEventListeners();
popupEditProfileForm.setEventListeners();

//попап EditProfile
buttonEditProfile.addEventListener("click", () => {
  const userData = userInfo.getUserInfo();
  nameInput.value = userData.userName;
  jobInput.value = userData.userAbout;
  popupEditProfileForm.open();
});

//Открыть NewPlace
addButton.addEventListener("click", () => {
  addCardFormValidator.validateButton();
  popupNewPlaceForm.open();
});

//Отрисовать карточки из массива
cardsList.renderItems();

import "../pages/index.css";

import {
  buttonEditProfile,
  editProfileCloseButton,
  popupEditProfile,
  formEditProfile,
  nameProfile,
  jobProfile,
  addButton,
  popupNewPlace,
  formNewPlace,
  newPlaceCloseButton,
  popupPreviewCloseButton,
  nameInput,
  jobInput,
  placeInput,
  linkInput,
  areaElements,
  popupPreviewImg,
  previewImg,
  editForm,
  addCardForm,
  config,
} from "./constants.js";

import { Section } from "./Section.js";
import { initialCards } from "./cards.js";
import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import { PopupWithImage } from "./PopupWithImage.js";
import { PopupWithForm } from "./PopupWithForm.js";
import { UserInfo } from "./UserInfo.js";

//Валидация
const editFormValidator = new FormValidator(config, editForm);
const addCardFormValidator = new FormValidator(config, addCardForm);

editFormValidator.enableValidation();
addCardFormValidator.enableValidation();

//Превью попап
const popupPreview = new PopupWithImage("#popup__img");
popupPreview.setEventListeners();

//Создание карточки
const createCard = (data) => {
  const card = new Card(data, "#card-template", {
    handleCardClick: () => {
      popupPreview.open(data);
    },
  });
  return card;
};

//Добавление карточки
const cardsList = new Section(
  {
    data: initialCards,
    renderer: (item) => {
      const card = createCard(item);
      const cardElement = card.generateCard();
      cardsList.addItem(cardElement);
    },
  },
  areaElements
);

//попап NewPlace
const popupNewPlaceForm = new PopupWithForm("#popup__new-place", {
  submit: (data) => {
    const card = createCard(data);
    const cardElement = card.generateCard();
    cardsList.addItem(cardElement, "prepend");
  },
});

//попап EditProfile
const popupEditProfileForm = new PopupWithForm("#popup__edit-profile", {
  submit: (data) => {
    userInfo.setUserInfo(data);
  },
});

popupNewPlaceForm.setEventListeners();
popupEditProfileForm.setEventListeners();

//попап EditProfile функция Сохранение изменений
function handleProfileFormSubmit(event) {
  event.preventDefault();
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  popupEditProfileForm.close();
}

//попап EditProfile
const userInfo = new UserInfo({ nameProfile, jobProfile });

//Открыть EditProfile
buttonEditProfile.addEventListener("click", () => {
  const userData = userInfo.getUserInfo();
  nameInput.value = userData.userName;
  jobInput.value = userData.userAbout;
  popupEditProfileForm.open();
});

//добавление на страницу карточки по Input
export function handleAddCardFormSubmit(e) {
  e.preventDefault();
  const card = createCard({
    name: placeInput.value,
    link: linkInput.value,
  });
  const cardElement = card.generateCard();
  cardsList.addItem(cardElement, "prepend");
  popupNewPlaceForm.close();
}

//Открыть NewPlace
addButton.addEventListener("click", () => {
  popupNewPlaceForm.open();
});

formEditProfile.addEventListener("submit", handleProfileFormSubmit);

formNewPlace.addEventListener("submit", handleAddCardFormSubmit);

//Отрисовать карточки из массива
cardsList.renderItems();

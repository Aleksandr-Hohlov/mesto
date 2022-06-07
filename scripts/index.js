import { initialCards } from "./cards.js";
import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";

//Валидация
const editFormValidator = new FormValidator(config, editForm);
const addCardFormValidator = new FormValidator(config, addCardForm);

editFormValidator.enableValidation();
addCardFormValidator.enableValidation();

//Закрытие на Esc
function handleEscButton(e) {
  if (e.key === "Escape") {
    const popup = document.querySelector(".popup_opened");
    closePopup(popup);
  }
}

//функция попап открытие
export function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", handleEscButton);
}

//функция попап закрытие
export function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", handleEscButton);
}

//Закрытие на оверлей
const handleOverlayClose = (e) => {
  if (e.target === e.currentTarget) {
    closePopup(e.target);
  }
};

//попап EditProfile функция Открытие попап на кнопку редактирования
function openEditProfile(e) {
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;

  openPopup(popupEditProfile);
}

//попап EditProfile функция Сохранение изменений
function handleProfileFormSubmit(event) {
  event.preventDefault();
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;

  closePopup(popupEditProfile);
}

//попап NewPlace функция Открытие на кнопку addButton
function openNewPlace() {
  formNewPlace.reset();
  addCardFormValidator.validateButton();

  openPopup(popupNewPlace);
}

//Создание новой карточки
const newCard = (data) => {
  const card = new Card(data, "#card-template");
  return card.generateCard();
};

// Добавление карточек из массива
initialCards.forEach((item) => {
  addCardPrepend(item);
});

// Добавление карточки в начало
function addCardPrepend(data) {
  areaElements.prepend(newCard(data));
}

//добавление на страницу карточки по Input
function handleAddCardFormSubmit(e) {
  e.preventDefault();
  addCardPrepend({
    name: placeInput.value,
    link: linkInput.value,
  });
  closePopup(popupNewPlace);
}

//addEventListener
buttonEditProfile.addEventListener("click", openEditProfile);

//Закрыть на крестик popupEditProfile
editProfileCloseButton.addEventListener("click", () => {
  closePopup(popupEditProfile);
});
//Закрыть на крестик popupNewPlace
newPlaceCloseButton.addEventListener("click", () => {
  closePopup(popupNewPlace);
});
//Закрыть на крестик popupPreviewImg
popupPreviewCloseButton.addEventListener("click", () => {
  closePopup(popupPreviewImg);
});

formEditProfile.addEventListener("submit", handleProfileFormSubmit);
addButton.addEventListener("click", openNewPlace);
formNewPlace.addEventListener("submit", handleAddCardFormSubmit);

//Закрытие на оверлей
popupNewPlace.addEventListener("click", handleOverlayClose);
popupEditProfile.addEventListener("click", handleOverlayClose);
popupPreviewImg.addEventListener("click", handleOverlayClose);

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
  //const popup = document.querySelector(".popup_opened");
  if (e.key === "Escape") {
    closePopup();
  }
}

//функция попап открытие
export function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", handleEscButton);
}

//функция попап закрытие
export function closePopup() {
  const popup = document.querySelector(".popup_opened");
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", handleEscButton);
}

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

  closePopup();
}

//попап NewPlace функция Открытие на кнопку addButton
function openNewPlace() {
  formNewPlace.reset();
  addCardFormValidator.validateButton();

  openPopup(popupNewPlace);
}

const newCard = (data) => {
  const card = new Card(data, "#card-template");
  const cardElement = card.generateCard();
  areaElements.prepend(cardElement);
};

//добавление на страницу карточки по Input
function handleAddCardFormSubmit(e) {
  e.preventDefault();
  newCard({
    name: placeInput.value,
    link: linkInput.value,
  });

  closePopup();
}

//Закрытие на оверлей
const handleOverlayClose = (e) => {
  if (e.target.classList.contains("popup")) {
    closePopup();
  }
};

//addEventListener
buttonEditProfile.addEventListener("click", openEditProfile);
editProfileCloseButton.addEventListener("click", closePopup);
formEditProfile.addEventListener("submit", handleProfileFormSubmit);
addButton.addEventListener("click", openNewPlace);
newPlaceCloseButton.addEventListener("click", closePopup);
formNewPlace.addEventListener("submit", handleAddCardFormSubmit);
//Закрытие на оверлей
popupNewPlace.addEventListener("click", handleOverlayClose);
popupEditProfile.addEventListener("click", handleOverlayClose);
popupPreviewImg.addEventListener("click", handleOverlayClose);

initialCards.forEach((item) => {
  newCard(item);
});

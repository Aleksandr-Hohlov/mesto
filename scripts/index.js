import { initialCards } from "./cards.js";
import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";

//Валидация
const editFormValidator = new FormValidator(config, editForm);
const addCardFormValidator = new FormValidator(config, addCardForm);

editFormValidator.enableValidation();
addCardFormValidator.enableValidation();

//Закрытие на Esc
function handlerEscButton(e) {
  if (e.key === "Escape") {
    closePopup(popupNewPlace);
    closePopup(popupEditProfile);
    closePopup(popupPreviewImg);
  }
}

//функция попап открытие
function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", handlerEscButton);
}

//функция попап закрытие
function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", handlerEscButton);
}

//попап EditProfile функция Открытие попап на кнопку редактирования
function openEditProfile() {
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
  openPopup(popupEditProfile);
}

//попап EditProfile функция Закрытие на крестик
function closeEditProfile() {
  closePopup(popupEditProfile);
}

//попап EditProfile функция Сохранение изменений
function formSubmitHandler(event) {
  event.preventDefault();
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;

  closePopup(popupEditProfile);
}

//попап NewPlace функция Открытие на кнопку addButton
function openNewPlace() {
  formNewPlace.reset();
  openPopup(popupNewPlace);
}

//попап NewPlace функция Закрытие на крестик
function closeNewPlace() {
  closePopup(popupNewPlace);
}

//добавление на страницу карточки по Input
function formSubmitNewPlace(e) {
  e.preventDefault();
  const data = { name: placeInput.value, link: linkInput.value };
  const card = new Card(data, "#card-template");
  const cardElement = card.generateCard();

  document.querySelector(".elements").prepend(cardElement);
  closePopup(popupNewPlace);
}

//addEventListener
buttonEditProfile.addEventListener("click", openEditProfile);
editProfileCloseButton.addEventListener("click", closeEditProfile);
formElement.addEventListener("submit", formSubmitHandler);
addButton.addEventListener("click", openNewPlace);
newPlaceCloseButton.addEventListener("click", closeNewPlace);
formNewPlace.addEventListener("submit", formSubmitNewPlace);

//Закрытие на оверлей
popupNewPlace.addEventListener("click", (event) => {
  if (event.target.classList.contains("popup")) {
    closePopup(popupNewPlace);
  }
});

popupEditProfile.addEventListener("click", (event) => {
  if (event.target.classList.contains("popup")) {
    closePopup(popupEditProfile);
  }
});

popupPreviewImg.addEventListener("click", (event) => {
  if (event.target.classList.contains("popup")) {
    closePopup(popupPreviewImg);
  }
});

initialCards.forEach((item) => {
  // Создадим экземпляр карточки
  const card = new Card(item, "#card-template");
  // Создаём карточку и возвращаем наружу
  const cardElement = card.generateCard();

  // Добавляем в DOM
  document.querySelector(".elements").prepend(cardElement);
});

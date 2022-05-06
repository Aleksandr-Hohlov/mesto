const buttonEditProfile = document.querySelector(".profile__edit-button");
const editProfileCloseButton = document.querySelector(
  ".popup__close-button_edit-profile"
);
const popupEditProfile = document.querySelector("#popup__edit-profile");
const formElement2 = document.querySelector(".popup__container");
const nameProfile = document.querySelector(".profile__title");
const jobProfile = document.querySelector(".profile__subtitle");
const addButton = document.querySelector(".profile__add-button");
const popupNewPlace = document.querySelector("#popup__new-place");
const formNewPlace = document.querySelector(".popup__form_new-place");
const newPlaceCloseButton = document.querySelector(
  ".popup__close-button_new-place"
);
const popupPreviewCloseButton = document.querySelector(
  ".popup__close-button_preview"
);
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_job");
const placeInput = document.querySelector(".popup__input_type_name-place");
const linkInput = document.querySelector(".popup__input_type_link-place");
const areaElements = document.querySelector(".elements");
const cardTemplate = document.querySelector("#card-template").content;
const popupPreviewImg = document.querySelector("#popup__img");
const previewImg = document.querySelector(".popup__preview");
const popupSubtitle = document.querySelector(".popup__subtitle");
const cardPlace = cardTemplate.querySelector(".element").cloneNode(true);
const nameCardPlace = cardPlace.querySelector(".element__name");
const imgCardPlace = cardPlace.querySelector(".element__image");
const likeButtonCardPlace = cardPlace.querySelector(".element__like");
const deleteButtonCardPlace = cardPlace.querySelector(".element__delete");
//const popupInput = popup.querySelectorAll('.popup__input')
//const popupInputErorr = popup.querySelectorAll('.popup__input-error')

//Закрытие на Esc
function handlerEscButton(e) {
  if (e.key === "Escape") {
    closePopup(popupNewPlace);
    closePopup(popupEditProfile);
    closePopup(popupPreviewImg);
  }
}

/*функция попап открытие*/
function openPopup(popup) {
  popup.classList.add("popup_opened");
  enableValidation();
  document.addEventListener("keydown", handlerEscButton);
}

/*функция попап закрытие*/
function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", handlerEscButton);
}

/*попап EditProfile функция Открытие попап на кнопку редактирования*/
function openEditProfile() {
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
  openPopup(popupEditProfile);
  /*document.body.style.overflow = 'hidden';*/
}

/*попап EditProfile функция Закрытие на крестик*/
function closeEditProfile() {
  closePopup(popupEditProfile);
  /*document.body.style.overflow = '';*/
}

/*попап EditProfile функция Сохранение изменений*/
function formSubmitHandler(event) {
  event.preventDefault();
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;

  closePopup(popupEditProfile);
}

/*попап NewPlace функция Открытие на кнопку addButton*/
function openNewPlace() {
  formNewPlace.reset();
  openPopup(popupNewPlace);
}

/*попап NewPlace функция Закрытие на крестик*/
function closeNewPlace() {
  closePopup(popupNewPlace);
}

/*попап popupPreviewImg функция Открытие*/
function openPopupPreview(e) {
  const cardPlace = e.target.closest(".element");
  const eventTargetText = cardPlace.querySelector(".element__name").textContent;
  const target = e.target;

  popupSubtitle.textContent = eventTargetText;
  previewImg.setAttribute("src", target.src);
  previewImg.setAttribute("alt", target.alt);
  openPopup(popupPreviewImg);
}

/*попап popupPreviewImg функция Закрытие на крестик*/
function closePopupPreview() {
  closePopup(popupPreviewImg);
}

/*Добавление карточек из массива*/
initialCards.forEach(function (item) {
  render(createCard(item));
});

/*prepend карточки*/
function render(cardPlace) {
  areaElements.prepend(cardPlace);
}

/*создание карточки*/
function createCard(item) {
  const cardPlace = cardTemplate.querySelector(".element").cloneNode(true);
  const nameCardPlace = cardPlace.querySelector(".element__name");
  const imgCardPlace = cardPlace.querySelector(".element__image");
  const likeButtonCardPlace = cardPlace.querySelector(".element__like");
  const deleteButtonCardPlace = cardPlace.querySelector(".element__delete");

  likeButtonCardPlace.addEventListener("click", handlerLikeButton);
  deleteButtonCardPlace.addEventListener("click", handlerDeleteButton);
  imgCardPlace.addEventListener("click", openPopupPreview);

  nameCardPlace.textContent = item.name;
  imgCardPlace.src = item.link;
  imgCardPlace.alt = item.name;

  return cardPlace;
}

/*добавление на страницу карточки по Input*/
function formSubmitNewPlace(e) {
  e.preventDefault();
  /*const cardPlace = cardTemplate.querySelector('.element').cloneNode(true);
  const nameCardPlace = cardPlace.querySelector('.element__name');
  const imgCardPlace = cardPlace.querySelector('.element__image');
  const likeButtonCardPlace = cardPlace.querySelector('.element__like');
  const deleteButtonCardPlace = cardPlace.querySelector('.element__delete');
  const buttonNewPlace = document.querySelector('.popup__save-button_new-place');*/

  createCard(linkInput.value, placeInput.value);
  nameCardPlace.textContent = placeInput.value;
  imgCardPlace.src = linkInput.value;
  imgCardPlace.alt = placeInput.value;

  /*likeButtonCardPlace.addEventListener('click', handlerLikeButton);
  deleteButtonCardPlace.addEventListener('click', handlerDeleteButton);
  imgCardPlace.addEventListener('click', openPopupPreview);*/

  render(cardPlace);
  closePopup(popupNewPlace);
}

/*функция лайк*/
function handlerLikeButton(e) {
  e.target.classList.toggle("element__like_active");
}

/*функция Delete*/
function handlerDeleteButton(e) {
  e.target.closest(".element").remove();
}

/*addEventListener*/
buttonEditProfile.addEventListener("click", openEditProfile);
editProfileCloseButton.addEventListener("click", closeEditProfile);
formElement2.addEventListener("submit", formSubmitHandler);
addButton.addEventListener("click", openNewPlace);
newPlaceCloseButton.addEventListener("click", closeNewPlace);
popupPreviewCloseButton.addEventListener("click", closePopupPreview);
formNewPlace.addEventListener("submit", formSubmitNewPlace);
likeButtonCardPlace.addEventListener("click", handlerLikeButton);
deleteButtonCardPlace.addEventListener("click", handlerDeleteButton);
imgCardPlace.addEventListener("click", openPopupPreview);

/*Закрытие на оверлей*/
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

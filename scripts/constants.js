const buttonEditProfile = document.querySelector(".profile__edit-button");
const editProfileCloseButton = document.querySelector(
  ".popup__close-button_edit-profile"
);
const popupEditProfile = document.querySelector("#popup__edit-profile");
const formElement = document.querySelector(".popup__container");
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
const popupPreviewImg = document.querySelector("#popup__img");
const previewImg = document.querySelector(".popup__preview");
const popupSubtitle = document.querySelector(".popup__subtitle");

const editForm = document.querySelector(".popup__form_edit-profile");
const addCardForm = document.querySelector(".popup__form_new-place");

const config = {
  formElement: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};

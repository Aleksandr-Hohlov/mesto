const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];


const buttonEditProfile = document.querySelector('.profile__edit-button');
const closeButtonEditProfile = document.querySelector('.popup__close-button_edit-profile');
const popupEditProfile = document.querySelector('.popup__edit-profile');
const popupOpened = 'popup_opened';
const formElement = document.querySelector('.popup__container');
const nameProfile = document.querySelector('.profile__title');
const jobProfile = document.querySelector('.profile__subtitle');
/*const likeButton = document.querySelectorAll('.element__like');*/
const addButton = document.querySelector('.profile__add-button');
const popupNewPlace = document.querySelector('.popup__new-place');
const closeButtonNewPlace = document.querySelector('.popup__close-button_new-place');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_job');
const placeInput = document.querySelector('.popup__input_type_name-place');
const linkInput = document.querySelector('.popup__input_type_link-place');
const areaElements = document.querySelector('.elements');
const cardTemplate = document.querySelector('#card-template').content;



/*попап EditProfile функция Открытие попап на кнопку редактирования*/
function openEditProfile () {
  popupEditProfile.classList.add(popupOpened);
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
  document.body.style.overflow = 'hidden';
}

/*попап EditProfile функция Закрытие на крестик*/
function closeEditProfile () {
  popupEditProfile.classList.remove(popupOpened);
  document.body.style.overflow = '';
}

/*попап EditProfile функция Сохранение изменений*/
function formSubmitHandler (event) {
  event.preventDefault();
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  closeEditProfile();
}

/*функция лайк
for (let i = 0; i < likeButton.length; i++) {
  likeButton[i].onclick = function(e) {
    e.target.classList.toggle('element__like_active');
  }
}*/

/*попап NewPlace функция Открытие на кнопку addButton*/
function openNewPlace () {
  popupNewPlace.classList.add(popupOpened);
  placeInput.value = '';
  linkInput.value = '';
}

/*попап NewPlace функция Закрытие на крестик*/
function closeNewPlace () {
  popupNewPlace.classList.remove(popupOpened);
}

/*слушатели*/
buttonEditProfile.addEventListener('click', openEditProfile);
closeButtonEditProfile.addEventListener('click', closeEditProfile);
formElement.addEventListener('submit', formSubmitHandler);
addButton.addEventListener('click', openNewPlace);
closeButtonNewPlace.addEventListener('click', closeNewPlace);

/*Цикл массива*/
initialCards.forEach(function (item) {
  addCard (item)
})

/*Добавление карточек из массива*/
function addCard (item) {
  const cardPlace = cardTemplate.querySelector('.element').cloneNode(true);
  const nameCardPlace = cardPlace.querySelector('.element__name');
  const linkCardPlace = cardPlace.querySelector('.element__image');
  const likeButtonCardPlace = cardPlace.querySelector('.element__like');
  const deleteButtonCardPlace = cardPlace.querySelector('.element__delete');

  likeButtonCardPlace.addEventListener('click', handlerLikeButton);
  deleteButtonCardPlace.addEventListener('click', handlerDeleteButton);

  nameCardPlace.textContent = item.name;
  linkCardPlace.src = item.link
  areaElements.append(cardPlace)
}

/*функция лайк*/
function handlerLikeButton (e) {
  e.target.classList.toggle('element__like_active');
}
/*функция Delete*/
function handlerDeleteButton (e) {
  e.target.closest('.element').remove();
}

const buttonProfileEdit = document.querySelector('.profile__edit-button');
const closeButton = document.querySelector('.popup__close-button');
const popup = document.querySelector('.popup');
const popupOpened = 'popup_opened';
const formElement = document.querySelector('.popup__container');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_job');
const nameProfile = document.querySelector('.profile__title');
const jobProfile = document.querySelector('.profile__subtitle');
/*const likeButton = document.querySelectorAll('.element__like');*/


/*функция Открытие попап на кнопку редактирования*/
function ProfileEdit () {
  popup.classList.add(popupOpened);
  /*document.body.style.overflow = 'hidden';*/
}

/*функция Закрытие на крестик*/
function popupClose () {
  popup.classList.remove(popupOpened);
  /*document.body.style.overflow = '';*/
}

/*функция Сохранение изменений*/
function formSubmitHandler (event) {
  event.preventDefault();
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  popupClose();
}

/*функция лайк
for (var i = 0; i < likeButton.length; i++) {
  likeButton[i].onclick = function(e) {
    e.target.classList.toggle('element__like_active');
  }
}*/

/*слушатели*/
buttonProfileEdit.addEventListener('click', ProfileEdit);
closeButton.addEventListener('click', popupClose);
formElement.addEventListener('submit', formSubmitHandler);


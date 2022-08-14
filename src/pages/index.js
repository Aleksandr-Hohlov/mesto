import './index.css';

import {
  buttonEditProfile,
  nameSelector,
  aboutSelector,
  avatarSelector,
  addButton,
  buttonEditAvatar,
  //nameInput,
  //jobInput,
  areaElements,
  editForm,
  addCardForm,
  config,
  avatarForm,
} from '../constants/constants.js';

import { Section } from '../components/Section.js';
import { initialCards } from '../constants/cards.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import { Api } from '../components/Api.js';
import { PopupConfirmDelete } from '../components/PopupConfirmDelete.js';

//Api
const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-47',
  headers: {
    'Content-type': 'application/json',
    authorization: '93622233-6815-45c6-a1af-b3fd0330c20e',
  },
});

Promise.all([api.getUserInfo(), api.getCards()])
  .then(([userData, cards]) => {
    userInfo.setUserInfo(userData);
    userInfo.setUserAvatar(userData);
    cardsList.renderItems(cards.reverse());
  })
  .catch((err) => {
    console.log(err);
  });

//Валидация
const editFormValidator = new FormValidator(config, editForm);
const addCardFormValidator = new FormValidator(config, addCardForm);
const avatarFormValidator = new FormValidator(config, avatarForm);

editFormValidator.enableValidation();
addCardFormValidator.enableValidation();
avatarFormValidator.enableValidation();

//Превью попап
const popupPreview = new PopupWithImage('#popup__img');
popupPreview.setEventListeners();

//попап NewPlace
const popupNewPlaceForm = new PopupWithForm('#popup__new-place', handleAddCardFormSubmit);

//добавление карточки на страницу по Input
function handleAddCardFormSubmit(data) {
  popupNewPlaceForm.submitText('Сохранение...');
  api
    .postCard(data['popup__input_name-place'], data['popup__input_link-place'])
    .then((data) => {
      const card = createCard({
        name: data.name,
        link: data.link,
        likes: data.likes,
        owner: data.owner,
        _id: data._id,
      });
      cardsList.addItem(card);
      popupNewPlaceForm.close();
    })
    .finally(() => {
      popupNewPlaceForm.submitText('Создать');
    })
    .catch((err) => {
      console.log(err);
    });
}

//Создание карточки
const createCard = (data) => {
  const card = new Card(data, '#card-template', {
    handlePreview: () => {
      popupPreview.open(data);
    },
    handleLike: handleLikeCard,
    handleDislike: handleDislikeCard,
    handleDelete: popupDelete.open,
  });
  return card.generateCard(userInfo.getId());
};

//Создание карточки handleLike
function handleLikeCard(card) {
  api
    .likeCard(card.getID())
    .then((newCard) => {
      card.counterCardLike(newCard);
    })
    .catch((err) => {
      console.log(err);
    });
}

//Создание карточки handleDislike
function handleDislikeCard(card) {
  api
    .dislikeCard(card.getID())
    .then((newCard) => {
      card.counterCardLike(newCard);
    })
    .catch((err) => {
      console.log(err);
    });
}

//попап EditProfile
const popupEditProfileForm = new PopupWithForm('#popup__edit-profile', handleProfileFormSubmit);

//попап EditProfile функция Сохранение изменений
function handleProfileFormSubmit(data) {
  popupEditProfileForm.submitText('Сохранение...');
  api
    .patchUserInfo(data.name, data.about)
    .then(() => {
      userInfo.setUserInfo({
        name: data.name,
        about: data.about,
        //avatar: data.avatar,
      });
      popupEditProfileForm.close();
    })
    .finally(() => {
      popupEditProfileForm.submitText('Сохранить');
    })
    .catch((err) => {
      console.log(err);
    });
}

//попап Avatar
const popupEditAvatarForm = new PopupWithForm('#popup__avatar', handleSubmitAvatarForm);

function handleSubmitAvatarForm(data) {
  popupEditAvatarForm.submitText('Сохранение...');
  api
    .editAvatar(data['popup__input_avatar'])
    .then(() => {
      userInfo.setUserAvatar({
        avatar: data['popup__input_avatar'],
      });
      popupEditAvatarForm.close();
    })
    .finally(() => {
      popupEditAvatarForm.submitText('Сохранить');
    })
    .catch((err) => {
      console.log(err);
    });
}

//попап EditProfile
const userInfo = new UserInfo(nameSelector, aboutSelector, avatarSelector);

//Добавление карточки
const cardsList = new Section((card) => {
  cardsList.addItem(createCard(card));
}, areaElements);

//Открыть EditProfile
buttonEditProfile.addEventListener('click', () => {
  const userData = userInfo.getUserInfo();
  popupEditProfileForm.setInputValues(userData);
  /*nameInput.value = userData.name;
  jobInput.value = userData.about;*/
  editFormValidator.resetValidation();
  popupEditProfileForm.open();
});

//Открыть EditAvatar
buttonEditAvatar.addEventListener('click', () => {
  avatarFormValidator.resetValidation();
  popupEditAvatarForm.open();
});

//Открыть NewPlace
addButton.addEventListener('click', () => {
  addCardFormValidator.resetValidation();
  popupNewPlaceForm.open();
});

//PopupConfirmDelete
const popupDelete = new PopupConfirmDelete(
  '#popup__delete-confirm',
  { formSelector: '.popup__form' },
  handleDeleteCard,
);

//Удаление карточки через popupDelete
function handleDeleteCard(card) {
  popupDelete.submitText('Удаление...');
  api
    .deleteCard(card.getID())
    .then(() => {
      card.deleteCard();
      popupDelete.close();
    })
    .finally(() => {
      popupDelete.submitText('Да');
    })
    .catch((err) => {
      console.log(err);
    });
}

popupDelete.setEventListeners();
popupNewPlaceForm.setEventListeners();
popupEditProfileForm.setEventListeners();
popupEditAvatarForm.setEventListeners();

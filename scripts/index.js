import Card from "./card.js";
import Section from "./Section.js";
import PopupWithForm from "./PopupWithForm.js";
import PopupWithImage from "./PopupWithImage.js";
import UserInfo from "./UserInfo.js";
import api from "./Api.js";
import PopupWithConfirmation from "./PopupWithConfirmation.js";

const editButton = document.querySelector(".profile__info_edit-button");
const formInputName = document.querySelector("#input-profile-name");
const formInputDesc = document.querySelector(".form__text-input_description");
const profileName = document.querySelector(".profile__info-name");
const profileDesc = document.querySelector(".profile__info_description");
const formProfile = document.querySelector(".form");
const popupProfileCloseButton = document.querySelector("#popup-profile-close");
const newPlaceTemplate = document.querySelector("#newplace-template");
const cardsContainer = document.querySelector(".elements");
const createNewPlaceButton = document.querySelector(".profile__add-button");
const popupNewPlaceCloseButton = document.querySelector(
  "#popup-newplace-close"
);
const inputPlaceName = document.querySelector("#input-place-name");
const inputPlaceImage = document.querySelector("#input-place-image");
const formNewPlace = document.querySelector("#form-new-place");

// POPUPS

// Instancia para actualizar el avatar del usuario

const popupProfile = new PopupWithForm("#popup-profile", () => {
  return api
    .updateUserProfile(formInputName.value, formInputDesc.value)
    .then(function () {
      profileName.textContent = formInputName.value;
      profileDesc.textContent = formInputDesc.value;
      // 👀 CONFIRMAR userInfo.setUserInfo({ name: data.name, about: data.about });
    })
    .catch(function (err) {
      console.error("Error al actualizar perfil:", err);
    });
});

//Agregar una nueva tarjeta
const popupNewPlace = new PopupWithForm("#popup-new-place", () => {
  const name = inputPlaceName.value;
  const link = inputPlaceImage.value;

  return api
    .createCard(name, link)
    .then(function (cardData) {
      const newCard = new Card(
        cardData.name,
        cardData.link,
        cardData.id,
        () => {
          popupImage.open(cardData.link, cardData.name);
        },
        api,
        () => {
          popupDeleteCard.open(newCard);
        }
      );
      cardsContainer.prepend(newCard.getHtmlCard());
    })
    .catch(function (err) {
      console.error("Error al crear tarjeta:", err);
    });
});

// Instancia cambiar de avatar
const profileImage = document.querySelector(".profile__image");
const popupUpdateAvatar = new PopupWithForm("#update-avatar", () => {
  const avatarUrl = document.querySelector("#input-avatar-image").value;

  return api
    .updateAvatar(avatarUrl)
    .then(() => {
      document.querySelector(".profile__image").src = avatarUrl;
    })
    .catch((err) => {
      console.error("Error al actualizar avatar:", err);
    });
});

popupUpdateAvatar.setEventListeners();

profileImage.addEventListener("click", () => {
  popupUpdateAvatar.open();
});

// Instancia popup para eliminar tarjeta
const popupDeleteCard = new PopupWithConfirmation("#delete-card", () => {
  if (popupDeleteCard.cardToDelete) {
    const cardId = popupDeleteCard.cardToDelete.cardId;
    api.deleteCard(cardId).then(() => {
      popupDeleteCard.cardToDelete.removeFromPage();
      popupDeleteCard.cardToDelete = null;
    });
  }
});

popupDeleteCard.setEventListeners();

popupProfile.setEventListeners();
popupNewPlace.setEventListeners();

//  Instancias de clases
const userInfo = new UserInfo({
  nameSelector: ".profile__info-name",
  hobbieSelector: ".profile__info_description",
  avatarSelector: ".profile__image",
});

const popupImage = new PopupWithImage("#image-expansion");
popupImage.setEventListeners();

const popupImageName = document.querySelector(".popup__image-name");
const imageExpansion = document.querySelector("#image-expansion");
const popupImageClose = document.querySelector("#popup-image-close");

// cerrar imagen ampliada
function closeImageExpansion() {
  imageExpansion.classList.remove("popup_opened");
}
popupImageClose.addEventListener("click", function () {
  closeImageExpansion();
});

editButton.addEventListener("click", () => popupProfile.open());
// formProfile.addEventListener("submit", handleChangeProfile);
popupProfileCloseButton.addEventListener("click", function () {
  closePopupProfile();
});

createNewPlaceButton.addEventListener("click", () => popupNewPlace.open());

function closePopupNewplace() {
  popupNewPlace.classList.remove("popup_opened");
}
popupNewPlaceCloseButton.addEventListener("click", function () {
  closePopupNewplace();
});

//Cargar la información del usuario desde el servidor
api
  .getUserInfo()
  .then(function (user) {
    userInfo.setUserInfo({
      name: user.name,
      about: user.about,
      avatar: user.avatar,
    });
  })
  .catch(function (err) {
    console.error("Error al cargar información del usuario:", err);
  });

// Crear tarjetas 👀 CONFIRMAR CÓDIGO
api.getInitialCards().then(function (initialCards) {
  const cardSection = new Section(
    {
      items: initialCards,
      renderer: (item) => {
        const newCard = new Card(
          item.name,
          item.link,
          item._id,
          () => {
            popupImage.open(item.link, item.name);
          },
          api,
          () => {
            popupDeleteCard.open(newCard);
          }
        );
        cardSection.addItem(newCard.getHtmlCard());
      },
    },
    ".elements"
  ); //".elements" es la seccion en HTML donde están las cartas
  cardSection.renderItems();
});

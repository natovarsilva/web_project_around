import Card from "./card.js";
import Section from "./Section.js";
import PopupWithForm from "./PopupWithForm.js";
import PopupWithImage from "./PopupWithImage.js";
// import UserInfo from "./UserInfo.js";
import api from "./Api.js";

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

// Popups
const popupProfile = new PopupWithForm("#popup-profile", () => {});
const popupNewPlace = new PopupWithForm("#popup-new-place", () => {
  // createCard();
  api.createCard(data.name, data.link).then(function (card) {
    //llamar al método que crea cartas en html
  });
});

popupProfile.setEventListeners();
popupNewPlace.setEventListeners();

// //  Instancias de clases
// const userInfo = new UserInfo({
//   nameSelector: ".profile__name",
//   hobbieSelector: ".profile__hobbie",
//   avatarSelector: ".profile__avatar",
// });

function handleChangeProfile(evt) {
  evt.preventDefault();
  profileName.textContent = formInputName.value;
  profileDesc.textContent = formInputDesc.value;
  popupProfile.classList.remove("popup_opened");
}

const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg",
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg",
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg",
  },
];

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
formProfile.addEventListener("submit", handleChangeProfile);
popupProfileCloseButton.addEventListener("click", function () {
  closePopupProfile();
});

createNewPlaceButton.addEventListener("click", () => popupNewPlace.open());

formNewPlace.addEventListener("submit", function (evt) {
  evt.preventDefault();
  const newCard = new Card(inputPlaceName.value, inputPlaceImage.value);
  cardsContainer.prepend(newCard.getHtmlCard());
  popupNewPlace.classList.remove("popup_opened");
});

function closePopupNewplace() {
  popupNewPlace.classList.remove("popup_opened");
}
popupNewPlaceCloseButton.addEventListener("click", function () {
  closePopupNewplace();
});

api.getUserInfo().then(function (user) {
  console.log("usuario obtenido", user); // BORRAR
  // userInfo.setUserInfo({ name: user.name, description: user.about });
});

api.getInitialCards().then(function (initialCards) {
  console.log("lista de cartas", initialCards); // sale, pero no la info de las cartas, BORRAR
  const cardSection = new Section(
    {
      items: initialCards,
      renderer: (item) => {
        const newCard = new Card(item.name, item.link, () => {
          popupImage.open(item.link, item.name);
        });
        cardSection.addItem(newCard.getHtmlCard());
      },
    },
    ".elements"
  ); //".elements" es la seccion en HTML donde están las cartas
  cardSection.renderItems();
});

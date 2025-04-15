import Card from "./card.js";
import Section from "./Section.js";
import Popup from "./Popup.js";
import PopupWithForm from "./PopupWithForm.js";

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
const popupProfile = new PopupWithForm("#popup-profile", () => {
  console.log("submit del perfil");
});
const popupNewPlace = new PopupWithForm("#popup-new-place", () => {
  // createCard();
  console.log("submit de la carta");
});

popupProfile.setEventListeners();
popupNewPlace.setEventListeners();

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

//SP11 borrar, se harán a través de una sección
// function cardsInitials() {
//   initialCards.forEach((item) => {
//     const newCard = new Card(item.name, item.link, openImagePopup);
//     cardsContainer.append(newCard.getHtmlCard());
//   });
// }

const cardSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const newCard = new Card(item.name, item.link, openImagePopup);
      cardSection.addItem(newCard.getHtmlCard());
    },
  },
  ".elements"
); //".elements" es la seccion en HTML donde están las cartas

cardSection.renderItems();

const popupImage = document.querySelector(".popup__image"); //ACTUALIZAR a new Popup
const popupImageName = document.querySelector(".popup__image-name");
const imageExpansion = document.querySelector("#image-expansion");
const popupImageClose = document.querySelector("#popup-image-close");
function openImagePopup(name, image) {
  imageExpansion.classList.add("popup_opened");
  document.addEventListener("keyup", keyHandler);
  popupImage.src = image;
  popupImageName.textContent = name;
}

// cerrar imagen ampliada
function closeImageExpansion() {
  imageExpansion.classList.remove("popup_opened");
}
popupImageClose.addEventListener("click", function () {
  closeImageExpansion();
});

// function createNewPlace(name, image) {
//   const newplaceCard = newPlaceTemplate
//     .cloneNode(true)
//     .content.querySelector(".elements__card");
//   const newplaceImage = newplaceCard.querySelector(".card__image");
//   const newplaceName = newplaceCard.querySelector(".card__content-text");
//   const cardLike = newplaceCard.querySelector(".card__content-like");
//   newplaceImage.src = image;
//   newplaceName.textContent = name;
//   cardsContainer.append(newplaceCard);
//   cardLike.addEventListener("click", function () {
//     cardLike.classList.toggle("card__content_like-active");
//   });

//   //eliminar carta
//   const cardTrash = newplaceCard.querySelector(".card__trash");
//   cardTrash.addEventListener("click", function () {
//     newplaceCard.remove();
//   });

//   // ampliar imagen
//   //mantener de aqui en adelante
//   newplaceImage.addEventListener("click", function () {
//     imageExpansion.classList.add("popup_opened");
//     document.addEventListener("keyup", keyHandler);
//     popupImage.src = image;
//     popupImageName.textContent = name;
//   });

//   // cerrar imagen ampliada
//   function closeImageExpansion() {
//     imageExpansion.classList.remove("popup_opened");
//   }
//   popupImageClose.addEventListener("click", function () {
//     closeImageExpansion();
//   });

//   console.log(newplaceCard);
// }

// cardsInitials();

editButton.addEventListener("click", () => popupProfile.open());
formProfile.addEventListener("submit", handleChangeProfile);
popupProfileCloseButton.addEventListener("click", function () {
  closePopupProfile();
});

//SP 11, abrir form crear carta no funciona ->
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

// salir del popup al presionar esc (se debe llamar a la funcion luego de .add popup_opened en cada popup)
function keyHandler(evt) {
  if (evt.key === "Escape") {
    popupNewPlace.classList.remove("popup_opened");
    popupProfile.classList.remove("popup_opened");
    imageExpansion.classList.remove("popup_opened");
  }
}

// salir del popup al hacer click afuera
popupNewPlace.addEventListener("click", function (evt) {
  if (evt.target.classList.contains("popup")) {
    popupNewPlace.classList.remove("popup_opened");
  }
});
popupProfile.addEventListener("click", function (evt) {
  if (evt.target.classList.contains("popup")) {
    popupProfile.classList.remove("popup_opened");
  }
});
imageExpansion.addEventListener("click", function (evt) {
  if (evt.target.classList.contains("popup")) {
    imageExpansion.classList.remove("popup_opened");
  }
});

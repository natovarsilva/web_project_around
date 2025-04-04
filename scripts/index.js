import Card from "./card.js";

const editButton = document.querySelector(".profile__info_edit-button");
const popupProfile = document.querySelector("#popup-profile");
const formInputName = document.querySelector("#input-profile-name");
const formInputDesc = document.querySelector(".form__text-input_description");
const profileName = document.querySelector(".profile__info-name");
const profileDesc = document.querySelector(".profile__info_description");
const formProfile = document.querySelector(".form");
const popupProfileCloseButton = document.querySelector("#popup-profile-close");
const newPlaceTemplate = document.querySelector("#newplace-template");
const cardsContainer = document.querySelector(".elements");
const popupNewPlace = document.querySelector("#popup-new-place");
const createNewPlaceButton = document.querySelector(".profile__add-button");
const popupNewPlaceCloseButton = document.querySelector(
  "#popup-newplace-close"
);
const inputPlaceName = document.querySelector("#input-place-name");
const inputPlaceImage = document.querySelector("#input-place-image");
const formNewPlace = document.querySelector("#form-new-place");

function handleOpenPopup() {
  popupProfile.classList.add("popup_opened");
  document.addEventListener("keyup", keyHandler);
}

function closePopupProfile() {
  popupProfile.classList.remove("popup_opened");
}

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

function cardsInitials() {
  initialCards.forEach((item) => {
    createNewplace(item.name, item.link);
  });
}

const prueba = new Card(
  prueba,
  "https://www.google.com/imgres?q=google%20foto&imgurl=https%3A%2F%2Fis1-ssl.mzstatic.com%2Fimage%2Fthumb%2FPurple221%2Fv4%2Fc6%2Fdc%2Fc5%2Fc6dcc5c7-0ae0-c5a4-43f2-9597cf753080%2Flogo_photos_color-0-0-1x_U007emarketing-0-0-0-6-0-0-0-85-220.png%2F1200x630wa.png&imgrefurl=https%3A%2F%2Fapps.apple.com%2Fco%2Fapp%2Fgoogle-fotos%2Fid962194608&docid=0KqMQwbxmgLBGM&tbnid=nDc2VmnqxdAHWM&vet=12ahUKEwin1YTtrL6MAxWZL0QIHYL8MBIQM3oECGQQAA..i&w=1200&h=630&hcb=2&ved=2ahUKEwin1YTtrL6MAxWZL0QIHYL8MBIQM3oECGQQAA"
);

console.log(prueba);
cardsContainer.append(prueba.getHtmlCard());
//se borra y se crea el append?
function createNewplace(name, image) {
  const newplaceCard = newPlaceTemplate
    .cloneNode(true)
    .content.querySelector(".elements__card");
  const newplaceImage = newplaceCard.querySelector(".card__image");
  const newplaceName = newplaceCard.querySelector(".card__content-text");
  const cardLike = newplaceCard.querySelector(".card__content-like");
  newplaceImage.src = image;
  newplaceName.textContent = name;
  cardsContainer.append(newplaceCard);
  cardLike.addEventListener("click", function () {
    cardLike.classList.toggle("card__content_like-active");
  });

  //eliminar carta
  const cardTrash = newplaceCard.querySelector(".card__trash");
  cardTrash.addEventListener("click", function () {
    newplaceCard.remove();
  });

  // ampliar imagen
  const popupImage = document.querySelector(".popup__image");
  const popupImageName = document.querySelector(".popup__image-name");
  const imageExpansion = document.querySelector("#image-expansion");
  const popupImageClose = document.querySelector("#popup-image-close");
  newplaceImage.addEventListener("click", function () {
    imageExpansion.classList.add("popup_opened");
    document.addEventListener("keyup", keyHandler);
    popupImage.src = image;
    popupImageName.textContent = name;
  });

  // cerrar imagen ampliada
  function closeImageExpansion() {
    imageExpansion.classList.remove("popup_opened");
  }
  popupImageClose.addEventListener("click", function () {
    closeImageExpansion();
  });

  console.log(newplaceCard);
}

cardsInitials();

editButton.addEventListener("click", handleOpenPopup);
formProfile.addEventListener("submit", handleChangeProfile);
popupProfileCloseButton.addEventListener("click", function () {
  closePopupProfile();
});

createNewPlaceButton.addEventListener("click", function () {
  popupNewPlace.classList.add("popup_opened");
  document.addEventListener("keyup", keyHandler);
});

formNewPlace.addEventListener("submit", function (evt) {
  evt.preventDefault();
  createNewplace(inputPlaceName.value, inputPlaceImage.value);
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
  console.log(evt.key);
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

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
    popupImage.src = image;
    popupImageName.src = name; //agregar el text content mismo proceso de la imagen
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

// agregar keydown
// eventTarget.addEventListener("keydown", (event) => {
//   if (event.popupNewPlace || event.keyCode === 27) {
//     return;
//   }
//   popupNewPlace.classList.remove("popup_opened");
// });
//---
function keyHandler(evt) {
  if (evt.keyCode === 27) {
    popupNewPlace.classList.remove("popup_opened");
  }
  console.log(evt.key);
}

// salir del popup al hacer click afuera
// document.addEventListener("click", (evt) => {
//   if (!evt.target.matches(popupNewPlace)) {
//     popupNewPlace.classList.remove("popup_opened");
//   } if (!evt.target.matches(popupProfile)) {
//     popupProfile.classList.remove("popup_opened");
//   }else (!evt.target.matches(popupImage)) {
//     popupImage.classList.remove("popup_opened");
// }});

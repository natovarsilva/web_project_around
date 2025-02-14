const editButton = document.querySelector(".profile__info_edit-button");
const popup = document.querySelector(".popup");
const formInputName = document.querySelector(".form__text-input_name");
const formInputDesc = document.querySelector(".form__text-input_description");
const profileName = document.querySelector(".profile__info-name");
const profileDesc = document.querySelector(".profile__info_description");
const formProfile = document.querySelector(".form");
const popupCloseButton = document.querySelector(".popup__close");

function handleOpenPopup() {
  popup.classList.add("popup_opened");
}

function closePopup() {
  popup.classList.remove("popup_opened");
}

function handleChangeProfile(evt) {
  evt.preventDefault();
  profileName.textContent = formInputName.value;
  profileDesc.textContent = formInputDesc.value;
  popup.classList.remove("popup_opened");
}

editButton.addEventListener("click", handleOpenPopup);
formProfile.addEventListener("submit", handleChangeProfile);
popupCloseButton.addEventListener("click", function () {
  closePopup();
});

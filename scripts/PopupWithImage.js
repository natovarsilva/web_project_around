import Popup from "./Popup.js";
export default class PopupWithImage extends Popup {
  constructor(popupSelector, handleImageExpansion) {
    super(popupSelector);
    this._popupImage = this._popupElement.querySelector(".popup__image");
    this._popupImageName =
      this._popupElement.querySelector(".popup__image-name");
  }

  open(link, name) {
    this._popupImage.src = link;
    this._popupImage.alt = name;
    this._popupImageName.textContent = name;
    super.open();
  }
}

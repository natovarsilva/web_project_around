import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._popupForm = this._popupElement.querySelector("#form-delete-card");
    this._handleFormSubmit = handleFormSubmit;
  }
  setEventListeners() {
    super.setEventListeners(); //esto trae el setEventListeners del Popup.js
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(); //ejecuta la funcion
      this.close(); // cierra de una vez el popup
    });
  }
  open(cardToDelete) {
    super.open();
    this.cardToDelete = cardToDelete;
  }
}

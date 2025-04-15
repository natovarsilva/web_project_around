export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
  }
  open() {
    this._popupElement.classList.add("popup_opened");
  }
  close() {
    this._popupElement.classList.remove("popup_opened");
  }
  escape(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }
  // clickOut(evt){
  // }
  setEventListeners() {
    this._popupElement
      .querySelector(".popup__close")
      .addEventListener("click", () => {
        this.close();
      });
    document.addEventListener("keyup", (evt) => {
      this.escape(evt);
    });
    this._popupElement.addEventListener("click", (evt) => {
      if (evt.target.classList.contains("popup")) {
        this.close();
      }
    });
  }
}

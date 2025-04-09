export default class Card {
  constructor(name, link, openImagePopup) {
    this.name = name;
    this.link = link;
    this.openImagePopup = openImagePopup;
  }
  cloneTemplate() {
    const newPlaceTemplate = document.querySelector("#newplace-template");
    return newPlaceTemplate
      .cloneNode(true)
      .content.querySelector(".elements__card");
  }
  generateCard() {
    this.card = this.cloneTemplate();
    this.cardTitle = this.card.querySelector(".card__content-text");
    console.log(this.card);
    this.cardImage = this.card.querySelector(".card__image");
    this.cardImage.src = this.link; // confirmar si está bien
    this.cardImage.alt = this.name;
    this.cardTitle.textContent = this.name;

    this.setEventListeners();
    return this.card;
  }

  setEventListeners() {
    this.cardTrash = this.card.querySelector(".card__trash");
    this.cardLike = this.card.querySelector(".card__content-like");

    this.cardTrash.addEventListener("click", () => {
      this.card.remove();
    });
    this.cardLike.addEventListener("click", () => {
      this.cardLike.classList.toggle("card__content_like-active");
    });
    this.cardImage.addEventListener("click", () => {
      this.openImagePopup(this.name, this.link);
    });
  }

  getHtmlCard() {
    return this.generateCard(); //genera la carta
  }
}

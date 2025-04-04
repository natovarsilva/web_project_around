export default class Card {
  constructor(name, link) {
    this.name = name;
    this.link = link;
  }
  cloneTemplate() {
    return newPlaceTemplate
      .cloneNode(true)
      .content.querySelector(".elements__card");
  }
  generateCard() {
    this.card = this.cloneTemplate();
    this.cardImage = this.card.querySelector(".popup__image");
    this.cardImage.src = this.image; // confirmar si está bien
    // borrar la carta, like a la carta, mostrar image de la carta?
    this.setEventListeners();
    return this.card;
  }

  setEventListeners() {
    this.card.addEventListener("click", () => {
      this.card.remove();
    });
    this.card.addEventListener("click", () => {
      this.card;
    });
  }

  getHtmlCard() {
    return this.generateCard(); //genera la carta
  }
}

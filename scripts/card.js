export default class Card {
  constructor(name, link, id, openImagePopup, apiInstance, popupDeleteCard) {
    this.name = name;
    this.link = link;
    this.cardId = id;
    this.openImagePopup = openImagePopup;
    this.api = apiInstance;
    this.popupDeleteCard = popupDeleteCard;
  }
  cloneTemplate() {
    const newPlaceTemplate = document.querySelector("#newplace-template");
    return newPlaceTemplate
      .cloneNode(true)
      .content.querySelector(".elements__card");
  }

  // Método para crear la tarjeta y asociar eventos
  generateCard() {
    this.card = this.cloneTemplate();
    this.cardTitle = this.card.querySelector(".card__content-text");
    this.cardImage = this.card.querySelector(".card__image");
    this.cardImage.src = this.link;
    this.cardImage.alt = this.name;
    this.cardTitle.textContent = this.name;
    this.cardTrash = this.card.querySelector(".card__trash");

    this.setEventListeners();
    return this.card;
  }

  // Instancia para borrar tarjeta, abrir popup
  setEventListeners() {
    this.cardTrash.addEventListener("click", () => {
      return this.popupDeleteCard();
      // .deleteCard(this.cardId)
      // .then(() => {
      //   this.card.remove();
      // })
      // .catch((err) => {
      //   console.error("Error al eliminar tarjeta:", err);
      // });
    });

    // Instancia para activar/desactivar el like
    this.cardLike = this.card.querySelector(".card__content-like");

    this.cardLike.addEventListener("click", () => {
      const isLiked = this.cardLike.classList.contains(
        "card__content_like-active"
      );

      if (isLiked) {
        this.api
          .removeLike(this.cardId)
          .then(() => {
            this.cardLike.classList.toggle("card__content_like-active");
          })
          .catch((err) => {
            console.error("Error al alternar me gusta:", err);
          });
      } else {
        this.api
          .addLike(this.cardId)
          .then(() => {
            this.cardLike.classList.toggle("card__content_like-active");
          })
          .catch((err) => {
            console.error("Error al alternar me gusta:", err);
          });
      }

      // apiMethod(this.cardId)
      //   .then(() => {
      //     this.cardLike.classList.toggle("card__content_like-active");
      //   })
      //   .catch((err) => {
      //     console.error("Error al alternar me gusta:", err);
      //   });
    });

    this.cardImage.addEventListener("click", () => {
      this.openImagePopup(this.name, this.link);
    });
  }

  getHtmlCard() {
    return this.generateCard(); //genera la carta
  }

  removeFromPage() {
    this.card.remove();
  }
}

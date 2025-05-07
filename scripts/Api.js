class Api {
  constructor(baseUrl, headers) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  // Cargar la info del usuario
  getUserInfo() {
    //llamar a api para que envíe la info de mi usuario
    return fetch(`${this.baseUrl}/users/me`, {
      method: "GET",
      headers: this.headers,
      //{
      //   authorization: "c56e30dc-2883-4270-a59e-b2f7bae969c6",
      // },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
    });
  }

  // Cargar las tarjetas desde el servidor
  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {
      method: "GET",
      headers: this.headers,
      //{
      //   authorization: "c56e30dc-2883-4270-a59e-b2f7bae969c6",
      // },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
    });
  }

  createCard(name, link) {
    return fetch(`${this.baseUrl}/cards`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        //acá se incluye toda la info que se quiere mandar
        name, //no es necesario escribir "name: name" porque tienen el mismo nombre
        link,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
    });
  }

  updateUserProfile() {}
}

const api = new Api({
  baseUrl: "https://around-api.es.tripleten-services.com/v1",
  headers: {
    authorization: "c9e44532-fd0e-4ecd-856f-5575f38b040f", //recibir de parte de Andrea
    "Content-type": "application/json",
  },
});

export default api;

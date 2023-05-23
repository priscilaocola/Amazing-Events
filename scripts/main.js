// todo nuevo con vueJs

const app = Vue.createApp({
  data() {
    return {
      infoDeApi: [],
      inputSearch:"",
      categorias: [],
      chequeados: [],
      eventosFiltrados: [],
    };
  },
  created() {
    fetch(`https://mindhub-xj03.onrender.com/api/amazing`)
      .then((res) => res.json())
      .then((datos) => {
        this.infoDeApi = datos.events;
        let category = this.infoDeApi.map((item) => item.category);
        let arraySet = Array.from(new Set(category));
        this.categorias = arraySet;
        console.log(this.eventosFiltrados);
        this.eventosFiltrados = this.infoDeApi;
      })
      .catch((error) => console.log(error));
  },
  computed: {
    filtro() {
  this.eventosFiltrados = this.infoDeApi.filter((evento) =>
          evento.name.toLowerCase().includes(this.inputSearch.toLowerCase()) &&
          (this.chequeados.includes(evento.category) ||
            this.chequeados.length == 0)
      );
    },
  },
});
app.mount("#app");

// cards dinamicas =====>

// let cards = document.getElementById("mainCards");
// let contenedorCheck = document.getElementById("contenedorCheck");
// let inputSearch = document.getElementById("inputSearch");
// let infoDeApi

// fetch (`https://mindhub-xj03.onrender.com/api/amazing`)
// .then(res => res.json())
// .then(datos =>{
//  infoDeApi = datos
//  printCards(infoDeApi.events, cards);
//  let arrayfiltro = infoDeApi.events.map(item => item.category)
//  let newArrayFiltrado = [...new Set(arrayfiltro)]
//  printCheck(newArrayFiltrado, contenedorCheck);

// })

// function planoCard(obj) {
//   return `<div class="card mt-3 mb-3" style="width: 18rem;">
//             <img src=${obj.image} class="card-img-top p-3" alt="food fair">
//             <div class="card-body fw-semibold">
//             <h5 class="card-title text-center">${obj.name}</h5>
//             <p class="cardp card-text">${obj.description}</p>
//             </div>
//             <div class="card-footer d-flex justify-content-between align-items-center">
//             <h6>Price: ${obj.price}</h6>
//             <a href="./../pages/details.html?_id=${obj._id}" class="btn btn-primary">Details</a>
//             </div>
//             </div> `;
// }
// function printCards(datos, lugar) {
//   let template = "";
//   for (let temple of datos) {
//     template += planoCard(temple);
// }
// lugar.innerHTML = template;
// }

// // ==============================
// // task 3

// // checks dinamicos

// function mostraCheckbox(data) {
//   return `
//   <div class="form-check d-flex justify-content-center">
// <input class="form-check input justify-content-center" type="checkbox" value="${data}" id="${data}" >
// <label class="form-check-label" for="${data}">${data}</label>
// </div> `;
// }

// function printCheck(data, contenedorCheck) {
//   let template = ``
//   for (let item of data) {
//     template += mostraCheckbox(item)
//   }
//   contenedorCheck.innerHTML = template;
// }

// inputSearch.addEventListener("input", () => {
//   filtroDoble();
// });
// contenedorCheck.addEventListener("change", () => {
//   filtroDoble();
// });

// function filtroSearch(array, valueSearch) {
//   let filtro = array.filter((item) =>item.name.toLowerCase().includes(valueSearch.toLowerCase()))
//   return filtro;
// }

// function filtroInput(eventos, category) {
//   if (category.length == 0) {
//     return eventos;
//   }
//   return eventos.filter((evento) => category.includes(evento.category));
// }

// function filtroDoble() {
//   let checkeados = Array.from( document.querySelectorAll('input[type="checkbox"]:checked')).map((item) => item.value);
//   let filtrobusqueda = filtroSearch(infoDeApi.events, inputSearch.value);
//   let nuevofiltro = filtroInput(filtrobusqueda , checkeados);
//   printCards(nuevofiltro, cards);
// }

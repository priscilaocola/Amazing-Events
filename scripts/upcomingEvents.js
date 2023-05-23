let { createApp } = Vue
console.log(Vue)

let app = createApp({
  data() {
    return {
      infoDeApi: [],
      categorias: [],
      categoriasFiltro: [],
      filtradosUp: [],
      inputSearch: "",
      chequeados: [],
      eventosFiltrados:[],
    }
  },

  created(){

    fetch(`https://mindhub-xj03.onrender.com/api/amazing`)
      .then(res => res.json())
      .then(datos => {
        this.infoDeApi = datos.events
        this.filtradosUp = this.infoDeApi.filter(event => event.date > datos.currentDate)
        let category = this.infoDeApi.map((item) => item.category);
        let arraySet = Array.from(new Set(category));
        this.categorias = arraySet;
        this.eventosFiltrados = this.infoDeApi;
      }).catch((error) => console.log(error));
    },
   
    computed: {
      filtro() {
        this.eventosFiltrados = this.filtradosUp.filter(evento =>
            evento.name.toLowerCase().includes(this.inputSearch.toLowerCase()) &&
            (this.chequeados.includes(evento.category) ||this.chequeados.length == 0));
      },
    }, 
})
app.mount("#app");







// let upcoming = document.getElementById("upcoming-cards");
// let contenedorCheck = document.getElementById("contenedorCheck");
// let inputSearch = document.getElementById("inputSearch");
// let infoDeApi

// // fetch

 
// fetch (`https://mindhub-xj03.onrender.com/api/amazing`)
// .then(res => res.json())
// .then(datos =>{
//  infoDeApi = datos
//  const eventosFiltrados = infoDeApi.events.filter(event => event.date > infoDeApi.currentDate);
//  printCards(eventosFiltrados, upcoming)
//  let arrayfiltro = infoDeApi.events.map(item => item.category)
//  let newArrayFiltrado = [...new Set(arrayfiltro)]
//  printCheck(newArrayFiltrado, contenedorCheck);

// })


// // cards dinamico
// function planoCards(objeto) {
//   return `
//       <div class="card mt-3 mb-3" style="width: 18rem;">
//       <img src="${objeto.image}" class="card-img-top object-fit-cover p-3" alt="cine img">
//       <div class="card-body text-center fw-semibold">
//       <h5 class="card-title">${objeto.name}</h5>
//       <p class="card-text">${objeto.description}</p>
//       </div>
//       <div class="card-footer d-flex justify-content-between align-items-center">
//       <h6 class="m-0">$${objeto.price}</h6>
//       <a href="../pages/details.html?_id=${objeto._id}" class="btn btn-primary">Details</a>
//       </div>
//       </div>
//   `;
// }


// function printCards(list, lugar) {
//   let template = "";
//   for (let temple of list) {
//     template += planoCards(temple)
//   }
//   lugar.innerHTML = template
// }

// // task3 =====
// // check dinamicos

// function mostraCheckbox(data) {
//   return `
//   <div class="form-check d-flex">
// <input class="form-check input" type="checkbox" value="${data}" id="${data}" >
// <label class="form-check-label" for="${data}">${data}</label>
// </div> `

// }

// function printCheck(data, contenedorCheck) {
//   let template = ""
//   for (let item of data) {
//     template += mostraCheckbox(item)
//   }
//   contenedorCheck.innerHTML = template;
// }

// inputSearch.addEventListener("input", () => {

//   filtroDoble()
// });

// function filtroSearch(array, valueSearch) {
//   let filtro = array.filter(item => item.name.toLowerCase().includes(valueSearch.toLowerCase().trim()))
//   return filtro
// }

// contenedorCheck.addEventListener("input", () => {
  
// filtroDoble()

// })

// function filtroInput(eventos, category) {
//   if (category.length == 0) {
//     return eventos
//   }
//   return eventos.filter(item => category.includes(item.category) )
// }

// function filtroDoble() {
//  let checkboxcap = Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(check => check.value )
//   let filtro = filtroSearch(infoDeApi.events, inputSearch.value)
//   let nuevofiltro = filtroInput(filtro, checkboxcap)

//   printCards(nuevofiltro, upcoming)
// }







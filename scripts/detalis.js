
let { createApp } = Vue;

createApp({
  data() {
    return {
      eventosDetalis: [],
      getId: null
    };
  },
  created() {
    fetch(`https://mindhub-xj03.onrender.com/api/amazing`)
      .then((res) => res.json())
      .then((datos) => {
        let infoDeApi = datos;
        let param = new URLSearchParams(location.search)
        let getId = param.get('_id');
 
        this.eventosDetalis = infoDeApi.events.find(event => event._id == getId);  
        
      }).catch((error) => console.error(error));
  },
})
.mount("#app");


// fetch(`https://mindhub-xj03.onrender.com/api/amazing`)
//   .then(res => res.json())
//   .then(datos => {
//     infoDeApi = datos

// let urlParametro = new URLSearchParams(location.search);
// let getId = urlParametro.get("_id");
// let buscadorId = infoDeApi.events.find((d) => d._id == getId);

// contenedor.innerHTML = `<div class="col-12 col-md-6">
//         <img src=${buscadorId.image} class="w-100 h-100 object-fit-cover rounded-start" alt="...">
//       </div>
//       <div class="col-12 col-md-6 bg-light">
//         <div class="card-body d-flex flex-column align-items-center bg-light fw-bold">
//           <h5 class="card-title details-title mb-5"> ${buscadorId.name}</h5>
//           <ul>
//             <li class="list">Date: ${buscadorId.date}</li>
//             <li class="list">Description: ${buscadorId.description}</li>
//             <li class="list">Category:${buscadorId.category}</li>
//             <li class="list">Place: ${buscadorId.place}</li>
//             <li class="list">Capacity: ${buscadorId.capacity}</li>
//             <li class="list">Price: ${buscadorId.price}</li>
//           </ul>
//           </div>
//         </div>`;
//       })
    
 

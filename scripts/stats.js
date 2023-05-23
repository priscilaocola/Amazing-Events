let { createApp } = Vue

createApp({
    data() {
      return {
        eventos: [],
        mostraEventos: [],
        categorias: [],
        filtroEventosPasados: [],
        eventosFuturos: [],
        mayorAsistencia: "",
        menorAsistencia: "",
        mayorCapacidad: "",
        arraysCategoriasFuturas: [],
        ObjetoCategoriaFuturas: {},
        arraysCategoriasPasadas: [],
        ObjetoCategoriaPasadas: {},
      };
    },
    created() {
      fetch( "https://mindhub-xj03.onrender.com/api/amazing")
        .then((res) => res.json())
        .then((data) => {
          this.eventos = data.events;
          const currentDate = data.currentDate;
          this.mostraEventos = this.eventos;
          this.getCategorias(this.eventos);
         
          this.filtroEventosPasados = this.eventos.filter(
            (evento) => evento.date < currentDate
          );
          
          this.filtroEventosFuturos = this.eventos.filter(
            (evento) => evento.date > currentDate
          );
         
          let categoriasSinRepetir = Array.from(
            new Set(this.eventos.map((categoria) => categoria.category))
          );
        
          this.mayorAsistencia = this.eventoMayorAsistencia(this.eventos);
          this.menorAsistencia = this.eventoMenorAsistencia(this.eventos);
          this.mayorCapacidad = this.eventoMasCapacidad(this.eventos)
         
          const categoriasPasadas = this.arrayEventos(categoriasSinRepetir, this.filtroEventosPasados);
          console.log(categoriasPasadas)
          this.objetoGananciaPorcentaje(categoriasPasadas, this.ObjetoCategoriaPasadas)
          
     
          const categoriasFuturas = this.arrayEventos(categoriasSinRepetir, this.filtroEventosFuturos);
          console.log(categoriasFuturas)
          this.objetoGananciaPorcentaje(categoriasFuturas, this.ObjetoCategoriaFuturas)
        })
        .catch((error) => console.error(error));
    },
    methods: {
      getCategorias(array) {
        this.categorias = [...new Set(array.map((item) => item.category))];
      },
  
      eventoMayorAsistencia(data) {
        const array = data.slice();
  
        let porcentaje = (evento) => (evento.assistance / evento.capacity) * 100;
  
        array.sort((a, b) => {
          return porcentaje(b) - porcentaje(a);
        });
  
        return `${array[0].name} | ${porcentaje(array[0]).toFixed(2)}%`;
      },
  
      eventoMenorAsistencia(data) {
        const array = data.slice();
  
        let porcentaje = (evento) => (evento.assistance / evento.capacity) * 100;
  
        array.sort((a, b) => {
          return porcentaje(a) - porcentaje(b);
        });
  
        return `${array[0].name} | ${porcentaje(array[0]).toFixed(2)}%`;
      },
  
      eventoMasCapacidad(data) {
        const array = data.slice();
  
        array.sort((a, b) => {
          return b.capacity - a.capacity;
        });
  
        return `${array[0].name} | ${array[0].capacity}`;
      },
  
      /*  */
      arrayEventos(array, filtro){
        const arraysCategorias = array.reduce((acumulador, categoria) => {
          const objetosCategoria = filtro.filter(
            (objeto) => objeto.category === categoria
          );
          if(objetosCategoria.length != 0){
            acumulador[categoria] = objetosCategoria;
          }
          return acumulador;
        }, []);
        return arraysCategorias;
      },
  
      objetoGananciaPorcentaje(array, objetoAmodificar){
        for (const categoria in array) {
          const itemsCategoria = array[categoria];
    
          let gananciaTotal = 0;
          let porcentajeTotal = 0;
          for (let i = 0; i < itemsCategoria.length; i++) {
            const item = itemsCategoria[i];
            const gananciaItem = item.price * (item.assistance ? item.assistance : item.estimate);
            const porcentaje = (((item.assistance ? item.assistance : item.estimate) / item.capacity) * 100)/itemsCategoria.length
            gananciaTotal += gananciaItem;
            porcentajeTotal += porcentaje;
          }
    
           objetoAmodificar[categoria] = {
            nombre: categoria,
            ganancia: gananciaTotal.toLocaleString(),
            porcentaje: porcentajeTotal.toFixed(2),
          };
        }
      },
      
  
      
    },
    computed: {
      
    },
  }).mount("#app");





// let tables = document.getElementById("tablaEventos");

// let dataS;
// let infoDeApi;
// fetch("https://mindhub-xj03.onrender.com/api/amazing")
//     .then((response) => response.json())
//     .then((data) => {
//         dataS = data;
//         infoDeApi = data.events;

//         let eventsPasado = infoDeApi.filter((event) => event.date <= dataS.currentDate);

//         let eventsFuture = infoDeApi.filter((event) => event.date >= dataS.currentDate);

//         let categoriaPast = Array.from(new Set(eventsPasado.map((event) => event.category)));

//         let categoriaUpcoming = Array.from(new Set(eventsFuture.map((event) => event.category)));

//         //mayor porcentaje de asistencia
//         function mayorAsistencia(events) {
//             let porcentaje = 0;
//             let nombre = " ";
//             events.forEach((event) => {
//                 let valor = (event.assistance / event.capacity) * 100;

//                 if (valor > porcentaje) {
//                     porcentaje = valor;
//                     nombre = event.name;
//                 }
//             });
//             return ` ${nombre} , ${porcentaje.toFixed(2)}%`;
//         }

//         // menor porcentaje de asistencia
//         function menorAsistencia(events) {
//             let porcentaje = 100;
//             let nombre = " ";
//             events.forEach((event) => {
//                 let valor = (event.assistance / event.capacity) * 100;

//                 if (valor < porcentaje) {
//                     porcentaje = valor;
//                     nombre = event.name;
//                 }
//             });
//             return ` ${nombre} , ${porcentaje.toFixed(2)}%`;
//         }

//         //  mayor capacidad

//         function mayorCapacidad(events) {
//             let capacidad = 0;
//             let nombre = " ";
//             events.forEach((event) => {
//                 if (event.capacity > capacidad) {
//                     capacidad = event.capacity;
//                     nombre = event.name;
//                 }
//             });
//             return ` ${nombre} , ${capacidad}`;
//         }

//         let tableUna = document.createElement("table");
//         tableUna.innerHTML = `<caption colspan="3" class="event1 text-center caption-top"><strong>Event statistics</strong></caption>
//     <thead>

//       <tr class="text-center fw-semibold bg-primary fs-6" >
//         <th>Events with the highest percentage of attendance</th>
//         <th>Events with the lowest percentage of attendance</th>
//         <th>Event with larger capacity</th>
//       </tr>
//     </thead>
//     <tbody>
//         <tr>
//             <td> ${mayorAsistencia(eventsPasado)} </td>
//             <td> ${menorAsistencia(eventsPasado)} </td>
//             <td> ${mayorCapacidad(eventsPasado)} </td>
//         </tr>
//     </tbody>`;

//         ////////////////////////////  UPCOMING //////////////////////////////////////////////////////////

//         function infoTablafuturo(categorias, events) {
//             let resultado = [];

//             console.log(resultado);

//             // Iterar por cada categoría
//             categorias.map((category) => {
//                 // Filtrar eventos por categoría
//                 let categoriaEvents = events.filter(
//                     (event) => category == event.category
//                 );
//                 console.log(categoriaEvents);

//                 let revenues = calcularRevenues(categoriaEvents);

//                 let attendance = Attendance(categoriaEvents);

//                 resultado.push({
//                     category,
//                     revenues,
//                     attendance: attendance / categoriaEvents.length,
//                 });
//             });

//             return resultado;
//         }

//         // Función para calcular los ingresos totales
//         function calcularRevenues(events) {
//             let total = 0;
//             events.forEach((event) => {
//                 total += event.price * (event.estimate || event.assistance);
//             });
//             return total;
//         }

//         // Función para calcular el porcentaje de asistencia promedio
//         function calcularAttedance(events) {
//             let totalAttendance = 0;
//             events.forEach((event) => {
//                 totalAttendance +=
//                     ((event.assistance || event.estimate) / event.capacity) * 100;
//             });
//             return totalAttendance;
//         }

//         const infoTablafuturoConst = infoTablafuturo(
//             categoriaUpcoming,
//             eventsFuture
//         );

//         //Tabla Upcoming

//         let tablaDos = document.createElement("table");
//         let tBody = document.createElement("tbody");
//         tablaDos.innerHTML = `<caption class="event1 text-center caption-top"><strong>Upcoming events statistics by category</strong></caption>
//     <thead>
//       <tr>
//         <th>Categories</th>
//         <th>Revenues</th>
//         <th>Percentage of attendance</th>
//       </tr>
//     </thead>`;

//         infoTablafuturoConst.forEach((eventos) => {
//             let crearTr = document.createElement("tr");
//             crearTr.innerHTML = `<td>${eventos.category}</td>
//       <td> $ ${eventos.revenues.toLocaleString()}</td>
//       <td>${eventos.attendance.toFixed(2)} %</td>`;
//             tBody.appendChild(crearTr);
//         });

//         tablaDos.appendChild(tBody);

//         /////////////////////////////// PAST EVENTS ////////////////////////////////////////////////////

//         // Funciones

//         function tablaEventosPasado(categorias, events) {
//             let resultado = [];

//             console.log(resultado);


//             categorias.map((category) => {

//                 let categoriaEvents = events.filter((event) => category == event.category);
//                 console.log(categoriaEvents);

//                 let revenues = calcularRevenues(categoriaEvents);
//                 console.log(revenues);

//                 let attendance = calcularAttedance(categoriaEvents);
//                 console.log(attendance);

//                 //  ****************
//                 resultado.push({
//                     category,
//                     revenues,
//                     attendance: attendance / categoriaEvents.length,
//                 });
//             });

//             return resultado;
//         }


//         function calcularRevenues(events) {
//             let total = 0;
//             events.forEach((event) => {
//                 total += event.price * (event.estimate || event.assistance);
//             });
//             return total;
//         }


//         function Attendance(events) {
//             let totalAttendance1 = 0;
//             events.forEach((event) => {
//                 totalAttendance1 +=
//                     ((event.assistance || event.estimate) / event.capacity) * 100;
//             });
//             return totalAttendance1;
//         }

//         const tablaPasadoUp = tablaEventosPasado(
//             categoriaPast,
//             eventsPasado
//         );

//         //Tabla Upcoming -

//         let tablaTres = document.createElement("table");
//         let tBodyTres = document.createElement("tbody");
//         tablaTres.className = "inf2 m-1";
//         tablaTres.innerHTML = `<caption class="event1 text-center caption-top"><strong>Past events statistics by category</strong></caption>
//     <thead>
//       <tr>
//         <th>Categories</th>
//         <th>Revenues</th>
//         <th>Percentage of attendance</th>
//       </tr>
//     </thead>`;

//         tablaPasadoUp.forEach((eventos) => {
//             let crearTr = document.createElement("tr");
//             crearTr.innerHTML = `<td>${eventos.category}</td>
//       <td> $ ${eventos.revenues.toLocaleString()}</td>
//       <td>${eventos.attendance.toFixed(2)} %</td>`;
//             tBodyTres.appendChild(crearTr);
//         });

//         tablaTres.appendChild(tBodyTres);

//         //print tablas

//         tables.append(tableUna, tablaDos, tablaTres);
//     })
//     .catch((error) => console.log(error));

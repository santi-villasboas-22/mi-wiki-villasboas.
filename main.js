// Índice automático
const listaIndice = document.querySelector("#indice");
const titulosSecciones = document.querySelectorAll("main h2");

titulosSecciones.forEach((titulo) => {
    const itemIndice = document.createElement("li");
    const enlaceIndice = document.createElement("a");

    enlaceIndice.textContent = titulo.textContent.trim();
    enlaceIndice.href = "#" + titulo.id;

    itemIndice.appendChild(enlaceIndice);
    listaIndice.appendChild(itemIndice);
});

// Modo oscuro
const cuerpoPagina = document.body;
const botonModo = document.querySelector("#botonModo");

botonModo.addEventListener("click", () => {
    const estaOscuro = cuerpoPagina.classList.toggle("modo-oscuro");
    botonModo.textContent = estaOscuro ? "Modo claro" : "Modo oscuro";
});

// Tamaño del texto
const articulo = document.querySelector("main");
const botonPequeno = document.querySelector("#botonPequeno");
const botonEstandar = document.querySelector("#botonEstandar");
const botonGrande = document.querySelector("#botonGrande");
const botonesTamano = [botonPequeno, botonEstandar, botonGrande];

const elegirTamano = (botonElegido, claseTamano) => {
    articulo.classList.remove("texto-pequeno", "texto-grande");
    if (claseTamano) {
        articulo.classList.add(claseTamano);
    }
    botonesTamano.forEach((boton) => boton.classList.remove("activo"));
    botonElegido.classList.add("activo");
};

botonPequeno.addEventListener("click", () => elegirTamano(botonPequeno, "texto-pequeno"));
botonEstandar.addEventListener("click", () => elegirTamano(botonEstandar, null));
botonGrande.addEventListener("click", () => elegirTamano(botonGrande, "texto-grande"));

// Secciones plegables
titulosSecciones.forEach((titulo) => {
    titulo.addEventListener("click", () => {
        titulo.closest("section").classList.toggle("plegada");
    });
});

// Discusión
const formularioComentario = document.querySelector("#formularioComentario");
const campoNombre = document.querySelector("#campoNombre");
const campoComentario = document.querySelector("#campoComentario");
const contadorCaracteres = document.querySelector("#contadorCaracteres");
const avisoFormulario = document.querySelector("#avisoFormulario");
const listaComentarios = document.querySelector("#listaComentarios");
const minimoCaracteres = 10;
const maximoCaracteres = 200;

campoComentario.addEventListener("input", () => {
    contadorCaracteres.textContent = campoComentario.value.length + " / " + maximoCaracteres;
});

formularioComentario.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const nombre = campoNombre.value.trim();
    const comentario = campoComentario.value.trim();
    const avisos = [];

    campoNombre.classList.remove("campo-error");
    campoComentario.classList.remove("campo-error");
    avisoFormulario.textContent = "";

    if (nombre === "") {
        avisos.push("El nombre no puede estar vacío.");
        campoNombre.classList.add("campo-error");
    }

    if (comentario.length < minimoCaracteres || comentario.length > maximoCaracteres) {
        avisos.push("El comentario debe tener entre " + minimoCaracteres + " y " + maximoCaracteres + " caracteres.");
        campoComentario.classList.add("campo-error");
    }

    if (avisos.length > 0) {
        avisoFormulario.textContent = avisos.join(" ");
        return;
    }

    const itemComentario = document.createElement("li");
    const nombreComentario = document.createElement("strong");
    const textoComentario = document.createElement("p");
    const botonBorrar = document.createElement("button");

    nombreComentario.textContent = nombre;
    textoComentario.textContent = comentario;
    botonBorrar.type = "button";
    botonBorrar.textContent = "Borrar";

    botonBorrar.addEventListener("click", () => {
        itemComentario.remove();
    });

    itemComentario.appendChild(nombreComentario);
    itemComentario.appendChild(textoComentario);
    itemComentario.appendChild(botonBorrar);
    listaComentarios.appendChild(itemComentario);

    formularioComentario.reset();
    contadorCaracteres.textContent = "0 / " + maximoCaracteres;
});
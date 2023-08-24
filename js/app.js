AOS.init({
  duration: 2200,
})

const toggleTheme = document.getElementById('toggle-theme');
const toggleText = document.getElementById('toggle-text');
const toggleIcon = document.getElementById('toggle-icon');

//cambiar los colores del contenido en la página
const toggleColors = document.getElementById('toggle-colors');
const rootStyles = document.documentElement.style;
//cambiar el idioma de la página
const flagsElement = document.getElementById('flags');
const textsToChange = document.querySelectorAll('[data-section]');

const changeLanguage = async (languaje) => {
  const requestJson = await fetch(`./languajes/${languaje}.json`);
  const texts = await requestJson.json();

  for (const textToChange of textsToChange) {
    const section = textToChange.dataset.section;
    const value = textToChange.dataset.value;

    textToChange.innerHTML = texts[section][value];
  }
  // Guardar el idioma seleccionado por el usuario en localStorage
  localStorage.setItem('userLanguage', languaje);

};

flagsElement.addEventListener('click', (e) => {
  changeLanguage(e.target.parentElement.dataset.languaje);
});


// Función para actualizar el texto e icono SVG según la configuración del usuario
function updateUIToUserConfig(config) {
  document.body.classList.toggle('dark', config.darkMode);
  toggleIcon.src = config.darkMode ? 'assets/icons/moon.svg' : 'assets/icons/sun.svg';
  toggleText.textContent = config.darkMode ? 'Dark Mode' : 'Light Mode';

  // Establecer el idioma seleccionado por el usuario, en caso de que exista
  const userLanguage = localStorage.getItem('userLanguage');
  if (userLanguage) {
    changeLanguage(userLanguage);
  }
}

// Recuperar la configuración del usuario del localStorage (si existe)
const userConfig = JSON.parse(localStorage.getItem('userConfig')) || { darkMode: false };
updateUIToUserConfig(userConfig);

toggleTheme.addEventListener('click', () => {
  // Cambiar el modo entre claro y oscuro
  const isDarkMode = document.body.classList.toggle('dark');

  // Guardar la configuración del usuario en localStorage
  const userConfig = {
    darkMode: isDarkMode
  };
  localStorage.setItem('userConfig', JSON.stringify(userConfig));

  // Actualizar el texto e icono SVG en tiempo real
  updateUIToUserConfig(userConfig);
});

// Función para actualizar el color seleccionado en la interfaz y guardar en localStorage
function updateColorToUserConfig(color) {
  rootStyles.setProperty('--primary-color', color);
  // Guardar el color seleccionado por el usuario en localStorage
  localStorage.setItem('userColor', color);
}

// Recuperar el color seleccionado por el usuario del localStorage (si existe)
const userColor = localStorage.getItem('userColor');
if (userColor) {
  updateColorToUserConfig(userColor);
}

toggleColors.addEventListener('click', (e) => {
  const selectedColor = e.target.dataset.color;
  updateColorToUserConfig(selectedColor);
});

//función para mover el circulo de las tarjetas con blur en before de .card solo en el modo noche

const cards = document.querySelectorAll('.card');

cards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();

    const left = e.clientX - rect.left;
    const top = e.clientY - rect.top;

    card.style.setProperty('--left', `${left}px`);
    card.style.setProperty('--top', `${top}px`);
  });
});

/* Para que funcione el efecto typing con la libreria Typed.js */

const typed = new Typed('.typed', {
  /*strings: [
    '<i class="profession" data-section="professions" data-value="profession1">Ingeniero en Sistemas</i>',
    '<i class="profession" data-section="professions" data-value="profession2">Programador Web</i>',
    '<i class="profession" data-section="professions" data-value="profession3">Diseñador Web</i>',
    '<i class="profession" data-section="professions" data-value="profession2">Editor de Contenido Digital</i>'
  ],*/
  stringsElement: '#cadenas-texto', // ID del elemento que contiene cadenas de texto a mostrar.
  typeSpeed: 75, // Velocidad en mlisegundos para poner una letra,
  startDelay: 1050, // Tiempo de retraso en iniciar la animacion. Aplica tambien cuando termina y vuelve a iniciar,
  backSpeed: 75, // Velocidad en milisegundos para borrrar una letra,
  smartBackspace: true, // Eliminar solamente las palabras que sean nuevas en una cadena de texto.
  shuffle: false, // Alterar el orden en el que escribe las palabras.
  backDelay: 1500, // Tiempo de espera despues de que termina de escribir una palabra.
  loop: true, // Repetir el array de strings
  loopCount: false, // Cantidad de veces a repetir el array.  false = infinite
  showCursor: true, // Mostrar cursor palpitanto
  cursorChar: '_', // Caracter para el cursor
  contentType: 'html', // 'html' o 'null' para texto sin formato
});

const numero = document.getElementById('numero');
let Cantidad = 0;

let tiempo = setInterval(() => {
  if (Cantidad < 5) {
    Cantidad++;
    numero.textContent = Cantidad;
  }
}, 500);
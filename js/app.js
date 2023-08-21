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
"use strict";

// Récupérer les boutons
var menuBtn = document.querySelector(".menu_btn");
var rotatableBtn = document.querySelector(".rotatable");
var retour = document.querySelector(".retour");

// Ajouter un event listener sur les bouton principaux
menuBtn.addEventListener("click", toggleMenu);
retour.addEventListener("click", closeSousMenu);

// Fonction pour toggle le menu principal
function toggleMenu() {
  var menu = document.querySelector(".menu");
  menu.classList.toggle("menu--open");
}

// Ajouter un event listener sur le bouton rotatable
rotatableBtn.addEventListener("click", toggleSousMenu);

// Fonction pour toggle le sous-menu
function toggleSousMenu(event) {
  event.stopPropagation(); // Empêcher la propagation de l'événement pour éviter la fermeture du menu principal
  var sousMenu = event.target.nextElementSibling;
  if (sousMenu && sousMenu.classList.contains('sous_menu')) {
    sousMenu.classList.toggle('sous_menu--open');
  }
  const rotateElement = event.target.querySelector('.rotate');
  if (rotateElement) {
    rotateElement.classList.toggle('rotated');
  }
}

// Fermer le menu principal et le sous-menu lorsque l'un des liens 'a' est cliqué
document.querySelectorAll('.menu a, .sous_menu a').forEach(link => {
  link.addEventListener('click', () => {
    closeMenus().then(() => {
      console.log('Menus fermés avec succès');
    }).catch(error => {
      console.error('Erreur lors de la fermeture des menus :', error);
    });
  });
});

// Fonction pour fermer les menus
function closeMenus() {
  return new Promise((resolve, reject) => {
    try {
      // Fermer le menu principal
      var menu = document.querySelector(".menu");
      menu.classList.remove("menu--open");

      // Fermer le sous-menu
      var sousMenu = document.querySelector('.sous_menu.sous_menu--open');
      if (sousMenu) {
        sousMenu.classList.remove('sous_menu--open');
        const rotateElement = sousMenu.previousElementSibling.querySelector('.rotate');
        if (rotateElement) {
          rotateElement.classList.remove('rotated');
        }
      }

      resolve(); // Résoudre la promesse si tout se passe bien
    } catch (error) {
      reject(error); // Rejeter la promesse s'il y a une erreur
    }
  });
}

function closeSousMenu() {
  var sousMenu = document.querySelector('.sous_menu.sous_menu--open');
  if (retour) {
    sousMenu.classList.remove('sous_menu--open');
    const rotateElement = sousMenu.previousElementSibling.querySelector('.rotate');
    if (rotateElement) {
      rotateElement.classList.remove('rotated');
    }
  }
}


// utilisation de copilot + modif personnels pour cette partie
document.addEventListener('DOMContentLoaded', () => {
    const slices = document.querySelectorAll('.slice');
    const data = [30, 45, 25]; // Les valeurs des portions
    const colors = ['#f44336', '#2196F3', '#4CAF50']; // Les couleurs des portions

    slices.forEach((slice, index) => {
        slice.style.setProperty('--offset', data.slice(0, index).reduce((acc, val) => acc + val, 0));
        slice.style.setProperty('--value', data[index]);
        slice.style.setProperty('--color', colors[index]);
    });
});


document.querySelector('.scroll').addEventListener('click', function() {
  // Trouver le premier élément <h2>
  const firstH2 = document.querySelector('h2');
  
  if (firstH2) {
      // Calculer la position de défilement ajustée
      const offsetTop = firstH2.getBoundingClientRect().top + window.pageYOffset - 150;
      
      // Faire défiler jusqu'à l'élément avec un décalage de 150px
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
  }
});

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navLinks.forEach(link => link.classList.remove("active"));
            document.querySelector(`nav a[href="#${entry.target.id}"]`).classList.add("active");
        }
    });
}, { threshold: 1.0 });

sections.forEach(section => observer.observe(section));

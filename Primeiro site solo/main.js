// main.js

/* --- Funções para a navegação do site --- */
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-principal a');
    const currentPath = window.location.pathname.split('/').pop();

    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href').split('/').pop();
        
        if (currentPath === linkPath) {
            link.classList.add('active');
        } else if (currentPath === '' && linkPath === 'index.html') {
            link.classList.add('active');
        }
    });
});

/* --- Funções para a galeria de fotos --- */

const linksGaleria = document.querySelectorAll('.galeria-container a');
const modal = document.getElementById('modal-imagem');
const imagemModal = document.querySelector('.modal-conteudo');
const fecharBtn = document.querySelector('.fechar-btn');
const setaAnterior = document.querySelector('.seta.anterior');
const setaProximo = document.querySelector('.seta.proximo');

let indiceAtual = 0; // Variável para rastrear a imagem atual

// Função para abrir o modal e mostrar a imagem
function abrirModal(indice) {
    indiceAtual = indice;
    const urlImagem = linksGaleria[indiceAtual].getAttribute('href');
    imagemModal.setAttribute('src', urlImagem);
    modal.style.display = 'flex';
}

// Função para mostrar a imagem anterior
function mostrarAnterior() {
    indiceAtual = (indiceAtual > 0) ? indiceAtual - 1 : linksGaleria.length - 1;
    abrirModal(indiceAtual);
}

// Função para mostrar a próxima imagem
function mostrarProximo() {
    indiceAtual = (indiceAtual < linksGaleria.length - 1) ? indiceAtual + 1 : 0;
    abrirModal(indiceAtual);
}

// Fecha o modal
function fecharModal() {
    modal.style.display = 'none';
}

// Adiciona os eventos de clique

// 1. Abre o modal ao clicar em uma imagem da galeria
linksGaleria.forEach((link, index) => {
    link.addEventListener('click', function(event) {
        event.preventDefault(); 
        abrirModal(index);
    });
});

// 2. Eventos para as setas de navegação
setaAnterior.addEventListener('click', mostrarAnterior);
setaProximo.addEventListener('click', mostrarProximo);

// 3. Eventos para fechar o modal
fecharBtn.addEventListener('click', fecharModal);

modal.addEventListener('click', function(event) {
    if (event.target.classList.contains('modal')) {
        fecharModal();
    }
});
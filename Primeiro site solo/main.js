/* --- Funções para a navegação do site (menu ativo) --- */
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-principal a');
    const sections = document.querySelectorAll('section[id]');
    
    // Função para remover a classe 'active' de todos os links
    function clearActiveLinks() {
        navLinks.forEach(link => {
            link.classList.remove('active');
        });
    }

    // Função para definir o link ativo com base na URL atual (para páginas e âncoras)
    function setActiveLink() {
        clearActiveLinks();
        const currentPath = window.location.pathname.split('/').pop();
        const currentHash = window.location.hash;
        
        navLinks.forEach(link => {
            const linkHref = link.getAttribute('href');
            
            // Lógica para links de âncora (na mesma página)
            if (linkHref.startsWith('#')) {
                if (linkHref === currentHash) {
                    link.classList.add('active');
                }
            } 
            // Lógica para links de páginas separadas
            else {
                const linkPath = linkHref.split('/').pop();
                if (currentPath === linkPath || (currentPath === '' && linkPath === 'index.html')) {
                    link.classList.add('active');
                }
            }
        });
    }

    // Monitora a rolagem da página para atualizar o link ativo
    const observerOptions = {
        root: null,
        rootMargin: '-50% 0px -50% 0px', // Ativa o link quando a seção está no meio da tela
        threshold: 0
    };
    
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                const activeLink = document.querySelector(`.nav-principal a[href="#${id}"]`);
                if (activeLink) {
                    clearActiveLinks();
                    activeLink.classList.add('active');
                }
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    // Chama a função para ativar o link na carga inicial da página
    setActiveLink();
    
    // Lida com a mudança de âncora na URL
    window.addEventListener('hashchange', setActiveLink);

    /* --- Funções para a galeria de fotos (código mantido) --- */
    const linksGaleria = document.querySelectorAll('.galeria-container a');
    const modal = document.getElementById('modal-imagem');
    const imagemModal = document.querySelector('.modal-conteudo');
    const fecharBtn = document.querySelector('.fechar-btn');
    const setaAnterior = document.querySelector('.seta.anterior');
    const setaProximo = document.querySelector('.seta.proximo');
    
    let indiceAtual = 0;
    
    function abrirModal(indice) {
        indiceAtual = indice;
        const urlImagem = linksGaleria[indiceAtual].getAttribute('href');
        imagemModal.setAttribute('src', urlImagem);
        modal.style.display = 'flex';
    }
    
    function mostrarAnterior() {
        indiceAtual = (indiceAtual > 0) ? indiceAtual - 1 : linksGaleria.length - 1;
        abrirModal(indiceAtual);
    }
    
    function mostrarProximo() {
        indiceAtual = (indiceAtual < linksGaleria.length - 1) ? indiceAtual + 1 : 0;
        abrirModal(indiceAtual);
    }
    
    function fecharModal() {
        modal.style.display = 'none';
    }
    
    linksGaleria.forEach((link, index) => {
        link.addEventListener('click', function(event) {
            event.preventDefault(); 
            abrirModal(index);
        });
    });
    
    setaAnterior.addEventListener('click', mostrarAnterior);
    setaProximo.addEventListener('click', mostrarProximo);
    fecharBtn.addEventListener('click', fecharModal);
    
    modal.addEventListener('click', function(event) {
        if (event.target.classList.contains('modal')) {
            fecharModal();
        }
    });
});
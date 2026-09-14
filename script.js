document.addEventListener("DOMContentLoaded", () => {
  // Mapeamento dos elementos
  const likeBtn = document.getElementById("like-btn");
  const likesCountSpan = document.getElementById("likes-count");
  const postMedia = document.getElementById("post-media");
  const bookmarkBtn = document.getElementById("bookmark-btn");
  const totalLikesText = document.getElementById("total-likes-text");

  // Inicia sempre em ZERO
  let baseLikes = 0;
  let isLiked = false;

  // Atualiza os textos da interface
  function updateUI() {
    if (likesCountSpan) {
      likesCountSpan.textContent = baseLikes;
    }
    if (totalLikesText) {
      totalLikesText.textContent = `${baseLikes} others`;
    }
  }

  // Função para adicionar uma nova curtida
  function addLike() {
    baseLikes++;
    isLiked = true;
    if (likeBtn) {
      likeBtn.classList.add("liked");
    }
    updateUI();

    // Efeito de pulso no ícone
    const svg = likeBtn ? likeBtn.querySelector("svg") : null;
    if (svg) {
      svg.style.transform = "scale(1.4)";
      setTimeout(() => {
        svg.style.transform = "scale(1)";
      }, 150);
    }
  }

  // Clique no botão de Coração
  if (likeBtn) {
    likeBtn.addEventListener("click", (e) => {
      e.stopPropagation();

      if (isLiked) {
        // Se já estava curtido, retira a curtida (-1)
        isLiked = false;
        baseLikes = Math.max(0, baseLikes - 1);
        likeBtn.classList.remove("liked");
        updateUI();
      } else {
        // Adiciona curtida
        addLike();
      }
    });
  }

  // Clique na foto (sempre adiciona uma curtida)
  if (postMedia) {
    postMedia.addEventListener("click", (e) => {
      e.stopPropagation();
      addLike();
    });
  }

  // Botão de Salvar (Bookmark)
  if (bookmarkBtn) {
    let isBookmarked = false;
    bookmarkBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      isBookmarked = !isBookmarked;
      bookmarkBtn.classList.toggle("bookmarked", isBookmarked);

      const svg = bookmarkBtn.querySelector("svg");
      if (svg) {
        svg.style.transform = "scale(1.2)";
        setTimeout(() => {
          svg.style.transform = "scale(1)";
        }, 150);
      }
    });
  }
});
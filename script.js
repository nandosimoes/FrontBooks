const title = document.getElementById("title");
const languange = document.getElementById("lan");
const btn = document.getElementById("btn");
const divPai = document.querySelector('.divPai');
const noResults = document.getElementById('noResults');

btn.addEventListener("click", async (e) => {
  e.preventDefault();

  divPai.innerHTML = '';
  noResults.style.display = 'none';

  console.log(title.value, languange.value);

  const urlApi = `http://10.92.198.61:8080/user/testerAPI?title=${title.value}&language=${languange.value}`;
  
  try {
    const response = await fetch(urlApi, { method: "get" });
    const data = await response.json();

    console.log(data);

    const respostaAPI = data.respostaAPI;

    if (respostaAPI && respostaAPI.length === 0) {
      noResults.style.display = 'block';
    } else {
      respostaAPI.forEach(book => {


        
        if (book.imagens?.thumbnail) {
          const card = document.createElement('div');
          card.classList.add('CardL');

          const img = document.createElement('img');
          img.classList.add('imagemCard');
          img.src = book.imagens.thumbnail;
          img.alt = book.titulo;
          card.appendChild(img);

          const h3 = document.createElement('h3');
          h3.textContent = book.titulo;

          const descricao = document.createElement('p');
          descricao.classList.add('descricao');
          descricao.textContent = book.descricao;

          const idioma = document.createElement('p');
          idioma.textContent = `Idioma: ${book.idioma}`;

          const autor = document.createElement('p');
          autor.textContent = `Autor: ${book.autor.join(', ')}`;

          const editora = document.createElement('p');
          editora.textContent = `Editora: ${book.editora}`;

          const verMaisButton = document.createElement('button');
          verMaisButton.textContent = 'Ver Mais';
          verMaisButton.classList.add('verMaisBtn');
          verMaisButton.onclick = () => {
            descricao.classList.toggle('expandido');
            verMaisButton.textContent = descricao.classList.contains('expandido') ? 'Ver Menos' : 'Ver Mais';
          };

          card.appendChild(h3);
          card.appendChild(descricao);
          card.appendChild(idioma);
          card.appendChild(autor);
          card.appendChild(editora);
          card.appendChild(verMaisButton);

          divPai.appendChild(card);
        }
      });
    }
  } catch (error) {
    console.error('Erro ao buscar os dados:', error);
    noResults.style.display = 'block'; 
    divPai.innerHTML = ''; 
  }
});

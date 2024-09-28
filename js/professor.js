// Configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyArao4R0bl8NM4ldwsX81WqAtUUw5b6YcI",
    authDomain: "hackathon-7aee9.firebaseapp.com",
    projectId: "hackathon-7aee9",
    storageBucket: "hackathon-7aee9.appspot.com",
    messagingSenderId: "882587092251",
    appId: "1:882587092251:web:468655f40bc8dc09413fbe"
};

// Inicializando o Firebase
firebase.initializeApp(firebaseConfig);

// Referências aos serviços do Firebase
const db = firebase.firestore();
const auth = firebase.auth();

window.addEventListener('load', function () {
    console.log("Página professor.html carregada");

    // Captura os parâmetros da URL
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('userId');
    
    if (userId) {
        console.log("Dados capturados da URL:", userId);

        // Carregar vídeos do professor vinculado
        loadVideosP(userId);
    } else {
        console.error("Dados do usuário não encontrados na URL.");
        // Redireciona para a página de login se os dados não estiverem presentes
        window.location.href = 'index.html';
    }
});

// Função para carregar os vídeos do professor logado
async function loadVideosP(professor) {
    try {
        const videoList = document.getElementById('videoList');
        videoList.innerHTML = '';

        const querySnapshot = await db.collection('videoAulas').where('professor', '==', professor).get();
        querySnapshot.forEach((doc) => {
            const videoData = doc.data();
            const listItem = document.createElement('li');
            listItem.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
            listItem.innerHTML =` 
               <div class="mb-3">
                <h3>${videoData.titulo}</h3>
                <p>${videoData.descricao}</p>
                <div class="video-iframe">
                    ${videoData.url} <!-- O iframe é inserido diretamente -->
                </div>
                <div>
                    <button class="btn btn-sm btn-primary edit-btn" data-id="${doc.id}">Editar</button>
                    <button class="btn btn-sm btn-danger delete-btn" data-id="${doc.id}">Excluir</button>
                </div>
                </div>
            `;
            videoList.appendChild(listItem);
        });

        // Adicionar evento de click para os botões de edição
        document.querySelectorAll('.edit-btn').forEach(button => {
            button.addEventListener('click', (event) => openEditModal(event.target.dataset.id));
        });

        // Adicionar evento de click para os botões de exclusão
        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', async (event) => {
                const videoId = event.target.dataset.id;
                if (confirm('Tem certeza que deseja excluir este vídeo?')) {
                    await db.collection('videoAulas').doc(videoId).delete();
                    alert('Vídeo excluído com sucesso!');
                    loadVideosP(professor); // Recarrega a lista de vídeos
                }
            });
        });

    } catch (error) {
        console.error("Erro ao carregar vídeos: ", error);
    }
}

// Função para adicionar um novo vídeo
document.getElementById('videoForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const urlParams = new URLSearchParams(window.location.search);
    const professor = urlParams.get('userId'); // Pegando o ID do professor da query string

    const titulo = document.getElementById('videoTitle').value;
    const descricao = document.getElementById('videoDescription').value;
    const url = document.getElementById('videoURL').value; // Campo 'url do video'

    try {
        await db.collection('videoAulas').add({
            titulo,
            descricao,
            url,
            professor
        });

        alert('Vídeo adicionado com sucesso!');
        document.getElementById('videoForm').reset(); // Limpa o formulário
        loadVideosP(professor); // Recarrega a lista de vídeos

    } catch (error) {
        console.error("Erro ao adicionar vídeo: ", error);
        alert('Erro ao adicionar vídeo.');
    }
});

// Função para abrir o modal de edição com os dados do vídeo a ser editado
async function openEditModal(videoId) {
    try {
        const videoDoc = await db.collection('videoAulas').doc(videoId).get();
        const videoData = videoDoc.data();

        // Preenche os campos do modal com os dados do vídeo
        document.getElementById('editVideoTitle').value = videoData.titulo;
        document.getElementById('editVideoDescription').value = videoData.descricao;
        document.getElementById('editVideoURL').value = videoData.url;
        document.getElementById('saveEditBtn').dataset.id = videoId;

        // Exibe o modal
        const editModal = new bootstrap.Modal(document.getElementById('editModal'));
        editModal.show();
    } catch (error) {
        console.error("Erro ao abrir modal de edição: ", error);
    }
}

// Função para salvar as edições feitas no vídeo
document.getElementById('saveEditBtn').addEventListener('click', async () => {
    const videoId = document.getElementById('saveEditBtn').dataset.id;
    const titulo = document.getElementById('editVideoTitle').value;
    const descricao = document.getElementById('editVideoDescription').value;
    const url = document.getElementById('editVideoURL').value;

    try {
        await db.collection('videoAulas').doc(videoId).update({
            titulo,
            descricao,
            url
        });

        alert('Vídeo atualizado com sucesso!');
        const editModal = bootstrap.Modal.getInstance(document.getElementById('editModal'));
        editModal.hide();
        const urlParams = new URLSearchParams(window.location.search);
        const professor = urlParams.get('userId');
        loadVideosP(professor); // Recarrega a lista de vídeos

    } catch (error) {
        console.error("Erro ao salvar edições do vídeo: ", error);
        alert('Erro ao salvar edições do vídeo.');
    }
});

// Função para logout
document.getElementById('logoutBtn').addEventListener('click', () => {
    firebase.auth().signOut().then(() => {
        window.location.href = 'index.html';
    }).catch((error) => {
        console.error("Erro ao fazer logout: ", error);
        alert('Erro ao fazer logout.');
    });
});

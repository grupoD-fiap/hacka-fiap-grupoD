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
    console.log("Página aluno.html carregada");

    // Captura os parâmetros da URL
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('userId');
    const professorVinculado = urlParams.get('professorVinculado');

    if (userId && professorVinculado) {
        console.log("Dados capturados da URL:", userId, professorVinculado);

        // Carregar vídeos do professor vinculado
        loadVideos(professorVinculado);
    } else {
        console.error("Dados do usuário ou professor não encontrados na URL.");
        // Redireciona para a página de login se os dados não estiverem presentes
        window.location.href = 'index.html';
    }
});

function loadVideos(professorVinculado) {
    console.log('Carregando vídeos do professor vinculado:', professorVinculado);

    db.collection("videoAulas")
        .where("professor", "==", professorVinculado)
        .get()
        .then((querySnapshot) => {
            const videoList = document.getElementById("videoList");
            videoList.innerHTML = ""; // Limpa a lista antes de adicionar novos vídeos

            querySnapshot.forEach((doc) => {
                const data = doc.data();
                
                // Cria um card para cada vídeo
                const card = document.createElement("div");
                card.className = "card mb-3";
                card.innerHTML = `
                    <div class="card-body">
                        <h5 class="card-title">${data.titulo}</h5>
                        <p class="card-text">${data.descricao}</p>
                         ${data.url}
                    </div>
                `;
                videoList.appendChild(card);
            });
        })
        .catch((error) => {
            console.error("Erro ao carregar vídeos: ", error);
        });
}

document.getElementById('logoutButton').addEventListener('click', function () {
    // Função de logout
    console.log('Logout acionado');
    auth.signOut().then(() => {
        // Redireciona para a página de login
        window.location.href = 'index.html';
    }).catch((error) => {
        console.error("Erro ao fazer logout: ", error);
    });
});

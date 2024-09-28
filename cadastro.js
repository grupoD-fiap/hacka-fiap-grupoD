// Configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyArao4R0bl8NM4ldwsX81WqAtUUw5b6YcI",
    authDomain: "hackathon-7aee9.firebaseapp.com",
    projectId: "hackathon-7aee9",
    storageBucket: "hackathon-7aee9.appspot.com",
    messagingSenderId: "882587092251",
    appId: "1:882587092251:web:your-app-id" // Substitua "your-app-id" pelo seu App ID do Firebase
};

// Inicializando o Firebase
firebase.initializeApp(firebaseConfig);

// Referências aos serviços do Firebase
const auth = firebase.auth();
const db = firebase.firestore();

// Função para buscar professores no Firestore e preencher a lista de seleção
async function carregarProfessores() {
    const professorSelect = document.getElementById('professorVinculado');

    // Limpar as opções existentes
    professorSelect.innerHTML = '<option value="" disabled selected>Selecione um professor</option>';

    try {
        console.log('Iniciando busca de professores no Firestore...');
        
        // Buscar documentos onde categoria é "Professor"
        const snapshot = await db.collection('usuarios').where('categoria', '==', 'Professor').get();

        // Verificar se há documentos retornados
        if (snapshot.empty) {
            console.log('Nenhum professor encontrado no Firestore.');
            return;
        }

        console.log(`Foram encontrados ${snapshot.size} professores.`);

        // Adicionar professores ao select
        snapshot.forEach(doc => {
            const professorData = doc.data();
            console.log('Professor encontrado:', professorData);

            const option = document.createElement('option');
            option.value = professorData.id; // Mantenha o ID no value se precisar
            option.textContent = professorData.nome; // Defina o texto como o nome do professor
            option.setAttribute('data-nome', professorData.nome); // Adicione um atributo personalizado para armazenar o nome
            professorSelect.appendChild(option);
        });
    } catch (error) {
        console.error('Erro ao carregar os professores:', error);
    }
}

// Função de cadastro
async function validarFormulario(event) {
    event.preventDefault(); // Prevenir o envio do formulário
    const nome = document.getElementById('nome').value.trim();
    const cpf = document.getElementById('cpf').value.trim();
    const email = document.getElementById('email').value.trim();
    const senha = document.getElementById('senha').value;
    const confirmaSenha = document.getElementById('confirmaSenha').value;
    const categoria = document.getElementById('categoria').value;
    const professorVinculadoSelect = document.getElementById('professorVinculado');
    const professorVinculadoNome = professorVinculadoSelect.options[professorVinculadoSelect.selectedIndex]?.getAttribute('data-nome');
    const mensagemErro = document.getElementById('mensagemErro');

    // Validações
    const nomePartes = nome.split(' ');
    if (nomePartes.length < 2 || nomePartes.some(parte => parte.length < 2)) {
        mensagemErro.textContent = "Por favor, informe nome e sobrenome.";
        return false;
    }

    const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
    if (!cpfRegex.test(cpf)) {
        mensagemErro.textContent = "CPF inválido. Formato correto: 000.000.000-00.";
        return false;
    }

    if (senha !== confirmaSenha) {
        mensagemErro.textContent = "As senhas não coincidem. Por favor, corrija.";
        return false;
    }

    try {
        console.log('Iniciando processo de cadastro do usuário...');
        
        // Criar usuário no Firebase Authentication
        const userCredential = await auth.createUserWithEmailAndPassword(email, senha);
        const userId = userCredential.user.uid;
        console.log('Usuário criado com sucesso no Firebase Authentication. UID:', userId);

        // Dados do usuário para o Firestore
        let userData = {
            id: userId,
            nome: nome,
            cpf: cpf,
            email: email,
            categoria: categoria,
        };

        // Adiciona o campo "Professor Vinculado" se a categoria for "Aluno"
        if (categoria === 'Aluno' && professorVinculadoNome) {
            userData.professorVinculado = professorVinculadoNome;
            console.log('Aluno vinculado ao professor:', professorVinculadoNome);
        }

        // Salvar os dados do usuário no Firestore Database
        await db.collection('usuarios').doc(userId).set(userData);
        console.log('Usuário salvo com sucesso no Firestore.');

        // Exibir mensagem de sucesso e redirecionar
        alert('Cadastro efetuado com sucesso!');
        document.getElementById('cadastroForm').reset();
        window.location.href = 'index.html'; // Redirecionar para a página de login
    } catch (error) {
        // Exibir mensagem de erro e log detalhado
        console.error('Erro no processo de cadastro:', error);
        mensagemErro.textContent = `Erro: ${error.message}`;
        return false;
    }

    mensagemErro.textContent = '';
    return true;
}

// Função para exibir/esconder o campo "Professor Vinculado"
function toggleProfessorVinculado() {
    const categoria = document.getElementById('categoria').value;
    const professorVinculadoDiv = document.getElementById('professorVinculadoDiv');

    if (categoria === 'Aluno') {
        professorVinculadoDiv.style.display = 'block';
        carregarProfessores(); // Chamar a função para carregar os professores
    } else {
        professorVinculadoDiv.style.display = 'none';
    }
}

// Chamar a função toggleProfessorVinculado quando a página for carregada para depuração
document.addEventListener('DOMContentLoaded', () => {
    console.log('Página carregada. Inicializando...');
    carregarProfessores();
});

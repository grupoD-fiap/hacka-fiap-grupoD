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
const auth = firebase.auth();
const db = firebase.firestore();

/// Função de login
document.getElementById('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault(); // Previne o envio do formulário padrão

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        // Autenticar usuário com Firebase Authentication
        const userCredential = await auth.signInWithEmailAndPassword(email, password);
        const userId = userCredential.user.uid;

        // Recuperar a categoria do usuário no Firestore
        const userDoc = await db.collection('usuarios').doc(userId).get();
        
        if (userDoc.exists) {
            const userData = userDoc.data();
            const categoria = userData.categoria;

            // Redirecionar com base na categoria
            if (categoria === 'Professor') {
                window.location.href = `professor.html?userId=${userId}`;
            } else if (categoria === 'Aluno') {
                const professorVinculado = userData.professorVinculado;
                window.location.href = `aluno.html?userId=${userId}&professorVinculado=${professorVinculado}`;
            } else {
                alert('Categoria de usuário não reconhecida.');
            }
        } else {
            alert('Usuário não encontrado no banco de dados.');
        }
    } catch (error) {
        // Tratar erros de autenticação
        alert(`Erro no login: ${error.message}`);
    }
});


// Função de recuperação de senha
document.getElementById('forgotPassword').addEventListener('click', async () => {
    const email = document.getElementById('email').value;

    if (!email) {
        alert('Por favor, insira o seu e-mail para recuperar a senha.');
        return;
    }

    try {
        // Envia e-mail para redefinir senha
        await auth.sendPasswordResetEmail(email);
        alert('E-mail para redefinição de senha enviado! Verifique sua caixa de entrada.');
    } catch (error) {
        alert(`Erro ao enviar e-mail de recuperação: ${error.message}`);
    }
});

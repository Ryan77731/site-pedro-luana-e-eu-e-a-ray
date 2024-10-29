let alunos = [];
let editIndex = null;

// Credenciais para login
const credentials = {
    diretor: { username: "diretor", password: "diretor" },
    pedagoga: { username: "pedago", password: "pedago" }
};

function login() {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const errorMessage = document.getElementById('login-error');

    if (username === credentials.diretor.username && password === credentials.diretor.password) {
        // Acesso como diretor
        showMainContainer();
    } else if (username === credentials.pedagoga.username && password === credentials.pedagoga.password) {
        // Acesso como pedagoga
        showMainContainer();
    } else {
        // Credenciais inválidas
        errorMessage.textContent = "Usuário ou senha inválidos. Tente novamente.";
    }
}

function showMainContainer() {
    document.getElementById('login-container').style.display = 'none';
    document.getElementById('main-container').style.display = 'block';
}

function addAluno() {
    const nome = document.getElementById('nome').value.trim();
    const idade = document.getElementById('idade').value.trim();
    const cgm = document.getElementById('cgm').value.trim();
    const atividades = document.getElementById('atividades').value.trim();
    const observacoes = document.getElementById('observacoes').value.trim();

    if (nome && idade && cgm && atividades) {
        const aluno = { nome, idade, cgm, atividades, observacoes };
        
        if (editIndex !== null) {
            alunos[editIndex] = aluno;
            editIndex = null;
            document.getElementById('form-title').textContent = 'Criar Nova Ficha';
            document.getElementById('submit-btn').textContent = 'Adicionar Aluno';
        } else {
            alunos.push(aluno);
        }
        
        displayAlunos();
        clearInputs();
    } else {
        alert('Por favor, preencha todos os campos obrigatórios!');
    }
}

function displayAlunos(filter = '') {
    const alunoList = document.getElementById('aluno-list');
    alunoList.innerHTML = '';

    const filteredAlunos = alunos.filter(aluno => 
        aluno.nome.toLowerCase().includes(filter.toLowerCase())
    );

    filteredAlunos.forEach((aluno, index) => {
        const alunoCard = document.createElement('div');
        alunoCard.classList.add('aluno-card');
        alunoCard.innerHTML = `
            <h3>${aluno.nome}</h3>
            <p><strong>Idade:</strong> ${aluno.idade} anos</p>
            <p><strong>CGM:</strong> ${aluno.cgm}</p>
            <h4>Atividades:</h4>
            <p>${aluno.atividades}</p>
            <h4>Observações:</h4>
            <p>${aluno.observacoes || 'Nenhuma observação'}</p>
            <button onclick="editAluno(${index})" class="btn">Editar</button>
        `;
        alunoList.appendChild(alunoCard);
    });

    if (filteredAlunos.length === 0) {
        alunoList.innerHTML = `<p>Nenhum aluno encontrado.</p>`;
    }
}

let alunos = [];
let editIndex = null;

// Credenciais para login
const credentials = {
    diretor: { username: "diretor", password: "diretor" },
    pedagoga: { username: "pedago", password: "pedago" }
};

function login() {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const errorMessage = document.getElementById('login-error');

    if (username === credentials.diretor.username && password === credentials.diretor.password) {
        // Acesso como diretor
        showMainContainer();
    } else if (username === credentials.pedagoga.username && password === credentials.pedagoga.password) {
        // Acesso como pedagoga
        showMainContainer();
    } else {
        // Credenciais inválidas
        errorMessage.textContent = "Usuário ou senha inválidos. Tente novamente.";
    }
}

function showMainContainer() {
    document.getElementById('login-container').style.display = 'none';
    document.getElementById('main-container').style.display = 'block';
}

function addAluno() {
    const nome = document.getElementById('nome').value.trim();
    const idade = document.getElementById('idade').value.trim();
    const cgm = document.getElementById('cgm').value.trim();
    const atividades = document.getElementById('atividades').value.trim();
    const observacoes = document.getElementById('observacoes').value.trim();

    if (nome && idade && cgm && atividades) {
        const aluno = { nome, idade, cgm, atividades, observacoes };
        
        if (editIndex !== null) {
            alunos[editIndex] = aluno;
            editIndex = null;
            document.getElementById('form-title').textContent = 'Criar Nova Ficha';
            document.getElementById('submit-btn').textContent = 'Adicionar Aluno';
        } else {
            alunos.push(aluno);
        }
        
        displayAlunos();
        clearInputs();
    } else {
        alert('Por favor, preencha todos os campos obrigatórios!');
    }
}

function displayAlunos(filter = '') {
    const alunoList = document.getElementById('aluno-list');
    alunoList.innerHTML = '';

    const filteredAlunos = alunos.filter(aluno => 
        aluno.nome.toLowerCase().includes(filter.toLowerCase())
    );r

    filteredAlunos.forEach((aluno, index) => {
        const alunoCard = document.createElement('div');
        alunoCard.classList.add('aluno-card');
        alunoCard.innerHTML = `
            <h3>${aluno.nome}</h3>
            <p><strong>Idade:</strong> ${aluno.idade} anos</p>
            <p><strong>CGM:</strong> ${aluno.cgm}</p>
            <h4>Atividades:</h4>
            <p>${aluno.atividades}</p>
            <h4>Observações:</h4>
            <p>${aluno.observacoes || 'Nenhuma observação'}</p>
            <button onclick="editAluno(${index})" class="btn">Editar</button>
        `;
        alunoList.appendChild(alunoCard);
    });

    if (filteredAlunos.length === 0) {
        alunoList.innerHTML = `<p>Nenhum aluno encontrado.</p>`;
    }
}

function searchAluno() {
    const searchValue = document.getElementById('search').value;
    displayAlunos(searchValue);
}

function clearInputs() {
    document.getElementById('nome').value = '';
    document.getElementById('idade').value = '';
    document.getElementById('cgm').value = '';
    document.getElementById('atividades').value = '';
    document.getElementById('observacoes').value = '';
}

function editAluno(index) {
    const aluno = alunos[index];
    document.getElementById('nome').value = aluno.nome;
    document.getElementById('idade').value = aluno.idade;
    document.getElementById('cgm').value = aluno.cgm;
    document.getElementById('atividades').value = aluno.atividades;
    document.getElementById('observacoes').value = aluno.observacoes;

    editIndex = index;
    document.getElementById('form-title').textContent = 'Editar Ficha';
    document.getElementById('submit-btn').textContent = 'Atualizar Aluno';
}

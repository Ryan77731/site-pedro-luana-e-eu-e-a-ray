// Arrays para armazenar alunos e ocorrências
let alunos = [];
let ocorrencias = {};

// Função para exibir a seção selecionada
function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => {
        section.style.display = 'none';
    });
    document.getElementById(sectionId).style.display = 'block';

    if (sectionId === 'student-list') displayStudentList();
    if (sectionId === 'occurrences') populateStudentSelect();
}

// Função para salvar ou cadastrar aluno
function saveStudent() {
    const nome = document.getElementById('student-name').value.trim();
    const idade = document.getElementById('student-age').value.trim();
    const cgm = document.getElementById('student-cgm').value.trim();
    const doencas = document.getElementById('student-diseases').value.trim();
    const pais = document.getElementById('student-parents').value.trim();
    const atividades = document.getElementById('student-activities').value.trim();
    const observacoes = document.getElementById('student-observations').value.trim();
    const foto = document.getElementById('student-photo').files[0];

    if (!nome || !idade || !cgm || !atividades) {
        alert("Por favor, preencha todos os campos obrigatórios (Nome, Idade, CGM, Atividades).");
        return;
    }

    const aluno = {
        nome,
        idade,
        cgm,
        doencas,
        pais,
        atividades,
        observacoes,
        fotoURL: foto ? URL.createObjectURL(foto) : ""
    };

    alunos.push(aluno);
    clearForm();
    alert("Aluno cadastrado com sucesso!");

    displayStudentList();
    populateStudentSelect(); // Atualiza o dropdown de seleção na seção de Ocorrências
}

// Função para limpar o formulário após o cadastro
function clearForm() {
    document.getElementById('student-name').value = "";
    document.getElementById('student-age').value = "";
    document.getElementById('student-cgm').value = "";
    document.getElementById('student-diseases').value = "";
    document.getElementById('student-parents').value = "";
    document.getElementById('student-activities').value = "";
    document.getElementById('student-observations').value = "";
    document.getElementById('student-photo').value = "";
}

// Função para mostrar a lista de alunos
function displayStudentList() {
    const studentListContainer = document.getElementById('student-list-container');
    studentListContainer.innerHTML = '';

    alunos.forEach((aluno, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `<strong>${aluno.nome}</strong> - CGM: ${aluno.cgm}`;
        listItem.onclick = () => viewStudentDetails(index);
        studentListContainer.appendChild(listItem);
    });
}

// Função para exibir detalhes do aluno
function viewStudentDetails(index) {
    const aluno = alunos[index];
    alert(`Nome: ${aluno.nome}\nIdade: ${aluno.idade}\nCGM: ${aluno.cgm}\nAtividades: ${aluno.atividades}`);
}

// Função para preencher o dropdown de seleção de alunos na seção de Ocorrências
function populateStudentSelect() {
    const studentSelect = document.getElementById('student-select');
    studentSelect.innerHTML = '<option value="">Selecione um aluno</option>';

    alunos.forEach((aluno, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = aluno.nome;
        studentSelect.appendChild(option);
    });
}

// Função para exibir ocorrências e a foto de um aluno específico
function showOccurrences() {
    const studentIndex = document.getElementById('student-select').value;
    const occurrenceListContainer = document.getElementById('occurrence-list-container');
    const studentPhoto = document.getElementById('student-photo-display');

    if (studentIndex === '') {
        occurrenceListContainer.innerHTML = '';
        studentPhoto.src = '';
        return;
    }

    const aluno = alunos[studentIndex];
    ocorrencias[aluno.cgm] = ocorrencias[aluno.cgm] || [];
    const studentOccurrences = ocorrencias[aluno.cgm];

    // Exibir a foto do aluno
    studentPhoto.src = aluno.fotoURL || '';

    // Exibir as ocorrências do aluno
    occurrenceListContainer.innerHTML = '';
    studentOccurrences.forEach(occurrence => {
        const occurrenceItem = document.createElement('div');
        occurrenceItem.classList.add('occurrence-item');
        occurrenceItem.innerText = occurrence;
        occurrenceListContainer.appendChild(occurrenceItem);
    });
}

// Função para adicionar uma nova ocorrência para o aluno selecionado
function addOccurrence() {
    const studentIndex = document.getElementById('student-select').value;
    const newOccurrence = document.getElementById('new-occurrence').value;

    if (studentIndex === '' || newOccurrence === '') {
        alert("Selecione um aluno e adicione uma ocorrência.");
        return;
    }

    const aluno = alunos[studentIndex];
    ocorrencias[aluno.cgm] = ocorrencias[aluno.cgm] || [];
    ocorrencias[aluno.cgm].push(newOccurrence);

    document.getElementById('new-occurrence').value = '';
    showOccurrences(); // Atualiza a lista de ocorrências e a foto para o aluno selecionado
}

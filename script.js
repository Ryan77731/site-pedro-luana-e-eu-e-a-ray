let students = [];
let occurrences = [];

// Função para exibir os alunos cadastrados na tabela
function showStudents() {
    const searchQuery = document.getElementById("search-student").value.toLowerCase();
    const filteredStudents = students.filter(student =>
        student.name.toLowerCase().includes(searchQuery) ||
        student.cgm.includes(searchQuery) ||
        student.cpf.includes(searchQuery) ||
        student.phone.includes(searchQuery)
    );

    const studentListContainer = document.querySelector("#student-list-container tbody");
    studentListContainer.innerHTML = '';  // Limpa a lista de alunos

    filteredStudents.forEach(student => {
        const studentItem = document.createElement('tr');
        studentItem.innerHTML = `
            <td><img src="${student.photo}" alt="${student.name}" style="width: 50px; height: 50px; border-radius: 50%;" /></td>
            <td>${student.name}</td>
            <td>${student.cgm}</td>
            <td><button onclick="editStudent(${student.id})">Editar</button></td>
        `;
        studentListContainer.appendChild(studentItem);
    });
}

// Função para pesquisar alunos enquanto digita
function searchStudent() {
    showStudents();
}

// Função para salvar ou editar dados do aluno
function saveStudent() {
    const name = document.getElementById("student-name").value;
    const age = document.getElementById("student-age").value;
    const cgm = document.getElementById("student-cgm").value;
    const cpf = document.getElementById("student-cpf").value;
    const phone = document.getElementById("student-phone").value;
    const studentClass = document.getElementById("student-class").value;
    const diseases = document.getElementById("student-diseases").value;
    const parents = document.getElementById("student-parents").value;
    const activities = document.getElementById("student-activities").value;
    const observations = document.getElementById("student-observations").value;
    const photoFile = document.getElementById("student-photo").files[0];
    const photoUrl = photoFile ? URL.createObjectURL(photoFile) : "";  // Foto do aluno

    const newStudent = {
        id: Date.now(),
        name,
        age,
        cgm,
        cpf,
        phone,
        class: studentClass,
        diseases,
        parents,
        activities,
        observations,
        photo: photoUrl
    };

    // Atualizando ou criando um novo aluno
    const studentId = document.getElementById("student-id").value;
    if (studentId) {
        const index = students.findIndex(student => student.id == studentId);
        students[index] = newStudent;
    } else {
        students.push(newStudent);
    }

    // Salvar no localStorage
    localStorage.setItem('students', JSON.stringify(students));

    alert("Aluno salvo com sucesso!");
    showStudents();
    showSection('student-list');
}

// Função para editar um aluno
function editStudent(studentId) {
    const student = students.find(student => student.id === studentId);
    if (student) {
        document.getElementById("student-name").value = student.name;
        document.getElementById("student-age").value = student.age;
        document.getElementById("student-cgm").value = student.cgm;
        document.getElementById("student-cpf").value = student.cpf;
        document.getElementById("student-phone").value = student.phone;
        document.getElementById("student-class").value = student.class;
        document.getElementById("student-diseases").value = student.diseases;
        document.getElementById("student-parents").value = student.parents;
        document.getElementById("student-activities").value = student.activities;
        document.getElementById("student-observations").value = student.observations;

        const studentPhoto = document.getElementById("student-photo");
        if (student.photo) {
            studentPhoto.value = student.photo; // Seta a foto atual
        }

        document.getElementById("student-id").value = student.id;
        showSection('add-student');
    }
}

// Função para adicionar ocorrências
function addOccurrence() {
    const studentId = document.getElementById("student-select").value;
    if (!studentId) {
        alert("Selecione um aluno primeiro!");
        return;
    }

    const description = document.getElementById("new-occurrence").value;
    const occurrencePhotoFile = document.getElementById("occurrence-photo").files[0];

    const occurrencePhotoUrl = occurrencePhotoFile ? URL.createObjectURL(occurrencePhotoFile) : "";  // Foto da ocorrência

    const newOccurrence = {
        studentId,
        description,
        photo: occurrencePhotoUrl
    };

    occurrences.push(newOccurrence);  // Adiciona a nova ocorrência
    showOccurrences(studentId);  // Atualiza a lista de ocorrências
    alert("Ocorrência adicionada com sucesso!");
}

// Função para exibir as ocorrências
function showOccurrences(studentId) {
    const student = students.find(student => student.id == studentId);
    if (student) {
        // Exibe os detalhes do aluno
        document.getElementById("student-photo-img").src = student.photo;
        document.getElementById("student-name").textContent = student.name;
        document.getElementById("student-cgm").textContent = student.cgm;
        document.getElementById("student-details").style.display = 'block'; // Exibe os detalhes do aluno
        
        // Exibe as ocorrências desse aluno
        const studentOccurrences = occurrences.filter(occurrence => occurrence.studentId == studentId);
        const occurrenceContainer = document.getElementById("occurrence-list-container");
        occurrenceContainer.innerHTML = '';

        studentOccurrences.forEach(occurrence => {
            const occurrenceItem = document.createElement('div');
            occurrenceItem.classList.add('occurrence-item');
            occurrenceItem.innerHTML = `
                <p><strong>Ocorrência:</strong> ${occurrence.description}</p>
                <img src="${occurrence.photo}" alt="Foto da ocorrência" />
            `;
            occurrenceContainer.appendChild(occurrenceItem);
        });
    }
}

// Função para carregar alunos
function loadStudents() {
    if (localStorage.getItem('students')) {
        students = JSON.parse(localStorage.getItem('students'));
    }
    showStudents();
}

// Função para exibir diferentes seções
function showSection(sectionId) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => section.style.display = 'none');
    document.getElementById(sectionId).style.display = 'block';
}

window.onload = loadStudents;

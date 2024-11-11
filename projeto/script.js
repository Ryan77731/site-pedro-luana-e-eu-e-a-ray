let students = [];
let occurrences = [];

function showSection(sectionId) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.style.display = section.id === sectionId ? 'block' : 'none';
    });
}

function saveStudent() {
    const id = document.getElementById('student-id').value;
    const name = document.getElementById('student-name').value;
    const age = document.getElementById('student-age').value;
    const cgm = document.getElementById('student-cgm').value;
    const cpf = document.getElementById('student-cpf').value;
    const phone = document.getElementById('student-phone').value;
    const className = document.getElementById('student-class').value;
    const diseases = document.getElementById('student-diseases').value;
    const parents = document.getElementById('student-parents').value;
    const activities = document.getElementById('student-activities').value;
    const observations = document.getElementById('student-observations').value;
    const photo = document.getElementById('student-photo').files[0];

    const student = {
        id: id || new Date().getTime(),
        name,
        age,
        cgm,
        cpf,
        phone,
        className,
        diseases,
        parents,
        activities,
        observations,
        photo
    };

    if (id) {
        const index = students.findIndex(student => student.id === id);
        students[index] = student;
    } else {
        students.push(student);
    }

    displayStudents();
    clearForm();
}

function displayStudents() {
    const studentListContainer = document.getElementById('student-list-container');
    studentListContainer.innerHTML = '';

    students.forEach(student => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="${student.photo ? URL.createObjectURL(student.photo) : ''}" alt="Foto" width="50"></td>
            <td>${student.name}</td>
            <td>${student.cgm}</td>
            <td>
                <button onclick="editStudent(${student.id})">Editar</button>
            </td>
        `;
        studentListContainer.appendChild(row);
    });
}

function editStudent(id) {
    const student = students.find(student => student.id === id);
    document.getElementById('student-id').value = student.id;
    document.getElementById('student-name').value = student.name;
    document.getElementById('student-age').value = student.age;
    document.getElementById('student-cgm').value = student.cgm;
    document.getElementById('student-cpf').value = student.cpf;
    document.getElementById('student-phone').value = student.phone;
    document.getElementById('student-class').value = student.className;
    document.getElementById('student-diseases').value = student.diseases;
    document.getElementById('student-parents').value = student.parents;
    document.getElementById('student-activities').value = student.activities;
    document.getElementById('student-observations').value = student.observations;
}

function clearForm() {
    document.getElementById('student-form').reset();
    document.getElementById('student-id').value = '';
}

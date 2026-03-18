const formContainer = document.getElementById('form-container');
const finalPlan = document.getElementById('final-plan');

function createNewRow() {
    const newRow = document.createElement('div');
    newRow.className = "row";
    newRow.style.marginTop = "10px";

    newRow.innerHTML = `
        <input type="text" placeholder="Nazwa ćwiczenia" class="exerciseName">
        
        <label>Serie:</label>
        <select class="exerciseSets">
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
        </select>

        <label>Powtórzenia:</label>
        <select class="exerciseReps">
            <option value="0">0</option>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="12">12</option>
            <option value="15">15</option>
        </select>

        <label>Kilogramy </label>
        <input type="number" placeholder="podaj ilość" class="exerciseWeight">
        <button class="addBtn">Dodaj do planu</button>
    `;

    formContainer.appendChild(newRow);

    const currentBtn = newRow.querySelector('.addBtn');
    currentBtn.addEventListener('click', () => handleAdd(newRow));
}

function handleAdd(rowElement) {
    const nameInput = rowElement.querySelector('.exerciseName');
    const setsSelect = rowElement.querySelector('.exerciseSets');
    const repsSelect = rowElement.querySelector('.exerciseReps'); 
    const weightSelect = rowElement.querySelector('.exerciseWeight');

    const weight = Number(weightSelect.value);
    const sets = Number(setsSelect.value);
    const reps = Number(repsSelect.value);

    if (nameInput.value === "") {
        alert("Wpisz nazwę!");
        return;
    }

    if (weight <= 0 || sets <= 0 || reps <= 0) {
        alert("To niemożliwe! Wartości muszą być większe od 0.");
        return;
    }

    const entry = document.createElement('div');
    entry.style.background = "#e8f5e9";
    entry.style.margin = "5px 0";
    entry.style.padding = "10px";
    entry.style.borderRadius = "5px";
    entry.innerHTML = `⭐ <strong>${nameInput.value}</strong>: ${sets} serii x ${reps} powt x ${weight} kg`;

    const nazwaCwiczenia = nameInput.value.toLowerCase();

    if (nazwaCwiczenia.includes("martwy")) {
        const img = document.createElement('img');
        img.src = "martwy.jpg"; 
        img.style.width = "150px"; 
        img.style.display = "block";
        img.style.marginTop = "10px";
        entry.appendChild(img);    
    } 
    else if (nazwaCwiczenia.includes("przys")) {
        const video = document.createElement('video');
        video.src = "barbell.mp4";
        video.style.width = "200px";
        video.style.display = "block";
        video.style.marginTop = "10px";
        video.autoplay = true;
        video.loop = true;
        video.muted = true; 
        video.playsInline = true;
        entry.appendChild(video);
    }

    finalPlan.appendChild(entry);

    rowElement.style.opacity = "0.5";
    rowElement.querySelector('.addBtn').disabled = true;
    nameInput.disabled = true;
    setsSelect.disabled = true;
    repsSelect.disabled = true;
    weightSelect.disabled = true;

    createNewRow();
}

// Inicjalizacja - czyścimy kontener i tworzymy pierwszy wiersz
formContainer.innerHTML = ''; 
createNewRow();
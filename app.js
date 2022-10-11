const addButton = document.querySelector(".add-btn");
const notesList = document.querySelector(".notes-list");

//Storage Stuff
const getNotes = () => {
    return JSON.parse(localStorage.getItem("notes") || "[]");
};

const saveNotes = (notes) => {
    return localStorage.setItem("notes", JSON.stringify(notes));
};

//Create Note Element
const createNote = (id, titleContent, textContent) => {
    //Note Container => li
    const note = document.createElement("li");
    note.className = "note";

    //Note Title => title textarea
    const noteTitle = document.createElement("textarea");
    noteTitle.rows = "1";
    noteTitle.placeholder = "Title...";
    noteTitle.maxLength = "38";
    noteTitle.className = "note-title";
    noteTitle.value = titleContent;

    noteTitle.addEventListener("change", (e) => {
        updateTitle(id, e.target.value);
    });

    //Note Text => text textarea
    const noteText = document.createElement("textarea");
    noteText.placeholder = "Text...";
    noteText.className = "note-text";
    noteText.value = textContent;

    noteText.addEventListener("change", (e) => {
        updateText(id, e.target.value);
    });

    //Note Remove Button => span
    const removeBtn = document.createElement("span");
    removeBtn.className = "remove-btn";
    removeBtn.innerHTML = '<i class="fas fa-xmark"></i>';

    removeBtn.addEventListener("click", () => {
        deleteNote(id, note);
    });

    //Appending Elements to Note
    note.appendChild(noteTitle);
    note.appendChild(noteText);
    note.appendChild(removeBtn);

    return note;
};

//Add Notes
const addNote = () => {
    const notes = getNotes();

    const noteItems = {
        id: Math.floor(Math.random() * 1000),
        titleContent: "",
        textContent: "",
    };

    const noteElement = createNote(
        noteItems.id,
        noteItems.titleContent,
        noteItems.textContent
    );
    //Add Note Element to DOM
    notesList.appendChild(noteElement);

    //Push Element to LocalStorage
    notes.push(noteItems);

    //Save LocalStorage
    saveNotes(notes);
};


//Updating Notes
const updateTitle = (id, titleNewContent) => {
    const notes = getNotes();

    const updateNote = notes.filter((item) => item.id === id);
    updateNote[0].titleContent = titleNewContent;
    console.log(updateNote);

    saveNotes(notes);
};

const updateText = (id, textNewContent) => {
    const notes = getNotes();

    const updateNote = notes.filter((item) => item.id === id);
    updateNote[0].textContent = textNewContent;
    console.log(notes);

    saveNotes(notes);
};


//Delete Note
const deleteNote = (id, element) => {
    const notes = getNotes().filter((item) => item.id !== id);

    saveNotes(notes);

    notesList.removeChild(element);
};

//EventListeners
addButton.addEventListener("click", addNote);

//InitNotes
getNotes().forEach((item) => {
    const noteElement = createNote(
        item.id,
        item.titleContent,
        item.textContent
    );
    notesList.appendChild(noteElement);
});

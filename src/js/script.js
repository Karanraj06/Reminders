let modal = document.getElementById("modal"), add = document.getElementById("add"),
    closeModal = document.getElementById("close"), saveChanges = document.getElementById("saveChanges"),
    title = document.getElementById("title"), des = document.getElementById("des"),
    notes = document.getElementById("notes"), modal2 = document.getElementById("modal2"),
    deleteAll = document.getElementById("deleteAll"), cancel = document.getElementById("cancel"),
    yes = document.getElementById("yes"), bin = document.querySelector(".bin");

add.addEventListener("click", () => {
    modal.showModal();
});

closeModal.addEventListener("click", () => {
    modal.close();
});

let addNotes = () => {
    let html = "";

    // for (let i in localStorage) {}

    Object.keys(localStorage).forEach((key) => {
        if (key && localStorage.getItem(key)) {
            html += `<div class="p-4 md:w-1/3 drag" draggable="true">
                        <div class="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                            <div class="p-6">
                                <div class="flex items-center justify-between">
                                    <h1 class="title-font text-lg font-medium text-gray-900">${key}</h1>
                                    <button class="bg-[url(../images/close.svg)] w-3 h-3 opacity-50 hover:opacity-100 close-note" type="button"></button>
                                </div>
                                <p class="leading-relaxed my-3">${localStorage.getItem(key)}</p>
                            </div>
                        </div>
                    </div>`;
        }
    });

    if (html) {
        notes.innerHTML = html;
    } else {
        notes.innerHTML = `<div class="p-4 md:w-1/3 drag" draggable="true">
                               <div class="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                                   <div class="p-6">
                                       <div class="flex items-center justify-between">
                                           <h1 class="title-font text-lg font-medium text-gray-900">Title</h1>
                                           <button class="bg-[url(../images/close.svg)] w-3 h-3 opacity-50 hover:opacity-100 close-note"
                                               type="button"></button>
                                       </div>
                                       <p class="leading-relaxed my-3">Sample Note</p>
                                   </div>
                               </div>
                           </div>`;
    }

    Array.from(document.querySelectorAll(".close-note")).forEach((element) => {
        element.addEventListener("click", () => {
            localStorage.removeItem(element.previousElementSibling.innerHTML);
            element.parentNode.parentNode.parentNode.parentNode.parentNode.removeChild(element.parentNode.parentNode.parentNode.parentNode);
        });
    });

    Array.from(document.querySelectorAll(".drag")).forEach((element) => {
        element.addEventListener("dragstart", (event) => {
            event.dataTransfer.clearData();
            event.dataTransfer.setData("text/html", event.target.id);
            setTimeout(() => {
                event.target.classList.add("hidden");
            });
        });

        element.addEventListener("dragend", (event) => {
            event.target.classList.remove("hidden");
        });
    });
};

addNotes();

saveChanges.addEventListener("click", () => {
    localStorage.setItem(title.value, des.value);
    title.value = "", des.value = "";

    addNotes();
});

let deleteAllNotes = () => {
    localStorage.clear();
    addNotes();
};

Array.from(document.querySelectorAll(".close-note")).forEach((element) => {
    element.addEventListener("click", () => {
        localStorage.removeItem(element.previousElementSibling.innerHTML);
        element.parentNode.parentNode.parentNode.parentNode.parentNode.removeChild(element.parentNode.parentNode.parentNode.parentNode);
    });
});

deleteAll.addEventListener("click", () => {
    modal2.showModal();
});

cancel.addEventListener("click", () => modal2.close());

yes.addEventListener("click", deleteAllNotes);

Array.from(document.querySelectorAll(".drag")).forEach((element) => {
    element.addEventListener("dragstart", (event) => {
        event.dataTransfer.clearData();
        event.dataTransfer.setData("text/html", event.target.id);
        setTimeout(() => {
            event.target.classList.add("hidden");
        });
    });

    element.addEventListener("dragend", (event) => {
        event.target.classList.remove("hidden");
    });
});


bin.addEventListener("dragover", (event) => {
    event.preventDefault();
});

// bin.addEventListener("dragenter", () => {

// });

// bin.addEventListener("dragleave", () => {

// });

bin.addEventListener("drop", (event) => {
    event.preventDefault();
    let element = document.getElementById(event.dataTransfer.getData("text"));
    localStorage.removeItem(element.firstElementChild.firstElementChild.firstElementChild.firstElementChild.innerHTML);
    element.remove();
});
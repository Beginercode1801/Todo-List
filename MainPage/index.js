function loadProduct() {
    const productContainer = document.querySelector('#todo-list');
    productContainer.innerHTML = " ";
    db.collection("task").orderBy("createdAt", "desc").get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                const products = doc.data();
                const productElemental = document.createElement("div");
                color = "#2ecc71"
                delet = `<button>❌</button>`
                if (products.important == "yes" && products.urgent == "yes") {
                    color = "#e74c3c"
                } else if (products.important == "yes" && products.urgent == "no") {
                    color = "#e67e22"
                } else if (products.important == "no" && products.urgent == "yes") {
                    color = "#f1c40f"
                }
                productElemental.style.borderLeft = `20px solid ${color}`;
                productElemental.style.padding = "10px";
                productElemental.style.margin = "10px 0";
                productElemental.style.backgroundColor = "#f9f9f9";
                productElemental.style.borderRadius = "6px";
                productElemental.style.position = "relative";
                productElemental.innerHTML = `
            <p>${products.content}</p>
            <button id="delete" onclick="deleteTask('${doc.id}', this)">❌</button>
            `
                productContainer.appendChild(productElemental);
            });
        })
        .catch((error) => {
            console.error("Error", error)
        });
}


function addTask() {
    const taskForm = document.querySelector('#add-container');
    const content = document.querySelector('#todo-input').value;
    const urgent = document.querySelector('#urgent').value;
    const important = document.querySelector('#important').value;

    if (!content || !urgent || !important) {
        alert("Vui lòng nhập đầy đủ thông tin.");
        return;
    }

    db.collection("task").add({
        content: content,
        important: important,
        urgent: urgent,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
    })
        .then(() => {
            console.log("Add task successfully");
            taskForm.reset();
            loadProduct()
            urgent_important();
            Important();
            Urgent();
            normal();
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });

}

function deleteTask(id, btnElement) {
    db.collection("task").doc(id).delete()
        .then(() => {
            console.log("Task deleted!");
            const taskElement = btnElement.closest('div');
            taskElement.remove();
            loadProduct()
            urgent_important();
            Important();
            Urgent();
            normal();
        })
        .catch((error) => {
            console.error("Error removing task:", error);
        });
}

function urgent_important() {
    const productContainer = document.querySelector('#urgent-important');
    productContainer.innerHTML = " ";
    db.collection("task").where('important', '==', 'yes').where('urgent', '==', 'yes').get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                const products = doc.data();
                const productElemental = document.createElement("div");
                productElemental.style.backgroundColor = "#c24040"
                productElemental.style.width = "265px";
                productElemental.style.height = "40px";
                productElemental.style.padding = "2px";
                productElemental.style.margin = "10px 0";
                productElemental.style.borderRadius = "6px";
                productElemental.style.position = "relative";
                productElemental.innerHTML = `
            <p>${products.content}</p>
            `
                productContainer.appendChild(productElemental);
            });
        })
        .catch((error) => {
            console.error("Error", error)
        });
}

function Important() {
    const productContainer = document.querySelector('#Important');
    productContainer.innerHTML = " ";
    db.collection("task").where('important', '==', 'yes').where('urgent', '==', 'no').get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                const products = doc.data();
                const productElemental = document.createElement("div");
                productElemental.style.backgroundColor = "#d1814f"
                productElemental.style.width = "265px";
                productElemental.style.height = "40px";
                productElemental.style.padding = "2px";
                productElemental.style.margin = "10px 0";
                productElemental.style.borderRadius = "6px";
                productElemental.style.position = "relative";
                productElemental.innerHTML = `
            <p>${products.content}</p>
            `
                productContainer.appendChild(productElemental);
            });
        })
        .catch((error) => {
            console.error("Error", error)
        });
}

function Urgent() {
    const productContainer = document.querySelector('#Urgent');
    productContainer.innerHTML = " ";
    db.collection("task").where('important', '==', 'no').where('urgent', '==', 'yes').get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                const products = doc.data();
                const productElemental = document.createElement("div");
                productElemental.style.backgroundColor = "#d4ba4e"
                productElemental.style.width = "265px";
                productElemental.style.height = "40px";
                productElemental.style.padding = "2px";
                productElemental.style.margin = "10px 0";
                productElemental.style.borderRadius = "6px";
                productElemental.style.position = "relative";
                productElemental.innerHTML = `
            <p>${products.content}</p>
            `
                productContainer.appendChild(productElemental);
            });
        })
        .catch((error) => {
            console.error("Error", error)
        });
}

function normal() {
    const productContainer = document.querySelector('#normal');
    productContainer.innerHTML = " ";
    db.collection("task").where('important', '==', 'no').where('urgent', '==', 'no').get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                const products = doc.data();
                const productElemental = document.createElement("div");
                productElemental.style.backgroundColor = "#63c75b"
                productElemental.style.width = "265px";
                productElemental.style.height = "40px";
                productElemental.style.padding = "2px";
                productElemental.style.margin = "10px 0";
                productElemental.style.width = "250px";
                productElemental.style.height = "40px";
                productElemental.style.borderRadius = "6px";
                productElemental.style.position = "relative";
                productElemental.innerHTML = `
            <p>${products.content}</p>
            `
                productContainer.appendChild(productElemental);
            });
        })
        .catch((error) => {
            console.error("Error", error)
        });
}

window.onload = function () {
    loadProduct();
    urgent_important();
    Important();
    Urgent();
    normal();
};
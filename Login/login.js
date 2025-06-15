const inpEmail = document.querySelector("#email");
const inpPassword = document.querySelector("#password");
const LoginForm = document.querySelector("#login-Form");

function handleLogin(e) {
    e.preventDefault();

    let email = inpEmail.value;
    let password = inpPassword.value;

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in
            var user = userCredential.user;
            alert("Login succesfully");
            window.location.href = "../MainPage/index.html";
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(`Error: ${error.message}`)
        });
}

LoginForm.addEventListener("submit", handleLogin);
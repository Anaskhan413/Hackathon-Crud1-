
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";
import { db, auth } from "./firebaseConfig.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";

// Get the signup button element
const signupButton = document.querySelector("#signupButton");
signupButton.addEventListener("click", signUp);

async function signUp(e) {
    try {
        // Get user input values
        const fullName = document.getElementById("fullName").value;
        const phoneNumber = document.getElementById("phoneNumber").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const firstName = document.getElementById("firstName").value;
        const lastName = document.getElementById("lastName").value;
  const userType = document.getElementById("userType");
  



        // Update signup button UI
        signupButton.className = "btn btn-info";
        signupButton.innerHTML = `
            <div class="spinner-border text-light" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>`;

        // Check if required fields are filled
        if (!fullName || !phoneNumber || !email || !password || !firstName || !lastName) {
            alert("Submit Required Fields");
            return;
        }

        // Check if user type is selected
        if (userType.selectedIndex === 0) {
            alert("Kindly select user type");
            return;
        }

        // Create user authentication
        const userAuthentication = await createUserWithEmailAndPassword(auth, email, password);
        const uid = userAuthentication.user.uid;

        // Create user object to store in Firestore
        const userObj = {
            fullName,
            phoneNumber,
            email,
            firstName,
            lastName,
            accountActivate: true,
            uid,
            type: userType.value
        };

        const userReference = doc(db, "users", uid);
        await setDoc(userReference, userObj);

        // Redirect to the home page after successful signup
        window.location.assign("./login.html");
    } catch (error) {
        alert(error.message);
    } finally {
        signupButton.className = "btn btn-primary";
        signupButton.innerHTML = `SIGN UP`;
    }
}


import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";

import { auth, db } from "./firebaseConfig.js";

const loginButton = document.querySelector("#loginButton");
loginButton.addEventListener("click", login);

async function login(e) {
  try {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    console.log(email, password);

    loginButton.className = "btn btn-info";
    loginButton.innerHTML = `<div class="spinner-border text-light" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>`;

    const loginUser = await signInWithEmailAndPassword(auth, email, password);
    console.log(loginUser);

    const userRefence = doc(db, "users", loginUser.user.uid);
    const docSnapshot = await getDoc(userRefence);

    if (!docSnapshot.exists()) {
      console.log("No such document!");
      alert("Invalid user");
      return;
    }

    console.log("Document data:", docSnapshot.data());
    const userData = docSnapshot.data();

    localStorage.setItem("user", JSON.stringify(userData));

    if (userData.type === "Admin") {
      window.location.replace("/admin.html");
    } else if (userData.type === "user") {
      if (!userData.accountActivate) {
        loginButton.className = "btn btn-danger";
        loginButton.innerHTML = `Login`;
        alert("Your account is disabled");
        return;
      }
      window.location.replace("/user.html");
    } else if (userData.type === "Customer") {
      if (!userData.accountActivate) {
        loginButton.className = "btn btn-danger";
        loginButton.innerHTML = `Login`;
        alert("Your account has been disabled");
        return;
      }
      window.location.replace("/customer/customer.html");
    }
  } catch (error) {
    console.log("error", error.message);
    loginButton.className = "btn btn-danger";
    loginButton.innerHTML = `LOGIN`;
    alert(error.message);
  }
}

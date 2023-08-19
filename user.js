// app.js

import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";
import { auth, db } from "./firebaseConfig.js";

const productCollection = collection(db, "product");
const ProductForm = document.getElementById("ProductForm");
ProductForm.addEventListener("submit", addproduct);


window.addEventListener("load", getProduct)
const productParent = document.getElementById("productParent")
console.log(productParent)

async function getProduct() {
    const getProduct = await getDocs(productCollection);
    getProduct.forEach(function (doc) {
        const card =`
        <div class="col-12">
            <div class="card" id="card-${doc.id}" >
                <div class="card-body">
                    <h5 class="card-title">${doc.data().name}</h5>
                    <p class="card-text">${doc.data().desc}</p>
                </div>
                <div class="card-footer">
                    <button class="btn btn-danger" onclick="deleteCard('${doc.id}')">Delete</button>
                </div>
            </div>
        </div>
     
        `
        productParent.innerHTML += card
        ;
         productParent.style.backgroundColor = "pink"
         productParent.style.width = " 460px"
         productParent.style.height = " 300px"
         productParent.style.paddingTop = " 100px"
         productParent.style.display = " flex"
         productParent.style.borderRadius = " 10px"
         productParent.style.paddingLeft = " -80px"
    });
}

// async function deleteCard(id) {
    
//     const confirmation = confirm("Are you sure you want to delete this card?");
//     if (confirmation) {
//         const cardElement = document.getElementById(`card-${id}`);
//         cardElement.remove();

//         // Delete the corresponding data from the database using doc(id)
//         const cardRef = doc(db, "product",doc. id);
//         await deleteDoc(cardRef);
//     }
// }



async function addproduct(e) {
    try {
        e.preventDefault();
        const productName = e.target.productName.value;
        const productDesc = e.target.productDesc.value;
    

        const user = JSON.parse(localStorage.getItem("user"));
        const productObj = {
            name: productName,
            desc: productDesc,
            userUid: user.uid
        };

        console.log("add", productObj);
        await addDoc(productCollection, productObj);
        alert("Post added successfully");

    } catch (error) {
        alert(error.message);
    }
}

const logoutBtn = document.getElementById("logout");
logoutBtn.addEventListener("click", (event) => {
    event.preventDefault();
    localStorage.removeItem("userUid")
    window.location.replace("/index.html")});


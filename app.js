const getdata = document.getElementById("productParent")
console.log(getdata)
window.addEventListener("load",getProduct)

async function getProduct() {
    const getProduct = await getDocs(productCollection);
    getProduct.forEach(function (doc) {
        const card =`
        <div class="col-4">
            <div class="card" id="card-${doc.id}" style="width: 18rem;">
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
        getdata.innerHTML += card
        ;
         productParent.style.backgroundColor = "pink"
         productParent.style.width = " 1150px"
         productParent.style.height = " 600px"
         productParent.style.paddingTop = " 100px"
         productParent.style.display = " flex"
    });
}

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyC-CxVvanJhToBRrDU0t0t8RYsM1B-aDP8",
  authDomain: "fish-market-9d53c.firebaseapp.com",
  projectId: "fish-market-9d53c",
  storageBucket: "fish-market-9d53c.appspot.com",
  messagingSenderId: "483438888463",
  appId: "1:483438888463:web:6ebc8ed8b5b1a8b477c57a",
  measurementId: "G-LEDM2JG74N"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
function addToOrder(itemLabel, btn) {
  let name = itemLabel, price = 0;
  const match = itemLabel.match(/(.*)\s-\sEGP\s*([\d.]+)/);
  if (match) { 
    name = match[1].trim(); 
    price = parseFloat(match[2]); 
  }

  const itemElem = btn.closest('.item');
  const textarea = itemElem ? itemElem.querySelector('textarea') : null;
  const comment = textarea ? textarea.value.trim() : '';

  let option = '';
  let sectionName = '';
  if (itemElem) {
    const section = itemElem.dataset.section;
    const index = itemElem.dataset.index;
    const optionName = `${section}_${index}_option`;
    const selected = itemElem.querySelector(`input[name="${optionName}"]:checked`);
    if (selected) option = selected.value;

    sectionName = section;
  }

  const id = ++orderIdCounter;
  order.push({ id, section: sectionName, name, price, option, comment });
  total += price;
  updateOrderList();
}

function updateOrderList() {
  const list = document.getElementById("order-list");
  if (!list) return;
  list.innerHTML = "";

  order.forEach(item => {
    const li = document.createElement("li");
    li.setAttribute('data-id', item.id);

    let text = `${item.section} - ${item.name}`;
    if(item.price > 0) text += ` - EGP ${item.price}`;
    if(item.option) text += ` | Option: ${item.option}`;
    if(item.comment) text += ` | Note: ${escapeHtml(item.comment)}`;

    if(item.id === 0){
      li.textContent = text; 
    } else {
      li.innerHTML = `${text} <span class="remove-span" onclick="removeItem(${item.id})" style="color:red; cursor:pointer;">×</span>`;
    }

    list.appendChild(li);
  });

  if (document.getElementById("total"))
    document.getElementById("total").textContent = `Total: EGP ${total}`;
}

function openPopup() {
  if(order.length === 0){ alert("No items in order!"); return; }
  const popupList = document.getElementById("popup-order-list");
  if (!popupList) return;
  popupList.innerHTML = "";

  order.forEach(item => {
    const li = document.createElement("li");

    let text = `${item.section} - ${item.name}`;
    if(item.price > 0) text += ` - EGP ${item.price}`;
    if(item.option) text += ` | Option: ${item.option}`;
    if(item.comment) text += ` | Note: ${escapeHtml(item.comment)}`;

    li.textContent = text;
    popupList.appendChild(li);
  });

  document.getElementById("popup-total").textContent = `Total: EGP ${total}`;
  document.getElementById("popup").style.display = "flex";
}








let isSaving = false; 

async function okAndSave() {
    if (isSaving) return;
    if (order.length <= 1) {
        alert("No items in order!");
        return;
    }
    isSaving = true;
    const okBtn = document.getElementById("okBtn");
    if (okBtn) okBtn.disabled = true;
    try {
        const docRef = await addDoc(collection(db, "orders"), {
            items: order,
            total: total,
            timestamp: new Date()
        });
        alert("✅ Order saved! ID: " + docRef.id);
        order = [{ id: 0, name: "Table:" + currentTable, price: 0, section: '', option: '', comment: '' }];
        total = 0;
        orderIdCounter = 0;
        updateOrderList();
        closePopup(); 
    } catch (e) {
        console.error("Error adding document: ", e);
        alert("❌ Error saving order!");
    } finally {
        isSaving = false;
        if (okBtn) okBtn.disabled = false;
    }
}



window.showSection = showSection;
window.toggleMode = toggleMode;
window.toggleZoom = toggleZoom;
window.addToOrder = addToOrder;
window.removeItem = removeItem;
window.openPopup = openPopup;
window.closePopup = closePopup;
window.okAndSave = okAndSave;

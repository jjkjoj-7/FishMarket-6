
function escapeHtml(unsafe) {
  if (!unsafe) return '';
  return unsafe.replace(/[&<>"'`=\/]/g, s => (
    {'&':"&amp;",'<':"&lt;",'>':"&gt;",'"':"&quot;","'":"&#39;","/":"&#x2F;","`":"&#x60;","=":"&#x3D;"}[s]
  ));
}


// function addToOrder(itemLabel, btn, optionGroup) {
//   const section = btn.closest(".item").dataset.section;
//   const index = btn.closest(".item").dataset.index;
//   const radios = document.getElementsByName(section + "_" + index + "_option");
//   let selectedOption = "";
//   for (let radio of radios) {
//     if (radio.checked) {
//       selectedOption = radio.value;
//       break;
//     }
//   }

//   const arabicOption = optionTranslations[selectedOption] || selectedOption;

//   const comment = escapeHtml(btn.parentElement.querySelector("textarea").value);
//   const id = ++orderIdCounter;
//   const orderList = document.getElementById("order-list");

//   const li = document.createElement("li");
//   li.dataset.id = id;
//   li.innerHTML = `${section} - ${itemLabel} | Option: ${arabicOption} <span class="remove-span" onclick="removeItem(${id})" style="color:red; cursor:pointer;">×</span>`;
//   orderList.appendChild(li);


//   const priceMatch = itemLabel.match(/EGP\s*(\d+)/);
//   if (priceMatch) total += parseFloat(priceMatch[1]);
//   document.getElementById("total").innerText = "Total: EGP "+ total  ;
// }

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



// function removeItem(id) {
//   const li = document.querySelector(`#order-list li[data-id='${id}']`);
//   if (!li) return;
//   const text = li.textContent;
//   const match = text.match(/EGP\s*(\d+)/);
//   if (match) total -= parseFloat(match[1]);
//   li.remove();
//   document.getElementById("total").innerText = "Total: EGP " + total;
// }

function removeItem(id) {
  const idx = order.findIndex(i => i.id === id);
  if(idx !== -1){
    total -= order[idx].price;
    order.splice(idx, 1);
    updateOrderList();
  }
}





  const translations = {
  "en": {
    "title": "Fish Market Restaurant",
    "subtitle": "Healthy, Tasty & Delight Food",
    "slogan": "The Only Way For Catch Of The Day in El Gouna",
    "order": "Your Order:",
    "submit": "Submit Order",
    "noItems": "No items in order!",
    "savedOrder": "✅ Order saved! ID:",  
    "errorSaving": "❌ Error saving order!",
    "table": "Table",
    "total": "Total",
      "COLD_APPETIZERS": "COLD APPETIZERS",
      "HOT_APPETIZERS": "HOT APPETIZERS",
      "SOUP": "SOUP",
      "PASTA": "PASTA",
      "RICE_MIXED_WITH": "RICE MIXED WITH",
      "SPICE_TAGIN": "SPICE TAGIN",
      "GRILLED_FRIED": "GRILLED & FRIED",
      "SPECIALTIES": "SPECIALTIES",
      "BEEF_CHICKEN": "BEEF & CHICKEN",
      "DESSERTS": "DESSERTS",
      "SOFT_DRINKS": "SOFT DRINKS",
      "HOT_DRINKS": "HOT DRINKS",
      "FRESH_JUICES": "FRESH JUICES",
      "TABLE": "TABLE",
      
    "items": {
    "COLD_APPETIZERS": [
      { "name": "Colbacho", "price": "EGP 420", "desc": "Raw Tuna, Olive Oil, Lemon, Pepper", "placeholder": "Add your comment" },
      { "name": "Shrimp Cocktail", "price": "EGP 440", "desc": "Baby Shrimps, Cognac, Mayo, Orange Juice, Sauce", "placeholder": "Add your comment" },
      { "name": "Tuna Salad", "price": "EGP 285", "desc": "Tomato, Lettuce, Olive Oil, Lemon, Green Pepper", "placeholder": "Add your comment" },
      { "name": "Creek Salad", "price": "EGP 265", "desc": "Tomato, Lettuce, Cucumber, Olives, Feta, Olive Oil, Lemon, Green Pepper", "placeholder": "Add your comment" },
      { "name": "Lebanese Mezze", "price": "EGP 335", "desc": "Tahina, Hummus, Baba Ghanoush", "placeholder": "Add your comment" },
      { "name": "Fish Market Salad", "price": "EGP 550", "desc": "Shrimps, Calamari, Octopus, Tuna, Lettuce, Tomato, Onion", "placeholder": "Add your comment" }
    ],
    
      "HOT_APPETIZERS": [
        {"name": "Sardine", "price": "EGP 165", "options": ["Grilled","Fried"], "placeholder": "Add your comment"},
        {"name": "Clams (100gr)", "price": "EGP 140", "placeholder": "Add your comment"},
        {"name": "Mussels (100gr)", "price": "EGP 335", "placeholder": "Add your comment"},
        {"name": "Calamari (100gr)", "price": "EGP 175", "options": ["Grilled","Fried"], "placeholder": "Add your comment"},
        {"name": "Shrimps M (100gr)", "price": "EGP 200", "options": ["Grilled","Fried","Butterfly"], "placeholder": "Add your comment"},
        {"name": "Garlic Bread", "price": "EGP 155", "placeholder": "Add your comment"},
        {"name": "Crostino e Mozzarella", "price": "EGP 150", "placeholder": "Add your comment"},
        {"name": "Crostino e Mozzarella & Shrimps", "price": "EGP 245", "placeholder": "Add your comment"},
        {"name": "Crostino e Mozzarella & Calamari", "price": "EGP 225", "placeholder": "Add your comment"},
        {"name": "Crostino e Mozzarella & Anchovies", "price": "EGP 240", "placeholder": "Add your comment"}
      ],
      "SOUP": [
        {"name": "Seafood Soup (250gr)", "price": "EGP 225", "options": ["Plain","Creamy"], "placeholder": "Add your comment"},
        {"name": "Tomato Soup", "price": "EGP 140", "placeholder": "Add your comment"},
        {"name": "Vegetable Soup", "price": "EGP 140", "placeholder": "Add your comment"},
        {"name": "Lentil Soup", "price": "EGP 145", "placeholder": "Add your comment"},
        {"name": "Fish Soup", "price": "EGP 215", "options": ["Plain","Creamy"], "placeholder": "Add your comment"},
        {"name": "Shrimp Soup", "price": "EGP 255", "options": ["Plain","Creamy"], "placeholder": "Add your comment"},
        {"name": "Special Seafood Soup", "price": "EGP 310", "options": ["Plain","Creamy"], "placeholder": "Add your comment"}
      ],
      "PASTA": [
        {"name": "Pomodoro", "price": "EGP 280", "desc": "Tomato Sauce, Basil", "placeholder": "Add your comment"},
        {"name": "Olio Alio", "price": "EGP 270", "desc": "Garlic, Chili, Olive Oil", "placeholder": "Add your comment"},
        {"name": "Arabiatta", "price": "EGP 270", "desc": "Garlic, Chili, Tomato Sauce", "placeholder": "Add your comment"},
        {"name": "Clams", "price": "EGP 430", "desc": "Garlic, Olive Oil, Fresh Tomato, Parsley", "placeholder": "Add your comment"},
        {"name": "Shrimps", "price": "EGP 475", "desc": "Olive Oil, Fresh Tomato, Garlic, Chili", "options": ["Red Sauce","White Sauce"], "placeholder": "Add your comment"},
        {"name": "Lobster (400gr)", "price": "EGP 2125", "desc": "Garlic, Olive Oil, Parsley, Chili", "placeholder": "Add your comment"},
        {"name": "Seafood", "price": "EGP 480", "desc": "Shrimp, Calamari, Fish, Clams, Parsley, Olive Oil, Fresh Tomato", "options": ["Red Sauce","White Sauce"], "placeholder": "Add your comment"}
      ],
      "RICE_MIXED_WITH": [
        {"name": "Fish", "price": "EGP 380", "desc": "Oil, Onions, Parsley, Chili, Tomato", "placeholder": "Add your comment"},
        {"name": "Clams", "price": "EGP 410", "desc": "Oil, Onions, Parsley, Chili", "placeholder": "Add your comment"},
        {"name": "Calamari", "price": "EGP 390", "desc": "Onions, Parsley, Sesame Oil, Pepper", "placeholder": "Add your comment"},
        {"name": "Baby Shrimps", "price": "EGP 400", "desc": "Onions, Parsley, Oil, Tomato", "placeholder": "Add your comment"},
        {"name": "Seafood", "price": "EGP 420", "desc": "Shrimp, Calamari, Fish, Clams, Onions, Parsley, Oil, Tomato", "placeholder": "Add your comment"}
      ],
      "SPICE_TAGIN": [
        {"name": "Shrimps M", "price": "EGP 490", "options": ["Red Sauce","White Sauce"], "placeholder": "Add your comment"},
        {"name": "Shrimps S", "price": "EGP 470", "options": ["Red Sauce","White Sauce"], "placeholder": "Add your comment"},
        {"name": "Calamari", "price": "EGP 475", "options": ["Red Sauce","White Sauce"], "placeholder": "Add your comment"},
        {"name": "Fish", "price": "EGP 425", "options": ["Red Sauce","White Sauce"], "placeholder": "Add your comment"},
        {"name": "Seafood", "price": "EGP 420", "options": ["Red Sauce","White Sauce"], "placeholder": "Add your comment"}
      ],
      "GRILLED_FRIED": [
        {"name": "Lobster (1kg)", "price": "EGP 4200", "options": ["Boiled","White Sauce"], "placeholder": "Add your comment"},
        {"name": "Crabs (300gr)", "price": "EGP 490", "options": ["Grilled","Boiled"], "placeholder": "Add your comment"},
        {"name": "Octopus (250gr)", "price": "EGP 530", "options": ["Grilled","Butterfly"], "placeholder": "Add your comment"},
        {"name": "Calamari (250gr)", "price": "EGP 415", "options": ["Grilled","Fried"], "placeholder": "Add your comment"},
        {"name": "White Snapper (500gr)", "price": "EGP 550", "options": ["Grilled","Fried"], "placeholder": "Add your comment"},
        {"name": "Soul Fish (500gr)", "price": "EGP 285", "options": ["Grilled","Fried"], "placeholder": "Add your comment"},
        {"name": "Sea Bass (For Two)", "price": "EGP 1200", "options": ["Grilled Close","Grilled Butterfly","Fried"], "placeholder": "Add your comment"},
        {"name": "Red Snapper (For Two)", "price": "EGP 1060", "options": ["Grilled Close","Grilled Butterfly","Fried"], "placeholder": "Add your comment"},
        {"name": "Barboni (250gr)", "price": "EGP 380", "options": ["Grilled","Fried"], "placeholder": "Add your comment"},
        {"name": "Shrimps L (300gr)", "price": "EGP 800", "options": ["Grilled","Fried","Butterfly"], "placeholder": "Add your comment"},
        {"name": "Shrimps M (200gr)", "price": "EGP 450", "options": ["Grilled","Fried","Butterfly"], "placeholder": "Add your comment"},
        {"name": "Fish Fillet (250gr)", "price": "EGP 690", "options": ["Grilled","Fried"], "placeholder": "Add your comment"},
        {"name": "Fish and Chips", "price": "EGP 720", "placeholder": "Add your comment"}
      ],
      "SPECIALTIES": [
        {"name": "Aragust Lobster (500gr)", "price": "EGP 2600", "desc": "Fresh Tomato, Olive Oil, Garlic, Pasta", "placeholder": "Add your comment"},
        {"name": "Bronze (300gr)", "price": "EGP 900", "desc": "Olilo Alio, Pasta", "placeholder": "Add your comment"},
        {"name": "Octopus", "price": "EGP 600", "desc": "Pasta Primavera, Anchovies, Capers", "placeholder": "Add your comment"},
        {"name": "Shrimps & Calamari (500gr)", "price": "EGP 1150", "placeholder": "Add your comment"},
        {"name": "Mixed Seafood Platter", "price": "EGP 1700", "placeholder": "Add your comment"},
        {"name": "Fritto Misto", "price": "EGP 1150", "placeholder": "Add your comment"}
      ],
      "BEEF_CHICKEN": [
        {"name": "Grilled Steak", "price": "EGP 730", "desc": "with Vegetable", "placeholder": "Add your comment"},
        {"name": "Pepper Steak", "price": "EGP 730", "desc": "with Vegetable & Rice", "placeholder": "Add your comment"},
        {"name": "Escalope Pane", "price": "EGP 650", "desc": "with French Fries", "placeholder": "Add your comment"},
        {"name": "Chicken Pane", "price": "EGP 470", "desc": "with French Fries", "placeholder": "Add your comment"}
      ],
      "DESSERTS": [
        {"name": "Fruit Salad", "price": "EGP 220", "placeholder": "Add your comment"},
        {"name": "Fruit Platter", "price": "EGP 400", "placeholder": "Add your comment"},
        {"name": "Ice Cream", "price": "EGP 150", "placeholder": "Add your comment"}
      ],
      "SOFT_DRINKS": [
        {"name": "Cola", "price": "EGP 85", "placeholder": "Add your comment"},
        {"name": "Fanta", "price": "EGP 85", "placeholder": "Add your comment"},
        {"name": "Sprite", "price": "EGP 85", "placeholder": "Add your comment"},
        {"name": "Mineral Water Small", "price": "EGP 60", "placeholder": "Add your comment"},
        {"name": "Mineral Water Large", "price": "EGP 75", "placeholder": "Add your comment"},
        {"name": "Sparkling Water", "price": "EGP 85", "placeholder": "Add your comment"},
        {"name": "Hibiscus (Karakade)", "price": "EGP 125", "placeholder": "Add your comment"},
        {"name": "Iced Tea", "price": "EGP 130", "placeholder": "Add your comment"}
      ],
      "HOT_DRINKS": [
        {"name": "Tea", "price": "EGP 70", "placeholder": "Add your comment"},
        {"name": "Coffee", "price": "EGP 85", "placeholder": "Add your comment"},
        {"name": "Anise Tea", "price": "EGP 65", "placeholder": "Add your comment"},
        {"name": "Tilia", "price": "EGP 65", "placeholder": "Add your comment"},
        {"name": "Nescafe", "price": "EGP 90", "placeholder": "Add your comment"},
        {"name": "Espresso", "price": "EGP 75", "placeholder": "Add your comment"},
        {"name": "Cappuccino", "price": "EGP 115", "placeholder": "Add your comment"},
        {"name": "Cafe Latte", "price": "EGP 115", "placeholder": "Add your comment"},
        {"name": "Hot Chocolate", "price": "EGP 150", "placeholder": "Add your comment"},
        {"name": "Ginger Lemon Honey", "price": "EGP 165", "placeholder": "Add your comment"},
        {"name": "Ginger Orange", "price": "EGP 175", "placeholder": "Add your comment"},
        {"name": "Hot Cider", "price": "EGP 150", "placeholder": "Add your comment"}
      ],
      "FRESH_JUICES": [
        {"name": "Fresh Cocktail", "price": "EGP 120", "placeholder": "Add your comment"},
        {"name": "Mango Juice", "price": "EGP 95", "placeholder": "Add your comment"},
        {"name": "Orange Juice", "price": "EGP 100", "placeholder": "Add your comment"},
        {"name": "Lemon Juice", "price": "EGP 95", "placeholder": "Add your comment"},
        {"name": "Strawberry Juice", "price": "EGP 95", "placeholder": "Add your comment"}
      ] }
  },
  "ar": {
    "title": "مطعم فيش ماركت",
    "subtitle": "طعام صحي، لذيذ وممتع",
    "slogan": "الطريقة الوحيدة لصيد اليوم في الجونة",
    "order": "طلبك:",
    "submit": "إرسال الطلب",
    "table": "Table",
    "total": "Total",
    "sections": {
      "COLD_APPETIZERS": "  مقبلات باردة",
      "HOT_APPETIZERS": " مقبلات ساخنة",
      "SOUP": "شوربة",
      "PASTA": "مكرونة",
      "RICE_MIXED_WITH": "مدفون مع ألارز ",
      "SPICE_TAGIN": "طاجن بالتوابل",
      "GRILLED_FRIED": "مشوي أو مقلي",
      "SPECIALTIES": "أطباق مميزة",
      "BEEF_CHICKEN": "للحوم ودجاج",
      "DESSERTS": "حلو",
      "SOFT_DRINKS": "مشروبات غازية",
      "HOT_DRINKS": "مشروبات ساخنة",
      "FRESH_JUICES": "عصائر فريش",
      "TABLE": " الطاولة"
    },

    "items": { 
      "COLD_APPETIZERS": [
        {"name": "سمك تونه نيء", "price": "420 جنيه", "desc": "   سمك نيئة، زيت زيتون، ليمون، ملح، فلفل", "placeholder": "أضف تعليقك"},
        {"name": "كوكتيل جمبري", "price": "440 جنيه", "desc": "جمبري صغير، كونياك، مايونيز، عصير برتقال، صوص", "placeholder": "أضف تعليقك"},
        {"name": "سلطة تونة", "price": "285 جنيه", "desc": "طماطم، خس، زيت زيتون، ليمون، فلفل رومي", "placeholder": "أضف تعليقك"},
        {"name": "سلطة يوناني", "price": "265 جنيه", "desc": "طماطم، خص، خيار، زيتون، جبنة فيتا، زيت زيتون، ليمون، فلفل رومي", "placeholder": "أضف تعليقك"},
        {"name": "مزة لبنانية", "price": "335 جنيه", "desc": "طحينة، حمص، بابا غنوج", "placeholder": "أضف تعليقك"},
        {"name": "سلطة فيش ماركت", "price": "550 جنيه", "desc": "جمبري، كاليماري، أخطبوط، تونة، خص، طماطم، بصل", "placeholder": "أضف تعليقك"}
      ],
    "HOT_APPETIZERS": [
      {"name": "سردين", "price": "165 جنيه", "options": ["مشوي","مقلي"], "placeholder": "أضف تعليقك"},
      {"name": "جندوفلي  ( 100 جرام )", "price": "140 جنيه", "placeholder": "أضف تعليقك"},
      {"name": "بلح البحر ( 100 جرام )", "price": "335 جنيه", "placeholder": "أضف تعليقك"},
      {"name": "كاليماري (100 جرام)", "price": "175 جنيه", "options": ["مشوي","مقلي"], "placeholder": "أضف تعليقك"},
      {"name": "جمبري وسط (100 جرام)", "price": "200 جنيه", "options": ["مشوي","مقلي","فراشة"], "placeholder": "أضف تعليقك"},
      {"name": "عيش بالثوم", "price": "155 جنيه", "placeholder": "أضف تعليقك"},
      {"name": "كروستينو موتزاريلا", "price": "150 جنيه", "placeholder": "أضف تعليقك"},
      {"name": "كروستينو موتزاريلا والجمبري", "price": "245 جنيه", "placeholder": "أضف تعليقك"},
      {"name": "كروستينو موتزاريلا والكاليماري", "price": "225 جنيه", "placeholder": "أضف تعليقك"},
      {"name": "كروستينو موتزاريلا والأنشوجة", "price": "240 جنيه", "placeholder": "أضف تعليقك"}
  ],

      "SOUP": [
        {"name": "شوربة فواكة البحرية (250 جرام)", "price": "225 جنيه", "options": ["سادة","كريمية"], "placeholder": "أضف تعليقك"},
        {"name": "شوربة طماطم", "price": "140 جنيه", "placeholder": "أضف تعليقك"},
        {"name": "شوربة خضار", "price": "140 جنيه", "placeholder": "أضف تعليقك"},
        {"name": "شوربة عدس", "price": "145 جنيه", "placeholder": "أضف تعليقك"},
        {"name": "شوربة سمك", "price": "215 جنيه", "options": ["سادة","كريمية"], "placeholder": "أضف تعليقك"},
        {"name": "شوربة جمبري", "price": "255 جنيه", "options": ["سادة","كريمية"], "placeholder": "أضف تعليقك"},
        {"name": "شوربة فوتكه البحر مميزة", "price": "310 جنيه", "options": ["سادة","كريمية"], "placeholder": "أضف تعليقك"}
      ],
        "PASTA": [
  {
    "name": "مكرونة بالطماطم",
    "price": "EGP 280",
    "desc": "صلصة طماطم، ريحان",
    "placeholder": "أضف تعليقك"
  },
  {
    "name": "مكرونة بالزيت والثوم",
    "price": "EGP 270",
    "desc": "ثوم، شطة، زيت زيتون",
    "placeholder": "أضف تعليقك"
  },
  {
    "name": "مكرونة حارة",
    "price": "EGP 270",
    "desc": "ثوم،  شطة، صلصة طماطم",
    "placeholder": "أضف تعليقك"
  },
  {
    "name": "مكرونة بالجندوفلي ",
    "price": "EGP 430",
    "desc": "ثوم، زيت زيتون، طماطم طازجة، بقدونس",
    "placeholder": "أضف تعليقك"
  },
  {
    "name": "مكرونة بالجمبري",
    "price": "EGP 475",
    "desc": "زيت زيتون، طماطم طازجة، ثوم، فلفل حار",
    "options": ["صلصة حمراء", "صلصة بيضاء"],
    "placeholder": "أضف تعليقك"
  },
  {
  "name": " مكرونة بالاستاكوزا  (400 جرام)",
  "price": "EGP 2125",
  "desc": "ثوم، زيت زيتون، بقدونس، شطة",
  "placeholder": "أضف تعليقك"
},

  {
    "name": "مكرونة ميكس سي فود ",
    "price": "EGP 480",
    "desc":" جمبري، كاليماري، سمك،  جندوفلي، أخطبوط، كابوريا، بقدونس، زيت زيتون، شطة، زيت زيتون، ثوم،طماطم طازجة",
    "options": ["صلصة حمراء", "صلصة بيضاء"],
    "placeholder": "أضف تعليقك"
  }
],


      "RICE_MIXED_WITH": [
        {"name": " سمك", "price": "380 جنيه", "desc": "زيت، بصل، بقدونس، شطة، طماطم", "placeholder": "أضف تعليقك"},
        {"name":"جندوفلي", "price": "410 جنيه", "desc": "زيت، بصل، بقدونس، شطه", "placeholder": "أضف تعليقك"},
        {"name": "كاليماري", "price": "390 جنيه", "desc": "بصل، بقدونس، زيت السمسم، فلفل", "placeholder": "أضف تعليقك"},
        {"name": "جمبري الصغير", "price": "400 جنيه", "desc": "بصل، بقدونس، زيت، طماطم", "placeholder": "أضف تعليقك"},
        {"name":"ميكس سي فود", "price": "420 جنيه", "desc": "جمبري، كاليماري، سمك، جندوفلي، بصل، بقدونس، زيت، طماطم", "placeholder": "أضف تعليقك"}
      ],
      "SPICE_TAGIN": [
        {"name": " جمبري وسط ", "price": "490 جنيه", "options": ["صلصة حمراء","صلصة بيضاء"], "placeholder": "أضف تعليقك"},
        {"name": " جمبري صغير", "price": "470 جنيه", "options": ["صلصة حمراء","صلصة بيضاء"], "placeholder": "أضف تعليقك"},
        {"name": " كاليماري", "price": "475 جنيه", "options": ["صلصة حمراء","صلصة بيضاء"], "placeholder": "أضف تعليقك"},
        {"name": " سمك", "price": "425 جنيه", "options": ["صلصة حمراء","صلصة بيضاء"], "placeholder": "أضف تعليقك"},
        {"name": "  ميكس سي فود", "price": "420 جنيه", "options": ["صلصة حمراء","صلصة بيضاء"], "placeholder": "أضف تعليقك"}
      ],

    "GRILLED_FRIED": [
      {"name": "استاكوزا (1 كيلوجرام)", "price": "4200 جنيه", "options": ["مسلوق","صلصة بيضاء"], "placeholder": "أضف تعليقك"},
      {"name": "كابوريا (300 جرام)", "price": "490 جنيه", "options": ["مشوي","مسلوق"], "placeholder": "أضف تعليقك"},
      {"name": "أخطبوط (250 جرام)", "price": "530 جنيه", "options": ["مشوي","فراشة"], "placeholder": "أضف تعليقك"},
      {"name": "كاليماري (250 جرام)", "price": "415 جنيه", "options": ["مشوي","مقلي"], "placeholder": "أضف تعليقك"},
      {"name": "دنيس  (500 جرام)", "price": "550 جنيه", "options": ["مشوي","مقلي"], "placeholder": "أضف تعليقك"},
      {"name": "سمكة موسي  (500 جرام)", "price": "285 جنيه", "options": ["مشوي","مقلي"], "placeholder": "أضف تعليقك"},
      {"name": "اروص  (الفردين)", "price": "1200 جنيه", "options": ["مشوي مقفول","مشوي فراشة","مقلي"], "placeholder": "أضف تعليقك"},
      {"name": "مرجان  (الفردين)", "price": "1060 جنيه", "options": ["مشوي مقفول","مشوي فراشة","مقلي"], "placeholder": "أضف تعليقك"},
      {"name": "باربوني (250 جرام)", "price": "380 جنيه", "options": ["مشوي","مقلي"], "placeholder": "أضف تعليقك"},
      {"name": "جمبري كبير (300 جرام)", "price": "800 جنيه", "options": ["مشوي","مقلي","فراشة"], "placeholder": "أضف تعليقك"},
      {"name": "جمبري وسط (200 جرام)", "price": "450 جنيه", "options": ["مشوي","مقلي","فراشة"], "placeholder": "أضف تعليقك"},
      {"name": "سمك فيلية  (250 جرام)", "price": "690 جنيه", "options": ["مشوي","مقلي"], "placeholder": "أضف تعليقك"},
      {"name": "فيش آند تشيبس", "price": "720 جنيه", "placeholder": "أضف تعليقك"}
],

      "SPECIALTIES": [
    {
      "name": "استاكوزا (500 جرام)",
      "price": "2600 جنيه",
      "desc": "طماطم طازجة، زيت زيتون، ثوم، مكرونة",
      "placeholder": "أضف تعليقك"
    },
    {
      "name": "جمبري (300 جرام)",
      "price": "900 جنيه",
      "desc": "أوليو أليو، مكرونة",
      "placeholder": "أضف تعليقك"
  },
  {
      "name": "أخطبوط",
      "price": "600 جنيه",
      "desc": "باستا بريمافيرا، أنشوجة، كابر",
      "placeholder": "أضف تعليقك"
  },
  {
      "name": "جمبري وكاليماري (500 جرام)",
      "price": "1150 جنيه",
      "placeholder": "أضف تعليقك"
  },
  {
      "name": "طبق ميكس سي فود",
      "price": "1700 جنيه",
      "placeholder": "أضف تعليقك"
  },
  {
      "name": "فريتو ميستو",
      "price": "1150 جنيه",
      "placeholder": "أضف تعليقك"
  }
],


      "BEEF_CHICKEN": [
        {"name": "ستيك مشوي", "price": "730 جنيه", "desc": "مع خضار", "placeholder": "أضف تعليقك"},
        {"name": "ستيك بالفلفل", "price": "730 جنيه", "desc": "مع خضار وأرز", "placeholder": "أضف تعليقك"},
        {"name": "بوفتيك بانيه", "price": "650 جنيه", "desc": "مع بطاطس مقلية", "placeholder": "أضف تعليقك"},
        {"name": "فراخ بانيه", "price": "470 جنيه", "desc": "مع بطاطس مقلية", "placeholder": "أضف تعليقك"}
      ],
      "DESSERTS": [
        {"name": "سلطة فواكه", "price": "220 جنيه", "placeholder": "أضف تعليقك"},
        {"name": "طبق فواكه", "price": "400 جنيه", "placeholder": "أضف تعليقك"},
        {"name": "آيس كريم", "price": "150 جنيه", "placeholder": "أضف تعليقك"}
      ],
      "SOFT_DRINKS": [
        {"name": "كولا", "price": "85 جنيه", "placeholder": "أضف تعليقك"},
        {"name": "فانتا", "price": "85 جنيه", "placeholder": "أضف تعليقك"},
        {"name": "سبرايت", "price": "85 جنيه", "placeholder": "أضف تعليقك"},
        {"name": "مياه معدنية صغيرة", "price": "60 جنيه", "placeholder": "أضف تعليقك"},
        {"name": "مياه معدنية كبيرة", "price": "75 جنيه", "placeholder": "أضف تعليقك"},
        {"name": "مياه فوار", "price": "85 جنيه", "placeholder": "أضف تعليقك"},
        {"name": "كركديه", "price": "125 جنيه", "placeholder": "أضف تعليقك"},
        {"name": "شاي مثلج", "price": "130 جنيه", "placeholder": "أضف تعليقك"}
      ],
      "HOT_DRINKS": [
        {"name": "شاي", "price": "70 جنيه", "placeholder": "أضف تعليقك"},
        {"name": " قهوة تركي" , "price": "85 جنيه", "placeholder": "أضف تعليقك"},
        {"name": " يانسون", "price": "65 جنيه", "placeholder": "أضف تعليقك"},
        {"name": "تيليا", "price": "65 جنيه", "placeholder": "أضف تعليقك"},
        {"name": "نسكافيه", "price": "90 جنيه", "placeholder": "أضف تعليقك"},
        {"name": "إسبريسو", "price": "75 جنيه", "placeholder": "أضف تعليقك"},
        {"name": "كابتشينو", "price": "115 جنيه", "placeholder": "أضف تعليقك"},
        {"name": "كافيه لاتيه", "price": "115 جنيه", "placeholder": "أضف تعليقك"},
        {"name": " هوت شوكلت", "price": "150 جنيه", "placeholder": "أضف تعليقك"},
        {"name": "زنجبيل بالليمون والعسل", "price": "165 جنيه", "placeholder": "أضف تعليقك"},
        {"name": "زنجبيل بالبرتقال", "price": "175 جنيه", "placeholder": "أضف تعليقك"},
        {"name": "هوت سيدر", "price": "150 جنيه", "placeholder": "أضف تعليقك"}
      ],
      "FRESH_JUICES": [
        {"name": "كوكتيل ", "price": "120 جنيه", "placeholder": "أضف تعليقك"},
        {"name": "عصير مانجو", "price": "95 جنيه", "placeholder": "أضف تعليقك"},
        {"name": "عصير برتقال", "price": "100 جنيه", "placeholder": "أضف تعليقك"},
        {"name": "عصير ليمون", "price": "95 جنيه", "placeholder": "أضف تعليقك"},
        {"name": "عصير فراولة", "price": "95 جنيه", "placeholder": "أضف تعليقك"}
      ] }
  },
  "ru": {
    "title": "Ресторан Рыбный рынок",
    "subtitle": "Здоровая, вкусная и приятная еда",
    "slogan": "Единственный способ поймать свежий улов в Эль-Гуне",
    "order": "Ваш заказ:",
    "submit": "Отправить заказ",
        "table": "Table",
    "total": "Total",
    "sections": {
      "COLD_APPETIZERS": "Холодные закуски",
      "HOT_APPETIZERS": "Горячие закуски",
      "SOUP": "Суп",
      "PASTA": "Паста",
      "RICE_MIXED_WITH": "Рис с добавками",
      "SPICE_TAGIN": "Тажин со специями",
      "GRILLED_FRIED": "На гриле и жареное",
      "SPECIALTIES": "Особые блюда",
      "BEEF_CHICKEN": "Говядина и курица",
      "DESSERTS": "Десерты",
      "SOFT_DRINKS": "Безалкогольные напитки",
      "HOT_DRINKS": "Горячие напитки",
      "FRESH_JUICES": "Свежие соки",
      "TABLE": "Стол"
    },
    "items": { 
    "COLD_APPETIZERS": [
      {"name": "Кальбачо", "price": "EGP 420", "desc": "Сырой тунец, оливковое масло, лимон, перец", "placeholder": "Добавьте комментарий"},
      {"name": "Коктейль из креветок", "price": "EGP 440", "desc": "Мелкие креветки, коньяк, майонез, апельсиновый сок, соус", "placeholder": "Добавьте комментарий"},
      {"name": "Салат с тунцом", "price": "EGP 285", "desc": "Помидор, салат, оливковое масло, лимон, зелёный перец", "placeholder": "Добавьте комментарий"},
      {"name": "Греческий салат", "price": "EGP 265", "desc": "Помидор, салат, огурец, оливки, фета, оливковое масло, лимон, зелёный перец", "placeholder": "Добавьте комментарий"},
      {"name": "Ливанские мезе", "price": "EGP 335", "desc": "Тахини, хумус, баба гануш", "placeholder": "Добавьте комментарий"},
      {"name": "Салат Fish Market", "price": "EGP 550", "desc": "Креветки, кальмары, осьминог, тунец, салат, помидор, лук", "placeholder": "Добавьте комментарий"}
    ],
    "HOT_APPETIZERS": [
      {"name": "Сардины", "price": "EGP 165", "options": ["На гриле","Жареные"], "placeholder": "Добавьте комментарий"},
      {"name": "Моллюски (100гр)", "price": "EGP 140", "placeholder": "Добавьте комментарий"},
      {"name": "Мидии (100гр)", "price": "EGP 335", "placeholder": "Добавьте комментарий"},
      {"name": "Кальмары (100гр)", "price": "EGP 175", "options": ["На гриле","Жареные"], "placeholder": "Добавьте комментарий"},
      {"name": "Креветки M (100гр)", "price": "EGP 200", "options": ["На гриле","Жареные","Бабочка"], "placeholder": "Добавьте комментарий"},
      {"name": "Чесночный хлеб", "price": "EGP 155", "placeholder": "Добавьте комментарий"},
      {"name": "Кростини с моцареллой", "price": "EGP 150", "placeholder": "Добавьте комментарий"},
      {"name": "Кростини с моцареллой и креветками", "price": "EGP 245", "placeholder": "Добавьте комментарий"},
      {"name": "Кростини с моцареллой и кальмарами", "price": "EGP 225", "placeholder": "Добавьте комментарий"},
      {"name": "Кростини с моцареллой и анчоусами", "price": "EGP 240", "placeholder": "Добавьте комментарий"}
    ],
    "SOUP": [
      {"name": "Суп из морепродуктов (250гр)", "price": "EGP 225", "options": ["Обычный","Сливочный"], "placeholder": "Добавьте комментарий"},
      {"name": "Томатный суп", "price": "EGP 140", "placeholder": "Добавьте комментарий"},
      {"name": "Овощной суп", "price": "EGP 140", "placeholder": "Добавьте комментарий"},
      {"name": "Чечевичный суп", "price": "EGP 145", "placeholder": "Добавьте комментарий"},
      {"name": "Рыбный суп", "price": "EGP 215", "options": ["Обычный","Сливочный"], "placeholder": "Добавьте комментарий"},
      {"name": "Суп из креветок", "price": "EGP 255", "options": ["Обычный","Сливочный"], "placeholder": "Добавьте комментарий"},
      {"name": "Особый суп из морепродуктов", "price": "EGP 310", "options": ["Обычный","Сливочный"], "placeholder": "Добавьте комментарий"}
    ],
    "PASTA": [
      {"name": "Помодоро", "price": "EGP 280", "desc": "Томатный соус, базилик", "placeholder": "Добавьте комментарий"},
      {"name": "Олио Алио", "price": "EGP 270", "desc": "Чеснок, чили, оливковое масло", "placeholder": "Добавьте комментарий"},
      {"name": "Арабьята", "price": "EGP 270", "desc": "Чеснок, чили, томатный соус", "placeholder": "Добавьте комментарий"},
      {"name": "С мидиями", "price": "EGP 430", "desc": "Чеснок, оливковое масло, свежие томаты, петрушка", "placeholder": "Добавьте комментарий"},
      {"name": "С креветками", "price": "EGP 475", "desc": "Оливковое масло, свежие томаты, чеснок, чили", "options": ["Красный соус","Белый соус"], "placeholder": "Добавьте комментарий"},
      {"name": "С омаром (400гр)", "price": "EGP 2125", "desc": "Чеснок, оливковое масло, петрушка, чили", "placeholder": "Добавьте комментарий"},
      {"name": "С морепродуктами", "price": "EGP 480", "desc": "Креветки, кальмары, рыба, мидии, петрушка, оливковое масло, свежие томаты", "options": ["Красный соус","Белый соус"], "placeholder": "Добавьте комментарий"}
    ],
    "RICE_MIXED_WITH": [
      {"name": "С рыбой", "price": "EGP 380", "desc": "Масло, лук, петрушка, чили, томат", "placeholder": "Добавьте комментарий"},
      {"name": "С мидиями", "price": "EGP 410", "desc": "Масло, лук, петрушка, чили", "placeholder": "Добавьте комментарий"},
      {"name": "С кальмарами", "price": "EGP 390", "desc": "Лук, петрушка, кунжутное масло, перец", "placeholder": "Добавьте комментарий"},
      {"name": "С мелкими креветками", "price": "EGP 400", "desc": "Лук, петрушка, масло, томат", "placeholder": "Добавьте комментарий"},
      {"name": "С морепродуктами", "price": "EGP 420", "desc": "Креветки, кальмары, рыба, мидии, лук, петрушка, масло, томат", "placeholder": "Добавьте комментарий"}
    ],
    "SPICE_TAGIN": [
      {"name": "Креветки M", "price": "EGP 490", "options": ["Красный соус","Белый соус"], "placeholder": "Добавьте комментарий"},
      {"name": "Креветки S", "price": "EGP 470", "options": ["Красный соус","Белый соус"], "placeholder": "Добавьте комментарий"},
      {"name": "Кальмары", "price": "EGP 475", "options": ["Красный соус","Белый соус"], "placeholder": "Добавьте комментарий"},
      {"name": "Рыба", "price": "EGP 425", "options": ["Красный соус","Белый соус"], "placeholder": "Добавьте комментарий"},
      {"name": "Морепродукты", "price": "EGP 420", "options": ["Красный соус","Белый соус"], "placeholder": "Добавьте комментарий"}
    ],
    "GRILLED_FRIED": [
      {"name": "Омар (1кг)", "price": "EGP 4200", "options": ["Варёный","С белым соусом"], "placeholder": "Добавьте комментарий"},
      {"name": "Крабы (300гр)", "price": "EGP 490", "options": ["На гриле","Варёные"], "placeholder": "Добавьте комментарий"},
      {"name": "Осьминог (250гр)", "price": "EGP 530", "options": ["На гриле","Бабочка"], "placeholder": "Добавьте комментарий"},
      {"name": "Кальмары (250гр)", "price": "EGP 415", "options": ["На гриле","Жареные"], "placeholder": "Добавьте комментарий"},
      {"name": "Белый снеппер (500гр)", "price": "EGP 550", "options": ["На гриле","Жареный"], "placeholder": "Добавьте комментарий"},
      {"name": "Сол рыба (500гр)", "price": "EGP 285", "options": ["На гриле","Жареная"], "placeholder": "Добавьте комментарий"},
      {"name": "Сибас (на двоих)", "price": "EGP 1200", "options": ["Цельный на гриле","Бабочка на гриле","Жареный"], "placeholder": "Добавьте комментарий"},
      {"name": "Красный снеппер (на двоих)", "price": "EGP 1060", "options": ["Цельный на гриле","Бабочка на гриле","Жареный"], "placeholder": "Добавьте комментарий"},
      {"name": "Барбони (250гр)", "price": "EGP 380", "options": ["На гриле","Жареный"], "placeholder": "Добавьте комментарий"},
      {"name": "Креветки L (300гр)", "price": "EGP 800", "options": ["На гриле","Жареные","Бабочка"], "placeholder": "Добавьте комментарий"},
      {"name": "Креветки M (200гр)", "price": "EGP 450", "options": ["На гриле","Жареные","Бабочка"], "placeholder": "Добавьте комментарий"},
      {"name": "Филе рыбы (250гр)", "price": "EGP 690", "options": ["На гриле","Жареное"], "placeholder": "Добавьте комментарий"},
      {"name": "Фиш & Чипс", "price": "EGP 720", "placeholder": "Добавьте комментарий"}
    ],
    "SPECIALTIES": [
      {"name": "Арагуст омар (500гр)", "price": "EGP 2600", "desc": "Свежий томат, оливковое масло, чеснок, паста", "placeholder": "Добавьте комментарий"},
      {"name": "Бронза (300гр)", "price": "EGP 900", "desc": "Олио Алио, паста", "placeholder": "Добавьте комментарий"},
      {"name": "Осьминог", "price": "EGP 600", "desc": "Паста примавера, анчоусы, каперсы", "placeholder": "Добавьте комментарий"},
      {"name": "Креветки и кальмары (500гр)", "price": "EGP 1150", "placeholder": "Добавьте комментарий"},
      {"name": "Смешанное ассорти морепродуктов", "price": "EGP 1700", "placeholder": "Добавьте комментарий"},
      {"name": "Фритто Мисто", "price": "EGP 1150", "placeholder": "Добавьте комментарий"}
    ],
    "BEEF_CHICKEN": [
      {"name": "Стейк на гриле", "price": "EGP 730", "desc": "с овощами", "placeholder": "Добавьте комментарий"},
      {"name": "Стейк с перцем", "price": "EGP 730", "desc": "с овощами и рисом", "placeholder": "Добавьте комментарий"},
      {"name": "Эскалоп Панэ", "price": "EGP 650", "desc": "с картофелем фри", "placeholder": "Добавьте комментарий"},
      {"name": "Курица Панэ", "price": "EGP 470", "desc": "с картофелем фри", "placeholder": "Добавьте комментарий"}
    ],
    "DESSERTS": [
      {"name": "Фруктовый салат", "price": "EGP 220", "placeholder": "Добавьте комментарий"},
      {"name": "Фруктовое ассорти", "price": "EGP 400", "placeholder": "Добавьте комментарий"},
      {"name": "Мороженое", "price": "EGP 150", "placeholder": "Добавьте комментарий"}
    ],
    "SOFT_DRINKS": [
      {"name": "Кола", "price": "EGP 85", "placeholder": "Добавьте комментарий"},
      {"name": "Фанта", "price": "EGP 85", "placeholder": "Добавьте комментарий"},
      {"name": "Спрайт", "price": "EGP 85", "placeholder": "Добавьте комментарий"},
      {"name": "Минеральная вода (мал.)", "price": "EGP 60", "placeholder": "Добавьте комментарий"},
      {"name": "Минеральная вода (бол.)", "price": "EGP 75", "placeholder": "Добавьте комментарий"},
      {"name": "Газированная вода", "price": "EGP 85", "placeholder": "Добавьте комментарий"},
      {"name": "Каркаде (гибискус)", "price": "EGP 125", "placeholder": "Добавьте комментарий"},
      {"name": "Холодный чай", "price": "EGP 130", "placeholder": "Добавьте комментарий"}
    ],
    "HOT_DRINKS": [
      {"name": "Чай", "price": "EGP 70", "placeholder": "Добавьте комментарий"},
      {"name": "Кофе", "price": "EGP 85", "placeholder": "Добавьте комментарий"},
      {"name": "Анисовый чай", "price": "EGP 65", "placeholder": "Добавьте комментарий"},
      {"name": "Липовый чай", "price": "EGP 65", "placeholder": "Добавьте комментарий"},
      {"name": "Нескафе", "price": "EGP 90", "placeholder": "Добавьте комментарий"},
      {"name": "Эспрессо", "price": "EGP 75", "placeholder": "Добавьте комментарий"},
      {"name": "Капучино", "price": "EGP 115", "placeholder": "Добавьте комментарий"},
      {"name": "Латте", "price": "EGP 115", "placeholder": "Добавьте комментарий"},
      {"name": "Горячий шоколад", "price": "EGP 150", "placeholder": "Добавьте комментарий"},
      {"name": "Имбирь с лимоном и мёдом", "price": "EGP 165", "placeholder": "Добавьте комментарий"},
      {"name": "Имбирь с апельсином", "price": "EGP 175", "placeholder": "Добавьте комментарий"},
      {"name": "Горячий сидр", "price": "EGP 150", "placeholder": "Добавьте комментарий"}
    ],
    "FRESH_JUICES": [
      {"name": "Фреш-коктейль", "price": "EGP 120", "placeholder": "Добавьте комментарий"},
      {"name": "Сок манго", "price": "EGP 95", "placeholder": "Добавьте комментарий"},
      {"name": "Апельсиновый сок", "price": "EGP 100", "placeholder": "Добавьте комментарий"},
      {"name": "Гуава сок", "price": "EGP 95", "placeholder": "Добавьте комментарий"},
      {"name": "Клубничный сок", "price": "EGP 110", "placeholder": "Добавьте комментарий"},
      {"name": "Банановый сок", "price": "EGP 95", "placeholder": "Добавьте комментарий"},
      {"name": "Киви сок", "price": "EGP 95", "placeholder": "Добавьте комментарий"},
      {"name": "Лимонад", "price": "EGP 95", "placeholder": "Добавьте комментарий"}
    ] }
  },
  "de": {
    "title": "Fischmarkt Restaurant",
    "subtitle": "Gesundes, leckeres & angenehmes Essen",
    "slogan": "Der einzige Weg für den Fang des Tages in El Gouna",
    "order": "Ihre Bestellung:",
    "submit": "Bestellung absenden",
    "table": "Table",
    "total": "Total",
    "sections": {
      "COLD_APPETIZERS": "KALTE VORSPEISEN",
      "HOT_APPETIZERS": "WARME VORSPEISEN",
      "SOUP": "SUPPE",
      "PASTA": "PASTA",
      "RICE_MIXED_WITH": "REIS GEMISCHT MIT",
      "SPICE_TAGIN": "GEWÜRZTAJINE",
      "GRILLED_FRIED": "GEGRILLT & GEBRATEN",
      "SPECIALTIES": "SPEZIALITÄTEN",
      "BEEF_CHICKEN": "RIND & HÜHNCHEN",
      "DESSERTS": "DESSERTS",
      "SOFT_DRINKS": "ALKOHOLFREIE GETRÄNKE",
      "HOT_DRINKS": "HEISSE GETRÄNKE",
      "FRESH_JUICES": "FRISCHE SÄFTE",
      "TABLE": "TISCH"
    },
    "items": { 
    "COLD_APPETIZERS": [
      { "name": "Colbacho", "price": "EGP 420", "desc": "Roher Thunfisch, Olivenöl, Zitrone, Pfeffer", "placeholder": "Kommentar hinzufügen" },
      { "name": "Shrimp Cocktail", "price": "EGP 440", "desc": "Babygarnelen, Cognac, Mayo, Orangensaft, Sauce", "placeholder": "Kommentar hinzufügen" },
      { "name": "Thunfischsalat", "price": "EGP 285", "desc": "Tomate, Salat, Olivenöl, Zitrone, Paprika", "placeholder": "Kommentar hinzufügen" },
      { "name": "Griechischer Salat", "price": "EGP 265", "desc": "Tomate, Salat, Gurke, Oliven, Feta, Olivenöl, Zitrone, Paprika", "placeholder": "Kommentar hinzufügen" },
      { "name": "Libanesische Mezze", "price": "EGP 335", "desc": "Tahina, Hummus, Baba Ghanoush", "placeholder": "Kommentar hinzufügen" },
      { "name": "Fish Market Salat", "price": "EGP 550", "desc": "Garnelen, Calamari, Oktopus, Thunfisch, Salat, Tomate, Zwiebel", "placeholder": "Kommentar hinzufügen" }
    ],
    "HOT_APPETIZERS": [
      { "name": "Sardine", "price": "EGP 165", "options": ["Gegrillt","Gebraten"], "placeholder": "Kommentar hinzufügen" },
      { "name": "Muscheln (100gr)", "price": "EGP 140", "placeholder": "Kommentar hinzufügen" },
      { "name": "Miesmuscheln (100gr)", "price": "EGP 335", "placeholder": "Kommentar hinzufügen" },
      { "name": "Calamari (100gr)", "price": "EGP 175", "options": ["Gegrillt","Gebraten"], "placeholder": "Kommentar hinzufügen" },
      { "name": "Garnelen M (100gr)", "price": "EGP 200", "options": ["Gegrillt","Gebraten","Butterfly"], "placeholder": "Kommentar hinzufügen" },
      { "name": "Knoblauchbrot", "price": "EGP 155", "placeholder": "Kommentar hinzufügen" },
      { "name": "Crostino e Mozzarella", "price": "EGP 150", "placeholder": "Kommentar hinzufügen" },
      { "name": "Crostino e Mozzarella & Garnelen", "price": "EGP 245", "placeholder": "Kommentar hinzufügen" },
      { "name": "Crostino e Mozzarella & Calamari", "price": "EGP 225", "placeholder": "Kommentar hinzufügen" },
      { "name": "Crostino e Mozzarella & Sardellen", "price": "EGP 240", "placeholder": "Kommentar hinzufügen" }
    ],
    "SOUP": [
      { "name": "Meeresfrüchtesuppe (250gr)", "price": "EGP 225", "options": ["Klar","Sahnig"], "placeholder": "Kommentar hinzufügen" },
      { "name": "Tomatensuppe", "price": "EGP 140", "placeholder": "Kommentar hinzufügen" },
      { "name": "Gemüsesuppe", "price": "EGP 140", "placeholder": "Kommentar hinzufügen" },
      { "name": "Linsensuppe", "price": "EGP 145", "placeholder": "Kommentar hinzufügen" },
      { "name": "Fischsuppe", "price": "EGP 215", "options": ["Klar","Sahnig"], "placeholder": "Kommentar hinzufügen" },
      { "name": "Garnelensuppe", "price": "EGP 255", "options": ["Klar","Sahnig"], "placeholder": "Kommentar hinzufügen" },
      { "name": "Spezielle Meeresfrüchtesuppe", "price": "EGP 310", "options": ["Klar","Sahnig"], "placeholder": "Kommentar hinzufügen" }
    ],
    "PASTA": [
      { "name": "Pomodoro", "price": "EGP 280", "desc": "Tomatensoße, Basilikum", "placeholder": "Kommentar hinzufügen" },
      { "name": "Olio Alio", "price": "EGP 270", "desc": "Knoblauch, Chili, Olivenöl", "placeholder": "Kommentar hinzufügen" },
      { "name": "Arabiatta", "price": "EGP 270", "desc": "Knoblauch, Chili, Tomatensoße", "placeholder": "Kommentar hinzufügen" },
      { "name": "Muscheln", "price": "EGP 430", "desc": "Knoblauch, Olivenöl, frische Tomate, Petersilie", "placeholder": "Kommentar hinzufügen" },
      { "name": "Garnelen", "price": "EGP 475", "desc": "Olivenöl, frische Tomate, Knoblauch, Chili", "options": ["Rote Soße","Weiße Soße"], "placeholder": "Kommentar hinzufügen" },
      { "name": "Hummer (400gr)", "price": "EGP 2125", "desc": "Knoblauch, Olivenöl, Petersilie, Chili", "placeholder": "Kommentar hinzufügen" },
      { "name": "Meeresfrüchte", "price": "EGP 480", "desc": "Garnelen, Calamari, Fisch, Muscheln, Petersilie, Olivenöl, frische Tomate", "options": ["Rote Soße","Weiße Soße"], "placeholder": "Kommentar hinzufügen" }
    ],
    "RICE_MIXED_WITH": [
      { "name": "Fisch", "price": "EGP 380", "desc": "Öl, Zwiebeln, Petersilie, Chili, Tomate", "placeholder": "Kommentar hinzufügen" },
      { "name": "Muscheln", "price": "EGP 410", "desc": "Öl, Zwiebeln, Petersilie, Chili", "placeholder": "Kommentar hinzufügen" },
      { "name": "Calamari", "price": "EGP 390", "desc": "Zwiebeln, Petersilie, Sesamöl, Pfeffer", "placeholder": "Kommentar hinzufügen" },
      { "name": "Babygarnelen", "price": "EGP 400", "desc": "Zwiebeln, Petersilie, Öl, Tomate", "placeholder": "Kommentar hinzufügen" },
      { "name": "Meeresfrüchte", "price": "EGP 420", "desc": "Garnelen, Calamari, Fisch, Muscheln, Zwiebeln, Petersilie, Öl, Tomate", "placeholder": "Kommentar hinzufügen" }
    ],
    "SPICE_TAGIN": [
      { "name": "Garnelen M", "price": "EGP 490", "options": ["Rote Soße","Weiße Soße"], "placeholder": "Kommentar hinzufügen" },
      { "name": "Garnelen S", "price": "EGP 470", "options": ["Rote Soße","Weiße Soße"], "placeholder": "Kommentar hinzufügen" },
      { "name": "Calamari", "price": "EGP 475", "options": ["Rote Soße","Weiße Soße"], "placeholder": "Kommentar hinzufügen" },
      { "name": "Fisch", "price": "EGP 425", "options": ["Rote Soße","Weiße Soße"], "placeholder": "Kommentar hinzufügen" },
      { "name": "Meeresfrüchte", "price": "EGP 420", "options": ["Rote Soße","Weiße Soße"], "placeholder": "Kommentar hinzufügen" }
    ],
    "GRILLED_FRIED": [
      { "name": "Hummer (1kg)", "price": "EGP 4200", "options": ["Gekocht","Weiße Soße"], "placeholder": "Kommentar hinzufügen" },
      { "name": "Krabben (300gr)", "price": "EGP 490", "options": ["Gegrillt","Gekocht"], "placeholder": "Kommentar hinzufügen" },
      { "name": "Oktopus (250gr)", "price": "EGP 530", "options": ["Gegrillt","Butterfly"], "placeholder": "Kommentar hinzufügen" },
      { "name": "Calamari (250gr)", "price": "EGP 415", "options": ["Gegrillt","Gebraten"], "placeholder": "Kommentar hinzufügen" },
      { "name": "Weißer Schnapper (500gr)", "price": "EGP 550", "options": ["Gegrillt","Gebraten"], "placeholder": "Kommentar hinzufügen" },
      { "name": "Seezunge (500gr)", "price": "EGP 285", "options": ["Gegrillt","Gebraten"], "placeholder": "Kommentar hinzufügen" },
      { "name": "Seebarsch (für Zwei)", "price": "EGP 1200", "options": ["Ganz gegrillt","Butterfly gegrillt","Gebraten"], "placeholder": "Kommentar hinzufügen" },
      { "name": "Roter Schnapper (für Zwei)", "price": "EGP 1060", "options": ["Ganz gegrillt","Butterfly gegrillt","Gebraten"], "placeholder": "Kommentar hinzufügen" },
      { "name": "Barboni (250gr)", "price": "EGP 380", "options": ["Gegrillt","Gebraten"], "placeholder": "Kommentar hinzufügen" },
      { "name": "Garnelen L (300gr)", "price": "EGP 800", "options": ["Gegrillt","Gebraten","Butterfly"], "placeholder": "Kommentar hinzufügen" },
      { "name": "Garnelen M (200gr)", "price": "EGP 450", "options": ["Gegrillt","Gebraten","Butterfly"], "placeholder": "Kommentar hinzufügen" },
      { "name": "Fischfilet (250gr)", "price": "EGP 690", "options": ["Gegrillt","Gebraten"], "placeholder": "Kommentar hinzufügen" },
      { "name": "Fish and Chips", "price": "EGP 720", "placeholder": "Kommentar hinzufügen" }
    ],
    "SPECIALTIES": [
      { "name": "Aragust Hummer (500gr)", "price": "EGP 2600", "desc": "Frische Tomate, Olivenöl, Knoblauch, Pasta", "placeholder": "Kommentar hinzufügen" },
      { "name": "Bronze (300gr)", "price": "EGP 900", "desc": "Olio Alio, Pasta", "placeholder": "Kommentar hinzufügen" },
      { "name": "Oktopus", "price": "EGP 600", "desc": "Pasta Primavera, Sardellen, Kapern", "placeholder": "Kommentar hinzufügen" },
      { "name": "Garnelen & Calamari (500gr)", "price": "EGP 1150", "placeholder": "Kommentar hinzufügen" },
      { "name": "Gemischte Meeresfrüchteplatte", "price": "EGP 1700", "placeholder": "Kommentar hinzufügen" },
      { "name": "Fritto Misto", "price": "EGP 1150", "placeholder": "Kommentar hinzufügen" }
    ],
    "BEEF_CHICKEN": [
      { "name": "Gegrilltes Steak", "price": "EGP 730", "desc": "mit Gemüse", "placeholder": "Kommentar hinzufügen" },
      { "name": "Pfeffersteak", "price": "EGP 730", "desc": "mit Gemüse & Reis", "placeholder": "Kommentar hinzufügen" },
      { "name": "Schnitzel (Pane)", "price": "EGP 650", "desc": "mit Pommes frites", "placeholder": "Kommentar hinzufügen" },
      { "name": "Hähnchen Pane", "price": "EGP 470", "desc": "mit Pommes frites", "placeholder": "Kommentar hinzufügen" }
    ],
    "DESSERTS": [
      { "name": "Fruchtsalat", "price": "EGP 220", "placeholder": "Kommentar hinzufügen" },
      { "name": "Obstplatte", "price": "EGP 400", "placeholder": "Kommentar hinzufügen" },
      { "name": "Eiscreme", "price": "EGP 150", "placeholder": "Kommentar hinzufügen" }
    ],
    "SOFT_DRINKS": [
      { "name": "Cola", "price": "EGP 85", "placeholder": "Kommentar hinzufügen" },
      { "name": "Fanta", "price": "EGP 85", "placeholder": "Kommentar hinzufügen" },
      { "name": "Sprite", "price": "EGP 85", "placeholder": "Kommentar hinzufügen" },
      { "name": "Mineralwasser Klein", "price": "EGP 60", "placeholder": "Kommentar hinzufügen" },
      { "name": "Mineralwasser Groß", "price": "EGP 75", "placeholder": "Kommentar hinzufügen" },
      { "name": "Sprudelwasser", "price": "EGP 85", "placeholder": "Kommentar hinzufügen" },
      { "name": "Hibiskus (Karkade)", "price": "EGP 125", "placeholder": "Kommentar hinzufügen" },
      { "name": "Eistee", "price": "EGP 130", "placeholder": "Kommentar hinzufügen" }
    ],
    "HOT_DRINKS": [
      { "name": "Tee", "price": "EGP 70", "placeholder": "Kommentar hinzufügen" },
      { "name": "Kaffee", "price": "EGP 85", "placeholder": "Kommentar hinzufügen" },
      { "name": "Anis Tee", "price": "EGP 65", "placeholder": "Kommentar hinzufügen" },
      { "name": "Lindenblütentee", "price": "EGP 65", "placeholder": "Kommentar hinzufügen" },
      { "name": "Nescafe", "price": "EGP 90", "placeholder": "Kommentar hinzufügen" },
      { "name": "Espresso", "price": "EGP 75", "placeholder": "Kommentar hinzufügen" },
      { "name": "Cappuccino", "price": "EGP 115", "placeholder": "Kommentar hinzufügen" },
      { "name": "Cafe Latte", "price": "EGP 115", "placeholder": "Kommentar hinzufügen" },
      { "name": "Heiße Schokolade", "price": "EGP 150", "placeholder": "Kommentar hinzufügen" },
      { "name": "Ingwer Zitrone Honig", "price": "EGP 165", "placeholder": "Kommentar hinzufügen" },
      { "name": "Ingwer Orange", "price": "EGP 175", "placeholder": "Kommentar hinzufügen" },
      { "name": "Heißer Apfelwein", "price": "EGP 150", "placeholder": "Kommentar hinzufügen" }
    ],
    "FRESH_JUICES": [
      { "name": "Frischer Cocktail", "price": "EGP 120", "placeholder": "Kommentar hinzufügen" },
      { "name": "Mangosaft", "price": "EGP 95", "placeholder": "Kommentar hinzufügen" },
      { "name": "Orangensaft", "price": "EGP 100", "placeholder": "Kommentar hinzufügen" },
      { "name": "Zitronensaft", "price": "EGP 95", "placeholder": "Kommentar hinzufügen" },
      { "name": "Erdbeersaft", "price": "EGP 95", "placeholder": "Kommentar hinzufügen" }
    ] }
  },
  "fr": {
    "title": "Restaurant Fish Market",
    "subtitle": "Nourriture saine, délicieuse et agréable",
    "slogan": "La seule façon de prendre le poisson du jour à El Gouna",
    "order": "Votre commande :",
    "submit": "Envoyer la commande",
    "table": "Table",
    "total": "Total",
    "sections": {
      "COLD_APPETIZERS": "ENTRÉES FROIDES",
      "HOT_APPETIZERS": "ENTRÉES CHAUDES",
      "SOUP": "SOUPE",
      "PASTA": "PÂTES",
      "RICE_MIXED_WITH": "RIZ MIXTE AVEC",
      "SPICE_TAGIN": "TAGINE ÉPICÉ",
      "GRILLED_FRIED": "GRILLÉ & FRIT",
      "SPECIALTIES": "SPÉCIALITÉS",
      "BEEF_CHICKEN": "BOEUF & POULET",
      "DESSERTS": "DESSERTS",
      "SOFT_DRINKS": "BOISSONS GAZEUSES",
      "HOT_DRINKS": "BOISSONS CHAUDES",
      "FRESH_JUICES": "JUS FRAIS",
      "TABLE": "TABLE"
    },
    "items": { 
    "COLD_APPETIZERS": [
      {"name": "Colbacho", "price": "EGP 420", "desc": "Thon cru, huile d’olive, citron, poivre", "placeholder": "Ajoutez votre commentaire"},
      {"name": "Cocktail de crevettes", "price": "EGP 440", "desc": "Petites crevettes, cognac, mayo, jus d’orange, sauce", "placeholder": "Ajoutez votre commentaire"},
      {"name": "Salade de thon", "price": "EGP 285", "desc": "Tomate, laitue, huile d’olive, citron, poivron vert", "placeholder": "Ajoutez votre commentaire"},
      {"name": "Salade grecque", "price": "EGP 265", "desc": "Tomate, laitue, concombre, olives, feta, huile d’olive, citron, poivron vert", "placeholder": "Ajoutez votre commentaire"},
      {"name": "Mezzé libanais", "price": "EGP 335", "desc": "Tahina, houmous, baba ghanoush", "placeholder": "Ajoutez votre commentaire"},
      {"name": "Salade Fish Market", "price": "EGP 550", "desc": "Crevettes, calamars, poulpe, thon, laitue, tomate, oignon", "placeholder": "Ajoutez votre commentaire"}
    ],
    "HOT_APPETIZERS": [
      {"name": "Sardine", "price": "EGP 165", "options": ["Grillé","Frit"], "placeholder": "Ajoutez votre commentaire"},
      {"name": "Palourdes (100gr)", "price": "EGP 140", "placeholder": "Ajoutez votre commentaire"},
      {"name": "Moules (100gr)", "price": "EGP 335", "placeholder": "Ajoutez votre commentaire"},
      {"name": "Calamar (100gr)", "price": "EGP 175", "options": ["Grillé","Frit"], "placeholder": "Ajoutez votre commentaire"},
      {"name": "Crevettes M (100gr)", "price": "EGP 200", "options": ["Grillé","Frit","Papillon"], "placeholder": "Ajoutez votre commentaire"},
      {"name": "Pain à l’ail", "price": "EGP 155", "placeholder": "Ajoutez votre commentaire"},
      {"name": "Crostino et Mozzarella", "price": "EGP 150", "placeholder": "Ajoutez votre commentaire"},
      {"name": "Crostino et Mozzarella & Crevettes", "price": "EGP 245", "placeholder": "Ajoutez votre commentaire"},
      {"name": "Crostino et Mozzarella & Calamar", "price": "EGP 225", "placeholder": "Ajoutez votre commentaire"},
      {"name": "Crostino et Mozzarella & Anchois", "price": "EGP 240", "placeholder": "Ajoutez votre commentaire"}
    ],
    "SOUP": [
      {"name": "Soupe de fruits de mer (250gr)", "price": "EGP 225", "options": ["Nature","Crémeuse"], "placeholder": "Ajoutez votre commentaire"},
      {"name": "Soupe de tomate", "price": "EGP 140", "placeholder": "Ajoutez votre commentaire"},
      {"name": "Soupe de légumes", "price": "EGP 140", "placeholder": "Ajoutez votre commentaire"},
      {"name": "Soupe de lentilles", "price": "EGP 145", "placeholder": "Ajoutez votre commentaire"},
      {"name": "Soupe de poisson", "price": "EGP 215", "options": ["Nature","Crémeuse"], "placeholder": "Ajoutez votre commentaire"},
      {"name": "Soupe de crevettes", "price": "EGP 255", "options": ["Nature","Crémeuse"], "placeholder": "Ajoutez votre commentaire"},
      {"name": "Soupe spéciale de fruits de mer", "price": "EGP 310", "options": ["Nature","Crémeuse"], "placeholder": "Ajoutez votre commentaire"}
    ],
    "PASTA": [
      {"name": "Pomodoro", "price": "EGP 280", "desc": "Sauce tomate, basilic", "placeholder": "Ajoutez votre commentaire"},
      {"name": "Olio Alio", "price": "EGP 270", "desc": "Ail, piment, huile d’olive", "placeholder": "Ajoutez votre commentaire"},
      {"name": "Arabiatta", "price": "EGP 270", "desc": "Ail, piment, sauce tomate", "placeholder": "Ajoutez votre commentaire"},
      {"name": "Palourdes", "price": "EGP 430", "desc": "Ail, huile d’olive, tomate fraîche, persil", "placeholder": "Ajoutez votre commentaire"},
      {"name": "Crevettes", "price": "EGP 475", "desc": "Huile d’olive, tomate fraîche, ail, piment", "options": ["Sauce rouge","Sauce blanche"], "placeholder": "Ajoutez votre commentaire"},
      {"name": "Homard (400gr)", "price": "EGP 2125", "desc": "Ail, huile d’olive, persil, piment", "placeholder": "Ajoutez votre commentaire"},
      {"name": "Fruits de mer", "price": "EGP 480", "desc": "Crevette, calamar, poisson, palourdes, persil, huile d’olive, tomate fraîche", "options": ["Sauce rouge","Sauce blanche"], "placeholder": "Ajoutez votre commentaire"}
    ],
    "RICE_MIXED_WITH": [
      {"name": "Poisson", "price": "EGP 380", "desc": "Huile, oignons, persil, piment, tomate", "placeholder": "Ajoutez votre commentaire"},
      {"name": "Palourdes", "price": "EGP 410", "desc": "Huile, oignons, persil, piment", "placeholder": "Ajoutez votre commentaire"},
      {"name": "Calamar", "price": "EGP 390", "desc": "Oignons, persil, huile de sésame, poivre", "placeholder": "Ajoutez votre commentaire"},
      {"name": "Petites crevettes", "price": "EGP 400", "desc": "Oignons, persil, huile, tomate", "placeholder": "Ajoutez votre commentaire"},
      {"name": "Fruits de mer", "price": "EGP 420", "desc": "Crevette, calamar, poisson, palourdes, oignons, persil, huile, tomate", "placeholder": "Ajoutez votre commentaire"}
    ],
    "SPICE_TAGIN": [
      {"name": "Crevettes M", "price": "EGP 490", "options": ["Sauce rouge","Sauce blanche"], "placeholder": "Ajoutez votre commentaire"},
      {"name": "Crevettes S", "price": "EGP 470", "options": ["Sauce rouge","Sauce blanche"], "placeholder": "Ajoutez votre commentaire"},
      {"name": "Calamar", "price": "EGP 475", "options": ["Sauce rouge","Sauce blanche"], "placeholder": "Ajoutez votre commentaire"},
      {"name": "Poisson", "price": "EGP 425", "options": ["Sauce rouge","Sauce blanche"], "placeholder": "Ajoutez votre commentaire"},
      {"name": "Fruits de mer", "price": "EGP 420", "options": ["Sauce rouge","Sauce blanche"], "placeholder": "Ajoutez votre commentaire"}
    ],
    "GRILLED_FRIED": [
      {"name": "Homard (1kg)", "price": "EGP 4200", "options": ["Bouilli","Sauce blanche"], "placeholder": "Ajoutez votre commentaire"},
      {"name": "Crabes (300gr)", "price": "EGP 490", "options": ["Grillé","Bouilli"], "placeholder": "Ajoutez votre commentaire"},
      {"name": "Poulpe (250gr)", "price": "EGP 530", "options": ["Grillé","Papillon"], "placeholder": "Ajoutez votre commentaire"},
      {"name": "Calamar (250gr)", "price": "EGP 415", "options": ["Grillé","Frit"], "placeholder": "Ajoutez votre commentaire"},
      {"name": "Vivaneau blanc (500gr)", "price": "EGP 550", "options": ["Grillé","Frit"], "placeholder": "Ajoutez votre commentaire"},
      {"name": "Poisson sole (500gr)", "price": "EGP 285", "options": ["Grillé","Frit"], "placeholder": "Ajoutez votre commentaire"},
      {"name": "Bar (Pour deux)", "price": "EGP 1200", "options": ["Grillé entier","Grillé papillon","Frit"], "placeholder": "Ajoutez votre commentaire"},
      {"name": "Vivaneau rouge (Pour deux)", "price": "EGP 1060", "options": ["Grillé entier","Grillé papillon","Frit"], "placeholder": "Ajoutez votre commentaire"},
      {"name": "Barboni (250gr)", "price": "EGP 380", "options": ["Grillé","Frit"], "placeholder": "Ajoutez votre commentaire"},
      {"name": "Crevettes L (300gr)", "price": "EGP 800", "options": ["Grillé","Frit","Papillon"], "placeholder": "Ajoutez votre commentaire"},
      {"name": "Crevettes M (200gr)", "price": "EGP 450", "options": ["Grillé","Frit","Papillon"], "placeholder": "Ajoutez votre commentaire"},
      {"name": "Filet de poisson (250gr)", "price": "EGP 690", "options": ["Grillé","Frit"], "placeholder": "Ajoutez votre commentaire"},
      {"name": "Fish and Chips", "price": "EGP 720", "placeholder": "Ajoutez votre commentaire"}
    ],
    "SPECIALTIES": [
      {"name": "Homard Aragust (500gr)", "price": "EGP 2600", "desc": "Tomate fraîche, huile d’olive, ail, pâtes", "placeholder": "Ajoutez votre commentaire"},
      {"name": "Bronze (300gr)", "price": "EGP 900", "desc": "Olio Alio, pâtes", "placeholder": "Ajoutez votre commentaire"},
      {"name": "Poulpe", "price": "EGP 600", "desc": "Pâtes primavera, anchois, câpres", "placeholder": "Ajoutez votre commentaire"},
      {"name": "Crevettes & Calamar (500gr)", "price": "EGP 1150", "placeholder": "Ajoutez votre commentaire"},
      {"name": "Plateau de fruits de mer", "price": "EGP 1700", "placeholder": "Ajoutez votre commentaire"},
      {"name": "Fritto Misto", "price": "EGP 1150", "placeholder": "Ajoutez votre commentaire"}
    ],
    "BEEF_CHICKEN": [
      {"name": "Steak grillé", "price": "EGP 730", "desc": "avec légumes", "placeholder": "Ajoutez votre commentaire"},
      {"name": "Steak au poivre", "price": "EGP 730", "desc": "avec légumes et riz", "placeholder": "Ajoutez votre commentaire"},
      {"name": "Escalope panée", "price": "EGP 650", "desc": "avec frites", "placeholder": "Ajoutez votre commentaire"},
      {"name": "Poulet pané", "price": "EGP 470", "desc": "avec frites", "placeholder": "Ajoutez votre commentaire"}
    ],
    "DESSERTS": [
      {"name": "Salade de fruits", "price": "EGP 220", "placeholder": "Ajoutez votre commentaire"},
      {"name": "Assiette de fruits", "price": "EGP 400", "placeholder": "Ajoutez votre commentaire"},
      {"name": "Glace", "price": "EGP 150", "placeholder": "Ajoutez votre commentaire"}
    ],
    "SOFT_DRINKS": [
      {"name": "Coca-Cola", "price": "EGP 85", "placeholder": "Ajoutez votre commentaire"},
      {"name": "Fanta", "price": "EGP 85", "placeholder": "Ajoutez votre commentaire"},
      {"name": "Sprite", "price": "EGP 85", "placeholder": "Ajoutez votre commentaire"},
      {"name": "Eau minérale petite", "price": "EGP 60", "placeholder": "Ajoutez votre commentaire"},
      {"name": "Eau minérale grande", "price": "EGP 75", "placeholder": "Ajoutez votre commentaire"},
      {"name": "Eau pétillante", "price": "EGP 85", "placeholder": "Ajoutez votre commentaire"},
      {"name": "Hibiscus (Karkadé)", "price": "EGP 125", "placeholder": "Ajoutez votre commentaire"},
      {"name": "Thé glacé", "price": "EGP 130", "placeholder": "Ajoutez votre commentaire"}
    ],
    "HOT_DRINKS": [
      {"name": "Thé", "price": "EGP 70", "placeholder": "Ajoutez votre commentaire"},
      {"name": "Café", "price": "EGP 85", "placeholder": "Ajoutez votre commentaire"},
      {"name": "Tisane d’anis", "price": "EGP 65", "placeholder": "Ajoutez votre commentaire"},
      {"name": "Tilleul", "price": "EGP 65", "placeholder": "Ajoutez votre commentaire"},
      {"name": "Nescafé", "price": "EGP 90", "placeholder": "Ajoutez votre commentaire"},
      {"name": "Espresso", "price": "EGP 75", "placeholder": "Ajoutez votre commentaire"},
      {"name": "Cappuccino", "price": "EGP 115", "placeholder": "Ajoutez votre commentaire"},
      {"name": "Café Latte", "price": "EGP 115", "placeholder": "Ajoutez votre commentaire"},
      {"name": "Chocolat chaud", "price": "EGP 150", "placeholder": "Ajoutez votre commentaire"},
      {"name": "Gingembre citron miel", "price": "EGP 165", "placeholder": "Ajoutez votre commentaire"},
      {"name": "Gingembre orange", "price": "EGP 175", "placeholder": "Ajoutez votre commentaire"},
      {"name": "Cidre chaud", "price": "EGP 150", "placeholder": "Ajoutez votre commentaire"}
    ],
    "FRESH_JUICES": [
      {"name": "Cocktail frais", "price": "EGP 120", "placeholder": "Ajoutez votre commentaire"},
      {"name": "Jus de mangue", "price": "EGP 95", "placeholder": "Ajoutez votre commentaire"},
      {"name": "Jus d’orange", "price": "EGP 100", "placeholder": "Ajoutez votre commentaire"},
      {"name": "Jus de citron", "price": "EGP 95", "placeholder": "Ajoutez votre commentaire"},
      {"name": "Jus de fraise", "price": "EGP 95", "placeholder": "Ajoutez votre commentaire"}
    ] }
  },
  "it": {
    "title": "Ristorante Fish Market",
    "subtitle": "Cibo sano, gustoso e piacevole",
    "slogan": "L'unico modo per prendere il pescato del giorno a El Gouna",
    "order": "Il tuo ordine:",
    "submit": "Invia ordine",
    "table": "Table",
    "total": "Total",
    "sections": {
      "COLD_APPETIZERS": "ANTIPASTI FREDDI",
      "HOT_APPETIZERS": "ANTIPASTI CALDI",
      "SOUP": "ZUPPA",
      "PASTA": "PASTA",
      "RICE_MIXED_WITH": "RISO MISTO CON",
      "SPICE_TAGIN": "TAGINE SPEZIATO",
      "GRILLED_FRIED": "GRIGLIATO & FRITTO",
      "SPECIALTIES": "SPECIALITÀ",
      "BEEF_CHICKEN": "MANZO & POLLO",
      "DESSERTS": "DESSERT",
      "SOFT_DRINKS": "BIBITE ANALCOLICHE",
      "HOT_DRINKS": "BEVANDE CALDE",
      "FRESH_JUICES": "SUCHI FRESCHI",
      "TABLE": "TAVOLO"
    },
    "items": { 
    "COLD_APPETIZERS": [
      {"name": "Colbacho", "price": "EGP 420", "desc": "Tonno crudo, olio d'oliva, limone, pepe", "placeholder": "Aggiungi il tuo commento"},
      {"name": "Cocktail di gamberi", "price": "EGP 440", "desc": "Gamberetti, cognac, maionese, succo d'arancia, salsa", "placeholder": "Aggiungi il tuo commento"},
      {"name": "Insalata di tonno", "price": "EGP 285", "desc": "Pomodoro, lattuga, olio d'oliva, limone, peperone verde", "placeholder": "Aggiungi il tuo commento"},
      {"name": "Insalata greca", "price": "EGP 265", "desc": "Pomodoro, lattuga, cetriolo, olive, feta, olio d'oliva, limone, peperone verde", "placeholder": "Aggiungi il tuo commento"},
      {"name": "Mezze libanese", "price": "EGP 335", "desc": "Tahina, hummus, baba ghanoush", "placeholder": "Aggiungi il tuo commento"},
      {"name": "Insalata Fish Market", "price": "EGP 550", "desc": "Gamberi, calamari, polpo, tonno, lattuga, pomodoro, cipolla", "placeholder": "Aggiungi il tuo commento"}
    ],
    "HOT_APPETIZERS": [
      {"name": "Sardine", "price": "EGP 165", "options": ["Grigliato","Fritto"], "placeholder": "Aggiungi il tuo commento"},
      {"name": "Vongole (100gr)", "price": "EGP 140", "placeholder": "Aggiungi il tuo commento"},
      {"name": "Cozze (100gr)", "price": "EGP 335", "placeholder": "Aggiungi il tuo commento"},
      {"name": "Calamari (100gr)", "price": "EGP 175", "options": ["Grigliato","Fritto"], "placeholder": "Aggiungi il tuo commento"},
      {"name": "Gamberi M (100gr)", "price": "EGP 200", "options": ["Grigliato","Fritto","A farfalla"], "placeholder": "Aggiungi il tuo commento"},
      {"name": "Pane all’aglio", "price": "EGP 155", "placeholder": "Aggiungi il tuo commento"},
      {"name": "Crostino e Mozzarella", "price": "EGP 150", "placeholder": "Aggiungi il tuo commento"},
      {"name": "Crostino e Mozzarella & Gamberi", "price": "EGP 245", "placeholder": "Aggiungi il tuo commento"},
      {"name": "Crostino e Mozzarella & Calamari", "price": "EGP 225", "placeholder": "Aggiungi il tuo commento"},
      {"name": "Crostino e Mozzarella & Acciughe", "price": "EGP 240", "placeholder": "Aggiungi il tuo commento"}
    ],
    "SOUP": [
      {"name": "Zuppa di frutti di mare (250gr)", "price": "EGP 225", "options": ["Normale","Con panna"], "placeholder": "Aggiungi il tuo commento"},
      {"name": "Zuppa di pomodoro", "price": "EGP 140", "placeholder": "Aggiungi il tuo commento"},
      {"name": "Zuppa di verdure", "price": "EGP 140", "placeholder": "Aggiungi il tuo commento"},
      {"name": "Zuppa di lenticchie", "price": "EGP 145", "placeholder": "Aggiungi il tuo commento"},
      {"name": "Zuppa di pesce", "price": "EGP 215", "options": ["Normale","Con panna"], "placeholder": "Aggiungi il tuo commento"},
      {"name": "Zuppa di gamberi", "price": "EGP 255", "options": ["Normale","Con panna"], "placeholder": "Aggiungi il tuo commento"},
      {"name": "Zuppa speciale di frutti di mare", "price": "EGP 310", "options": ["Normale","Con panna"], "placeholder": "Aggiungi il tuo commento"}
    ],
    "PASTA": [
      {"name": "Pomodoro", "price": "EGP 280", "desc": "Salsa di pomodoro, basilico", "placeholder": "Aggiungi il tuo commento"},
      {"name": "Olio e Aglio", "price": "EGP 270", "desc": "Aglio, peperoncino, olio d'oliva", "placeholder": "Aggiungi il tuo commento"},
      {"name": "Arrabbiata", "price": "EGP 270", "desc": "Aglio, peperoncino, salsa di pomodoro", "placeholder": "Aggiungi il tuo commento"},
      {"name": "Vongole", "price": "EGP 430", "desc": "Aglio, olio d'oliva, pomodoro fresco, prezzemolo", "placeholder": "Aggiungi il tuo commento"},
      {"name": "Gamberi", "price": "EGP 475", "desc": "Olio d'oliva, pomodoro fresco, aglio, peperoncino", "options": ["Sugo rosso","Sugo bianco"], "placeholder": "Aggiungi il tuo commento"},
      {"name": "Aragosta (400gr)", "price": "EGP 2125", "desc": "Aglio, olio d'oliva, prezzemolo, peperoncino", "placeholder": "Aggiungi il tuo commento"},
      {"name": "Frutti di mare", "price": "EGP 480", "desc": "Gamberi, calamari, pesce, vongole, prezzemolo, olio d'oliva, pomodoro fresco", "options": ["Sugo rosso","Sugo bianco"], "placeholder": "Aggiungi il tuo commento"}
    ],
    "RICE_MIXED_WITH": [
      {"name": "Pesce", "price": "EGP 380", "desc": "Olio, cipolla, prezzemolo, peperoncino, pomodoro", "placeholder": "Aggiungi il tuo commento"},
      {"name": "Vongole", "price": "EGP 410", "desc": "Olio, cipolla, prezzemolo, peperoncino", "placeholder": "Aggiungi il tuo commento"},
      {"name": "Calamari", "price": "EGP 390", "desc": "Cipolla, prezzemolo, olio di sesamo, pepe", "placeholder": "Aggiungi il tuo commento"},
      {"name": "Gamberetti", "price": "EGP 400", "desc": "Cipolla, prezzemolo, olio, pomodoro", "placeholder": "Aggiungi il tuo commento"},
      {"name": "Frutti di mare", "price": "EGP 420", "desc": "Gamberi, calamari, pesce, vongole, cipolla, prezzemolo, olio, pomodoro", "placeholder": "Aggiungi il tuo commento"}
    ],
    "SPICE_TAGIN": [
      {"name": "Gamberi M", "price": "EGP 490", "options": ["Sugo rosso","Sugo bianco"], "placeholder": "Aggiungi il tuo commento"},
      {"name": "Gamberi S", "price": "EGP 470", "options": ["Sugo rosso","Sugo bianco"], "placeholder": "Aggiungi il tuo commento"},
      {"name": "Calamari", "price": "EGP 475", "options": ["Sugo rosso","Sugo bianco"], "placeholder": "Aggiungi il tuo commento"},
      {"name": "Pesce", "price": "EGP 425", "options": ["Sugo rosso","Sugo bianco"], "placeholder": "Aggiungi il tuo commento"},
      {"name": "Frutti di mare", "price": "EGP 420", "options": ["Sugo rosso","Sugo bianco"], "placeholder": "Aggiungi il tuo commento"}
    ],
    "GRILLED_FRIED": [
      {"name": "Aragosta (1kg)", "price": "EGP 4200", "options": ["Bollita","Sugo bianco"], "placeholder": "Aggiungi il tuo commento"},
      {"name": "Granchi (300gr)", "price": "EGP 490", "options": ["Grigliato","Bollito"], "placeholder": "Aggiungi il tuo commento"},
      {"name": "Polpo (250gr)", "price": "EGP 530", "options": ["Grigliato","A farfalla"], "placeholder": "Aggiungi il tuo commento"},
      {"name": "Calamari (250gr)", "price": "EGP 415", "options": ["Grigliato","Fritto"], "placeholder": "Aggiungi il tuo commento"},
      {"name": "Snapper bianco (500gr)", "price": "EGP 550", "options": ["Grigliato","Fritto"], "placeholder": "Aggiungi il tuo commento"},
      {"name": "Pesce persico (500gr)", "price": "EGP 285", "options": ["Grigliato","Fritto"], "placeholder": "Aggiungi il tuo commento"},
      {"name": "Branzino (per due)", "price": "EGP 1200", "options": ["Grigliato close","A farfalla","Fritto"], "placeholder": "Aggiungi il tuo commento"},
      {"name": "Snapper rosso (per due)", "price": "EGP 1060", "options": ["Grigliato close","A farfalla","Fritto"], "placeholder": "Aggiungi il tuo commento"},
      {"name": "Barboni (250gr)", "price": "EGP 380", "options": ["Grigliato","Fritto"], "placeholder": "Aggiungi il tuo commento"},
      {"name": "Gamberi L (300gr)", "price": "EGP 800", "options": ["Grigliato","Fritto","A farfalla"], "placeholder": "Aggiungi il tuo commento"},
      {"name": "Gamberi M (200gr)", "price": "EGP 450", "options": ["Grigliato","Fritto","A farfalla"], "placeholder": "Aggiungi il tuo commento"},
      {"name": "Filetto di pesce (250gr)", "price": "EGP 690", "options": ["Grigliato","Fritto"], "placeholder": "Aggiungi il tuo commento"},
      {"name": "Fish and Chips", "price": "EGP 720", "placeholder": "Aggiungi il tuo commento"}
    ],
    "SPECIALTIES": [
      {"name": "Aragust Lobster (500gr)", "price": "EGP 2600", "desc": "Pomodoro fresco, olio d'oliva, aglio, pasta", "placeholder": "Aggiungi il tuo commento"},
      {"name": "Bronzo (300gr)", "price": "EGP 900", "desc": "Olio e aglio, pasta", "placeholder": "Aggiungi il tuo commento"},
      {"name": "Polpo", "price": "EGP 600", "desc": "Pasta primavera, acciughe, capperi", "placeholder": "Aggiungi il tuo commento"},
      {"name": "Gamberi & Calamari (500gr)", "price": "EGP 1150", "placeholder": "Aggiungi il tuo commento"},
      {"name": "Piatto misto di frutti di mare", "price": "EGP 1700", "placeholder": "Aggiungi il tuo commento"},
      {"name": "Fritto misto", "price": "EGP 1150", "placeholder": "Aggiungi il tuo commento"}
    ],
    "BEEF_CHICKEN": [
      {"name": "Bistecca alla griglia", "price": "EGP 730", "desc": "Con verdure", "placeholder": "Aggiungi il tuo commento"},
      {"name": "Bistecca al pepe", "price": "EGP 730", "desc": "Con verdure e riso", "placeholder": "Aggiungi il tuo commento"},
      {"name": "Escalope Pane", "price": "EGP 650", "desc": "Con patatine fritte", "placeholder": "Aggiungi il tuo commento"},
      {"name": "Pollo Pane", "price": "EGP 470", "desc": "Con patatine fritte", "placeholder": "Aggiungi il tuo commento"}
    ],
    "DESSERTS": [
      {"name": "Insalata di frutta", "price": "EGP 220", "placeholder": "Aggiungi il tuo commento"},
      {"name": "Piatto di frutta", "price": "EGP 400", "placeholder": "Aggiungi il tuo commento"},
      {"name": "Gelato", "price": "EGP 150", "placeholder": "Aggiungi il tuo commento"}
    ],
    "SOFT_DRINKS": [
      {"name": "Coca Cola", "price": "EGP 85", "placeholder": "Aggiungi il tuo commento"},
      {"name": "Fanta", "price": "EGP 85", "placeholder": "Aggiungi il tuo commento"},
      {"name": "Sprite", "price": "EGP 85", "placeholder": "Aggiungi il tuo commento"},
      {"name": "Acqua minerale piccola", "price": "EGP 60", "placeholder": "Aggiungi il tuo commento"},
      {"name": "Acqua minerale grande", "price": "EGP 75", "placeholder": "Aggiungi il tuo commento"},
      {"name": "Acqua frizzante", "price": "EGP 85", "placeholder": "Aggiungi il tuo commento"},
      {"name": "Ibisco (Karkadé)", "price": "EGP 125", "placeholder": "Aggiungi il tuo commento"},
      {"name": "Tè freddo", "price": "EGP 130", "placeholder": "Aggiungi il tuo commento"}
    ],
    "HOT_DRINKS": [
      {"name": "Tè", "price": "EGP 70", "placeholder": "Aggiungi il tuo commento"},
      {"name": "Caffè", "price": "EGP 85", "placeholder": "Aggiungi il tuo commento"},
      {"name": "Tè all'anice", "price": "EGP 65", "placeholder": "Aggiungi il tuo commento"},
      {"name": "Tilia", "price": "EGP 65", "placeholder": "Aggiungi il tuo commento"},
      {"name": "Nescafe", "price": "EGP 90", "placeholder": "Aggiungi il tuo commento"},
      {"name": "Espresso", "price": "EGP 75", "placeholder": "Aggiungi il tuo commento"},
      {"name": "Cappuccino", "price": "EGP 115", "placeholder": "Aggiungi il tuo commento"},
      {"name": "Cafe Latte", "price": "EGP 115", "placeholder": "Aggiungi il tuo commento"},
      {"name": "Cioccolata calda", "price": "EGP 150", "placeholder": "Aggiungi il tuo commento"},
      {"name": "Zenzero, limone e miele", "price": "EGP 165", "placeholder": "Aggiungi il tuo commento"},
      {"name": "Zenzero e arancia", "price": "EGP 175", "placeholder": "Aggiungi il tuo commento"},
      {"name": "Sidro caldo", "price": "EGP 150", "placeholder": "Aggiungi il tuo commento"}
    ],
    "FRESH_JUICES": [
      {"name": "Cocktail fresco", "price": "EGP 120", "placeholder": "Aggiungi il tuo commento"},
      {"name": "Succo d'arancia", "price": "EGP 115", "placeholder": "Aggiungi il tuo commento"},
      {"name": "Succo di mango", "price": "EGP 115", "placeholder": "Aggiungi il tuo commento"},
      {"name": "Succo di pompelmo", "price": "EGP 115", "placeholder": "Aggiungi il tuo commento"},
      {"name": "Succo di mela", "price": "EGP 115", "placeholder": "Aggiungi il tuo commento"},
      {"name": "Succo di carota", "price": "EGP 115", "placeholder": "Aggiungi il tuo commento"},
      {"name": "Succo di melograno", "price": "EGP 115", "placeholder": "Aggiungi il tuo commento"}
    ] }
  },
  "es": {
    "title": "Restaurante Fish Market",
    "subtitle": "Comida saludable, deliciosa y agradable",
    "slogan": "La única manera de capturar la pesca del día en El Gouna",
    "order": "Su pedido:",
    "submit": "Enviar pedido",
    "table": "Table",
    "total": "Total",
    "sections": {
      "COLD_APPETIZERS": "APERITIVOS FRÍOS",
      "HOT_APPETIZERS": "APERITIVOS CALIENTES",
      "SOUP": "SOPA",
      "PASTA": "PASTA",
      "RICE_MIXED_WITH": "ARROZ MIXTO CON",
      "SPICE_TAGIN": "TAGINE CON ESPECIAS",
      "GRILLED_FRIED": "A LA PLANCHA & FRITO",
      "SPECIALTIES": "ESPECIALIDADES",
      "BEEF_CHICKEN": "CARNE & POLLO",
      "DESSERTS": "POSTRES",
      "SOFT_DRINKS": "BEBIDAS SIN ALCOHOL",
      "HOT_DRINKS": "BEBIDAS CALIENTES",
      "FRESH_JUICES": "JUGOS FRESCOS",
      "TABLE": "MESA"
    },
    "items": { 
    "COLD_APPETIZERS": [
      {"name": "Colbacho", "price": "EGP 420", "desc": "Atún crudo, aceite de oliva, limón, pimienta", "placeholder": "Agrega tu comentario"},
      {"name": "Cóctel de camarones", "price": "EGP 440", "desc": "Camarones pequeños, coñac, mayonesa, jugo de naranja, salsa", "placeholder": "Agrega tu comentario"},
      {"name": "Ensalada de atún", "price": "EGP 285", "desc": "Tomate, lechuga, aceite de oliva, limón, pimiento verde", "placeholder": "Agrega tu comentario"},
      {"name": "Ensalada griega", "price": "EGP 265", "desc": "Tomate, lechuga, pepino, aceitunas, feta, aceite de oliva, limón, pimiento verde", "placeholder": "Agrega tu comentario"},
      {"name": "Mezze libanés", "price": "EGP 335", "desc": "Tahina, hummus, baba ganoush", "placeholder": "Agrega tu comentario"},
      {"name": "Ensalada Fish Market", "price": "EGP 550", "desc": "Camarones, calamares, pulpo, atún, lechuga, tomate, cebolla", "placeholder": "Agrega tu comentario"}
    ],
    "HOT_APPETIZERS": [
      {"name": "Sardina", "price": "EGP 165", "options": ["A la parrilla","Frito"], "placeholder": "Agrega tu comentario"},
      {"name": "Almejas (100gr)", "price": "EGP 140", "placeholder": "Agrega tu comentario"},
      {"name": "Mejillones (100gr)", "price": "EGP 335", "placeholder": "Agrega tu comentario"},
      {"name": "Calamares (100gr)", "price": "EGP 175", "options": ["A la parrilla","Frito"], "placeholder": "Agrega tu comentario"},
      {"name": "Camarones M (100gr)", "price": "EGP 200", "options": ["A la parrilla","Frito","Mariposa"], "placeholder": "Agrega tu comentario"},
      {"name": "Pan de ajo", "price": "EGP 155", "placeholder": "Agrega tu comentario"},
      {"name": "Crostino y Mozzarella", "price": "EGP 150", "placeholder": "Agrega tu comentario"},
      {"name": "Crostino y Mozzarella & Camarones", "price": "EGP 245", "placeholder": "Agrega tu comentario"},
      {"name": "Crostino y Mozzarella & Calamares", "price": "EGP 225", "placeholder": "Agrega tu comentario"},
      {"name": "Crostino y Mozzarella & Anchoas", "price": "EGP 240", "placeholder": "Agrega tu comentario"}
    ],
    "SOUP": [
      {"name": "Sopa de mariscos (250gr)", "price": "EGP 225", "options": ["Normal","Cremosa"], "placeholder": "Agrega tu comentario"},
      {"name": "Sopa de tomate", "price": "EGP 140", "placeholder": "Agrega tu comentario"},
      {"name": "Sopa de verduras", "price": "EGP 140", "placeholder": "Agrega tu comentario"},
      {"name": "Sopa de lentejas", "price": "EGP 145", "placeholder": "Agrega tu comentario"},
      {"name": "Sopa de pescado", "price": "EGP 215", "options": ["Normal","Cremosa"], "placeholder": "Agrega tu comentario"},
      {"name": "Sopa de camarones", "price": "EGP 255", "options": ["Normal","Cremosa"], "placeholder": "Agrega tu comentario"},
      {"name": "Sopa especial de mariscos", "price": "EGP 310", "options": ["Normal","Cremosa"], "placeholder": "Agrega tu comentario"}
    ],
    "PASTA": [
      {"name": "Pomodoro", "price": "EGP 280", "desc": "Salsa de tomate, albahaca", "placeholder": "Agrega tu comentario"},
      {"name": "Olio e Aglio", "price": "EGP 270", "desc": "Ajo, chile, aceite de oliva", "placeholder": "Agrega tu comentario"},
      {"name": "Arrabbiata", "price": "EGP 270", "desc": "Ajo, chile, salsa de tomate", "placeholder": "Agrega tu comentario"},
      {"name": "Almejas", "price": "EGP 430", "desc": "Ajo, aceite de oliva, tomate fresco, perejil", "placeholder": "Agrega tu comentario"},
      {"name": "Camarones", "price": "EGP 475", "desc": "Aceite de oliva, tomate fresco, ajo, chile", "options": ["Salsa roja","Salsa blanca"], "placeholder": "Agrega tu comentario"},
      {"name": "Langosta (400gr)", "price": "EGP 2125", "desc": "Ajo, aceite de oliva, perejil, chile", "placeholder": "Agrega tu comentario"},
      {"name": "Mariscos", "price": "EGP 480", "desc": "Camarones, calamares, pescado, almejas, perejil, aceite de oliva, tomate fresco", "options": ["Salsa roja","Salsa blanca"], "placeholder": "Agrega tu comentario"}
    ],
    "RICE_MIXED_WITH": [
      {"name": "Pescado", "price": "EGP 380", "desc": "Aceite, cebolla, perejil, chile, tomate", "placeholder": "Agrega tu comentario"},
      {"name": "Almejas", "price": "EGP 410", "desc": "Aceite, cebolla, perejil, chile", "placeholder": "Agrega tu comentario"},
      {"name": "Calamares", "price": "EGP 390", "desc": "Cebolla, perejil, aceite de sésamo, pimienta", "placeholder": "Agrega tu comentario"},
      {"name": "Camarones pequeños", "price": "EGP 400", "desc": "Cebolla, perejil, aceite, tomate", "placeholder": "Agrega tu comentario"},
      {"name": "Mariscos", "price": "EGP 420", "desc": "Camarones, calamares, pescado, almejas, cebolla, perejil, aceite, tomate", "placeholder": "Agrega tu comentario"}
    ],
    "SPICE_TAGIN": [
      {"name": "Camarones M", "price": "EGP 490", "options": ["Salsa roja","Salsa blanca"], "placeholder": "Agrega tu comentario"},
      {"name": "Camarones S", "price": "EGP 470", "options": ["Salsa roja","Salsa blanca"], "placeholder": "Agrega tu comentario"},
      {"name": "Calamares", "price": "EGP 475", "options": ["Salsa roja","Salsa blanca"], "placeholder": "Agrega tu comentario"},
      {"name": "Pescado", "price": "EGP 425", "options": ["Salsa roja","Salsa blanca"], "placeholder": "Agrega tu comentario"},
      {"name": "Mariscos", "price": "EGP 420", "options": ["Salsa roja","Salsa blanca"], "placeholder": "Agrega tu comentario"}
    ],
    "GRILLED_FRIED": [
      {"name": "Langosta (1kg)", "price": "EGP 4200", "options": ["Hervida","Salsa blanca"], "placeholder": "Agrega tu comentario"},
      {"name": "Cangrejos (300gr)", "price": "EGP 490", "options": ["A la parrilla","Hervido"], "placeholder": "Agrega tu comentario"},
      {"name": "Pulpo (250gr)", "price": "EGP 530", "options": ["A la parrilla","Mariposa"], "placeholder": "Agrega tu comentario"},
      {"name": "Calamares (250gr)", "price": "EGP 415", "options": ["A la parrilla","Frito"], "placeholder": "Agrega tu comentario"},
      {"name": "Pargo blanco (500gr)", "price": "EGP 550", "options": ["A la parrilla","Frito"], "placeholder": "Agrega tu comentario"},
      {"name": "Pescado alma (500gr)", "price": "EGP 285", "options": ["A la parrilla","Frito"], "placeholder": "Agrega tu comentario"},
      {"name": "Lubina (para dos)", "price": "EGP 1200", "options": ["A la parrilla close","Mariposa","Frito"], "placeholder": "Agrega tu comentario"},
      {"name": "Pargo rojo (para dos)", "price": "EGP 1060", "options": ["A la parrilla close","Mariposa","Frito"], "placeholder": "Agrega tu comentario"},
      {"name": "Barboni (250gr)", "price": "EGP 380", "options": ["A la parrilla","Frito"], "placeholder": "Agrega tu comentario"},
      {"name": "Camarones L (300gr)", "price": "EGP 800", "options": ["A la parrilla","Frito","Mariposa"], "placeholder": "Agrega tu comentario"},
      {"name": "Camarones M (200gr)", "price": "EGP 450", "options": ["A la parrilla","Frito","Mariposa"], "placeholder": "Agrega tu comentario"},
      {"name": "Filete de pescado (250gr)", "price": "EGP 690", "options": ["A la parrilla","Frito"], "placeholder": "Agrega tu comentario"},
      {"name": "Fish and Chips", "price": "EGP 720", "placeholder": "Agrega tu comentario"}
    ],
    "SPECIALTIES": [
      {"name": "Langosta Aragust (500gr)", "price": "EGP 2600", "desc": "Tomate fresco, aceite de oliva, ajo, pasta", "placeholder": "Agrega tu comentario"},
      {"name": "Bronce (300gr)", "price": "EGP 900", "desc": "Olio Alio, pasta", "placeholder": "Agrega tu comentario"},
      {"name": "Pulpo", "price": "EGP 600", "desc": "Pasta primavera, anchoas, alcaparras", "placeholder": "Agrega tu comentario"},
      {"name": "Camarones y Calamares (500gr)", "price": "EGP 1150", "placeholder": "Agrega tu comentario"},
      {"name": "Plato mixto de mariscos", "price": "EGP 1700", "placeholder": "Agrega tu comentario"},
      {"name": "Fritto Misto", "price": "EGP 1150", "placeholder": "Agrega tu comentario"}
    ],
    "BEEF_CHICKEN": [
      {"name": "Bistec a la parrilla", "price": "EGP 730", "desc": "con verduras", "placeholder": "Agrega tu comentario"},
      {"name": "Bistec con pimienta", "price": "EGP 730", "desc": "con verduras y arroz", "placeholder": "Agrega tu comentario"},
      {"name": "Escalope Pane", "price": "EGP 650", "desc": "con papas fritas", "placeholder": "Agrega tu comentario"},
      {"name": "Pollo Pane", "price": "EGP 470", "desc": "con papas fritas", "placeholder": "Agrega tu comentario"}
    ],
    "DESSERTS": [
      {"name": "Ensalada de frutas", "price": "EGP 220", "placeholder": "Agrega tu comentario"},
      {"name": "Plato de frutas", "price": "EGP 400", "placeholder": "Agrega tu comentario"},
      {"name": "Helado", "price": "EGP 150", "placeholder": "Agrega tu comentario"}
    ],
    "SOFT_DRINKS": [
      {"name": "Cola", "price": "EGP 85", "placeholder": "Agrega tu comentario"},
      {"name": "Fanta", "price": "EGP 85", "placeholder": "Agrega tu comentario"},
      {"name": "Sprite", "price": "EGP 85", "placeholder": "Agrega tu comentario"},
      {"name": "Agua mineral pequeña", "price": "EGP 60", "placeholder": "Agrega tu comentario"},
      {"name": "Agua mineral grande", "price": "EGP 75", "placeholder": "Agrega tu comentario"},
      {"name": "Agua con gas", "price": "EGP 85", "placeholder": "Agrega tu comentario"},
      {"name": "Hibisco (Karakade)", "price": "EGP 125", "placeholder": "Agrega tu comentario"},
      {"name": "Té helado", "price": "EGP 130", "placeholder": "Agrega tu comentario"}
    ],
    "HOT_DRINKS": [
      {"name": "Té", "price": "EGP 70", "placeholder": "Agrega tu comentario"},
      {"name": "Café", "price": "EGP 85", "placeholder": "Agrega tu comentario"},
      {"name": "Té de anís", "price": "EGP 65", "placeholder": "Agrega tu comentario"},
      {"name": "Tilia", "price": "EGP 65", "placeholder": "Agrega tu comentario"},
      {"name": "Nescafé", "price": "EGP 90", "placeholder": "Agrega tu comentario"},
      {"name": "Espresso", "price": "EGP 75", "placeholder": "Agrega tu comentario"},
      {"name": "Cappuccino", "price": "EGP 115", "placeholder": "Agrega tu comentario"},
      {"name": "Café latte", "price": "EGP 115", "placeholder": "Agrega tu comentario"},
      {"name": "Chocolate caliente", "price": "EGP 150", "placeholder": "Agrega tu comentario"},
      {"name": "Jengibre limón miel", "price": "EGP 165", "placeholder": "Agrega tu comentario"},
      {"name": "Jengibre naranja", "price": "EGP 175", "placeholder": "Agrega tu comentario"},
      {"name": "Sidra caliente", "price": "EGP 150", "placeholder": "Agrega tu comentario"}
    ],
    "FRESH_JUICES": [
      {"name": "Cóctel fresco", "price": "EGP 120", "placeholder": "Agrega tu comentario"},
      {"name": "Jugo de mango", "price": "EGP 95", "placeholder": "Agrega tu comentario"},
      {"name": "Jugo de naranja", "price": "EGP 100", "placeholder": "Agrega tu comentario"},
      {"name": "Jugo de limón", "price": "EGP 95", "placeholder": "Agrega tu comentario"},
      {"name": "Jugo de fresa", "price": "EGP 95", "placeholder": "Agrega tu comentario"}
    ] }
  },



  "zh_simplified": {
    "title": "鱼市餐厅",
    "subtitle": "健康、美味与愉悦的食物",
    "slogan": "在赫尔格达品尝每日鲜捕的唯一方式",
    "order": "您的订单：",
    "submit": "提交订单",
    "table": "Table",
    "total": "Total",
    "sections": {
      "COLD_APPETIZERS": "冷盘",
      "HOT_APPETIZERS": "热菜",
      "SOUP": "汤",
      "PASTA": "意大利面",
      "RICE_MIXED_WITH": "米饭混合",
      "SPICE_TAGIN": "香料炖菜",
      "GRILLED_OR_FRIED": "烤 & 炸",
      "SPECIALTIES": "特色菜",
      "BEEF_CHICKEN": "牛肉 & 鸡肉",
      "DESSERTS": "甜点",
      "SOFT_DRINKS": "软饮",
      "HOT_DRINKS": "热饮",
      "FRESH_JUICES": "鲜榨果汁",
      "TABLE": "桌号"
    },
    "items": { 
  "COLD_APPETIZERS": [
    {"name": "生金枪鱼", "price": "EGP 420", "desc": "生金枪鱼，橄榄油，柠檬，胡椒", "placeholder": "添加评论"},
    {"name": "虾鸡尾酒", "price": "EGP 440", "desc": "小虾，白兰地，蛋黄酱，橙汁，酱汁", "placeholder": "添加评论"},
    {"name": "金枪鱼沙拉", "price": "EGP 285", "desc": "番茄，生菜，橄榄油，柠檬，青椒", "placeholder": "添加评论"},
    {"name": "希腊沙拉", "price": "EGP 265", "desc": "番茄，生菜，黄瓜，橄榄，羊奶酪，橄榄油，柠檬，青椒", "placeholder": "添加评论"},
    {"name": "黎巴嫩小菜拼盘", "price": "EGP 335", "desc": "芝麻酱，鹰嘴豆泥，茄子泥", "placeholder": "添加评论"},
    {"name": "渔市沙拉", "price": "EGP 550", "desc": "虾，鱿鱼，章鱼，金枪鱼，生菜，番茄，洋葱", "placeholder": "添加评论"}
  ],
  "HOT_APPETIZERS": [
    {"name": "沙丁鱼", "price": "EGP 165", "options": ["烤","炸"], "placeholder": "添加评论"},
    {"name": "蛤蜊 (100克)", "price": "EGP 140", "placeholder": "添加评论"},
    {"name": "贻贝 (100克)", "price": "EGP 335", "placeholder": "添加评论"},
    {"name": "鱿鱼 (100克)", "price": "EGP 175", "options": ["烤","炸"], "placeholder": "添加评论"},
    {"name": "中虾 (100克)", "price": "EGP 200", "options": ["烤","炸","蝴蝶虾"], "placeholder": "添加评论"},
    {"name": "蒜香面包", "price": "EGP 155", "placeholder": "添加评论"},
    {"name": "奶酪烤面包", "price": "EGP 150", "placeholder": "添加评论"},
    {"name": "奶酪虾烤面包", "price": "EGP 245", "placeholder": "添加评论"},
    {"name": "奶酪鱿鱼烤面包", "price": "EGP 225", "placeholder": "添加评论"},
    {"name": "奶酪凤尾鱼烤面包", "price": "EGP 240", "placeholder": "添加评论"}
  ],
  "SOUP": [
    {"name": "海鲜汤 (250克)", "price": "EGP 225", "options": ["清汤","奶油汤"], "placeholder": "添加评论"},
    {"name": "番茄汤", "price": "EGP 140", "placeholder": "添加评论"},
    {"name": "蔬菜汤", "price": "EGP 140", "placeholder": "添加评论"},
    {"name": "扁豆汤", "price": "EGP 145", "placeholder": "添加评论"},
    {"name": "鱼汤", "price": "EGP 215", "options": ["清汤","奶油汤"], "placeholder": "添加评论"},
    {"name": "虾汤", "price": "EGP 255", "options": ["清汤","奶油汤"], "placeholder": "添加评论"},
    {"name": "特制海鲜汤", "price": "EGP 310", "options": ["清汤","奶油汤"], "placeholder": "添加评论"}
  ],
  "PASTA": [
    {"name": "番茄意面", "price": "EGP 280", "desc": "番茄酱，罗勒", "placeholder": "添加评论"},
    {"name": "蒜香意面", "price": "EGP 270", "desc": "大蒜，辣椒，橄榄油", "placeholder": "添加评论"},
    {"name": "阿拉比亚塔", "price": "EGP 270", "desc": "大蒜，辣椒，番茄酱", "placeholder": "添加评论"},
    {"name": "蛤蜊意面", "price": "EGP 430", "desc": "大蒜，橄榄油，新鲜番茄，欧芹", "options": ["红酱","白酱"], "placeholder": "添加评论"},
    {"name": "虾意面", "price": "EGP 475", "desc": "橄榄油，新鲜番茄，大蒜，辣椒", "options": ["红酱","白酱"], "placeholder": "添加评论"},
    {"name": "龙虾 (400克)", "price": "EGP 2125", "desc": "大蒜，橄榄油，欧芹，辣椒", "placeholder": "添加评论"},
    {"name": "海鲜意面", "price": "EGP 480", "desc": "虾，鱿鱼，鱼，蛤蜊，欧芹，橄榄油，新鲜番茄", "options": ["红酱","白酱"], "placeholder": "添加评论"}
  ],
  "RICE_MIXED_WITH": [
    {"name": "鱼饭", "price": "EGP 380", "desc": "油，洋葱，欧芹，辣椒，番茄", "placeholder": "添加评论"},
    {"name": "蛤蜊饭", "price": "EGP 410", "desc": "油，洋葱，欧芹，辣椒", "placeholder": "添加评论"},
    {"name": "鱿鱼饭", "price": "EGP 390", "desc": "洋葱，欧芹，芝麻油，胡椒", "placeholder": "添加评论"},
    {"name": "小虾饭", "price": "EGP 400", "desc": "洋葱，欧芹，油，番茄", "placeholder": "添加评论"},
    {"name": "海鲜饭", "price": "EGP 420", "desc": "虾，鱿鱼，鱼，蛤蜊，洋葱，欧芹，油，番茄", "placeholder": "添加评论"}
  ],
  "SPICE_TAGIN": [
    {"name": "中虾", "price": "EGP 490", "options": ["红酱","白酱"], "placeholder": "添加评论"},
    {"name": "小虾", "price": "EGP 470", "options": ["红酱","白酱"], "placeholder": "添加评论"},
    {"name": "鱿鱼", "price": "EGP 475", "options": ["红酱","白酱"], "placeholder": "添加评论"},
    {"name": "鱼", "price": "EGP 425", "options": ["红酱","白酱"], "placeholder": "添加评论"},
    {"name": "海鲜", "price": "EGP 420", "options": ["红酱","白酱"], "placeholder": "添加评论"}
  ],
  "GRILLED_OR_FRIED": [
    {"name": "龙虾 (1公斤)", "price": "EGP 4200", "options": ["煮","白酱"], "placeholder": "添加评论"},
    {"name": "螃蟹 (300克)", "price": "EGP 490", "options": ["烤","煮"], "placeholder": "添加评论"},
    {"name": "章鱼 (250克)", "price": "EGP 530", "options": ["烤","蝴蝶"], "placeholder": "添加评论"},
    {"name": "鱿鱼 (250克)", "price": "EGP 415", "options": ["烤","炸"], "placeholder": "添加评论"},
    {"name": "白鲷鱼 (500克)", "price": "EGP 550", "options": ["烤","炸"], "placeholder": "添加评论"},
    {"name": "灵魂鱼 (500克)", "price": "EGP 285", "options": ["烤","炸"], "placeholder": "添加评论"},
    {"name": "海鲈鱼 (双人份)", "price": "EGP 1200", "options": ["烤封闭","烤蝴蝶","炸"], "placeholder": "添加评论"},
    {"name": "红鲷鱼 (双人份)", "price": "EGP 1060", "options": ["烤封闭","烤蝴蝶","炸"], "placeholder": "添加评论"},
    {"name": "巴博尼鱼 (250克)", "price": "EGP 380", "options": ["烤","炸"], "placeholder": "添加评论"},
    {"name": "大虾 (300克)", "price": "EGP 800", "options": ["烤","炸","蝴蝶虾"], "placeholder": "添加评论"},
    {"name": "中虾 (200克)", "price": "EGP 450", "options": ["烤","炸","蝴蝶虾"], "placeholder": "添加评论"},
    {"name": "鱼片 (250克)", "price": "EGP 690", "options": ["烤","炸"], "placeholder": "添加评论"},
    {"name": "炸鱼薯条", "price": "EGP 720", "placeholder": "添加评论"}
  ],
  "SPECIALTIES": [
    {"name": "阿拉古斯龙虾 (500克)", "price": "EGP 2600", "desc": "新鲜番茄，橄榄油，大蒜，意面", "placeholder": "添加评论"},
    {"name": "青铜鱼 (300克)", "price": "EGP 900", "desc": "蒜香意面", "placeholder": "添加评论"},
    {"name": "章鱼", "price": "EGP 600", "desc": "意面春天，凤尾鱼，刺山柑", "placeholder": "添加评论"},
    {"name": "虾与鱿鱼 (500克)", "price": "EGP 1150", "placeholder": "添加评论"},
    {"name": "混合海鲜拼盘", "price": "EGP 1700", "placeholder": "添加评论"},
    {"name": "意式炸海鲜拼盘", "price": "EGP 1150", "placeholder": "添加评论"}
  ],
  "BEEF_CHICKEN": [
    {"name": "烤牛排", "price": "EGP 730", "desc": "配蔬菜", "placeholder": "添加评论"},
    {"name": "胡椒牛排", "price": "EGP 730", "desc": "配蔬菜和米饭", "placeholder": "添加评论"},
    {"name": "面包裹肉排", "price": "EGP 650", "desc": "配薯条", "placeholder": "添加评论"},
    {"name": "鸡肉裹面包", "price": "EGP 470", "desc": "配薯条", "placeholder": "添加评论"}
  ],
  "DESSERTS": [
    {"name": "水果沙拉", "price": "EGP 220", "placeholder": "添加评论"},
    {"name": "水果拼盘", "price": "EGP 400", "placeholder": "添加评论"},
    {"name": "冰淇淋", "price": "EGP 150", "placeholder": "添加评论"}
  ],
  "SOFT_DRINKS": [
    {"name": "可乐", "price": "EGP 85", "placeholder": "添加评论"},
    {"name": "芬达", "price": "EGP 85", "placeholder": "添加评论"},
    {"name": "雪碧", "price": "EGP 85", "placeholder": "添加评论"},
    {"name": "小瓶矿泉水", "price": "EGP 60", "placeholder": "添加评论"},
    {"name": "大瓶矿泉水", "price": "EGP 75", "placeholder": "添加评论"},
    {"name": "气泡水", "price": "EGP 85", "placeholder": "添加评论"},
    {"name": "洛神花茶", "price": "EGP 125", "placeholder": "添加评论"},
    {"name": "冰茶", "price": "EGP 130", "placeholder": "添加评论"}
  ],
  "HOT_DRINKS": [
    {"name": "茶", "price": "EGP 70", "placeholder": "添加评论"},
    {"name": "咖啡", "price": "EGP 85", "placeholder": "添加评论"},
    {"name": "茴香茶", "price": "EGP 65", "placeholder": "添加评论"},
    {"name": "椴树花茶", "price": "EGP 65", "placeholder": "添加评论"},
    {"name": "雀巢咖啡", "price": "EGP 90", "placeholder": "添加评论"},
    {"name": "浓缩咖啡", "price": "EGP 75", "placeholder": "添加评论"},
    {"name": "卡布奇诺", "price": "EGP 115", "placeholder": "添加评论"},
    {"name": "拿铁咖啡", "price": "EGP 115", "placeholder": "添加评论"},
    {"name": "热巧克力", "price": "EGP 150", "placeholder": "添加评论"},
    {"name": "姜柠蜂蜜", "price": "EGP 165", "placeholder": "添加评论"},
    {"name": "姜橙", "price": "EGP 175", "placeholder": "添加评论"},
    {"name": "热苹果酒", "price": "EGP 150", "placeholder": "添加评论"}
  ],
  "FRESH_JUICES": [
    {"name": "鲜果鸡尾酒", "price": "EGP 120", "placeholder": "添加评论"},
    {"name": "芒果汁", "price": "EGP 95", "placeholder": "添加评论"},
    {"name": "橙汁", "price": "EGP 100", "placeholder": "添加评论"},
    {"name": "柠檬汁", "price": "EGP 95", "placeholder": "添加评论"},
    {"name": "草莓汁", "price": "EGP 95", "placeholder": "添加评论"}
  ]
}
 
  },
  "zh_traditional": {
    "title": "魚市餐廳",
    "subtitle": "健康、美味與愉悅的食物",
    "slogan": "在赫爾格達品嚐每日鮮捕的唯一方式",
    "order": "您的訂單：",
    "submit": "提交訂單",
    "table": "Table",
    "total": "Total",
    "sections": {
      "COLD_APPETIZERS": "冷盤",
      "HOT_APPETIZERS": "熱菜",
      "SOUP": "湯",
      "PASTA": "義大利麵",
      "RICE_MIXED_WITH": "米飯混合",
      "SPICE_TAGIN": "香料炖菜",
      "GRILLED_OR_FRIED": "烤 & 炸",
      "SPECIALTIES": "特色菜",
      "BEEF_CHICKEN": "牛肉 & 雞肉",
      "DESSERTS": "甜點",
      "SOFT_DRINKS": "軟飲",
      "HOT_DRINKS": "熱飲",
      "FRESH_JUICES": "鮮榨果汁",
      "TABLE": "桌號"
    },
    "items": { 
  "COLD_APPETIZERS": [
    {"name": "生金槍魚", "price": "EGP 420", "desc": "生金槍魚，橄欖油，檸檬，胡椒", "placeholder": "添加評論"},
    {"name": "蝦雞尾酒", "price": "EGP 440", "desc": "小蝦，白蘭地，蛋黃醬，橙汁，醬汁", "placeholder": "添加評論"},
    {"name": "金槍魚沙拉", "price": "EGP 285", "desc": "番茄，生菜，橄欖油，檸檬，青椒", "placeholder": "添加評論"},
    {"name": "希臘沙拉", "price": "EGP 265", "desc": "番茄，生菜，黃瓜，橄欖，羊奶酪，橄欖油，檸檬，青椒", "placeholder": "添加評論"},
    {"name": "黎巴嫩小菜拼盤", "price": "EGP 335", "desc": "芝麻醬，鷹嘴豆泥，茄子泥", "placeholder": "添加評論"},
    {"name": "漁市沙拉", "price": "EGP 550", "desc": "蝦，魷魚，章魚，金槍魚，生菜，番茄，洋蔥", "placeholder": "添加評論"}
  ],
  "HOT_APPETIZERS": [
    {"name": "沙丁魚", "price": "EGP 165", "options": ["烤","炸"], "placeholder": "添加評論"},
    {"name": "蛤蜊 (100克)", "price": "EGP 140", "placeholder": "添加評論"},
    {"name": "貽貝 (100克)", "price": "EGP 335", "placeholder": "添加評論"},
    {"name": "魷魚 (100克)", "price": "EGP 175", "options": ["烤","炸"], "placeholder": "添加評論"},
    {"name": "中蝦 (100克)", "price": "EGP 200", "options": ["烤","炸","蝴蝶蝦"], "placeholder": "添加評論"},
    {"name": "蒜香麵包", "price": "EGP 155", "placeholder": "添加評論"},
    {"name": "奶酪烤麵包", "price": "EGP 150", "placeholder": "添加評論"},
    {"name": "奶酪蝦烤麵包", "price": "EGP 245", "placeholder": "添加評論"},
    {"name": "奶酪魷魚烤麵包", "price": "EGP 225", "placeholder": "添加評論"},
    {"name": "奶酪鳳尾魚烤麵包", "price": "EGP 240", "placeholder": "添加評論"}
  ],
  "SOUP": [
    {"name": "海鮮湯 (250克)", "price": "EGP 225", "options": ["清湯","奶油湯"], "placeholder": "添加評論"},
    {"name": "番茄湯", "price": "EGP 140", "placeholder": "添加評論"},
    {"name": "蔬菜湯", "price": "EGP 140", "placeholder": "添加評論"},
    {"name": "扁豆湯", "price": "EGP 145", "placeholder": "添加評論"},
    {"name": "魚湯", "price": "EGP 215", "options": ["清湯","奶油湯"], "placeholder": "添加評論"},
    {"name": "蝦湯", "price": "EGP 255", "options": ["清湯","奶油湯"], "placeholder": "添加評論"},
    {"name": "特製海鮮湯", "price": "EGP 310", "options": ["清湯","奶油湯"], "placeholder": "添加評論"}
  ],
  "PASTA": [
    {"name": "番茄意面", "price": "EGP 280", "desc": "番茄醬，羅勒", "placeholder": "添加評論"},
    {"name": "蒜香意面", "price": "EGP 270", "desc": "大蒜，辣椒，橄欖油", "placeholder": "添加評論"},
    {"name": "阿拉比亞塔", "price": "EGP 270", "desc": "大蒜，辣椒，番茄醬", "placeholder": "添加評論"},
    {"name": "蛤蜊意面", "price": "EGP 430", "desc": "大蒜，橄欖油，新鮮番茄，歐芹", "options": ["紅醬","白醬"], "placeholder": "添加評論"},
    {"name": "蝦意面", "price": "EGP 475", "desc": "橄欖油，新鮮番茄，大蒜，辣椒", "options": ["紅醬","白醬"], "placeholder": "添加評論"},
    {"name": "龍蝦 (400克)", "price": "EGP 2125", "desc": "大蒜，橄欖油，歐芹，辣椒", "placeholder": "添加評論"},
    {"name": "海鮮意面", "price": "EGP 480", "desc": "蝦，魷魚，魚，蛤蜊，歐芹，橄欖油，新鮮番茄", "options": ["紅醬","白醬"], "placeholder": "添加評論"}
  ],
  "RICE_MIXED_WITH": [
    {"name": "魚飯", "price": "EGP 380", "desc": "油，洋蔥，歐芹，辣椒，番茄", "placeholder": "添加評論"},
    {"name": "蛤蜊飯", "price": "EGP 410", "desc": "油，洋蔥，歐芹，辣椒", "placeholder": "添加評論"},
    {"name": "魷魚飯", "price": "EGP 390", "desc": "洋蔥，歐芹，芝麻油，胡椒", "placeholder": "添加評論"},
    {"name": "小蝦飯", "price": "EGP 400", "desc": "洋蔥，歐芹，油，番茄", "placeholder": "添加評論"},
    {"name": "海鮮飯", "price": "EGP 420", "desc": "蝦，魷魚，魚，蛤蜊，洋蔥，歐芹，油，番茄", "placeholder": "添加評論"}
  ],
  "SPICE_TAGIN": [
    {"name": "中蝦", "price": "EGP 490", "options": ["紅醬","白醬"], "placeholder": "添加評論"},
    {"name": "小蝦", "price": "EGP 470", "options": ["紅醬","白醬"], "placeholder": "添加評論"},
    {"name": "魷魚", "price": "EGP 475", "options": ["紅醬","白醬"], "placeholder": "添加評論"},
    {"name": "魚", "price": "EGP 425", "options": ["紅醬","白醬"], "placeholder": "添加評論"},
    {"name": "海鮮", "price": "EGP 420", "options": ["紅醬","白醬"], "placeholder": "添加評論"}
  ],
  "GRILLED_OR_FRIED": [
    {"name": "龍蝦 (1公斤)", "price": "EGP 4200", "options": ["煮","白醬"], "placeholder": "添加評論"},
    {"name": "螃蟹 (300克)", "price": "EGP 490", "options": ["烤","煮"], "placeholder": "添加評論"},
    {"name": "章魚 (250克)", "price": "EGP 530", "options": ["烤","蝴蝶"], "placeholder": "添加評論"},
    {"name": "魷魚 (250克)", "price": "EGP 415", "options": ["烤","炸"], "placeholder": "添加評論"},
    {"name": "白鯛魚 (500克)", "price": "EGP 550", "options": ["烤","炸"], "placeholder": "添加評論"},
    {"name": "靈魂魚 (500克)", "price": "EGP 285", "options": ["烤","炸"], "placeholder": "添加評論"},
    {"name": "海鱸魚 (雙人份)", "price": "EGP 1200", "options": ["烤封閉","烤蝴蝶","炸"], "placeholder": "添加評論"},
    {"name": "紅鯛魚 (雙人份)", "price": "EGP 1060", "options": ["烤封閉","烤蝴蝶","炸"], "placeholder": "添加評論"},
    {"name": "巴博尼魚 (250克)", "price": "EGP 380", "options": ["烤","炸"], "placeholder": "添加評論"},
    {"name": "大蝦 (300克)", "price": "EGP 800", "options": ["烤","炸","蝴蝶蝦"], "placeholder": "添加評論"},
    {"name": "中蝦 (200克)", "price": "EGP 450", "options": ["烤","炸","蝴蝶蝦"], "placeholder": "添加評論"},
    {"name": "魚片 (250克)", "price": "EGP 690", "options": ["烤","炸"], "placeholder": "添加評論"},
    {"name": "炸魚薯條", "price": "EGP 720", "placeholder": "添加評論"}
  ],
  "SPECIALTIES": [
    {"name": "阿拉古斯龍蝦 (500克)", "price": "EGP 2600", "desc": "新鮮番茄，橄欖油，大蒜，意面", "placeholder": "添加評論"},
    {"name": "青銅魚 (300克)", "price": "EGP 900", "desc": "蒜香意面", "placeholder": "添加評論"},
    {"name": "章魚", "price": "EGP 600", "desc": "意面春天，鳳尾魚，刺山柑", "placeholder": "添加評論"},
    {"name": "蝦與魷魚 (500克)", "price": "EGP 1150", "placeholder": "添加評論"},
    {"name": "混合海鮮拼盤", "price": "EGP 1700", "placeholder": "添加評論"},
    {"name": "意式炸海鮮拼盤", "price": "EGP 1150", "placeholder": "添加評論"}
  ],
  "BEEF_CHICKEN": [
    {"name": "烤牛排", "price": "EGP 730", "desc": "配蔬菜", "placeholder": "添加評論"},
    {"name": "胡椒牛排", "price": "EGP 730", "desc": "配蔬菜和米飯", "placeholder": "添加評論"},
    {"name": "麵包裹肉排", "price": "EGP 650", "desc": "配薯條", "placeholder": "添加評論"},
    {"name": "雞肉裹麵包", "price": "EGP 470", "desc": "配薯條", "placeholder": "添加評論"}
  ],
  "DESSERTS": [
    {"name": "水果沙拉", "price": "EGP 220", "placeholder": "添加評論"},
    {"name": "水果拼盤", "price": "EGP 400", "placeholder": "添加評論"},
    {"name": "冰淇淋", "price": "EGP 150", "placeholder": "添加評論"}
  ],
  "SOFT_DRINKS": [
    {"name": "可樂", "price": "EGP 85", "placeholder": "添加評論"},
    {"name": "芬達", "price": "EGP 85", "placeholder": "添加評論"},
    {"name": "雪碧", "price": "EGP 85", "placeholder": "添加評論"},
    {"name": "小瓶礦泉水", "price": "EGP 60", "placeholder": "添加評論"},
    {"name": "大瓶礦泉水", "price": "EGP 75", "placeholder": "添加評論"},
    {"name": "氣泡水", "price": "EGP 85", "placeholder": "添加評論"},
    {"name": "洛神花茶", "price": "EGP 125", "placeholder": "添加評論"},
    {"name": "冰茶", "price": "EGP 130", "placeholder": "添加評論"}
  ],
  "HOT_DRINKS": [
    {"name": "茶", "price": "EGP 70", "placeholder": "添加評論"},
    {"name": "咖啡", "price": "EGP 85", "placeholder": "添加評論"},
    {"name": "茴香茶", "price": "EGP 65", "placeholder": "添加評論"},
    {"name": "椴樹花茶", "price": "EGP 65", "placeholder": "添加評論"},
    {"name": "雀巢咖啡", "price": "EGP 90", "placeholder": "添加評論"},
    {"name": "濃縮咖啡", "price": "EGP 75", "placeholder": "添加評論"},
    {"name": "卡布奇諾", "price": "EGP 115", "placeholder": "添加評論"},
    {"name": "拿鐵咖啡", "price": "EGP 115", "placeholder": "添加評論"},
    {"name": "熱巧克力", "price": "EGP 150", "placeholder": "添加評論"},
    {"name": "姜檸蜂蜜", "price": "EGP 165", "placeholder": "添加評論"},
    {"name": "姜橙", "price": "EGP 175", "placeholder": "添加評論"},
    {"name": "熱蘋果酒", "price": "EGP 150", "placeholder": "添加評論"}
  ],
  "FRESH_JUICES": [
    {"name": "鮮果雞尾酒", "price": "EGP 120", "placeholder": "添加評論"},
    {"name": "芒果汁", "price": "EGP 95", "placeholder": "添加評論"},
    {"name": "橙汁", "price": "EGP 100", "placeholder": "添加評論"},
    {"name": "檸檬汁", "price": "EGP 95", "placeholder": "添加評論"},
    {"name": "草莓汁", "price": "EGP 95", "placeholder": "添加評論"}
  ]
}

  }
   }






let currentLang = "en";
let zoomed = false;
let currentTable = 6;
let order = [
  { id: 0, name: "Table:" + currentTable, price: 0, section: '', option: '', comment: '' }
];
// order = [{ id: 0, name: "Table:"+ currentTable, price: 0, section: '', option: '', comment: '' }];
let total = 0;
let orderIdCounter = 0;

function escapeHtml(unsafe) {
  if (!unsafe) return '';
  return unsafe.replace(/[&<>"'`=\/]/g, s => (
    {'&':"&amp;",'<':"&lt;",'>':"&gt;",'"':"&quot;","'":"&#39;","/":"&#x2F;","`":"&#x60;","=":"&#x3D;"}[s]
  ));
}

function showSection(sectionId, btn) {
  document.querySelectorAll('.section').forEach(sec => sec.style.display = 'none');
  document.querySelectorAll('.tabs button').forEach(b => b.classList.remove('active'));
  const section = document.getElementById(sectionId);
  if (section) section.style.display = 'block';
  if (btn) btn.classList.add('active');
}

function toggleMode() {
  document.body.classList.toggle('light-mode');
}


function toggleZoom() {
  document.body.style.fontSize = zoomed ? "" : "1.3em";
  zoomed = !zoomed;
}


function addToOrder(itemLabel, btn) {
  let name = itemLabel, price = 0;
  const match = itemLabel.match(/(.*)\s-\sEGP\s*([\d.]+)/);
  if (match) { name = match[1].trim(); price = parseFloat(match[2]); }

  const itemElem = btn.closest('.item');
  const textarea = itemElem ? itemElem.querySelector('textarea') : null;
  const comment = textarea ? textarea.value.trim() : '';


  let option = '';
  if (itemElem) {
    const section = itemElem.dataset.section;
    const index = itemElem.dataset.index;
    const optionName = `${section}_${index}_option`;
    const selected = itemElem.querySelector(`input[name="${optionName}"]:checked`);
    if (selected) option = selected.value; 
  }

  const sectionDiv = btn.closest('.section');
  const sectionName = sectionDiv ? sectionDiv.id : '';

  const id = ++orderIdCounter;
  order.push({ id, section: sectionName, name, price, option, comment });
  total += price;
  updateOrderList();
}

function removeItem(id) {
  const idx = order.findIndex(i => i.id === id);
  if (idx !== -1) {
    total -= order[idx].price;
    order.splice(idx, 1);
    updateOrderList();
  }
}

// function updateOrderList() {
//   const list = document.getElementById("order-list");
//   if (!list) return;
//   list.innerHTML = "";

//   order.forEach(item => {
//     const li = document.createElement("li");
//     li.setAttribute('data-id', item.id);






//     if (item.id === 0) {
//       li.textContent = `${translations[currentLang].table}:1`;
//     } else {
//       let text = `${item.section} - ${item.name} - EGP ${item.price}`;
//       if (item.option) text += ` | Option: ${item.option}`;
//       if (item.comment) text += ` | Note: ${escapeHtml(item.comment)}`;
//       li.innerHTML = `${text} <span class="remove-span" onclick="removeItem(${item.id})" style="color:red;cursor:pointer;">×</span>`;
//     }
//     list.appendChild(li);
//   });
  
// order.forEach(item => {
//   const li = document.createElement("li");
//   li.dataset.id = item.id;
//   if(item.id === 0){
//     li.textContent = `${translations[currentLang].table}: ${currentTable}`;
//   } else {
    
//   }
//   list.appendChild(li);
// });

//   const totalEl = document.getElementById("total");
//   if (totalEl) totalEl.textContent = `${translations[currentLang].total}: EGP ${total}`;
// }


function updateOrderList() {
  const list = document.getElementById("order-list");
  if (!list) return;
  list.innerHTML = "";

  order.forEach(item => {
    const li = document.createElement("li");
    li.dataset.id = item.id;

    let text;
    if(item.id === 0){
      // هنا نستخدم الترجمة للجدول
      text = `${translations[currentLang].table}: ${currentTable}`;
      li.textContent = text;
    } else {
      text = `${item.section} - ${item.name} - EGP ${item.price}`;
      if(item.option) text += ` | Option: ${item.option}`;
      if(item.comment) text += ` | Note: ${escapeHtml(item.comment)}`;

      li.innerHTML = `${text} <span class="remove-span" onclick="removeItem(${item.id})" style="color:red;cursor:pointer;">×</span>`;
    }

    list.appendChild(li);
  });

  const totalEl = document.getElementById("total");
  if(totalEl) totalEl.textContent = `${translations[currentLang].total}: EGP ${total}`;
}




function openPopup() {
  if (order.length <= 1) { alert("No items in order!"); return; }
  const popupList = document.getElementById("popup-order-list");
  if (!popupList) return;
  popupList.innerHTML = "";

  order.forEach(item => {
    const li = document.createElement("li");
    if (item.id === 0) {
  li.textContent = `${translations[currentLang].table}: ${currentTable}`;
}

    else {
      let text = `${item.section} - ${item.name} - EGP ${item.price}`;
      if (item.option) text += ` | Option: ${item.option}`;
      if (item.comment) text += ` | Note: ${escapeHtml(item.comment)}`;
      li.textContent = text;
    }
    popupList.appendChild(li);
  });

  document.getElementById("popup-total").textContent = `${translations[currentLang].total}: EGP ${total}`;
  document.getElementById("popup").style.display = "flex";
}
function closePopup() { document.getElementById("popup").style.display = "none"; }


function updateTabsLanguage(lang) {
  document.querySelectorAll('.tabs .lang').forEach(span => {
    const text = span.getAttribute('data-' + lang);
    if (text) span.innerText = text;
  });
}

function updateFullLanguage(lang) {
  const data = translations[lang];
  if (!data) return;
  currentLang = lang;

  ['title','subtitle','slogan','order','submit','tableLabel','total','popup-total'].forEach(id => {
    const el = document.getElementById(id);
    if (el && data[id]) el.textContent = data[id];
  });


  document.querySelectorAll(".item").forEach(el => {
    const section = el.dataset.section;
    const index = el.dataset.index;
    const itemData = data.items?.[section]?.[index];
    if (itemData) {
      const strong = el.querySelector("strong");
      const small = el.querySelector("small");
      const textarea = el.querySelector("textarea");
      if (strong) strong.innerText = `${itemData.name} - ${itemData.price}`;
      if (small && itemData.desc) small.innerText = `(${itemData.desc})`;
      if (textarea && itemData.placeholder) textarea.placeholder = itemData.placeholder;

      const optionsDiv = el.querySelector(".options");
      if (optionsDiv && itemData.options) {
        optionsDiv.innerHTML = "";

        const baseOptions =
          translations["en"]?.items?.[section]?.[index]?.options || itemData.options;

        itemData.options.forEach((opt, i) => {
          const englishValue = baseOptions[i] || opt; 
          const label = document.createElement("label");
          label.innerHTML = `<input type="radio" name="${section}_${index}_option" value="${englishValue}"> ${opt}`;
          optionsDiv.appendChild(label);
          optionsDiv.appendChild(document.createElement("br"));
        });
      }
    }
  });

  updateOrderList();
}

document.getElementById("languageSelector").addEventListener("change", function() {
  const lang = this.value;
  updateTabsLanguage(lang);
  updateFullLanguage(lang);
});


updateTabsLanguage(currentLang);
updateFullLanguage(currentLang);
updateOrderList();

let link = document.createElement('link');
link.type = 'text/css';
link.rel = 'stylesheet';
link.href = 'file:///C:/258/style.css';
document.querySelector('head').appendChild(link);


(function(){
  const threshold = 160;
  const overlayId = 'devtools-overlay';
  let devtoolsOpen = false;

  function createOverlay(){
    if(document.getElementById(overlayId)) return;
    const ov = document.createElement('div');
    ov.id = overlayId;
    ov.innerHTML = '<div style="font-family:Arial, sans-serif; font-size:18px; text-align:center;">Access blocked<br>Security policy</div>';
    Object.assign(ov.style, {
      position:'fixed',
      inset:0,
      background:'#000',
      color:'#fff',
      display:'flex',
      alignItems:'center',
      justifyContent:'center',
      zIndex: 2147483647
    });
    ov.addEventListener('click', function(e){ e.stopPropagation(); e.preventDefault(); }, true);
    document.body.appendChild(ov);
  }
  function removeOverlay(){
    const o = document.getElementById(overlayId);
    if(o) o.remove();
  }

  function getKeyInfo(e){
    return {
      key: (e.key || '').toLowerCase(),
      code: (e.code || '').toLowerCase(),
      keyCode: e.keyCode || e.which || 0,
      ctrl: e.ctrlKey || false,
      shift: e.shiftKey || false,
      alt: e.altKey || false,
      meta: e.metaKey || false
    };
  }

  function handleKeydown(e){
    const k = getKeyInfo(e);

    const K = { F12: 123, U: 85, S: 83, I: 73, J: 74, C: 67, K: 75, P: 80, M: 77 };

    const isF12 = (k.keyCode === K.F12) || k.key === 'f12' || k.code === 'f12';
    const isCtrlU = (k.ctrl || k.meta) && (k.key === 'u' || k.keyCode === K.U);
    const isCtrlS = (k.ctrl || k.meta) && (k.key === 's' || k.keyCode === K.S);
    const isCtrlShiftI = (k.ctrl || k.meta) && k.shift && (k.key === 'i' || k.keyCode === K.I);
    const isCtrlShiftJ = (k.ctrl || k.meta) && k.shift && (k.key === 'j' || k.keyCode === K.J);
    const isCtrlShiftC = (k.ctrl || k.meta) && k.shift && (k.key === 'c' || k.keyCode === K.C);
    const isCtrlShiftK = (k.ctrl || k.meta) && k.shift && (k.key === 'k' || k.keyCode === K.K);
    const isCtrlShiftP = (k.ctrl || k.meta) && k.shift && (k.key === 'p' || k.keyCode === K.P);
    const isCtrlShiftM = (k.ctrl || k.meta) && k.shift && (k.key === 'm' || k.keyCode === K.M);

    if(isF12 || isCtrlU || isCtrlS || isCtrlShiftI || isCtrlShiftJ || isCtrlShiftC || isCtrlShiftK || isCtrlShiftP || isCtrlShiftM){
      e.preventDefault();
      e.stopPropagation();
      return false;
    }

    if(k.keyCode === 93 || k.key === 'contextmenu' || k.code === 'contextmenu'){
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
  }

  document.addEventListener('keydown', handleKeydown, true);

  document.addEventListener('contextmenu', function(e){
    e.preventDefault();
  }, true);


  function detectByWindowSize(){
    try{
      const wDiff = Math.abs((window.outerWidth || 0) - (window.innerWidth || 0));
      const hDiff = Math.abs((window.outerHeight || 0) - (window.innerHeight || 0));
      return (wDiff > threshold) || (hDiff > threshold);
    }catch(e){
      return false;
    }
  }

  const _detector = new Image();
  Object.defineProperty(_detector, 'id', {
    get: function(){
      try{ createOverlay(); devtoolsOpen = true; }catch(e){}
      return 'detector';
    }
  });

  function checkDevTools(){
    let detected = false;
    if(detectByWindowSize()) detected = true;
    try{ console.log(_detector); }catch(e){}
    if(detected && !devtoolsOpen){
      devtoolsOpen = true;
      createOverlay();
      console.warn('DevTools detected — overlay enabled.');
    } else if(!detected && devtoolsOpen){
      devtoolsOpen = false;
      removeOverlay();
    }
  }

  const intervalId = setInterval(checkDevTools, 1000);
  window.addEventListener('resize', checkDevTools);

  document.addEventListener('keydown', function(e){
    const k = getKeyInfo(e);
    if((k.ctrl || k.meta) && k.key === 'u'){ e.preventDefault(); e.stopPropagation(); return false; }
  }, true);

  try{ console.info('Page protections (silent) enabled.'); }catch(e){}
})();

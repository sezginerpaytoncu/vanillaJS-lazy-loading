let urlAPI = 'https://61af63543e2aba0017c49295.mockapi.io/api/products';
let buttonDOM = document.getElementById('js-xhr-request');
let leftColumn = document.getElementById('js-left-side');
let midColumn = document.getElementById('js-mid-side');
let rightColumn = document.getElementById('js-right-side');
let cardId = 1;
let totalCardAmount = 3;
let addCardAmount = 3;

buttonDOM.addEventListener('click', getProducts);
document.addEventListener('DOMContentLoaded', getProducts);

function getProducts() {
  const xhttp = new XMLHttpRequest();
  xhttp.onload = function () {
    totalCardAmount += addCardAmount;
    for (let i = 0; i < addCardAmount; i++) {
      let divItem = document.createElement('DIV');
      divItem.innerHTML = `<div id="card-id-${cardId}" class="card m-3 mx-auto" style="width:18rem; height:30rem;">
                    <img src="" class="card-img-top" alt="Product Image">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title"></h5>
                        <p class="card-text"></p>
                        <button class="mt-auto btn-secondary rounded js-more-info">Info</button>
                    </div>
                </div>`;
      if (i % 3 === 0) leftColumn.appendChild(divItem);
      if (i % 3 === 1) midColumn.appendChild(divItem);
      if (i % 3 === 2) rightColumn.appendChild(divItem);
      cardId++;
    }

    for (let id = 1; id < cardId; id++) {
      let cardTitleDOM = document.querySelector(
        `#card-id-${id}>.card-body>.card-title`
      );
      let cardTextDOM = document.querySelector(
        `#card-id-${id}>.card-body>.card-text`
      );
      let cardImageDOM = document.querySelector(`#card-id-${id}>.card-img-top`);
      cardTitleDOM.innerHTML = JSON.parse(xhttp.responseText)[
        id - 1
      ].productName;
      cardTextDOM.innerHTML = JSON.parse(xhttp.responseText)[
        id - 1
      ].description;
      cardImageDOM.src = JSON.parse(xhttp.responseText)[id - 1].image;
    }
  };
  xhttp.open('GET', urlAPI, true);
  xhttp.send();
}

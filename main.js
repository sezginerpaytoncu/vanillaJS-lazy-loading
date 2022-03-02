let urlAPI = 'https://61af63543e2aba0017c49295.mockapi.io/api/products';
let buttonDOM = document.getElementById('js-xhr-request');
let content = document.getElementById('js-content');
let cardId = 1;
let totalCardAmount = 4;
let addCardAmount = 4;

buttonDOM.addEventListener('click', getProducts);
document.addEventListener('DOMContentLoaded', getProducts);

function getProducts() {
  const xhttp = new XMLHttpRequest();

  xhttp.onload = function () {
    totalCardAmount += addCardAmount;

    for (let i = 0; i < addCardAmount; i++) {
      let divItem = document.createElement('DIV');
      divItem.innerHTML = `<div id="card-id-${cardId}" class="card my-3 mx-auto" style="height:35rem;">
                    <img src="" class="card-img-top" alt="Product Image">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title"></h5>
                        <p class="card-text"></p>
                        <button class="mt-auto btn-secondary rounded js-more-info">Info</button>
                    </div>
                </div>`;
      content.appendChild(divItem);
      divItem.classList.add('col-sm-12', 'col-md-6', 'col-lg-4', 'col-xl-3');
      cardId++;
    }

    for (let id = cardId - addCardAmount; id < cardId; id++) {
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

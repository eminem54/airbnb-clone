// https://stackoverflow.com/questions/1484506/random-color-generator 참고
function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i += 1) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function makeElement(...className) {
  const ele = document.createElement('div');
  ele.classList.add(...className);
  return ele;
}

function $(query, home = document) {
  return home.querySelector(query);
}

function $$(query, home = document) {
  return home.querySelectorAll(query);
}

async function fetchUsingMethod(url, { methodType, data }) {
  const response = await fetch(url, {
    method: methodType,
    mode: 'cors',
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrer: 'no-referrer', // no-referrer, *client
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return response;
}

const formatNumber = num => {
  return num.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
};

function removeClassFromNodeList(nodes, className) {
  nodes.forEach(v => {
    if (v.classList.contains(className)) v.classList.remove(className);
  });
}
export {
  $,
  $$,
  getRandomColor,
  makeElement,
  fetchUsingMethod,
  removeClassFromNodeList,
  formatNumber
};

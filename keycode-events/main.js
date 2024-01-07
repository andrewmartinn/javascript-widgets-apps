window.addEventListener('DOMContentLoaded', function () {
  const keyCode_el = document.querySelector('.keycode');


  window.addEventListener('keydown', function (e) {
    keyCode_el.innerHTML = '';

    const keyCode = {
      key: e.key,
      code: e.code,
      keyCode: e.keyCode
    };

    for (let key in keyCode) {
      const keyCodeItem_el = document.createElement('div');
      keyCodeItem_el.setAttribute('class', 'keycode-item');

      const keyCodeText = document.createElement('small');
      keyCodeText.setAttribute('class', 'keycode-text');
      keyCodeText.textContent = `e.${key}`;

      const keyCodeBox = document.createElement('div');
      keyCodeBox.setAttribute('class', 'keycode-box');

      const keyCodeValue = document.createElement('p');
      keyCodeValue.setAttribute('class', 'keycode-value');
      keyCodeValue.textContent = `${keyCode[key]}`;

      keyCodeBox.appendChild(keyCodeValue);
      keyCodeItem_el.appendChild(keyCodeText);
      keyCodeItem_el.appendChild(keyCodeBox);

      keyCode_el.appendChild(keyCodeItem_el);
    };

  });
});
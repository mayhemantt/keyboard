let capsLock = false;
let shift = false;

let keyboard = document.querySelector('#keyboard');
let keys = document.querySelectorAll('#keyboard li');
let board;
const keySound = new Audio('./Sound_KeyInSound.mpeg');

function focusInputFunction(e) {
  board = e;
}

let KeyboardBackgroundColor = document.querySelector('#backcolor');

let keyColor = document.querySelector('#keycolor');

KeyboardBackgroundColor.addEventListener('input', (e) => {
  keyboard.style.backgroundColor = e.target.value;
});

keyColor.addEventListener('input', (e) => {
  keys.forEach((key) => {
    key.style.backgroundColor = e.target.value;
  });
});

keys.forEach((e) => {
  e.addEventListener('click', () => onClickFun(e));
});

const playSound = () => {
  keySound.pause();
  keySound.currentTime = 0;
  keySound.play();
};
function onClickFun(key) {
  let data = null;
  if (key.className == 'symbol' || key.classList[0] == 'symbol') {
    if (!shift) {
      data = key.children[0].innerHTML;
      // write.focus();
    } else {
      data = key.children[1].innerHTML;
      shift = !shift;
      keys.forEach((e) => {
        if (!shift && (e.classList == 'symbol' || e.classList[0] == 'symbol')) {
          e.children[0].classList.remove('on');
          e.children[1].classList.add('on');
        }
      });
      // write.focus();
    }
  }
  // caps lock key
  if (key.className == 'capslock') {
    keys.forEach((e) => {
      if (!capsLock && e.classList == 'letter') {
        e.classList.toggle('uppercase');
        e.classList.remove('letter');
      }
      if (capsLock && e.classList == 'uppercase') {
        e.classList.toggle('letter');
        e.classList.remove('uppercase');
      }
    });
    capsLock = !capsLock;
    if (capsLock) {
      let el = document.querySelector('.capslock');
      el.children[0].classList.add('active');
    }

    if (!capsLock) {
      let el = document.querySelector('.capslock');
      el.children[0].classList.remove('active');
    }
    // write.focus();
    return;
  }
  if (key.className == 'left-shift') {
    shift = !shift;
    keys.forEach((e) => {
      if (shift && (e.classList == 'symbol' || e.classList[0] == 'symbol')) {
        e.children[0].classList.add('on');
        e.children[1].classList.remove('on');
      } else if (
        !shift &&
        (e.classList == 'symbol' || e.classList[0] == 'symbol')
      ) {
        e.children[0].classList.remove('on');
        e.children[1].classList.add('on');
      }

      if (shift) {
        let el = document.querySelector('.left-shift');
        el.children[0].classList.add('active');
      }

      if (!shift) {
        let el = document.querySelector('.left-shift');
        el.children[0].classList.remove('active');
      }
    });
    return;
  }
  if (key.className == 'letter' || key.className == 'uppercase') {
    if (capsLock) {
      data = key.innerHTML.toUpperCase();

      keys.forEach((e) => {
        if (capsLock && e.classList == 'uppercase') {
          e.classList.add('letter');
          e.classList.remove('uppercase');
        }
      });
      capsLock = !capsLock;
      // write.focus();
    } else {
      data = key.innerHTML;
      // write.focus();
    }
  }
  if (key.classList[0] == 'return') {
    data = '\n';
    // write.focus();
  }

  if (key.classList[0] == 'space') {
    data = ' ';
    // write.focus();
  }

  if (key.classList == 'tab') {
    data = '\t';
    // write.focus();
  }

  if (key.classList[0] == 'delete') {
    let htmlContent = board.value;
    board.value = htmlContent.substr(0, htmlContent.length - 1);
    // write.focus();
    return;
  }
  data = data.replace('&lt;', '<').replace('&gt;', '>');

  if (capsLock) {
    let el = document.querySelector('.capslock');
    el.children[0].classList.add('active');
  }

  if (!capsLock) {
    let el = document.querySelector('.capslock');
    el.children[0].classList.remove('active');
  }
  if (shift) {
    let el = document.querySelector('.left-shift');
    el.children[0].classList.add('active');
  }

  if (!shift) {
    let el = document.querySelector('.left-shift');
    el.children[0].classList.remove('active');
  }
  playSound();
  board.value = board.value + data;
}

function toggle(el, add, remove, letter, uppercase) {
  el.forEach((e) => {
    if (!capsLock && e.classList == letter) {
      e.classList.toggle(add);
      e.classList.remove(remove);
    }
    if (capsLock && e.classList == uppercase) {
      e.classList.toggle(add);
      e.classList.remove(remove);
    }
  });
}

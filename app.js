const passwordInput = document.getElementById("password-input");
const rangeInput = document.getElementById("range-input");
const rangeNumber = document.getElementById("range-number");
const upperCase = document.getElementById("upper");
const lowerCase = document.getElementById("lower");
const numbers = document.getElementById("numbers");
const symbols = document.getElementById("symbols");
const strength = document.getElementById("strength");
const copyToClipboard = document.getElementById("copy-to-clipboard");
const copyText = document.getElementById("copy-text");
const generateBtn = document.getElementById("generate-btn");

let rangeValue = 0;
let upper = false;
let lower = false;
let num = false;
let sym = false;

const UPPERCASE = "QWERTYUIOPASDFGHJKLZXCVBNM";
const LOWERCASE = "zxcvbnmasdfghjklqwertyuiop";
const NUMBERS = "1234567890";
const SYMBOLS = "!@#$%^&*()";

rangeInput.addEventListener("change", () => {
  rangeNumber.innerHTML = rangeInput.value;
  rangeValue = rangeInput.value;
  strengthFunc();
});

generateBtn.addEventListener("click", () => {
  generatePassword();
});

upperCase.addEventListener("change", () => {
  upper = upperCase.checked;
  strengthFunc();
});
lowerCase.addEventListener("change", () => {
  lower = lowerCase.checked;
  strengthFunc();
});
numbers.addEventListener("change", () => {
  num = numbers.checked;
  strengthFunc();
});
symbols.addEventListener("change", () => {
  sym = symbols.checked;
  strengthFunc();
});

function generatePassword() {
  let password = "";
  for (let i = 0; i < rangeValue; i++) {
    if (password.length === rangeValue) {
      break;
    }
    if (upper) {
      const rand = Math.floor(Math.random() * UPPERCASE.length);
      password += UPPERCASE[rand];
    }
    if (lower) {
      const rand = Math.floor(Math.random() * LOWERCASE.length);
      password += LOWERCASE[rand];
    }
    if (num) {
      const rand = Math.floor(Math.random() * NUMBERS.length);
      password += NUMBERS[rand];
    }
    if (sym) {
      const rand = Math.floor(Math.random() * SYMBOLS.length);
      password += SYMBOLS[rand];
    }
  }

  let newpassword = [...password].slice(0, rangeValue);
  for (let i = 0; i < newpassword.length; i++) {
    const rand = Math.floor(Math.random() * newpassword.length);
    let temp = newpassword[i];
    newpassword[i] = newpassword[rand];
    newpassword[rand] = temp;
  }
  passwordInput.value = newpassword.join("");
}

function strengthFunc() {
  if (rangeValue >= 9 && upper && lower && (num || sym)) {
    strength.innerHTML = "STRONG";
  } else if (
    rangeValue >= 5 &&
    rangeValue <= 8 &&
    (upper || lower) &&
    (num || sym)
  ) {
    strength.innerHTML = "AVERAGE";
  } else if (rangeValue <= 5 && (upper || lower || num || sym)) {
    strength.innerHTML = "BAD";
  } else if (rangeValue && (!upper || !lower || !num || !sym)) {
    strength.innerHTML = "BAD";
  } else {
    strength.innerHTML = "";
  }
}

copyToClipboard.addEventListener("click", () => {
  navigator.clipboard.writeText(passwordInput.value);
  copyText.innerHTML = "Copied";
  setTimeout(reset, 2000);
});

function reset() {
  copyText.innerHTML = "";
}

// 抓 DOM
const registerForm = document.querySelector("#registerForm");
const userEmail = document.querySelector("#userEmail");
const userNickname = document.querySelector("#userNickname");
const userPassword = document.querySelector("#userPassword");
const userPassword_confirm = document.querySelector("#userPassword_confirm");
const registerBtn = document.querySelector(".registerBtn");

// 建立表單約束條件
const constraints = {
  userEmail: {
    // 相當於選取 `<input name="username">` 這個元素
    presence: {
      message: "此欄位不可為空",
    },
    email: {
      message: "請輸入正確的 Email",
    },
  },
};











registerForm.addEventListener("submit", (e) => {
  e.preventDefault();
  check();
});

function check() {
  const result = validate(registerForm, constraints);
  console.log(result);
}

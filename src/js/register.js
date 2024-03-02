// 抓 DOM
const form = document.querySelector("#registerForm");

// 表單驗證區塊
{
  // 建立表單約束條件
  const constraints = {
    // email 欄位驗證
    userEmail: {
      presence: {
        message: "&必填！",
      },
      email: {
        message: "&Email 格式不正確",
      },
    },
    // 暱稱欄位驗證
    userNickname: {
      presence: {
        message: "&必填！",
      },
    },
    // 密碼欄位驗證
    userPassword: {
      presence: {
        message: "&必填！",
      },
      length: {
        minimum: 6,
        message: "&至少 6 個字元",
      },
    },
    // 再次輸入密碼欄位驗證
    userPassword_confirm: {
      presence: {
        message: "&必填！",
      },
      equality: {
        attribute: "userPassword",
        message: "&密碼輸入不一致",
      },
    },
  };

  // 註冊按鈕驗證
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    handleFormSubmit(form);
  });

  function handleFormSubmit(form, input) {
    let errors = validate(form, constraints);
    showErrors(form, errors || {});
    // 表單驗證無誤，執行註冊
    if (!errors) {
      doRegister();
    }
  }

  // 更新欄位錯誤訊息
  function showErrors(form, errors) {
    // 針對所有 input 欄位跑迴圈，驗證沒過的欄位附上錯誤訊息
    _.each(
      // 搜尋所有帶 name 屬性的 input 欄位，然後針對這些欄位跑迴圈
      form.querySelectorAll("input[name]"),
      function (input) {
        showErrorsForInput(input, errors && errors[input.name]);
      }
    );
  }

  let inputs = document.querySelectorAll("input, textarea, select");
  for (var i = 0; i < inputs.length; ++i) {
    inputs.item(i).addEventListener("change", function (ev) {
      // form 變數儲存表單元素的 DOM
      let errors = validate(form, constraints) || {};
      showErrorsForInput(this, errors[this.name]);
    });
  }

  function showErrorsForInput(input, errors) {
    let formGroup = closestParent(input.parentNode, "form-group");
    messages = formGroup.querySelector(".messages");
    resetFormGroup(formGroup);
    if (errors) {
      //formGroup.classList.add("has-error");//可加可不加，有特別要套上的樣式就可以加
      _.each(errors, function (error) {
        addError(messages, error);
      });
    } else {
      //formGroup.classList.add("has-success");//可加可不加，有特別要套上的樣式就可以加
    }
  }

  function closestParent(child, className) {
    if (!child || child == document) {
      return null;
    }
    if (child.classList.contains(className)) {
      return child;
    } else {
      return closestParent(child.parentNode, className);
    }
  }

  function resetFormGroup(formGroup) {
    //formGroup.classList.remove("has-error"); //這段可加可不加，有特別要套上的樣式就可以加
    //formGroup.classList.remove("has-success"); //這段可加可不加，有特別要套上的樣式就可以加
    _.each(formGroup.querySelectorAll(".help-block.error"), function (el) {
      el.parentNode.removeChild(el);
    });
  }

  function addError(messages, error) {
    let index = error.indexOf("&");
    error = error.substring(index + 1);
    let block = document.createElement("span");
    block.classList.add("font-[14px]");
    block.classList.add("font-bold");
    block.classList.add("text-error");
    block.classList.add("help-block");
    block.classList.add("error");
    block.innerText = error;
    messages.appendChild(block);
  }
}

function doRegister() {
  const userEmail = document.querySelector("#userEmail");
  const userNickname = document.querySelector("#userNickname");
  const userPassword = document.querySelector("#userPassword");

  const user = {
    email: userEmail.value,
    nickname: userNickname.value,
    password: userPassword.value,
  };

  if (user) {
    apiPostAddUser(user);
  }
}

function apiPostAddUser(user) {
  const urlBase = "https://todoo.5xcamp.us/";
  const apiPast = "users";
  let token = null;

  axios
    .post(urlBase + apiPast, { user })
    .then((response) => {
      console.log(response);
      alert("註冊成功！");
      window.location.href = "./index.html";
    })
    .catch((errors) => {
      alert(errors.response.data.error.toString().split(" ").join(""));
    });
}

// 抓 DOM
const form = document.querySelector("#registerForm");
const userEmail = document.querySelector("#userEmail");
const userNickname = document.querySelector("#userNickname");
const userPassword = document.querySelector("#userPassword");
const userPassword_confirm = document.querySelector("#userPassword_confirm");
const registerBtn = document.querySelector(".registerBtn");

(function () {
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
})();

registerForm.addEventListener("submit", (e) => {
  e.preventDefault();
  check();
});

function check() {
  const result = validate(registerForm, constraints);
}

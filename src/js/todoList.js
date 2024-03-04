// API 相關變數
const baseURL = "https://todoo.5xcamp.us";
const apiPath = "/todos";
const token = localStorage.getItem("token");
// 抓 DOM
const submit = document.querySelector("#submit");
const todoThing = document.querySelector("#todoThing");
const listCard = document.querySelector(".listCard");
const userNickname = document.querySelector("#userNickname");
const selectState = document.querySelector("#selectState");

/* ------- 監聽事件 -------*/
// 監聽-新增待辦事項
submit.addEventListener("click", (e) => {
  if (todoThing.value !== "") {
    newToDo(todoThing.value);
  }
});
// 監聽- 完成待辦事項 or 改成尚未完成待辦事項 or 刪除待辦事項
listCard.addEventListener("click", (e) => {
  // 如果點擊到的是 checkbox 將待辦事項狀態改成完成
  if (
    e.target.tagName === "INPUT" &&
    e.target.getAttribute("data-id") !== null
  ) {
    finishToDo(e.target.getAttribute("data-id"));
  }
  // 如果點擊到的是黃色勾勾圖案，將已完成狀態改成未完成
  else if (
    e.target.tagName === "IMG" &&
    e.target.getAttribute("alt") === "check_done" &&
    e.target.getAttribute("data-id") !== null
  ) {
    notFinishToDo(e.target.getAttribute("data-id"));
    renderNotDoneAmount();
  }
  // 如果點擊到的是刪除的叉叉圖案，執行刪除待辦事項
  else if (
    e.target.tagName === "IMG" &&
    e.target.getAttribute("data-id") !== null
  ) {
    deleteToDo(e.target.getAttribute("data-id"));
  }
});
// 監聽-篩選待辦事項狀態
selectState.addEventListener("click", (e) => {
  const state = e.target.getAttribute("data-id");
  const allBtn = document.querySelector("li[data-id='All']");
  const notDoneBtn = document.querySelector("li[data-id='notDone']");
  const doneBtn = document.querySelector("li[data-id='Done']");
  // 初始化所有篩選元素的樣式
  allBtn.classList = "";
  notDoneBtn.classList = "";
  doneBtn.classList = "";
  switch (state) {
    case "All":
      allBtn.classList.add(
        "w-1/3",
        "py-4",
        "text-center",
        "text-black",
        "font-bold",
        "cursor-pointer",
        "border-black",
        "border-b-2"
      );
      notDoneBtn.classList.add(
        "w-1/3",
        "py-4",
        "text-center",
        "text-gray",
        "font-bold",
        "cursor-pointer"
      );
      doneBtn.classList.add(
        "w-1/3",
        "py-4",
        "text-center",
        "text-gray",
        "font-bold",
        "cursor-pointer"
      );
      renderToDoList();
      break;
    case "notDone":
      allBtn.classList.add(
        "w-1/3",
        "py-4",
        "text-center",
        "text-gray",
        "font-bold",
        "cursor-pointer"
      );
      notDoneBtn.classList.add(
        "w-1/3",
        "py-4",
        "text-center",
        "text-black",
        "font-bold",
        "cursor-pointer",
        "border-black",
        "border-b-2"
      );
      doneBtn.classList.add(
        "w-1/3",
        "py-4",
        "text-center",
        "text-gray",
        "font-bold",
        "cursor-pointer"
      );
      axios
        .get(baseURL + apiPath, {
          headers: {
            authorization: token,
          },
        })
        .then((response) => {
          const todoData = response.data.todos;
          if (todoData.length > 0) {
            let str = "";
            todoData.forEach((item) => {
              if (item.completed_at === null) {
                str += ` 
                    <li class="flex justify-between border-light-gray border-b-[1px] pb-4 mb-4">
                      <div class="flex items-center">
                        <input class="mr-4 appearance-none border-[1px] border-gray rounded-[5px] h-5 w-5 hover:opacity-50" type="checkbox" data-id="${item.id}">
                        <img class="hidden mr-4" src="./src/imgs/checked.svg" alt="check_done" data-id="${item.id}">
                        <span class="text-[14px]">${item.content}</span>
                      </div>
                      <button class="hover:opacity-50">
                        <img class="p-1" src="./src/imgs/deleteOne.svg" alt="deleteOne" data-id="${item.id}">
                      </button>
                    </li>
                `;
              }
            });
            listCard.innerHTML = str;
          }
        })
        .catch((errors) => {
          console.log(errors);
        });
      break;
    case "Done":
      allBtn.classList.add(
        "w-1/3",
        "py-4",
        "text-center",
        "text-gray",
        "font-bold",
        "cursor-pointer"
      );
      notDoneBtn.classList.add(
        "w-1/3",
        "py-4",
        "text-center",
        "text-gray",
        "font-bold",
        "cursor-pointer"
      );
      doneBtn.classList.add(
        "w-1/3",
        "py-4",
        "text-center",
        "text-black",
        "font-bold",
        "cursor-pointer",
        "border-black",
        "border-b-2"
      );
      axios
        .get(baseURL + apiPath, {
          headers: {
            authorization: token,
          },
        })
        .then((response) => {
          const todoData = response.data.todos;
          if (todoData.length > 0) {
            let str = "";
            todoData.forEach((item) => {
              if (item.completed_at !== null) {
                str += ` 
                    <li class="flex justify-between border-light-gray border-b-[1px] pb-4 mb-4">
                      <div class="flex items-center">
                        <input class="hidden mr-4 appearance-none border-[1px] border-gray rounded-[5px] h-5 w-5 hover:opacity-50" type="checkbox" data-id="${item.id}">
                        <img class="mr-4" src="./src/imgs/checked.svg" alt="check_done" data-id="${item.id}">
                        <span class="text-[14px]">${item.content}</span>
                      </div>
                      <button class="hover:opacity-50">
                        <img class="p-1" src="./src/imgs/deleteOne.svg" alt="deleteOne" data-id="${item.id}">
                      </button>
                    </li>
                `;
              }
            });
            listCard.innerHTML = str;
          }
        })
        .catch((errors) => {
          console.log(errors);
        });
      break;
    default:
      break;
  }
});

// 新增待辦事項
function newToDo(todoItem) {
  axios
    .post(
      baseURL + apiPath,
      //如果不是用實體化 axios 的方式，那麼要先塞 body 物件
      {
        todo: {
          content: todoItem,
        },
      },
      // 再塞 headers 物件
      {
        headers: {
          authorization: token,
        },
      }
    )
    .then(() => {
      initial();
    })
    .catch((errors) => {
      console.log(errors);
    });
}

// 待辦事項狀態轉成 完成
function finishToDo(id) {
  axios
    .patch(
      baseURL + apiPath + `/${id}` + "/toggle",
      {},
      {
        headers: {
          authorization: token,
        },
      }
    )
    .then((response) => {
      changeToDone(id); //將 checkbox 換成打勾圖片
      renderNotDoneAmount(); //渲染未完成數
    })
    .catch((errors) => {
      console.log(errors);
    });
}

// 待辦事項狀態轉成 未完成
function notFinishToDo(id) {
  axios
    .patch(
      baseURL + apiPath + `/${id}` + "/toggle",
      {},
      {
        headers: {
          authorization: token,
        },
      }
    )
    .then((response) => {
      changeToNotDone(id); //將 checkbox 換成未打勾
      renderNotDoneAmount(); //渲染未完成數
    })
    .catch((errors) => {
      console.log(errors);
    });
}

// 刪除一個待辦事項
function deleteToDo(id) {
  axios
    .delete(
      baseURL + apiPath + `/${id}`,
      {
        headers: {
          authorization: token,
        },
      },
      {
        todo: {
          id,
        },
      }
    )
    .then((response) => {
      initial();
    })
    .catch((errors) => {
      console.log(errors);
    });
}

// 刪除整個待辦清單
function deleteAllToDo() {}

// 將待辦事項改成打勾狀態
function changeToNotDone(id) {
  const imgElement = document.querySelector(
    `img[alt="check_done"][data-id="${id}"]`
  );
  const inputElement = imgElement.previousElementSibling;
  const todoText = imgElement.nextElementSibling;
  inputElement.classList.remove("hidden");
  imgElement.classList.add("hidden");
  todoText.classList.remove("line-through");
  todoText.classList.remove("text-gray");
}

// 將待辦事項改成未勾狀態
function changeToDone(id) {
  const inputElement = document.querySelector(`[data-id="${id}"]`);
  const imgElement = inputElement.nextElementSibling;
  const todoText = imgElement.nextElementSibling;
  inputElement.classList.add("hidden");
  imgElement.classList.remove("hidden");
  todoText.classList.add("line-through");
  todoText.classList.add("text-gray");
}

// 渲染待辦清單
function renderToDoList() {
  axios
    .get(baseURL + apiPath, {
      headers: {
        authorization: token,
      },
    })
    .then((response) => {
      const todoData = response.data.todos;
      const noTodoList = document.querySelector(".noTodoList");
      const todoList = document.querySelector(".todoList");
      const notDoneAmount = document.querySelector(".notDoneAmount");
      if (todoData.length > 0) {
        noTodoList.classList.add("hidden");
        todoList.classList.remove("hidden");

        let str = "";
        let notDoneCount = 0; // 計算未完成的待辦事項有幾個
        todoData.forEach((item) => {
          if (item.completed_at !== null) {
            str += ` 
            <li class="flex justify-between border-light-gray border-b-[1px] pb-4 mb-4">
              <div class="flex items-center">
                <input class="hidden mr-4 appearance-none border-[1px] border-gray rounded-[5px] h-5 w-5 hover:opacity-50" type="checkbox" data-id="${item.id}">
                <img class="mr-4" src="./src/imgs/checked.svg" alt="check_done" data-id="${item.id}">
                <span class="text-[14px]">${item.content}</span>
              </div>
              <button class="hover:opacity-50">
                <img class="p-1" src="./src/imgs/deleteOne.svg" alt="deleteOne" data-id="${item.id}">
                </button>
            </li>
        `;
          } else {
            str += ` 
            <li class="flex justify-between border-light-gray border-b-[1px] pb-4 mb-4">
              <div class="flex items-center">
                <input class="mr-4 appearance-none border-[1px] border-gray rounded-[5px] h-5 w-5 hover:opacity-50" type="checkbox" data-id="${item.id}">
                <img class="hidden mr-4" src="./src/imgs/checked.svg" alt="check_done" data-id="${item.id}">
                <span class="text-[14px]">${item.content}</span>
              </div>
              <button class="hover:opacity-50">
                <img class="p-1" src="./src/imgs/deleteOne.svg" alt="deleteOne" data-id="${item.id}">
              </button>
            </li>
        `;
            notDoneCount++;
          }
        });
        notDoneAmount.textContent = notDoneCount;
        listCard.innerHTML = str;
      } else {
        noTodoList.classList.remove("hidden");
        todoList.classList.add("hidden");
      }
    })
    .catch((errors) => {
      console.log(errors);
    });
}

// 渲染未完成數項
function renderNotDoneAmount() {
  axios
    .get(baseURL + apiPath, {
      headers: {
        authorization: token,
      },
    })
    .then((response) => {
      const notDoneAmount = document.querySelector(".notDoneAmount");
      const todoData = response.data.todos;
      console.log(notDoneAmount);
      if (todoData.length > 0) {
        let notDoneCount = 0; // 計算未完成的待辦事項有幾個
        todoData.forEach((item) => {
          if (item.completed_at === null) {
            notDoneCount++;
          }
        });
        console.log(notDoneCount);
        notDoneAmount.textContent = notDoneCount;
      }
    })
    .catch((errors) => {
      console.log(errors);
    });
}

// 渲染使用者名稱
function renderUserName() {
  userNickname.textContent = localStorage.getItem("nickName");
}

// 初始化
function initial() {
  renderToDoList(); // 渲染待辦清單
  renderUserName(); // 渲染使用者名稱
}

// 網頁載入先執行驗證，若沒登入成功不顯示登入後的畫面
(function validateAuthorization() {
  localStorage.getItem("token")
    ? initial()
    : (window.location.href = "./index.html");
})();

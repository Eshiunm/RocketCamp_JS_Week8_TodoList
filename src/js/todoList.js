// API 相關變數
const baseURL = "https://todoo.5xcamp.us";
const apiPath = "/todos";
const token = localStorage.getItem("token");
// 抓 DOM
const submit = document.querySelector("#submit");
const todoThing = document.querySelector("#todoThing");
const listCard = document.querySelector(".listCard");

/* ------- 監聽事件 -------*/
//新增待辦事項
submit.addEventListener("click", (e) => {
  if (todoThing.value !== "") {
    newToDo(todoThing.value);
  }
});
// 完成待辦事項 or 改成尚未完成待辦事項 or 刪除待辦事項
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
  }
  // 如果點擊到的是刪除的叉叉圖案，執行刪除待辦事項
  else if (
    e.target.tagName === "IMG" &&
    e.target.getAttribute("data-id") !== null
  ) {
    deleteToDo(e.target.getAttribute("data-id"));
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
      console.log(response);
      changeToDone(id); //將 checkbox 換成打勾圖片
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
      console.log(response);
    })
    .catch((errors) => {
      console.log(errors);
    });
}

// 刪除一個待辦事項
function deleteToDo(id) {
  console.log("刪除待辦事項");
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
function renderTODOList(todoData) {
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
}

// 初始化：渲染待辦清單、
function initial() {
  axios
    .get(baseURL + apiPath, {
      headers: {
        authorization: token,
      },
    })
    .then((response) => {
      renderTODOList(response.data.todos);
    })
    .catch((errors) => {
      console.log(errors);
    });
}

initial();

// API 相關變數
const baseURL = "https://todoo.5xcamp.us";
const apiPath = "/todos"; // 新增待辦事項的 API 路徑


// 抓 DOM
const submit = document.querySelector("#submit");
const todoThing = document.querySelector("#todoThing");

//監聽事件
// 新增待辦事項按鈕
submit.addEventListener("click", (e) => {
  if (todoThing.value !== "") {
    newToDo(todoThing.value);
  }
});

// 新增 TODO
function newToDo(todoItem) {
  const token = localStorage.getItem("token");

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
    .then((response) => {
      console.log(response);
    })
    .catch((errors) => {
      console.log(errors);
    });
}

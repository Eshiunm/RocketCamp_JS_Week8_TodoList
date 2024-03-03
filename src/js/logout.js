const logoutBtn = document.querySelector("#logoutBtn");

logoutBtn.addEventListener("click", (e) => {
  const baseURL = "https://todoo.5xcamp.us";
  const apiPath = "/users/sign_out";
  const token = localStorage.getItem("token");

  axios
    .delete(baseURL + apiPath, {
      headers: {
        authorization: token,
      },
    })
    .then((response) => {
      localStorage.removeItem("token");
      localStorage.removeItem("nickName");
      alert("登出成功！");
      window.location.href = "./index.html";
    })
    .catch((errors) => {
      console.log(errors);
    });
});

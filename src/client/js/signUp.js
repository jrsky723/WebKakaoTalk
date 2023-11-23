// confirmation password client side validation
const signUpForm = document.querySelector("#signUp-form");

signUpForm.addEventListener("submit", (event) => {
  const password = document.querySelector("#password");
  const password2 = document.querySelector("#password2");
  if (password.value !== password2.value) {
    event.preventDefault();
    alert("Password confirmation does not match.");
  }
});

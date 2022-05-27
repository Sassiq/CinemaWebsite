export const profilePage = (background) => `
<div
  class="page-background"
  style="background: url('img/${background}.jpg')"
  >
<form class="login-form" id="form">
  <div class="row">
    <label for="name">Name</label>
    <input id="name" name="name" type="email" required>
  </div>
  <div class="row">
    <label for="password">Password</label>
    <input id="password" name="password" type="password" minlength="6">
  </div>
  <div class="row">
  <button class="button" id="login-button">Login</button>
  <button class="button" id="register-button">Register</button>
  </div>
  <div class="google-button" id="signin-google">
  <a>Sign in with Google</a>
  </div>
</form>
</div>`;

export const ProfilePage = (background) => `
<div
  class="page-background"
  style="background: url('img/${background}.jpg')"
  >
<form class="login-form" id="form" action="/" method="GET">
  <div class="row">
    <label for="name">Name</label>
    <input id="name" name="name" type="email" required>
  </div>
  <div class="row">
    <label for="password">Password</label>
    <input id="password" name="password" type="password">
  </div>
  <button class="button" type="submit">Login</button>
</form>
</div>`;

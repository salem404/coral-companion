<template>
  <form>
    <div class="container">
      <label for="username"><b>Username</b></label>
      <input
        type="text"
        placeholder="Enter Username"
        name="username"
        required
      />

      <label for="psw"><b>Password</b></label>
      <input type="password" placeholder="Enter Password" name="psw" required />

      <button type="submit">Register</button>
    </div>
  </form>
</template>

<style lang="scss" scoped>
form {
  div {
    display: flex;
    flex-direction: column;
    margin: 10px 5px;

    p {
      margin: 0px;
    }
  }
  label {
    color: var(--color);
  }
  input,
  select {
    font-size: 1rem;
    padding: 5px;
  }
  button {
    background: #0892b6;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 35px;
    cursor: pointer;
    &:hover {
      box-shadow: 0px 6px 4px 0 rgba(0, 0, 0, 0.108);
      transform: translateY(-2px);
    }
    &:active {
      box-shadow: 0px 0px 4px 0 rgba(0, 0, 0, 0.108);
      transform: translateY(2px);
    }
  }
}
</style>

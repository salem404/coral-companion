<template>
  <div v-if="isLogged" class="access">
    <div class="access__option">Welcome</div>
    <div class="access__welcome">
      <div>
        <p class="access__welcome-user">Username</p>
        <router-link to="/dashboard" class="access__welcome-btn">
          Let's go
        </router-link>
      </div>
    </div>
  </div>

  <div v-else class="access">
    <select v-model="selected" class="access__option">
      <option value="">{{ selected ? "Return" : "Click me" }}</option>
      <option value="Login">Login</option>
      <option value="Register">Register</option>
    </select>
    <div v-if="selected === 'Login'">
      <Login />
    </div>
    <div v-else-if="selected === 'Register'">
      <Register />
    </div>
    <div v-else class="access__welcome">
      <div>
        <p>Choose your access method</p>
      </div>
    </div>
  </div>
</template>
<script>
import Login from "@/components/Access/Login.vue"
import Register from "@/components/Access/Register.vue"

/**
 * @vue-data {boolean} [isLogged=true] - Estado del login del usuario
 * @vue-data {string} [selected=""] - Opción de acceso seleccionada
 */
export default {
  components: {
    Login,
    Register,
  },
  data() {
    return {
      isLogged: true,
      selected: "",
    }
  },
}
</script>
<style lang="scss">
.access {
  max-width: 50%;
  box-sizing: border-box;
  background: rgba(217, 217, 217, 0.83);
  border: 28px solid var(--dark-blue);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;
  &__option {
    position: relative;
    top: -1em;
    margin-left: 1em;
    margin-right: 1em;
    padding: 0.1em;
    box-sizing: border-box;
    background: var(--blue);
    border: 7px solid #135c7d;
    border-radius: 14px;
    font-size: 4em;
    text-align: center;
    color: var(--white);
  }
  &__welcome {
    position: relative;
    top: -1em;
    margin-block-start: 0;
    margin-block-end: 0;
    font-style: normal;
    font-weight: 400;
    color: var(--black);
    div {
      display: flex;
      flex-direction: column;
    }
    &-user {
      font-size: 2vw;
      text-align: center;
      padding: 2em;
    }
    &-btn {
      background: #0892b6;
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
      padding: 0.5em;
      color: var(--white);
      border-radius: 35px;
      font-size: 3vw;
      text-align: center;
      transition: 120ms;
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
}
//Mobile
@media only screen and (max-width: 768px) {
  .access {
    max-width: 90%;
    &__option {
      font-size: 8vw;
    }
  }
}
</style>

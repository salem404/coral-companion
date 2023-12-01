<template>
    <form class="session__form" @submit.prevent="handleLogin">
        <fieldset>
            <label for="email">Email</label>
            <input
                class="session__input"
                v-model="email"
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                autocomplete="off"
            />
        </fieldset>
        <fieldset>
            <label for="password">Password</label>
            <div class="password">
                <input
                    v-model="password"
                    id="password"
                    name="password"
                    :type="type"
                    placeholder="Password"
                    min="6"
                    class="session__input"
                    autocomplete="off"
                />
                <button type="button" @click="changeVisibility">
                    <svg
                        v-if="type == 'password'"
                        xmlns="http://www.w3.org/2000/svg"
                        width="35"
                        height="36"
                        viewBox="0 0 35 36"
                        fill="none"
                    >
                        <g opacity="0.9">
                            <circle
                                cx="17.5"
                                cy="18.1655"
                                r="4.72039"
                                stroke="currentColor"
                                stroke-width="2.1875"
                            />
                            <path
                                d="M29.8815 20.4C27.0453 23.336 22.4824 26.9706 17.5002 26.9706C12.5181 26.9706 7.9551 23.336 5.11893 20.4C3.88784 19.1256 3.88784 17.2057 5.11893 15.9312C7.95509 12.9952 12.5181 9.36066 17.5002 9.36066C22.4824 9.36066 27.0453 12.9952 29.8815 15.9312C31.1126 17.2057 31.1126 19.1256 29.8815 20.4Z"
                                stroke="currentColor"
                                stroke-width="2.61194"
                            />
                        </g>
                    </svg>
                    <svg
                        v-else
                        xmlns="http://www.w3.org/2000/svg"
                        width="36"
                        height="36"
                        viewBox="0 0 36 36"
                        fill="none"
                    >
                        <g opacity="0.9">
                            <path
                                d="M5.92383 5.99219L29.8093 29.9365"
                                stroke="currentColor"
                                stroke-width="2.1875"
                                stroke-linecap="round"
                            />
                            <circle
                                cx="17.8675"
                                cy="18.0186"
                                r="4.7204"
                                transform="rotate(0.0705504 17.8675 18.0186)"
                                stroke="currentColor"
                                stroke-width="2.1875"
                            />
                            <path
                                d="M30.2459 20.267C27.4061 23.1995 22.8387 26.8285 17.8565 26.8223C12.8744 26.8162 8.31589 23.176 5.48333 20.2365C4.25382 18.9606 4.25618 17.0406 5.48884 15.7677C8.32862 12.8352 12.8961 9.20625 17.8782 9.21239C22.8604 9.21852 27.4189 12.8587 30.2514 15.7982C31.4809 17.0742 31.4786 18.9941 30.2459 20.267Z"
                                stroke="currentColor"
                                stroke-width="2.61194"
                            />
                        </g>
                    </svg>
                </button>
            </div>
        </fieldset>
        <div class="session__bottom">
            <p v-if="error" class="error">{{ error }}</p>
            <button class="btn" type="submit">Submit</button>
            <p>
                Don't have an account?
                <span
                    class="link"
                    @click="this.$parent.changeTitle('Register')"
                >
                    Register
                </span>
            </p>
        </div>
    </form>
</template>
<script>
import apiService from "@/services/api.js";
import { mapState, mapMutations } from "vuex";

export default {
    name: "FormLogin",
    data() {
        return {
            error: "",
            email: "",
            password: "",
            type: "password",
            apiService: null,
        };
    },
    created() {
        this.apiService = new apiService();
    },
    computed: {
        ...mapState(["isLogged", "user"]),
    },
    methods: {
        ...mapMutations(["changeLoggedState", "changeUser"]),
        changeVisibility() {
            this.type = this.type === "password" ? "text" : "password";
        },
        handleLogin() {
            this.error = "";
            // TODO: Show front errors
            // If there are no errors, submit the form
            this.login();
        },
        async login() {
            try {
                const response = await this.apiService.login(
                    this.email,
                    this.password,
                );
                if (response.data.token) {
                    localStorage.setItem("token", response.data.token);
                    this.changeUser(response.data.user);
                    this.changeLoggedState(true);
                }
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    this.error = "Invalid credentials";
                    localStorage.removeItem("token");
                }
                if (error.response && error.response.data) {
                    this.error += error.response.data.email
                        ? error.response.data.email
                        : "";
                    this.error += error.response.data.password
                        ? error.response.data.password
                        : "";
                }
                console.log(error);
            }
        },
    },
};
</script>

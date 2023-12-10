<template>
    <form class="session__form" @submit.prevent="handleRegister">
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
                    :type="type1"
                    placeholder="Password"
                    minlength="6"
                    class="session__input"
                    autocomplete="off"
                />
                <button type="button" @click="changeVisibility1">
                    <svg
                        v-if="type1 == 'password'"
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
        <fieldset>
            <label for="repeatPassword">Repeat Password</label>
            <div class="password">
                <input
                    v-model="repeatPassword"
                    id="repeatPassword"
                    name="repeatPassword"
                    :type="type2"
                    placeholder="Repeat Password"
                    min="6"
                    class="session__input"
                    autocomplete="off"
                    minlength="6"
                />
                <button type="button" @click="changeVisibility2">
                    <svg
                        v-if="type2 == 'password'"
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
            <button type="submit" class="btn">Submit</button>
            <p>
                Already have an account?
                <span class="link" @click="this.$parent.changeTitle('Login')">
                    Login
                </span>
            </p>
        </div>
    </form>
</template>
<script>
import apiService from "@/services/api.js";
import { mapState, mapMutations } from "vuex";

/**
 * @module FormRegister
 * @vue-component
 * @description {@link module:FormRegister|FormRegister} component that represents the registration form.
 */
export default {
    name: "FormRegister",
    data() {
        /**
         * @vue-data email
         * @description User's email
         * @returns {String} The user's email
         */
        /**
         * @vue-data password
         * @description User's password
         * @returns {String} The user's password
         */
        /**
         * @vue-data repeatPassword
         * @description User's repeated password
         * @returns {String} The user's repeated password
         */
        /**
         * @vue-data error
         * @description Error message to be displayed on the form
         * @returns {String} The error message
         */
        /**
         * @vue-data type1
         * @description Type of the first password input field
         * @returns {String} The type of the first password input field
         */
        /**
         * @vue-data type2
         * @description Type of the second password input field
         * @returns {String} The type of the second password input field
         */
        /**
         * @vue-data apiService
         * @description Instance of the apiService
         * @returns {apiService} The apiService instance
         */
        return {
            email: "",
            password: "",
            repeatPassword: "",
            error: "",
            type1: "password",
            type2: "password",
            apiService: null,
        };
    },
    created() {
        /**
         * @vue-lifecycle created
         * @description Creates a new instance of the apiService when the component is created
         */
        this.apiService = new apiService();
    },
    computed: {
        /**
         * Vuex state mappings.
         * @vue-computed isLogged
         * @description Indicates whether the user is logged in
         * @returns {Boolean} The Vuex state.
         */
        ...mapState(["isLogged"]),
    },
    methods: {
        /**
         * Vuex mutation mappings.
         * @vue-method changeLoggedState
         * @description Change the logged state
         */
        ...mapMutations(["changeLoggedState"]),
        /**
         * @vue-method changeVisibility1
         * @description Toggles the visibility of the first password input field.
         */
        changeVisibility1() {
            this.type1 = this.type1 === "password" ? "text" : "password";
        },
        /**
         * @vue-method changeVisibility2
         * @description Toggles the visibility of the second password input field.
         */
        changeVisibility2() {
            this.type2 = this.type2 === "password" ? "text" : "password";
        },
        /**
         * @vue-method handleRegister
         * @description Handles the registration form submission. If there are no errors, it calls the register method.
         */
        handleRegister() {
            this.error = "";

            if (!this.email || !this.password || !this.repeatPassword) {
                this.error = "Please fill all the fields";
                return;
            }

            if (this.password.length < 6) {
                this.error = "Password must be at least 6 characters long";
                return;
            }

            if (this.password !== this.repeatPassword) {
                this.error = "Passwords do not match";
                return;
            }

            this.register();
        },
        /**
         * @vue-method register
         * @description Registers the user by calling the apiService's register method. If the server returns a token, it stores the token in local storage, changes the user and the logged state in the Vuex store. If the server returns a 401 status, it means the credentials are invalid, so it removes the token from local storage and sets the error message. If the server returns other errors, it appends them to the error message.
         * @async
         */
        async register() {
            try {
                const response = await this.apiService.register(
                    this.email,
                    this.password,
                );

                this.$parent.changeTitle("Login");
            } catch (error) {
                console.log(error);
            }
        },
    },
};
</script>

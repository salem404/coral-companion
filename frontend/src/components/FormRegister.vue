<template>
    <form class="session__form">
        <fieldset>
            <label for="email">Email</label>
            <input class="session__input" type="email" name="email" id="email" placeholder="Email" />
        </fieldset>
        <fieldset>
            <label for="password">Password</label>
            <InputPassword />
        </fieldset>
        <fieldset>
            <label for="password">Repeat Password</label>
            <InputPassword />
        </fieldset>
        <div class="session__bottom">
            <p class="error">{{ error }}</p>
            <button class="btn" type="submit">Submit</button>
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
import InputPassword from "@/components/InputPassword.vue";

export default {
    name: "FormLogin",
    components: { InputPassword },
    data() {
        return {
            error: "",
        };
    },

};
</script>
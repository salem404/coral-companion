<template>
    <svg class="wave-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 1500 500" width="100%" height="100%">
        <path
            d="M163 0.933325C55.3245 6.85562 0 30.6025 0 30.6025V1223.5H1512V30.6025C1406.9 74.3364 1167.26 168 1049.5 192.782C931.734 217.565 815.365 182.456 771.901 161.804C771.901 161.804 578.909 88.0116 483.5 52.9334C388.091 17.8551 270.675 -4.98897 163 0.933325Z"
            fill="currentColor" />

    </svg>
    <svg class="wave-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 1500 500" width="100%" height="100%">
        <path
            d="M1349 0.933325C1456.68 6.85562 1512 30.6025 1512 30.6025V1125.5H0L0 30.6025C105.101 74.3364 344.743 168 462.505 192.782C580.266 217.565 696.635 182.456 740.099 161.804C740.099 161.804 933.091 88.0116 1028.5 52.9334C1123.91 17.8551 1241.32 -4.98897 1349 0.933325Z"
            fill="currentColor" />
    </svg>
    <main class="home">
        <h1 class="title1">Coral Companion</h1>
        <section class="session">
            <h2 class="session__title">
                {{ title }}
            </h2>
            <div v-if="title == 'Welcome'">
                Farmer name
                // TODO: Add image and farmer name
                <button class="btn" type="submit">Submit</button>
            </div>
            <FormLogin v-else-if="title == 'Login'" />
            <FormRegister v-else-if="title == 'Register'" />
        </section>
    </main>
</template>
<script>
import FormLogin from "@/components/FormLogin.vue";
import FormRegister from "@/components/FormRegister.vue";

export default {
    name: "Home",
    components: {
        FormLogin,
        FormRegister
    },
    data() {
        return {
            title: "Login",
        };
    },
    methods: {
        changeTitle($newTitle) {
            this.title = $newTitle;
        },
    },
};
</script>
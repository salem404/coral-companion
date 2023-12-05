<template>
    <div class="session__welcome">
        <h3 class="session__subtitle">{{ email }}</h3>
        <picture class="gnome">
            <img src="@/assets/img/gnome1.svg" alt="" />
        </picture>
        <router-link to="/profiles" class="btn"> Start </router-link>
        <p>
            Not you?
            <span class="link" @click="logOut()">Logout</span>
        </p>
    </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
import apiService from "@/services/api.js";

export default {
    name: "TheWelcome",
    computed: {
        ...mapState(["isLogged", "user"]),
        email() {
            return this.isLogged && this.$store.state.user
                ? this.$store.state.user.email
                : "Farmer?";
        },
    },
    data() {
        return {
            apiService: null,
        };
    },
    created() {
        this.apiService = new apiService();
    },
    methods: {
        ...mapMutations(["changeLoggedState", "changeUser"]),
        async logOut() {
            try {
                const response = await this.apiService.logOut();
                localStorage.removeItem("token");
                this.changeLoggedState(false);
                console.log(response);
                location.reload(); // Refresh the page
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    // In case the token is invalid
                    localStorage.removeItem("token");
                    this.changeLoggedState(false);
                    console.log("Unauthorized");
                    location.reload(); // Refresh the page
                }
                console.log(error);
            }
        },
    },
};
</script>

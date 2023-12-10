<template>
    <svg
        class="arena"
        xmlns="http://www.w3.org/2000/svg"
        width="1909"
        height="1121"
        viewBox="0 0 1909 1121"
        fill="none"
    >
        <path
            d="M830.717 71.1321C700.71 71.1321 77.829 296.079 -0.000244141 352V1121H1909V0C1893.72 3.55052 960.725 71.1321 830.717 71.1321Z"
            fill="currentColor"
        />
    </svg>
    <svg
        class="wave-arena"
        xmlns="http://www.w3.org/2000/svg"
        width="884"
        height="306"
        viewBox="0 0 884 306"
        fill="none"
    >
        <path
            d="M884 5.79724C828.635 -10.2175 336.59 12.594 0 7.3528V305.872C88.8836 308.055 314.978 282.052 322.182 253.662C331.187 218.175 416.736 205.072 496.781 191.969C576.826 178.866 553.313 140.103 600.84 117.719C648.367 95.3344 724.91 120.994 763.432 88.7829C794.249 63.0137 813.46 75.6799 845.478 58.2092L857.485 32.0034L884 5.79724Z"
            fill="currentColor"
        />
        <image href="@/assets/img/foam2.svg" height="100%" width="100%" />
    </svg>
    <div class="dashboard">
        <header class="dashboard__header">
            <select
                class="dropdown"
                v-model="selectedSeason"
                aria-label="Select seasonc"
            >
                <option
                    v-for="season in seasons"
                    :value="season.value"
                    :key="season.value"
                >
                    {{ season.name }}
                </option>
            </select>
            <router-link class="cartel" to="/profiles">
                <svg
                    class="cartel__cuerda"
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="64"
                    viewBox="0 0 20 64"
                    fill="none"
                >
                    <path
                        d="M8.40869 64C12.827 64 16.4087 60.4183 16.4087 56C16.4087 51.5817 12.827 48 8.40869 48C3.99041 48 0.408691 51.5817 0.408691 56C0.408691 60.4183 3.99041 64 8.40869 64ZM9.90869 56L9.90869 0H6.90869L6.90869 56H9.90869Z"
                        fill="#422D23"
                    />
                </svg>
                <picture class="cartel__gnome">
                    <img src="@/assets/img/gnome2.svg" alt="" />
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="22"
                        height="22"
                        viewBox="0 0 22 22"
                        fill="none"
                    >
                        <rect
                            x="0.5"
                            y="0.5"
                            width="21"
                            height="21"
                            rx="10.5"
                            fill="currentColor"
                        />
                        <rect
                            x="0.5"
                            y="0.5"
                            width="21"
                            height="21"
                            rx="10.5"
                            stroke="currentColor"
                        />
                        <path
                            d="M6.00033 11.8337L2.66699 8.50033M2.66699 8.50033L6.00033 5.16699M2.66699 8.50033H12.667M16.0003 16.8337L19.3337 13.5003M19.3337 13.5003L16.0003 10.167M19.3337 13.5003H9.33366"
                            stroke="#D9D9D9"
                            stroke-opacity="0.82"
                            stroke-width="1.49254"
                            stroke-miterlimit="10"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                    </svg>
                </picture>
                {{ this.profile.farmer_name }}
                <svg
                    class="cartel__cuerda"
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="64"
                    viewBox="0 0 20 64"
                    fill="none"
                >
                    <path
                        d="M8.40869 64C12.827 64 16.4087 60.4183 16.4087 56C16.4087 51.5817 12.827 48 8.40869 48C3.99041 48 0.408691 51.5817 0.408691 56C0.408691 60.4183 3.99041 64 8.40869 64ZM9.90869 56L9.90869 0H6.90869L6.90869 56H9.90869Z"
                        fill="#422D23"
                    />
                </svg>
            </router-link>
        </header>
        <div class="dashboard__info">
            <div class="dashboard__info-lists">
                <Crops v-bind="componentProps" />
                <People v-bind="componentProps" />
            </div>
        </div>
        <ToDoList />
    </div>
</template>
<script>
import ToDoList from "@/components/ToDoList.vue";
import Crops from "@/components/Crops.vue";
import People from "@/components/People.vue";
import { mapState } from "vuex";

/**
 * @vue-component
 * @vue-data {String} selectedSeasons - Estación seleccionada
 * @vue-computed {Prop} componentProps - Devuelve el prop de la estación seleccionada
 * @vue-data {Array} seasons - Array de estaciones
 * @description Este componente muestra la lista de tareas, los cultivos y las personas
 */
export default {
    name: "Dashboard",
    components: {
        ToDoList,
        Crops,
        People,
    },
    data() {
        return {
            selectedSeason: "1",
            seasons: [
                { value: "1", name: "Spring" },
                { value: "2", name: "Summer" },
                { value: "3", name: "Fall" },
                { value: "4", name: "Winter" },
            ],
        };
    },
    computed: {
        ...mapState(["profile"]),
        componentProps() {
            return { season: this.selectedSeason };
        },
    },
    mounted() {
        const selectedSeason = localStorage.getItem("selectedSeason");
        if (selectedSeason) {
            this.selectedSeason = selectedSeason;
        }
    },
    watch: {
        selectedSeason(newVal) {
            localStorage.setItem("selectedSeason", newVal);
        },
    },
};
</script>

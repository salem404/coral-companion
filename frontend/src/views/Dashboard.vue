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
            <select v-model="selectedSeason">
                <option value="1" selected>Spring</option>
                <option value="2">Summer</option>
                <option value="3">Fall</option>
                <option value="4">Winter</option>
            </select>
            <router-link to="/profiles"> Editate </router-link>
        </header>
        <div class="dashboard__info">
            <div class="dashboard__info-lists">
                <Crops v-bind="componentProps" />
            </div>
        </div>
        <ToDoList />
    </div>
</template>
<script>
import ToDoList from "@/components/ToDoList.vue";
import Crops from "@/components/Crops.vue";
import People from "@/components/People.vue";
/**
 * @vue-data {String} selectedSeasons - Estación seleccionada
 * @vue-computed {Prop} componentProps - Devuelve el prop de la estación seleccionada
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
        };
    },
    computed: {
        componentProps() {
            switch (this.selectedSeason) {
                case "1":
                    return { season: "1" };
                case "2":
                    return { season: "2" };
                case "3":
                    return { season: "3" };
                case "4":
                    return { season: "4" };
                default:
                    return {};
            }
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
<style lang="scss">
.dashboard {
    display: flex;
    width: 100%;
    height: 100%;
    padding: 0px var(--espaciado-desktop-400, 95px);
    flex-direction: row;
    gap: 28px;
    flex-shrink: 0;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: stretch;
    &__header {
        position: absolute;
        top: 0;
        select {
            display: flex;
            width: 300px;
            padding: var(--button-vertical-padding, 12px) 6px;
            justify-content: space-between;
            align-items: center;
            border-radius: var(--button-radio, 40px);
            border: 6px solid var(--button-borde, #135c7d);
            background: var(--button-fondo, #94b755);

            /* sombra */
            box-shadow: 0px 4px 4px 0px rgba(17, 3, 0, 0.25);
            color: var(--button-text, #110300);
            text-align: center;

            /* PC/Button */
            font-family: Quicksand;
            font-size: 35px;
            font-style: normal;
            font-weight: 600;
            line-height: normal;
        }
    }
    &__info {
        display: flex;
        width: 20rem;
        height: 38rem;
        flex-direction: column;
        align-items: center;
        align-self: stretch;
        overflow-y: scroll;
        border-radius: var(--radio, 40px);
        border: 28px solid var(--borde-borde, #135c7d);
        background: var(--fondo-transparente, rgba(217, 217, 217, 0.82));
        box-shadow: 0px 4px 4px 0px rgba(17, 3, 0, 0.65);

        &-lists {
            display: flex;
            flex-direction: column;
            align-items: center;
            flex: 1 0 0;
        }
    }
}
</style>

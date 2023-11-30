<template>
    <div class="dashboard">
        <div class="dashboard__info">
            <select v-model="selectedSeason" class="dashboard__info-season">
                <option value="1" selected>Spring</option>
                <option value="2">Summer</option>
                <option value="3">Fall</option>
                <option value="4">Winter</option>
            </select>
            <div class="dashboard__info-lists">
                <Crops v-bind="componentProps" />
            </div>
        </div>
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
.home {
    position: absolute;
}
.dashboard {
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-around;
    &__info {
        display: flex;
        flex-direction: column;
        min-width: 25%;
        padding: 1em;
        gap: 1em;
        &-season {
            align-self: flex-start;
            padding: 1em 2.5em 1em 1em;
            box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
            border-radius: 40px;
            background: {
                color: var(--green);
                size: 2em;
                position: 72px 10px;
                repeat: no-repeat;
            }
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
        &-lists {
            display: flex;
            flex-wrap: wrap;
            flex-direction: column;
            align-content: center;
            gap: 1em;
        }
    }
}
</style>

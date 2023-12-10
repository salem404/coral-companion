<template>
    <div class="todolist">
        <header class="todolist__header">
            <h2>Tasks</h2>
            <form class="todolist__new" @submit.prevent="addTask">
                <input v-model="newTask" placeholder="I need..." required />
                <button>Add</button>
            </form>
        </header>
        <ul class="todolist__content" v-if="!isEmpty">
            <li
                class="todolist__content-item"
                v-for="task in tasks"
                :key="task.id"
            >
                <input
                    type="checkbox"
                    v-model="task.isCompleted"
                    v-if="task.isEditing"
                />
                <span
                    v-if="!task.isEditing"
                    :class="{ dashed: task.isCompleted }"
                >
                    {{ task.description }}
                </span>
                <input v-else v-model="task.description" type="text" />
                <div class="btns">
                    <button
                        class="btn-edit"
                        @click="
                            task.isEditing = !task.isEditing;
                            updateTask(task);
                        "
                    >
                        <svg
                            v-if="!task.isEditing"
                            xmlns="http://www.w3.org/2000/svg"
                            width="29"
                            height="29"
                            viewBox="0 0 29 29"
                            fill="none"
                        >
                            <path
                                d="M1.51466 22.6584L1.51467 26.1031C1.51468 26.9085 2.16759 27.5614 2.97301 27.5614H6.32879C7.49557 27.5614 8.61401 27.0954 9.43553 26.2668L26.8903 8.66271C27.4365 8.11186 27.4558 7.22984 26.9343 6.65555L24.8524 4.36282L22.4838 2.29351C21.9119 1.79388 21.0523 1.81675 20.5078 2.34609L2.84009 19.5214C1.99273 20.3451 1.51465 21.4767 1.51466 22.6584Z"
                                stroke="#110300"
                                stroke-opacity="0.82"
                                stroke-width="2.61194"
                                stroke-linecap="round"
                            />
                            <path
                                d="M15.7188 7.60645L21.3578 13.2455"
                                stroke="#110300"
                                stroke-opacity="0.82"
                                stroke-width="2.61194"
                                stroke-linecap="round"
                            />
                        </svg>
                        <svg
                            v-else
                            xmlns="http://www.w3.org/2000/svg"
                            width="80"
                            height="80"
                            viewBox="0 0 80 80"
                            fill="none"
                        >
                            <path
                                d="M16.6667 43.3333L33.3333 60L63.3333 23.3333"
                                stroke="black"
                                stroke-width="5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                        </svg>
                        <span>
                            {{ task.isEditing ? "Save" : "Edit" }}
                        </span>
                    </button>
                    <button class="btn-delete" @click="deleteTask(task.id)">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="30"
                            height="30"
                            viewBox="0 0 30 30"
                            fill="none"
                        >
                            <path
                                d="M4.06812 5.97681L5.78823 20.6764C6.21885 24.3563 6.43416 26.1963 7.67777 27.3029C8.92138 28.4095 10.7739 28.4095 14.4789 28.4095H15.6056C19.3476 28.4095 21.2186 28.4095 22.4662 27.2873C23.7138 26.1652 23.9115 24.3046 24.3067 20.5836L25.858 5.97681"
                                stroke="#110300"
                                stroke-opacity="0.82"
                                stroke-width="2.61194"
                            />
                            <path
                                d="M1.49634 6.39053H28.5003"
                                stroke="#110300"
                                stroke-opacity="0.82"
                                stroke-width="2.61194"
                                stroke-linecap="round"
                            />
                            <path
                                d="M12.4724 12.4411V21.9461"
                                stroke="#110300"
                                stroke-opacity="0.82"
                                stroke-width="2.61194"
                                stroke-linecap="round"
                            />
                            <path
                                d="M17.5242 12.4411V21.9461"
                                stroke="#110300"
                                stroke-opacity="0.82"
                                stroke-width="2.61194"
                                stroke-linecap="round"
                            />
                            <path
                                d="M21.198 6.3906V6.20156C21.198 4.513 21.198 3.66873 20.859 3.02843C20.5854 2.51172 20.1628 2.08916 19.6461 1.81558C19.0058 1.47656 18.1615 1.47656 16.473 1.47656H13.3854C11.6968 1.47656 10.8526 1.47656 10.2123 1.81558C9.69556 2.08916 9.273 2.51172 8.99942 3.02843C8.6604 3.66873 8.6604 4.513 8.6604 6.20156V6.3906"
                                stroke="#110300"
                                stroke-opacity="0.82"
                                stroke-width="2.61194"
                            />
                        </svg>
                        <span>Delete</span>
                    </button>
                </div>
            </li>
        </ul>
        <div class="todolist__content-empty" v-else>
            <p>You made it! There is nothing else to do...</p>
        </div>
    </div>
</template>
<script>
import apiServiceMixin from "@/services/apiServiceMixin.js";
import { mapState } from "vuex";

export default {
    name: "ToDoList",
    mixins: [apiServiceMixin],
    data() {
        return {
            tasks: [],
            newTask: "",
            isEmpty: true,
        };
    },
    computed: {
        ...mapState(["profile"]),
    },
    async mounted() {
        await this.fetchTasks();
    },
    methods: {
        async fetchTasks() {
            while (!this.apiService) {
                await new Promise((resolve) => setTimeout(resolve, 100));
            }
            try {
                const response = await this.apiService.getTasksByProfileId(
                    this.profile.id,
                );
                this.tasks = response.data;
                this.isEmpty = this.tasks.length === 0;
            } catch (error) {
                console.error(error);
            }
        },
        async addTask() {
            try {
                const response = await this.apiService.createTask(
                    this.profile.id,
                    this.newTask,
                    0,
                );
                this.fetchTasks();
                this.newTask = "";
                this.isEmpty = false;
            } catch (error) {
                console.error(error);
            }
        },
        async deleteTask(taskId) {
            try {
                await this.apiService.deleteTask(taskId);
                this.fetchTasks();
            } catch (error) {
                console.error(error);
            }
        },
        async updateTask(task) {
            if (!task.isEditing) {
                try {
                    await this.apiService.updateTask(
                        task.id,
                        this.profile.id,
                        task.description,
                        task.isCompleted,
                    );
                    this.fetchTasks();
                } catch (error) {
                    console.error(error);
                }
            }
        },
    },
};
</script>

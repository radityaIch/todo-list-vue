<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import api from "@/api/api";
import { swalLoading, swalClose, swalAlert } from "@/entities/swal.entity";
import CardTodo from "@/components/CardTodo.vue";

const router = useRouter();

function logout() {
  localStorage.removeItem("token");
  router.push("/login");
}

//store the response
const todoList = ref([]);

//get the todo data list
async function displayTodo() {
  swalLoading();
  const response = await api("/todos", {
    method: "GET",
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  });

  //bring the response to inside of ref
  todoList.value = response;
  swalClose();
}
displayTodo();

const formData = reactive({
  text: "",
});

async function createTodo() {
  if (formData.text !== "") {
    try {
      swalLoading();
      await api("/todos", {
        method: "POST",
        headers: {
          Authorization: localStorage.getItem("token"),
        },
        body: {
          title: formData.text,
        },
      });
      swalClose();
      swalAlert("success", "Todo List Added!");
      displayTodo();
    } catch (err) {
      swalAlert("error", err.data.message);
    }
  } else {
    swalAlert("warning", "Form cannot empty!");
  }
  displayTodo();
}
</script>

<template>
  <div class="m-auto">
    <div class="container-custom">
      <div class="row">
        <h5 class="text-center my-4">Simple ToDo List</h5>

        <form @submit.prevent="createTodo">
          <div class="row g-0">
            <div class="col-9">
              <input
                v-model="formData.text"
                id="input_field"
                type="text"
                class="form-control"
                placeholder="Input text here"
              />
            </div>
            <div class="col-3 ps-2">
              <button
                type="submit"
                id="save_button"
                class="btn btn-primary w-100"
              >
                Add
              </button>
            </div>
          </div>
        </form>

        <div class="p-0" id="base_container">
          <p class="mt-4 mx-2 mb-0 p-0"><small>Upcoming</small></p>
          <div id="todo_list_container" class="my-1 g-0">
            <!-- Start Component card -->
            <CardTodo
              v-for="data in todoList"
              :key="data.id"
              :id="data.id"
              :title="data.title"
              :refresh="displayTodo"
            />
            <!-- End Component card -->
          </div>

          <div class="col-12 py-4">
            <button
              id="logout_button"
              class="btn btn-danger w-100"
              @click="logout"
            >
              Log Out
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container-custom {
  width: 330px;
  padding-right: var(--bs-gutter-x, 0.75rem);
  padding-left: var(--bs-gutter-x, 0.75rem);
  margin-right: auto;
  margin-left: auto;
}
</style>

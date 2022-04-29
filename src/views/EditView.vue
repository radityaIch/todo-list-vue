<script setup>
import { reactive } from "vue";
import { useRouter, useRoute } from "vue-router";
import api from "@/api/api";
import { swalLoading, swalClose } from "@/entities/swal.entity";

const routes = useRoute();
const router = useRouter();

//store the todo detail data
const formData = reactive({
  title: "",
});

//get selected todo detail
async function detailTodo() {
  swalLoading();
  const response = await api(`/todos/${routes.params.id}`, {
    method: "GET",
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  });
  formData.title = response.title;
  swalClose();
}
detailTodo();

//edit todo
async function editTodo() {
  try {
    swalLoading();
    await api(`/todos/${routes.params.id}`, {
      method: "PUT",
      headers: {
        Authorization: localStorage.getItem("token"),
      },
      body: {
        title: formData.title,
      },
    });
    swalClose();
    router.push("/");
  } catch (err) {
    alert("error");
  }
}
</script>

<template>
  <div class="m-auto">
    <div class="container-custom">
      <div class="row">
        <h5 class="text-center my-4">Edit ToDo</h5>

        <form @submit.prevent="editTodo">
          <div class="row g-0">
            <div class="col-9">
              <input
                v-model="formData.title"
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
                Save
              </button>
            </div>
          </div>
        </form>

        <div class="p-0" id="base_container">
          <div class="col-12 py-4">
            <router-link
              to="/"
              id="back_button"
              class="btn btn-secondary w-100"
            >
              Back
            </router-link>
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

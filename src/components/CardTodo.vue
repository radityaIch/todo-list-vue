<script setup>
import api from "@/api/api";
import { swalLoading, swalClose } from "@/entities/swal.entity";

//props, get data from parent to child
const props = defineProps({
  id: Number,
  title: String,
  refresh: Function,
});

//delete todo
async function deleteTodo(id) {
  swalLoading();
  await api(`/todos/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  });
  swalClose();
  props.refresh();
}
</script>

<template>
  <div :id="props.id" class="card w-100 my-2">
    <div class="card-body d-flex justify-content-between py-2">
      <p class="m-0">{{ props.title }}</p>
      <div class="d-grid gap-2 d-md-flex justify-content-md-end">
        <router-link
          class="btn btn-info btn-sm text-white"
          :to="`/edit/${props.id}`"
        >
          Edit
        </router-link>
        <button
          class="btn btn-danger btn-sm"
          type="button"
          @click="deleteTodo(props.id)"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
</template>

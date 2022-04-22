<script setup>
import { reactive } from "vue";
import { RouterLink, useRouter } from "vue-router";
import api from "@/api/api";
import { swalLoading, swalClose, swalAlert } from "@/entities/swal.entity";

const router = useRouter();

const formData = reactive({
  email: "",
  password: "",
  confirmPassword: "",
});

async function handleRegister() {
  if (formData.password === formData.confirmPassword) {
    try {
      swalLoading();
      await api("/users/register", {
        method: "POST",
        body: {
          email: formData.email,
          password: formData.password,
        },
      });
      swalClose();
      router.push("/login");
    } catch (err) {
      swalAlert("error", err.data.message);
    }
  } else {
    swalAlert("warning", "Password doesnt match!");
  }
}
</script>

<template>
  <div class="container">
    <form
      class="d-flex flex-column justify-content-center align-items-center h-100"
      @submit.prevent="handleRegister"
    >
      <h3 class="mb-4">Register Simple ToDo List</h3>
      <input
        id="register_email"
        type="email"
        class="form-control w-25 mb-3"
        placeholder="name@example.com"
        v-model="formData.email"
      />
      <input
        id="register_password"
        type="password"
        class="form-control w-25 mb-3"
        placeholder="password"
        v-model="formData.password"
      />
      <input
        id="confirm_password"
        type="password"
        class="form-control w-25 mb-3"
        placeholder="confirm password"
        v-model="formData.confirmPassword"
      />
      <small>
        <router-link to="/login">
          Already have an account? Login here
        </router-link>
      </small>
      <button type="submit" id="registerBtn" class="btn btn-secondary mt-4">
        <b>REGISTER</b>
      </button>
    </form>
  </div>
</template>

<style scoped>
.container {
  height: 100vh;
}
</style>

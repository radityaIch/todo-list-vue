<script setup></script>

<template>
  <form
    class="d-flex flex-column justify-content-center align-items-center h-100"
  >
    <h3 class="mb-4">Register Simple ToDo List</h3>
    <input
      id="register_email"
      type="email"
      class="form-control w-25 mb-3"
      placeholder="name@example.com"
    />
    <input
      id="register_password"
      type="password"
      class="form-control w-25 mb-3"
      placeholder="password"
    />
    <input
      id="confirm_register_password"
      type="password"
      class="form-control w-25 mb-2"
      placeholder="confirm password"
    />
    <small>
      <a href="./login.html">Already have an account? Login here</a>
    </small>
    <button id="registerBtn" class="btn btn-secondary mt-4">
      <b>REGISTER</b>
    </button>
  </form>
</template>

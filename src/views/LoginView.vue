<script setup></script>

<template>
  <form
    class="d-flex flex-column justify-content-center align-items-center h-100"
    onsubmit=""
  >
    <h3 class="mb-4">Login Simple ToDo List</h3>
    <input
      id="email"
      type="email"
      class="form-control w-25 mb-3"
      placeholder="name@example.com"
    />
    <input
      id="password"
      type="password"
      class="form-control w-25 mb-2"
      placeholder="password"
    />
    <small>
      <a href="./register.html">Don't have an account? Register here</a>
    </small>
    <button type="submit" id="loginBtn" class="btn btn-primary mt-4">
      <b>LOGIN</b>
    </button>
  </form>
</template>

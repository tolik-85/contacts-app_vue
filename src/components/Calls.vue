<script>
export default {
  props: ['call'],
}
</script>

<template>
  <li
    class="recent-call waves-effect collection-item avatar transparent z-depth-1"
  >
    <i class="material-icons circle teal darken-3">person</i>
    <span class="title"
      ><b>{{ call.name }} {{ call.familyName }}</b
      ><br />{{ call.phoneNumber }}</span
    >
    <p>
      <i>Позавчера</i>
    </p>
    <a href="#!" class="secondary-content">
      <i class="material-icons">phone</i>
    </a>
  </li>
</template>

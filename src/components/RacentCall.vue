<script>
export default {
  props: ['call'],
  data() {
    return {}
  },
}
</script>
<template>
  <li
    class="recent-call waves-effect collection-item avatar transparent z-depth-1"
  >
    <i class="material-icons circle teal darken-3">person</i>
    <span class="title">
      <b v-if="call.contact">
        <span> {{ call.contact.name }} &nbsp</span>
        <span> {{ call.contact.familyName }} </span>
      </b>
      <b v-else>{{ call.phoneNumber }}</b>
      <br />
    </span>
    <p>
      <i>Позавчера</i>
    </p>
    <a href="#!" class="secondary-content">
      <i class="material-icons">phone</i>
    </a>
  </li>
</template>

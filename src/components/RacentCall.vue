<script>
export default {
  props: ['call'],
  emits: ['made-call'],
  data() {
    return {}
  },
  methods: {
    formatDate(ts) {
      const date = new Date(ts)
      return date.toLocaleString('ru-RU', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    },
  },
}
</script>
<template>
  <li
    @click="$emit('made-call', this.call.phoneNumber)"
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
      <i>{{ formatDate(call.timestamp) }}</i>
    </p>
    <a href="#!" class="secondary-content">
      <i class="material-icons">phone</i>
    </a>
  </li>
</template>

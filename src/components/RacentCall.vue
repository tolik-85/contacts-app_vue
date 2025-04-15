<script>
export default {
  props: ['call'],
  emits: ['made-call'],
  data() {
    return {
      now: new Date(),
      intervalId: null,
    }
  },

  mounted() {
    this.intervalId = setInterval(() => {
      this.now = new Date()
    }, 60 * 1000)
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

    formatCallTime(timestamp, now = new Date()) {
      const callTime = new Date(timestamp)
      const diffInSeconds = Math.floor((now - callTime) / 1000)

      if (diffInSeconds < 60) {
        return 'только что'
      }

      const minutes = Math.floor(diffInSeconds / 60)
      let word = 'минут'

      if (minutes === 1) word = 'минуту'
      else if ([2, 3, 4].includes(minutes)) word = 'минуты'

      if (minutes <= 10) {
        return `${minutes} ${word} назад`
      }

      return this.formatDate(callTime)
    },
  },

  computed: {
    minutesAgo() {
      return this.formatCallTime(this.call.timestamp, this.now)
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
      <i>{{ minutesAgo }}</i>
    </p>
    <a href="#!" class="secondary-content">
      <i class="material-icons">phone</i>
    </a>
  </li>
</template>

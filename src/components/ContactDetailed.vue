<script>
import formatCallTime from '../../functions/formatCallTime.js'

export default {
  props: ['selectedContact', 'recentCalls'],

  emits: ['made-call', 'updatedContact', 'deletedContact'],

  data() {
    return {
      localSelectedContact: JSON.parse(JSON.stringify(this.selectedContact)),
      call: '',
      now: new Date(),
      intervalId: null,
    }
  },

  watch: {
    selectedContact(newValue, oldValue) {
      this.localSelectedContact = JSON.parse(JSON.stringify(newValue))
      // console.log('Changed contact:', oldValue, '→', newValue)
    },
  },

  methods: {
    changeFavourites() {
      this.localSelectedContact.inFavourites =
        !this.localSelectedContact.inFavourites
      this.$emit('updatedContact', { ...this.localSelectedContact })
    },

    deleteContact() {
      this.$emit('deletedContact', this.localSelectedContact)
    },

    makeCall() {
      this.$emit('made-call', this.localSelectedContact.phoneNumber)
    },

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
    contactCalls() {
      return this.recentCalls
        .filter(call => call.phoneNumber === this.selectedContact.phoneNumber)
        .sort((a, b) => b.timestamp - a.timestamp)
    },

    minutesAgo() {
      return this.formatCallTime(this.call.timestamp, this.now)
    },
  },

  mounted() {
    this.intervalId = setInterval(() => {
      this.now = new Date()
    }, 60 * 1000)
  },
}
</script>

<template>
  <div id="modal2" class="modal bottom-sheet">
    <div class="modal-content">
      <div class="wrap-content contact-detail">
        <div class="top teal">
          <div class="row">
            <div class="col s6 center-align teal-text text-lighten-3">
              <i class="material-symbols-outlined person">person</i>
            </div>
            <div class="col s6 right-align teal-text text-lighten-5">
              <span
                v-if="localSelectedContact.inFavourites"
                @click="changeFavourites"
                class="modal-close material-symbols-outlined"
              >
                star
              </span>
              <span
                v-else
                @click="changeFavourites"
                class="modal-close material-symbols-outlined non-fill"
              >
                star
              </span>
              <span
                href="#modal4"
                class="material-symbols-outlined modal-trigger modal-close"
                >edit</span
              >
              <span
                @click="deleteContact"
                class="modal-close material-symbols-outlined"
                >delete</span
              >
            </div>
          </div>
          <h5 class="center-align white-text">
            {{ localSelectedContact.name }}
            {{ localSelectedContact.familyName }}
          </h5>
        </div>
        <div class="bottom">
          <div class="container">
            <div @click="makeCall" class="row valign-wrapper">
              <div class="col s12">
                <ul class="collection">
                  <li
                    class="modal-close waves-effect collection-item avatar transparent z-depth-1"
                  >
                    <i class="material-icons circle teal darken-3">person</i>
                    <span class="title"
                      ><b>{{ localSelectedContact.phoneNumber }}</b></span
                    >
                    <p>
                      <i>{{ formatDate(selectedContact.timestamp) }}</i>
                    </p>
                    <a href="#!" class="secondary-content">
                      <i class="material-icons">phone</i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="wrap-content">
              <h5 class="header">Звонки:</h5>
              <ul class="collection">
                <li
                  v-for="call in contactCalls"
                  :key="call.id"
                  class="collection-item avatar modal-close"
                >
                  <i class="material-icons circle green">assessment</i>
                  <span class="title">
                    <p>{{ formatCallTime(call.timestamp, now) }}</p>
                  </span>
                </li>
                <li v-if="contactCalls.length === 0" class="collection-item">
                  Звонков пока нет.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

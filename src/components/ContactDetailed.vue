<script>
export default {
  props: ['selectedContact', 'recentCalls'],

  emits: ['made-call', 'updatedContact', 'deletedContact'],

  data() {
    return {
      localSelectedContact: JSON.parse(JSON.stringify(this.selectedContact)),
      call: '',
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
  },
  computed: {
    contactCalls() {
      return this.recentCalls
        .filter(call => call.phoneNumber === this.selectedContact.phoneNumber)
        .sort((a, b) => b.timestamp - a.timestamp)
    },
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
          <b>selectedContact</b>{{ selectedContact }}
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
                    <p>{{ formatDate(call.timestamp) }}</p>
                    {{ call.contact?.name }}
                    {{ call.contact?.familyName }}
                  </span>
                  <p>{{ call.phoneNumber }}</p>

                  <a href="#!" class="secondary-content"
                    ><i class="material-icons">phone</i></a
                  >
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

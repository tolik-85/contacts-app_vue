<script>
export default {
  props: ['selectedContact'],

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
                      <i>Позавчера</i>
                    </p>
                    <a href="#!" class="secondary-content">
                      <i class="material-icons">phone</i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

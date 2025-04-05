<script>
const makeId = () => Math.trunc(Math.random() * 0xffff_ffff)

export default {
  props: ['currentContact'],

  emits: ['made-call', 'updatedContact', 'deletedContact'],

  data() {
    return {
      localCurrentContact: { ...this.currentContact },
      call: '',
    }
  },

  watch: {
    currentContact(newValue) {
      this.localCurrentContact = { ...newValue }
      // console.log(this.localCurrentContact)
    },
  },

  methods: {
    changeFavourites() {
      this.localCurrentContact.inFavourites =
        !this.localCurrentContact.inFavourites
      this.$emit('updatedContact', this.localCurrentContact)
    },

    deleteContact() {
      this.$emit('deletedContact', this.localCurrentContact)
    },

    initCall() {
      return {
        id: makeId(),
        name: this.localCurrentContact.name,
        familyName: this.localCurrentContact.familyName,
        phoneNumber: this.localCurrentContact.phoneNumber,
      }
    },

    makeCall() {
      this.call = this.initCall()
      this.$emit('made-call', this.call)
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
                v-if="localCurrentContact.inFavourites"
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
            {{ localCurrentContact.name }} {{ localCurrentContact.familyName }}
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
                      ><b>{{ localCurrentContact.phoneNumber }}</b></span
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

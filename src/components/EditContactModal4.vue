<script>
export default {
  props: ['selectedContact'],
  emits: ['editedContact'],
  data() {
    return {
      localSelectedContact: JSON.parse(JSON.stringify(this.selectedContact)),
    }
  },
  watch: {
    selectedContact(newValue) {
      this.localSelectedContact = JSON.parse(JSON.stringify(newValue))
    },
  },
  methods: {
    editContact() {
      this.$emit('editedContact', this.localSelectedContact)
      console.log(this.localSelectedContact)
    },
  },
}
</script>
<template>
  <div id="modal4" class="modal bottom-sheet">
    <div class="modal-content">
      <div class="wrap-content row">
        <h5 class="header">Редактировать контакт</h5>
        <form class="col s12" autocomplete="off">
          <div class="row">
            <div class="input-field col s12">
              <input
                v-model="localSelectedContact.name"
                id="firstName"
                name="firstName"
                type="text"
                autocomplete="new-password"
              />
              <label for="firstName" class="active">Имя</label>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s12">
              <input
                v-model="localSelectedContact.familyName"
                id="secondName"
                name="secondName"
                type="text"
                autocomplete="new-password"
              />
              <label for="secondName" class="active">Фамилия</label>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s12">
              <input
                v-model="localSelectedContact.phoneNumber"
                id="phone"
                name="phone"
                type="tel"
                autocomplete="new-password"
              />
              <label for="phone" class="active">Телефон</label>
            </div>
          </div>
          <!-- <div class="row">
            <div class="input-field col s12">
              <input
                v-model="contact.email"
                id="email"
                name="email"
                type="email"
                autocomplete="new-password"
              />
              <label for="email">E-mail</label>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s12">
              <input
                v-model="contact.city"
                id="city"
                name="city"
                type="text"
                autocomplete="new-password"
              />
              <label for="city">Город</label>
            </div>
          </div> -->
          <div class="row">
            <div class="col s12 center-align wrap-form-buttons">
              <div class="input-reset">
                <!-- <input type="reset" id="reset" class="" /> -->
                <label
                  for="reset"
                  class="transparent teal-text waves-effect waves-light btn modal-close"
                >
                  <i class="material-icons left">close</i>
                  Отмена
                </label>
              </div>
              <a
                @click="editContact"
                id="appAddContact"
                class="btn-ok waves-effect waves-light btn modal-close"
              >
                <i class="material-icons left">check</i>
                <span>Редактировать</span>
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import AddContactModal1 from './components/AddContactModal1.vue'
import Calls from './components/Calls.vue'
import Contacts from './components/Contacts.vue'
import FavouriteContacts from './components/FavouriteContacts.vue'
import ContactDetailed from './components/ContactDetailed.vue'
import EditContactModal4 from './components/EditContactModal4.vue'

export default {
  components: {
    Calls,
    Contacts,
    FavouriteContacts,
    AddContactModal1,
    ContactDetailed,
    EditContactModal4,
  },

  data() {
    return {
      contacts: [],
      calles: [],
      favouriteContacts: [],
      currentContact: {},
    }
  },

  watch: {
    currentContact(newValue, oldValue) {
      console.log('currentContact', newValue)
      // console.log(oldValue)
    },
    contacts: {
      deep: true,
      handler() {
        console.log('contacts', this.contacts)
      },
    },
  },
  methods: {
    updateContact(updatedContact) {
      this.contacts = this.contacts.map(contact =>
        contact.id === updatedContact.id ? (contact = updatedContact) : contact
      )
      this.currentContact = updatedContact
    },

    getFavourites() {
      this.favouriteContacts = this.contacts.filter(contact => {
        return contact.inFavourites
      })
    },
    deleteContact(deletedContact) {
      this.contacts = this.contacts.filter(contact => {
        return contact.id != deletedContact.id
      })
    },
  },
}
</script>

<template>
  <div class="wrapper teal lighten-5">
    <nav class="nav-extended teal">
      <div class="nav-wrapper">
        <form>
          <div class="input-field">
            <input
              class="teal-text text-lighten-5"
              id="search"
              type="search"
              placeholder="Поиск в контактах"
              required
            />
            <label class="label-icon" for="search"
              ><i class="material-icons">search</i></label
            >
            <i class="material-icons">close</i>
          </div>
        </form>
      </div>

      <div class="nav-content">
        <ul class="tabs tabs-transparent">
          <li @click="getFavourites" class="tab">
            <a href="#tab-1">
              <span class="material-symbols-outlined">star</span>
            </a>
          </li>
          <li class="tab">
            <a href="#tab-2">
              <span class="material-symbols-outlined">chronic</span>
            </a>
          </li>
          <li class="tab">
            <a class="active" href="#tab-3">
              <span class="material-symbols-outlined">people</span>
            </a>
          </li>
        </ul>
      </div>
    </nav>

    <div>
      <FavouriteContacts :favouriteContacts />
      <Calls />
      <Contacts
        :contacts="contacts"
        @currentContact="currentContact = $event"
      />
    </div>
  </div>

  <!-- Modal Structure  -->

  <AddContactModal1 @contact-added="contacts.push($event)" />

  <ContactDetailed
    :currentContact="currentContact"
    @updatedContact="updateContact"
    @deletedContact="deleteContact"
  />
  <EditContactModal4
    :currentContact="currentContact"
    @editedContact="updateContact"
  />
  <div id="modal3" class="modal bottom-sheet modal-close non-overlay">
    <div class="modal-content">
      <div class="wrap-content">
        <h5 class="header">Найдено:</h5>
        <ul class="collection">
          <!-- <li class="collection-item avatar">
              <i class="material-icons circle green">assessment</i>
              <span class="title">Title</span>
              <p>First Line</p>
              <a href="#!" class="secondary-content">
                <i class="material-icons">phone</i>
              </a>
            </li> -->
        </ul>
      </div>
    </div>
  </div>
</template>

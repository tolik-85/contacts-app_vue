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
      recentCalls: [],
      currentContact: {}, // selectedContact
    }
  },

  computed: {
    favouriteContacts() {
      return this.contacts.filter(contact => contact.inFavourites) // is
    },
  },

  watch: {
    contacts: {
      deep: true,
      handler(newValue) {
        localStorage.setItem('contacts', JSON.stringify(newValue))
      },
    },
    recentCalls: {
      deep: true,
      handler(newValue) {
        localStorage.setItem('recentCalls', JSON.stringify(newValue))
      },
    },
  },
  mounted() {
    const contactsFromStorage = JSON.parse(localStorage.getItem('contacts'))
    const recentCallsFromStorage = JSON.parse(localStorage.getItem('contacts'))
    if (contactsFromStorage) {
      this.contacts = contactsFromStorage
    }
    if (recentCallsFromStorage) {
      this.recentCalls = recentCallsFromStorage
    }
  },
  methods: {
    updateContact(updatedContact) {
      this.contacts = this.contacts.map(c =>
        c.id === updatedContact.id ? updatedContact : c
      )
    },

    deleteContact(deletedContact) {
      this.contacts = this.contacts.filter(c => c.id != deletedContact.id)
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
          <li class="tab">
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
      <FavouriteContacts
        :favouriteContacts
        @made-call="recentCalls.push($event)"
      />

      <div id="tab-2" class="col s12">
        <div class="container">
          <div class="row valign-wrapper">
            <div class="recent-call col s12">
              <ul id="app-recent-calls" class="collection">
                <Calls
                  v-for="(call, idx) of recentCalls.toReversed()"
                  :key="idx"
                  :call
                />
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Contacts
        :contacts="contacts"
        @current-contact="currentContact = $event"
      />
    </div>
  </div>

  <!-- Modal Structure  -->

  <AddContactModal1 @contact-added="contacts.push($event)" />

  <ContactDetailed
    :currentContact="currentContact"
    @updatedContact="updateContact"
    @deletedContact="deleteContact"
    @made-call="recentCalls.push($event)"
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

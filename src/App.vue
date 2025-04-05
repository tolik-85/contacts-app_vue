<script>
import AddContactModal1 from './components/AddContactModal1.vue'
import Calls from './components/Calls.vue'
import Contacts from './components/Contacts.vue'
import FavouriteContacts from './components/FavouriteContacts.vue'
import ContactDetailed from './components/ContactDetailed.vue'
import EditContactModal4 from './components/EditContactModal4.vue'

import myStorage from './myStorage.js'
import SearchContacts from './components/SearchContacts.vue'
import UiNavigationBar from './ui/UiNavigationBar.vue'

// const makeId = () => Math.trunc(Math.random() * 0xffff_ffff)
// const addRecentCallByPhone = phone => ({
//   id: makeId(),
//   name: this.localCurrentContact.name,
//   familyName: this.localCurrentContact.familyName,
//   phoneNumber: this.localCurrentContact.phoneNumber,
// })

export default {
  components: {
    Calls,
    Contacts,
    FavouriteContacts,
    AddContactModal1,
    ContactDetailed,
    EditContactModal4,
    SearchContacts,
    UiNavigationBar,
  },

  data() {
    return {
      contacts: myStorage.getContacts(),
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
        myStorage.setContacts(newValue)
      },
    },

    // recentCalls: {
    //   deep: true,
    //   handler(newValue) {
    //     localStorage.setItem('recentCalls', JSON.stringify(newValue))
    //   },
    // },
  },

  // mounted() {
  //   const contactsFromStorage = JSON.parse(localStorage.getItem('contacts'))
  //   const recentCallsFromStorage = JSON.parse(localStorage.getItem('contacts'))
  //   if (contactsFromStorage) {
  //     this.contacts = contactsFromStorage
  //   }
  //   if (recentCallsFromStorage) {
  //     this.recentCalls = recentCallsFromStorage
  //   }
  // },

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
    <UiNavigationBar />

    <div>
      <FavouriteContacts
        :favouriteContacts
        @made-call="recentCalls.unshift($event)"
      />

      <div id="tab-2" class="col s12">
        <div class="container">
          <div class="row valign-wrapper">
            <div class="recent-call col s12">
              <ul id="app-recent-calls" class="collection">
                <Calls v-for="(call, idx) of recentCalls" :key="idx" :call />
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
    @made-call="recentCalls.unshift($event)"
  />

  <EditContactModal4
    :currentContact="currentContact"
    @editedContact="updateContact"
  />

  <SearchContacts />
</template>

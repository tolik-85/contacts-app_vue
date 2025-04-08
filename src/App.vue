<script>
import AddContactModal from './components/AddContactModal.vue'
import RacentCallsCalls from './components/RacentCalls.vue'
import ContactsBook from './components/ContactsBook.vue'
import FavouriteContacts from './components/FavouriteContacts.vue'
import ContactDetailed from './components/ContactDetailed.vue'
import EditContactModal4 from './components/EditContactModal4.vue'
import SearchContacts from './components/SearchContacts.vue'
import UiNavigationBar from './ui/UiNavigationBar.vue'

// import myStorage from './myStorage.js'

export default {
  components: {
    RacentCallsCalls,
    ContactsBook,
    FavouriteContacts,
    AddContactModal,
    ContactDetailed,
    EditContactModal4,
    SearchContacts,
    UiNavigationBar,
  },

  data() {
    return {
      contacts: [],
      recentCalls: [],
      selectedContact: {},
    }
  },
  watch: {
    // selectedContact: {
    //   deep: true,
    //   handler(oldValue, newValue) {
    //     console.log(oldValue, newValue)
    //   },
    // },
  },
  computed: {
    favouriteContacts() {
      return this.contacts.filter(contact => contact.inFavourites) // is
    },
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

    makeCall(phoneNumber) {
      const makeId = () => Math.trunc(Math.random() * 0xffff_ffff)

      const contactExist = this.contacts.find(
        contact => contact.phoneNumber === phoneNumber
      )
      let call
      if (contactExist) {
        call = {
          id: makeId(),
          name: contactExist.name,
          familyName: contactExist.familyName,
          phoneNumber: phoneNumber,
        }
        this.recentCalls.unshift(call)
      } else {
        call = {
          id: makeId(),
          name: 'Контакт не найден',
          familyName: '',
          phoneNumber: phoneNumber,
        }
        this.recentCalls.unshift(call)
      }
    },
  },

  mounted() {
    window.app = this

    // setInterval(() => {
    //   const randomPhone =
    //     '+38097' + Math.floor(1000000 + Math.random() * 9000000)
    //   this.makeCall(randomPhone)
    // }, 10000)
  },
}
</script>

<template>
  <div class="wrapper teal lighten-5">
    <UiNavigationBar />

    <div>
      <FavouriteContacts
        :favouriteContacts="favouriteContacts"
        @made-call="makeCall($event)"
      />

      <div id="tab-2" class="col s12">
        <div class="container">
          <div class="row valign-wrapper">
            <div class="recent-call col s12">
              <ul id="app-recent-calls" class="collection">
                <RacentCallsCalls
                  v-for="(call, idx) of recentCalls"
                  :key="idx"
                  :call
                />
              </ul>
            </div>
          </div>
        </div>
      </div>

      <ContactsBook
        :contacts="contacts"
        @selected-contact="selectedContact = $event"
      />
    </div>
  </div>

  <!-- Modal Structure  -->

  <AddContactModal @contact-added="contacts.push($event)" />

  <ContactDetailed
    :selectedContact="selectedContact"
    @updatedContact="updateContact"
    @deletedContact="deleteContact"
    @made-call="makeCall($event)"
  />
  <!-- @made-call="recentCalls.unshift($event)" -->

  <EditContactModal4
    :selectedContact="selectedContact"
    @editedContact="updateContact"
  />

  <SearchContacts />
</template>

<script>
import AddContactModal from './components/AddContactModal.vue'
import RacentCalls from './components/RacentCalls.vue'
import ContactsBook from './components/ContactsBook.vue'
import FavouriteContacts from './components/FavouriteContacts.vue'
import ContactDetailed from './components/ContactDetailed.vue'
import EditContactModal4 from './components/EditContactModal4.vue'
import SearchContacts from './components/SearchContacts.vue'
import UiNavigationBar from './ui/UiNavigationBar.vue'

const makeId = () => Math.trunc(Math.random() * 0xffff_ffff)

// import myStorage from './myStorage.js'

export default {
  components: {
    RacentCalls,
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
    //     console.log('selectedContact newValue', newValue)
    //     console.log('selectedContact oldValue', oldValue)
    //   },
    // },
    // contacts: {
    //   deep: true,
    //   handler(oldValue, newValue) {
    //     console.log('contacts oldValue', oldValue)
    //     console.log(' contacts newValue', newValue)
    // },
    // },
    recentCalls: {
      deep: true,
      handler(oldValue, newValue) {
        console.log('recentCalls oldValue', oldValue)
        console.log('recentCalls newValue', newValue)
      },
    },
    // favouriteContacts: {
    //   deep: true,
    //   handler(oldValue, newValue) {
    //     console.log('favouriteContacts oldValue', oldValue)
    //     console.log('favouriteContacts newValue', newValue)
    //   },
    // },
  },
  computed: {
    favouriteContacts() {
      return this.contacts.filter(contact => contact.inFavourites) // is
    },
    enrichedRecentCalls() {
      return this.recentCalls.map(rc => ({
        ...rc,
        contact: this.contacts.find(c => c.phoneNumber === rc.phoneNumber),
      }))
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

    createRecentCallByPhone(phone) {
      return {
        self: this,
        id: makeId(),
        phoneNumber: phone,
        timestamp: Date.now(),
        get contact() {
          // console.log(this.self)
          return this.self.contacts.find(c => c.phoneNumber === phone)
        },
      }
    },

    addRecentCallByPhone(phone) {
      const recentCall = this.createRecentCallByPhone(phone)
      this.recentCalls.unshift(recentCall)
    },
  },

  created() {
    let counter = 0
    const interval = setInterval(() => {
      const randomPhone =
        '+38097' + Math.floor(1000000 + Math.random() * 9000000)
      this.addRecentCallByPhone(randomPhone)
      counter++
      if (counter >= 4) {
        clearInterval(interval)
      }
    }, 1000)
  },
}
</script>

<template>
  <!-- <b>recentCalls</b> {{ recentCalls }} -->
  <div class="wrapper teal lighten-5">
    <!-- <b>recentCalls</b> {{ contacts }} -->
    <UiNavigationBar />

    <div>
      <FavouriteContacts
        :favouriteContacts="favouriteContacts"
        @made-call="addRecentCallByPhone($event)"
      />

      <RacentCalls :recentCalls="enrichedRecentCalls" />

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
    @made-call="addRecentCallByPhone($event)"
  />
  <!-- @made-call="recentCalls.unshift($event)" -->

  <EditContactModal4
    :selectedContact="selectedContact"
    @editedContact="updateContact"
  />

  <SearchContacts />
</template>

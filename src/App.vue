<script>
import AddContactModal from './components/AddContactModal.vue'
import RacentCalls from './components/RacentCalls.vue'
import ContactsBook from './components/ContactsBook.vue'
import FavouriteContacts from './components/FavouriteContacts.vue'
import ContactDetailed from './components/ContactDetailed.vue'
import EditContactModal4 from './components/EditContactModal4.vue'
import SearchContacts from './components/SearchContacts.vue'
import UiNavigationBar from './ui/UiNavigationBar.vue'

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
    contacts: {
      deep: true,
      handler(oldValue, newValue) {
        console.log('contacts oldValue', oldValue)
        console.log(' contacts newValue', newValue)
      },
    },
    // recentCalls: {
    //   deep: true,
    //   handler(oldValue, newValue) {
    //     console.log('recentCalls oldValue', oldValue)
    //     console.log('recentCalls newValue', newValue)
    //   },
    // },
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
      return this.recentCalls.map(call => {
        const contact = this.contacts.find(
          c => c.phoneNumber === call.phoneNumber
        )

        if (contact) {
          return {
            ...call,
            name: contact.name,
            familyName: contact.familyName,
          }
        }

        return call
      })
    },
  },

  methods: {
    updateContact(updatedContact) {
      console.log('updatedContact', updatedContact)

      this.contacts = this.contacts.map(c =>
        c.id === updatedContact.id ? updatedContact : c
      )
    },

    deleteContact(deletedContact) {
      this.contacts = this.contacts.filter(c => c.id != deletedContact.id)
    },

    makeCall(phoneNumber) {
      const makeId = () => Math.trunc(Math.random() * 0xffff_ffff)

      const contact = this.contacts.find(
        contact => contact.phoneNumber === phoneNumber
      )

      let call

      if (contact) {
        call = {
          idCall: makeId(),
          ...contact, // копируем все поля контакта
        }
      } else {
        call = {
          idCall: makeId(),
          phoneNumber: phoneNumber,
        }
      }

      this.recentCalls.unshift(call)
    },
  },

  mounted() {
    window.app = this

    let counter = 0
    const interval = setInterval(() => {
      const randomPhone =
        '+38097' + Math.floor(1000000 + Math.random() * 9000000)

      this.makeCall(randomPhone)

      counter++
      if (counter >= 4) {
        clearInterval(interval)
      }
    }, 30000)
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
                <RacentCalls
                  v-for="(call, idx) of enrichedRecentCalls"
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

<script>
import AddContactModal from './components/AddContactModal.vue'
import RacentCalls from './components/RacentCalls.vue'
import ContactsList from './components/ContactsList.vue'
import FavouriteContacts from './components/FavouriteContacts.vue'
import ContactDetailed from './components/ContactDetailed.vue'
import EditContactModal4 from './components/EditContactModal4.vue'
import SearchContactsList from './components/SearchContactsList.vue'
import UiNavigationBar from './ui/UiNavigationBar.vue'
// functions
import searchContacts from '../functions/searchContacts.js'
// import makeId from '../functions/makeId.js'
const makeId = () => Math.trunc(Math.random() * 0xffff_ffff)

// import myStorage from './myStorage.js'

export default {
  components: {
    RacentCalls,
    ContactsList,
    FavouriteContacts,
    AddContactModal,
    ContactDetailed,
    EditContactModal4,
    SearchContactsList,
    UiNavigationBar,
  },

  data() {
    return {
      // contacts: [

      //   {
      //     id: 1888428661,
      //     name: 'Vanya',
      //     familyName: 'Сусанин',
      //     phoneNumber: '+380974426327',
      //     email: '',
      //     city: '',
      //     inFavourites: false,
      //     timestamp: 1744410174595,
      //   },
      //   {
      //     id: 4069932216,
      //     name: 'Oleg',
      //     familyName: 'Vanin',
      //     phoneNumber: '+380974426328',
      //     email: '',
      //     city: '',
      //     inFavourites: false,
      //     timestamp: 1744410217021,
      //   },
      //   {
      //     id: 3230975085,
      //     name: 'Ihor',
      //     familyName: 'Popov',
      //     phoneNumber: '+380979213119',
      //     email: '',
      //     city: '',
      //     inFavourites: false,
      //     timestamp: 1744410234792,
      //   },
      //   {
      //     id: 2528465224,
      //     name: 'Oleg',
      //     familyName: 'Vanin',
      //     phoneNumber: '+380974426325',
      //     email: '',
      //     city: '',
      //     inFavourites: false,
      //     timestamp: 1744410256516,
      //   },
      //   {
      //     id: 2363789236,
      //     name: 'Vanya33333',
      //     familyName: 'rrrrrr',
      //     phoneNumber: '+380974426321',
      //     email: '',
      //     city: '',
      //     inFavourites: false,
      //     timestamp: 1744410266339,
      //   },
      // ],
      recentCalls: [],
      selectedContact: {},
      searchQuery: '',
      searchedContacts: [],
      contacts: [],
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
    // enrichedRecentCalls() {
    //   return this.recentCalls.map(rc => ({
    //     ...rc,
    //     contact: this.contacts.find(c => c.phoneNumber === rc.phoneNumber),
    //   }))
    // },
    enrichedRecentCalls() {
      return this.recentCalls.map(call => {
        const contact = this.contacts.find(
          contact => contact.phoneNumber === call.phoneNumber
        )
        return {
          ...call,
          contact: contact || null,
        }
      })
    },
  },

  methods: {
    updateContact(updatedContact) {
      this.contacts = this.contacts.map(c =>
        c.id === updatedContact.id ? updatedContact : c
      )
      this.updateCallsWithNewContactData(updatedContact)
    },

    deleteContact(deletedContact) {
      this.contacts = this.contacts.filter(c => c.id != deletedContact.id)
    },
    updateCallsWithNewContactData(updatedContact) {
      this.recentCalls.forEach(call => {
        // Если номер телефона совпадает, обновляем данные звонка
        if (call.phoneNumber === updatedContact.phoneNumber) {
          call.contact = updatedContact
        }
      })
    },
    // createRecentCallByPhone(phone) {
    //   return {
    //     self: this,
    //     id: makeId(),
    //     phoneNumber: phone,
    //     timestamp: Date.now(),
    //     get contact() {
    //       // console.log(this.self)
    //       return this.self.contacts.find(c => c.phoneNumber === phone)
    //     },
    //   }
    // },

    createRecentCallByPhone(phone) {
      return {
        id: makeId(),
        phoneNumber: phone,
        timestamp: Date.now(),
        contact: this.contacts.find(c => c.phoneNumber === phone),
      }
    },

    // addRecentCallByPhone(phone) {
    //   const recentCall = this.createRecentCallByPhone(phone)
    //   this.recentCalls.unshift(recentCall)
    // },
    addRecentCallByPhone(phone) {
      const newCall = {
        id: makeId(),
        phoneNumber: phone,
        timestamp: Date.now(),
      }
      this.recentCalls.unshift(newCall)
      this.recentCalls = this.enrichRecentCalls(this.recentCalls)
    },

    onSearch(query) {
      const results = searchContacts(query, this.contacts)
      this.searchedContacts = results
    },

    enrichRecentCalls(calls) {
      return calls.map(call => {
        const matchingContact = this.contacts.find(
          contact => contact.phoneNumber === call.phoneNumber
        )
        return {
          ...call,
          contact: matchingContact || null,
        }
      })
    },
    updateRecentCalls(updatedCalls) {
      this.recentCalls = this.enrichRecentCalls(updatedCalls)
    },
    addContact(newContact) {
      this.contacts.push(newContact)
      this.recentCalls = this.enrichRecentCalls(this.recentCalls)
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
  <div class="wrapper teal lighten-5">
    <!-- <b>recentCalls</b> {{ recentCalls }} -->
    <!-- <b>selectedContact</b>{{ selectedContact }} -->
    <!-- {{ searchQuery }} -->
    <!-- {{ contacts }} -->
    <UiNavigationBar @search-query="onSearch($event)" />

    <div>
      <FavouriteContacts
        :favouriteContacts="favouriteContacts"
        @made-call="addRecentCallByPhone($event)"
      />

      <RacentCalls
        :recentCalls="enrichedRecentCalls"
        @made-call="addRecentCallByPhone($event)"
      />

      <ContactsList
        :contacts="contacts"
        @selected-contact="selectedContact = $event"
      />
    </div>
  </div>

  <!-- Modal Structure  -->

  <AddContactModal @contact-added="addContact($event)" />

  <ContactDetailed
    :selectedContact="selectedContact"
    :recentCalls="recentCalls"
    @updatedContact="updateContact"
    @deletedContact="deleteContact"
    @made-call="addRecentCallByPhone($event)"
  />
  <!-- @made-call="recentCalls.unshift($event)" -->

  <EditContactModal4
    :selectedContact="selectedContact"
    @editedContact="updateContact"
  />

  <SearchContactsList
    :searchedContacts="searchedContacts"
    @made-call="addRecentCallByPhone($event)"
  />
</template>

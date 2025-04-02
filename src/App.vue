<script>
import AddContactModal1 from './AddContactModal1.vue'
import Calls from './Calls.vue'
import Contacts from './Contacts.vue'
import FavouriteContacts from './FavouriteContacts.vue'
import ContactDetailed from './ContactDetailed.vue'

export default {
  components: {
    Calls,
    Contacts,
    FavouriteContacts,
    AddContactModal1,
    ContactDetailed,
  },

  data() {
    return {
      contacts: [],
      calles: [],
      favouriteContacts: [],
    }
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
      <FavouriteContacts />
      <Calls />
      <Contacts :contacts="contacts" />
    </div>
  </div>

  <!-- Modal Structure  -->

  <AddContactModal1 @contact-added="contacts.push($event)" />

  <ContactDetailed />

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

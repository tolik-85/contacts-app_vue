<script>
import SearchContactsItem from './SearchContactsItem.vue'
export default {
  components: { SearchContactsItem },
  props: ['searchedContacts'],
  emits: ['made-call'],
  data() {
    return {}
  },
}
</script>
<template>
  <div id="modal3" class="modal bottom-sheet modal-close non-overlay">
    <div class="modal-content">
      <div class="wrap-content">
        <h5 class="header">Найдено:</h5>
        <ul class="collection">
          <SearchContactsItem
            @click="$emit('made-call', contact.phoneNumber)"
            v-for="contact in searchedContacts"
            :key="contact.id"
            :contact="contact"
          />
        </ul>
      </div>
    </div>
  </div>
</template>

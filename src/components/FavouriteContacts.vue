<script>
import FavouriteContact from './FavouriteContact.vue'
export default {
  components: { FavouriteContact },
  props: ['favouriteContacts'],
  emits: ['made-call'],
}
</script>

<template>
  <div id="tab-1" class="col s12">
    <div class="container">
      <div id="app-favorites" class="row">
        <FavouriteContact
          v-for="favouriteContact of favouriteContacts"
          :key="favouriteContact.id"
          :favouriteContact
          @made-call="$emit('made-call', $event)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import FavouriteContact from './FavouriteContact.vue'
export default {
  components: { FavouriteContact },
  props: ['favouriteContacts'],
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
        />
      </div>
    </div>
  </div>
</template>

<script>
import ContactItem from './ContactItem.vue'

export default {
  components: { ContactItem },

  props: ['contacts'],

  emits: ['selected-contact'],
}
</script>

<template>
  <div id="tab-3" class="col s12">
    <ul id="app-contacts" class="collection">
      <ContactItem
        v-for="contact of contacts"
        :key="contact.id"
        :contact
        @click="$emit('selected-contact', { ...contact })"
      />
    </ul>
    <div class="fixed-action-btn">
      <a
        id="elFab"
        href="#modal1"
        class="btn-floating btn-large pink accent-4 waves-effect waves-light modal-trigger pulse"
      >
        <i class="large material-icons">person_add</i>
      </a>
    </div>
  </div>
</template>

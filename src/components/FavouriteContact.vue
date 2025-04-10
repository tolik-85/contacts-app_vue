<script>
const makeId = () => Math.trunc(Math.random() * 0xffff_ffff)

export default {
  props: ['favouriteContact'],

  emits: ['made-call'],

  data() {
    return {
      localFavouriteContact: JSON.parse(JSON.stringify(this.favouriteContact)),
      // localFavouriteContact: { ...this.favouriteContact },
    }
  },
  watch: {
    localFavouriteContact: {
      deep: true,
      handler(oldValue, newValue) {
        console.log('localFavouriteContact oldValue', oldValue)
        console.log('localFavouriteContact newValue', newValue)
      },
    },
  },
  methods: {
    makeCall() {
      this.$emit('made-call', this.localFavouriteContact.phoneNumber)
    },
  },
}
</script>
<template>
  <div @click="makeCall" class="favorite col s6 m4 l3 xl2">
    <div class="card-panel teal lighten-2 waves-effect waves-light">
      <div class="center-align">
        <span
          class="transparent teal-text text-lighten-5 pic center-align material-symbols-outlined"
          >person</span
        >
      </div>
      <span class="white-text"
        >{{ localFavouriteContact.name }}
        {{ localFavouriteContact.familyName }}</span
      >
    </div>
  </div>
</template>

<script>
const makeId = () => Math.trunc(Math.random() * 0xffff_ffff)

export default {
  props: ['favouriteContact'],

  emits: ['made-call'],

  data() {
    return {
      call: '',
    }
  },
  mounted() {
    this.call = this.initCall()
  },
  methods: {
    initCall() {
      return {
        id: makeId(),
        name: this.favouriteContact.name,
        familyName: this.favouriteContact.familyName,
        phoneNumber: this.favouriteContact.phoneNumber,
      }
    },
    makeCall() {
      this.call = this.initCall()
      this.$emit('made-call', this.call)
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
        >{{ favouriteContact.name }} {{ favouriteContact.familyName }}</span
      >
    </div>
  </div>
</template>

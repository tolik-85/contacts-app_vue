<script>
export default {
  props: ['favouriteContact'],
}
</script>
<template>
  <div class="favorite col s6 m4 l3 xl2">
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

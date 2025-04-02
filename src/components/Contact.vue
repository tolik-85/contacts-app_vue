<script>
export default {
  props: ['contact'],
}
</script>

<template>
  <div class="row valign-wrapper">
    <div class="col s4">
      <span
        class="teal darken-1 teal-text text-lighten-4 pic circle center-align material-symbols-outlined"
        >person</span
      >
    </div>
    <div class="col s4">
      <span class=""
        ><b>{{ contact.name }} {{ contact.familyName }}</b></span
      >
    </div>
    <div class="col s4">
      <span class="badge new">phone</span>
    </div>
  </div>
</template>

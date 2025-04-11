<script>
import RacentCall from './RacentCall.vue'
export default {
  components: { RacentCall },
  props: ['recentCalls'],
  emits: ['made-call'],
}
</script>

<template>
  <div id="tab-2" class="col s12">
    <div class="container">
      <div class="row valign-wrapper">
        <div class="recent-call col s12">
          <ul id="app-recent-calls" class="collection">
            <RacentCall
              v-for="call of recentCalls"
              :key="call.id"
              :call
              @made-call="$emit('made-call', $event)"
            />
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

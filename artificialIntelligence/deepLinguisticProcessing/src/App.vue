<template lang="pug">
main
  .word(v-for='el in result')
    Tag.p-tooltip.p-tag.p-tag-rounded(
      v-tooltip.bottom='el.types',
      :style='{background: el.color, color:"#fff",margin:"0.25rem",padding:"0.5rem"}'
      :value='el.word') {{ el.word }}
</template>
<script>
import {DeepLinguisticProcessor} from './DeepLinguisticProcessor';

const DLP = new DeepLinguisticProcessor(),
      result = DLP.process(`
        His name was Samuel.
        He'd have loved to eat Fritos if he were still alive;
        However, he died at the young age of 13.
      `)

// Prepare the main template
export default {
  name: 'app',
  data(){
    return {result};
  }
};
</script>
<style lang="stylus" scoped>
main
  height 100vh
  padding 5rem
  display flex
  align-items center
  justify-content space-between
  flex-direction row
.word
  display flex
  align-items center
  justify-content center
</style>

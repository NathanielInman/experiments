<template lang="pug">
main(style='height:100vh;display:flex;align-items:center')
  .columns: .column.is-one-third.is-offset-one-third
    b-tooltip(v-for='el in result',:label='el.types',
      style='margin:0.25rem')
      b-tag(:style='{background: el.color,color:"#fff"}') {{el.word}}
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
.b-tabs .tab-content
  overflow visible

section.tab-content
  background #fff
  padding 1rem
  border-right 1px solid #dbdbdb
  border-left 1px solid #dbdbdb
  border-bottom 1px solid #dbdbdb
.b-tabs .tabs
  margin-bottom 0
</style>

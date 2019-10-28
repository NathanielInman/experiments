<template lang="pug">
main
  .frame(v-if='engine')
    .code(v-if='engine.log&&engine.log.length')
      .line(v-for='line in engine.log')
        span(v-for='word in line',:class='word.class') {{word.text}}
    input#cmd(@keyup.enter='sendCommand')
    .process Enter
</template>
<script>
import {Mind} from './Mind';

// Prepare the main template
export default {
  name: 'app',
  data(){
    return {
      engine: new Mind()
    };
  },
  mounted(){
    this.engine.process('+apple@red fruit tastey');
    this.engine.process('+happy@smile alive laugh');
    this.engine.process('+apple@red green tree seed grow eat food');
    this.engine.process('+alive@die sleep think grow');
    this.engine.process('+green@tree grass grow');
    this.engine.process('+grow@eat sleep alive food');
    this.engine.process('+eat@food apple fruit');
    this.engine.process('show');

    console.log(this.engine);
  },
  methods:{
    sendCommand(e){
      this.engine.process(e.target.value);
      e.target.value = '';
    }
  }
};
</script>
<style lang="stylus" scoped>
.frame
  position absolute
  left 0; right 0
  top 0; bottom 0
  input#cmd
    position absolute
    left 0; bottom 0
    width 90%
    height 25px
    border 2px solid #333
    background #111
    color #fff
    outline none
  .process
    position absolute
    right 0; bottom 0
    width 10%
    height 25px
    border 2px solid #333
    background #222
    color #fff
    display flex
    align-items center
    justify-content center
    &:hover
      background #444
.code
  font-family 'Share Tech Mono', monospace
  height 100%
  overflow-y scroll
  background-color #111
  color #aaa
  padding 1rem
  .tab
    margin-left 1rem
  .red-bold
    color #f00
  .red
    color #a00
  .green-bold
    color #0f0
  .green
    color #0a0
  .blue-bold
    color #58f
  .blue
    color #36a
  .cyan-bold
    color #0ff
  .cyan
    color #0aa
  .magenta-bold
    color #f0f
  .magenta
    color #a0a
  .yellow-bold
    color #ff0
  .yellow
    color #aa0
  .black
    color #000
  .white
    color #fff
  .gray-bold
    color #ccc
  .gray
    color #aaa
</style>

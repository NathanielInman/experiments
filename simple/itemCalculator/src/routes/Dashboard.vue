<template lang="pug">
section.section(style='padding-top: 0')
  .hero.is-primary.mb-2.mx-r
    .hero-body: .container
      .columns
        .column
          .title Item Calculator
          .subtitle (DEMO VERSION for Durion)
  .has-text-right: b-button.top-button(icon-left='arrow-left-bold',
     type='is-primary',inverted,@click='load()',
     :disabled='!$router.currentRoute.query.vnum') Return
  .code.has-text-left(v-if='output&&output.length')
    template(v-for='line in output')
      .cursor(v-if='line.item',@click='load(line.item.vnum)')
        .line
          span(v-for='word in line',:class='word.class') {{word.text}}
      .line(v-if='!line.item')
        span(v-for='word in line',:class='word.class') {{word.text}}
</template>
<script>

import Vuex from 'vuex';
import * as colors from '../colors';
import {items} from '../items';

const {mapActions,mapGetters,mapMutations,mapState} = Vuex;

// Prepare the main template
export default {
  name: 'Dashboard',
  computed: {
    ...mapState('user',['name'])
  },
  data(){
    return {
      output: []
    };
  },
  created(){
    const {query} = this.$router.currentRoute;

    this.load(query ? query.vnum : null);
    console.log(items);
  },
  methods: {
    returnToIndex(){
    },
    load(vnum){
      this.output.length = 0;
      if(vnum){
        this.$router.push({query: {vnum}});
        const item = items.find(item=> item.vnum===vnum);

        this.drawString(`{D:------------------------[ {R${vnum}{D ]------------------------:`);
        this.drawString(`{Dnames: {w${item.names.join()}`);
        this.drawString(`{Dshort: {w${item.short}`);
        this.drawString(`{Dlong: {w${item.long}`);
        this.drawString(`{Ditem type: {w${item.itemType}`);
        this.drawString(`{Dlevel: {w${item.level}`);
        this.drawString(`{Drarity: {w${item.rarity}`);
        this.drawString(`{Dmaterial: {w${item.material.join()}`);
        this.drawString(`{Dsubmaterial: {w${item.submaterial.join()}`);
        this.drawString(`{Dweight: {w${item.weight}`);
        this.drawString(`{Dcost: {w${item.cost}`);
        if(item.extraflags.length){
          this.drawString(`{Dextra flags: {w${item.extraflags.join()}`);
        }else{
          this.drawString('{Dextra flags: {w-none-');
        } //end if
        this.drawString(`{Dtotal allowed: {w${item.totalAllowed}`);
        this.drawString(`{Dtotal current: {w${item.totalCurrent}`);
        if(item.wearFlags.length){
          this.drawString(`{Dwearable flags: {w${item.wearFlags.join()}`);
        }else{
          this.drawString('{Dwearable flags: {w-none-');
        } //end if
        this.drawString('{Dfurniture flags: {w');
        this.drawString(`{t{Dmax people: {w${item.furniture.maxPeople}`);
        this.drawString(`{t{Dmax weight: {w${item.furniture.maxWeight}`);
        this.drawString(`{t{Dheal bonus: {w${item.furniture.healBonus}`);
        this.drawString(`{t{Dmana bonus: {w${item.furniture.manaBonus}`);
        this.drawString(`{t{Dflags: {w${item.furniture.flags.join()}`);
        if(item.affects){
          this.drawString('{Daffects: ');
          item.affects.forEach(affect=>{
            this.drawString(`{t{D${affect.name}: {w${affect.amount}`);
          });
        } //end if
      }else{
        this.$router.push({query:{}});
        items.forEach(item=> this.drawItem(item));
      } //end if
    },
    drawItem(item){

      // only need to do this once on an item, for speed
      if(item.stringified) {
        this.output.push(item.stringified);
        return;
      };
      item.stringified = this.drawString(item.short);
      item.stringified.item = item; //recursive for function pointer
    },
    drawString(string){
      const colorMap = {
          R: colors.redBold,
          r: colors.red,
          G: colors.greenBold,
          g: colors.green,
          B: colors.blueBold,
          b: colors.blue,
          C: colors.cyanBold,
          c: colors.cyan,
          M: colors.magentaBold,
          m: colors.magenta,
          Y: colors.yellowBold,
          y: colors.yellow,
          w: colors.grayBold,
          D: colors.black,
          W: colors.white,
          x: colors.white,
          t: colors.tab,
          '#': colors.red
        },
        line = [];

      let i,str='',char,lastchar,flipbit,
          colorSwitch='W';

      for(i=0;i<string.length;i++){
        lastchar = char;
        char = string[i];
        if(char==='{' && !flipbit){
          flipbit = true;
        }else if(char==='{'&&flipbit){
          flipbit = false;
          str+=char;
        }else if(flipbit){
          flipbit = false;
          if(str.length){
            line.push(colorMap[colorSwitch](str));
            str = '';
            colorSwitch = char;
          }else if(char==='t'){
            line.push(colorMap[char](' '));
          }else{
            colorSwitch = char;
          } //end if
        }else{
          str+=char;
        } //end if
      } //end for
      if(str.length) line.push(colorMap[colorSwitch](str));
      this.output.push(line);
      return line;
    }
  }
};
</script>
<style lang="stylus" scoped>
.cursor
  cursor pointer
.bold
  font-weight bold
.top-button
  margin-bottom 1rem
  margin-top -1rem
.mb-2
  margin-bottom 2rem
.mx-r
  margin-left -1.5rem
  margin-right -1.5rem
.b-slider
  padding 0 1rem
</style>

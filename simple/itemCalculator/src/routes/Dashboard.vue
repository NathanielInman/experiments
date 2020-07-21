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
      output: [],
      items: []
    };
  },
  created(){
    const {query} = this.$router.currentRoute;

    this.items = items.sort((a,b)=>a.score<b.score?1:-1)
      .filter(i=>i.score>0||['pill','potion','scroll'].includes(i.itemType));
    this.load(query ? query.vnum : null);
  },
  methods: {
    returnToIndex(){
    },
    load(vnum){
      this.output.length = 0;
      if(vnum){
        this.$router.push({query: {vnum}});
        const item = this.items.find(item=> item.vnum===vnum);

        let str;

        this.drawString('{c*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*');
        this.drawString(`       {cName : {C${item.short}`);
        this.drawString(`     {cObject : {C${item.names.join(' ')}`);
        this.drawString(`      {cLevel : {C${item.level}`);
        str = `       {cType : {C${item.itemType}`;
        this.drawString(`${str}${`{cWeight : {C${item.weight}`.padStart(57-str.length)}`);
        if(item.wearFlags.length){
          this.drawString(`       {cWear : {C${item.wearFlags.join(' ')}`);
        }else{
          this.drawString(`       {cWear : {Cno`);
        } //end if
        if(item.extraflags.length){
          this.drawString(`      {cFlags : {C${item.extraflags.join(' ')}`);
        }else{
          this.drawString(`      {cFlags : {Cnone`);
        } //end if
        this.drawString(`      {cValue : {Y${Math.floor(item.cost/100)} gold{c, {x${item.cost%100} silver`);
        this.drawString(' ');
        str = `    {cCrafted : {CUnknown`;
        this.drawString(`${str}${`{cCondition  : {x${'unknown'}`.padStart(57-str.length)}`);
        str = `     {cUnique : {C${item.totalAllowed!='unlimited'}`;
        console.log(item);
        this.drawString(`${str}${`{cQuality : {x${item.quality}`.padStart(57-str.length)}`);
        str = `   {cMaterial : {x${item.material.join(' ')}`;
        this.drawString(`${str}${`{cRarity : {x${item.rarity}`.padStart(57-str.length)}`);
        this.drawString(`{cSubmaterial : {x${item.submaterial.join(' ')}`);
        if(item.itemType==='armor'){
          this.drawString(' ');
          this.drawString(`{cArmor Class: {x${item.valueFlags[0].split(/\(|\)/g)[1]} {cpierce`);
          this.drawString(`             {x${item.valueFlags[1].split(/\(|\)/g)[1]} {cbash`);
          this.drawString(`             {x${item.valueFlags[2].split(/\(|\)/g)[1]} {cslash`);
          this.drawString(`             {x${item.valueFlags[3].split(/\(|\)/g)[1]} {cvs magic`);
        }else if(item.itemType==='weapon'){
          this.drawString(' ');
          this.drawString(`{cWeapon Type : {C${item.valueFlags[0].split(/\(|\)/g)[1]}`);
          this.drawString(`     {cDamage : {C${item.valueFlags[1].split(/\(|\)/g)[1]}`);
          this.drawString(`{cDamage Type : {C${item.valueFlags[2].split(/\(|\)/g)[1]}`);
          str = item.valueFlags[3].split(/\(|\)/g)[1].split(',').join(' ');
          this.drawString(`      {cFlags : {C${!str.length?'none':str}`);
        } //end if
        if(item.affects){
          this.drawString(' ');
          item.affects.forEach(affect=>{
            this.drawString(`    {cAffects : {C${affect.name}{c by {C${(affect.amount>0?'+':'-')+affect.amount}`);
          });
        } //end if

        this.drawString('{c*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*');
        /*
        Weapon Type{C
        Crafstmanship{x
        Weapons Flags{C
        */
      }else{
        this.$router.push({query:{}});

        this.items.forEach(item=> this.drawItem(item));
      } //end if
    },
    drawItem(item){

      // only need to do this once on an item, for speed
      if(item.stringified) {
        this.output.push(item.stringified);
        return;
      };
      item.stringified = this.drawString(`${item.short} {G({g${item.score}{G)`);
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
span
  white-space pre
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

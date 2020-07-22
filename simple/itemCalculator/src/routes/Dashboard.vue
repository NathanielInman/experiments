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
  b-field(label='Armor Filter')
    b-select.mb-1(placeholder='Filter By Armor Slot',v-model='armorFilter',
      @input='load()')
      option(v-for='option in armorSlotOptions',:value='option') {{option}}
  b-field(label='Weapon Filter')
    b-select.mb-1(placeholde='Filter By Weapon Type',v-model='weaponFilter',
      @input='load()')
      option(v-for='option in weaponTypeOptions',:value='option') {{option}}
  b-checkbox(v-model='showPills',@input='load()') Show Pills
  b-checkbox(v-model='showScrolls',@input='load()') Show Scrolls
  b-checkbox(v-model='showPotions',@input='load()') Show Potions
  b-checkbox(v-model='showArmor',@input='load()') Show Armor
  b-checkbox(v-model='showWeapons',@input='load()') Show Weapons
  b-field(label='Level Restriction')
    b-slider(v-model='levelRestriction',:min='0',:max='105',@input='load()')
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
import {items} from '../items/';

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
      armorSlotOptions: [
        'none','finger','neck','body','head','legs','feet','hands','arms',
        'shield','about','waist','wrist','wield','hold','float'
      ],
      armorFilter: 'none',
      weaponTypeOptions: [
        'none', 'sword','dagger','spear','mace','axe','flail','whip',
        'polearm','staff'
      ],
      weaponFilter: 'none',
      levelRestriction: 100,
      showPills: true, showScrolls: true, showPotions: true,
      showArmor: true, showWeapons: true,
      items: items
        .sort((a,b)=> +a.score<+b.score?1:+a.score>+b.score?-1:+a.level<+b.level?1:-1)
        .filter(o=>o.score<5000)
    };
  },
  created(){
    const {query} = this.$router.currentRoute;

    this.load(query ? query.vnum : null);
    console.log(this.items);
  },
  methods: {
    returnToIndex(){
    },
    load(vnum){
      this.output.length = 0;
      if(vnum){
        this.$router.push({query:{
          vnum,
          levelRestriction: this.levelRestriction,
          showPills: this.showPills,
          showScrolls: this.showScrolls,
          showPotions: this.showPotions,
          showArmor: this.showArmor,
          showWeapons: this.showWeapons
        }});
        const item = this.items.find(item=> item.vnum===vnum);

        let str;

        this.drawString('{c*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*');
        this.drawString(`       {cName : {C${item.short}`);
        this.drawString(`     {cObject : {C${item.names.join(' ')}`);
        str = `      {cLevel : {C${item.level}`;
        this.drawString(`${str}${`{cArea : {C${item.area}`.padStart(57-str.length)}`);
        str = `       {cType : {C${item.itemType}`;
        this.drawString(`${str}${`{cWeight : {C${item.weight}`.padStart(57-str.length)}`);
        if(item.wearFlags.length){
          str = `       {cWear : {C${item.wearFlags.join(' ')}`;
          this.drawString(`${str}${`{cScore : {C${item.score}`.padStart(57-str.length)}`);
        }else{
          str = `       {cWear : {Cno`;
          this.drawString(`${str}${`{cScore : {C${item.score}`.padStart(57-str.length)}`);
        } //end if
        if(item.extraflags.length){
          this.drawString(`      {cFlags : {C${item.extraflags.join(' ')}`);
        }else{
          this.drawString(`      {cFlags : {Cnone`);
        } //end if
        this.drawString(`      {cValue : {Y${Math.floor(item.cost/100)} gold{c, {x${item.cost%100} silver`);
        this.drawString(' ');
        this.drawString(`   {cMaterial : {x${item.material.join(' ')}`)
        this.drawString(`{cSubmaterial : {x${item.submaterial.join(' ')}`);
        this.drawString(`     {cRarity : {x${item.rarity}`);
        if(item.itemType==='armor'){
          this.drawString(' ');
          this.drawString(`{cArmor Class: {x${item.valueFlags[0].split(/\(|\)/g)[1]} {cpierce`);
          this.drawString(`             {x${item.valueFlags[1].split(/\(|\)/g)[1]} {cbash`);
          this.drawString(`             {x${item.valueFlags[2].split(/\(|\)/g)[1]} {cslash`);
          this.drawString(`             {x${item.valueFlags[3].split(/\(|\)/g)[1]} {cvs magic`);
        }else if(item.itemType==='weapon'){
          this.drawString(' ');
          this.drawString(`{cWeapon Type : {C${item.valueFlags[0].split(/\(|\)/g)[1]}`);
          this.drawString(`{cDamage Type : {C${item.valueFlags[2].split(/\(|\)/g)[1]}`);
          str = item.valueFlags[3].split(/\(|\)/g)[1].split(',').join(' ');
          this.drawString(`      {cFlags : {C${!str.length?'none':str}`);
        }else if(['pill','scroll','potion'].includes(item.itemType)){
          this.drawString(' ');
          const spell1 = item.valueFlags[1].split(/\(|\)/g)[1],
                spell2 = item.valueFlags[2].split(/\(|\)/g)[1],
                spell3 = item.valueFlags[3].split(/\(|\)/g)[1],
                spell4 = item.valueFlags[4].split(/\(|\)/g)[1],
                spells = [];

          if(!spell1.includes('reserved')) spells.push(spell1);
          if(!spell2.includes('reserved')) spells.push(spell2);
          if(!spell3.includes('reserved')) spells.push(spell3);
          if(!spell4.includes('reserved')) spells.push(spell4);
          this.drawString(`{cLevel {x${item.valueFlags[0].split(/\(|\)/g)[1]} {cspells of: ${spells.join()}`);
        } //end if
        if(item.affects){
          this.drawString(' ');
          item.affects.forEach(affect=>{
            this.drawString(`    {cAffects : {C${affect.name}{c by {C${(affect.amount>0?'+':'')+affect.amount}`);
          });
        } //end if
        this.drawString('{c*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*');
      }else{
        this.$router.push({query:{
          levelRestriction: this.levelRestriction,
          showPills: this.showPills,
          showScrolls: this.showScrolls,
          showPotions: this.showPotions,
          showArmor: this.showArmor,
          showWeapons: this.showWeapons
        }});

        this.items
          .filter(item=>{
            const meetsLevel = item.level<=this.levelRestriction,
                  isOther = ['scroll','pill','potion'].includes(item.itemType);

            return item.level<=this.levelRestriction&&(
              item.itemType==='armor'&&this.showArmor&&(
                this.armorFilter==='none'||
                item.wearFlags.includes(this.armorFilter)
              )||
              item.itemType==='weapon'&&this.showWeapons&&(
                this.weaponFilter==='none'||
                item.valueFlags[0].includes(this.weaponFilter)
              )||
              item.itemType==='pill'&&this.showPills||
              item.itemType==='scroll'&&this.showScrolls||
              item.itemType==='potion'&&this.showPotions
            );
          })
          .some((item,i)=>{
            this.drawItem(item);
            if(i>20) this.drawString('{R---> {xmore than 20 results {R<--');
            return i>20; //don't render more than 10
          });
      } //end if
    },
    drawItem(item){

      // only need to do this once on an item, for speed
      if(item.stringified) {
        this.output.push(item.stringified);
        return;
      };
      item.stringified = this.drawString(`${item.short} {G({g${item.score}{G) {R({r${item.level}{R)`);
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
          X: colors.white,
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
            if(!colorMap.hasOwnProperty(colorSwitch)) console.log('ERROR',colorSwitch)
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
.mb-1
  margin-bottom 1rem
.mx-r
  margin-left -1.5rem
  margin-right -1.5rem
.b-slider
  padding 0 1rem
</style>

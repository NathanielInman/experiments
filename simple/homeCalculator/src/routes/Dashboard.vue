<template lang="pug">
section.section(style='padding-top: 0')
  .hero.is-primary.mb-2.mx-r
    .hero-body: .container
      .title Diamonds: {{diamonds}}
      .subtitle Gold: {{gold}}
  .hero.is-danger.mb-2.mx-r(v-if='errors.length')
    .hero-body: .container
      .subtitle(v-for='error in errors') {{error}}
  .container
    .columns.is-desktop
      .column
        .card
          .card-header: .card-header-title Basic
          .card-content
            b-switch.mb(v-model='locationType',true-value='house',
              false-value='manor',@input='updateCost') {{locationType}}
            br
            b-checkbox.mb(v-model='isPublic',@input='updateCost') is public
            b-checkbox.mb(v-model='hasPortal',@input='updateCost') has portal
            b-field.mb(label='Healing Rate')
              b-slider(v-model='healingRate',:min='100',:max='400',:step='10',
                @input='updateCost')
      .column
        .card
          .card-header: .card-header-title Door {{locationType=='manor'?'(house only)':''}}
          .card-content
            b-select.mb(v-model='doorType',@input='updateCost',:disabled="locationType=='manor'")
              option(value='0') wood door
              option(value='50') stone door
              option(value='100') metal door
            b-select.mb(v-model='doorLock',@input='updateCost',:disabled="locationType=='manor'")
              option(value='0') easy difficulty lock
              option(value='200') regular difficulty lock
              option(value='400') hard difficulty lock
              option(value='600') implausible difficulty lock
              option(value='800') improbable difficulty lock
              option(value='1000') impossible difficulty lock
            b-field.mb(label='Lock Level',:disabled="locationType=='manor'")
              b-slider(v-model='lockLevel',:min='50',:max='100',:step='1'
                @input='updateCost')
    .columns.is-desktop
      .column
        b-field.mb(label='Furniture Pieces')
          b-numberinput(v-model='furnitureItems',:min='0',:max='10',
            @input='updateCost')
        b-field.mb(label='Fireplaces')
          b-numberinput(v-model='fireplaceItems',:min='0',:max='10',
            @input='updateCost')
        b-field.mb(label='Fountains')
          b-numberinput(v-model='fountainItems',:min='0',:max='10',
            @input='updateCost')
      .column
        b-field.mb(label='Tradesguild Troughs')
          b-numberinput(v-model='troughItems',:min='0',:max='10',
            @input='updateCost')
        b-field.mb(label='Tradesguild Crucibles')
          b-numberinput(v-model='crucibleItems',:min='0',:max='10',
            @input='updateCost')
        b-field.mb(label='Tradesguild Anvils')
          b-numberinput(v-model='anvilItems',:min='0',:max='10',
            @input='updateCost')
        b-field.mb(label='Tradesguild Workbenches')
          b-numberinput(v-model='workbenchItems',:min='0',:max='10',
            @input='updateCost')
        b-field.mb(label='Tradesguild Forges')
          b-numberinput(v-model='forgeItems',:min='0',:max='10',
            @input='updateCost')
</template>
<script>
import Vuex from 'vuex';

const {mapActions,mapGetters,mapMutations,mapState} = Vuex;

// Prepare the main template
export default {
  name: 'Dashboard',
  computed: {
    ...mapState('user',['name'])
  },
  data(){
    return {
      locationType: 'house',
      diamonds: 1337,
      gold: 1337,
      healingRate: 100,
      hasPortal: false,
      isPublic: false,
      doorLock: 0,
      doorType: 0,
      lockLevel: 50,
      furnitureItems: 0,
      fireplaceItems: 0,
      fountainItems: 0,
      troughItems: 0,
      crucibleItems: 0,
      anvilItems: 0,
      workbenchItems: 0,
      forgeItems: 0,
      errors: []
    };
  },
  methods: {
    updateCost(){
      let items = 0;

      this.errors.length = 0;
      this.diamonds = 0;
      if(this.locationType==='house'){
        this.diamonds += (this.healingRate - 100)/10*125;
      }else{
        if(this.healingRate<150){
          this.errors.push('Default healing rate for manor is 150');
        }else{
          this.diamonds += (this.healingRate - 150)/10*125;
        } //end if
        this.doorLock = 0;
        this.doorType = 0;
        this.lockLevel = 50;
      } //end if
      if(this.healingRate>300&&this.isPublic) this.errors.push('Public location may not have healing rate above 300%');
      if(this.healingRate>300&&this.locationType==='house') this.errors.push('House location may not have healing rate above 300%');
      if(this.hasPortal) this.diamonds += 400;
      this.diamonds += +this.doorLock;
      this.diamonds += +this.doorType;
      this.diamonds += (this.lockLevel - 50) * 10;
      this.diamonds += this.furnitureItems * 25;
      items += this.furnitureItems;
      this.diamonds += this.fireplaceItems * 50;
      items += this.fireplaceItems;
      this.diamonds += this.fountainItems * 150;
      items += this.fountainItems;
      this.diamonds += this.troughItems * 50;
      items += this.troughItems;
      this.diamonds += this.crucibleItems * 100;
      items += this.crucibleItems;
      this.diamonds += this.anvilItems * 250;
      items += this.anvilItems;
      this.diamonds += this.workbenchItems * 250;
      items += this.workbenchItems;
      this.diamonds += this.forgeItems * 500;
      items += this.forgeItems;
      this.gold = this.diamonds * 110;
      if(this.locationType==='house'&&items > 10) this.errors.push(`Total items (${items}) exceeds 10 for houses`);
      if(this.locationType==='manor'&&items > 15) this.errors.push(`Total items (${items}) exceeds 15 for manors`);
    }
  }
};
</script>
<style lang="stylus" scoped>
.bold
  font-weight bold
.mb
  margin-bottom 1rem
.mb-2
  margin-bottom 2rem
.mx-r
  margin-left -1.5rem
  margin-right -1.5rem
.b-slider
  padding 0 1rem
</style>

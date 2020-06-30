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
        .card.mb
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
      .column(v-if='locationType=="house"')
        .card.mb
          .card-header: .card-header-title Door
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
    .columns(v-if='locationType=="manor"&&!isPublic'): .column: .card.mb
      .card-header: .card-header-title Henchmen
      .card-content
        b-switch.mb(v-model='henchmenAll',@input='upgradeHenchmenAll') Toggle All
        p.mb.
          Starting abilities: dark vision, regeneration, detect invisibility, detect hidden, dodge, parry, kick. Weapons are free.
        .columns.is-desktop
          .column
            .title General Upgrades
            b-checkbox.mb.mr(v-model='henchmenSanctuary',@input='updateCost') Sanctuary
            b-checkbox.mb.mr(v-model='henchmenHaste',@input='updateCost') Haste
            b-checkbox.mb.mr(v-model='henchmenPhase',@input='updateCost') Phase
            b-checkbox.mb.mr(v-model='henchmenProtection',@input='updateCost') Protection (either evil or good)
            b-checkbox.mb.mr(v-model='henchmenSneak',@input='updateCost') Sneak
            b-checkbox.mb.mr(v-model='henchmenFly',@input='updateCost') Fly
            b-checkbox.mb(v-model='henchmenInvisibility',@input='updateCost') Invisibility
          .column
            .title Offensive Abilities
            b-checkbox.mb.mr(v-model='henchmenCriticalStrike',@input='updateCost') Critical Strike
            b-checkbox.mb.mr(v-model='henchmenCounter',@input='updateCost') Counter
            b-checkbox.mb.mr(v-model='henchmenDirtKick',@input='updateCost') Dirt Kick
            b-checkbox.mb.mr(v-model='henchmenDisarm',@input='updateCost') Disarm
            b-checkbox.mb.mr(v-model='henchmenBerserk',@input='updateCost') Berserk
            b-checkbox.mb.mr(v-model='henchmenBash',@input='updateCost') Bash
            b-checkbox.mb(v-model='henchmenTrip',@input='updateCost') Trip
        .columns.is-desktop
          .column
            .title Major Resistances
            b-checkbox.mb.mr(v-model='henchmenResistMonk',@input='updateCost') Monk
            b-checkbox.mb.mr(v-model='henchmenResistMagic',@input='updateCost') Magic
            b-checkbox.mb.mr(v-model='henchmenResistPierce',@input='updateCost') Pierce
            b-checkbox.mb.mr(v-model='henchmenResistSlash',@input='updateCost') Slash
            b-checkbox.mb.mr(v-model='henchmenResistBash',@input='updateCost') Bash
          .column
            .title Minor Resistances
            b-checkbox.mb.mr(v-model='henchmenResistWood',@input='updateCost') Wood
            b-checkbox.mb.mr(v-model='henchmenResistSilver',@input='updateCost') Silver
            b-checkbox.mb.mr(v-model='henchmenResistIron',@input='updateCost') Iron
            b-checkbox.mb.mr(v-model='henchmenResistLight',@input='updateCost') Light
            b-checkbox.mb.mr(v-model='henchmenResistPoison',@input='updateCost') Poison
            b-checkbox.mb.mr(v-model='henchmenResistHoly',@input='updateCost') Holy
            b-checkbox.mb.mr(v-model='henchmenResistEnergy',@input='updateCost') Energy
            b-checkbox.mb.mr(v-model='henchmenResistDisease',@input='updateCost') Disease
            b-checkbox.mb.mr(v-model='henchmenResistFire',@input='updateCost') Fire
            b-checkbox.mb.mr(v-model='henchmenResistCold',@input='updateCost') Cold
            b-checkbox.mb.mr(v-model='henchmenResistLightning',@input='updateCost') Lightning
            b-checkbox.mb(v-model='henchmenResistAcid',@input='updateCost') Acid
    .columns.is-desktop
      .column
        .card.mb
          .card-header: .card-header-title Basic Furniture
          .card-content
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
        .card.mb
          .card-header: .card-header-title Tradesguild Furniture
          .card-content
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
      locationType: 'manor',
      diamonds: 0,
      gold: 0,
      healingRate: 150,
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
      henchmenAll: false,
      henchmenSanctuary: false,
      henchmenHaste: false,
      henchmenPhase: false,
      henchmenProtection: false,
      henchmenSneak: false,
      henchmenFly: false,
      henchmenInvisibility: false,
      henchmenCriticalStrike: false,
      henchmenCounter: false,
      henchmenDirtKick: false,
      henchmenDisarm: false,
      henchmenBerserk: false,
      henchmenBash: false,
      henchmenTrip: false,
      henchmenResistMonk: false,
      henchmenResistMagic: false,
      henchmenResistPierce: false,
      henchmenResistSlash: false,
      henchmenResistBash: false,
      henchmenResistWood: false,
      henchmenResistSilver: false,
      henchmenResistIron: false,
      henchmenResistLight: false,
      henchmenResistPoison: false,
      henchmenResistHoly: false,
      henchmenResistEnergy: false,
      henchmenResistDisease: false,
      henchmenResistFire: false,
      henchmenResistCold: false,
      henchmenResistLightning: false,
      henchmenResistAcid: false,
      errors: []
    };
  },
  methods: {
    acquireHenchmenStatus(){
      this.henchmenSanctuary = this.henchmenAll;
      this.henchmenHaste = this.henchmenAll;
      this.henchmenPhase = this.henchmenAll;
      this.henchmenProtection = this.henchmenAll;
      this.henchmenSneak = this.henchmenAll;
      this.henchmenFly = this.henchmenAll;
      this.henchmenInvisibility = this.henchmenAll;
      this.henchmenCriticalStrike = this.henchmenAll;
      this.henchmenCounter = this.henchmenAll;
      this.henchmenDirtKick = this.henchmenAll;
      this.henchmenDisarm = this.henchmenAll;
      this.henchmenBerserk = this.henchmenAll;
      this.henchmenBash = this.henchmenAll;
      this.henchmenTrip = this.henchmenAll;
      this.henchmenResistMonk = this.henchmenAll;
      this.henchmenResistMagic = this.henchmenAll;
      this.henchmenResistPierce = this.henchmenAll;
      this.henchmenResistSlash = this.henchmenAll;
      this.henchmenResistBash = this.henchmenAll;
      this.henchmenResistWood = this.henchmenAll;
      this.henchmenResistSilver = this.henchmenAll;
      this.henchmenResistIron = this.henchmenAll;
      this.henchmenResistLight = this.henchmenAll;
      this.henchmenResistPoison = this.henchmenAll;
      this.henchmenResistHoly = this.henchmenAll;
      this.henchmenResistEnergy = this.henchmenAll;
      this.henchmenResistDisease = this.henchmenAll;
      this.henchmenResistFire = this.henchmenAll;
      this.henchmenResistCold = this.henchmenAll;
      this.henchmenResistLightning = this.henchmenAll;
      this.henchmenResistAcid = this.henchmenAll;
    },
    upgradeHenchmenAll(){
      this.henchmenAll = !!this.henchmenAll;
      this.acquireHenchmenStatus();
      this.$forceUpdate();
      this.updateCost();
    },
    updateCost(){
      let items = 0;

      this.errors.length = 0;
      this.diamonds = 0;
      if(this.locationType==='house'){
        this.diamonds += (this.healingRate - 100)/10*125;
        this.henchmenAll = false;
        this.acquireHenchmenStatus();
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
      if(!this.isPublic){
        if(this.henchmenSanctuary) this.diamonds += 125;
        if(this.henchmenHaste) this.diamonds += 100;
        if(this.henchmenPhase) this.diamonds += 100;
        if(this.henchmenProtection) this.diamonds += 50;
        if(this.henchmenSneak) this.diamonds += 25;
        if(this.henchmenFly) this.diamonds += 25;
        if(this.henchmenInvisibility) this.diamonds += 25;
        if(this.henchmenCriticalStrike) this.diamonds += 100;
        if(this.henchmenCounter) this.diamonds += 100;
        if(this.henchmenDirtKick) this.diamonds += 75;
        if(this.henchmenDisarm) this.diamonds += 75;
        if(this.henchmenBerserk) this.diamonds += 50;
        if(this.henchmenBash) this.diamonds += 25;
        if(this.henchmenTrip) this.diamonds += 10;
        if(this.henchmenResistMonk) this.diamonds += 100;
        if(this.henchmenResistMagic) this.diamonds += 100;
        if(this.henchmenResistPierce) this.diamonds += 50;
        if(this.henchmenResistSlash) this.diamonds += 50;
        if(this.henchmenResistBash) this.diamonds += 50;
        if(this.henchmenResistWood) this.diamonds += 25;
        if(this.henchmenResistSilver) this.diamonds += 25;
        if(this.henchmenResistIron) this.diamonds += 25;
        if(this.henchmenResistLight) this.diamonds += 25;
        if(this.henchmenResistPoison) this.diamonds += 25;
        if(this.henchmenResistHoly) this.diamonds += 25;
        if(this.henchmenResistEnergy) this.diamonds += 25;
        if(this.henchmenResistDisease) this.diamonds += 25;
        if(this.henchmenResistFire) this.diamonds += 25;
        if(this.henchmenResistCold) this.diamonds += 25;
        if(this.henchmenResistLightning) this.diamonds += 25;
        if(this.henchmenResistAcid) this.diamonds += 25;
      } //end if
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
.mr
  margin-right 1rem
.mb-2
  margin-bottom 2rem
.mx-r
  margin-left -1.5rem
  margin-right -1.5rem
.b-slider
  padding 0 1rem
</style>

import {contraction} from './contraction';

export const types = [
  {id: 0, name: 'Unknown', abbreviation: '?'}, //error control
  {id: 1, name: 'Noun', abbreviation: 'n'},
  {id: 2, name: 'Verb', abbreviation: 'v'},
  {id: 3, name: 'Adjective', abbreviation: 'j|aj'},
  {id: 4, name: 'Adverb', abbreviation: 'r|av'},
  {id: 5, name: 'Slang', abbreviation: 's$'}, //not used in lexicon
  {id: 6, name: 'Preposition', abbreviation: 'p|pp'},
  {id: 7, name: 'Article', abbreviation: 'p'},
  {id: 8, name: 'Determiner', abbreviation: 'd'},
  {id: 9, name: 'Conjunction', abbreviation: 'c'},
  {id: 10, name: 'Complimentizer', abbreviation: 'cm'},
  {id: 11, name: 'Interjection', abbreviation: 'x'},
  {id: 12, name: 'Punctuation', abbreviation: 'pct|pt'},
  {id: 13, name: 'Pronoun', abbreviation: 'P'}, //not used in lexicon
  {id: 14, name: 'Number', abbreviation: 'num|#'}, //not used in lexicon
  {id: 15, name: 'Auxiliary Verb', abbreviation: 'av'}, //not used in lexicon
  { //not used in lexicon
    id: 16,
    name: 'Contraction',
    abbreviation: 'cx',
    fn: contraction
  }
];


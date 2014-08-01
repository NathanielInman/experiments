/******************************************************************************************************************\
 *                                                                                                                *
 * Deep Linguistic Processing written in JavaScript by Nathaniel Inman (c) 2014                                   *
 *                                                                                                                *
 *================================================================================================================*
 * Description:                                                                                                   *
 *                                                                                                                *
 * This projects was intended to originally understand english grammar but fell way beyond the scope of that      *
 * as I began to research more into how to structure representations of such grammar. I owe much of the           *
 * more complicated explanations of the grammar to the LinGo English Resource Grammar project referenced below.   *
 * No actual code or structures were used other than their acronyms after extensive analysis and familiarity from *
 * using the ERG during my study.                                                                                 *
 *----------------------------------------------------------------------------------------------------------------*
 * Credits:                                                                                                       *
 *                                                                                                                *
 * Influenced by ERG, being developed by Center for the Study of Language and Information at Stanford University  *
 * Influenced by ERG using DLP with Head-Driven Phrase Structure Grammar by DELPH-IN at the University of Oslo    *
 * Most aptly used resource was : http://erg.delph-in.net/                                                        *
 *                                                                                                                *
 * Dan Flickinger, Emily M. Bender, Stephan Oepen. 2014.                                                          *
 * Towards an Encyclopedia of Compositional Semantics: Documenting the Interface of the English Resource Grammar. *
 * Proceedings of the Ninth International Conference on Language Resources and Evaluation (LREC-2014).            *
\******************************************************************************************************************/

/*
Lexical Types
	[Part of Speech]
		v                   = verb
		n                   = noun
		aj                  = adjective
		av                  = adverb
		p                   = preposition
		pp                  = prepositional phrase
		d                   = determiner
		c                   = conjunction
		cm                  = complementizer
		x                   = miscellaneous
		pt                  = punctuation
	[Order Sequence of Compliments]
		np                  = Noun phrase (no longer obligatorily awaiting a specifier)
		vp                  = Verb Phrase (not yet subject-saturated)
		cp                  = Sentential Complement (With or without an overt complementizer)
		pp                  = Prepositional Phrase (complement-saturated)
		ap                  = Adjective Phrase
		prd                 = Predicate Phrase (including CP,AP, PP
		p                   = particle (semantically empty)
		it                  = expletive 'it'
		nb                  = nominal phrase (not yet specifier-saturated)
		adv                 = Adverb Phrase
		vpslnp              = Verb Phrase Containing an NP gap
		xp                  = Underspecified Category
Rules Abbreviations
	[Main Abbreviations]
		hd                  = head
		hdn                 = nominal head
		nh                  = non-head
		sb                  = subject
		sp                  = specifier
		cmp                 = complement
		aj                  = adjunct
		flr                 = filler
		mrk                 = marker
		np                  = nominal phrase
		cl                  = clause
		vp                  = verb phrase
		pp                  = prepositional phrase
		n                   = noun
		v                   = verb
		j                   = adjective
		r                   = adverb
		p                   = preposition
		num                 = number
		prdp                = predicative adjective phrase
		vpr                 = predicative verb phrase
		ppr                 = predicative prepositional phrase
		mnp                 = measure noun phrase
		pct                 = punctuation mark
	[Types]
		_ilr                = orth-invariant inflectional rule
		_olr                = orth-changing inflectional rule
		_dlr                = orth-invariant derivational rule
		_odlr               = orth changing derivation rule
		_plr                = punctuation affixation rule
		_c                  = syntactic construction
 */
var DLP;
(function(DLP){
	DLP.lexicon=[]; //will be used to hold all of the label types words will be associated with index# -> DLookup
	DLP.dictionary={}; //will be used to hold all of the words
	DLP.lexicon.push(
		'n_pl_olr', //            0   = Plural noun with |-s| suffix               << cats
	    'n_sg_ilr', //            1   = Singular noun                              << cat 
		'n_ms_ilr=2', //          2   = Mass noun                                  << rice 
		'n_ms-cnt_ilr', //        3   = Mass or count noun                         << [unknown noun] 
		'n_pl-cur_ilr', //        4   = Plural of currency noun: no |-s|           << $ 
		'v_3s-fin_olr', //        5   = Third-singular present verb                << admires 
		'v_n3s-bse_ilr', //       6   = Non-3sing or base form verb                << admire 
		'v_pst_olr', //           7   = Past tense verb                            << admired 
		'v_psp_olr', //           8   = Past particple verb                        << admired 
		'v_prp_olr', //           9   = Present participle verb                    << admiring 
		'v_prp-nf_olr', //        10  = Present participle verb, nonformal         << admirin 
		'v_pas_odlr', //          11  = Passive verb                               << admired 
		'v_pas-p_odlr', //        12  = Prepositional passive verb                 << referred to 
		'v_pas-p-t_odlr', //      13  = Prep. passive of trans. verb               << added to 
		'v_pas-dat_odlr', //      14  = Passive of dative shift verb               << given 
		'v_pas-cp_odlr', //       15  = Passive of cp-complement verb              << said 
		'v_aux-sb-inv_dlr', //    16  = Subject-auxiliary inversion                << Did they arrive? 
		'v_aux-advadd_dlr', //    17  = Addition of adverb as complement           << They did not arrive. 
		'v_aux-tag_dlr', //       18  = Tag question auxiliary                     << He arrived, didn't he? 
		'v_aux-ell-ref_dlr', //   19  = Elided VP compl, referentl subj            << He did. 
		'v_aux-ell-xpl_dlr', //   20  = Elided VP compl, expletive subj            << It did. 
		'v_dat_dlr', //           21  = Dative shift alternation                   << They gave the book to him. 
		'v_np-prtcl_dlr', //      22  = Particle-NP reordering                     << He looked the answer up. 
		'v_inv-quot_dlr', //      23  = Main verb inversion for quoting            << He left, said Kim. 
		'v_nger-intr_dlr', //     24  = Nominal gerund of intrans verb             << Leaving was easy. 
		'v_nger-pp_dlr', //       25  = Nominal gerund of PP-comp verb             << Relying on Kim was wrong. 
		'v_nger-tr_dlr', //       26  = Nominal gerund of trans verb               << The hiring of Kim was OK. 
		'det_prt-of-agr_dlr', //  27  = Partitive NP, PP-of, num agrmt             << Some of us are ready. 
		'det_prt-of-nagr_dlr', // 28  = Partitive NP, PP-of, no agrmt              << Each of us is ready 
		'det_prt-nocmp_dlr', //   29  = Partitive NP, no PP complement             << Most arrived. part_nocomp 
		'n_bipart_dlr', //        30  = Relax bipartite constraint                 << The scissors isn't sharp. 
		'n_n-ed_odlr', //         31  = Noun with |-ed| suffix as adj              << Long-eared sheep slept.
		'v_v-re_dlr', //          32  = Verb with |re-| prefix                     << He re-tied his shoe. 
		'v_v-pre_dlr', //         33  = Verb with |pre-| prefix                    << He pre-signed the check. 
		'v_v-mis_dlr', //         34  = Verb with |mis-| prefix                    << He mis-tied his shoe. 
		'v_v-co_dlr', //          35  = Verb with |co-| prefix                     << He co-wrote the paper. 
		'n_det-mnth_dlr', //      36  = Month name as determiner                   << July tenth arrived. 
		'n_det-wkdy_dlr', //      37  = Weekday name as determiner                 << We arrived Sunday morning. 
		'j_n-minut_dlr ', //      38  = Integer as minute name                     << Ten sixteen is too late. 
		'j_att_dlr', //           39  = Attrib adj from trans pred adj             << A similar cat arrived. 
		'v_j-nb-intr_dlr', //     40  = Attrib adj from intrans verb               << The sleeping cat stirred. 
		'v_j-nb-prp-tr_dlr', //   41  = Attr adj from trans prp verb               << The admiring crowd ran. 
		'v_j-nb-pas-tr_dlr', //   42  = Attr adj from trans passive verb           << The hired consultant left. 
		'v_j-nme-intr_dlr', //    43  = Attr adj from intr verb, nme mod           << The smiling Abrams won. 
		'v_j-nme-tr_dlr', //      44  = Attr adj from trns verb, nme mod           << Our winning Abrams smiled. 
		'w_italics_dlr', //       45  = Italicized word made into NP               << Some say /windshield/. 
		'w_period_plr', //        46  = Period affixed to end of word              << cat. 
		'w_qmark_plr', //         47  = Question mark affixed to word              << cat? 
		'w_qqmark_plr', //        48  = Double question mark affixed               << cat?? 
		'w_qmark-bang_plr', //    49  = Qmark and exclam point affixed             << cat?! 
		'w_comma_plr', //         50  = Comma affixed                              << cat, 
		'w_bang_plr', //          51  = Exclamation point affixed                  << cat! 
		'w_semicol_plr', //       52  = Semicolon affixed                          << cat; 
		'w_rparen_plr', //        53  = Right parenthesis affixed                  << cat) 
		'w_comma-rp_plr', //      54  = Comma wrongly before right paren           << cat,) 
		'w_lparen_plr', //        55  = Left parenthesis prefixed                  << (cat 
		'w_rbrack_plr', //        56  = Right square bracket affixed               << cat] 
		'w_lbrack_plr', //        57  = Left square bracket prefixed               << [cat 
		'w_dqright_plr', //       58  = Double quote affixed to end                << cat" 
		'w_dqleft_plr', //        59  = Double quote prefixed                      << "cat 
		'w_sqright_plr', //       60  = Single quote affixed to end                << cat' 
		'w_sqleft_plr', //        61  = Single quote prefixed                      << 'cat 
		'w_hyphen_plr', //        62  = Hyphen affixed to end                      << cat- 
		'w_comma-nf_plr', //      63  = Nonformal comma affixed                    << cat, 
		'w_italright_plr', //     64  = Italics mark |iยฆ| affixed                 << catiยฆ 
		'w_italleft_plr', //      65  = Italics mark |ยฆi| prefixed                << ยฆicat 
		'w_drop-ileft_plr', //    66  = Ignored italics mark affixed               << catiยฆ 
		'w_drop-iright_plr', //   67  = Ignored italics mark prefixed              << catiยฆ 
		'sb-hd_mc_c', //          68  = Head+subject, main clause                  << C arrived. 
		'sb-hd_nmc_c', //         69  = Hd+subject, embedded clause                << B thought [C arrived]. 
		'sb-hd_q_c', //           70  = Hd+subj, in-situ WH                        << B ate what? 
		'hd-cmp_u_c', //          71  = Hd+complement                              << B [hired C]. 
		'sp-hd_n_c', //           72  = Hd+specifier, nonhd = sem hd               << [Every cat] slept. 
		'sp-hd_hc_c', //          73  = Hd+specifier, hd = sem hd                  << The [very old] cat slept. 
		'aj-hd_scp_c', //         74  = Hd+preceding scopal adjunct                << Probably B won. 
		'aj-hd_scp-xp_c', //      75  = Hd+prec.scop.adj, VP head                  << B [probably won]. 
		'aj-hd_scp-pr_c', //      76  = Hd+pr.scop.adj, VP hd, prd pnct            << If C loses, B wins. 
		'aj-hd_int_c', //         77  = Hd+prec.intersective adjunct               << B [quickly left]. 
		'aj-hd_adjh_c', //        78  = Hd+prec.int.adjnct, hd modified            << B [quickly, quietly left]. 
		'aj-hd_int-inv_c', //     79  = Hd+prec.int.adjnct, hd inverted            << On Tuesday, can you stay? 
		'aj-hd_int-rel_c', //     80  = Hd+prec.int.adjnct, hd rel-vp              << which [on Tuesday met Kim] 
		'hd-aj_scp_c', //         81  = Hd+following scopal adjunct                << B wins if C loses. 
		'hd-aj_scp-pr_c', //      82  = Hd+foll.scop.adjnct, paird pnct            << B wins, if C loses. 
		'hd-aj_int-unsl_c', //    83  = Hd+foll.int.adjct, no gap                  << B [left quietly]. 
		'hd-aj_int-sl_c', //      84  = Hd+foll.int.adjct, gap in adj              << That cafe, we [dined in]. 
		'hd-aj_vmod_c', //        85  = Hd+foll.int.adjct, prec. NP cmp            << B [saw here] a big parade. 
		'hd-aj_vmod-s_c', //      86  = Hd+foll.scop.adjct, prec. NP cmp           << B [saw here] a big parade. 
		'aj-hdn_norm_c', //       87  = Nominal head + preceding adjnct            << The [big cat] slept. 
		'aj-hdn_adjn_c', //       88  = NomHd+prec.adj, hd pre-modified            << The [big old cat] slept. 
		'hdn-aj_rc_c', //         89  = NomHd+following relative clause            << The [cat we chased] ran. 
		'hdn-aj_rc-pr_c', //      90  = NomHd+foll.rel.cl, paired pnct             << A [cat, which ran,] fell. 
		'hdn-aj_redrel_c', //     91  = NomHd+foll.predicative phrase              << A [cat in a tree] fell. 
		'hdn-aj_redrel-pr_c', //  92  = NomHd+foll.prd.phr, paired pnct            << A [cat, in a tree,] fell. 
		'cl_rc-fin-nwh_c', //     93  = Rel.clause from fin.S, no relpr            << The cat [we chased] ran. 
		'cl_rc-inf-nwh_c', //     94  = Rel.cl. fr.infin VP, non-sb gap            << People [to admire] sang. 
		'cl_rc-inf-nwh-sb_c', //  95  = Rel.cl. from infin VP, subj gap            << Dogs [to chase cats] run. 
		'cl_rc-instr_c', //       96  = Rel.cl. fr.inf.VP,no gap, instr            << Money [to buy lunch] fell. 
		'vp_rc-redrel_c', //      97  = Rel.cl. from predicative VP                << Dogs [chasing cats] bark. 
		'hd_optcmp_c', //         98  = Head discharges optional compl             << B [ate] already. 
		'hdn_optcmp_c', //        99  = HomHd discharges opt complement            << The [picture] appeared. 
		'hd_xcmp_c', //           100 = Head extracts compl (to SLASH)             << Who does B [admire] now? 
		'hd_xsb-fin_c', //        101 = Extract subject from finite hd             << Who do you think [went?] 
		'hd_xaj-int-vp_c', //     102 = Extract int.adjunct from VP                << Here we [stand.] 
		'hd_xaj-tmp_c', //        103 = Extract temporal adjnct from VP            << the day we [arrived] 
		'flr-hd_nwh_c', //        104 = Filler-head, non-wh filler                 << Kim, we should hire. 
		'flr-hd_nwh-nc_c', //     105 = Fill-head, non-wh, no comma                << Kim we should hire. 
		'flr-hd_wh-mc_c', //      106 = Fill-head, wh non-subj, main cl            << Who did they hire? 
		'flr-hd_wh-mc-sb_c', //   107 = Fill-head, wh subj, main cl                << Who left? 
		'flr-hd_wh-nmc-fin_c', // 108 = Fill-head, wh, fin hd, embed cl            << B wondered [who won.] 
		'flr-hd_wh-nmc-inf_c', // 109 = Fill-head, wh, inf hd, embed cl            << B knew [who to hire.] 
		'flr-hd_rel-fin_c', //    110 = Fill-head, finite, relative cls            << people [who slept] 
		'flr-hd_rel-inf_c', //    111 = Fill-head, inf, relative cls               << people [on whom to rely] 
		'hd_imp_c', //            112 = Imperative clause from base VP             << Hire Browne! 
		'hd_yesno_c', //          113 = Yes-no question from inverted S            << Did B arrive? 
		'hd_inv-nwh_c', //        114 = Inverted non-wh declarative cls            << Never [has B won here.] 
		'hdn_bnp_c', //           115 = Bare noun phrase (no determiner)           << [Cats] sleep. 
		'hdn_bnp-pn_c', //        116 = Bare NP from proper name                   << [Browne] arrived. 
		'hdn_bnp-num_c', //       117 = Bare NP from number                        << [42] is even. 
		'hdn_bnp-qnt_c', //       118 = NP from already-quantified dtr             << [Some in Paris] slept. 
		'hdn_bnp-sg-nmod_c', //   119 = NP fr. detless bare sg N-N cpnd            << It was at [eye level.] 
		'hdn_bnp-sg-jmod_c', //   120 = NP fr. detless bare sg adj+noun            << It was at [close range.] 
		'hdn_bnp-sg-nomod_c', //  121 = NP fr. detless bare sg unmodfd             << It was within [range.] 
		'hdn_bnp-vger_c', //      122 = NP from verbal gerund                      << Hiring them was easy. 
		'np-hdn_cpd_c', //        123 = Compound from proper-name+noun        << The [IBM report] arrived. 
		'np-hdn_ttl-cpd_c', //    124 = Compound from title+proper-name       << [Professor Browne] left. 
		'np-hdn_nme-cpd_c', //    125 = Compound from two proper names        << [Pat Browne] left. 
		'np-hdn_num-cpd_c', //    126 = Compound from noun+number             << Do [problem 6] first. 
		'np-hdn_cty-cpd_c', //    127 = Compound from city+state names        << [Portland, Oregon] grew. 
		'n-hdn_cpd_c', //         128 = Compound from two normal nouns        << The [guard dog] barked. 
		'n-hdn_j-n-cpd_c', //     129 = Compound from noun+[adj+noun]         << kitchen heavy appliance 
		'n-hdn_ttl-cpd_c', //     130 = Compound from noun+posthd-title       << at Bygdin [mountain lodge] 
		'n-nh_vorj-cpd_c', //     131 = Compound from noun+verb-or-adj        << a [snow-covered] town 
		'n-nh_j-cpd_c', //        132 = Compound from noun+adj                << a [dog-friendly] town 
		'j-n_n-ed_c', //          133 = Adj-phr from adj + noun+ed            << the [long eared] dog 
		'hdn-np_app_c', //        134 = Appositive NP from two NPs            << [Joe the plumber] spoke. 
		'hdn-np_app-pr_c', //     135 = Appositive fr.two NPs, w/commas       << [Joe, the plumber,] spoke. 
		'hdn-np_app-idf_c', //    136 = Appositive with indef.NP modifr       << [Joe, a plumber,] spoke. 
		'hdn-np_app-idf-p_c', //  137 = Appositive, indef.NP, parnthszd       << [Joe (a plumber)] spoke. 
		'hdn-np_app-nbr_c', //    138 = Appositive with N-bar modifier        << Kim, president of the PTA 
		'np_adv_c', //            139 = Modifier phrase from NP               << B arrived [this week.] 
		'np_adv-yr_c', //         140 = Modifier phrase from year NP          << Jan. 11 [2008] arrived. 
		'np_adv-mnp_c', //        141 = Modifier phrase from measure NP       << Markets fell [50 points.] 
		'hdn_np-num_c', //        142 = NP from number                        << [700 billion] is too much. 
		'hdn_num-seq_c', //       143 = NP from sequence of numbers           << The number is [48 205 53.] 
		'hdn_color_c', //         144 = noun from color adjective             << [Red] suits you. 
		'num-n_mnp_c', //         145 = Measure NP from number+noun           << A [two liter] jar broke. 
		'n-num_mnp_c', //         146 = Measure NP from meas-symbol+num       << We dislike [$6] fuel. 
		'n_mnp_c', //             147 = Measure NP from bare noun             << This road is [miles] long. 
		'mnp_deg_c', //           148 = Degree phrase from measure NP         << Trees are [5 meters] tall. 
		'num_det_c', //           149 = Determiner from number                << [Ten cats] slept. 
		'num_prt-nc_c', //        150 = Partitive NP fr.number, no cmp        << [Six] were sleeping. 
		'num_prt-of_c', //        151 = Partitive fr.number, of_PP cmp        << [Six] of them slept. 
		'num_prt-det-nc_c', //    152 = Partitive fr.det+number, no cmp       << [These six] slept. 
		'num_prt-det-of_c', //    153 = Partitive fr.det+num, of-PP cmp       << [The first of them] left. 
		'np_prt-poss_c', //       154 = Partitive fr. possessive NP           << [The cat's] is empty. 
		'np-prdp_vpmod_c', //     155 = Modifier from pred.small clause       << We ran, [Kim petrified]. 
		'np_voc-post_c', //       156 = Vocative modifier fr.NP, postmod      << Where are we, [Kim?] 
		'np_voc-pre_c', //        157 = Vocative modifier, premod             << [Kim,] where are we? 
		'cl_np-wh_c', //          158 = NP from WH clause                     << [What he saw] scared him. 
		'vp_cp-sb_c', //          159 = VP requiring non-WH clausal subj      << That B won [bothered C.] 
		'vp_cp-sb-inf_c', //      160 = VP requiring non-WH inf.cls subj      << For B to win [bothered C.] 
		'vp_np-ger_c', //         161 = NP from verbal gerund                 << Winning money [pleased C.] 
		'vp_sbrd-prd-prp_c', //   162 = Pred.subord phr from prp-VP           << Kim arrived, [smiling.] 
		'vp_sbrd-prd-pas_c', //   163 = Pred.subord phr from passive VP       << Kim arrived, [inspired.] 
		'vp_sbrd-prd-aj_c', //    164 = Pred.subord phr from adjctv phr       << Kim arrived, [very happy.] 
		'vp_sbrd-prd-ell_c', //   165 = Pred.subord phr, modfs ellip.VP       << Kim might, [given time.] 
		'j_sbrd-pre_c', //        166 = Pred.subord phr fr.adj, prehead       << [Unhappy,] we left. 
		'vp_sbrd-pre_c', //       167 = Pred.subord phr fr.VP, prehead        << [Seeing Kim] they left. 
		'vp_sbrd-pre-lx_c', //    168 = Pred.subord phr fr.lex VP, prehd      << [Smiling,] Kim arose. 
		'hd-cl_fr-rel_c', //      169 = Free relative clause                  << We run whenever Kim runs. 
		'mrk-nh_evnt_c', //       170 = Marker + event-based complement       << B sang [and danced.] 
		'mrk-nh_cl_c', //         171 = Marker + clause                       << B sang [and C danced.] 
		'mrk-nh_ajlex_c', //      172 = Marker + lexical adjective            << Old [and young] cats ran. 
		'mrk-nh_nom_c', //        173 = Marker + NP                           << Cats [and some dogs] ran. 
		'mrk-nh_n_c', //          174 = Marker + N-bar                        << Every cat [and dog] ran. 
		'mrk-nh_atom_c', //       175 = Paired marker + phrase                << [Both B] and C arrived. 
		'vp-vp_crd-fin-t_c', //   176 = Conjnd VP, fin, top                   << B [sees C and chases D.] 
		'vp-vp_crd-fin-m_c', //   177 = Conjnd VP, fin, mid                   << B rose, [sang, & chased D.]
		'vp-vp_crd-fin-im_c', //  178 = Conjnd VP, fin, mid, no comma         << B rose [sang & chased D.] 
		'vp-vp_crd-nfin-t_c', //  179 = Conjnd VP, nonfin, top                << B'll [see C and chase D.] 
		'vp-vp_crd-nfin-m_c', //  180 = Conjnd VP, nonfin, mid                << B'll rise, [sing, & see D.]
		'vp-vp_crd-nfin-im_c', // 181 = Conjnd VP, nonfin, mid, no comma      << B'll rise [sing & see D.] 
		'v-v_crd-fin-ncj_c', //   182 = Conjnd V,VP, fin, no conjunctn        << B [sees C, chases D.] 
		'cl-cl_crd-t_c', //       183 = Conjoined clauses, non-int, top       << B sang and C danced. 
		'cl-cl_crd-int-t_c', //   184 = Conjnd clauses, interrog, top         << Who sang and who danced? 
		'cl-cl_crd-m_c', //       185 = Conjoined clauses, mid                << B sang, [C ran, & D sat.] 
		'cl-cl_crd-im_c', //      186 = Conjoined clauses, no cma, mid        << B sang, [C ran & D sat.] 
		'cl-cl_crd-rc-t_c', //    187 = Conjoined relative clauses            << people [who fly & who run] 
		'pp-pp_crd-t_c', //       188 = Conjnd PP, top                        << B is [in Paris and at work]
		'pp-pp_crd-m_c', //       189 = Conjnd PP, mid                        << B's [here, in P, & at work]
		'pp-pp_crd-im_c', //      190 = Conjnd PP, mid, no comma              << B's [here, in P & at work] 
		'r-r_crd-t_c', //         191 = Conjoined adjectve phrases, top       << [old and young] cats 
		'r-r_crd-m_c', //         192 = Conjoined adjectve phrases, mid       << big, [old, and sad] cats 
		'r-r_crd-im_c', //        193 = Conjoined APs, no comma, mid          << big, [old and sad] cats 
		'np-np_crd-t_c', //       194 = Conjoined noun phrases, top           << [The cat and the dog] ran. 
		'np-np_crd-i-t_c', //     195 = Conjoined accus-case pro and NP       << [Me and Kim] left. 
		'np-np_crd-i2-t_c', //    196 = Conjoined NP and accus-case pro       << [Kim and me] left. 
		'np-np_crd-i3-t_c', //    197 = Conjoined NP and nom-case pro         << B saw [Kim and I]. 
		'np-np_crd-m_c', //       198 = Conjoined noun phrases, mid           << Kim, [Pat, and Tom] ran. 
		'np-np_crd-im_c', //      199 = Conjoined NPs, no comma, mid          << Kim, [Pat and Tom] ran. 
		'np-np_crd-nc-t_c', //    200 = Conjoined NPs, no comma, top          << Buy [tapes, films.] 
		'np-np_crd-nc-m_c', //    201 = Conjoined NPs, no comma, mid          << Buy books, [tapes, films.] 
		'n-n_crd-nc-m_c', //      202 = Conjoined nouns, no comma, mid        << Buy a book, [tape, film.] 
		'n-n_crd-t_c', //         203 = Conjnd Ns, sym agr, div, top          << The [cats and dogs] ran. 
		'n-n_crd-2-t_c', //       204 = Conjnd Ns, sym agr, nondiv, top       << The [cat and dog] ran. 
		'n-n_crd-3-t_c', //       205 = Conjnd Ns, single referent, top       << My [friend and guide] ran. 
		'n-n_crd-m_c', //         206 = Conjoined N-bars, mid                 << No cat, [dog, or rat] ran. 
		'n-n_crd-im_c', //        207 = Conjoined N-bars, no comma, mid       << No cat, [dog or rat] ran. 
		'n-n_crd-asym-t_c', //    208 = Conjnd Ns, asym agr, sg+pl, top       << The [cat and dogs] ran. 
		'n-n_crd-asym2-t_c', //   209 = Conjnd Ns, asym agr, pl+sg, top       << The [cats and dog] ran. 
		'n-j_crd-t_c', //         210 = Conjoined noun +adjective             << [marble and wooden] stairs 
		'j-n_crd-t_c', //         211 = Conjoined adjective + noun            << [wooden and marble] stairs 
		'j-j_crd-att-t_c', //     212 = Conjnd attrib adjectives, top         << the [old and young] cats 
		'j-j_crd-prd-t_c', //     213 = Conjnd pred adjs, top                 << B is [young and tall]. 
		'j-j_crd-prd-m_c', //     214 = Conjnd pred adjs, mid                 << B is old, [big, and tall]. 
		'j-j_crd-prd-im_c', //    215 = Conjnd pred adjs, no comma, mid       << B is old, [big and tall]. 
		'jpr-jpr_crd-t_c', //     216 = Conjnd subord prd phr, adj, top       << B ran, [happy but tired.] 
		'jpr-jpr_crd-m_c', //     217 = Conjnd subord prd phr, adj, mid       << B ran, hot, [fit, and low] 
		'jpr-jpr_crd-im_c', //    218 = Conjnd sbrd phr, adj,no-cma, mid      << B ran, hot, [fit and low.] 
		'jpr-vpr_crd-t_c', //     219 = Conjnd sbrd prd phr, adj,V, top       << B ran, [happy and freed.] 
		'jpr-vpr_crd-m_c', //     220 = Conjnd sbrd prd phr, adj,V, mid       << B ran, hot, [fit, and lit.]
		'jpr-vpr_crd-im_c', //    221 = Conjnd sbd phr, adj,V,no-cma, mid     << B ran, hot, [fit and lit.] 
		'vppr-vppr_crd-t_c', //   222 = Conjnd subord prd phr, VP, top        << B ran, [feared and loved.] 
		'vppr-vppr_crd-m_c', //   223 = Conjnd subord prd phr, VP, mid        << B ran, torn, [bent, & cut] 
		'vppr-vppr_crd-im_c', //  224 = Conjnd sbrd phr, VP, no-cma, mid      << B ran, torn, [bent & cut.] 
		'vpr-vpr_crd-t_c', //     225 = Conjnd sbrd phr, V, onecomp, top      << B ran, [seeing & doing X.] 
		'vpr-vpr_crd-m_c', //     226 = Conjnd sbrd phr, V, onecomp, mid      << B Vd, Xng, [Yng, & doing X]
		'vpr-vpr_crd-im_c', //    227 = Conjnd sbrd phr, V, no-cma, mid       << B Vd, Xng, [Yng & doing X.]
		'ppr-ppr_crd-t_c', //     228 = Conjnd sbrd prd phr, PP+XP, top       << B ran, [in Rome but lost.] 
		'ppr-ppr_crd-m_c', //     229 = Conjnd sbrd prd phr, PP+XP, mid       << B ran, sad, [in R, & lost] 
		'ppr-ppr_crd-im_c', //    230 = Conjnd sbrd PP+XP, no-cma, mid        << B ran, sad, [in R & lost] 
		'hd-hd_rnr_c', //         231 = Right-node raising                    << B is under or replaced by C
		'np_frg_c', //            232 = Fragment NP                           << The cat. 
		'np_nb-frg_c', //         233 = Fragment N-bar                        << Angry cat. 
		'pp_frg_c', //            234 = Fragment PP                           << In Paris. 
		'j_frg_c', //             235 = Fragment adjective phrase             << Angry at dogs. 
		'r_scp-frg_c', //         236 = Fragment scopal adverb phrase         << Probably. 
		'r_int-frg_c', //         237 = Fragment intersective adverb          << Quietly. 
		'r_dsc-frg_c', //         238 = Fragment discourse adverb             << Yes. 
		'r_cl-frg_c', //          239 = Fragment clausal adverb               << Because we left. 
		'cl_cnj-frg_c', //        240 = Fragment clause with conjunctn        << And Kim stayed. 
		'vp_fin-frg_c', //        241 = Fragment finite VP                    << Chases cats. 
		'vp_nfin-frg_c', //       242 = Fragment nonfinite VP                 << To chase cats. 
		'cl_cp-frg_c', //         243 = Fragment embedded clause              << That it chases cats. 
		'cl_rel-frg_c', //        244 = Fragment relative cluase              << Which we assumed. 
		'aj-np_frg_c', //         245 = Fragment scopal modifier + NP         << Probably Browne. 
		'aj-np_int-frg_c', //     246 = Fragment intersctv modif + NP         << On Tuesday, the cat. 
		'aj-pp_frg_c', //         247 = Fragment scopal modif + PP            << Probably in Paris. 
		'aj-r_frg_c', //          248 = Fragment scopal mod + adverbial       << Maybe, if we can. 
		'np-aj_frg_c', //         249 = Fragment NP + scopal modifier         << The cats, probably. 
		'np-aj_rorp-frg_c', //    250 = Fragment NP + PP or intsctv adv       << Many problems afterwards. 
		'np-aj_j-frg_c', //       251 = Fragment NP + adjective phrase        << Pizza ready. 
		'nb-aj_frg_c', //         252 = Fragment N-bar + scopal modif         << Cat : a feline. 
		'pp-aj_frg_c', //         253 = Fragment PP + scopal modifier         << In Paris before we left. 
		'j-aj_frg_c', //          254 = Fragment adjectv + scopal modif       << Unhappy if they leave. 
		'hdn-cl_prnth_c', //      255 = NomHd + parenthetical clause          << [Cats (they snore)] slept. 
		'hdn-n_prnth_c', //       256 = NomHd + parenthetical N-bar           << [Some guy (democrat)] ran. 
		'hdn-cl_dsh_c', //        257 = NomHd + dash-marked clause            << [Cats - they snore - ] ran.
		'hd-pct_c', //            258 = Head + punctuation token              << B [arrived -] C left. 
		'cl-cl_runon_c', //       259 = Run-on sentence w/two clauses         << B arrived; C left. 
		'cl-cl_runon-cma_c', //   260 = Run-on sentence, comma-joined         << B arrived, C left. 
		'cl-np_runon_c', //       261 = Run-on sentence fr.clause + NP        << B arrived; disaster. 
		'cl-np_runon-prn_c', //   262 = Run-on S fr.clause + parenth NP       << B arrived (disaster). 
		'w-w_fw-seq-m_c', //      263 = Seq. of italic/foreign wds, mid       << [amo amas] amat 
		'w-w_fw-seq-t_c'); //     264 = NP fr.seq.of italic/foreign wds       << [[amo amas] amat] 
})(DLP||(DLP={}));

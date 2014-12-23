/* UTILITY FUNCTION(S) */
var $=function(o){return document.getElementById(o);};

/* MAIN OBJECT */
var core={
	outputData:[],
	curTab:0,
	pl:function(txt){
		if(core.outputData.length==50)core.outputData.shift();
		for(var i=0;i<core.curTab;i++)txt="<span style='float:left;width:75px;'>#</span>"+txt;
		core.outputData.push(txt);
		$('output').innerHTML=core.outputData.join("<br/>");
	}, //end pl()
	getTab:function(symbol,tempTab,tempWidth){
		var txt="",curTabTmp=core.curTab;
		if(tempTab){core.curTab=tempTab;}
		for(var i=0;i<core.curTab;i++)
		txt="<span style='float:left;width:"+(tempWidth?tempWidth:75)+"px;'>"+(symbol?symbol:'#')+"</span>"+txt;
		if(tempTab){core.curTab=curTabTmp;}
		return txt;
	}, //end getTab()
	matches:function(dataSet,testString){
		for(var i=0;i<dataSet.length;i++){
			if(testString==dataSet[i])return true;
		} //end for
		return false;
	},
	library:{
		article:{
			indefinite:['a','an'],
			definite:['the']
		},
		preposition:['about','above','across','after','against','along','among','around','at','before','behind','below','beneath',
		             'beside','between','by','down','during','except','for','from','in','inside','instead','front','into','like',
					 'near','of','off','on','onto','top','out','outside','over','past','since','since','through','to','toward',
					 'under','underneath','until','up','upon','with','within','without','through','throughout','thru'],
		adjective:['blue'],
		adverb:['abnormally','absentmindedly','accidentally','actually','adventurously','afterwards','almost','always','annually',
				'anxiously','arrogantly','awkwardly','bashfully','beautifully','bitterly','bleakly','blindly','blissfully','boastfully',
				'boldly','bravely','briefly','brightly','briskly','broadly','busily','calmly','carefully','carelessly','cautiously',
				'certainly','cheerfully','clearly','cleverly','closely','coaxingly','colorfully','commonly','continually','coolly',
				'correctly','courageously','crossly','cruelly','curiously','daily','daintily','dearly','deceivingly','deeply','defiantly',
				'deliberately','delightfully','diligently','dimly','doubtfully','dreamily','easily','elegantly','energetically','enormously',
				'enthusiastically','equally','especially','even','evenly','eventually','exactly','excitedly','extremely','fairly','faithfully',
				'famously','far','fast','fatally','ferociously','fervently','fiercely','fondly','foolishly','fortunately','frankly','frantically',
				'freely','frenetically','frightfully','fully','furiously','generally','generously','gently','gladly','gleefully',
				'gracefully','gratefully','greatly','greedily','happily','hastily','healthily','heavily','helpfully','helplessly','highly',
				'honestly','hopelessly','hourly','hungrily','immediately','innocently','inquisitively','instantly','intensely','intently',
				'interestingly','inwardly','irritably','jaggedly','jealously','jovially','joyfully','joyously','jubilantly','judgmentally',
				'justly','keenly','kiddingly','kindheartedly','kindly','knavishly','knowingly','knowledgeably','kookily','lazily',
				'les','lightly','likely','limply','lively','loftily','longingly','loosely','loudly','lovingly','loyally','madly',
				'majestically','meaningfully','mechanically','merrily','miserably','mockingly','monthly','more','mortally','mostly','mysteriously',
				'naturally','less','nearly','neatly','nervously','never','nicely','noisily','not','obediently','obnoxiously','oddly',
				'offensively','officially','often','only','openly','optimistically','overconfidently','painfully','partially','patiently',
				'perfectly','physically','playfully','politely','poorly','positively','potentially','powerfully','promptly','properly',
				'punctually','quaintly','queasily','queerly','questionably','quicker','quickly','quietly','quirkily','quizzically',
				'randomly','rapidly','rarely','readily','really','reassuringly','recklessly','regularly','reluctantly','repeatedly','reproachfully',
				'restfully','righteously','rightfully','rigidly','roughly','rudely','safely','scarcely','scarily','searchingly','sedately',
				'seemingly','seldom','selfishly','separately','seriously','shakily','sharply','sheepishly','shrilly','shyly',
				'silently','sleepily','slowly','smoothly','softly','solemnly','solidly','sometimes','soon','speedily','stealthily','sternly',
				'strictly','successfully','suddenly','supposedly','surprisingly','suspiciously','sweetly','swiftly','sympathetically',
				'tenderly','tensely','terribly','thankfully','thoroughly','thoughtfully','tightly','tomorrow','too','tremendously','triumphantly',
				'truly','truthfully','ultimately','unabashedly','unaccountably','unbearably','unethically','unexpectedly','unfortunately',
				'unimpressively','unnaturally','unnecessarily','upbeat','upright','upside-down','upward','urgently','usefully','uselessly',
				'usually','utterly','vacantly','vaguely','vainly','valiantly','vastly','verbally','very','viciously','victoriously','violently',
				'vivaciously','voluntarily','warmly','weakly','wearily','well','wetly','wholly','wildly','willfully','wisely','woefully',
				'wonderfully','worriedly','wrongly','yawningly','yearly','yearningly','yesterday','yieldingly','youthfully','zealously',
				'zestfully','zestily'],
		conjunction:{
			coordinating:['and','or','but','nor','so','for','yet'],
			subordinating:['after','although','as','if','long','because','before','even','though','once','provided','since','so','that',
			               'till','unless','until','what','when','whenever','wherever','whether','while'],
			adverb:['accordingly','finally','hence','hence','instead','now','nevertheless','until','also','however','likewise','next','still',
			        'anyway','incidentally','meanwhile','nonetheless','then','besides','further','indeed','moreover','therefor','consequently',
					'furthermore','namely','otherwise','thus']
		},
		verb:[  'abide','abided','abode','abidden','abides','abiding',
				'alight','alit','alighted','alighted','alights','alighting',
				'am','afraid','fear','fears',
				'arise','arose','arisen','arises','arising',
				'awake','awoke','awoken','awakes','awaking',
				'be','was','were','been','is','being',
				'bear','bore','born','borne','bears','bearing',
				'beat','beaten','beats','beating',
				'become','became','becomes','becoming',
				'begin','began','begun','begins','beginning',
				'behold','beheld','beholds','beholding',
				'bend','bent','bends','bending',
				'bet','bets','betting',
				'bid','bade','bidden','bids','bidding',
				'bid','bids','bidding',
				'bind','bound','bound','binds','binding',
				'bite','bit','bitten','bites','biting',
				'bleed','bled','bled','bleeds','bleeding',
				'blow','blew','blown','blows','blowing',
				'break','broke','broken','breaks','breaking',
				'breed','bred','breeds','breeding',
				'bring','brought','brings','bringing',
				'broadcast','broadcasted','broadcasts','broadcasting',
				'build','built','builds','building',
				'burn','burnt','burned','burns','burning',
				'burst','bursts','bursting',
				'bust','busts','busting',
				'buy','bought','buys','buying',
				'cast','casts','casting',
				'catch','caught','catches','catching',
				'choose','chose','chosen','chooses','choosing',
				'clap','clapt','clapped','claps','clapping',
				'cling','clung','clings','clinging',
				'clothe','clad','clothed','clothes','clothing',
				'come','came','comes','coming',
				'cost','costs','costing',
				'creep','crept','creeps','creeping',
				'cut','cuts','cutting',
				'dare','dared','durst','dares','daring',
				'deal','dealt','deals','dealing',
				'dig','dug','digs','digging',
				'dive','dived','dove','dives','diving',
				'do','did','done','does','doing',
				'draw','drew','drawn','draws','drawing',
				'dream','dreamt','dreamed','dreams','dreaming',
				'drink','drank','drunk','drinks','drinking',
				'drive','drove','driven','drives','driving',
				'dwell','dwelt','dwells','dwelling',
				'eat','ate','eaten','eats','eating',
				'enjoy','enjoyed','enjoys','enjoying',
				'fall','fell','fallen','falls','falling',
				'feed','fed','fed','feeds','feeding',
				'feel','felt','feels','feeling',
				'fetch','fetched','fetches','fetching',
				'fight','fought','fought','fights','fighting',
				'find','found','finds','finding',
				'fit','fitted','fits','fitting',
				'fish','fished','fishes','fishing',
				'flee','fled','flees','fleeing',
				'fling','flung','flings','flinging',
				'fly','flew','flown','flies','flying',
				'forbid','forbade','forbad','forbidden','forbids','forbidding',
				'forecast','forecasted','forecasts','forecasting',
				'foresee','foresaw','foreseen','foresees','foreseeing',
				'foretell','foretold','foretells','foretelling',
				'forget','forgot','forgotten','forgets','forgetting',
				'forgive','forgave','forgiven','forgives','forgiving',
				'forsake','forsook','forsaken','forsakes','forsaking',
				'freeze','froze','frozen','freezes','freezing',
				'frostbite','frostbit','frostbitten','frostbites','frostbiting',
				'get','got','got','gotten','gets','getting',
				'give','gave','given','gives','giving',
				'go','went','gone','been','goes','going',
				'grind','ground','ground','grinds','grinding',
				'grow','grew','grown','grows','growing',
				'handwrite','handwrote','handwritten','handwrites','handwriting',
				'hang','hung','hanged','hanged','hangs','hanging',
				'have','had','has','having',
				'hear','heard','hears','hearing',
				'hide','hid','hidden','hides','hiding',
				'hit','hits','hitting',
				'hold','held','holds','holding',
				'hurt','hurts','hurting',
				'inlay','inlaid','inlays','inlaying',
				'input','inputted','inputs','inputting',
				'interlay','interlaid','interlays','interlaying',
				'keep','kept','keeps','keeping',
				'kneel','knelt','kneeled','kneels','kneeling',
				'knit','knitted','knits','knitting',
				'know','knew','known','knows','knowing',
				'lay','laid','lays','laying',
				'laugh','laughed','laughs','laughing',
				'lead','led','leads','leading',
				'lean','leant','leaned','leaned','leans','leaning',
				'leap','leapt','leaped','leaps','leaping',
				'learn','learnt','learned','learns','learning',
				'leave','left','leaves','leaving',
				'lend','lent','lends','lending',
				'let','lets','letting',
				'lie','lay','lain','lies','lying',
				'light','lit','lights','lighting',
				'lose','lost','loses','losing',
				'love','loved','loves','loving',
				'make','made','makes','making',
				'mean','meant','means','meaning',
				'meet','met','meets','meeting',
				'melt','melted','molten','melts','melting',
				'mislead','misled','misleads','misleading',
				'mistake','mistook','mistaken','mistaking',
				'misunderstand','misunderstood','misunderstands','misunderstanding',
				'miswed','miswedded','misweds','miswedding',
				'mow','mowed','mown','mows','mowing',
				'overdraw','overdrew','overdrawn','overdraws','overdrawing',
				'overhear','overheard','overhears','overhearing',
				'overtake','overtook','overtaken','overtakes','overtaking',
				'pay','paid','pays','paying',
				'preset','prests','presetting',
				'prove','proved','proven','proves','proving',
				'put','puts','putting',
				'quit','quits','quitting',
				're-prove','re-proved','re-proven','re-proves','re-proving',
				'read','reads','reading',
				'rid','ridded','rids','ridding',
				'ride','rode','ridden','rides','riding',
				'ring','rang','rung','rings','ringing',
				'rise','rose','risen','rises','rising',
				'rive','rived','riven','rives','riving',
				'run','ran','runs','running',
				'saw','sawed','sawn','sawed','saws','sawing',
				'say','said','says','saying',
				'see','saw','seen','sees','seeing',
				'seek','sought','seeks','seeking',
				'sell','sold','sells','selling',
				'send','sent','sends','sending',
				'set','sets','setting',
				'sew','sewed','sewn','sewed','sews','sewing',
				'shake','shook','shaken','shakes','shaking',
				'shave','shaved','shaven','shaves','shaving',
				'shear','shore','sheared','shorn','sheared','shears','shearing',
				'shed','sheds','shedding',
				'shine','shone','shines','shining',
				'shoe','shod','shoes','shoeing',
				'shoot','shot','shoots','shooting',
				'show','showed','shown','shows','showing',
				'shrink','shrank','shrunk','shrinks','shrinking',
				'shut','shuts','shutting',
				'sing','sang','sung','sings','singing',
				'sink','sank','sunk','sinks','sinking',
				'sit','sat','sits','sitting',
				'slay','slew','slain','slays','slaying',
				'sleep','slept','sleeps','sleeping',
				'slide','slid','slidden','slides','sliding',
				'sling','slung','slings','slinging',
				'slink','slunk','slinks','slinking',
				'slit','slits','slitting',
				'smell','smelt','smelled','smells','smelling',
				'sneak','sneaked','snuck','sneaked','sneaks','sneaking',
				'soothsay','soothsaid','soothsays','soothsaying',
				'sow','sowed','sown','sows','sowing',
				'speak','spoke','spoken','speaks','speaking',
				'speed','sped','speeded','speeds','speeding',
				'spell','spelt','spelled','spells','spelling',
				'spend','spent','spends','spending',
				'spill','spilt','spilled','spills','spilling',
				'spin','span','spun','spins','spinning',
				'spit','spat','spit','spits','spitting',
				'split','splits','splitting',
				'spoil','spoilt','spoiled','spoils','spoiling',
				'spread','spreads','spreading',
				'spring','sprang','sprung','springs','springing',
				'stand','stood','stands','standing',
				'steal','stole','stolen','steals','stealing',
				'stick','stuck','sticks','sticking',
				'sting','stung','stings','stinging',
				'stink','stank','stunk','stinks','stinking',
				'stride','strode','strided','stridden','strides','striding',
				'strike','struck','struck','stricken','strikes','striking',
				'string','strung','strings','stringing',
				'strip','stript','stripped','stript','stripped','strips','stripping',
				'strive','strove','striven','strives','striving',
				'sublet','sublets','subletting',
				'sunburn','sunburned','sunburnt','sunburns','sunburning',
				'swear','swore','sworn','swears','swearing',
				'sweat','sweated','sweats','sweating',
				'sweep','swept','sweeped','sweeps','sweeping',
				'swell','swelled','swollen','swells','swelling',
				'swim','swam','swum','swims','swimming',
				'swing','swung','swings','swinging',
				'talk','talked','talks','talking',
				'take','took','taken','takes','taking',
				'teach','taught','teaches','teaching',
				'tear','tore','torn','tears','tearing',
				'tell','told','tells','telling',
				'think','thought','thinks','thinking',
				'thrive','throve','thrived','thriven','thrived','thrives','thriving',
				'throw','threw','thrown','throws','throwing',
				'thrust','thrusts','thrusting',
				'tread','trod','trodden','treads','treading',
				'undergo','underwent','undergone','undergoes','undergoing',
				'understand','understands','understanding',
				'undertake','undertook','undertaken','undertakes','undertaking',
				'upset','upsets','upsetting',
				'vex','vext','vexed','vexes','vexing',
				'wake','woke','woken','wakes','waking',
				'watch','watched','watches','watching',
				'wear','wore','worn','wears','wearing',
				'weave','wove','woven','weaves','weaving',
				'wed','wedded','weds','wedding',
				'weep','wept','weeps','weeping',
				'wend','wended','went','wends','wending',
				'wet','wetted','wets','wetting',
				'win','won','wins','winning',
				'wind','wound','winds','winding',
				'withdraw','withdrew','withdrawn','withdraws','withdrawing',
				'withhold','withheld','withholds','withholding',
				'withstand','withstood','withstands','withstanding',
				'wring','wrung','wrings','wringing',
				'write','wrote','written','writes','writing',
				'zinc','zinced','zincked','zincked','zincs','zincking'],
		pronoun:{
			distributive:['every','each','everything','everyone','either','neither','both','any','all','none'],
			personal:{
				subjective:{
					firstPerson:{
						singular:['i'],
						plural:['we']
					},
					secondPerson:{
						singular:['you','thou'],
						plural:['you']
					},
					thirdPerson:{
						singular:{
							masculine:['he'],
							feminine:['she'],
							neuter:['it'],
							epicene:['they']
						},
						plural:['they']
					},
					generic:['one','you'],
					relative:['who']
				},
				objective:{
					firstPerson:{
						singular:['me'],
						plural:['us']
					},
					secondPerson:{
						singular:['you','thee'],
						plural:['you']
					},
					thirdPerson:{
						singular:{
							masculine:['him'],
							feminine:['her'],
							neuter:['it'],
							epicene:['them']
						},
						plural:['them']
					},
					generic:['one','you'],
					relative:['whom','who']
				},
				reflexive:{
					firstPerson:{
						singular:['myself'],
						plural:['ourself','ourselves']
					},
					secondPerson:{
						singular:['yourself','thyself'],
						plural:['yourselves']
					},
					thirdPerson:{
						singular:{
							masculine:['himself','hisself'],
							feminine:['herself'],
							neuter:['itself'],
							epicene:['themself','themselves','theirself','theirselves']
						},
						plural:['themselves']
					},
					generic:['oneself','yourself'],
					relative:[] //their is none
				},
			},
			possessive:{
				pronoun:{
					firstPerson:{
						singular:['mine'],
						plural:['ours']
					},
					secondPerson:{
						singular:['yours','thine'],
						plural:['yours']
					},
					thirdPerson:{
						singular:{
							masculine:['his'],
							feminine:['hers'],
							neuter:[], //their is none
							epicene:['theirs']
						},
						plural:['theirs']
					},
					generic:["one's",'your'],
					relative:['whose']
				},
				determiner:{
					firstPerson:{
						singular:['my','mine','me'],
						plural:['our']
					},
					secondPerson:{
						singular:['thy','thine'],
						plural:['your']
					},
					thirdPerson:{
						singular:{
							masculine:['his'],
							feminine:['her'],
							neuter:['its'], //their is none
							epicene:['their']
						},
						plural:['their']
					},
					generic:["one's",'your'],
					relative:['whose']
				},
			}
		}
	},
	process:function(message){
		core.pl('&gt; '+message);
		(function(msg){
			var gc=function(color,txt){
				return "<span style='color:"+color+";'>"+txt+"</span>";
			};
			var words=[],lastPos=0;
			for(var i=0;i<msg.length;i++){
				if(msg.substring(i,i+1)==' '||msg.substring(i,i+1)==','){
					words.push({
						word:msg.substring(lastPos,i),
						type:' ',
						toString:function(){
							if(this.word[0]==this.word[0].toUpperCase())this.type=gc('#FF0','(Noun)');
							this.word.toLowerCase();
							return core.getTab(this.word,1,100)+core.getTab(this.type,1,1500);
						} //end toString()
					});
					lastPos=i+1;
				} //end if
			} //end for
			for(var i=0;i<words.length;i++){
				/* APPLY DEFINITE AND INDEFINITE ARTICLES */
				if(core.matches(core.library.article.indefinite,words[i].word))words[i].type+=gc('#0F0','(Indefinite Article)');article=true;
				if(core.matches(core.library.article.definite,words[i].word))words[i].type=gc('#0F0','(Definite Article)');article=true;
				/* APPLY PREPOSITIONS */
				if(core.matches(core.library.preposition,words[i].word))words[i].type=gc('#0FF','(Preposition)');
				/* APPLY PRONOUN FLAGS*/
				if(core.matches(core.library.pronoun.distributive,words[i].word))words[i].type+=gc('#F00','(Pronoun:Distributive)');
				if(core.matches(core.library.pronoun.personal.subjective.firstPerson.singular,words[i].word))words[i].type+=gc('#F00','(Pronoun:Personal-Subjective-FirstPerson-Singular)');
				if(core.matches(core.library.pronoun.personal.subjective.firstPerson.plural,words[i].word))words[i].type+=gc('#F00','(Pronoun:Personal-Subjective-FirstPerson-Plural)');
				if(core.matches(core.library.pronoun.personal.subjective.secondPerson.singular,words[i].word))words[i].type+=gc('#F00','(Pronoun:Personal-Subjective-SecondPerson-Singular)');
				if(core.matches(core.library.pronoun.personal.subjective.secondPerson.plural,words[i].word))words[i].type+=gc('#F00','(Pronoun:Personal-Subjective-SecondPerson-Plural)');
				if(core.matches(core.library.pronoun.personal.subjective.thirdPerson.singular.masculine,words[i].word))words[i].type+=gc('#F00','(Pronoun:Personal-Subjective-ThirdPerson-Singular-Masculine)');
				if(core.matches(core.library.pronoun.personal.subjective.thirdPerson.singular.feminine,words[i].word))words[i].type+=gc('#F00','(Pronoun:Personal-Subjective-ThirdPerson-Singular-Feminine)');
				if(core.matches(core.library.pronoun.personal.subjective.thirdPerson.singular.neuter,words[i].word))words[i].type+=gc('#F00','(Pronoun:Personal-Subjective-ThirdPerson-Singular-Neuter)');
				if(core.matches(core.library.pronoun.personal.subjective.thirdPerson.singular.epicene,words[i].word))words[i].type+=gc('#F00','(Pronoun:Personal-Subjective-ThirdPerson-Singular-Epicene)');
				if(core.matches(core.library.pronoun.personal.subjective.thirdPerson.plural,words[i].word))words[i].type+=gc('#F00','(Pronoun:Personal-Subjective-ThirdPerson-plural)');
				if(core.matches(core.library.pronoun.personal.subjective.generic,words[i].word))words[i].type+=gc('#F00','(Pronoun:Personal-Subjective-Generic)');
				if(core.matches(core.library.pronoun.personal.subjective.relative,words[i].word))words[i].type+=gc('#F00','(Pronoun:Personal-Subjective-Relative)');
				if(core.matches(core.library.pronoun.personal.objective.firstPerson.singular,words[i].word))words[i].type+=gc('#F00','(Pronoun:Personal-Objective-FirstPerson-Singular)');
				if(core.matches(core.library.pronoun.personal.objective.firstPerson.plural,words[i].word))words[i].type+=gc('#F00','(Pronoun:Personal-Objective-FirstPerson-Plural)');
				if(core.matches(core.library.pronoun.personal.objective.secondPerson.singular,words[i].word))words[i].type+=gc('#F00','(Pronoun:Personal-Objective-SecondPerson-Singular)');
				if(core.matches(core.library.pronoun.personal.objective.secondPerson.plural,words[i].word))words[i].type+=gc('#F00','(Pronoun:Personal-Objective-SecondPerson-Plural)');
				if(core.matches(core.library.pronoun.personal.objective.thirdPerson.singular.masculine,words[i].word))words[i].type+=gc('#F00','(Pronoun:Personal-Objective-ThirdPerson-Singular-Masculine)');
				if(core.matches(core.library.pronoun.personal.objective.thirdPerson.singular.feminine,words[i].word))words[i].type+=gc('#F00','(Pronoun:Personal-Objective-ThirdPerson-Singular-Feminine)');
				if(core.matches(core.library.pronoun.personal.objective.thirdPerson.singular.neuter,words[i].word))words[i].type+=gc('#F00','(Pronoun:Personal-Objective-ThirdPerson-Singular-Neuter)');
				if(core.matches(core.library.pronoun.personal.objective.thirdPerson.singular.epicene,words[i].word))words[i].type+=gc('#F00','(Pronoun:Personal-Objective-ThirdPerson-Singular-Epicene)');
				if(core.matches(core.library.pronoun.personal.objective.thirdPerson.plural,words[i].word))words[i].type+=gc('#F00','(Pronoun:Personal-Objective-ThirdPerson-plural)');
				if(core.matches(core.library.pronoun.personal.objective.generic,words[i].word))words[i].type+=gc('#F00','(Pronoun:Personal-Objective-Generic)');
				if(core.matches(core.library.pronoun.personal.objective.relative,words[i].word))words[i].type+=gc('#F00','(Pronoun:Personal-Objective-Relative)');
				if(core.matches(core.library.pronoun.personal.reflexive.firstPerson.singular,words[i].word))words[i].type+=gc('#F00','(Pronoun:Personal-Reflexive-FirstPerson-Singular)');
				if(core.matches(core.library.pronoun.personal.reflexive.firstPerson.plural,words[i].word))words[i].type+=gc('#F00','(Pronoun:Personal-Reflexive-FirstPerson-Plural)');
				if(core.matches(core.library.pronoun.personal.reflexive.secondPerson.singular,words[i].word))words[i].type+=gc('#F00','(Pronoun:Personal-Reflexive-SecondPerson-Singular)');
				if(core.matches(core.library.pronoun.personal.reflexive.secondPerson.plural,words[i].word))words[i].type+=gc('#F00','(Pronoun:Personal-Reflexive-SecondPerson-Plural)');
				if(core.matches(core.library.pronoun.personal.reflexive.thirdPerson.singular.masculine,words[i].word))words[i].type+=gc('#F00','(Pronoun:Personal-Reflexive-ThirdPerson-Singular-Masculine)');
				if(core.matches(core.library.pronoun.personal.reflexive.thirdPerson.singular.feminine,words[i].word))words[i].type+=gc('#F00','(Pronoun:Personal-Reflexive-ThirdPerson-Singular-Feminine)');
				if(core.matches(core.library.pronoun.personal.reflexive.thirdPerson.singular.neuter,words[i].word))words[i].type+=gc('#F00','(Pronoun:Personal-Reflexive-ThirdPerson-Singular-Neuter)');
				if(core.matches(core.library.pronoun.personal.reflexive.thirdPerson.singular.epicene,words[i].word))words[i].type+=gc('#F00','(Pronoun:Personal-Reflexive-ThirdPerson-Singular-Epicene)');
				if(core.matches(core.library.pronoun.personal.reflexive.thirdPerson.plural,words[i].word))words[i].type+=gc('#F00','(Pronoun:Personal-Reflexive-ThirdPerson-plural)');
				if(core.matches(core.library.pronoun.personal.reflexive.generic,words[i].word))words[i].type+=gc('#F00','(Pronoun:Personal-Reflexive-Generic)');
				if(core.matches(core.library.pronoun.personal.reflexive.relative,words[i].word))words[i].type+=gc('#F00','(Pronoun:Personal-Reflexive-Relative)');
				if(core.matches(core.library.pronoun.possessive.pronoun.firstPerson.singular,words[i].word))words[i].type+=gc('#F00','(Pronoun:Possessive-Pronoun-FirstPerson-Singular)');
				if(core.matches(core.library.pronoun.possessive.pronoun.firstPerson.plural,words[i].word))words[i].type+=gc('#F00','(Pronoun:Possessive-Pronoun-FirstPerson-Plural)');
				if(core.matches(core.library.pronoun.possessive.pronoun.secondPerson.singular,words[i].word))words[i].type+=gc('#F00','(Pronoun:Possessive-Pronoun-SecondPerson-Singular)');
				if(core.matches(core.library.pronoun.possessive.pronoun.secondPerson.plural,words[i].word))words[i].type+=gc('#F00','(Pronoun:Possessive-Pronoun-SecondPerson-Plural)');
				if(core.matches(core.library.pronoun.possessive.pronoun.thirdPerson.singular.masculine,words[i].word))words[i].type+=gc('#F00','(Pronoun:Possessive-Pronoun-ThirdPerson-Singular-Masculine)');
				if(core.matches(core.library.pronoun.possessive.pronoun.thirdPerson.singular.feminine,words[i].word))words[i].type+=gc('#F00','(Pronoun:Possessive-Pronoun-ThirdPerson-Singular-Feminine)');
				if(core.matches(core.library.pronoun.possessive.pronoun.thirdPerson.singular.neuter,words[i].word))words[i].type+=gc('#F00','(Pronoun:Possessive-Pronoun-ThirdPerson-Singular-Neuter)');
				if(core.matches(core.library.pronoun.possessive.pronoun.thirdPerson.singular.epicene,words[i].word))words[i].type+=gc('#F00','(Pronoun:Possessive-Pronoun-ThirdPerson-Singular-Epicene)');
				if(core.matches(core.library.pronoun.possessive.pronoun.thirdPerson.plural,words[i].word))words[i].type+=gc('#F00','(Pronoun:Possessive-Pronoun-ThirdPerson-plural)');
				if(core.matches(core.library.pronoun.possessive.pronoun.generic,words[i].word))words[i].type+=gc('#F00','(Pronoun:Possessive-Pronoun-Generic)');
				if(core.matches(core.library.pronoun.possessive.pronoun.relative,words[i].word))words[i].type+=gc('#F00','(Pronoun:Possessive-Pronoun-Relative)');
				if(core.matches(core.library.pronoun.possessive.determiner.firstPerson.singular,words[i].word))words[i].type+=gc('#F00','(Pronoun:Possessive-Determiner-FirstPerson-Singular)');
				if(core.matches(core.library.pronoun.possessive.determiner.firstPerson.plural,words[i].word))words[i].type+=gc('#F00','(Pronoun:Possessive-Determiner-FirstPerson-Plural)');
				if(core.matches(core.library.pronoun.possessive.determiner.secondPerson.singular,words[i].word))words[i].type+=gc('#F00','(Pronoun:Possessive-Determiner-SecondPerson-Singular)');
				if(core.matches(core.library.pronoun.possessive.determiner.secondPerson.plural,words[i].word))words[i].type+=gc('#F00','(Pronoun:Possessive-Determiner-SecondPerson-Plural)');
				if(core.matches(core.library.pronoun.possessive.determiner.thirdPerson.singular.masculine,words[i].word))words[i].type+=gc('#F00','(Pronoun:Possessive-Determiner-ThirdPerson-Singular-Masculine)');
				if(core.matches(core.library.pronoun.possessive.determiner.thirdPerson.singular.feminine,words[i].word))words[i].type+=gc('#F00','(Pronoun:Possessive-Determiner-ThirdPerson-Singular-Feminine)');
				if(core.matches(core.library.pronoun.possessive.determiner.thirdPerson.singular.neuter,words[i].word))words[i].type+=gc('#F00','(Pronoun:Possessive-Determiner-ThirdPerson-Singular-Neuter)');
				if(core.matches(core.library.pronoun.possessive.determiner.thirdPerson.singular.epicene,words[i].word))words[i].type+=gc('#F00','(Pronoun:Possessive-Determiner-ThirdPerson-Singular-Epicene)');
				if(core.matches(core.library.pronoun.possessive.determiner.thirdPerson.plural,words[i].word))words[i].type+=gc('#F00','(Pronoun:Possessive-Determiner-ThirdPerson-plural)');
				if(core.matches(core.library.pronoun.possessive.determiner.generic,words[i].word))words[i].type+=gc('#F00','(Pronoun:Possessive-Determiner-Generic)');
				if(core.matches(core.library.pronoun.possessive.determiner.relative,words[i].word))words[i].type+=gc('#F00','(Pronoun:Possessive-Determiner-Relative)');
				/* APPLY ADVERB FLAGS*/
				if(core.matches(core.library.adverb,words[i].word))words[i].type+=gc('#F99','(ADVERB)');
				/* APPLY VERB FLAGS*/
				if(core.matches(core.library.verb,words[i].word))words[i].type+=gc('#99F','(VERB)');
				/* APPLY CONUNCTIONS*/
				if(core.matches(core.library.conjunction.coordinating,words[i].word))words[i].type+=gc('#FA4','(Conjunction-Coordinating)');
				if(core.matches(core.library.conjunction.subordinating,words[i].word))words[i].type+=gc('#FA4','(Conjunction-Subordinating)');
				if(core.matches(core.library.conjunction.adverb,words[i].word))words[i].type+=gc('#FA4','(Conjunction-Adverb)');
			} //end for
			for(var i=0;i<words.length;i++){
				/* WHATEVER IS LEFT MUST BE EITHER ADJECTIVE OR NOUN */
				if(words[i].type==" "&&i!==words.length-1&&words[i+1].type.indexOf("(VERB)")>=0){
					words[i].type=gc('#F77','(ADVERB)');
				}else if(words[i].type==" "&&i==words.length-1||words[i].type==" "&&words[i+1].type!=" "){
					words[i].type=gc('#FF0','(Noun)');
				}else if(words[i].type==" "){
					words[i].type=gc('#4AF','(Adjective)');
				}else if(i!==words.length-1&&words[i].type.indexOf("(VERB)")>=0&&words[i+1].type.indexOf("(VERB)")>=0){
					words[i+1].type=gc('#99F','(VERB-NOUN)');
				}//end if
			} //end for
			core.pl(words.join("<br/>"));
		})(message+' ');
	} //end process()
};

/* INITIALIZER */
(function(){
	setTimeout(function(){$('cmd').value="";$('cmd').focus();},10);
	setTimeout(function(){core.process('Bob happily ran up a hill to fetch the blue pail of water.');},10);
	setTimeout(function(){core.process('I enjoy to watch boats while we sit at the ocean side.');},10);
})();
// §818-AA: source anchors only, not a generator or historical witness test.
const fs=require("fs"),path=require("path"),assert=require("assert");
function vol(n){
 const file=path.join(__dirname,"..","星學大成_Kanripo_"+String(n).padStart(3,"0")+".txt");
 return fs.readFileSync(file,"utf8").replace(/<pb:[^>]+>/g,"").replace(/[¶\s]/g,"").replace(/\//g,"");
}
const checks=[
 [11,"子乃土旺地命坐此土為主","natal-palace original principal"],
 [11,"獨危度夜生從月取用","condition for moon"],
 [11,"有月可為主無月只取土用事","selector with fallback"],
 [11,"中間亦不離乎土","earth still relevant"],
 [11,"六丙生人不為囚六戊生人不為刑","different stem gate"],
 [11,"水火互換未免抱病壓身","palace positional swap"],
 [13,"身化刑命化囚謂之有用本不為忌","role != judgement"],
 [1,"變為囚者屬疾厄","year role governs domain"],
 [30,"癸炁過(化囚也)","gui-qiu-qi negative control"]
];
for(const [n,anchor,label] of checks) {
 assert(vol(n).includes(anchor), "Missing WYG vol"+n+" / "+label);
 console.log("PASS WYG",n,label);
}
console.log("SOURCE_ANCHORS_PASS",checks.length+"/"+checks.length);
console.log("MANUAL_IDENTITY_ASSERTION_NOT_PERFORMED: any B inherits the same birth-stem qiu requires independent ancient text.");
console.log("NO_MATURE_TABLES_USED");
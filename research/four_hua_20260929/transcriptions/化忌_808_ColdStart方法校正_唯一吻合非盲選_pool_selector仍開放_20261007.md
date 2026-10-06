# 化忌 §808：Cold-start 方法校正——唯一吻合不等於盲選成功；pool selector 仍開放

日期：2026-10-07（臺灣時間）

## 一、為什麼要校正 §807

§807 做對了兩件重要的事：

1. 在揭示成熟化忌十星集合以前，先把既存 old-selector candidate universe 列出；
2. 把「選哪十顆 carrier」與「十顆如何分配十干」拆成兩層。

但 §807 最後把：

> 六個事前候選中，古〈印星〉是唯一 10/10 exact set match

進一步寫成：

> pool solved／cold-start 選星成功

這一步過頭。

因為「哪一池是 winner」仍是以成熟 G0 化忌 carrier set 的吻合度決定。  
也就是：

> candidate generation 是 blind；  
> winner selection 仍是 post-reveal。

所以 Astra 的批評成立。

本節不否定 §807 的比較結果，而是把它重新定級，並真正遮住成熟忌集合，檢查目前是否已有一條 source-bounded selector 可以獨立選中〈印星〉。

可重跑：

`research/four_hua_20260929/ji_808_target_blind_pool_selector_audit_20261007.js`

---

## 二、先證明：其餘五池都是 9/10，主要是集合幾何，不是額外證據

§807 的六個候選 class 都是：

> 十一曜 universe 中取十曜，恰好排除一曜。

六類分別排：

- 日
- 土
- 炁
- 火
- 孛
- 金

因此任兩個不同候選只要排除不同一曜，就必然：

> 共有 9/10。

§808 audit 將六類兩兩比較，共 15 組：

- old-body overlap 全部 = 9；
- 經一對一 canonical body→fixed carrier codebook 投影後，fixed-star overlap 也全部 = 9。

所以 §807 的：

> 其他五類全部 9/10

不能再當成「五類也都幾乎接近成熟忌」的額外支持。

它主要只是：

> **10-of-11 set geometry 的必然結果。**

真正有辨識力的只有：

> 成熟忌排除的是哪一個 canonical carrier／old body。

而一旦這一點是從成熟答案揭示後取得，就仍然是 validation，不是 blind selection。

---

## 三、真正 target-blind 時，現有條件能不能選中〈印星〉？

### 3.1 結構完整性：六個全部通過

若只要求：

- 十曜不重；
- 來自既存已登記 selector；
- 能經 body→fixed codebook 完整投影；

六類全部保留。

所以：

> **NO DISCRIMINATION。**

---

### 3.2 從早期福 pool 做最少集合改動：不是印星，而且有兩解

這一條完全不需要成熟化忌。

早期福 fixed pool：

【太陰、巨門、廉貞、天梁、右弼、文曲、天同、文昌、武曲、貪狼】

六個 candidate projected pool 與早期福的集合 overlap：

- 排日 class：9
- 排土／正魁：8
- 排炁／印星：8
- 排火／催官：9
- 排孛／祿神：8
- 排金／早期紫微祿：8

所以若採：

> 「離早期福改動最少」

只會得到：

> **排日、排火並列。**

不會得到印星。

而且「最少改動」本身也只是 model prior，並不是目前找到的古代直接 operator。

因此它只能作 negative control。

---

## 四、直接讀古文「所忌」語義，反而先指向排日 class

§805 已取得《星學大成》卷二十六在十干化曜語境的直接原文：

> 所忌者暗耗刑囚。

而：

- 天暗
- 天耗
- 天刑
- 天囚

四張 row 都屬於 §807 的同一個：

> **排日 class。**

所以如果完全遮住成熟忌十星，單純問：

> 「古文中哪一類十干化曜最直接被稱作『所忌』？」

最直接的 source-bounded 語義線並不會導向獨立〈印星〉，而會導向：

> **暗／耗／刑／囚所在的排日 class。**

這當然還不能證明成熟化忌應採排日；它的用途是反證：

> 目前沒有一條「因為叫忌，所以自然應選印星」的 target-blind 語義規則。

---

## 五、§799 的「福→印 role」也還不能獨立選〈印星〉

這是最值得再核的一條。

§799 已直接閉合：

> 化福＝食神  
> → 食神帶合／食合印  
> → 印 role

逐干 10/10。

若只看名稱，很容易想寫：

> 既然得到「印 role」，下一步就選「印星」表。

但 §799–800 已有很強的同書負控：

### A. 天干化曜星例・天印／化印

row：

【炁、計、羅、火、孛、木、金、土、月、水】

### B. 天干吉凶星例・獨立印星

row：

【木、日、火、月、土、羅、金、計、水、孛】

兩者在同一傳統中：

- 名稱都含「印」；
- 功能標籤卻分開；
- row 9/10 干不同；
- 原頁／篇章沒有「從天印轉讀印星」的操作句。

所以：

> **福→印 role 已閉合，不等於印 role→獨立〈印星〉carrier pool 已閉合。**

若在 cold-start 中直接用「同字印」把後者選出，正好重新偷渡 §800 尚未證明的 table-switch。

因此此條仍是：

> **OPEN。**

---

## 六、「十一曜獨炁不與」只定義候選，不負責選候選

獨立〈論印星〉明文：

> 十一曜獨炁不與。

它非常重要，因為它直接回答：

> 印星 pool 自己為什麼排炁。

但它沒有回答：

> 為什麼成熟化忌應採這張印星 pool。

所以這句的證據角色應固定成：

> **candidate-internal definition / exclusion rule**

而不是：

> **Ji→Yinxing selector。**

---

## 七、codebook 的獨立性也要再分兩層

§807 使用的 canonical old-body→fixed carrier 映射材料本身，確實早已存在於成熟 Ji validation 之外，例如：

- 日→太陽
- 月→太陰
- 羅→武曲
- 計→廉貞
- 火→天機
- 金→文昌
- 水→文曲
- 孛→巨門
- 炁→天梁
- 木→天同
- 土→貪狼

但 Astra 提醒的第二層仍成立：

> 不只是「映射材料」要獨立；  
> 「哪些映射算 canonical、哪些同元素旁支排除」的 admissibility policy 也不能因成熟忌吻合度才決定。

§807 已做 broad-affinity 負控：

- 火→天機／破軍
- 土→貪狼／左輔
- 水→文曲／右弼

一放寬便可產生 8 個 fixed-star pool。

因此目前最精確的說法應是：

> canonical codebook 有獨立古料支持；  
> 但 strict-vs-broad 的 admissibility policy 仍應保留敏感性分析，不能把「只有 strict 會命中成熟忌」反過來當 strict 必然正確的證明。

而且無論 strict 或 broad：

> **codebook 只解 projection，不解 candidate selection。**

---

## 八、揭示成熟忌後，§807 的結果仍然成立，但只屬 validation

最後才揭示成熟 G0 化忌 carrier set。

六候選比較仍是：

- 排炁／古印星：10/10
- 其餘五類：9/10

因此 §807 最值得保留的結論是：

> **在這批事前登記、source-bounded 的完整候選池中，獨立〈印星〉是唯一與成熟 G0 化忌 carrier set 完全一致的 candidate。**

這是很有價值的結果，因為它排除了：

> 「研究者只看到印星吻合，所以事後只拿印星來講」

這種最簡單的 cherry-pick 質疑。

但它不能證明：

> 「遮住成熟忌後，也會由現有規則唯一選中印星」。

---

## 九、§807 的正式下修

§807 原定級：

> TARGET-POSITION-BLIND / PRE-REGISTERED-POOL-COMPETITION / UNIQUE 10/10 CARRIER-SET RECONSTRUCTION

下修為：

> **PRE-REGISTERED CANDIDATE UNIVERSE / UNIQUE POST-REVEAL EXACT FIT / TARGET-BLIND POOL SELECTOR OPEN**

中文可寫：

> **候選宇宙事前固定；成熟答案揭示後，獨立〈印星〉為唯一完全吻合；但不看成熟答案時，獨立選定〈印星〉的規則仍未取得。**

所以：

- 「unique 10/10 candidate」保留；
- 「cold-start winner」撤回；
- 「pool solved」撤回；
- 「8+2 是 blind prediction」撤回。

8+2 現在只能寫成：

> **給定印星 candidate 後，與早期福比較得到的 set-level consequence。**

不能再寫成：

> 先於成熟答案獨立預測出的 target pool evolution。

---

## 十、對後續 assignment 研究的影響

十干排位研究仍然可以做，而且值得做。

但前提句必須固定成：

> **以下給定獨立〈印星〉投影 pool，研究十顆 carrier 如何分配十干。**

不可再寫：

> pool solved；assignment still open。

應改成：

> **candidate pool conditionally fixed for assignment study；pool selector independently open。**

這樣可以完全避免循環：

- pool-selection 問題保持 OPEN；
- assignment 問題在條件式前提下獨立研究；
- 最後再檢查 assignment 是否出現一條反過來能提供 target-blind pool selector 的新古典規則。

---

## 十一、現在真正要問的問題

Astra 提出的問題可以原樣保留為下一個硬 gate：

> **遮住成熟忌的十顆星與所有吻合分數後，憑什麼在六個候選中選〈印星〉？**

目前答案是：

> **還不能。**

現有最接近的線只有：

1. §799 福→印 role；
2. 獨立〈印星〉本身有完整、明文、排炁的十曜定義；
3. 成熟忌揭示後，它是六候選唯一 exact fit。

但第 1 → 第 2 之間仍然正是 §800 已標記未證的：

> **印 role → 獨立〈印星〉carrier representation**

specific connector。

所以 §808 並沒有把研究打回原點；它只是把 §807 從「已選中」校正回：

> **唯一吻合已證；獨立選定未證。**

這個界線現在是乾淨的。

## 十二、§808 最終收緊與後續重開條件

§808 的答案可再壓成一句：

> **完全遮住成熟化忌後，現存古典規則尚不能唯一選出排炁；獨立〈印星〉只能被證明「自身依法必排炁」，不能被證明「化忌依法必選印星」。**

而本節比 §807 更重要的新增認識是：六池並非毫無古典辨識訊號；相反地，現有最直接、source-bounded 的「所忌」語義訊號會先把【暗／耗／刑／囚】所在的【排日】class推成真正競爭解。這使問題不再只是「尚未證明排炁」，而是「已有另一個更直接的古典語義候選，尚無規則可排除它並切換到獨立〈印星〉」。

因此後續若要重開此問題，新證據不能只是再次證明【印星＝十一曜獨炁不與／印星自身排炁】；這件事已經閉合。真正能改變 evidence matrix 的，只接受下列同級證據：

> **明寫為何捨天印／化印（及其排日競爭語義）而另取、改取、依從獨立〈印星〉表；或直接提供等價的 mature-Ji specific composition，使排日競爭解被古典 operator 排除、排炁被 target-blind 選中。**

這是 §808 之後唯一值得重開的 pool-selector hard gate；在此之前不另開 §809，也不再以「印星自身排炁」或一般福印／天印／印星共現灌新節號。

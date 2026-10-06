# 化忌 §807：Cold-start Route C——先解 carrier pool，再解十干排位

日期：2026-10-07（臺灣時間）

> **§808 方法校正：** 本節候選池的建立可與成熟忌分離，但以成熟 G0 忌 carrier set 的 10/10 吻合挑出〈印星〉，仍屬 post-reveal validation，不是 target-blind selection。故「pool solved／cold-start winner」已由 §808 撤回；本節保留為【事前候選宇宙＋唯一事後 exact fit】紀錄。

## 一、研究目的

本節刻意不沿用 §794–806 的成熟化忌殘差路線，而依「從零開始」方法把問題拆成：

1. 先問：**為什麼成熟化忌偏偏是這十顆星？**
2. 再問：這十顆為什麼分配到甲乙丙丁等十干？

本節只做第一層。

生成階段禁止使用：

- mature Ji 十干位置；
- §794–798 四條 residual relation；
- §802–806 Q/K mask；
- 已知 change mask【甲乙丁戊】。

成熟 G0 化忌只在最後以「十星集合」作 validation。

可重跑：

`research/four_hua_20260929/ji_807_coldstart_carrier_pool_audit_20261007.js`

---

## 二、先建立完全獨立的舊曜→固定星 codebook

這個 codebook 不由 mature Ji 反推。

### 2.1 《三辰通載》〈定正魁星〉＋早期《紫微數》魁／星名材料

〈定正魁星〉：

【甲月、乙日、丙羅、丁計、戊火、己金、庚水、辛孛、壬炁、癸木】

早期《紫微數》對應材料可建立：

- 月 → 太陰
- 日 → 太陽
- 羅 → 武曲
- 計 → 廉貞
- 火 → 天機
- 金 → 文昌
- 水 → 文曲
- 孛 → 巨門
- 炁 → 天梁
- 木 → 天同

其中《紫微數》對文昌、文曲尤其直接：

> 安鳳閣金星：科甲星，一名文昌。

> 安龍池水星：科名星，一名文曲。

另有：

- 天驛＝火星＝天機
- 鳳凰＝木星＝天同
- 天雷＝羅喉＝武曲
- 天暴＝計都＝廉貞
- 太常＝日＝太陽
- 天宜＝月＝太陰
- 白衣＝孛星＝巨門
- 進神＝紫氣＝天梁

這一整套均先於本節 mature-Ji validation 存在。

### 2.2 土 → 貪狼

早期《紫微數》另有：

> 喧蛇＝土星＝貪狼

故補足十一曜 codebook：

| 舊曜 | fixed carrier |
|---|---|
| 日 | 太陽 |
| 月 | 太陰 |
| 木 | 天同 |
| 火 | 天機 |
| 土 | 貪狼 |
| 金 | 文昌 |
| 水 | 文曲 |
| 炁 | 天梁 |
| 孛 | 巨門 |
| 羅 | 武曲 |
| 計 | 廉貞 |

這是一張 independent carrier codebook，不讀成熟忌位置。

---

## 三、不是只挑幾張有利古表：先做 candidate-universe 去重

9/30 已登記的 old-selector registry 共 20 張：

- 十變曜十欄：天祿、天暗、天福、天耗、天蔭、天貴、天刑、天印、天囚、天權
- 文星
- 正魁
- 小魁
- 天官
- 生官
- 傷官
- 印星
- 催官
- 祿神
- 喜神

其中：

- 文星有重複金；
- 小魁有重複水；

所以不形成 10 個不重舊曜的完整 pool，先排除。

剩：

> **18 張十曜不重表**

再按「集合」去重後，只剩 5 種 old-body pool：

### A. 排日

十變曜十欄、天官、生官、傷官、喜神等都落在同一集合：

【火、孛、木、金、土、月、水、炁、計、羅】

### B. 排土

三辰正魁：

【月、日、羅、計、火、金、水、孛、炁、木】

### C. 排炁

古印星：

【木、日、火、月、土、羅、金、計、水、孛】

### D. 排火

古催官：

【金、水、日、羅、木、炁、孛、土、月、計】

### E. 排孛

古祿神：

【木、水、計、羅、土、火、金、炁、日、月】

另把早期《紫微數》祿舊曜池作獨立第六類：

### F. 排金

【計、火、木、月、土、羅、日、孛、炁、水】

所以 cold-start 的 candidate set universe 不是研究者臨時挑六張，而是：

> **20 張既存 selector → 18 張完整十曜表 → 5 個去重 set class ＋ 1 個早期紫微祿 class = 6 個 pool 候選。**

---

## 四、完全不看十干位置，只比 carrier SET

把六個 old-body pool 都經獨立 codebook 投影成 fixed-star set。

### 1. 古印星：排炁

投影：

【天同、太陽、天機、太陰、貪狼、武曲、文昌、廉貞、文曲、巨門】

與 mature G0 Ji carrier set：

【太陽、太陰、廉貞、巨門、天機、文曲、天同、文昌、武曲、貪狼】

比較：

> **10/10 exact set match**

### 2. 排日 class

投影多【天梁】、缺【太陽】：

> 9/10

### 3. 三辰正魁／排土

多【天梁】、缺【貪狼】：

> 9/10

### 4. 催官／排火

多【天梁】、缺【天機】：

> 9/10

### 5. 祿神／排孛

多【天梁】、缺【巨門】：

> 9/10

### 6. 早期紫微祿／排金

多【天梁】、缺【文昌】：

> 9/10

因此六個獨立 pool class 中：

> **唯一 10/10 winner＝古印星。**

沒有第二個 10/10。

---

## 五、這直接回答「早期福 8留＋2換」而不用讀四個改干

早期福 fixed-star pool：

【太陰、巨門、廉貞、天梁、右弼、文曲、天同、文昌、武曲、貪狼】

Cold-start 古印星 projected pool：

【太陽、太陰、廉貞、巨門、天機、文曲、天同、文昌、武曲、貪狼】

只做集合差：

### 8 顆保留

- 太陰
- 巨門
- 廉貞
- 文曲
- 天同
- 文昌
- 武曲
- 貪狼

### 必須退出

- 天梁
- 右弼

### 必須進入

- 太陽
- 天機

所以：

> **「8 hold + 2 pool swap」可以在完全不知道甲乙丁戊 change mask 的情況下獨立得到。**

這把過去 §803 的 minimum-rewrite counterexample 重新定位得更清楚：

- pool evolution 本身就是 8+2；
- stem-position rewrite 則是另一層 6 hold + 4 position changes；
- 兩者不可混成同一個問題。

---

## 六、Astra 提的三組 contrast，現在可逐組回答

### 6.1 為什麼昌、曲入忌，輔、弼不入？

古印星 pool 保留【金、水】。

獨立 carrier codebook：

- 金 → 文昌
- 水 → 文曲

所以昌曲自然被選入。

早期《紫微數》雖另有：

- 左輔＝土星
- 右弼＝水星

但這屬更寬的元素／輔星 affiliation。

若把「同元素即可替代」也算成等價 carrier：

- 土可選貪狼／左輔
- 水可選文曲／右弼

則 pool 不再唯一。

所以真正有辨識力的不是泛五行語義，而是：

> **old-body → fixed-carrier codebook 的層級。**

在 strict codebook 下：

> 昌曲入，輔弼不入。

### 6.2 為什麼貪狼、廉貞入，破軍不入？

codebook：

- 土 → 貪狼
- 計 → 廉貞
- 火 → 天機

破軍在同系公開轉錄曾有【五鬼，火星又大耗星，破軍】，但：

1. 該項在 §731 只定 B 級；
2. 本機原影較糊；
3. 同系後文對五鬼曜體另有水的異文；
4. 火→天機有更穩定的【天驛＝火星＝天機】與正魁 codebook 支持。

所以 strict carrier codebook 選：

- 貪狼
- 廉貞
- 天機

而不選破軍。

若把較弱火類身份全部放寬，pool 會產生替代解；所以不能單靠「都屬火」來選。

### 6.3 為什麼天機、天同入，而天梁不入？

這一組最乾淨。

codebook：

- 火 → 天機
- 木 → 天同
- 炁 → 天梁

《星學大成》卷一〈論印星〉：

> 甲木乙日丙是熒，丁月戊土己羅辰，庚金辛計壬逢水，癸人見孛是印星。

並明說：

> **十一曜獨炁不與。**

所以：

- 火保留 → 天機入；
- 木保留 → 天同入；
- 炁唯一被排 → 天梁出。

這不是後見語義，而是古表本身直接給出的 set exclusion。

---

## 七、broad-affinity 負控：若只靠五行語義，會有 8 個 pool

為防止把 codebook 偷換成「任何同元素都算」，另做 broad negative control：

- 火 → 天機／破軍
- 土 → 貪狼／左輔
- 水 → 文曲／右弼
- 其他維持 direct codebook

古印星十曜因此可生成：

> **8 個不同 fixed-star pool**

其中只有 1 個是 mature Ji。

所以：

> **「忌喜某五行／某類星」不足以 cold-start 唯一選星。**

真正有用的是：

> 【古印星 body pool】  
> ×【獨立 early body→fixed carrier codebook】

這個組合。

---

## 八、證據分級

### 可以升高的

依 §808 校正，Carrier-pool comparison 應定為：

> **PRE-REGISTERED CANDIDATE UNIVERSE / UNIQUE POST-REVEAL EXACT FIT / TARGET-BLIND POOL SELECTOR OPEN**

理由：

- 不讀 mature Ji stem assignment；
- 不讀 residual relation；
- 不讀 Q/K mask；
- 20 個舊 selector 先完成 candidate-universe；
- 去重後 6 個完整 pool class；
- 唯一古印星 10/10，其餘全部 9/10。

### 仍不能說的

不能因此說：

> 古人明文規定「成熟化忌取〈論印星〉pool」。

因為：

- 仍沒有 specific table-switch／composition sentence；
- §799–801 的 historical adoption bridge 仍 OPEN。

所以歷史層仍是：

> **independent source pool exists + unique structural fit**

不是：

> **direct ancient mature-Ji generator instruction**

---

## 九、對 §801–806 的影響

### §801

原本將獨立〈論印星〉十曜 pool 寫成：

> candidate carrier universe／結構約束

這個保守寫法沒有錯。

§807 現在可再補：

> 在 cold-start pool competition 中，它不是任一 candidate，而是目前已登記完整十曜 pool 中唯一 10/10 winner。

因此 algorithmic confidence 上升；specific historical adoption 不變。

### §804

乙位最後需要 global pool-like constraint。

§807 現在提供一個更強的 independent global pool candidate：

> 古印星 pool 可在不讀 Ji stem positions 下先獨立產生 mature carrier set。

但「為何 Ji 必須採此 pool」歷史 switch 仍未直證。

### §805–806

這兩節處理的是：

> 已知 carrier pool 後，哪些 stem 要改、如何由 mature Q/K 形成 mask。

§807 與它們互補，不互相替代。

現在整體更清楚：

> **Route C pool selection：先獨立解出十顆是誰。**  
> **Route B mask selection：再解哪些位置要改。**  
> **carrier assignment：最後解十顆怎麼排進十干。**

---

## 十、下一步

依 §808 校正，Astra 的「從零開始」第一問尚未閉合：我們已證六個事前候選中〈印星〉是唯一成熟答案 exact fit，但尚不能在遮住成熟答案時獨立選定它。

排位研究仍可條件式繼續。其前提必須明寫為：

> **以下給定獨立〈印星〉投影 pool。**

在這個條件下再問：

> **古印星 projected pool 已知後，為什麼這十顆最後排成  
> 甲太陽、乙太陰、丙廉貞、丁巨門、戊天機、己文曲、庚天同、辛文昌、壬武曲、癸貪狼？**

也就是：

> **candidate pool conditionally fixed for assignment study；target-blind pool selector still open。**

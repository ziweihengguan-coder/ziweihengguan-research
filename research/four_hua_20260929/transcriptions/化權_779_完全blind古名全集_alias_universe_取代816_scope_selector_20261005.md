# §779 完全 blind 古名全集 alias universe：不使用816也可唯一圈出成熟化權位置

日期：2026-10-05

## 一、目的

§776證明：若只保留Q0、廉退紫入後的10星pool、carrier守恆與同干四化不重，而不提供816或等價scope selector，generic swap／cycle family仍有7個two-swap與40個three-cycle survivors，因此當時把816定級為：

> MINIMAL-NECESSARY WITHIN CURRENT AUDITED TARGET-FREE FAMILY

§778因此留下唯一值得再攻的算法問題：

> 能否事前固定一個完整古名候選宇宙，不讀成熟化權位置，也不預先指定乙壬癸，讓古籍自身的命名關係把同一scope圈出？

本節即執行此blind test。新增可重跑：

- `research/four_hua_20260929/quan_779_blind_wyg_old_name_universe_audit_20261005.js`

## 二、blind protocol

### 1. 上游狀態先凍結

不讀成熟化權target，固定§775由：

> WYG general operator `Quan(g)=Lu(g−1)`
> ×《紫微數》固定祿row

生成的Q0：

> 甲破、乙廉、丙機、丁同、戊陰、己貪、庚武、辛陽、壬巨、癸梁

再沿§636／639／777已獨立建立的pool normalization：

> 廉退紫入

得到位置尚未修正的base：

> 甲破、乙紫、丙機、丁同、戊陰、己貪、庚武、辛陽、壬巨、癸梁

因此10星pool事前固定為：

> 破軍、紫微、天機、天同、太陰、貪狼、武曲、太陽、巨門、天梁

注意：本節不重新解「廉為何退、紫為何入」；只測在此上游pool已獨立固定後，位置／scope是否仍非得依賴816。

### 2. WYG權曜體對十干的配對事前固定

依WYG卷一general operator，十干權曜體固定為：

| 干 | 甲 | 乙 | 丙 | 丁 | 戊 | 己 | 庚 | 辛 | 壬 | 癸 |
|---|---|---|---|---|---|---|---|---|---|---|
| 權曜體 | 羅 | 火 | 孛 | 木 | 金 | 土 | 月 | 水 | 炁 | 計 |

這不是由成熟斗數權表倒推，而是§773–775已由WYG十曜矩陣與general operator獨立固定。

### 3. 古名dictionary事前固定

只使用已人工校讀的乙亥字《紫微數》古名正規化全集，包括：

- 天暴＝廉貞
- 天驛＝天機
- 鳳皇＝天同
- 天宜／天醫＝太陰
- 嚴蛇／喧蛇＝貪狼
- 天雷＝武曲
- 太常＝太陽
- 白衣＝巨門
- 進神＝天梁
- 五鬼＝破軍
- 太極＝紫微
- 天相＝天相
- 龍池＝文曲
- 鳳閣＝文昌
- 三台＝左輔
- 八座＝右弼

另保留同名固定星與天府、七殺等候選，避免候選宇宙只包成熟權會用到的星。

### 4. 命名grammar事前固定

只接受《星學大成》單曜章中明確具有「命名」功能的句型：

> 一名／又名／號／名為／名曰／元來是／原來是／謂之

一般同頁共現、同宮、拱照、喜忌、功能語，不視為alias。

因此這不是把某曜章出現過的所有固定星都塞入候選，而是只抽明確命名關係。

### 5. selection階段禁止事項

不提供：

- 816；
- 乙壬癸殘差scope；
- 成熟化權十干位置；
- mature target作候選裁剪；
- 以「能到成熟權星」為條件的人工作圖。

selection只允許：

1. 上游已生成的10星pool每星一次；
2. 各干候選必須來自該WYG權曜體的base carrier或上述blind naming grammar；
3. 同干祿／權／科／忌不重。

成熟權只在候選集合完全凍結後才開作validation。

## 三、blind抽出的完整候選宇宙

WYG單曜章按上述grammar自動抽得：

| 曜體 | 可達固定carrier |
|---|---|
| 木 | 天機 |
| 火 | 天梁、天機、天相、廉貞、武曲 |
| 土 | 天梁、天相 |
| 金 | 右弼 |
| 水 | 天機、文昌、紫微 |
| 月 | 太陰 |
| 炁 | 紫微 |
| 孛 | 破軍 |
| 羅 | 天府 |
| 計 | 天梁、巨門 |

其中三個與最後殘差直接相關、且都不是成熟表餵入的關鍵直文為：

- 火：**「火躔房宿號天梁」**
- 炁：**「此曜元來是紫㣲」**
- 計：**「巨獬宫白衣星」**，再由乙亥字古名dictionary正規化白衣＝巨門

連同各干原base carrier後，十干候選為：

| 干 | blind options |
|---|---|
| 甲 | 天府、破軍 |
| 乙 | 天梁、天機、天相、廉貞、武曲、紫微 |
| 丙 | 天機、破軍 |
| 丁 | 天同、天機 |
| 戊 | 右弼、太陰 |
| 己 | 天梁、天相、貪狼 |
| 庚 | 太陰、武曲 |
| 辛 | 天機、太陽、文昌、紫微 |
| 壬 | 巨門、紫微 |
| 癸 | 天梁、巨門 |

總候選表數：

> **9,216**

## 四、結果：9216 → pool 2 → pool＋row 1

### A. 只要求上游10星pool守恆

9,216張表中只剩2張：

#### 解A

> 甲破、乙梁、丙機、丁同、戊陰、己貪、庚武、辛陽、壬紫、癸巨

#### 解B

> 甲破、乙紫、丙機、丁同、戊陰、己貪、庚武、辛陽、壬巨、癸梁

也就是：

> 完整古名宇宙＋pool守恆本身，已把9,216壓成2。

這兩解恰好對應：

- 解B＝廉退紫入後尚未重新掛位的base；
- 解A＝乙、壬、癸三carrier重新配置後的唯一另一解。

selection至此仍未讀成熟權。

### B. 再加入同干四化不重

base解B在乙干出現：

> 乙權＝紫微  
> 乙科＝紫微

因此不通過同干四化不重。

解A十干全部通過。

所以：

> **pool 2 → pool＋row 1**

唯一blind solution：

> **甲破、乙梁、丙機、丁同、戊陰、己貪、庚武、辛陽、壬紫、癸巨**

### C. 最後才打開成熟權validation

成熟1581權表與唯一blind solution：

> **10/10**

exact mature solutions＝1。

因此不是「先看成熟答案再從9216裡挑一張」；在target仍遮住時，selection已經只剩一張。

## 五、對816定級的重大校正

§776的結論本身沒有錯，因它明確限定：

> WITHIN CURRENT AUDITED TARGET-FREE FAMILY

當時audited family是generic two-swap／three-cycle與既有結構限制。在那個family內，沒有816就不能唯一決定scope。

§779新增的是另一個此前尚未審計的selector family：

> **SOURCE-BOUNDED BLIND ALIAS UNIVERSE**

在這個family內：

> WYG正式命名grammar
> ＋上游已生成pool
> ＋同干四化不重

已能在不使用816的情況下唯一選出成熟位置。

所以今後不得再把816寫成：

> 「目前唯一target-free scope selector」。

應改成：

> **816＝一條獨立的古典幾何／方位scope selector；在generic swap/cycle family內minimal-necessary，但§779已證存在另一條不依賴816的blind古名selector。**

而§779新路線定級為：

> **BLIND SOURCE-BOUNDED ALIAS SELECTOR / UNIQUE WITHIN GRAMMAR-BOUNDED UNIVERSE**

## 六、最短算法鏈因此出現兩條獨立路線

### Route A：幾何／方位路線

> WYG祿前移  
> → 廉退紫入  
> → 816 scope  
> → 紫微系逆行8→1→6  
> → closed cycle  
> → mature 10/10

### Route B：古名全集路線

> WYG祿前移  
> → 廉退紫入  
> → WYG單曜正式命名alias universe  
> → pool守恆  
> → 同干四化不重  
> → unique mature 10/10

Route B不需要：

- 816；
- 逆行方向；
- 先指定三carrier cycle。

這不是說Route A錯，而是代表：

> **成熟權的10/10閉合現在有兩條彼此不同的target-free selector路線。**

這比單靠816更強，因最終表不再只是某一套洛書／北極幾何假設下的唯一產物。

## 七、但歷史adoption仍未直證

§779提升的是算法selector層，不是編表者自述層。

仍不能宣稱古人明寫：

> 「把《星學大成》各曜的號名全部列出，再依同干四化不重選表。」

同樣也沒有古人明寫：

> 「最後取816並閉環旋轉。」

因此specific historical adoption應重新整理為：

1. **C1**：WYG權operator特定套《紫微數》祿row——仍無direct connector；
2. **POOL**：廉退紫入的編表自述——仍無direct connector；
3. **POSITION/SELECTOR**：目前已有兩條target-free重建路線，但兩者的「編者實際採用哪一條」都未有direct connector。

換言之，§779削弱的是「816是算法必經路徑」這個必要性，不是抹去歷史證據缺口。

## 八、最終定級

| 層 | §779後狀態 |
|---|---|
| WYG general operator | DIRECT / CLOSED |
| Q0 | TARGET-FREE LOW-FREEDOM RECONSTRUCTION |
| 廉退紫入 | GENERATIVE CORE / RECONSTRUCTED ADOPTION |
| 816 route | INDEPENDENT GEOMETRIC SELECTOR / NOT GLOBALLY NECESSARY |
| blind alias route | UNIQUE SOURCE-BOUNDED TARGET-FREE SELECTOR |
| mature table | 10/10 VALIDATION CLOSED |
| specific historical adoption | DIRECT CONNECTOR NOT FOUND |
| VERSION_TIME | OPEN / NON-BLOCKING |

## 九、下一步

算法主線已比§778再收斂一層。下一個真正有資訊量的工作不是再找第三條漂亮公式，而是對§779做robustness ablation：

1. 逐一拿掉火→天梁、炁→紫微、計→白衣→巨門，確認哪幾條是不可消融bridge；
2. 把命名grammar分成「直接identity」與「躔宿／變段號名」兩級，測唯一性是否依賴較寬的state-name語法；
3. 只保留可合理前推到成熟表以前的古名層，再跑一次，檢驗是否仍能blind 10/10；
4. 若以上仍穩定，即可進入正式成文封板。

§779的核心結論可以簡寫為：

> **固定WYG權曜體與上游10星pool後，事前固定的古名全集及命名grammar把9,216張候選表壓成2張；再用同干四化不重即唯一選出成熟化權，事後validation 10/10。因此816不再是唯一target-free scope selector，而成為與blind alias selector互相獨立的第二條重建路線；歷史編表者究竟採哪種操作仍未有直接自述。**

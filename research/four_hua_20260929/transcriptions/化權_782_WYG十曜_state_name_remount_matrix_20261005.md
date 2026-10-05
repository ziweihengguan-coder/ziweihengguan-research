# §782 WYG十曜 state-name remount matrix：跨曜體重掛不是B1／B3孤例

日期：2026-10-05

## 一、目的

§781已把§779／780的歷史語義校正為：

> B1【火躔房宿號天梁】與B3【計都變段白衣→巨門】不是physical-body alias，而是跨曜體state-name bridge。

因此本節不再挑三個關鍵橋，而對WYG／四庫《星學大成》十曜單曜章的正式命名語料做全量可機讀審計：

> source body → 躔宿號名／變段主名／變段又名 → 早期《紫微數／玄藪》fixed-star名稱 → 早期attached body

核心問題只有一個：

> 這種「某曜借用另一曜體fixed-star名稱」究竟只是B1／B3巧合，還是《星學大成》本身存在可重複的general state-name reuse grammar？

新增可重跑：

- `quan_782_wyg_state_name_remount_matrix_audit_20261005.js`

## 二、資料範圍與保守限制

來源限定現有WYG／Kanripo：

- 木：卷14
- 火：卷15
- 土、金：卷16
- 水：卷17
- 月、炁：卷19
- 孛：卷20
- 羅：卷21
- 計：卷22

只抽正式命名語法：

1. `X躔某宿號Y`
2. `某宮A星，又名B星`（變段主名／又名分開計）
3. B2另行保留WYG直接identity-like句【此曜元來是紫㣲】

不把一般共現、詩句中的形容詞、功能詞硬當名稱。

早期紫微fixed-star dictionary仍沿用乙亥字《紫微數》＋《玄藪》已人工校讀對應，包括：

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
- 龍池／鳳閣／三台／八座＝文曲／文昌／左輔／右弼

並同時允許canonical fixed-star名稱本身，例如天梁、天機、紫微、破軍、右弼等，避免只承認古名、不承認直接同名字。

目前可機讀正式命名共487個label：

- 躔宿號名：249
- 變段主名：119
- 變段又名：119

變段理論上10曜×12宮＝120條，目前Kanripo可規則抽取119條；躔宿理論上更多，但有缺行／異體／轉錄空缺。因此本節只聲稱：

> **目前可機讀WYG轉錄語料的全量審計**

不把487說成原書所有命名的絕對完備全集。

## 三、全量命中結果

487個正式label中，命中早期紫微fixed-star名稱／別名共16次。

分類：

- cross-body：13
- same-body：2
- external-body（紫微→北斗／太極系）：1

即：

> **13/16＝81.25% 的命中，本身就是跨曜體。**

而且16個命中分布於7/10個source body：

> 木、火、土、金、水、孛、計

不是只落在火、炁、計三個Route B關鍵曜。

14條distinct source→fixed-star edge如下：

| WYG source body | state-name／古名 | 早期fixed star | 早期attached body | 關係 |
|---|---|---|---|---|
| 木 | 天機 | 天機 | 火 | cross |
| 火 | 天梁 | 天梁 | 炁 | cross |
| 火 | 天相 | 天相 | 火 | same |
| 火 | 天暴 | 廉貞 | 計 | cross |
| 火 | 天驛 | 天機 | 火 | same |
| 火 | 天雷 | 武曲 | 羅 | cross |
| 土 | 天梁 | 天梁 | 炁 | cross |
| 土 | 天相 | 天相 | 火 | cross |
| 金 | 右弼 | 右弼 | 水 | cross |
| 水 | 天驛 | 天機 | 火 | cross |
| 水 | 紫微 | 紫微 | 北斗／太極 | external |
| 孛 | 五鬼／破軍 | 破軍 | 水 | cross |
| 計 | 天梁 | 天梁 | 炁 | cross |
| 計 | 白衣 | 巨門 | 孛 | cross |

其中火曜最明顯：

> 一個source body【火】的正式state-name，直接散到天梁／天相／廉貞／天機／武曲五個fixed-star target。

這一點本身就足以否定「state-name必須等於source physical body」的讀法。

## 四、兩個§781關鍵橋都嵌在更大的cross-body grammar裡

### B1：火→天梁

§781已定級：

> 火躔房宿號天梁

而早期固定字典：

> 進神＝紫氣＝天梁

所以B1是：

> 火 state-name → 天梁（attached body＝炁）

本節確認它不是單獨奇例；同一火曜還同時出現：

- 火→天暴→廉貞（attached body＝計）
- 火→天雷→武曲（attached body＝羅）

也就是同一source body在不同state下，直接借用多個其他曜體的fixed-star詞彙。

### B3：計→白衣→巨門

§781已定級：

> 計都某變段state＝白衣  
> 早期紫微字典白衣＝孛＝巨門

本節確認計曜還有另一個獨立cross-body例：

> 計躔斗宿號天梁  
> 天梁attached body＝炁

所以【計借用另一曜體fixed-star名稱】也不是只靠白衣一例。

### B2：炁→紫微

WYG另有直接句：

> 此曜元來是紫㣲

這仍是Route B三橋中最強的identity-like witness，與上述state-name grammar分層保留，不混成同一證據等級。

## 五、命中不是平均散布，而偏向「變段主名」

按命名層分類：

| 類型 | label數 | 命中fixed-star名 | 命中率 |
|---|---:|---:|---:|
| 躔宿號名 | 249 | 6 | 2.41% |
| 變段主名 | 119 | 9 | 7.56% |
| 變段又名 | 119 | 1 | 0.84% |

最值得注意的是：

> 變段主名9/119  
> vs 變段又名1/119

描述性one-sided Fisher enrichment：

- 變段主名 vs 變段又名：p≈0.00948
- 變段主名 vs 全部非主名：p≈0.00556

這裡只把p值當corpus diagnostics，不當歷史隨機抽樣證明。

但它至少排除一個很弱的解釋：

> 「只是任何地方偶然撞到相同兩三個字。」

因為命中明顯偏在**正式主名槽**，而不是均勻出現在secondary又名。

## 六、最重要的新判斷：general grammar現在可上調一級

§781結束時，Route B只能保守寫：

> SOURCE-BOUNDED CROSS-BODY STATE-NAME REMOUNT RECONSTRUCTION

因為B1／B3可能只是兩個巧合label。

§782後，這個風險大幅下降。

現有WYG同書直接顯示：

> **同一physical source body在不同躔宿／變段state，可以正式「號作／名作」另一套fixed-star名稱，而且這種cross-body reuse跨7/10 source bodies重複出現。**

因此可把general grammar定級上調為：

> **DIRECT SAME-WORK CROSS-BODY STATE-NAME REUSE GRAMMAR**

也就是：

- 「跨曜體名稱重用這種操作是否合法」：已有WYG同書大量直接例；
- 「B1／B3是否完全孤立」：否；
- 「是否能把這個general grammar直接等同成熟化權生成法」：仍否。

Route B因此可改寫為：

> **DIRECT SAME-WORK STATE-NAME REUSE GRAMMAR  
> + SOURCE-BOUNDED CROSS-TEXT REMOUNT RECONSTRUCTION**

比§781只寫lexical reconstruction更強，但仍不到specific historical adoption。

## 七、仍然不能上調的部分

本節沒有找到任何一句：

> 依變段星名改掛化權  
> 依躔宿號名取生年權星  
> 白衣故移巨門  
> 天梁之號故為乙權

所以仍不能說：

> 古代編表者已明文宣告用state-name remount生成成熟化權。

缺口仍是：

> **specific four-transform adoption sentence / table-construction instruction**

換句話說：

### 已閉合

- WYG十曜權operator
- Q0 7/10
- Route A 816幾何10/10
- Route B target-free 10/10
- Route B三橋必要充分
- cross-body state-name reuse是WYG同書systematic grammar，不是B1/B3孤例

### 仍OPEN

- C1：WYG權operator如何被明文投到早期紫微fixed-star row
- POOL：廉退紫入的編表者自述
- Route A specific adoption：816是否被編表者明文套化權
- Route B specific adoption：state-name reuse是否被編表者明文套化權

## 八、Route A／B重新定級

### Route A：816幾何

- algorithmic：target-free 10/10
- general grammar：北極三位／逆行／closed cycle都有直接古典操作語法
- specific 化權 adoption：OPEN

### Route B：state-name remount

- algorithmic：target-free 10/10
- minimal bridges：B1+B2+B3共同充分、各自必要
- general grammar：**DIRECT SAME-WORK CROSS-BODY STATE-NAME REUSE GRAMMAR**
- B2：DIRECT_IDENTITY_LIKE_IN_WYG
- B1/B3：不再只是孤立lexical coincidence；它們嵌在全書wide cross-body naming practice中
- specific 化權 adoption：OPEN

因此§781「Route A歷史操作語法明顯強於Route B」應微調成：

> **Route A仍有較完整的程序性operator provenance；Route B則已補上same-work general remount grammar。兩者都仍缺specific mature-Quan adoption。**

Route B現在不再只是algorithmic corroboration；它已具有一層直接古典general grammar，但仍不是第二份成熟化權的direct historical proof。

## 九、結論

> **§782全量掃目前可機讀WYG十曜487個正式命名label，命中早期紫微fixed-star名／古名16次，其中13次（81.25%）為cross-body，分布7/10 source bodies，形成14條distinct source→fixed-star edge。變段主名命中9/119，顯著高於變段又名1/119。火曜一體即跨掛天梁、廉貞、武曲等多個他曜fixed-star名稱，計曜除白衣→巨門外另有計躔斗宿號天梁。故B1／B3不再可視為孤立同名巧合；WYG本身直接保存一套general cross-body state-name reuse grammar。Route B可由單純lexical reconstruction上調為【DIRECT SAME-WORK CROSS-BODY STATE-NAME REUSE GRAMMAR + SOURCE-BOUNDED CROSS-TEXT REMOUNT RECONSTRUCTION】。但仍無古文明說以此生成成熟化權，所以specific adoption維持OPEN。**

下一步若繼續，不再需要再證「跨曜體state-name會不會發生」；這件事已閉合。最高價值改成：

> **查WYG／《紫微數／玄藪》是否存在把「變段／號名」明說成可用來轉換另一套星名、宮位表或十干功能表的meta-rule。**

若能找到這種「名稱可跨表轉掛」的明文，Route B就會再從general naming grammar上升到general remount operator；若找不到，§782已足以作正式成文封板。
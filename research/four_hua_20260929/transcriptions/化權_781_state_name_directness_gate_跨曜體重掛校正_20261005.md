# §781 state-name directness gate：§779／780的「alias」改定為跨曜體同名重掛

日期：2026-10-05

## 一、為何必須加這一節

§779與§780的數學結果本身成立：

- 完整古名候選9,216張；
- pool守恆後2張；
- 同干四化不重後唯一1張；
- 最後成熟validation＝10/10；
- minimal model只需三條bridge，且三橋共同充分、各自必要。

但「數學上可用同一名稱接起來」與「古文把兩者當成同一physical body／直接alias」是兩回事。

§780已指出B1、B3屬state-name。本節進一步做directness gate，結果必須修正用語：

> **B1與B3不是physical-body alias，而是WYG某曜在特定狀態下借用另一顆固定星名稱的跨曜體state-name bridge。**

因此§779／780的算法唯一性保留，但其歷史定級需下調。

新增可重跑：

- `quan_781_state_name_directness_gate_20261005.js`

## 二、B1：火→天梁不是火＝天梁

WYG火星章直接有：

> 火躔房宿號天梁

這句確實是直接文本。

但早期《玄藪／中天太極紫微數秘訣》固定星字典明寫：

> 進神，紫氣星，利見君子，天梁

也就是早期紫微數系裡，天梁的曜體對應是：

> **天梁 ↔ 進神 ↔ 紫氣**

而不是火。

因此B1的精確語義是：

> 火在房宿這個state，**號作「天梁」**。

不是：

> 火星這個physical body就是天梁。

定級：

> **STATE_NAME_CROSS_BODY_LABEL**

## 三、B2：炁→紫微仍是三橋中最強

WYG紫炁章直接說：

> 此曜元來是紫㣲

這比「某宿號某星」更接近無條件identity-like statement。

《玄藪》固定星字典另有：

> 太極，北斗星，紫微

兩邊taxonomy不同，但WYG本身已直接把「此曜」稱為紫微，因此B2仍可保留較高定級：

> **DIRECT_IDENTITY_LIKE_IN_WYG**

這也是三條bridge中唯一在strict identity-like gate下可以保留的一條。

## 四、B3：計→白衣→巨門不是計＝巨門

WYG卷22不是一般同頁偶遇，而是有明確章題：

> 計都變段星

其下十二宮state-name中，巨蟹宮條寫：

> 巨獬宫白衣星○又名天孛星主刑獄禁繫也

所以第一跳確實是：

> 計都在這個變段／宮位state → 白衣星

但本輪直接檢查整個WYG卷22：

> **「巨門」字串＝0**

亦無任何：

> 計都＝巨門  
> 白衣＝巨門

的WYG同句。

反而《玄藪》固定星字典明寫：

> 白衣，孛星也，防盜賊，巨門

因此早期紫微數系的直接對應是：

> **白衣 ↔ 孛星 ↔ 巨門**

而不是計都。

B3精確結構應寫成：

> 計都的某state被命名為「白衣」  
> → 另一套紫微固定星字典也使用「白衣」，並把它接到孛／巨門  
> → 以同名label作跨系統remount

定級：

> **STATE_NAME_CROSS_BODY_LABEL_TWO_HOP**

不能再簡寫成「計都alias巨門」。

## 五、其實B1、B3都出現曜體錯位

| bridge | WYG source body | WYG state label | 早期紫微固定星字典所屬body | 結論 |
|---|---|---|---|---|
| B1 | 火 | 天梁 | 紫氣 | cross-body state-name |
| B2 | 炁 | 紫微 | 北斗／太極系 | WYG identity-like |
| B3 | 計 | 白衣→巨門 | 孛 | cross-body two-hop |

這點與§731的舊反證完全一致。

§731已證：

> 十變曜body與固定星舊名字典雖在同一文本傳統共存，但不能按literal physical-body identity直接一對一join。

§779／780若把B1、B3稱為「alias identity」，就會不小心把§731已否定的physical-body join偷渡回來。

所以本節正式堵住這個漏洞。

## 六、strict directness gate：只准identity-like句時，成熟10/10不再生成

把minimal 3-bridge model分級。

### 寬state-name model

允許：

- B1 火號天梁；
- B2 炁元來紫微；
- B3 計state白衣＋白衣＝巨門。

結果：

- combinations＝8
- pool pass＝2
- row pass＝1
- pool＋row＝1
- exact mature＝1

即§780的10/10。

### strict identity-like only

只保留B2：

> 炁→紫微

B1、B3因為只是cross-body state-name，不准進入。

結果：

- combinations＝2
- pool pass＝1
- row pass＝0
- pool＋row＝0
- exact mature＝0

也就是：

> **若只接受直接identity-like bridge，Route B無法生成成熟權。**

這是非常重要的限制。

## 七、§779／780應如何重新定級

### 保留的結論

以下全部仍成立：

1. 在事前固定的WYG正式命名／state-name universe內，9,216候選唯一收斂成熟10/10；
2. minimal core是B1+B2+B3三條bridge；
3. 三橋共同充分、各自必要；
4. 這是一條不依賴816的target-free algorithmic reconstruction；
5. 所以816不是「算法上全域唯一」的scope mechanism。

### 必須降級的結論

不再使用：

> alias identity selector  
> 計都alias巨門  
> 火alias天梁

應改成：

> **LEXICAL / STATE-NAME REMOUNT SELECTOR**

或更完整：

> **SOURCE-BOUNDED CROSS-BODY STATE-NAME REMOUNT RECONSTRUCTION**

也就是說，Route B證明的是：

> 古籍現成的state-name詞彙足以在約束下唯一重建成熟表。

它沒有證明：

> 古代編表者就是把這些曜體視為同一星，或明確採此規則生成化權。

## 八、Route A與Route B現在應重新排序

### Route A：816幾何路線

算法上：

- 不是唯一必要，因Route B可替代。

歷史上：

- 北極亥子丑scope；
- 紫微逆行；
- 稀疏取位；
- 回首閉環；
- 年干化曜×局部三位；

都有直接古典操作語法。

尚缺的是：

> 把這整套直接套到成熟化權三carrier的specific adoption sentence。

### Route B：state-name重掛路線

算法上：

- 9,216→1；
- minimal 8→1；
- 三橋不可消融；
- target-free 10/10。

歷史上：

- B2直接；
- B1、B3只是跨曜體state-name；
- B3還要跨兩份文本二跳；
- strict identity-only gate＝0解。

因此目前最準確的排序是：

> **Route A與B在算法層都是獨立10/10重建；但在歷史直接操作語法層，Route A目前強於Route B。**

Route B是很強的獨立algorithmic corroboration，不是第二份獨立歷史直證。

## 九、下一步因此改變

原本§780把第一順位寫成找「計都→白衣→巨門」一跳直證。

§781後應再精確：

### 第一順位

不是泛找「計都＝巨門」，而是查：

> **古代星命是否存在「某曜的變段／躔宿state-name可直接作另一系統fixed-star carrier名稱」的明確轉掛語法。**

若有這種general grammar，B1與B3就能由「同名巧合」升成「有操作先例的state-name remount」。

### 第二順位

專找：

> 計都變段白衣  
> ↔ 孛／巨門

是否在同一早期文本中被明文串起。

### 第三順位

對WYG十曜所有「變段星／躔宿號名」做全量矩陣：

> source body → state-name → 紫微fixed-star body

看跨曜體名稱交換是否形成系統映射，而不是只有本次三個命中。

如果全量矩陣呈現規律，Route B才會真正從「詞彙重建」升成「可解釋的古典remount operator」。

## 十、本節最終校正句

> **§779／780的唯一性與10/10都有效，但其三橋不可解作literal physical-body alias。火→天梁與計→白衣→巨門都是跨曜體state-name重掛；只有炁→紫微接近WYG直接identity。strict identity-only時成熟解為0。因此Route B應降級為「source-bounded lexical/state-name remount reconstruction」；它證明816不是算法唯一必要，卻不能取代Route A目前較強的歷史操作語法證據。**

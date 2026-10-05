# §783 WYG名稱／狀態轉掛 meta-rule：一般命名轉換語法直接出土，成熟化權specific adoption仍OPEN

日期：2026-10-05

## 一、目的

§782已證：

> WYG十曜的跨曜體state-name reuse不是B1／B3兩個孤例，而是同書可重複觀察的正式命名現象。

下一個更嚴格問題是：

> 古文本身有沒有說明「為什麼不同曜體／不同層可以換名字、共用名字，或由另一層名稱來稱呼」？

如果只有大量實例而沒有meta-rule，Route B仍主要是現代從詞彙網路重建。

如果WYG自己明寫這種命名轉換原則，則Route B的**一般語法層**可以再升級；但仍必須與「成熟化權編表者是否真的採用它」分開。

新增可重跑：

- `quan_783_wyg_name_remount_meta_rule_gate_20261005.js`

## 二、M1：其名雖異，實同途

WYG卷27直接說：

> 二十八宿本脈絡，其名雖異，實同途。

同段緊接：

> 五星即五行，五行即地支之寄；地支即二十八宿之閫奧，二十八宿即辰舍之脈絡。

這不是某一顆星的偶然別名，而是一段明確的跨層對應論述。

其資料結構是：

> 五星  
> → 五行  
> → 地支  
> → 二十八宿  
> → 辰舍

而作者自己先給總判準：

> **其名雖異，實同途。**

因此至少可直接成立：

> **不同名稱／不同表示層，不必等於不同底層關係。**

定級：

> **DIRECT_NAME_DIFFERENCE_SAME_PATH_META_RULE**  
> **DIRECT_CROSS_LAYER_EQUIVALENCE_CHAIN**

這比§782單純統計「名稱真的被跨曜體使用」更高一層，因為WYG已留下作者層級的解釋語言。

## 三、M2：不謂之孛，而謂之月孛——依同類而改稱

WYG卷26〈太乙抱蟾〉解文直接說：

> 孛為太乙，蟾為太陰；不謂之孛而謂之月孛者，以孛與太陰同水之類也。

這句尤其重要，因為它不是只說「A又名B」，而是直接回答：

> **為什麼不叫原本的名字，而改用另一個帶關聯層的名稱？**

答案是：

> **因為兩者同屬水類。**

所以古文本身允許：

> physical body／原名  
> → 依共同分類關係  
> → 改稱另一個複合／關聯名稱。

這不是任意替換，而是有條件的class-based renaming。

定級：

> **DIRECT_CLASS_BASED_RENAMING_RULE**

這一條對Route B的價值高於一般「一名／又名」句，因為它證明古法作者確實會把「名稱轉換」當作可解釋的操作，而不是純粹辭書異名。

## 四、M3：不同physical bodies可共享同一state-name

WYG卷23〈老人星現〉說：

> 南極下生一星為老人星，在辰上亦謂之壽星；或金星、土星為壽元居於辰，日月居於其上，皆謂之老人星現。

這裡不是說：

> 金＝土＝日＝月＝南極。

而是說：

> 不同physical bodies在滿足指定位置／配置條件時，可以共同取得同一個named status【老人星現】。

因此直接支持：

> **state-dependent shared label**

也就是名稱可以掛在「狀態／格局」上，而不是永久綁死於唯一physical body。

定級：

> **DIRECT_STATE_DEPENDENT_SHARED_LABEL_RULE**

這與§781對B1／B3的校正完全相容：

- 火「號天梁」不表示火＝天梁physical body；
- 計都state「白衣」不表示計都＝巨門physical body；
- 名稱可以是state-level label。

## 五、三條meta-rule與§782全量矩陣如何拼起來

§782提供的是**大樣本實例層**：

- 487個可機讀正式命名label；
- 命中早期紫微fixed-star名／古名16次；
- 其中13次cross-body；
- 分布7/10 source bodies；
- 變段主名的命中集中度高於又名。

§783提供的是**作者解釋／meta-rule層**：

1. 【其名雖異，實同途】——名稱不同可共享底層通路；
2. 【五星即五行……二十八宿即辰舍之脈絡】——不同術數層可形成對應鏈；
3. 【不謂之孛而謂之月孛者……同水之類】——可因共同分類而改稱；
4. 【金土日月……皆謂之老人星現】——不同曜體可因共同state取得同一名稱。

因此現在可以排除兩種過度簡化：

### 錯誤A：同名必須代表同一physical body

否。

§782有大量cross-body實例，§783又有state-dependent shared-name明文。

### 錯誤B：跨體名稱只是偶然修辭，古法沒有名稱轉換觀念

也否。

卷26直接解釋「不謂A而謂B」的理由，卷27更直接說「其名雖異實同途」。

## 六、Route B可以上調到哪裡

§781：

> SOURCE-BOUNDED CROSS-BODY STATE-NAME REMOUNT RECONSTRUCTION

§782：

> DIRECT SAME-WORK CROSS-BODY STATE-NAME REUSE GRAMMAR  
> + SOURCE-BOUNDED CROSS-TEXT REMOUNT RECONSTRUCTION

§783後可再精確為：

> **DIRECT GENERAL NAME／STATE EQUIVALENCE & RENAMING META-GRAMMAR**  
> **+ DIRECT SAME-WORK CROSS-BODY STATE-NAME REUSE**  
> **+ SOURCE-BOUNDED CROSS-SYSTEM FIXED-STAR REMOUNT RECONSTRUCTION**

也就是Route B目前已有三層：

### A. general meta-grammar：DIRECT

WYG自己直說：

- 名異可以同途；
- 不同層可以互相對應；
- 可以依共同類別改稱；
- 不同曜體可以共享state-name。

### B. concrete cross-body examples：DIRECT

§782的13個cross-body hits。

### C. 把這套語法套到早期紫微fixed-star dictionary，並用pool／同行約束重建成熟化權：RECONSTRUCTED

這一層仍不是古文明說。

## 七、仍然沒有被解決的最後缺口

本節**沒有**找到：

> 依變段名取化權  
> 依宿號改掛十干權星  
> 以同途之名換紫微四化  
> 白衣故移巨門為癸權  
> 火號天梁故乙權在天梁

所以不能寫成：

> 「《星學大成》已直接記載成熟紫微化權的state-name生成公式。」

正確說法仍是：

> **WYG已直接保存足以使Route B操作合法化的一般命名／狀態轉換語法；但把這套general grammar實際套入成熟化權表的specific adoption sentence尚未出土。**

因此specific mature-Quan adoption仍為：

> **OPEN**

## 八、Route A／Route B最新比較

### Route A：816幾何路線

- target-free mature validation：10/10
- 北極三位：direct古法scope
- 紫微逆行：direct古法orientation
- closed cycle／稀疏取位：有直接同型程序語法
- specific成熟化權adoption：OPEN

### Route B：名稱／state remount路線

- target-free mature validation：10/10
- 三橋B1/B2/B3：共同充分、各自必要
- cross-body reuse：§782同書全量直接支持
- general renaming/state-label meta-rule：§783直接支持
- specific跨系統套到成熟化權：OPEN

所以現在不宜再說：

> Route B只是詞彙巧合旁證。

更準確是：

> **Route B已有直接古典general grammar與大量同書實例；它與Route A一樣只差最後的specific mature-Quan adoption。**

兩者差別在於：

- Route A較像「程序／幾何生成器」；
- Route B較像「名稱／狀態對應與重掛生成器」。

## 九、結論

> **§783找到WYG自己的名稱轉換meta-rule。卷27明言「其名雖異實同途」，並建立五星→五行→地支→二十八宿→辰舍的跨層脈絡；卷26更直接說「不謂之孛而謂之月孛者，以孛與太陰同水之類也」，明示可依共同分類改稱；卷23又讓金、土、日、月等不同曜體在指定state下共同取得「老人星現」之名。結合§782的13/16 cross-body命中，可確認cross-body state-name reuse並非孤立巧合，而建立在WYG可直接辨認的一般命名／狀態轉換語法上。Route B因此由lexical reconstruction再上調為【DIRECT GENERAL NAME/STATE EQUIVALENCE & RENAMING META-GRAMMAR + DIRECT SAME-WORK CROSS-BODY STATE-NAME REUSE + SOURCE-BOUNDED CROSS-SYSTEM REMOUNT RECONSTRUCTION】。唯獨把此法明文套入成熟化權表的specific adoption sentence仍未出土。**

到這裡，「Route B是否有古典一般語法基礎」可以正式封板為**有**。

下一步若還要追，只剩真正最後一題：

> **是否存在一句／一表，直接把這種名稱／state轉掛法接到十干祿權科忌或成熟化權carrier。**

沒有新材料時，不應再用更多一般別名例堆節號；可以直接進入正式成文。
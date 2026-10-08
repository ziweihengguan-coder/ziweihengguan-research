# 化忌 §809｜《紫微數》福欄以前的上游來源：古表、二階 lookup 與 state-name remount 第一輪審計

日期：2026-10-08

## 一、研究問題

本輪不再先問「福怎麼變忌」，而把問題往上游重開：

> **在《紫微數》福欄以前，到底哪個古代功能表／operator 最有資格成為化忌真正的上游來源？**

因此分三層：

- **A層**：pre-Ziwei 星命功能表／operator；
- **B層**：《紫微數》早期福欄；
- **C層**：成熟化忌。

本輪只處理 A→B，成熟 Ji 不進候選生成或評分。

---

## 二、第一輪：單一具名古表／簡單母環 operator 無 winner

沿用既有：

- `early_fu_source_audit_20261008.js`
- `早期福上游與R4_有限規則審計_20261008.md`

結果：

1. 萬氏語義【化福】row→早期福：**1/10**。
2. 《三辰通載》傳本【天福】row→早期福：**0/10**。
3. 21條已登記具名古表直接原序：最高【萬氏天刑】**3/10**。
4. 全表正／反向＋十干位移，420候選／220 distinct row：最高【印星 reverse＋offset 3】**5/10**。
5. 十變母環正向：最高 **3/10**；正反向：最高 **4/10**。
6. 兩路分組：
   - 陰陽干 split：最高 **6/10**；
   - 前五／後五 split：最高 **7/10**；
   - 均 **0 exact**。
7. 固定星祿欄重排：最高 **3/10**。

故：

> **PRE-ZIWEI SINGLE-TABLE SOURCE：NO WINNER IN REGISTERED UNIVERSE**

此為「目前已登記來源／operator宇宙無 winner」，不是「歷史上不存在更早來源」。

---

## 三、第二輪：source-attested relation→secondary lookup composition 仍失敗

新增：

- `ji_809_upstream_composition_operator_audit_20261008.js`
- `ji_809_upstream_composition_operator_audit_20261008.results.json`

事前固定：

- 24張已登記古代十干 selector／異文支；
- 16個古典關係／二階 lookup map；
- 統一公式：

> **candidate(g) = source(T(g))**

候選 operator 包括：

- 比肩、劫財、食神、傷官、偏財、正財、七殺、正官、偏印、正印；
- 五合；
- 食神→五合【食合】；
- 十變權前一干；
- 既有干刑形式化；
- 干德；
- 琴堂【正官(七殺(g))】等。

這個 family 是「古書直接存在 relation→secondary lookup grammar」後的壓力測試，不表示每一個 T×source 組合都有 specific 古文。

### 結果

24×16＝**384 candidates**：

- 位置命中最高只有 **4/10**；
- winner：
  - 喜神注文辛木 × 十變權前一干；
  - 喜神歌文辛水 × 十變權前一干；
- 星池 multiset overlap 最高 **9/10**；
- **exact pool candidate＝0**；
- **exact positional candidate＝0**。

幾個真正有直接古法語法正控的 constructor 更弱：

| constructor | 早期福位置命中 |
|---|---:|
| 官星：正官→查祿 | 1/10 |
| 天廚：食神→查祿 | 1/10 |
| 食合：食神→五合→查祿 | 0/10 |
| 十變權：前一干→查祿 | 0/10 |
| 琴堂衝干對祿：正官(七殺)→查祿 | 1/10 |

所以：

> **RELATION→SECONDARY-LOOKUP COMPOSITION：NO GENERATOR FOUND**

即使允許比「整體平移」更接近古書實際算法的二階查表，早期福仍沒有被生成。

---

## 四、新 invariant：早期福不是另一張十曜排列，而是「十曜核心 − 火 + 水」

十變曜核心 pool：

> 火、孛、木、金、土、月、水、炁、計、羅

早期福還原舊曜：

> 月、孛、計、炁、水、水、木、金、羅、土

兩者 multiset 精確差：

> **移出：火**  
> **增加：第二個水**

也就是：

> **EARLY-FU BODY POOL = TEN-BIAN CORE − 火 + 水**

這個結構比「哪一張古表最像」更有辨識力。

它意味著：

1. 純 permutation／reindexing 不可能生成早期福 pool；
2. 真正 upstream operator 若來自十曜層，至少還必須有一個 **non-bijective carrier event**；
3. 同一水曜最後還要分成：
   - 戊＝八座／右弼；
   - 己＝龍池／文曲。

因此必須同時解：

> **position selector + non-bijective body remount + fixed-star carrier selector**

而不是只有十干平移。

---

## 五、不能只看曜體：早期福真正原始 carrier token 是十個 state-name

早期福在《紫微數／玄藪》原始異名層應先保留為：

| 干 | raw carrier token | fixed star | attached body |
|---|---|---|---|
| 甲 | 天宜 | 太陰 | 月 |
| 乙 | 白衣 | 巨門 | 孛 |
| 丙 | 天暴 | 廉貞 | 計 |
| 丁 | 進神 | 天梁 | 炁 |
| 戊 | 八座 | 右弼 | 水 |
| 己 | 龍池 | 文曲 | 水 |
| 庚 | 鳳凰 | 天同 | 木 |
| 辛 | 鳳閣 | 文昌 | 金 |
| 壬 | 天雷 | 武曲 | 羅 |
| 癸 | 嚴蛇 | 貪狼 | 土 |

這一層比「月孛計炁水水木金羅土」保留更多資訊。

尤其戊／己在 body 層都只是【水】，但 raw-name 層是兩個不同 carrier：

> 八座 ≠ 龍池

所以早期福真正 upstream 若存在，很可能不是先算 physical body 再唯一命名；也可能是：

> **先取得 state-name／功能 carrier，再由早期紫微 fixed-star dictionary remount。**

---

## 六、WYG state-name grammar：目前最有資格的 operator class，但 specific row 尚未找到

§782–783 已直接證明《星學大成》存在：

1. **cross-body state-name reuse**；
2. **不同 physical body 共享／借用 fixed-star 名稱**；
3. 【其名雖異，實同途】的跨層 equivalence meta-rule；
4. 【不謂之孛而謂之月孛……同水之類】的 class-based renaming；
5. 不同曜體在指定 state 下共享同一名稱。

因此就「哪一類 operator 有資格打破 physical-body identity」而言，目前最強的是：

> **DIRECT GENERAL NAME／STATE EQUIVALENCE & RENAMING META-GRAMMAR**

而不是十曜 permutation。

但這仍必須接受 specific provenance gate。

新增：

- `ji_809_early_fu_state_name_provenance_audit_20261008.js`
- `ji_809_early_fu_state_name_provenance_audit_20261008.results.json`

沿用 §782 同一份 WYG/Kanripo 十曜章 corpus 與同一 formal-label parser：

- formal labels：487。

早期福 raw token 在正式 planetary state-name 中：

> **exact coverage＝3/10**

只直接找到：

- 白衣：計曜 formal state-name；
- 天暴：火曜 formal state-name；
- 天雷：火曜 formal state-name。

其餘：

- 天宜／天醫；
- 進神；
- 八座；
- 龍池；
- 鳳凰；
- 鳳閣；
- 嚴蛇／喧蛇；

雖有多個詞在《星學大成》全書其他語境出現，但**不在§782同一 formal planetary-state parser 中形成十干 carrier row**。

所以現在必須嚴格寫：

> **STATE-NAME REMOUNT = LEADING OPERATOR CLASS**  
> **SPECIFIC EARLY-FU STATE-NAME GENERATOR = NOT FOUND**

### §809-C2 更新：同文本已找到 functional-role→heterogeneous carrier 的直接 worked selector

回讀七欄表前一段，發現《玄藪》直接明列【定先後勇、正馬、文星、武曲例】：

- 寅午戌：文星＝天驛，武曲＝天雷；
- 申子辰：文星＝龍池，武曲＝喧蛇；
- 巳酉丑：文星＝鳳凰，武曲＝暗金；
- 亥卯未：文星＝進神，武曲＝天暴。

這不是研究者抽象，而是同一 early-Ziwei family 的 source-attested selector：

> **branch class → functional role → old-name carrier**

而且八個 carrier 與福欄 raw row 直接重合【暴、進、龍、鳳、雷、蛇】6/10，並跨主星 old-name 與輔曜 namespace。故 leading class 可由抽象【state-name remount】上調為：

> **DIRECT SAME-TEXT FUNCTIONAL-ROLE→HETEROGENEOUS OLD-NAME CARRIER SELECTION / REMOUNT GRAMMAR**

但仍須守住兩個邊界：

1. 這個 worked selector 以年支三合組為 index，不是十干，不能直接生成福欄；
2. 精確句目前只在《中天太極紫微數秘訣／玄藪》家族命中，尚未前推到現存《十八飛星》或更早星命母本。

同時七欄整體 cyclic control 顯示：唯一10/10固定shift只有【祿↔禍＝shift5】；福與任一欄最高僅3/10。carrier pool亦分層：祿／禍完全留在十星core，福則為core 7顆＋右弼／文曲／文昌三顆。這支持七欄不是一個環加七個offset，而是混合【circulant backbone＋functional remount】的編表層。詳見[§809-C2](化忌_809C2_七欄geometry_同文本functional_selector正控_20261008.md)與audit（未隨附：`ji_809c2_seven_column_selector_geometry_audit_20261008.js`）。

---

## 七、§809 現在真正的排名

### 第一名：state-name／carrier remount operator class

理由：

- 有 direct 古法 general grammar；
- 能合法允許 cross-body；
- 能容納一曜多名／一名跨曜；
- 理論上可以解釋 body 層無法解的【水→八座／龍池】分流。

但：

- 尚無古文把十個早期福 raw token 按十干組成同一表；
- 尚無 specific rule 生成這十個 token。

定級：

> **LEADING CLASS / SPECIFIC SOURCE OPEN**

### 第二名：relation→secondary lookup

理由：

- 官星、天廚等有 direct 古法正控。

但：

- 384 candidate audit最高4/10；
- exact pool 0；
- direct constructor正控只有0–1/10。

定級：

> **GENERAL GRAMMAR DIRECT / EARLY-FU GENERATOR NEGATIVE**

### 第三名：單一母表／十曜母環 permutation

第一輪已失敗。

定級：

> **NO WINNER IN REGISTERED UNIVERSE**

---

## 八、下一個真正值得找的 source

不要再泛搜「化忌」「福」「印」。

應只找能滿足下列任一條的新原件：

### Gate A：raw carrier row

1581以前或更早文本直接出現多個下列 token，且**按十干索引**：

> 天宜／白衣／天暴／進神／八座／龍池／鳳凰／鳳閣／天雷／嚴蛇

尤其若出現 5 個以上同序，價值極高。

### Gate B：state-name selector

古文直接說：

> 某十神／某功能 role → 取某曜之號／某變段名／某名星

能把「十干 role」接到「state-name carrier」。

### Gate C：non-bijective remount

古文直接允許同一基礎曜：

> 水 → 兩個不同 fixed-star carrier

並給出 stem／role／state selector，可以區分：

> 戊八座／己龍池。

### Gate D：A→C direct

若某 pre-Ziwei functional system 能完全繞過早期福，直接 target-blind 約束成熟 Ji，也保留競爭資格。

---

## 九、目前最精確結論

> **§809 第一輪沒有找到「化忌真正上游母表」。**

但它已經把假說空間從：

> 哪張十干表？

縮成：

> **哪個古代 state-name／carrier remount system，能把十干功能角色轉成早期固定星 carrier？**

目前最佳研究方向不是再找另一張十曜排列，而是追：

> **pre-Ziwei functional role → state-name → fixed-star carrier**

這條三層 composition。

Route C【福→derived-印→印星pool】仍保留為下游候選，但不再被當作§809的預設上游答案。

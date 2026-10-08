# §809-C1 早期福 raw carrier 的異質 namespace 審計：不是一張舊 state-name 表，而是跨系統 remount lexicon

日期：2026-10-08（臺灣時間）

> **§809-C2 校正註（同日）：** 本節的「異質 namespace」應理解為**詞彙遠源／上游來源異質**，不是說《玄藪》七欄編表當下仍在臨時跨多本書取詞。C2回讀同文本後確認：到《中天太極紫微數秘訣／玄藪》層，天醫／白衣／天暴／進神／鳳凰／天雷／喧蛇等已被統一收編為 fixed-star old-name dictionary，龍池／鳳閣／台座亦已成同一技法系統的輔曜；而七欄表之前更直接存在【文星／武曲→依年支組換掛不同 old-name carrier】的 worked selector。故最準確模型改為【heterogeneous historical sources → early-Ziwei unified lexicon → functional carrier selector/remount】。

## 一、問題

§809主審計已證：

- 21條具名古表／母環／正反位移無 exact winner；
- 384個 relation→secondary lookup 候選仍 0 exact；
- 早期福 old-body pool = 十變核心 − 火 + 第二個水；
- WYG正式 planetary state-name corpus 對早期福 raw token 只覆蓋 3/10。

本節不再問：

> 「哪一張古代 state-name 表等於早期福？」

改問：

> **早期福十個 raw carrier token 本身，是否其實來自不同古代 namespace？**

若答案為是，則 upstream generator 應優先建模為：

> functional selector → heterogeneous name source → fixed-star remount

而不是：

> single old table → permutation。

---

## 二、目標 raw row

早期《紫微數／玄藪》福欄保留的 raw carrier：

| 干 | raw token | fixed star | attached old body |
|---|---|---|---|
| 甲 | 天宜（異本／同系見天醫） | 太陰 | 月 |
| 乙 | 白衣 | 巨門 | 孛 |
| 丙 | 天暴 | 廉貞 | 計 |
| 丁 | 進神 | 天梁 | 炁 |
| 戊 | 八座 | 右弼 | 水 |
| 己 | 龍池 | 文曲 | 水 |
| 庚 | 鳳凰／鳳皇 | 天同 | 木 |
| 辛 | 鳳閣 | 文昌 | 金 |
| 壬 | 天雷 | 武曲 | 羅 |
| 癸 | 嚴蛇／喧蛇 | 貪狼 | 土 |

---

## 三、第一族：真正的 planetary state-name —— 3/10

既有：

- `ji_809_early_fu_state_name_provenance_audit_20261008.js`
- 同名 results.json

沿 §782 完全相同的 WYG/Kanripo 十曜 formal-label parser，487筆正式 planetary state-name 中只直接命中：

### 乙：白衣

《星學大成》卷二十二、〈三辰通載・計都〉：

> 【巨獬宮白衣星，又名天孛星】

所以：

> 白衣 = 計都在巨蟹／巨獬宮的正式變段名。

注意：早期福卻把【白衣】掛到【巨門／孛】。

這本身就是一個 cross-body remount 正控：

> 計都 state-name【白衣】  
> → 早期固定星 carrier【巨門／孛】

不是 physical-body identity。

### 丙：天暴

《星學大成》卷十五〈三辰通載・火星〉：

> 【寶瓶宮天暴星】  
> 【火躔軫宿號天暴】

即：

> 天暴 = 火星正式 state-name。

早期福卻掛到：

> 廉貞／計。

再次是 cross-body reuse。

### 壬：天雷

同卷火星變段：

> 【獅子宮天雷星】

即：

> 天雷 = 火星 state-name。

早期福則掛到：

> 武曲／羅。

也是 cross-body reuse。

故 formal planetary-state exact coverage：

> **3/10**

而且三個全都不是「原曜體照抄」，反而是：

> **name 被搬到另一 carrier。**

這使 §782–783 的 general state-name remount grammar 與早期福高度同型。

---

## 四、第二族：宋代祿命／神煞術語 —— 進神

《五行精紀》卷十九直接有：

> 【論進神】

並列甲子、甲午、己卯、己酉等進神，另解：

> 【順太歲而行曰進神，逆太歲而回曰退神】

因此【進神】至少在南宋已是一個正式祿命／神煞 operator-name。

但它不是 WYG十曜 formal planetary-state name。

早期福卻將：

> 進神 → 天梁／炁

所以此格最安全的 provenance 分類是：

> **PRE-ZIWEI SHENSHA/FUNCTIONAL TOKEN → FIXED-STAR REMOUNT**

不是：

> planetary state-name inheritance。

這是第一個直接證明 raw row 混入另一 namespace 的格。

公開核：
- https://zh.wikisource.org/zh-hant/五行精紀

---

## 五、第三族：宋代星命文曜／輔曜語彙 —— 龍池、鳳閣

南宋《三辰通載》月曜章直接有：

> 【身命限中俱見照，龍池鳳閣佐君王。】

這至少證明：

> 【龍池／鳳閣】作為可照身命限、具文貴語義的星命吉曜詞彙，在南宋星命文本已存在。

它們不是同一套 planetary state-name parser 中的 physical-body變段名。

早期福卻分別 remount 為：

- 己【龍池】→文曲／水；
- 辛【鳳閣】→文昌／金。

而且它們恰好都落到後世固定星系的文章星。

因此目前最安全可寫：

> **PRE-ZIWEI AUSPICIOUS/LITERARY STAR VOCABULARY → FIXED-STAR REMOUNT**

公開核：
- 《三辰通載》月曜：
  https://www.shidianguji.com/zh/book/7461522579262537769/chapter/1loio4bpijmsb

---

## 六、第四族：官位／格局詞，而非已證獨立 planetary state —— 八座

南宋《五行精紀》直接有：

> 【祿馬同鄉，不三台而八座】

此處【三台／八座】首先是高官顯位語彙。

《三辰通載》／萬氏重編層也多見：

> 【兩府八座之命】  
> 【三台八座】

但目前未在 §782 同一 planetary formal-state corpus 中找到【八座】作某一 physical body 的正式變段名。

所以戊位：

> 八座 → 右弼／水

不能假設源自某曜體名表。

暫定：

> **OFFICIAL-RANK / AUSPICIOUS-GRADE TOKEN → FIXED-STAR REMOUNT**

公開核：
- 《五行精紀》：
  https://www.shidianguji.com/zh/book/NGJ8922621209348/chapter/1lnvyvwb9l4q0

---

## 七、第五族：目前仍沒有 pre-Ziwei specific source 的三格

### 甲：天宜／天醫

WYG全書可見【天醫】於其他神煞列表，但：

- §782 planetary formal-state corpus 0 hit；
- 未見可把該 token 接【月／太陰】的 pre-Ziwei direct constructor。

因此只可定：

> **LEXICAL PRESENCE / SPECIFIC SOURCE OPEN**

### 庚：鳳凰／鳳皇

宋代語料有大量【鳳皇】一般吉祥／比喻語，也有【連珠鳳皇】等命理詞，但本輪未找到一個可安全當作：

> stem-indexed stellar carrier

的 pre-Ziwei rule。

所以：

> **SPECIFIC ASTROLOGICAL CARRIER SOURCE OPEN**

### 癸：嚴蛇／喧蛇

WYG §782 corpus及全書均未得到同型 formal carrier hit。

目前最接近仍是早期《紫微數／玄藪》家族自身的【喧蛇／嚴蛇→貪狼】。

所以：

> **EARLY-ZIWEI-FAMILY LEXEME / PRE-ZIWEI SOURCE OPEN**

---

## 八、namespace matrix

| raw token | pre-/early source類型 | planetary formal state? | pre-Ziwei直接詞彙證據 | 目前定級 |
|---|---|---:|---:|---|
| 天宜／天醫 | 其他神煞詞／早期固定星別名 | NO | lexical only | source OPEN |
| 白衣 | 計都變段名 | YES | transmitted 三辰/WYG | cross-body remount direct positive |
| 天暴 | 火星宿號／變段名 | YES | transmitted 三辰/WYG | cross-body remount direct positive |
| 進神 | 祿命神煞/operator | NO | 宋《五行精紀》 | heterogeneous namespace direct |
| 八座 | 官位／格局詞 | NO | 宋《五行精紀》等 | heterogeneous vocabulary |
| 龍池 | 文曜／吉曜詞 | NO in §782 | 宋《三辰通載》 | heterogeneous star vocabulary |
| 鳳凰／鳳皇 | 吉祥／命理詞 | NO | 非specific carrier | source OPEN |
| 鳳閣 | 文曜／吉曜詞 | NO in §782 | 宋《三辰通載》 | heterogeneous star vocabulary |
| 天雷 | 火星變段名 | YES | transmitted 三辰/WYG | cross-body remount direct positive |
| 嚴蛇／喧蛇 | 早期固定星別名 | NO | 未見pre-Ziwei | source OPEN |

---

## 九、最重要的新 inference

這十格不再適合被視為：

> **一張遺失的「古十星表」**

因為可核 provenance 已顯示至少混有：

1. planetary state-name；
2. 祿命神煞/operator；
3. 文曜／輔曜詞；
4. 官位／格局詞；
5. 早期紫微家族特有／未溯源 lexeme。

所以更合理的資料模型是：

> **heterogeneous lexicon**
> → **selector**
> → **role/name remount**
> → **fixed-star carrier row**

而不是：

> old physical-body row
> → fixed permutation
> → early Fu。

---

## 十、對 §809 主線的影響

### state-name remount 仍是 leading class，但需改名

原：

> STATE-NAME REMOUNT

現在更精確應寫成：

> **HETEROGENEOUS NAME/CARRIER REMOUNT**

因為只用 planetary state-name 不足以覆蓋十格。

### 真正要找的 selector 變成

不是：

> 哪顆 physical body 對應哪個 state-name？

而是：

> **每個年干／functional role 依什麼規則，決定去「哪一個 namespace」取一個可 remount 的名稱？**

形式上：

> stem g  
> → functional condition / role  
> → namespace selector N(g)  
> → name token k  
> → fixed-star carrier

這才有能力解：

- 為何白衣／天暴／天雷取 planetary-state 名；
- 為何進神取祿命神煞名；
- 為何龍池／鳳閣取文曜名；
- 為何戊己同為水卻能分成八座／龍池兩個不同 carrier。

---

## 十一、下一個高資訊量 Gate

### Gate H：namespace selector

只接受能回答下列問題的古文／過渡表：

> **某十干 role／某功能條件，為何在某干選 planetary state-name，而另一些干選神煞／文曜／格局名？**

若找到一個 selector 能事前決定至少 5/10 namespace 類別，再驗 raw token，才有資格升級。

### 次優先：raw token cluster

繼續找任何 pre-Ziwei 文本同時共列：

> 白衣、天暴、進神、八座、龍池、鳳閣、天雷……

只要同一表能穩定共現 4–5 個以上，就可能找到真正中間 lexicon。

---

## 十二、結論

> **§809-C1 把 state-name 3/10 的負結果重新解讀成一個更強的正訊號：早期福 raw carrier row 本來就是異質 namespace 的混合物。白衣、天暴、天雷來自 planetary state-name 類；進神在宋代已有獨立祿命神煞身份；龍池、鳳閣在南宋星命中已是文貴吉曜語彙；八座則首先是官位／格局詞；天宜、鳳凰、嚴蛇仍未溯出 specific pre-Ziwei carrier source。因此真正 upstream 不應再找「一張十曜母表」，而應找【stem/role → namespace selector → name token → fixed-star carrier】的 heterogeneous remount operator。**

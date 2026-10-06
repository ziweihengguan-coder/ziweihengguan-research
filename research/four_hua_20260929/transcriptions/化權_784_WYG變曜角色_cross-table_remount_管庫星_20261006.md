# §784 WYG變曜角色 cross-table remount：管庫星明文關閉 general remount operator，specific mature-Quan adoption仍OPEN

日期：2026-10-06

## 一、目的

§782已證《星學大成》十曜正式state-name存在大量跨曜體重用；§783再找到WYG自己的general meta-rule：

- 「其名雖異，實同途」；
- 可因共同類別「不謂之A而謂之B」；
- 不同physical bodies可在共同state下共享同一named status。

但這仍留下最後一個方法論問題：

> 古法的「名稱／功能角色」到底只是描述詞，還是可以真的作為key，把同一顆曜重新掛到另一張表？

本節專查這個general remount operator，不再泛搜更多別名。

新增可重跑：

- `research/four_hua_20260929/quan_784_wyg_role_to_target_remount_gate_20261006.js`

## 二、D1：卷一直接明寫「變曜角色 → 宮位表」的cross-table remount

WYG卷一〈十干變曜所屬〉：

> 凡當年之變為天元禄者即其星之管官禄也……  
> 變為暗者屬相貌，變為福者屬財帛福德遷移，變為耗者屬兄弟，  
> 變為䕃者屬妻妾，變為貴者屬男女，變為刑者屬奴僕……  
> 變為囚者屬疾厄，**變為權者屬命宫**，  
> **此又變曜之所屬也，故名為管庫星云。**

這條的資料結構非常清楚：

> physical曜體  
> → 依生年干取得「祿／暗／福／耗／蔭／貴／刑／印／囚／權」之一  
> → 再依這個role掛到另一張「宮位／事類」target table  
> → 因而取得「管庫星」這個第二層表名

所以「權」不是只能留在原曜體上作形容詞；它可以作為**跨表索引鍵**：

> **變為權 → 屬命宮**

定級：

> **DIRECT_ROLE_TO_TARGET_TABLE_REMOUNT**

這正是§783後一直缺的general remount grammar。

但要注意：這裡remount的target是「宮位／事類」，不是紫微fixed-star carrier；所以它證明operator形態合法，還不能直接等同成熟化權的fixed-star重掛。

## 三、D2：同一卷又把「如何得到變曜角色」寫成可重跑算法

卷一〈變曜歌訣〉：

> 禄暗福耗䕃貴刑印囚權  
> 火孛木金土月水炁計羅

並直接舉例：

> 假如甲生人欲推何星化貴，則念至貴是第六字，又念火孛至月是第六字，便知月化貴也……餘依此推。

因此WYG自身不是只給一張lookup表，而是有完整兩段程序：

### Step A：由生年干／祿起點算role carrier

> stem / 禄起點  
> → count to role  
> → 得出何曜化某role

### Step B：由role再掛target domain

> 變為權  
> → 屬命宮

也就是WYG明文自身已有：

> **SOURCE → TRANSFORMED ROLE → SECOND TARGET TABLE**

這是本節最重要的結構閉合。

公開《古今圖書集成》藝術典卷568〈張果星宗二〉亦保留同型兩段：

- 「假如甲生人欲推何星化貴……餘倣此推」
- 「變為權者屬命宮……故其為管庫星」

但《古今圖書集成》是後出彙編，這裡只作平行傳承／文本校讀旁證，不拿來前推萬民英原編年代，也不當第二份前1581獨立見證。

## 四、D3：單曜章明示state-name與stem-role可同時掛在同一physical body

WYG卷15火星章：

> 入留段號天虹星……  
> 入逆段號天坎星……  
> 入伏段號走曜……

緊接：

> 甲生人以為禄主星  
> **乙生人以為權星**  
> ……

正文又明說：

> 又不可以日生火便言忌曜，須明喜樂好旺，  
> **或為禄主，或為權星，或是三方主，或作科名星**，  
> 詳其所臨宫分三合照臨察其災福。

因此同一physical body至少同時存在三層可變標籤：

1. 行段／state-name：天虹、天坎、走曜；
2. 生年干功能role：祿主、權星、囚星……；
3. 其他論命role：三方主、科名星等。

這直接反證：

> 一曜只能有一個永久identity label。

定級：

> **DIRECT_STATE_LABEL_AND_DYNAMIC_ROLE_COEXISTENCE**

這與§781–783的「state-name不是physical-body identity」完全一致。

## 五、D4：正式「變段星」表本身可以直接承載權語義

WYG卷21〈羅㬋變段星〉：

### 人馬宮

> 天威星，又名天印星，主印禄星貴也。  
> ……  
> **此是權星來入廟**。

### 天秤宮

> 地暗星，又名天柄星，**主權柄自為執事**。

### 獅子宮

> 龍首星，**又名大權星，掌握貴權**。

因此至少可直接成立：

> formal state-name table中的label可以攜帶「權星／權柄／大權星」功能語義。

定級：

> **DIRECT_STATE_NAME_WITH_QUAN_SEMANTICS**

這仍不是「把某state-name轉成成熟紫微化權carrier」；但它進一步排除「state-name純粹是無功能的詩性別名」這個弱解。

## 六、33份primary-source文字的specific-adoption gate

§784 audit限定primary-source text，避免研究者自己寫的MD把候選句污染回搜尋池：

- WYG/Kanripo《星學大成》卷000–030；
- 《玄藪・中天太極紫微數秘訣》校勘文字；
- 乙亥字《紫微數》人工校讀；
- 南陽堂《紫微斗數全書》四化原頁校讀。

合計33份source file。

### 先做寬proximity search

確實出現多個近距離命中，例如：

- 火星「留／逆／伏段號……」後很快接「乙生人以為權星」；
- 羅㬋「元自是權星」後另句「何以羅㬋號天首」；
- 羅㬋變段表直接有「此是權星來入廟」「又名大權星」；
- 計都躔室宿後有「大貴權星吉又昌」。

這些證明**命名、state、權語義確實高度共域**，但都不是因果接線。

### 再做strict causal/remount gate

預先限定真正能升specific-adoption的語法：

1. 因其／以其／由其「號／名／變段」→ 化權／為權星；
2. 依／按／據「變段／號名／別名」→ 取／定／化／移／掛 → 權；
3. 「號／名」→ 故／所以 → 化／移／換／掛 → 權；
4. 白衣／天梁／紫微／巨門 → 因／故／依／按 → 移／換／改掛 → 化權。

結果：

> **4類strict causal connector全部0命中。**

所以本節不能寫成：

> 「古文已說因號天梁所以乙權改掛天梁。」

也不能寫成：

> 「古文已說因白衣之名所以癸權改掛巨門。」

負控的精確意義只是：

> **在目前33份primary-source文字、上述預註冊因果語法中未找到specific connector。**

不是宣稱古籍所有可能措辭已被邏輯上排除。

## 七、Route B現在的證據鏈可正式分成四層

### B0：算法層

§779–780：

- 9,216 blind candidates；
- pool pass 2；
- 同干四化不重後1；
- mature validation 10/10；
- minimal B1+B2+B3三橋共同充分、各自必要。

### B1：跨曜體state-name實例

§782：

- 487正式label；
- 16命中早期fixed-star名／古名；
- 13/16 cross-body；
- 分布7/10 source bodies；
- 形成14條distinct edge。

定級：

> DIRECT SAME-WORK CROSS-BODY STATE-NAME REUSE

### B2：名稱／state meta-grammar

§783：

- 其名雖異，實同途；
- 不謂之孛而謂之月孛者，以同水之類；
- 不同曜體共同取得老人星現named status。

定級：

> DIRECT GENERAL NAME/STATE EQUIVALENCE & RENAMING META-GRAMMAR

### B3：role → second target table remount

本節§784：

- 變為權者屬命宮；
- 此又變曜之所屬；
- 故名為管庫星。

定級：

> **DIRECT ROLE_TO_TARGET_TABLE_REMOUNT**

因此Route B現在不只證「名稱可以換」，還證：

> **變曜function role本來就可以被拿來作另一張target table的remount key。**

## 八、仍然只差哪一條

到§784後，general operator層幾乎都已直接古文化：

1. 名稱可不同而同途：DIRECT；
2. 可因class/state改名：DIRECT；
3. state-name可跨曜體重用：DIRECT；
4. function role可重掛到第二target table：DIRECT；
5. role算法可由祿起點逐項計算：DIRECT；
6. Route B三橋在盲候選中唯一導出成熟表：10/10。

唯一仍然RECONSTRUCTED的是這個composition：

> **把「state-name／fixed-star名橋」本身，當作把十干權role從十變曜body轉掛到紫微fixed-star carrier table的lookup key。**

也就是還沒有：

> state-name X  
> → 因此取fixed-star Y  
> → 把某干權role掛到Y

這一句／一表。

所以specific mature-Quan adoption仍是：

> **OPEN**

## 九、Route A／Route B最新比較

### Route A：816程序／幾何

- target-free 10/10；
- scope、orientation、稀疏skip、cycle等general procedural grammar已有古典直接先例；
- specific mature-Quan adoption仍OPEN。

### Route B：名稱／state／cross-table remount

- target-free 10/10；
- cross-body state-name reuse DIRECT；
- name/state meta-grammar DIRECT；
- role-to-target-table remount DIRECT；
- specific「state-name作fixed-star權carrier lookup key」仍OPEN。

所以§784後不宜再把Route B形容成「只有詞彙巧合」或「只有一般命名語法」；它現在已經有真正的**direct remount operator**。

最準確定級：

> **DIRECT GENERAL NAME/STATE META-GRAMMAR  
> + DIRECT SAME-WORK CROSS-BODY STATE-NAME REUSE  
> + DIRECT ROLE→TARGET-TABLE REMOUNT OPERATOR  
> + SOURCE-BOUNDED CROSS-SYSTEM FIXED-STAR COMPOSITION RECONSTRUCTION**

## 十、結論

> **§784在WYG卷一找到真正的cross-table remount明文：「變為權者屬命宮，此又變曜之所屬也，故名為管庫星」。配合同卷〈變曜歌訣〉的逐項推角色算法，WYG已直接具有【source曜體→生年干變曜role→第二target table】的程序。卷15又證同一body可同時帶state-name與生年干role；卷21正式變段表更直接使用「權星／大權星／權柄」功能語義。故Route B缺少general remount operator的問題可正式關閉。33份primary-source文字的strict causal gate仍0命中，表示最後未閉合者已只剩【以state-name／fixed-star名橋作lookup key，把十干權role特定轉掛到成熟紫微fixed-star carrier】的specific adoption composition。**

下一步不再堆一般命名／別名／權語義例。

只有兩類新材料值得重開：

1. 明文「因／依／按某號名／變段名而移、取、定權星」；
2. 一張過渡表同時把十變曜role、state-name／古名與紫微fixed-star carrier排成可直接讀出的對照。

若沒有這兩類材料，Route B的general grammar至§784可正式封板，研究應轉正式成文，而不是繼續增加低資訊量旁證。

# 化忌 §804：carrier target universe消融——甲、丁可由同行排他逼出；乙最後仍依賴全局pool約束

日期：2026-10-07（臺灣時間）

## 一、目的

承§803，把問題嚴格分成兩層：

1. mask layer：哪些位置要改；
2. carrier layer：既然要改，究竟改成哪顆。

§803已確認mask selector尚未獨立閉合。本節故意先條件式固定成熟實際mask【甲、乙、丁、戊】，只問第二層：

> 在不讀成熟化忌target位置的情況下，既有古典／傳統relation候選能否唯一推出【日、月、孛、火】？

這是carrier-level negative control，不是完整化忌generator。

可重跑：

`research/four_hua_20260929/ji_804_carrier_universe_ablation_20261007.js`

## 二、候選宇宙不是§794–798四個known target，而採更寬的既有relation表

避免再次把成熟edge餵回去，本節不用§794–798單點【月→日、孛→月、炁→孛、水→火】作唯一候選。

改用專案9/30已登記的《變五行》相剋候選：

- 水→火／孛
- 炁→孛／火
- 孛→月／土
- 月→羅／計

另把早已登記的【月借日光→日】加入月的第三候選。

因此四個changed source的target universe為：

- 甲月→【羅、計、日】
- 乙孛→【月、土】
- 丁炁→【孛、火】
- 戊水→【火、孛】

總數：

> 3×2×2×2＝24組。

注意：此處《變五行》只作較寬relation universe負控；不把後出材料冒充1581前成熟四化原公式。

## 三、Stage 0：relation本身完全不唯一

只要求四格確實改到候選relation target：

> 24解。

成熟【日、月、孛、火】只是24組之一。

所以§794–798「四個成熟edge各自有古典relation witness」本身不能證carrier唯一性。

## 四、Stage 1：加入同干祿權科不重，24→4

對四個改入固定星，要求不與同干成熟祿／權／科重複。

結果只剩4組：

1. 【甲日、乙月、丁孛、戊火】＝成熟
2. 【甲日、乙月、丁孛、戊孛】
3. 【甲日、乙土、丁孛、戊火】
4. 【甲日、乙土、丁孛、戊孛】

這一層有兩個真正被迫的target。

### 甲：月→日被迫

月的候選：
- 羅→武曲：撞甲科武曲；
- 計→廉貞：撞甲祿廉貞；
- 日→太陽：不撞。

所以在本候選宇宙＋同行不重下：

> **甲唯一取日。**

### 丁：炁→孛被迫

炁候選：
- 火→天機：撞丁科天機；
- 孛→巨門：不撞。

所以：

> **丁唯一取孛。**

這兩格不需要全局pool就能被局部結構壓出。

但要再次強調：

> 同行四化不重是四欄對稱的structural constraint，不能因它在此有效就改寫成「忌一定最後生成」。

本節只說在mask已固定的carrier candidate消融中，它有辨識力。

## 五、Stage 2：再要求四個新target彼此不同，4→2

丁已被迫取孛。

戊候選：
- 火
- 孛

若四個changed target不能互相重複，戊不能再取孛，只剩：

> **戊取火。**

此時剩2組：

1. 【甲日、乙月、丁孛、戊火】＝成熟
2. 【甲日、乙土、丁孛、戊火】

所以前三格中：

- 甲日：局部同行排他閉合；
- 丁孛：局部同行排他閉合；
- 戊火：changed-target互異後閉合；
- **乙仍有月／土二解。**

## 六、Stage 3：最後只有全局carrier pool/no-duplicate才能定乙，2→1

六個hold位置為：

- 丙計
- 己水
- 庚木
- 辛金
- 壬羅
- 癸土

乙的兩候選：

- 月
- 土

若要求改入target不得與這六個hold carrier重複，則：

- 乙土撞癸土；
- 乙月不撞。

故只剩：

> **乙取月。**

完整row成為：

【日、月、計、孛、火、水、木、金、羅、土】

即成熟G0化忌舊曜row。

全十格互異亦同樣只剩此1解。

## 七、這個唯一性依賴什麼？

本節最重要的不是「終於又10/10」，而是把唯一性來源拆開。

### 局部可以解掉的

- 甲月→日：relation universe＋同行L/Q/K不重；
- 丁炁→孛：relation universe＋同行L/Q/K不重；
- 戊水→火：再加changed targets不重。

### 仍需全局pool才能解掉的

- 乙孛→月。

乙若只看local relation與同行四化，月、土都合法。

真正排掉土的是：

> 【癸已有土／整個row不能重複carrier】。

這已不是Q/K local occupancy，而是一個**global carrier-pool / conservation constraint**。

## 八、Route B沒有真正繞過§801的pool layer

§801正式模型的一個核心層就是：

> 獨立〈印星〉十曜pool作candidate carrier universe／結構約束。

§804顯示，即使改走Route B：

- 不使用印星table-switch；
- 先假定mask；
- 再用較寬relation universe；
- 加同行不重；

最後乙位仍需要一個全局「十carrier不重／完整pool」約束才能唯一化。

所以Route B的最準確定位不是：

> 完全取代§801 pool route。

而更像：

> **局部relation＋同行結構可以自行決定甲、丁，並在局部互異下決定戊；但乙仍把問題送回全局carrier universe。**

因此Route B沒有消滅pool layer，只是把它推遲到最後一格。

## 九、證據邊界

### 可以說

- relation options alone：24解；
- +同行L/Q/K不重：4解；
- +changed-target互異：2解；
- +不撞六個hold／全row十carrier互異：1解；
- 唯一解為成熟G0忌。

### 不能說

- 古人明文採用這四層filter；
- 十carrier互異本身就是古代化忌generator；
- 因為成熟解在最後唯一，所以化忌必然由前三欄最後補出；
- §801的印星pool歷史bridge因此已被取代。

特別是「全row carrier不重」本身仍需來源層級判定。成熟G0忌確實如此，但早期福本身有水重複，因此不能把它當所有早期功能表的普遍古法公理。

## 十、§804定級

本節定級：

> **CONDITIONAL CARRIER-UNIVERSE ABLATION / LOCAL TARGETS PARTIALLY FORCED / FINAL UNIQUENESS REQUIRES GLOBAL POOL-LIKE CONSTRAINT**

它把carrier層從「四條target-directed witness」前進到真正的candidate-universe消融，但仍沒有形成獨立歷史generator。

對Route B的最新結論：

1. mask layer仍未閉合；
2. carrier layer中甲、丁已有局部結構辨識力；
3. 戊需target互異；
4. 乙仍需global pool；
5. 因此Route B目前不能完全繞過§801 carrier-universe問題。

下一步若繼續，只值得查：

> **是否存在不借獨立〈印星〉table-switch、但可獨立證明成熟忌應形成十carrier完整不重pool的古典規則。**

若找不到，Route B最多只能作§801的部分結構旁證，而不是替代生成鏈。

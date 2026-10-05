# §717 mother-table／骨架全候選 MDL 負控：科、忌位置母表通過；權出現祿／禍循環等價類

日期：2026-10-04

## 目的

§716 已把四化派生欄上收為：

【穩定骨架 → selector／pool約束 → Sparse Rewrite S(m,r) → orientation／closure → validation】

其中目前採用：

- 權：祿母表前移一干，再做pool edit與S(3,0)；
- 科：早期科作position skeleton，再做S(0,3)；
- 忌：早期福作position skeleton，再與外部carrier pool交叉，形成S(2,2)。

本輪不再預設這三張 early table 一定是正確 mother，而把早期七欄：

【科、魁、祿、馬、權、福、禍】

全部逐一當候選來源，對成熟權／科／忌做結構負控。

新增可重跑：

`four_hua_717_mother_table_mdl_negative_control_20261004.js`

注意：成熟 target 在本輪只作事後 MDL／negative-control 比較，不拿來生成古 operator；不建立現代任意加權分數，只報：

- direct holds；
- changed slots；
- remount；
- replacement；
- global pool overlap；
- cyclic rotation 需要多少位。

## 一、成熟科：早期科通過七欄全候選負控

不做任何 rotation：

早期科 → 成熟科：

- direct hold = 7/10
- changed = 3
- remount = 0
- replacement = 3
- pool overlap = 7/10

其他六欄的 direct hold 全部遠低於7。

即使允許每一張 early table 在十干上作任意 cyclic rotation，仍只有：

【早期科，rotate 0】

能達到 direct hold 7/10。

所以「早期科作成熟科 position skeleton」不是研究者先選一張漂亮母表造成的；它通過七欄全候選負控。

這是目前三個派生欄中最乾淨的 mother-table 唯一性結果。

## 二、成熟忌：早期福唯一最強 position skeleton，但不是唯一最佳 carrier pool

不做 rotation：

早期福 → 成熟忌：

- direct hold = 6/10
- changed = 4
- remount = 2
- replacement = 2
- pool overlap = 8/10

其餘六欄 direct hold 最高只有1/10。

允許全部 cyclic rotation 後，早期福仍以：

【rotate 0，direct hold 6/10】

唯一第一。

所以：

> 早期福作成熟忌的 position skeleton 通過七欄負控，而且根本不需要先旋轉。

但若完全忽略位置，只看 global carrier pool overlap，結果不同：

- 早期魁：9/10
- 早期福：8/10
- 早期祿：8/10
- 早期禍：8/10

因此若把「mother table」理解成一張表同時負責位置與carrier pool，化忌其實沒有單一mother。

這不是新反證，而是精確重現之前的分層結論：

【位置連續性最強＝福】
【carrier pool最近＝魁】
【成熟目標pool另有1563印星十曜集合可獨立約束】

所以成熟忌最準確的架構仍應寫成：

【福槽 position skeleton × 外部 carrier pool → S(2,2)】

而不是「成熟忌就是早期福改一改」。

## 三、成熟權：祿不是標籤層唯一mother；祿與禍是同一循環的半周異相

這是本輪最重要的新負控。

若直接不旋轉比較成熟權，最強 direct hold 其實是早期馬3/10；早期祿本身0/10。

所以「祿作權mother」從來不是靠 raw position closeness，而是依賴已建立的一干位移 operator。

把七欄各自允許十干 cyclic rotation 後：

### 早期祿

rotateRight(1)：

【破軍、廉貞、天機、天同、太陰、貪狼、武曲、太陽、巨門、天梁】

對成熟權：

- direct hold = 7/10
- remount = 2
- replacement = 1
- pool overlap = 9/10

### 早期禍

rotateRight(6)：

得到完全相同的：

【破軍、廉貞、天機、天同、太陰、貪狼、武曲、太陽、巨門、天梁】

同樣：

- direct hold = 7/10
- remount = 2
- replacement = 1
- pool overlap = 9/10

腳本進一步直接證：

【早期禍 = 早期祿 rotateRight(5)】

也就是兩欄本來就是同一個十carrier循環，相差半周。

因此必然有：

【禍 rotateRight(6) = 祿 rotateRight(1)】

所以若只允許「任意 cyclic rotation」這種過寬 operator class，成熟權無法區分：

【祿 mother】
與
【禍 mother】

兩者在結構上完全等價。

## 四、這不推翻祿→權，但必須修正其證據語義

目前祿模型之所以仍比較自然，不是因為成熟 target 結構唯一選出祿，而是因為現有重建使用：

【祿前移一干】

也就是 rotateRight(1)。

若改從禍出發，為得到同一基底必須：

【禍 rotateRight(6)】

其最短循環距離為4，而祿只需1。

因此在「位移 operator 本身有獨立來源、而且一步位移比任意六步低自由度」的條件下，祿仍可作自然代表。

但這個優勢不能再寫成：

【成熟權結構唯一證明祿是母表】

而應改寫成：

> 祿與禍屬同一 carrier-cycle equivalence class；現有一干位移 operator 選祿作為該等價類中的低自由度代表。

這是一個更嚴格，也更安全的結論。

## 五、三欄負控後的 mother-table 定級

### 權

不能再說「祿是唯一結構mother」。

應寫：

【祿／禍同 cycle equivalence class；祿以 one-step shift 成為目前自然代表】

其優先性依賴：
- 一干位移 operator 的獨立來源；
- 不是成熟 target closeness。

### 科

可維持：

【早期科 = 唯一最強 position skeleton】

七欄＋任意rotation負控皆通過。

### 忌

可維持但需分層：

【早期福 = 唯一最強 position skeleton】

同時：

【carrier pool 不由福單獨提供；魁pool overlap更高，成熟pool另由印星十曜獨立約束】

所以不是單表mother，而是：

【福position × 外部pool】

## 六、對 §716 Sparse Rewrite family 的影響

§716 的 S(m,r) 本身沒有被破壞：

- 權仍為 S(3,0)+closed-cycle；
- 科仍為 S(0,3)；
- 忌仍為 S(2,2)。

但「S(m,r)之前的 mother／skeleton 怎麼選」現在可再分級：

1. 科：single-table skeleton，且全候選唯一；
2. 忌：position mother唯一，但pool mother分離；
3. 權：cycle-equivalence class，不是單一label唯一；需靠低自由度shift operator選自然代表。

因此共同架構應再精確寫成：

【candidate source class → skeleton／pool selector → Sparse Rewrite S(m,r) → orientation／closure → validation】

而不是假設每一化都先有一張唯一mother table。

## 七、§717 最終結論

這輪負控是成功的，因為它不是全部「驗證原模型」，而是真正抓出一個需要降級的地方：

> 「祿是成熟權唯一母表」過強。

正確版本是：

> 祿與禍本屬同一十carrier循環的半周異相；任意rotation下兩者對成熟權完全等價。祿之所以仍是目前最自然代表，是因為現有生成鏈只需【前移一干】，而禍需更大的相位移動。這個優勢必須由一干位移operator的獨立古法來源來支撐，而不能由成熟權target反推。

相對地：

- 科的早期科position skeleton通過唯一性負控；
- 忌的早期福position skeleton也通過唯一性負控，並再次證明pool需要分層處理。

## 八、下一步 §718

最值得直接做的不是再跑更多target closeness，而是專攻權這個新出現的 equivalence class：

1. 查早期七欄中【祿／禍相差五位】是否只是數值偶合，還是整套十變曜／五干對／陰陽相位的固定結構；
2. 對【祿前移一干】作來源獨立性審計：這個「一干」究竟能否由古表欄序、十干功能、五組干對或既有同型operator在不看成熟權target時推出；
3. 與【禍→同一基底需rotateRight(6)】作負控。

若一干位移能獨立從古法推出，而六位移只能事後為target調參，才能把祿正式定級為：

【cycle-equivalence class中的古法自然代表】

而不是單純「比較接近成熟權」。

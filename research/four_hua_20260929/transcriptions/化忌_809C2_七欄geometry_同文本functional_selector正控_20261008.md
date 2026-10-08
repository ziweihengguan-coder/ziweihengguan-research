# §809-C2 七欄整體 geometry＋同文本 functional-role selector 正控

日期：2026-10-08（臺灣時間）

## 一、目的

承 §809-C1，本節把研究從「福欄單獨找母表」再推進一步：

1. 以乙亥字《紫微數》已人工校讀的完整七欄【科、魁、祿、馬、權、福、禍】作控制組；
2. 檢查七欄是否其實都是同一種循環／shift operator；
3. 回看《玄藪》七欄表之前的同段文字，尋找真正的【functional role → old-name carrier】selector 正控；
4. 不載入成熟化忌 target。

可重跑：
- `research/four_hua_20260929/ji_809c2_seven_column_selector_geometry_audit_20261008.js`
- `research/four_hua_20260929/ji_809c3_early_fu_dyad_signature_audit_20261008.js`

---

## 二、七欄 old-name 正規化

依既有人工校讀：

| 干 | 科 | 魁 | 祿 | 馬 | 權 | 福 | 禍 |
|---|---|---|---|---|---|---|---|
| 甲 | 雷 | 醫 | 暴 | 鳳 | 鬼 | 醫 | 雷 |
| 乙 | 極 | 雷 | 驛 | 雷 | 驛 | 白 | 常 |
| 丙 | 閣 | 常 | 鳳 | 鬼 | 醫 | 暴 | 白 |
| 丁 | 驛 | 暴 | 醫 | 鳳 | 醫 | 進 | 進 |
| 戊 | 閣 | 驛 | 蛇 | 醫 | 相 | 座 | 鬼 |
| 己 | 進 | 閣 | 雷 | 常 | 常 | 龍 | 暴 |
| 庚 | 暴 | 龍 | 常 | 暴 | 白 | 鳳 | 驛 |
| 辛 | 龍 | 白 | 白 | 醫 | 進 | 閣 | 鳳 |
| 壬 | 常 | 進 | 進 | 極 | 暴 | 雷 | 醫 |
| 癸 | 醫 | 鳳 | 鬼 | 暴 | 鳳 | 蛇 | 蛇 |

這也反過來確認《玄藪》網路轉錄的黏欄：

- 甲【暴鳳】＝祿暴／馬鳳；
- 乙【驛雷】＝祿驛／馬雷；
- 丙【鳳鬼】＝祿鳳／馬鬼；
- ……

所以《玄藪》題名雖漏【馬】，實際仍是七值表。

---

## 三、七欄不是七個同型循環

對七欄兩兩枚舉全部十種 cyclic stem shift。

唯一 10/10：

> **祿 ↔ 禍，shift = 5**

即：

祿：
> 暴、驛、鳳、醫、蛇、雷、常、白、進、鬼

禍：
> 雷、常、白、進、鬼、暴、驛、鳳、醫、蛇

精確為同一十星 core 半環換位。

除此之外：

- 科↔魁最高 4/10；
- 祿↔權最高 4/10；
- 權↔禍最高 4/10；
- 福與任一欄最高只 3/10。

所以早期七欄本身已明顯混合不同 generation families：

> **不是「一個十星環＋七個固定 offset」即可解。**

這是重要內部負控。

---

## 四、七欄的 carrier pool 也分層

以早期祿十星 pool 為 core：

> 廉、機、同、陰、貪、武、陽、巨、梁、破

各欄 unique carrier 與 core 關係：

| 欄 | unique | core overlap | 外部 carrier |
|---|---:|---:|---|
| 祿 | 10 | 10 | 無 |
| 禍 | 10 | 10 | 無 |
| 權 | 9 | 8 | 天相 |
| 魁 | 10 | 8 | 文昌、文曲 |
| 福 | 10 | 7 | 右弼、文曲、文昌 |
| 科 | 9 | 6 | 紫微、文昌、文曲 |
| 馬 | 7 | 6 | 紫微 |

這個分布跟《玄藪》章序高度一致：

1. 先安主星／old-name dictionary；
2. 再安龍池＝文曲、鳳閣＝文昌、三台＝左輔、八座＝右弼；
3. 接著才列功能 selector 與七欄表。

因此：

> **科／魁／福明顯是在已擴充的 fixed-star lexicon 上工作，而不是只在十個主星 core 裡循環。**

福欄尤其是：

> core 7顆  
> ＋右弼／文曲／文昌 3顆

這正好解釋為何任何單一十曜 permutation 都不可能生成它。

---

## 五、真正的 Gate H 正控：《玄藪》同段直接存在 functional role → old-name carrier selector

七欄表之前，《玄藪》明列：

> 【定先後勇、正馬、文星、武曲例】

四組如下：

| 年支組 | 文星 | 武曲 |
|---|---|---|
| 寅午戌 | 天驛 | 天雷 |
| 申子辰 | 龍池 | 喧蛇 |
| 巳酉丑 | 鳳凰 | 暗金 |
| 亥卯未 | 進神 | 天暴 |

這是直接古文，不是研究者抽象。

資料流可以正規化為：

> **branch class**
> → **functional role（文星／武曲）**
> → **old-name carrier**

而且 carrier namespace 本身是混合的：

- 天驛、進神、鳳凰、天雷、喧蛇、天暴：主星 old-name／state-name；
- 龍池：輔曜；
- 暗金：七殺 old-name。

所以同一 early-Ziwei system 已直接示範：

> **功能 role 不黏死單一 physical body，也不限制只從一類 namespace 取 carrier；可依 selector 換掛不同 old-name star。**

定級：

> **DIRECT SAME-TEXT HETEROGENEOUS FUNCTIONAL-ROLE→CARRIER SELECTOR POSITIVE CONTROL**

---

## 六、這個 selector 與福欄直接重合 6/10 raw token

selector 8個 carrier：

> 驛、雷、龍、蛇、鳳、暗、進、暴

福欄：

> 醫、白、暴、進、座、龍、鳳、閣、雷、蛇

交集：

> **暴、進、龍、鳳、雷、蛇 = 6/10**

注意這不是在用成熟Ji驗證，而只是比較《玄藪》同一文本內兩組資料。

因此：

> **福欄 10 個 carrier 中，有 6 個已在它前面同段被另一個功能 selector 實際調用。**

這不能證明同一 selector 生成福欄，因為：

- 前者索引是年支三合組；
- 福欄索引是十干。

但它非常強地證明：

> 早期編表者使用「role → 選 old-name carrier」這種資料模型，並且 carrier vocabulary 與福欄高度共享。

---

## 七、福欄五行 dyad 檢查：沒有更早具名表直接重現

福欄按天干五行配對：

- 甲乙木：醫／白
- 丙丁火：暴／進
- 戊己土：座／龍
- 庚辛金：鳳／閣
- 壬癸水：雷／蛇

反投影舊曜：

> 月／孛｜計／炁｜水／水｜木／金｜羅／土

以十曜環計算每對陰干相對陽干的 delta：

> **[6, 9, 0, 1, 5]**

把既有 sourceInventory 的具名古表全部做同一 dyad-signature 比較：

- 沒有 exact 5/5；
- 最佳僅 2/5（且有不可比的日曜格）；
- 十變曜各列本身都是固定 1/1/1/1/1；
- 官星／喜神多為固定9；
- 科名為0/0/0/0/0。

所以：

> **五行 pair × 陰陽分支是福欄很好的內部描述，但目前仍沒有一張既知古表提供同一 pair-signature。**

不能把它升格成上游母法。

---

## 八、與《十八飛星》現存文本的邊界

公開《紫微斗數／照膽經十八飛星》傳本可直接見：

- 三台八座；
- 龍池鳳閣；
- 其安法與文章／清貴語義。

但目前對公開全文做精確檢索：

- 【文星是天驛】0；
- 【武曲是天雷】0；
- 【進神／喧蛇／天驛／天雷】作上述 selector 0。

反之，這四組 selector 的精確句目前只在：

> **《中天太極紫微數秘訣／玄藪》家族**

直接命中。

因此年代／傳承判語必須壓住：

> **general heterogeneous selector 在 early-Ziwei family DIRECT；尚未前推成 pre-Ziwei《十八飛星》母法。**

---

## 九、§809 主線因此再收斂

目前不再需要把 leading class 只寫成抽象的：

> state-name remount

可以升級為：

> **FUNCTIONAL-ROLE→HETEROGENEOUS OLD-NAME CARRIER SELECTION / REMOUNT**

理由：

1. 同文本有直接 worked selector；
2. 直接使用福欄 6/10 vocabulary；
3. 可跨主星／輔曜 namespace；
4. 七欄本身證明只有祿禍遵循單純循環，福／科／魁等另有 carrier substitution；
5. 能容納福欄的非雙射 pool【十曜核心−火＋水】與戊己雙水分流問題。

但 specific source 仍 OPEN：

> **尚無規則從十干／五行陰陽事前選出福欄十個 carrier。**

---

## 十、下一個決勝問題

不再問：

> 哪張古表等於福？

而問：

> **十干七欄編表者使用了什麼 stem-indexed selector，使「功能位」能像文星／武曲那樣，在 unified fixed-star lexicon 中逐干換 carrier？**

最有價值的新見證只有三類：

1. 更早／異本保存【十干→old-name carrier】的口訣，而非只給成表；
2. 《玄藪》七欄表附近有漏抄注文，解釋甲乙丙丁如何選 carrier；
3. 某 pre-Ziwei 文本已有與【文星／武曲 selector】同型、但索引改為十干／五行陰陽的 functional-role selector。

若仍找不到，最安全的歷史結論將是：

> **早期七欄本身可能就是目前可見最早的 fixed-star functional remount compilation layer；它的上游「材料」可溯源，但 specific stem selector 尚未保存。**

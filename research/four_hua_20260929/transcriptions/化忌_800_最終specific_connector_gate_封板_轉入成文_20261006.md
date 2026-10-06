# 化忌 §800：final specific-connector gate 通過，停止歷史泛搜並轉入研究成文

日期：2026-10-06（臺灣時間）

## 一、定位

§799已把成熟化忌最後歷史缺口壓到兩種specific evidence：

1. 【天干化曜星例・天印／化印 role → 天干吉凶星例・獨立印星 carrier】的明文table switch；
2. 或把【甲月→日、乙孛→月、丁炁→孛、戊水→火】四條relation直接組成成熟化忌十干row的古代編表句。

本節不再擴大題目，也不把一般福印、一般跨表grammar、一般星曜interaction算作新進展。目的只有一個：建立可重跑的停止gate，確認檢索本身有正控能力，而最後兩類specific connector在已核語料仍為0；若成立，正式停止歷史connector泛搜，轉入RESEARCH_WRITING。

## 二、final gate

新增審計：
research/four_hua_20260929/ji_799_final_specific_connector_gate_20261006.js

明列39份本機primary／人工校讀／OCR語料，包括WYG／Kanripo《星學大成》卷000–030、乙亥字《紫微數》關鍵表人工校讀、南陽堂《紫微斗數全書》四化訣人工校讀、韓國《紫微斗數方書》四化表人工校讀、琴堂五星聚合轉錄、《五行精紀／三命》OCR及南陽堂相關OCR。

此gate只作【已核本機語料的可重跑停止診斷】，不把0命中宣稱成歷史上絕不存在。

## 三、row audit再次確認分層

成熟G0化忌舊曜row：
【日、月、計、孛、火、水、木、金、羅、土】

獨立〈論印星〉：
【木、日、火、月、土、羅、金、計、水、孛】

結果：
- exact position＝0／10；
- pool difference＝空集合；
- 即【曜池10／10相同，位置0／10】。

十變曜【化印／天印】carrier row：
【炁、計、羅、火、孛、木、金、土、月、水】

對成熟G0化忌：
- exact position＝0／10；
- mature only＝【日】；
- transformed-yin only＝【炁】。

早期福舊曜row：
【月、孛、計、炁、水、水、木、金、羅、土】
對成熟G0化忌同位＝6／10。

宋天囚／明天元忌星惡曜row：
【計、羅、火、孛、木、金、土、月、水、炁】
對成熟G0化忌同位＝1／10。

因此§493、§717、§799的核心分層全部重跑一致：
【福＝position skeleton】
【獨立印星＝carrier pool】
【化印／天印role≠獨立印星row】。

## 四、先要求正控通過，才接受negative gate

為避免「regex什麼都抓不到」造成假0，本節先要求同一語料庫內已知的明文operator必須被抓到。

final gate正控實際命中：
1. 官星：【官星者乃十干官星之祿星……甲以辛為官，辛以炁為祿，則甲人用炁為官星】；
2. 天嗣：【欲推天嗣者，即其變曜中化貴者是也】；
3. 喜神：【喜神逆祿……喜神隨月以逆承】；
4. 催官：【催官之星……與祿主相為催尅】。

另以南陽堂成熟四化歌【甲廉破武陽為伴……】作mature lookup正控，亦命中。

最終狀態：
- sameWorkExplicitOperatorPositiveControls＝PASS；
- matureLookupPositiveControl＝PASS。

因此後面的specific 0命中不是因為整體檢索器失效。

## 五、一個假陽性被人工排除，並據此收緊namespace gate

第二次重跑曾命中《星學大成》卷二：
【天印星分入此宮……大抵天元號印星】

若只用【天印＋印星】字面共現，這會被誤判成connector。

人工回讀後確認，該句屬命宮／三元系統中的【天元印星】語境，並不是卷一獨立十干〈論印星〉【甲木乙日丙是熒……】，也沒有【五行相符合而為印】或【十一曜獨炁不與】這組獨立表識別。

因此gate再收緊：specific switch必須同時接到獨立〈印星〉table fingerprint，例如【甲木乙日】、【五行相符合而為印】、【十一曜獨炁不與】或【天干吉凶星例・印星】。收緊後假陽性消失。

這一人工裁決也再次證明：
【印星】一詞本身跨namespace，不足以當table switch證據。

## 六、final specific gate結果

最終重跑：
- 【天印／化印 → 獨立〈論印星〉table fingerprint】＝0；
- 【獨立〈論印星〉 → 天印／化印】reverse switch＝0；
- 【欲推某印，即取變曜中化印】型role reuse＝0；
- 【月→日、孛→月、炁→孛、水→火四relation同文接成熟化忌】＝0。

final status：
specificTianyinToIndependentYinxingSwitch＝OPEN / 0 DIRECT LOCAL HIT
fourRelationToMatureJiComposition＝OPEN / 0 DIRECT LOCAL HIT
stoppingDecision＝STOP_GENERAL_SEARCH_AND_MOVE_TO_RESEARCH_WRITING

## 七、研究狀態正式轉換

本節執行停止條件後，成熟化忌不再以「找到最後一句古文」作為成文前置條件。

已建立：
research/飛星四化_成熟化忌生成重建_研究成文稿_20261006.md

成文稿正式固定目前最小模型：
早期福 position skeleton
→ 福role經食神五合到印role
→ 獨立〈印星〉十曜pool
→ 四條target-directed relation控制S(2,2)稀疏重掛
→ 成熟G0化忌。

其中：
- 福position 6／10：已閉合；
- 福role→印role：§799已閉合；
- 獨立印星pool＝成熟G0忌pool 10／10：已閉合；
- 四relation target-directed 4／4：§794–798已閉合到明代同時代；
- specific table switch／direct composition：仍OPEN。

因此正式定級：
SOURCE-BOUNDED / LOW-FREEDOM / REPRODUCIBLE RECONSTRUCTION WITH ONE SPECIFIC TABLE-SWITCH UNPROVEN

研究狀態改為：
RESEARCH_WRITING

歷史connector泛搜：
STOPPED

specific mature-Ji adoption：
OPEN / NOT FOUND IN REVIEWED MATERIAL

## 八、後續重開條件

只有以下材料出現才重開成熟化忌provenance：
1. 可定來源古文／過渡表明寫【天印／化印所得role→另取／依／從獨立〈論印星〉carrier表】；
2. 可定來源古文直接把【月→日、孛→月、炁→孛、水→火】四relation組成成熟化忌row；
3. 新原件提供同等強度、足以改變上述evidence matrix的specific composition。

以下不再單獨開新節：
- 一般福／印並列；
- 一般食神、正官、正印；
- 一般role→domain；
- 一般跨表算法；
- 一般炁孛、孛月、水火、日月interaction；
- 只重複成熟化忌lookup的後出文本。

## 九、結論

§800不是「找到最後connector」，而是正式證明：

【現有可核語料已把成熟化忌的component chain推到只剩一個specific adoption bridge；檢索正控有效、最後兩類direct connector仍為0，因此停止無限泛搜是可重跑、可審計的研究決定。】

這使化忌與化權、化科一樣，可以在不虛構歷史直證的前提下正式轉入研究成文。

## 十、接縫／算例層補核：依 specific switch 再做人工結構審計

依後續建議，本節另做一次不依賴單純關鍵詞共現的【接縫—算例—異本】補核，仍不另開新節號，因未取得新的 connector。

### 10.1 直接對讀兩張表的接縫

《星學大成》卷一的十干變曜段先明定【化印者五陽干皆是正官，五陰干皆是正印】，其後另立【十干變曜所屬】與【天印星與田宅並詳】；獨立〈論印星〉則位於後段【論官星】之後、【論催官星】之前，篇首直接以【五行相符合而為印】解釋【甲木乙日丙是熒……癸人見孛是印星】。兩處之間未見【另取／依／從／按／見後】等轉讀語。

更有辨識力的是，同卷對另一個跨層重用確實會明寫操作句：〈論天嗣〉直言【欲推天嗣者即其變曜中化貴者是也】。因此萬氏文本具有直接書寫【目標功能→回取變曜role】的語法能力；天印／印星之間卻未保存同型指令。這不能證明歷史上絕無 connector，但使【可能只是檢索詞沒抓到】的解釋再降低一級。

### 10.2 原頁總表接縫

《古今圖書集成》所收《張果星宗二》原頁（藝術典卷568，影像頁35）把【天干化曜星例】與【天干吉凶星例】直接連續排在同一版面：前表明列【天印・主有印＝炁計羅火孛木金土月水】，後表另列【印星・主掌印＝木日火月土羅金計水孛】。原頁兩表之間未見轉接小注；目錄亦把【天印】與【印星】列為不同條目。這是版面層的 namespace separation，不只是電子轉錄造成的分段。

### 10.3 辨識型算例搜尋

兩表十干輸出除庚干同為【金】外，其餘9／10皆不同，因此理論上只要找到任一非庚干的完整算例，即可辨識作者到底是在讀【天印／化印】row，還是獨立〈論印星〉row。本輪據此專搜甲、乙、丙、丁、戊、己、辛、壬、癸等干的【印／印星】實例與【假如／且如／欲推】語句。

WYG《星學大成》全30卷目前【印星】字串共28處，分布多個互異namespace：十變曜role、獨立〈論印星〉、天元印、單曜十干功能標籤、一般官印語義等；未找到一則具備【先算得天印／化印role→再輸出不同的獨立印星carrier】三步鏈的非庚干辨識算例。1611《星平總會》公開轉錄亦同時保存變曜／天印系與獨立〈論印星〉系，但未見跨表指令。

### 10.4 補核結論

本輪把§800的負結果由【strict text-search 0 hit】再升級成【接縫人工對讀＋原頁版面＋辨識型算例搜尋仍0】。因此目前最精確定級維持不變：

- specific table switch＝OPEN / NOT FOUND IN REVIEWED MATERIAL；
- 四relation→成熟Ji row direct composition＝OPEN / NOT FOUND IN REVIEWED MATERIAL；
- 歷史泛搜仍STOPPED；
- 只有真正可辨識的轉接句、非庚干切表算例或同等強度的新原件，才重開provenance。

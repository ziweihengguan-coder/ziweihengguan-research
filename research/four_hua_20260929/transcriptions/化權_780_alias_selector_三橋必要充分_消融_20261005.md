# §780 blind alias selector robustness ablation：三條關鍵橋共同充分、各自必要

日期：2026-10-05

## 一、目的

§779首次在不使用816、不預設乙壬癸、不讀成熟化權位置的條件下，以：

> WYG單曜正式命名alias universe  
> ＋上游已生成10星pool  
> ＋同干四化不重

把9,216張候選權表壓到唯一1張，最後成熟validation＝10/10。

本節不再擴大候選，而是反過來問：

1. §779的唯一性是否只是大量別名共同作用後的偶然結果？
2. 真正不可消融的古名bridge是哪幾條？
3. 若只保留最小必要bridge，是否仍能target-free唯一閉合？
4. 哪一條在歷史文本層最弱，後續最值得優先補強？

新增可重跑：

- `research/four_hua_20260929/quan_780_alias_selector_robustness_ablation_20261005.js`

## 二、固定條件

沿用§779，不更動：

- pool-normalized base：
  > 甲破、乙紫、丙機、丁同、戊陰、己貪、庚武、辛陽、壬巨、癸梁
- 上游10星pool：
  > 破、紫、機、同、陰、貪、武、陽、巨、梁
- 固定祿／科／忌row；
- selection只看pool守恆＋同干四化不重；
- mature權target只在validation階段才打開。

從§779完整alias universe中，與7/10 base三個殘差直接對應的bridge只有：

### B1：火 → 天梁

WYG火星章：

> 火躔房宿號天梁

對應乙干權曜體＝火。

### B2：炁 → 紫微

WYG紫炁章：

> 此曜元來是紫㣲

對應壬干權曜體＝炁。

### B3：計 → 白衣 → 巨門

WYG計都章在其狀態星名中見：

> 巨獬宫白衣星……

乙亥字《紫微數》人工校讀古名正規化：

> 白衣＝巨門

對應癸干權曜體＝計。

## 三、正控：完整9,216候選仍唯一

重跑§779完整候選：

- combinations＝9,216
- pool pass＝2
- row pass＝53
- pool＋row＝1
- exact mature＝1
- best＝10/10

唯一：

> 甲破、乙梁、丙機、丁同、戊陰、己貪、庚武、辛陽、壬紫、癸巨

所以§779可重現。

## 四、最小充分測試：只留base＋三條bridge

把§779所有其他distractor aliases全部刪掉，只留下：

- base原值；
- 乙可另取梁；
- 壬可另取紫；
- 癸可另取巨。

因此總候選只剩：

> 2 × 2 × 2 ＝ **8張**

其餘七干完全固定。

結果：

- combinations＝8
- pool pass＝2
- row pass＝1
- pool＋row＝1
- exact mature＝1
- best＝10/10

唯一仍為：

> **乙梁、壬紫、癸巨**

因此：

> **§779的10/10不依賴大量distractor aliases。**

9,216候選的作用是壓力測試「放寬候選後會不會冒出第二解」；真正最小充分alias core其實只有三條bridge。

## 五、逐條消融：三條任何一條拔掉都0解

### A. 拔掉火→天梁

完整alias universe：

- combinations＝7,680
- pool pass＝1
- row pass＝45
- pool＋row＝0
- exact mature＝0

最小三橋universe：

- combinations＝4
- pool pass＝1
- row pass＝0
- pool＋row＝0

### B. 拔掉炁→紫微

完整alias universe：

- combinations＝4,608
- pool pass＝1
- row pass＝21
- pool＋row＝0
- exact mature＝0

最小三橋universe：

- combinations＝4
- pool pass＝1
- row pass＝0
- pool＋row＝0

### C. 拔掉計→白衣→巨門

完整alias universe：

- combinations＝4,608
- pool pass＝1
- row pass＝33
- pool＋row＝0
- exact mature＝0

最小三橋universe：

- combinations＝4
- pool pass＝1
- row pass＝0
- pool＋row＝0

所以在目前source-bounded model內：

> **B1、B2、B3共同充分，且各自必要。**

不是三條裡任取兩條即可。

## 六、base-only負控

完全不允許三條重掛bridge，只保留廉退紫入後base：

> 甲破、乙紫、丙機、丁同、戊陰、己貪、庚武、辛陽、壬巨、癸梁

結果：

- combinations＝1
- pool pass＝1
- row pass＝0
- pool＋row＝0

失敗原因仍是：

> 乙權紫微＝乙科紫微

因此同干去重不是事後美化，而是真正排除base解的selector。

## 七、§780後最小alias鏈

現在Route B可從§779再壓縮：

> WYG general Quan operator  
> → Q0 7/10  
> → 廉退紫入，得到pool-normalized base  
> → 三條bridge：
>   1. 火號天梁
>   2. 炁元來是紫微
>   3. 計之白衣＝巨門
> → pool守恆  
> → 同干四化不重  
> → mature Quan 10/10

而§779完整9,216候選則成為此最小鏈的**全量distractor robustness test**。

這比把「古名全集」本身當不可分割規則更精確。

## 八、歷史證據強弱：最弱點正式定位

三條bridge的文本強度並不完全相同。

### B2 炁→紫微：最強

WYG直接說：

> 此曜元來是紫㣲

這是最接近identity statement的一條。

### B1 火→天梁：中等

WYG直接說：

> 火躔房宿號天梁

它是火在特定躔宿狀態的正式號名，屬同一曜體內的state-name，不是無條件physical identity。

### B3 計→白衣→巨門：目前最弱

第一跳：

> WYG計都章：某宮狀態名為白衣星

第二跳：

> 乙亥字《紫微數》：白衣＝巨門

因此它是**跨兩份文本、兩步正規化**，不是WYG一句直接「計＝巨門」。

所以若後續只補一個歷史connector，最高價值不是再找816，而是：

> **找更直接的計都／白衣／巨門三者橋，最好是同一古本或同一章內的直名關係。**

若能取得：
- 明刻十八卷計都章的同文；
- 更早《三辰通載》／紫微數系把白衣與巨門直連；
- 或其他前1581文本直接使計都state-name可落巨門；

Route B的歷史強度會顯著上升。

## 九、對816路線的再定級

§779已證816不是全域必要；§780再證alias路線本身不是9,216個別名造成的過擬合，而是可縮到三條不可消融bridge。

因此兩路目前可精確並列：

### Route A：幾何型

優點：
- scope／direction／closed cycle有完整古典操作語法；
- 816與北極亥子丑、紫微逆行形成同一幾何敘事。

弱點：
- 尚缺古人明說「把此816作用域套成熟化權三carrier」。

### Route B：alias型

優點：
- 不用816；
- 三條bridge即可最小閉合；
- 完整9,216 distractor universe下仍唯一。

弱點：
- B1、B3是state-name而非無條件identity；
- B3更是跨文本二跳；
- 尚缺古人明說「以此alias關係重掛化權」。

所以二者不是互相否定，而是：

> **兩個不同證據家族獨立指向同一成熟10/10。**

## 十、下一步

算法層已無必要再增加自由度。若繼續研究，最高價值依次為：

1. **B3 directness audit**：專查計都→白衣→巨門是否有更早／更直接同書直證；
2. **B1 state-name scope audit**：確認「躔宿號名」在WYG內是否普遍被用作跨功能carrier重掛，還是只能當狀態別名；
3. 明刻十八卷若未來取得，只用於核B1/B2/B3的版本年代與是否同文；
4. 否則即可進入正式文章／HTML封板。

§780核心結論：

> **完整9,216候選與只保留三條關鍵bridge的8候選，都唯一得到成熟化權10/10；任意拔掉火→天梁、炁→紫微、計→白衣→巨門其中一條，合法成熟解都降為0。因此§779並非大量alias過擬合，真正最小alias core就是三條bridge；其中歷史上最弱的是跨文本二跳的計→白衣→巨門。**

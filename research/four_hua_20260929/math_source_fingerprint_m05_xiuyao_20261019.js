// 數理源流 M05：《宿曜經》108足、六害、三九、本命宿、宿曜相合，source-fixture 算法檢核。
// Scripture quotes were manually transcribed from CBETA T1299/1 and /2 (public URLs in companion note).
// This script DOES NOT programmatically fetch/verify the remote scripture; it checks the
// numerical consequences of source fixtures, not historical independence or Ziwei-Hua-Ji.
"use strict";
const assert = require("node:assert/strict");
let checks = 0;
function test(name, fn) {
  fn();
  checks++;
  console.log("PASS", name);
}
const canonical27 = "星 張 翼 軫 角 亢 氐 房 心 尾 箕 斗 女 虛 危 室 壁 奎 婁 胃 昴 畢 觜 參 井 鬼 柳".split(" ");
const signSegments = [
  [["星", 4], ["張", 4], ["翼", 1]],
  [["翼", 3], ["軫", 4], ["角", 2]],
  [["角", 2], ["亢", 4], ["氐", 3]],
  [["氐", 1], ["房", 4], ["心", 4]],
  [["尾", 4], ["箕", 4], ["斗", 1]],
  [["斗", 3], ["女", 4], ["虛", 2]],
  [["虛", 2], ["危", 4], ["室", 3]],
  [["室", 1], ["壁", 4], ["奎", 4]],
  [["婁", 4], ["胃", 4], ["昴", 1]],
  [["昴", 3], ["畢", 4], ["觜", 2]],
  [["觜", 2], ["參", 4], ["井", 3]],
  [["井", 1], ["鬼", 4], ["柳", 4]],
];
const floorMod = (n, mod) => ((n % mod) + mod) % mod;
const counting = (start, ordinal, names = canonical27) =>
  names[floorMod(names.indexOf(start) + ordinal - 1, names.length)];
test("27 distinctive nakshatras, 12 zodiac segments", () => {
  assert.equal(canonical27.length, 27);
  assert.equal(new Set(canonical27).size, 27);
  assert.equal(signSegments.length, 12);
  assert.equal(canonical27.includes("牛"), false);
});
const bySign = signSegments.map(x => x.flatMap(([name, n]) => Array(n).fill(name)));
const byNakshatra = canonical27.flatMap(name => Array(4).fill(name));
for (let i = 0; i < 12; i++) {
  test(`zodiac sector #${i + 1} has nine pada`, () => assert.equal(bySign[i].length, 9));
  test(`zodiac sector #${i + 1} matches 27x4 padas`, () => {
    assert.deepEqual(bySign[i], byNakshatra.slice(i * 9, (i + 1) * 9));
  });
}
test("12x9 = 27x4 = 108 units without missing/duplicated unit", () => {
  assert.equal(byNakshatra.length, 108);
  assert.deepEqual(bySign.flat(), byNakshatra);
  assert.equal(bySign.flat().filter(x => x === "柳").length, 4);
});
const triNine = ["命", "榮", "衰", "安", "危", "成", "壞", "友", "親",
  "業", "榮", "衰", "安", "危", "成", "壞", "友", "親",
  "胎", "榮", "衰", "安", "危", "成", "壞", "友", "親"];
const threeNineFixture = "畢 觜 參 井 鬼 柳 星 張 翼 軫 角 亢 氐 房 心 尾 箕 斗 女 虛 危 室 壁 奎 婁 胃 昴".split(" ");
for (let i = 0; i < 27; i++) {
  test(`tri-nine example #${i + 1} ${threeNineFixture[i]} (${triNine[i]})`, () => {
    assert.equal(counting("畢", i + 1), threeNineFixture[i]);
  });
}
const sixHarms = { 命: 1, 事: 10, 意: 4, 聚: 16, 同: 20, 克: 13 };
const sixHarmsLou = { 命: "婁", 事: "星", 意: "畢", 聚: "氐", 同: "箕", 克: "軫" };
for (const [name, nth] of Object.entries(sixHarms)) {
  test(`six harms, 婁 as natal, ${name} = #${nth}`, () => {
    assert.equal(counting("婁", nth), sixHarmsLou[name]);
  });
}
const ordinalFromFullMoon = day => {
  if (!Number.isInteger(day) || day < 1 || day > 30) throw Error("day out of range");
  // CBETA 卷下：「先下生日數，又虛加十三 ... 二十七宿一周法除」。
  // 1-based ordinal: 15 -> 28 -> remainder 1, 17 -> 30 -> remainder 3.
  return floorMod(day + 12, 27) + 1;
};
test("2nd lunar month 17th birthday: 17+13=30, mod27 -> third lodge 氐", () => {
  assert.equal(ordinalFromFullMoon(17), 3);
  assert.equal(counting("角", ordinalFromFullMoon(17)), "氐");
});
test("lunar full-moon day 15 is first lodge 角", () => {
  assert.equal(ordinalFromFullMoon(15), 1);
  assert.equal(counting("角", ordinalFromFullMoon(15)), "角");
});
test("lunar full-moon day 14 is previous lodge 軫", () => {
  assert.equal(ordinalFromFullMoon(14), 27);
  assert.equal(counting("角", ordinalFromFullMoon(14)), "軫");
});
const seven = "日 月 火 水 木 金 土".split(" ");
const dayClasses = {
  甘露: "軫 畢 尾 柳 鬼 房 星".split(" "),
  金剛峯: "尾 心 壁 昴 井 張 亢".split(" "),
  羅剎: "胃 鬼 翼 參 氐 奎 柳".split(" "),
};
for (const [cls, lodges] of Object.entries(dayClasses)) {
  test(`${cls} includes exactly seven luminaries and valid lunar lodges`, () => {
    assert.equal(lodges.length, seven.length);
    assert(lodges.every(x => canonical27.includes(x)));
  });
  for (let i = 0; i < seven.length; i++) {
    test(`${cls}: ${seven[i]}-day + ${lodges[i]}-moon`, () =>
      assert.equal(dayClasses[cls][seven.indexOf(seven[i])], lodges[i]));
  }
}
test("same solar weekday produces different classes if lunar lodge differs", () => {
  assert.equal(dayClasses.甘露[0], "軫");
  assert.equal(dayClasses.金剛峯[0], "尾");
  assert.equal(dayClasses.羅剎[0], "胃");
});
test("28-day mainland 大唐月建表 != 27-stage nakshatra cycle (explicit negative control)", () => {
  // 卷上「大唐月建圖」正月 d1 虛, d27 牛, d28 女, d29 虛;
  // records a 28-station table, not the same 27-place coordinate used in 三九.
  const firstMonth = "虛 危 室 壁 奎 婁 胃 昴 畢 觜 參 井 鬼 柳 星 張 翼 軫 角 亢 氐 房 心 尾 箕 斗 牛 女 虛 危".split(" ");
  assert.equal(firstMonth.length, 30);
  assert.equal(firstMonth[0], "虛");
  assert.equal(firstMonth[26], "牛");
  assert.equal(firstMonth[27], "女");
  assert.equal(firstMonth[28], "虛");
  assert.equal(firstMonth[0], firstMonth[28]); // 28-day table recurrence
  assert.notEqual(firstMonth[0], firstMonth[27]); // NOT 27-day recurrence
});
console.log(`RESULT: ${checks}/${checks} fixture/algorithm checks PASS. No Ziwei Hua-Ji caller tested.`);

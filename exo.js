// Q1) Converting the format given by the owner to series and labels format:

const list = [
  { week: 1, women: 125, men: 265, children: 50 },
  { week: 2, women: 100, men: 250, children: 55 },
];

// Solution 1
const series1 = [
  { name: "women", list: [] },
  { name: "men", list: [] },
  { name: "children", list: [] },
];

const labels1 = [];

list.forEach((item) => {
  series1[0].list.push(item.women);
  series1[1].list.push(item.men);
  series1[2].list.push(item.children);
  labels1.push(`W${item.week}`);
});

console.log("Solution 1");
console.log(series1);
console.log(labels1);

// Solution 2
const series2 = Object.keys(list[0])
  .filter((key) => key !== "week")
  .map((key) => ({ name: key, list: [] }));

const labels2 = list.map((item) => `W${item.week}`);

list.forEach((item) => {
  series2.forEach((s) => {
    s.list.push(item[s.name]);
  });
});

console.log("Solution 2");
console.log(series2);
console.log(labels2);

// Q2) Displaying all the weeks to the user:

const weeks = list.map((item) => `W${item.week}`);

console.log("Weeks:");
console.log(weeks);

// Q3) Converting the updated list format given by the owner to series and labels format (reduce):

const updatedData = [
  { week: 1, visits: 125, sex: "women" },
  { week: 1, visits: 200, sex: "men" },
  { week: 2, visits: 150, sex: "men" },
];

// Solution 1
const series3 = updatedData.reduce((result, item) => {
  const existingSeries = result.find((s) => s.name === item.sex);
  if (existingSeries) {
    existingSeries.list.push(item.visits);
  } else {
    result.push({ name: item.sex, list: [item.visits] });
  }
  return result;
}, []);

const labels3 = updatedData.reduce((result, item) => {
  const existingLabel = result.find((label) => label === `W${item.week}`);
  if (!existingLabel) {
    result.push(`W${item.week}`);
  }
  return result;
}, []);

console.log("Solution 1");
console.log(series3);
console.log(labels3);

// Solution 2
const { List, labels } = updatedData.reduce(
  (result, item) => {
    const { List, labels, weeks } = result;
    const weekLabel = `W${item.week}`;
    if (!labels.includes(weekLabel)) {
      labels.push(weekLabel);
    }
    const ListIndex = List.findIndex((s) => s.name === item.sex);
    if (ListIndex !== -1) {
      List[ListIndex].list.push(item.visits);
    } else {
      List.push({ name: item.sex, list: [item.visits] });
    }
    return { List, labels, weeks };
  },
  { List: [], labels: [], weeks: [] }
);

console.log("Solution 2");
console.log(List);
console.log(labels);

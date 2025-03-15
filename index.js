// 模拟的考生分数数据
const women = ['姓名', '800m', '仰卧起坐', '单杠悬挂', '名次', '是否入围'];
const men = ['姓名', '1000m', '引体向上', '立定跳远', '名次', '是否入围'];
const peoples = [
  {
    name: '1',
    phone: '12',
    sex: 0,
    scores: [1, "3分50秒", "A", "B", "C", 10, true],
  }, {
    name: '2',
    phone: '22',
    sex: 0,
    scores: [2, "3分50秒", "A", "B", "C", 10, true],
  },
]

const title = document.querySelector('.title');
let isQuery = false;

function queryScore() {
  const name = document.getElementById('nameInput').value;
  const phone = document.getElementById('phoneInput').value;
  const resultDiv = document.getElementById('result');
  let isEnter = false;
  resultDiv.innerHTML = '';

  const people = peoples.filter(item => item.name == name && item.phone == phone);
  if (people.length > 0) {
    isQuery = true;
    title.innerHTML = `您的成绩查询结果如下`;
    const scoreInfo = people[0].scores;
    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');

    const headerRow = document.createElement('tr');
    const testItems = ["测试项目", "成绩"];
    testItems.forEach(item => {
      const th = document.createElement('th');
      th.className = 'blue';
      th.textContent = item;
      headerRow.appendChild(th);
    });
    // thead.appendChild(headerRow);


    const base = people[0].sex == 0 ? women : men;

    base.forEach((test, i) => {
      const row = document.createElement('tr');
      const testCell = document.createElement('td');
      testCell.textContent = test;
      testCell.className = 'blue';
      const scoreCell = document.createElement('td');
      if (test == '是否入围') {
        isEnter = true;
        scoreCell.textContent = scoreInfo[i] ? '已入围' : '名次递补';
      } else {
        isEnter = false;
        scoreCell.textContent = scoreInfo[i];
      }
      row.appendChild(testCell);
      row.appendChild(scoreCell);
      tbody.appendChild(row);

    })
    const tipNode = document.querySelector('.tip');
    if (isEnter) {
      tipNode.innerHTML = '请等待入营电话通知';
    } else {
      tipNode.innerHTML = '需按照考生名次递补进入';
    }

    table.appendChild(thead);
    table.appendChild(tbody);
    resultDiv.appendChild(table);
  } else {
    isQuery = false;
    title.innerHTML = `请输入您的查询信息`;
    resultDiv.innerHTML = `未找到考生 ${name} 的分数信息。`;
  }
}
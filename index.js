// 模拟的考生分数数据
const women = ['姓名：', '笔试成绩：', '800m：', '仰卧起坐：', '单杠悬挂：', '综合排名：', '招录结果'];
const men = ['姓名：', '笔试成绩：', '1000m：', '引体向上：', '立定跳远：', '综合排名：', '招录结果'];


const title = document.querySelector('.title'),
  center = document.querySelector('.center'),
  nanBiaozhun = document.querySelector('.nanBiaozhun'),
  nvBiaozhun = document.querySelector('.nvBiaozhun');

let isQuery = false;

function queryScore() {
  const name = document.getElementById('nameInput').value;
  const number = document.getElementById('phoneInput').value;
  const resultDiv = document.getElementById('result');
  let isEnter = false;
  resultDiv.innerHTML = '';

  const people = peoples.filter(item => item.name == name && item.number == number);
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
      if (test == '招录结果') {
        isEnter = scoreInfo[i] == 1;
        console.log(scoreInfo);

        scoreCell.textContent = scoreInfo[i] == 1 ? '已通过' : '名次递补';
      } else {
        scoreCell.textContent = scoreInfo[i];
      }
      row.appendChild(testCell);
      row.appendChild(scoreCell);
      tbody.appendChild(row);

    })
    const tipNode = document.querySelector('.tip');
    if (isEnter) {
      tipNode.innerHTML = '说明：恭喜您通过我单位专职应急救援员招录考核并获得国家职业资格准入培训名额。请您注意查收入营培训通知邮件，按要求参加职业资格培训。';
    } else {
      tipNode.innerHTML = '说明：专职应急救援员提前批共计招录31人（男16人，女15人）；根据综合排名，您获得了补录资格。（如入围考生无法参与时，按照排名顺序，依次递补）';
    }

    table.appendChild(thead);
    table.appendChild(tbody);
    resultDiv.appendChild(table);
    center.style.display = 'none';
    if (people[0].sex == 1) {
      nanBiaozhun.style.display = 'block';
    } else {
      nvBiaozhun.style.display = 'block';
    }
  } else {
    isQuery = false;
    title.innerHTML = `请输入您的查询信息`;
    resultDiv.innerHTML = `未找到考生 ${name} 的分数信息。`;
  }
}
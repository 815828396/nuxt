// 模拟的考生分数数据
const women = ['姓名：', '笔试成绩：', '800m：', '仰卧起坐：', '单杠悬挂：', '名次：', '是否入围'];
const men = ['姓名：', '笔试成绩：', '1000m：', '引体向上：', '立定跳远：', '名次：', '是否入围'];


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
      if (test == '是否入围') {
        isEnter = scoreInfo[i] == 1;
        console.log(scoreInfo);

        scoreCell.textContent = scoreInfo[i] == 1 ? '已入围' : '名次递补';
      } else {
        scoreCell.textContent = scoreInfo[i];
      }
      row.appendChild(testCell);
      row.appendChild(scoreCell);
      tbody.appendChild(row);

    })
    const tipNode = document.querySelector('.tip');
    if (isEnter) {
      tipNode.innerHTML = '说明：请保持电话畅通,等待入营资格培训的电话通知!';
    } else {
      tipNode.innerHTML = '说明：原入选人员因各种原因无法参与后续环节时，按照既定的排名顺序，依次选取候补人员进行补充机制。';
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
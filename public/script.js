const member = ["田中", "鈴木", "山田", "木村", "佐々木", "斉藤"];
      const taskList = ["A", "B", "C", "D"];
      const data = []; //フォームの入力データをまとめる
      const dataList = [];
      let formRow = 3;
      let accordionRows = 2;

      const formGroupe = document.getElementById("formGroupe");
      const btn = document.getElementById("btn");
      const tr = document.getElementById("tr");
      const td = document.createElement("td");

      // const api_url = "GAS_API_URL";

      const resetBtn = document.querySelector('#reset-btn')
      resetBtn.addEventListener('click', () => {
        window.location.reload();
      })

      function createAccordion(i) {
        const accordion = document.getElementById("accordion");
        const accordionItem = document.createElement("div");
        accordionItem.setAttribute("class", "accordion-item");
        accordion.appendChild(accordionItem);

        const accordionHeader = document.createElement("h2");
        accordionHeader.setAttribute("id", "heading" + [i]);
        accordionHeader.setAttribute("class", "accordion-header");

        const button = document.createElement("button");
        button.setAttribute("class", "accordion-button");
        button.setAttribute("type", "button");
        button.setAttribute("data-bs-toggle", "collapse");
        button.setAttribute("data-bs-target", "#collapse" + [i]);
        button.setAttribute("aria-expanded", "true");
        button.setAttribute("aria-controls", "collapase" + [i]);
        button.textContent = "E" + [i];
        accordionItem.appendChild(accordionHeader);
        accordionHeader.appendChild(button);
            
        const collapse = document.createElement("div");
        collapse.setAttribute("id", "collapse" + [i]);
        collapse.setAttribute("class", "accordion-collapse collapse");
        collapse.setAttribute("aria-labelledby", "heading" + [i]);
        collapse.setAttribute("data-bs-parent", "#accordion");
        collapse.setAttribute("style", "");

        const accordionBody = document.createElement("div");
        accordionBody.setAttribute("class", "accordion-body");
        accordionBody.setAttribute("id", "accordion-body" + [i]);
        accordionItem.appendChild(collapse);
        collapse.appendChild(accordionBody);

        const form = document.createElement("form");
        form.setAttribute("id", "form" + [i]);
        form.setAttribute("name", "form" + [i]);
        accordionBody.appendChild(form);
            
            
        const ol = document.createElement("ol");
        ol.setAttribute("id", "ol-" + [i]);
        ol.setAttribute("name", "ol-" + [i]);
        form.appendChild(ol);

        function createForm(){
          const ol = document.getElementById("ol-" + [i]);
          const li = document.createElement("li");
          li.setAttribute("class", "mb-1");
          li.setAttribute("id", "li");
          ol.appendChild(li);
              
          // インプットのラベル作成メソッド
          function createLabel(name, text) {
            const label = document.createElement("label");
            label.setAttribute("for", name);
            label.setAttribute("class", "ms-5");
            label.textContent = text;
            li.appendChild(label);
          }
              
          // セレクトのオプション作成メソッド
          function createOptions(arr, id, name) {
            arr.forEach((value, index) => {
              const option = document.createElement("option");
              option.setAttribute("name", name);
              option.value = value;
              option.textContent = value;
              id.appendChild(option);
            });
          }
            
          // 工程の選択欄作成
          createLabel("task", "工程：");
          const taskSelect = document.createElement("select");
          taskSelect.setAttribute("id", "taskselect");
          taskSelect.setAttribute("name", "task");
          li.appendChild(taskSelect);
          createOptions(taskList, taskSelect, "task");

          //  無人の選択
          createLabel("mujin", "無人：");
          const check = document.createElement("input");
          check.setAttribute("type", "checkbox");
          check.setAttribute("id", "mujin");
          check.setAttribute("name", "mujin");
          li.appendChild(check);
            
          // 加工時間の入力作成
          createLabel("time", "加工：");
          const timeInput = document.createElement("input");
          timeInput.setAttribute("type", "number");
          timeInput.setAttribute("name", "time");
          timeInput.setAttribute("step", "0.25");
          timeInput.setAttribute("value", "0.25");
          li.appendChild(timeInput);
            
          // 名前の選択欄作成
          createLabel("name", "名前：");
          const nameSelect = document.createElement("select");
          nameSelect.setAttribute("name", "nameSelect");
          li.appendChild(nameSelect);
          createOptions(member, nameSelect, "nameSelect");
        };

        const forms = (() => {
          for(let i = 0; i < formRow; i++){
            createForm(i)
        }})();
                
        function createAddBtn() {
          const acccodionBody = document.getElementById("accordion-body" + [i]);
          const addBtn = document.createElement("button");
          addBtn.setAttribute("id", "addBtn" + [i]);
          addBtn.setAttribute("class", "btn btn-secondary btn-sm ms-5 mb-3");
          addBtn.textContent = "行を増やす";
          acccodionBody.appendChild(addBtn);

          addBtn.addEventListener("click", () => {
            createForm(i);
          });
        };
        createAddBtn();
            
        function createDelBtn() {
          const acccodionBody = document.getElementById("accordion-body" + [i]);
          const delBtn = document.createElement("button");
          delBtn.setAttribute("id", "delBtn" + [i]);
          delBtn.setAttribute("class", "btn btn-danger btn-sm ms-5 mb-3");
          delBtn.textContent = "行を減らす";
          acccodionBody.appendChild(delBtn);

          delBtn.addEventListener("click", () => {
            const ol = document.getElementById("ol-" + [i]);
            const li = ol.lastChild;
            ol.removeChild(li);
          });
        };
        createDelBtn();
      };
          
          
      function createAccordions(a) {
          for (let i = 1; i <= a; i++) {
            createAccordion(i);
          };
      };

      createAccordions(accordionRows);
      
      const addAcc = document.getElementById("addAcc");
      addAcc.addEventListener("click", () => {
        accordionRows = accordionRows + 1;
        createAccordion(accordionRows);
      });
      
      const delAcc = document.getElementById("delAcc");
      delAcc.addEventListener("click", () => {
        const accordion = document.getElementById("accordion");
        const delChild = accordion.lastChild;
        accordion.removeChild(delChild);
        accordionRows = accordionRows - 1;
        if(accordionRows < 0) {
          accordionRows = 0
        }
      });
    

      // 集計ボタンクリック後フォームデータの集計・作成
      btn.addEventListener("click", () => {
        data.length = 0;
        dataList.length = 0;
        
        let name, task, time, mujin;
        
        for(let j = 0; j < accordionRows; j++){
          const count = document.getElementById("ol-" + [j + 1]).childElementCount;
          (function getform(){
            for(let i = 0; i < count; i++){
              name = document.forms[j].elements["nameSelect"][i].value;
              task = document.forms[j].elements["taskselect"][i].value;
              const timeValue = document.forms[j].elements["time"][i].value;
              time = parseFloat(timeValue);
              mujin = document.forms[j].elements["mujin"][i].checked;
              
              class Obj {
                constructor() {
                  this.name = name;
                  this.task = task;
                  this.time = time;
                  this.mujin = mujin;
                }
              }
              
              const newObj = new Obj(name, task, time, mujin);
              data.push(newObj);
            }
          })();  
        };
        
        let newData;
        let nameList = [];
        
        data.forEach((value) => {
          nameList.push(value.name);
        });
        
        const nameSet = new Set(nameList);
        const newNameList = [...nameSet];
        
        let found;
        for(let i = 0; i < newNameList.length; i++){
          const name = newNameList[i];
          found = data.filter((value) => value.name === name);
          
          const totalTime = [0];
          for (let i = 0; i < found.length; i++) {
            totalTime.push(found[i].time);
          }
          const reducer = (sum, currentValue) => sum + currentValue;
          const timeSum = totalTime.reduce(reducer);
          
          const totalTask = [];
          for (let i = 0; i < found.length; i++) {
            totalTask.push(found[i].task);
          }
          
          const set = new Set(totalTask);
          const taskList = [...set];
          
          const totalMujinTask = [0];
          const mujinTask = found.filter((e) => e.mujin === true);
          for (let i = 0; i < mujinTask.length; i++) {
            totalMujinTask.push(mujinTask[i].time);
          };
          
          const mujinTimeSum = totalMujinTask.reduce(reducer);
          
          class Data {
            constructor() {
              this.name = name;
              this.task = taskList;
              this.time = timeSum;
              this.mujin_time = mujinTimeSum;
            }
          }
          
          newData = new Data(name, taskList, timeSum, mujinTimeSum);
          dataList.push(newData);
          
          const nameRow = `${name}Row`;
          const nameCell = `${name}Cell`;
          const rowId = document.getElementById(nameRow);
          let table = document.getElementById("table");
          
          // テーブル作成
          function createTable() {
            let newRow = table.insertRow();
            let newCell = newRow.insertCell();
            let newText = document.createTextNode(newData.name);
            newCell.appendChild(newText);
            newRow.setAttribute("id", nameRow);
            newCell.setAttribute("id", nameCell);
            
            newCell = newRow.insertCell();
            newText = document.createTextNode(newData.task);
            newCell.appendChild(newText);
            newCell.setAttribute("id", nameCell);
            
            newCell = newRow.insertCell();
            newText = document.createTextNode(newData.time);
            newCell.appendChild(newText);
            newCell.setAttribute("id", nameCell);
            
            newCell = newRow.insertCell();
            newText = document.createTextNode(newData.mujin_time);
            newCell.appendChild(newText);
            newCell.setAttribute("id", nameCell);           
          }

          if(rowId === null){
            createTable();
          } else {
            document.getElementById(nameRow).remove();
            createTable();
          }

        };


        // GASへデータ投稿
        const drow_num = document.getElementById("drow_num")
        for (let i = 0; i <= dataList.length; i++){
          fetch(api_url, {
            method: "post",
            headers: {
              "content-Type": "application/x-www-form-urlencoded"
            },
            body: encodeURI(`name=${dataList[i].name}&task=${dataList[i].task}&time=${dataList[i].time}&mujinTime=${dataList[i].mujin_time}&drow_num=${drow_num.value}`)
          })
          .then((response) => {
            response.json().then((json) => {
              console.log(json.message);
            });
          })
          .catch((error) => {
            console.log(error.message);
          });
        };
      });
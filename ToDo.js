
let contentsBox = [];  //入力データ保存用配列
let datesBox = [];
let radiosBox = [];
let repeBox = [];

function save() {  //保存ボタンを押したときの動作
    const content = document.getElementById("contents");  //各入力フォームの参照
    const calendar = document.getElementById("calendar");
    const radios = document.getElementsByName("priority");
    const repetition = document.getElementById("repetition");

    const conValue = content.value;  //値の取得
    const caleValue = calendar.value;
    const radioValue=(()=>{
        for(const radio of radios){
            if(radio.checked){
                return radio.value;
            }
        }
    })();
    const repeValue = repetition.value;

    contentsBox.push(conValue);  //入力値の保存
    datesBox.push(caleValue);
    radiosBox.push(radioValue);
    repeBox.push(repeValue);

    let table = document.getElementById('plans');  //行の追加
    let newRow = table.insertRow();

    let newCell = newRow.insertCell();
    let newText = document.createTextNode(conValue);
    newCell.appendChild(newText);

    newCell = newRow.insertCell();
    newText = document.createTextNode(Timer(caleValue));
    newCell.appendChild(newText);

    newCell = newRow.insertCell();
    newText = document.createTextNode(radioValue);
    newCell.appendChild(newText);

    newCell = newRow.insertCell();
    newText = document.createTextNode(repeValue);
    newCell.appendChild(newText);

    localStorage.setItem('contentsBox',JSON.stringify(contentsBox));
    localStorage.setItem('datesBox',JSON.stringify(datesBox));
    localStorage.setItem('radiosBox',JSON.stringify(radiosBox));
    localStorage.setItem('repeBox',JSON.stringify(repeBox));

    return false;
}

// function Reload{  //リロードした時の読み込みなおし(うまく動かない）
//     var reContentsBox = localStorage.getItem('contentsBox');
//     reContentsBox = JSON.parse(reContentsBox);
//     alert(reContentsBox); //test
//     var reDatesBox = localStorage.getItem('datesBox');
//     reDatesBox = JSON.parse(reDatesBox);
//     var reRadiosBox = localStorage.getItem('radiosBox');
//     reRadiosBox = JSON.parse(reRadiosBox);
//     var reRepeBox = localStorage.getItem('repeBox');
//     reRepeBox = JSON.parse(reRepeBox);
//
//     for(var i = 0; i < reContentsBox.length; i++) {
//         let table = document.getElementById('plans');  //行の追加
//         let newRow = table.insertRow();
//
//         let newCell = newRow.insertCell();
//         let newText = document.createTextNode(reContentsBox[i]);
//         newCell.appendChild(newText);
//
//         newCell = newRow.insertCell();
//         newText = document.createTextNode(Timer(reDatesBox[i]));
//         newCell.appendChild(newText);
//
//         newCell = newRow.insertCell();
//         newText = document.createTextNode(reRadiosBox[i]);
//         newCell.appendChild(newText);
//
//         newCell = newRow.insertCell();
//         newText = document.createTextNode(reRepeBox[i]);
//         newCell.appendChild(newText);
//     }
//     console.log('unload');
//
//     return false;
// }

function Timer(caleValue){  //タイマーの設定日時の保存
    let goal = new Date(caleValue);

    return countdown(goal);
}



function countdown(due) {   //カウントダウンをわかりやすい形に直す
    const now = new Date();

    const rest = due.getTime() - now.getTime();
    const sec = Math.floor(rest / 1000) % 60;
    const min = Math.floor(rest / 1000 / 60) % 60;
    const hours = Math.floor(rest / 1000 / 60 / 60) % 24;
    const days = Math.floor(rest / 1000 / 60 / 60 /24);
    const count = [days + '日' + hours + '時間' + min +'分' + sec + '秒'];

    return count;
}

const main = () => {
    flatpickr.localize(flatpickr.l10ns.ja); //カレンダーの設定
    flatpickr('#calendar', {
        enableTime: true, //時間の入力を可能にする
        minDate: "today"  //今日以前を選択不可にする
    });

    document.getElementById('mainForm').onsubmit = save;

}

main();
//유저가 값을 입력한다
//플러스 버튼 클릭 -> 할일이 추가
//딜리트 버튼 -> 할일이 삭제된다
//체크버튼 누르면 할일이 끝나 밑줄이 간다
//체크버튼 클릭하면 트루 펄스
//트루 끝난걸로 간주
//펄스 안끝난걸로 간주

//진행중 끝나서 탭 누르면 언더바가 이동한다
//끝난탭은 끝난템만 진행중은 진행중탭만
//전체탭 누르면다시 전체아이템으로 돌아옴


let taskinput= document.getElementById("taskinput");
let add=document.getElementById("add");
let tabs=document.querySelectorAll(".tabs div");
let tasklist=[];
let mode="all";
let filterlist=[];
let underline=document.getElementById("under");
let input=document.getElementById("taskinput");
add.addEventListener("click",addtask);

taskinput.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
      addtask();
        taskinput.value='';
    }

  });




for(let i=1;i<tabs.length;i++){
    tabs[i].addEventListener("click",function(event){filter(event)})
}
function addtask(){
    let task= {
        id:random(),
        taskcontent : taskinput.value,
        iscomplete:false
    };
    tasklist.push(task);
    console.log(tasklist);
    render();
}

function render(){
    let list=[];
    if(mode =="all"){
        list=tasklist;
    }else if(mode =="ongoing" || mode=="done"){
        list=filterlist;
    }
    let result ="";
    for( let i=0; i<list.length;i++){
        if(list[i].iscomplete==true){
            result+=`<div class="list">
            <div class="taskdone">${list[i].taskcontent}</div> 
            <div>
                <button class="checkbtn" onClick="toggle('${list[i].id}')"><i class="fa-regular fa-square-check"></i></button>
                <button class="deletebtn" onclick="deletetask('${list[i].id}')"><i class="fa-solid fa-trash"></i></button>
            </div>
        </div>`;
        }else{
        result+=`<div class="list">
            <div>${list[i].taskcontent}</div> 
            <div>
            <button class="checkbtn" onClick="toggle('${list[i].id}')"><i class="fa-regular fa-square"></i></button>
            <button class="deletebtn" onclick="deletetask('${list[i].id}')"><i class="fa-solid fa-trash"></i></button>
        </div>
    </div>`;
        }
    }

    document.getElementById("board").innerHTML=result;
}

function toggle(id){
    for(let i=0;i<tasklist.length;i++){
        if(tasklist[i].id==id){
            tasklist[i].iscomplete=!tasklist[i].iscomplete;
            break;
        } 
    
    }
    render();
    console.log(tasklist);
   

}

function deletetask(id){
    for(let i=0;i<tasklist.length;i++){
        if(tasklist[i].id ==id){
            tasklist.splice(i,1);
            break;
        }
    }
    render();
    console.log(tasklist);

}

function filter(event){
    
    
        
    if(event){
    //밑줄움직임
    mode=event.target.id;
        underline.style.left = event.target.offsetLeft + "px";
        underline.style.width = event.target.offsetWidth + "px";
        underline.style.top = event.target.offsetTop + (event.target.offsetHeight -4) + "px";
    }
   
    //여기서 event는 tabs를 클릭할때 발생, 그때 id값 all ongoing done 중에 가져온다
    
  filterlist=[];
    if(mode == "all"){
        render();
    }else if(mode =="ongoing"){
        for(let i=0 ; i<tasklist.length; i++){
            if(tasklist[i].iscomplete==false){
                filterlist.push(tasklist[i]);
            }
        }
        
        render();
        
    }else if(mode =="done"){
        for(let i=0;i<tasklist.length;i++){
            if(tasklist[i].iscomplete==true)
            filterlist.push(tasklist[i]);
        }
    }
    render();
}

function random(){
    return '_' + Math.random().toString(36).substr(2,9);
}

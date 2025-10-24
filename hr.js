
        const tablebody=document.getElementById('enter');
        const total=document.getElementById('total');
        const bonus=document.getElementById('change');
        const btnGiven=document.getElementById('givenData')
        const btnSort=document.getElementById('sorted')
        const btnSum=document.getElementById('summary')
        
        async function getdata(){
        let file=await fetch('hr.json');
        let data=await file.json()
   
        return data
    }
    function addData(data){
        let text='';
        data.forEach(element=>{
            text+='<tr><td>'
            text+=JSON.stringify(element.id);
            text+='</td><td>'
            text+=JSON.stringify(element.name);
            text+='</td><td>'
            text+=JSON.stringify(element.department);
            text+='</td><td>'
            text+=JSON.stringify(element.salary);
            text+='</td><td>'
            text+=JSON.stringify(element.experience);
            text+='</td></tr>'
        })
        tablebody.innerHTML=text;
    }
    async function display() {
        let data=await getdata();
        addData(data);
    }
     async function sortdata(){
         let data=await getdata();
         const sortedData=data.toSorted((a,b)=>b.salary-a.salary)
         addData(sortedData) 
         return sortedData;  
     }
     function ignore(x) {
        return x.experience>=3;

     }
     async function summary() {
        let data=await sortdata();
        filterData=data.filter(ignore)
        let sum_list=[];
        filterData.forEach(element => {
            let obj={name:element.name,department:element.department,annualBonus:element.salary*0.1*element.experience}
            sum_list.push(obj);
        });
        let text='';
        sum_list.forEach(element=>{
            text+='<tr><td>'
            text+='</td><td>'
            text+=JSON.stringify(element.name);
            text+='</td><td>'
            text+=JSON.stringify(element.department);
            text+='</td><td>'
            text+=JSON.stringify(element.annualBonus);
            text+='</td><td>'
            text+='</td></tr>'
        })
        tablebody.innerHTML=text;
        const expens=filterData.reduce(function(acc,curr){
            acc=acc+curr.salary;
            return acc;
        },0)
        bonus.innerText='annualBonus'
        let text1=`TOTAL EXPENDITURE=${expens}`
        total.innerText=text1;
        
     }
btnGiven.addEventListener('click',getdata);
btnSort.addEventListener('click',sortdata)
btnSum.addEventListener('click',summary)


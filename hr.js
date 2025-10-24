
        const dataGiven=document.getElementById('dataGiven');
        async function getdata(){
        let file=await fetch('hr.json');
        let data=await file.json()
   
        return data
    }
    async function display() {
        let data=await getdata();
        console.log(typeof data)
        dataGiven.innerText=JSON.stringify(data,null,2);
        
    }
     async function sortdata(){
         let data=await getdata();
         const sortedData=data.toSorted((a,b)=>b.salary-a.salary)
            console.log(sortedData);
            return sortedData;
     }
     function ignore(x) {
        return x.experience>=3;

     }
     async function summary() {
        let data=await sortdata();
        filterData=data.filter(ignore)
        console.log(filterData);
        let sum_list=[];
        filterData.forEach(element => {
            let obj={name:element.name,department:element.department,annualBonus:element.salary*0.1*element.experience}
            sum_list.push(obj);
            
        });
        console.log(sum_list)
        const total=filterData.reduce(function(acc,curr){
            acc=acc+curr.salary;
            return acc;
        },0)
        console.log(total);
     }

 display()
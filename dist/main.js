let collums=5,rows=6,gamefield=document.getElementById("gamefield");for(let a=0;a<rows;a++){let e=document.createElement("div");e.classList.add("row"),e.id="row"+a.toString();for(let t=0;t<collums;t++){let r=document.createElement("div");r.classList.add("letter-box"),r.id="box"+a.toString()+"-"+t.toString(),e.appendChild(r)}gamefield.appendChild(e)}let answer="канон",input="канон",wordCompare=(r,t)=>{for(var e in inputArray=r.split(""),answerArray=t.split(""),result=[],inputArray)inputArray.at(e)===answerArray.at(e)&&(result.push({letter:inputArray.at(e),position:e,color:"green"}),answerArray.splice(e,1,null),inputArray.splice(e,1,""));for(var a in inputArray)answerArray.includes(inputArray.at(a))&&(result.push({letter:inputArray.at(a),position:a,color:"yellow"}),answerArray.splice(answerArray.indexOf(inputArray.at(a)),1,null),inputArray.splice(a,1,""));for(var i in inputArray)""!==inputArray.at(i)&&result.push({letter:inputArray.at(i),position:i,color:"gray"});return result.sort((r,t)=>r.position-t.position),result};for(let r of wordCompare(input,answer))console.log(r);
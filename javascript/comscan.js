
window.comscan = window.comscan || {};


function Board(input) { 
this.keys=input

this.getHighlight= function(){
return this.keys[0];
};


this.refreshHTML=function(){

listtable= document.getElementById('listtable');

for (i=0;i<this.keys.length;i++)
{
listtable.innerHTML+="<tr><td>"+this.keys[i]+"</tr></td>"
}

}

} 



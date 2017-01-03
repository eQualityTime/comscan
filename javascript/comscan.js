
window.comscan = window.comscan || {};


function Board(input) { 
this.marker=0;
this.keys=input;

this.getHighlight= function(){
return this.keys[this.marker];
};


this.refreshHTML=function(){
	listtable= document.getElementById('listtable');
	for (i=0;i<this.keys.length;i++)
	{
		listtable.innerHTML+="<tr><td>"+this.keys[i]+"</tr></td>";
	}
}

this.move=function(){
	this.marker++;
	if (this.marker==this.keys.length){
		this.marker=0;
	}	
//needs to speak here as well. 
}

} 



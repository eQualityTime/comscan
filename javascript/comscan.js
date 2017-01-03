
window.comscan = window.comscan || {};


function Board(inkeys,inutterances) { 
this.marker=0;
this.keys=inkeys;
this.utterances=inutterances;

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
say(this.utterances[this.marker]);
//needs to speak here as well. 
}

} 


function say(message){
//alert("say what you want!")//stup

}



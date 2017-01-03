
window.comscan = window.comscan || {};


function Board(inGraph,inutterances) { 
//This is a spider that walks thought the pages digraph
this.node=0//default
this.childIndex=0;
this.graph=inGraph;
this.utterances=inutterances;
this.getCurrentNode=function(){return this.graph[this.node]}
this.getHighlight= function(){
return this.getCurrentNode()[this.childIndex];
};


this.refreshHTML=function(){
	listtable= document.getElementById('listtable');
	for (child=0;child<this.getCurrentNode().length;child++)
	{
		listtable.innerHTML+="<tr><td>"+this.getCurrentNode()[child]+"</tr></td>";
	}
}

this.move=function(){
	this.childIndex++;
	if (this.childIndex==this.getCurrentNode().length){
		this.childIndex=0;
	}	
say(this.utterances[this.getCurrentNode()[this.childIndex]]);
//needs to speak here as well. 
}

this.activate=function(){
///here



}

} 


function say(message){
//alert("say what you want!")//stup

}



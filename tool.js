//跨浏览器兼容的（W3C和IE）

//跨浏览器获取视窗大小
function getInner(){
	if(typeof window.innerWidth!='undefined'){//W3C
		return{
			width:window.innerWidth,
			height:window.innerHeight
		}
	}else{
		return{//IE
			width:document.documentElement.clientWidth,
			height:document.documentElement.clientHeight
		}
	}
}

//跨浏览器获取Style
function getStyle(element,attr){
	if(typeof window.getComputedStyle!='undefined'){//W3C
		return window.getComputedStyle(element,null)[attr];
	}else if(typeof element.currentStyle!='undefined'){//IE
		return element.currentStyle[attr];
	}
}

//跨浏览器添加link或style规则
function insertRule(sheet,selectorText,cssText,position){
	if(typeof sheet.insertRule!='undefined'){//W3C
		sheet.insertRule(selectorText + '{'+cssText+'}',position);
	}else if(typeof sheet.addRule!='undefined'){//IE
		sheet.addRule(selectorText,cssText,position);
	}
}
//跨浏览器移除link或style规则
function deleteRule(sheet,index){
	if(typeof sheet.deleteRule!='undefined'){//W3C
		sheet.deleteRule(index);
	}else if(typeof sheet.removeRule!='undefined'){//IE
		sheet.removeRule(index);
	}
}

//跨浏览器事件绑定,现代方法
function addEvent(obj,type,fn){
	if(typeof obj.addEventListener!='undefined'){//W3C
		obj.addEventListener(type,fn,false);
	}else{
		if(!obj.events)obj.events={};
		
		if(!obj.events[type]){
			
			obj.events[type]=[];
			
			if(obj['on'+type])obj.events[type][0]=fn;
		}else{
			
			if(addEvent.equal(obj.events[type]),fn)return false;
		}
		
		obj.events[type][addEvent.ID++]=fn;
		
		obj['on'+type]=addEvent.exec;
	}
}
addEvent.ID=1;
//执行事件处理函数
addEvent.exec=function(event){
	var e=event||addEvent.fixEvent(window.event);
	var es=this.events[e.type];
	for(var i in es){
		es[i].call(this,e);
	}
}
//相同的函数进行屏蔽
addEvent.equal=function(es,fn){
	for(var i in es){
		if (es[i]==fn)return true;
	}
	return false;
}

//把IE常用的Event对象配对到W3C中去(另一个兼容阻止默认事件方法)
addEvent.fixEvent=function(event){
	event.preventDefault=addEvent.fixEvent.preventDefault;
	event.stopPropagation=addEvent.fixEvent.stopPropagation;
	event.target=event.srcElement;
	return event;
}
//IE阻止默认行为
addEvent.fixEvent.preventDefault=function(){
	this.returnValue=false;
}
//IE取消冒泡
addEvent.fixEvent.stopPropagation=function(){
	this.cancelBubble=true;
}
//阻止默认行为-其它浏览器
function predef(e){
	e.preventDefault();
}

//跨浏览器事件删除,现代方法
function removeEvent(obj,type,fn){
	if(typeof obj.removeEventListener!='undefined'){//W3C
		obj.removeEventListener(type,fn,false);
	}else{
			if(obj.events){
				for(var i in obj.events[type]){
				if(obj.events[type][i]==fn){
					delete obj.events[type][i];
				}
			}
		}	
	}
}

//删除左右空格
function trim(str){
	return str.replace(/(^\s*)|(\s*$)/g,'');
}

//此函数用于判断某一个值是否存在某个数组中
function inArray(array,value){
	for(var i in array){
		if(array[i]===value) return true;
	}
	return false;
}

//获取某一个元素到最外层顶点的距离
function offsetTop(element){
	var top=element.offsetTop;
	var parent=element.offsetParent;
	while(parent!==null){
		top+=parent.offsetTop;
		parent=parent.offsetParent;
	}
	return top;
}

/*
//滚动条清零
function scrollTop(){
	document.documentElement.scrollTop=0;
	document.body.scrollTop=0;
}
*/

//跨浏览器获取滚动条位置
function getScroll(){
	return{
		top:document.documentElement.scrollTop||document.body.scrollTop,
		left:document.documentElement.scrollLeft||document.body.scrollLeft
	} 
}

//跨浏览器获取innerText
function getInnerText(element){
	return (typeof element.textContent=='string')?element.textContent:element.innerText;
}

//跨浏览器设置innerText
function setInnerText(element,text){
	if(typeof element.textContent=='string'){
		element.textContent=text;
	}else{
		element.innerText=text;
	}
}

//获取某一个节点的上一个节点的索引
function prevIndex(current,parent){
	var length=parent.children.length;
	if(current==0){
		return length-1;
	}
	return parseInt(current)-1;
}
//获取某一个节点的下一个节点的索引
function nextIndex(current,parent){
	var length=parent.children.length;
	if(current==length-1){
		return 0;
	}
	return parseInt(current)+1;
}
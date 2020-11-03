//实现连缀功能
//前台调用-$()
var $=function(args){
	return new Base(args);
}
//类库-function Base()
function Base(args){
	//创建一个数组，来保存获取的节点数组
	this.elements=[];
	//综合CSS选择器
	if(typeof args=='string'){
		
		switch (args.charAt(0)){
			case '#':
			this.getId(args.substring(1));
			break;
			case '.':
			this.getClass(args.substring(1));
			break;
			default:
			this.getTag(args);
		}
	}else if(typeof args=='object'){
		if(args!='undefined'){
			this.elements[0]=args;
		}
	}
}
//获取ID节点
Base.prototype.getId = function(id){
	this.elements.push(document.getElementById(id));
	return this;
};
//获取元素节点
Base.prototype.getTag=function(tag){
	var tags=document.getElementsByTagName(tag);
	for(var i=0;i<tags.length;i++){
		this.elements.push(tags[i]);
	}
	return this;
};
//获取class节点
Base.prototype.getClass=function(className,idName){
	var node=null;
	if(arguments.length==2){
		node=document.getElementById(idName);
	}else{
		node=document;
	}
	var all=node.getElementsByTagName('*');
	for(var i=0;i<all.length;i++){
		if((new RegExp('(\\s|^)'+className+'(\\s|$)')).test(all[i].className)){
			this.elements.push(all[i]);
		}
	}
	return this;
};
//获取某一个class节点(教程为eq，返回Base对象)
Base.prototype.getElement=function(num){
	var element=this.elements[num];
	this.elements=[];
	this.elements[0]=element;
	return this;
};
//获取某一个class节点(教程为ge，返回当前对象)
Base.prototype.getDragElement=function(num){
	return this.elements[num];
};
//获取某组节点的数量
Base.prototype.length=function(){
	return this.elements.length;
}
//获取某个节点的属性
Base.prototype.attr=function(attr,value){
	for(var i=0;i<this.elements.length;i++){
		if(arguments.length==1){
			return this.elements[i].getAttribute(attr);
		}else if(arguments.length==2){
			this.elements[i].setAttribute(attr,value);
		}
	}
	return this;
}
//获取某一个节点在整个节点组中是第几个索引
Base.prototype.index=function(){
	var children=this.elements[0].parentNode.children;
	for(var i=0;i<children.length;i++){
		if(this.elements[0]==children[i])return i;
	}
}
//设置某一个节点的透明度
Base.prototype.opacity=function(num){
	for(var i=0;i<this.elements.length;i++){
		this.elements[i].style.opacity=num/100;
		this.elements[i].style.filter='alpha(opacity='+num+')';
	}
	return this;
}
//获取当前节点的上一个元素节点
Base.prototype.prev=function(){
	for(var i=0;i<this.elements.length;i++){
		this.elements[i]=this.elements[i].previousSibling;
		if(this.elements[i]==null)throw new Error('找不到上一个同级元素节点');
		if(this.elements[i].nodeType==3)this.prev();
	}
	return this;
};
//获取当前节点的下一个元素节点
Base.prototype.next=function(){
	for(var i=0;i<this.elements.length;i++){
		this.elements[i]=this.elements[i].nextSibling;
		if(this.elements[i]==null)throw new Error('找不到下一个同级元素节点');
		if(this.elements[i].nodeType==3)this.next();
	}
	return this;
};

//设置css选择器子节点
Base.prototype.find=function(str){
	var childElements=[];
	for(var i=0;i<this.elements.length;i++){
		switch(str.charAt(0)){
			case '#':
			childElements.push(document.getElementById(str.substring(1)));
			break;
			case '.':
			var all=this.elements[i].getElementsByTagName('*');
			for(var j=0;j<all.length;j++){
				if(all[j].className==str.substring(1)){
					childElements.push(all[j]);
				}
			}
			break;
			default:
			var tags=this.elements[i].getElementsByTagName(str);
			for(var j=0;j<tags.length;j++){
				childElements.push(tags[j]);
			}
		}
	}
	this.elements=childElements;
	return this;
};

//设置css
Base.prototype.css=function(attr,value){
	for(var i=0;i<this.elements.length;i++){
		if(arguments.length==1){
			return getStyle(this.elements[i],attr);
		}
		this.elements[i].style[attr]=value;
	}
	return this;
}
//设置innerHtml
Base.prototype.html=function(str){
	for(var i=0;i<this.elements.length;i++){
		if(arguments.length==0){
		return this.elements[i].innerHTML
		}
		this.elements[i].innerHTML=str;
	}
	return this;
}
//设置innerText
Base.prototype.text=function(str){
	for(var i=0;i<this.elements.length;i++){
		if(arguments.length==0){
		return getInnerText(this.elements[i]);
		}
		setInnerText(this.elements[i],str);
	}
	return this;
}
//设置click事件
Base.prototype.click=function(fn){
	for(var i=0;i<this.elements.length;i++){
		this.elements[i].onclick=fn;
	}
	return this;
}
//设置class
Base.prototype.addClass=function(className){
	for(var i=0;i<this.elements.length;i++){
		if(!this.elements[i].className.match(new RegExp('(\\s|^)'+className+'(\\s|$)'))){
			this.elements[i].className += ' '+className;
		}
	}
	return this;
}
//移除class
Base.prototype.removeClass=function(className){
	for(var i=0;i<this.elements.length;i++){
		if(this.elements[i].className.match(new RegExp('(\\s|^)'+className+'(\\s|$)'))){
			this.elements[i].className=this.elements[i].className.replace(new RegExp('(\\s|^)'+className+'(\\s|$)'),'')
		}	
	}
	return this;
}
//添加link或style的Css规则
Base.prototype.addRule=function(num,selectorText,cssText,position){
	var sheet=document.styleSheets[num];
	insertRule(sheet,selectorText,cssText,position);
	return this;
}
//移除link或style的Css规则
Base.prototype.removeRule=function(num,index){
	var sheet=document.styleSheets[num];
	deleteRule(sheet,index);
	return this;
}

//设置鼠标移入移出方法
Base.prototype.hover=function(over,out){
	for(var i=0;i<this.elements.length;i++){
		addEvent(this.elements[i],'mouseover',over);
		addEvent(this.elements[i],'mouseout',out);
	}
	return this;
}

//设置事件发生器
Base.prototype.bind=function(event,fn){
	for(var i=0;i<this.elements.length;i++){
		addEvent(this.elements[i],event,fn);
	}
	return this;
}

//设置表单字段元素
Base.prototype.form=function(name){
	for(var i=0;i<this.elements.length;i++){
		this.elements[i]=this.elements[i][name];
	}
	return this;
}

//设置表单字段内容获取
Base.prototype.value=function(str){
	for(var i=0;i<this.elements.length;i++){
		if(arguments.length==0){
		return this.elements[i].value;
		}
		this.elements[i].value=str;
	}
	return this;
}

//设置点击切换方法
Base.prototype.toggle=function(){
	for(var i=0;i<this.elements.length;i++){
		(function(element,args){
			var count=0;
			addEvent(element,'click',function(){
			args[count++ % args.length].call(this);
			});
		})(this.elements[i],arguments);
	}
	return this;
}

//设置显示
Base.prototype.show=function(){
	for(var i=0;i<this.elements.length;i++){
		this.elements[i].style.display='block';
	}
	return this;	
}
//设置隐藏
Base.prototype.hide=function(){
	for(var i=0;i<this.elements.length;i++){
		this.elements[i].style.display='none';
	}
	return this;	
}
//设置物体居中
Base.prototype.center=function(width,height){
	var top=(getInner().height-height)/2+getScroll().top;
	var left=(getInner().width-width)/2+getScroll().left;
	for(var i=0;i<this.elements.length;i++){
		this.elements[i].style.top=top+'px';
		this.elements[i].style.left=left+'px';
	}
	return this;
}
//触发浏览器窗口事件
Base.prototype.resize=function(fn){
	for(var i=0;i<this.elements.length;i++){
		var element=this.elements[i];
		addEvent(window,'resize',function(){
			fn();
			if(element.offsetLeft>getInner().width+getScroll().left-element.offsetWidth){
				element.style.left=getInner().width+getScroll().left-element.offsetWidth+'px';
				if(element.offsetLeft<=0+getScroll().left){
					element.style.left=0+getScroll().left+'px';
				}
			}
			if(element.offsetTop>getInner().height+getScroll().top-element.offsetHeight){
				element.style.top=getInner().height+getScroll().top-element.offsetHeight+'px';
				if(element.offsetTop<=0+getScroll().top){
					element.style.top=0+getScroll().top+'px';
				}
			}
		});
	}
	return this;
}
//设置锁屏
Base.prototype.lock=function(){
	for(var i=0;i<this.elements.length;i++){
		this.elements[i].style.display='block';
		this.elements[i].style.width=getInner().width+getScroll().left+'px';
		this.elements[i].style.height=getInner().height+getScroll().top+'px';
		document.documentElement.style.overflow='hidden';
	}
	return this;
}
//取消锁屏
Base.prototype.unlock=function(){
	for(var i=0;i<this.elements.length;i++){
		this.elements[i].style.display='none';
		document.documentElement.style.overflow='auto';
	}
	return this;
}
//插件入口
Base.prototype.extend=function(name,fn){
	Base.prototype[name]=fn;
}
//设置动画
Base.prototype.animate=function(obj){
	for(var i=0;i<this.elements.length;i++){
		var element=this.elements[i];
		var time=50;
		var attr=obj['attr']=='x'?'left':obj['attr']=='y'?'top':
		obj['attr']=='w'?'width':obj['attr']=='h'?'height':
		obj['attr']=='o'?'opacity':obj['attr']!==undefined?obj['attr']:'left';
		var start=obj['start']!=undefined?obj['start']:
		attr=='opacity'?parseFloat(getStyle(element,attr))*100:parseInt(getStyle(element,attr));
		var	step=obj['step']!=undefined?obj['step']:10;
		var	target=obj['target'];
		var speed=obj['speed']!=undefined?obj['speed']:6;
		var type=obj['type']==0?'constant':obj['type']==1?'buffer':'buffer';//0匀速，1缓冲
		var mul=obj['mul'];
		
		if(target==undefined&&mul==undefined)throw new Error('target目标量必须要有！');
		
		if(start>target)step=-step;
		
		if(attr=='opacity'){
			element.style.opacity=parseInt(start)/100;
			element.style.filter='alpha(opacity='+parseInt(start)+')';
		}else{
			element.style[attr]=start+'px';
		}
		clearInterval(element.timer);

		if(mul==undefined){
			mul={};
			mul[attr]=target;
		}
		element.timer=setInterval(function(){
			var px=parseInt(getStyle(element,attr));
			var flag=true;

			for(var i in mul){
				attr=i;
				target=mul[i];
				if(type=='buffer'){
					var temp=attr=='opacity'?(target-parseFloat(getStyle(element,attr))*100)/speed:
						(target-px)/speed;
					step=step>0?Math.ceil(temp):Math.floor(temp);
				}
				if(attr=='opacity'){
					if(step==0){
						setOpacity();
					}else if(step>0&&Math.abs(parseFloat(getStyle(element,attr))*100-target)<=step){
						setOpacity();
					}else if(Math.abs(parseFloat(getStyle(element,attr))*100-target)<=Math.abs(step)){
						setOpacity();
					}else{
						var temp=parseFloat(getStyle(element,attr))*100;
						element.style.opacity=parseInt(temp+step)/100;
						element.style.filter='alpha(opacity='+parseInt(temp+step)+')';
					}
					if(parseInt(target)!=parseInt(parseFloat(getStyle(element,attr))*100))flag=false;	
				}
				else{
					if(step==0){
						setTarget();
					}else if(step>0&&Math.abs(px-target)<=step){
						setTarget();
					}else if(Math.abs(px-target)<=Math.abs(step)){
						setTarget();
					}else{
						element.style[attr]=px+step+'px';
					}
					if(parseInt(target)!=parseInt(getStyle(element,attr)))flag=false;
				}
			}
			if(flag){
				clearInterval(element.timer);
				if(obj.fn!=undefined)obj.fn();
			}
		},time);
		function setTarget(){
			element.style[attr]=target+'px';
		}
		function setOpacity(){
			element.style.opacity=parseInt(target)/100;
			element.style.filter='alpha(opacity='+parseInt(target)+')';
		}
	}
	return this;
};
//表单序列化
$().extend('serialize',function(){
	for(var i=0;i<this.elements.length;i++){
		var form=this.elements[i];
		var parts={};
		for(var i=0;i<form.elements.length;i++){
			var filed=form.elements[i];
			switch(filed.type){
				case undefined:
				case 'submit':
				case 'reset':
				case 'file':
				case 'button':
					break;
				case 'radio':
				case 'checkbox':
					if(!filed.checked) break;
				case 'select-one':
				case 'select-multipie':
					for(var j=0;j<filed.options.length;j++){
						var option=filed.options[j];
						if(option.selected){
							var optValue='';
							if(option.hasAttribute){//W3C
								optValue=(option.hasAttribute('value')?option.value:option.text);
							}else{//IE
								optValue=(option.attributes('value').specified?option.value:option.text);
							}
							parts[filed.name]=optValue;
						}
					}
					break;
				default:
				parts[filed.name]=filed.value;
			}
		}
		return parts;
	}
	return this;
});

window.onload=function(){/**/
	//个人中心的下拉菜单
	$().getClass('member').hover(function()
		{$().getClass('member').css('background','url(images/arrow2.png)no-repeat 50px center');
		$().getClass('member_ul').show().animate({
			mul:{
				opacity:100,
			}
		})},
		function(){$().getClass('member').css('background','url(images/arrow.png)no-repeat 50px center');
		$().getClass('member_ul').animate({
			mul:{
				opacity:0,
			},
			fn:function(){
				$().getClass('member_ul').hide();
			}
		});}
	);
	
	//登录框随窗口改变而改变
	$().getId('login').center(350,250).resize(function(){
		if ($().getId('login').css('display')=='block'){
			$().getId('screen').lock();
		}
	});

	//登录框居中
	$().getId('login').center(350,250);
	//注册框居中
	$().getId('reg').center(600,550);

	//点击登录
	$().getClass('login').click(function(){
		$().getId('login').center(350,250);
		$().getId('login').css('display','block');
		$().getId('screen').lock().animate({
			'attr':'o',
			'target':60
		});
	});
	//点击注册
	$().getClass('reg').click(function(){
		$().getId('reg').center(600,550);
		$().getId('reg').css('display','block');
		$().getId('screen').lock().animate({
			'attr':'o',
			'target':60
		});
	});

	//登录框关闭
	$().getId('login').find('.close').click(function(){
		$().getId('login').css('display','none');
		$().getId('screen').animate({
			'attr':'o',
			'target':0,
			fn:function(){
				$().getId('screen').unlock();
			}
		});
	});
	//注册框关闭
	$().getId('reg').find('.close').click(function(){
		$().getId('reg').css('display','none');
		$().getId('screen').animate({
			'attr':'o',
			'target':0,
			fn:function(){
				$().getId('screen').unlock();
			}
		});
	});

	//登录框拖拽
	$().getId('login').drag([$().getId('login').find('h2').getDragElement(0)]);
	//注册框拖拽
	$().getId('reg').drag([$().getId('reg').find('h2').getDragElement(0)]);

	//分享栏功能
	//var sheight,获取分享栏高度
	var sheight= parseInt(getStyle($().getId('share').getDragElement(0),'height'));
	$().getId('share').css('top',getScroll().top+(getInner().height-sheight)/2+'px');
	//分享栏效果
	$().getId('share').hover(function(){
		$().getId('share').animate({
			'attr':'x',
			'target':0
		});
	},function(){
		$().getId('share').animate({
			'attr':'x',
			'target':-211
		});
	});
	//滚动条事件,分享栏一起滚动
	addEvent(window,'scroll',function(){
			$().getId('share').css('top',getScroll().top+(getInner().height-sheight)/2+'px');
	});

	//导航条滑动
	$().getId('nav').find('.about').find('li').hover(function(){
		var target=$(this).getDragElement(0).offsetLeft;
		$().getId('nav').find('.nav_bg').animate({
			'attr':'x',
			'target':target+15,
			fn:function(){
				$().getId('nav').find('.white').animate({
					'attr':'x',
					'target':-target
				});
			}
		});
	},function(){
		$().getId('nav').find('.nav_bg').animate({
			'attr':'x',
			'target':15,
			fn:function(){
				$().getId('nav').find('.white').animate({
					'attr':'x',
					'target':0
				});
			}
		});
	});

	$().getId('sidebar').find('h2').toggle(function(){
		$(this).next().hide();
	},function(){
		$(this).next().show();
	})

	//表单验证
	//表单验证-初始化
	$().getTag('form').getDragElement(0).reset();

	//表单验证-用户名
	$().getTag('form').form('user').bind('focus',function(){
		$().getClass('info_user').css('display','block');
		$().getClass('error_user').css('display','none');
		$().getClass('succ_user').css('display','none');
	}).bind('blur',function(){
		if(trim($(this).value())==''){
			$().getClass('info_user').css('display','none');
			$().getClass('error_user').css('display','none');
			$().getClass('succ_user').css('display','none');
		}else if(!check_user()){
			$().getClass('info_user').css('display','none');
			$().getClass('error_user').css('display','block');
			$().getClass('succ_user').css('display','none');
		}else{
			$().getClass('info_user').css('display','none');
			$().getClass('error_user').css('display','none');
			$().getClass('succ_user').css('display','block');
		}
	});
	//用户名验证函数
	function check_user(){
		if(/[\w]{2,20}/.test(trim($().getTag('form').form('user').value())))return true;
	}

	//表单验证-密码
	$().getTag('form').form('pass').bind('focus',function(){
		$().getClass('info_pass').css('display','block');
		$().getClass('error_pass').css('display','none');
		$().getClass('succ_pass').css('display','none');
	}).bind('blur',function(){
		if(trim($(this).value())==''){
			$().getClass('info_pass').css('display','none');	
		}else{
			if(check_pass()){
				$().getClass('info_pass').css('display','none');
				$().getClass('error_pass').css('display','none');
				$().getClass('succ_pass').css('display','block');
			}else{
				$().getClass('info_pass').css('display','none');
				$().getClass('error_pass').css('display','block');
				$().getClass('succ_pass').css('display','none');
			}
		}
	});


	//密码强度验证
	$().getTag('form').form('pass').bind('keyup',function(){
		check_pass();
	});
	//密码验证函数
	function check_pass(){
		var value=trim($().getTag('form').form('pass').value());
		var value_length=value.length;
		var code_length=0;
		//验证-6-20个字符
		if(value_length>=6&&value_length<=20){
			$().getId('reg').getClass('info_pass').find('.q1').html('●').css('color','green');
		}else{
			$().getId('reg').getClass('info_pass').find('.q1').html('○').css('color','#666');
		}
		//验证-只能包含大小写字母、数字和非空字符
		if(value_length>0 && !/\s/.test(value)){
			$().getId('reg').getClass('info_pass').find('.q2').html('●').css('color','green');
		}else{
			$().getId('reg').getClass('info_pass').find('.q2').html('○').css('color','#666');
		}
		//验证-大小写字母,数字,非空字符,2种以上(ABC,abc,123,~$@,这四种字符，至少有其中两种混搭)
		if(/[0-9]/.test(value)){
			code_length++;
		}
		if(/[a-z]/.test(value)){
			code_length++;
		}
		if(/[A-Z]/.test(value)){
			code_length++;
		}
		if(/[^0-9a-zA-Z]/.test(value)){
			code_length++;
		}
		if(code_length>=2){
			$().getId('reg').getClass('info_pass').find('.q3').html('●').css('color','green');
		}else{
			$().getId('reg').getClass('info_pass').find('.q3').html('○').css('color','#666');
		}
		//验证-安全级别，规则：(这个验证要从高往低判断，防止高级别无法执行到)
		if(value_length>=10&&code_length>=3){
			$().getId('reg').getClass('s1').css('color','green');
			$().getId('reg').getClass('s2').css('color','green');
			$().getId('reg').getClass('s3').css('color','green');
			$().getId('reg').getClass('info_pass').find('.s s4').html('高').css('color','green');
		}else if(value_length>=8&&code_length>=2){
			$().getId('reg').getClass('s1').css('color','blue');
			$().getId('reg').getClass('s2').css('color','blue');
			$().getId('reg').getClass('s3').css('color','#ccc');
			$().getId('reg').getClass('info_pass').find('.s s4').html('中').css('color','blue');
		}else if(value_length>=1){
			$().getId('reg').getClass('s1').css('color','red');
			$().getId('reg').getClass('s2').css('color','#ccc');
			$().getId('reg').getClass('s3').css('color','#ccc');
			$().getId('reg').getClass('info_pass').find('.s s4').html('低').css('color','red');
		}else{
			$().getId('reg').getClass('s1').css('color','#ccc');
			$().getId('reg').getClass('s2').css('color','#ccc');
			$().getId('reg').getClass('s3').css('color','#ccc');
			$().getId('reg').getClass('info_pass').find('.s s4').html('');
		}
		if(value_length>=6&&value_length<=20&& !/\s/.test(value)&&code_length>=2){
			return true;
		}else{
			return false;
		}	
	}
	
	//验证-密码确认
	$().getTag('form').form('notpass').bind('focus',function(){
		$().getClass('info_notpass').css('display','block');
		$().getClass('error_notpass').css('display','none');
		$().getClass('succ_notpass').css('display','none');
	}).bind('blur',function(){
		if(trim($(this).value())==''){
			$().getClass('info_notpass').css('display','none');	
		}else if(check_notpass()){
			$().getClass('info_notpass').css('display','none');
			$().getClass('error_notpass').css('display','none');
			$().getClass('succ_notpass').css('display','block');
		}else{
			$().getClass('info_notpass').css('display','none');
			$().getClass('error_notpass').css('display','block');
			$().getClass('succ_notpass').css('display','none');
		}
	});

	//验证-密码确认函数
	function check_notpass(){
		if(trim($().getTag('form').form('notpass').value())==trim($().getTag('form').form('pass').value())){
			return true;
		}
	}
	//验证-提问
	$().getTag('form').form('ques').bind('change',function(){
		if(check_ques()){
			$().getClass('error_ques').css('display','none');
		}
	});
	//验证-提问函数
	function check_ques(){
		if($().getTag('form').form('ques').value()!=0)return true;
	}

	//验证-回答
	$().getTag('form').form('ans').bind('focus',function(){
		$().getClass('info_ans').css('display','block');
		$().getClass('error_ans').css('display','none');
		$().getClass('succ_ans').css('display','none');
	}).bind('blur',function(){
		if(trim($(this).value())==''){
			$().getClass('info_ans').css('display','none');	
		}else if(check_ans()){
			$().getClass('info_ans').css('display','none');
			$().getClass('error_ans').css('display','none');
			$().getClass('succ_ans').css('display','block');
		}else{
			$().getClass('info_ans').css('display','none');
			$().getClass('error_ans').css('display','block');
			$().getClass('succ_ans').css('display','none');
		}
	});
	//回答函数
	function check_ans(){
		if(trim($().getTag('form').form('ans').value()).length>=2&&trim($().getTag('form').form('ans').value()).length<=32){
			return true;
		}
	}

	//验证-电子邮件
	$().getTag('form').form('email').bind('focus',function(){
		$().getClass('info_email').css('display','block');
		$().getClass('error_email').css('display','none');
		$().getClass('succ_email').css('display','none');
		//补全界面-下浮选项
		if($(this).value().indexOf('@')==-1){
			$().getId('reg').find('.all_email').css('display','block');
		}
	}).bind('blur',function(){
		if(trim($(this).value())==''){
			$().getClass('info_email').css('display','none');	
		}else if(check_email()){
			$().getClass('info_email').css('display','none');
			$().getClass('error_email').css('display','none');
			$().getClass('succ_email').css('display','block');
		}else{
			$().getClass('info_email').css('display','none');
			$().getClass('error_email').css('display','block');
			$().getClass('succ_email').css('display','none');
		}
		//补全界面-下浮选项
		$().getId('reg').find('.all_email').css('display','none');
	});
		//电子邮件函数
	function check_email(){
		if(/^[\w\-\.]+@[\w\-]+(\.[a-zA-Z]{2,4}){1,2}$/.test(trim($().getTag('form').form('email').value()))){
			return true;
		}
	}

	//电子邮件补全系统
	//电子邮件-鼠标效果
	$().getId('reg').find('.all_email').find('li').hover(function(){
		$(this).css('background','#E5EDF2');
		$(this).css('color','#06F');
	},function(){
		$(this).css('background','#fff');
		$(this).css('color','#666');
	});
	//电子邮件-输入效果
	$().getTag('form').form('email').bind('keyup',function(event){
		if($(this).value().indexOf('@')==-1){
			$().getId('reg').find('.all_email').css('display','block');
			$().getId('reg').find('.all_email').find('span').html($(this).value());
		}else{
			$().getId('reg').find('.all_email').css('display','none');
		}
		var length=$().getId('reg').find('.all_email').find('li').length();
		$().getId('reg').find('.all_email').find('li').css('background','#fff');
		$().getId('reg').find('.all_email').find('li').css('color','#666');
		if(event.keyCode==40){
			if(this.index==undefined||this.index>=length-1){
				this.index=0;
			}else{
				this.index++;
			}
			$().getId('reg').find('.all_email').find('li').getElement(this.index).css('background','#E5EDF2');
			$().getId('reg').find('.all_email').find('li').getElement(this.index).css('color','#06F');	
		}
		if(event.keyCode==38){
			if(this.index==undefined||this.index<=0){
				this.index=length-1;
			}else{
				this.index--;
			}
			$().getId('reg').find('.all_email').find('li').getElement(this.index).css('background','#E5EDF2');
			$().getId('reg').find('.all_email').find('li').getElement(this.index).css('color','#06F');	
		}
		if(event.keyCode==13){
			$(this).value($().getId('reg').find('.all_email').find('li').getElement(this.index).text());
			$().getId('reg').find('.all_email').css('display','none');
			this.index=undefined;
		}
	});
	//电子邮件-点击获取
	$().getId('reg').find('.all_email').find('li').bind('mousedown',function(){
		$().getTag('form').form('email').value($(this).text());
	});

	//年月日
	var year=$().getTag('form').form('year');
	var month=$().getTag('form').form('month');
	var day=$().getTag('form').form('day')
	var day30=[4,6,9,11];
	var day31=[1,3,5,7,8,10,12];
	//注入年
	for(var i=1991;i<=2020;i++){
		year.getDragElement(0).add(new Option(i,i),undefined);
	}
	//注入月份
	for(var i=1;i<=12;i++){
		month.getDragElement(0).add(new Option(i,i),undefined);
	}
	//天数，根据情况判断一个月有多少天
	year.bind('change',select_day);
	month.bind('change',select_day);
	day.bind('change',function(){
		if(check_birthday()){
			$().getClass('error_birthday').css('display','none');
		}
	});
	function select_day(){
		if(year.value()!=0&&month.value()!=0){
			//清理之前注入的天数
			day.getDragElement(0).options.length=1;
			//下面开始注入天数
			if(inArray(day31,parseInt(month.value()))){
				for(var i=1;i<=31;i++){
					day.getDragElement(0).add(new Option(i,i),undefined);
				}
			}else if(inArray(day30,parseInt(month.value()))){
				for(var i=1;i<=30;i++){
					day.getDragElement(0).add(new Option(i,i),undefined);
				}
			}else{//判断2月28，29天
				if((parseInt(year.value())%4==0&&parseInt(year.value())%100!=0)||
					parseInt(year.value())%400==0){
					for(var i=1;i<=29;i++){
					day.getDragElement(0).add(new Option(i,i),undefined);
					}
				}else{
					for(var i=1;i<=28;i++){
					day.getDragElement(0).add(new Option(i,i),undefined);
					}
				}
			}
		}else{
			day.getDragElement(0).options.length=1;
		}
	}
	//生日验证函数
	function check_birthday(){
		if(year.value()!=0&&month.value()!=0&&day.value()!=0) return true;
	}

	//文本框字数
	$().getTag('form').form('ps').bind('keyup',check_ps).bind('paste',function(){
		setTimeout(check_ps,50);
	});

	//清尾
	$().getId('reg').find('.ps').find('.clear').click(function(){
		$().getTag('form').form('ps').value($().getTag('form').form('ps').value().substring(0,200));
		check_ps();
	});

	//检测字数
	function check_ps(){
		var num=200-$().getTag('form').form('ps').value().length;
		if(num>=0){
			$().getId('reg').find('.ps').getElement(0).css('display','block');
			$().getId('reg').find('.ps').find('.num').getElement(0).html(num);
			$().getId('reg').find('.ps').getElement(1).css('display','none');
			return true;
		}else{
			$().getId('reg').find('.ps').getElement(0).css('display','none');
			$().getId('reg').find('.ps').find('.num').getElement(1).html(Math.abs(num)).css('color','red');
			$().getId('reg').find('.ps').getElement(1).css('display','block');
			return false;
		}
	}

	//表单提交
	$().getTag('form').form('sub').click(function(){
		var flag=true;
		if(!check_user()){
			$().getClass('error_user').css('display','block');
			flag=false;
		}
		if(!check_pass()){
			$().getClass('error_pass').css('display','block');
			flag=false;
		}
		if(!check_notpass()){
			$().getClass('error_notpass').css('display','block');
			flag=false;
		}
		if(!check_ques()){
			$().getClass('error_ques').css('display','block');
			flag=false;
		}
		if(!check_ans()){
			$().getClass('error_ans').css('display','block');
			flag=false;
		}
		if(!check_email()){
			$().getClass('error_email').css('display','block');
			flag=false;
		}
		if(!check_birthday()){
			$().getClass('error_birthday').css('display','block');
			flag=false;
		}
		if(!check_ps()){
			flag=false;
		}
		if(flag){
			$().getTag('form').getDragElement(0).submit();
			
		}
		
		/*
		//利用ajax提交表单
		var _this=this;
		$().getId('loading').css('display','block').center(200,40);//表单提交时候显示等待
		$().getId('loading').find('p').html('正在提交注册中')
		_this.disabled=true;
		$(_this).css('backgrounePosition','right');
		ajax({
			method:'post',
			url:'demo.php',
			data:$().getTag('form').getElement(0).serialize(),//把表单的所有元素集中在对象中反给data

			success:function(text){//将index.php上的信息返回，并打印出来
				if(text==1){
					$().getId('loading').css('display','none');
					$().getId('success').css('display','block').center(200,40);
					$().getId('success').find('p').html('注册成功请登录...')
					setTimeout(function(){
						$().getId('success').css('display','none');
						$().getId('reg').css('display','none');
						$().getTag('form').getDragElement(0).reset();
						_this.disabled=false;
						$(_this).css('backgrounePosition','left');
						$().getId('screen').animate({
							attr:'o',
							target:'0',
							fn:function(){
								$().getId('screen').unlock();
							}
						});
					},1000);
				};
			},
			async:true//是不是异步模式，true为是
		});
		*/
	
	});

	//轮播器初始化
	$().getId('banner').find('img').opacity(0);
	$().getId('banner').find('img').getElement(0).opacity(100);
	$().getId('banner').find('ul').find('li').getElement(0).css('color','#333');
	$().getId('banner').find('strong').html($().getId('banner').find('img').getElement(0).attr('alt'));
	//手动轮播器
	$().getId('banner').find('ul').find('li').hover(function(){
		clearInterval(banner_timer);
		if($(this).css('color')!='rgb(51,51,51)'&& $(this).css('color')!='#333'){
			banner(this,banner_index==0?$().getId('banner').find('ul').find('li').length()-1:banner_index-1);
		}
	},function(){
		banner_index=$(this).index()+1;
		banner_timer=setInterval(banner_fn,1000);
	});
	//轮播器计数器
	var banner_index=1;
	//轮播器的种类
	var banner_type=1;
	//自动轮播器
	var banner_timer=setInterval(banner_fn,1000);
	//轮播器封装的函数
	function banner(obj,prev){	
		
		$().getId('banner').find('ul').find('li').css('color','#999');
		$(obj).css('color','#333');
		$().getId('banner').find('strong').html($().getId('banner').find('img').getElement($(obj).index()).attr('alt'));
		if(banner_type==1){
			$().getId('banner').find('img').getElement(prev).animate({
				'attr':'o',
				'target': 0
			}).css('zIndex',1);

			$().getId('banner').find('img').getElement($(obj).index()).animate({
				'attr':'o',
				'target': 100
			}).css('zIndex',2);
		}else if(banner_type==2){
			$().getId('banner').find('img').getElement(prev).animate({
				'attr':'y',
				'target': 150
			}).css('zIndex',1).opacity(100);

			$().getId('banner').find('img').getElement($(obj).index()).animate({
				'attr':'y',
				'target': 0
			}).css('top','-150px').css('zIndex',2).opacity(100);
		}
	}
	function banner_fn(){
		if(banner_index>=$().getId('banner').find('ul').find('li').length()) banner_index=0;
		banner($().getId('banner').find('ul').find('li').getElement(banner_index).getDragElement(0),banner_index==0?$().getId('banner').find('ul').find('li').length()-1:banner_index-1);
		banner_index++;
	}

	//图片延迟加载
	var wait_load=$().getClass('wait_load');
	wait_load.opacity(0);
	$(window).bind('scroll',_wait_load);
	$(window).bind('resize',_wait_load);
	//延迟加载函数
	function _wait_load(){
		setTimeout(function(){
			for(var i=0;i<wait_load.length();i++){
				var _this=wait_load.getDragElement(i);
				if(getInner().height+getScroll().top>=offsetTop(_this)){
					$(_this).attr('src',$(_this).attr('xsrc')).animate({
						'attr':'o',
						'target':100
					});
				}	
			}
		},100);
	}

	//图片预加载
	//点击大图
	$().getId('photo').find('.wait_load').click(function(){
		$().getId('photo_big').center(620,511);
		$().getId('photo_big').css('display','block');
		$().getId('screen').lock().animate({
			'attr':'o',
			'target':60
		});
		//大图片加载
		var temp_img = new Image();
		temp_img.src=$(this).attr('bigsrc');
		$(temp_img).bind('load',function(){
			$().getId('photo_big').find('.big').find('img').attr('src',temp_img.src).animate({
				'attr':'o',
				'target':100
			}).css('top',0).opacity(0);
		});
		var children=this.parentNode.parentNode;
		prev_next_img(children);
	});
	//大图框关闭
	$().getId('photo_big').find('.close').click(function(){
		$().getId('photo_big').css('display','none');
		$().getId('screen').animate({
			'attr':'o',
			'target':0,
			fn:function(){
				$().getId('screen').unlock();
			}
		});
		$().getId('photo_big').find('.big').find('img').attr('src','images/loading.gif').css('top','190px');
	});
	//大图框拖拽
	$().getId('photo_big').drag([$().getId('photo_big').find('h2').getDragElement(0)]);
	//大图框随窗口改变而改变
	$().getId('photo_big').center(620,511).resize(function(){
		if ($().getId('photo_big').css('display')=='block'){
			$().getId('screen').lock();
		}
	});
	//大图片左右切换
	//显示左边箭头
	$().getId('photo_big').find('.big').find('.left').hover(function(){
		$().getId('photo_big').find('.big').find('.sl').animate({
			'attr':'o',
			'target':50
		});
	},function(){
		$().getId('photo_big').find('.big').find('.sl').animate({
			'attr':'o',
			'target':0
		});
	});
	//显示右边箭头
	$().getId('photo_big').find('.big').find('.right').hover(function(){
		$().getId('photo_big').find('.big').find('.sr').animate({
			'attr':'o',
			'target':50
		});
	},function(){
		$().getId('photo_big').find('.big').find('.sr').animate({
			'attr':'o',
			'target':0
		});
	});
	//显示上一张图
	$().getId('photo_big').find('.big').find('.left').click(function(){
		
		$().getId('photo_big').find('.big').find('img').attr('src','images/loading.gif').css('top','190px');

		var current_img=new Image();

		$(current_img).bind('load',function(){
			$().getId('photo_big').find('.big').find('img').attr('src',current_img.src).animate({
				'attr':'o',
				'target':100
			}).opacity(0).css('top',0);
		});		
		current_img.src=$(this).attr('src');

		//获取当前节点索引
		var children=$().getId('photo').find('dl').find('dt').find('img')
		.getDragElement(prevIndex($().getId('photo_big').find('.big')
		.find('img').attr('index'),$().getId('photo').getDragElement(0))).parentNode.parentNode;
		
		prev_next_img(children);
	});

	//显示下一张图
	$().getId('photo_big').find('.big').find('.right').click(function(){

		$().getId('photo_big').find('.big').find('img').attr('src','images/loading.gif').css('top','190px');

		var current_img=new Image();
		$(current_img).bind('load',function(){
			$().getId('photo_big').find('.big').find('img').attr('src',current_img.src).animate({
				'attr':'o',
				'target':100
			}).opacity(0).css('top',0);
		});
		current_img.src=$(this).attr('src');

		//获取当前节点索引
		var children=$().getId('photo').find('dl').find('dt').find('img')
		.getDragElement(nextIndex($().getId('photo_big').find('.big')
		.find('img').attr('index'),$().getId('photo').getDragElement(0))).parentNode.parentNode;
		
		prev_next_img(children);
	});

	//显示上下图的函数
	function prev_next_img(children){
		var prev=prevIndex($(children).index(),children.parentNode);
		var next=nextIndex($(children).index(),children.parentNode);
		var prev_img=new Image();
		var next_img=new Image();
		prev_img.src=$().getId('photo').find('dl').find('dt').find('img').getElement(prev).attr('bigsrc');
		next_img.src=$().getId('photo').find('dl').find('dt').find('img').getElement(next).attr('bigsrc');
		$().getId('photo_big').find('.big').find('.left').attr('src',prev_img.src);
		$().getId('photo_big').find('.big').find('.right').attr('src',next_img.src);
		$().getId('photo_big').find('.big').find('img').attr('index',$(children).index());
		//右下角em的内容
		$().getId('photo_big').find('.big').find('.index').html(parseInt($(children).index())+1+'/'+
			$().getId('photo').find('dl').find('dt').find('img').length());
	}


	//点击发文
	$().getId('header').find('.sblog').click(function(){
		$().getId('blog').center(580,320);
		$().getId('blog').css('display','block');
		$().getId('screen').lock().animate({
			'attr':'o',
			'target':60
		});
	});

	//发文框关闭
	$().getId('blog').find('.close').click(function(){
		$().getId('blog').css('display','none');
		$().getId('screen').animate({
			'attr':'o',
			'target':0,
			fn:function(){
				$().getId('screen').unlock();
			}
		});
	});

	//发文框拖拽
	$().getId('blog').drag([$().getId('blog').find('h2').getDragElement(0)]);	


};
# formgroup
# 批量进行表单的新增、删除、赋值等
# 使用说明
##
	$("#formgroup").formgroup({
		components:[
			{
				title:"输入框",
				element:"<input  value='11' class='form-control'/>",
				name:'input1',
				width:'40%'
			},
			{
				title:"下拉框",
				element:"<select class='form-control'/>",
				name:'select1',
				
				width:'50%'

			},
			{
				title:"操作",
				element:"<span class='glyphicon glyphicon-remove'></span>",
				click:function(){
					$(this).parent().parent().remove();
				},
				width:'10%'
			}
		],
		data:[

			]

	});

	function addFormgroup(){
		$("#formgroup").formgroup("add");
	}

	function removeFormgroup(){
		var idx = $("#formgroup").formgroup("size")-1;
		$("#formgroup").formgroup("remove", idx);
	}
	
	function getData(){
		var data = $("#formgroup").formgroup("getData");
		console.log(data);

	}

	function loadData(){
		
		$("#formgroup").formgroup("loadData", [
			{input1:"134132", select1:"11"},
			{input1:"134132", select1:"11"},
			{input1:"134132", select1:"11"},
			{input1:"134132", select1:"11"}
		]);

	}


	function loadComponentData(){
		var data = $("#formgroup").formgroup("loadComponentData", "select1", [
					{value:"11",text:"2341"},
					{value:"1321",text:"23412"},
					{value:"121",text:"2fasfas"},
					{value:"1341",text:"fasdfa2"},
					{value:"142421",text:"dsfasd2"}
				]);

	}
	

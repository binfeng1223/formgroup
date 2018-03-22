/**
 * formgroup 表单组合框的增加删除等操作
 * 2018年03月07日09:44:55
 * options:
 * {
		components:[
			{
				title:"输入框",
				element:"<input  value='11' class='form-control'/>",
				name:'input1',
				width:'40%'
			},
			{
				title:"下拉框",
				element:"<select   class='form-control'/>",
				name:'select1',
				data:[
					{value:"11",text:"2341"},
					{value:"1321",text:"23412"},
					{value:"121",text:"2fasfas"},
					{value:"1341",text:"fasdfa2"},
					{value:"142421",text:"dsfasd2"}
				],
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
		data:[]

	}

    方法调用示例
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
            $("#formgroup").formgroup("loadComponentData", "select1", [
                        {value:"11",text:"2341"},
                        {value:"1321",text:"23412"},
                        {value:"121",text:"2fasfas"},
                        {value:"1341",text:"fasdfa2"},
                        {value:"142421",text:"dsfasd2"}
                    ]);
        }

 */

(function($){

    function loadData(container, data){
        var fg = $(container);
        fg.children("tbody").empty();
        var state = $.data(container, 'formgroup');
        var option = state.options;
        $.each(data, function(idx, item){
            $.fn.formgroup.methods.add(fg, item);
        })
    }

	function init(container){
        var fg = $(container);
        var state = $.data(container, 'formgroup');
        var option = state.options;
        fg.attr("class", option.className);
        var data = option.data || [];
        var thead = $("<thead style='font-size: 12px;'></thead>");
        var body = $("<tbody></tbody>");
        var titleTh = $("<tr></tr>").appendTo(thead);
        fg.append(thead);
        fg.append(body);
        var components = option.components || [];
        $.each(components, function(idx, item){
            var th = $("<th>"+item.title+"</th>");
            if(item.width){
                th.attr("width", item.width);
            }
            titleTh.append(th);
            components[idx] = $.extend({}, $.fn.formgroup.componentDefaults, item);
            
        })
        loadData(container, data);
    }

	$.fn.formgroup = function(options, param, param1){
		if (typeof options == 'string'){
			return $.fn.formgroup.methods[options](this, param, param1);
		}
		
        options = options || {};
        this.attr("class", "table");
		return this.each(function(){
			var state = $.data(this, 'formgroup');
			if (state){
				$.extend(state.options, options);
			} else {
				$.data(this, 'formgroup', {
					options: $.extend({}, $.fn.formgroup.defaults, options)
				});
				init(this);
			}

		});
	};
	
	$.fn.formgroup.methods = {
		add:function(jq, vals){
            var vals = vals || {};
            var state = jq.data('formgroup');
            var option = state.options;
            var tr = $("<tr></tr>");
            var tbody = $("tbody", jq);
            tbody.append(tr)
            $.each(option.components, function(idx, item){
                var element = $(item.element);
                element.attr("name",item.name);
                var td = $("<td style='padding:1px;'></td>");
                td.append(element);
                tr.append(td);
                element.on("change", item.change).on("click", item.click);
                var data = item.data || [];
                $.each(data, function(d, v){
                    element.append($("<option value='"+v.value+"'>"+v.text+"</option>"));
                });

                item.setValue.call(element[0], vals[item.name] || item.defaultValue);
                var init = item.init;
                init.call(element[0]);
            })
        },
        remove:function(jq, idx){
            var tbody = $("tbody", jq)
            tbody.children("tr")[idx].remove();
        },
        size:function(jq){
            var tbody = $("tbody", jq)
            return tbody.children("tr").length;
        },
        loadData:function(jq, data){
            loadData(jq[0], data);
        },
        getData:function(jq){
            var state = $.data(jq[0], 'formgroup');
            var option = state.options;
            var components = option.components || [];
            var data = [];
            $("tbody", jq).children("tr").each(function(idx, val){
                var _this = this;
                var v = {};
                $.each(components, function(idx, item){
                   if(item.name){
                        var val = item.getValue.call($("[name="+item.name+"]", $(_this))[0]);
                        v[item.name] = val;
                   }
                })
                data.push(v);
                
            })
           return data;
        },
        loadComponentData:function(jq, componentName, data) {
            var state = $.data(jq[0], 'formgroup');
            var option = state.options;
            var components = option.components || [];
            $("tbody", jq).children("tr").each(function(idx, val){
                var _this = this;
                $.each(components, function(idx, item){
                    if(item.name && item.name===componentName){
                        var trComponent = $("[name="+item.name+"]", $(_this)).empty();
                        $.each(data, function(d, v){
                            trComponent.append($("<option value='"+v.value+"'>"+v.text+"</option>"));
                        });
                    }
                    item.data = data;
                })

            })
        },
        setComponentOptions:function(jq, componentName, data){
            var state = $.data(jq[0], 'formgroup');
            var option = state.options;
            var components = option.components || [];
            $.each(components, function(idx, item){
                if(item.name && item.name===componentName){
                    item.data = data;
                }
            })
        },
        loadComponentDataAtLast:function(jq, componentName, data){
            var state = $.data(jq[0], 'formgroup');
            var option = state.options;
            var components = option.components || [];
            $("tbody", jq).children("tr:last").each(function(idx, val){
                var _this = this;
                $.each(components, function(idx, item){
                    if(item.name && item.name===componentName){
                        var trComponent = $("[name="+item.name+"]", $(_this)).empty();
                        $.each(data, function(d, v){
                            trComponent.append($("<option value='"+v.value+"'>"+v.text+"</option>"));
                        });
                    }
                })

            })

        }
	};


	$.fn.formgroup.defaults = {
        components:[
			
        ],
        data:[],
        className:"table"
    }
    
    $.fn.formgroup.componentDefaults = {
        title:"",
        element:"<input value=''/>",
        name:"",
        defaultValue:"",
        data:[],
        width:'',
        init:function(){},
        change:function(){},
        click:function(){},
        getValue:function(){
            return $(this).val();
        },
        setValue:function(value){
            $(this).val(value);
        }
    }

})(jQuery);

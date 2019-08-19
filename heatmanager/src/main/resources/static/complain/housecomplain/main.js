/**
 * 公建投诉管理前端主管理JS 模块：complain 业务对象:所有公建投诉
 *  作者:方俊坤
 * 
 */

$(function(){
	var complainNo=0;
	// 设置系统页面标题
	$("span#mainpagetille").html("公建投诉管理");
	// 设置日期的格式和选择
	
	// 显示公建投诉列表
	$("table#houseComplainTypeGrid").jqGrid({
		url: '/housecomplain/list/page',
		datatype: "json",
		colModel: [
			{ label: '投诉序号', name: 'complainNo', width: 5 },
			{ label: '公建序号', name: 'house.houseNo', width: 5 },
			{ label: '投诉类型编号', name: 'complainType.typeNo', width: 5 },
			{ label: '投诉标题', name: 'complainTitle', width: 5 },
			{ label: '投诉内容', name: 'complainContent', width: 5 },
			{ label: '投诉要求', name: 'requestContent', width: 5 },
			{ label: '投诉日期', name: 'complainDate', width: 5 },
			{ label: '投诉人姓名', name: 'contactPerson', width: 5 },
			{ label: '电话', name: 'tel', width: 5 },
			{ label: '手机', name: 'mobile', width: 5 },
			{ label: 'Mail', name: 'mail', width: 5 },
			{ label: 'QQ', name: 'qq', width: 5 },
			{ label: '开始维修时间', name: 'serviceStartDate', width: 5 },
			{ label: '维修结束时间', name: 'serviceEndDate', width: 5 },
			{ label: '维修人', name: 'serviceContent', width: 5 },
			{ label: '回访时间', name: 'servicePerson', width: 5 },
			{ label: '客户意见', name: 'feedBackDate', width: 5 },
			{ label: '客户意见', name: 'houseComment', width: 5 },
			{ label: '保险出险时间', name: 'assuranceDate', width: 5 },
			{ label: '保险金额', name: 'assuranceFee', width: 5 },
			{ label: '保险理赔时间', name: 'assurancePayDate', width: 5 },
			{ label: '投诉状态', name: 'complainStatus', width: 5 },
			],
		styleUI : 'Bootstrap',
		viewrecords: true, 
		autowidth: true,
		height: 400,
		rowNum: 10,
		rowList:[10,20,30],
		jsonReader : { 
		      root: "list", 
		      page: "page", 
		      total: "pageCount", 
		      records: "count", 
		      repeatitems: true, 
		      id: "complainNo"},
		pager: "#houseComplainTypePager",
		onSelectRow:function(no){
			complainNo=no;
		}
		
	});
	//修改$('#addForm [name="house.houseNo"]')[0].value=
	
	// 点击增加链接处理
	$("button#houseComplainAdd").off().on("click",function(event){
//		if($("div#houseComplainTypeDialogArea").text()!=="")
//			return;
		$("div#houseComplainTypeDialogArea").off().load("complain/housecomplain/add.html",function(){
			$.getJSON("house/getAll",function(data){
				var datalisthtml="";
				data.list.forEach(e=>datalisthtml +="<option value='"+e.houseNo+"'>"+e.name+"</option>"); 
				$("datalist#homeNoList").append(datalisthtml);
			});

			$.getJSON("complaintype/list",function(data){
				var datalisthtml="";
				data.list.forEach(e=>datalisthtml +="<option value='"+e.typeNo+"'>"+e.typeName+"</option>"); 
				$("datalist#typeNoList").append(datalisthtml);
			});
			$("div#houseComplainTypeDialogArea").dialog({
				title:"公建投诉记录添加",
				width:600
			});
			$("form#addForm").ajaxForm(function(result){
				$("div#houseComplainTypeDialogArea").dialog("close");
				$("div#houseComplainTypeDialogArea").dialog("destroy");
				$("div#houseComplainTypeDialogArea").html("");
				if(result.status==="OK"){
					alert(result.message);
					$("table#houseComplainTypeGrid").trigger("reloadGrid");
				}
			})
			
			// 点击取消
			$("input[value='取消']").on("click",function(event){
				$("div#houseComplainTypeDialogArea").dialog("close");
				$("div#houseComplainTypeDialogArea").dialog("destroy");
				$("div#houseComplainTypeDialogArea").html("");
			});
		});
	});
	//===========================删除公建投诉处理================================================
	$("#houseComplainDel").off().on("click",function(event){
						if(complainNo===0||complainNo===""){
							BootstrapDialog.show({
					            title: '公建投诉记录作信息',
					            message:"请选择要查看的员工",
					            buttons: [{
					                label: '确定',
					                action: function(dialog) {
					                    dialog.close();
					                }
					            }]
					        });
						}
						else{
						BootstrapDialog.confirm('确认删除此公建投诉记录么?', function(result){
				            if(result) {
				            	
				                $.post("/housecomplain/delete",{no:complainNo},function(result){
				                	if(result.status==="OK"){
				                		complainNo="";
				    					$("table#houseComplainTypeGrid").trigger("reloadGrid");
									}
									BootstrapDialog.show({
							            title: '公建投诉记录信息',
							            message:result.message
							        });
				              
				            
				        });
				            }
			
		});
						}
	});

	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	// 更新jQGrid的列表显示
// function reloadEmployeeList()
// {
// $("table#EmployeeGrid").jqGrid('setGridParam',{postData:{departmentNo:departmentNo,roleNo:roleNo,sex:sex,startJoinDate:startJoinDate,endJoinDate:endJoinDate}}).trigger("reloadGrid");
//		
// }
//	
// //点击检索事件处理
// $("a#EmployeeSearchButton").on("click",function(){
// departmentNo=$("select#DepartmentSelection").val();
// roleNo=$("select#RoleSelection").val();
// sex=$("input[name='empsex']:checked").val();
//		
// startJoinDate=$("input#startJoinDate").val();
// endJoinDate=$("input#endJoinDate").val();
// if(startJoinDate==""){
// startJoinDate=null;
// }
// if(endJoinDate==""){
// endJoinDate=null;
// }
// reloadEmployeeList();
// });
	
	
});
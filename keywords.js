jQuery(document).ready(function( $ ){
  var inputTitle = $('#inputTitle');
  var inputText = $('#inputTextarea');
  var button = $('#button');
		
  var outputText = $('#outputTextarea');
	const uniqueID = "97dde812de35c21fa0d88e4a9afd8b07d99d83c03ccf76684ac18b30045fe91b";

	
	


  
	button.on('click', function(){
		// inputTitle,inputTextのどちらかが空だったらrequiredの注意書きが発生
		if(!inputTitle[0].reportValidity()){
			return false;
		}
		if(!inputText[0].reportValidity()){
			return false;
		}

		// 多重送信を防ぐためにボタンをdisable
		button.attr("disable",true);
		
		// JSONデータ作成
		// 例外処理の場合はどれか一つを欠損させるとbad error 400がでる
		var data = JSON.stringify({
			app_id: uniqueID,
			title: inputTitle.val(),
			body: inputText.val(),
		});

		
		// 通信実行
    $.ajax({
        type:"post",																		// method = "POST"
        url:"https://labs.goo.ne.jp/api/keyword",				// POST送信先のURL
        contentType: 'application/json',								// リクエストの Content-Type
        dataType: "json",           										// レスポンスをJSONとしてパースする
				data:data																				// JSONデータ本体
		}).done(function(response) {
			
			// outputText初期化
			outputText.val("");
			
			// responseはJSONなのでキーでアクセス
			var result_array = response.keywords;
			
			// 出力のindex_num
			var output_index_num = 1;
			
			// outputTextを書き換え
			Object.keys(result_array).forEach(function (key){
				
				// objectなのでJSON.stringifyでstringに
				var output_result_string = JSON.stringify(result_array[key]);


				// resultに出力
				outputText.val(outputText.val() + String(output_index_num)+ ":" + output_result_string +"\n");
				output_index_num++;
			});
			
			
		}).fail(function(xhr){

			// もしJSONのエラーを表示させたい時(objectからstringに直し済み)
// 			var error_result = JSON.stringify(xhr.responseJSON);
			
			outputText.val("error");
			
		}).always(function(xhr,msg){
			
			// ボタンを再び enableにする
			button.attr("disabled", false);
			
		});

	});
		

	
	
	

});

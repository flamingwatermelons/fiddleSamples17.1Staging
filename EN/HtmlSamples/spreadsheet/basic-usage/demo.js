$(function () {
$.ig.loader({
			scriptPath: "http://staging.igniteui.local/17-1/IgniteUI/js/",
			cssPath: "http://staging.igniteui.local/17-1/IgniteUI/css/",
			resources: "igSpreadsheet,igExcel.LoadSaveXlsx,igEditors"
		});
			
		$(function () {
			$("#spreadsheet").igSpreadsheet({
				height: "600",
				width: "100%"
			});

			var workbook = null;
			var xhr = new XMLHttpRequest();
			xhr.open('GET', 'http://staging.igniteui.local/17-1/data-files/statistic.xlsx', true);
			xhr.responseType = 'arraybuffer';

			xhr.onload = function (e) {
				// response is unsigned 8 bit integer
				var responseArray = new Uint8Array(this.response);
				$.ig.excel.Workbook.load(responseArray, function () {
					workbook = arguments[0];
					setInitialSettings();
				}, function () {
					console.log("fail");
				})
			};
			xhr.send();

			function setInitialSettings() {
				$("#spreadsheet").igSpreadsheet("option", "workbook", workbook);
				var ws = workbook.worksheets("Table data");
				$("#spreadsheet").igSpreadsheet("option", "activeWorksheet", ws);
				$("#spreadsheet").igSpreadsheet("option", "activeCell", "J15");
				$("#spreadsheet").igSpreadsheet("option", "zoomLevel", "95");
			}
		});
});
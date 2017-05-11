$(function () {
$.ig.loader({
			scriptPath: "http://staging.igniteui.local/17-1/IgniteUI/js/",
			cssPath: "http://staging.igniteui.local/17-1/IgniteUI/css/",
			resources: "igSpreadsheet,igExcel.LoadSaveXlsx,igEditors",
			ready: function () {
				$("#tabs").tabs();
				$("#spreadsheet").igSpreadsheet({
					height: "600",
					width: "100%"
				});

				var workbook = null;
				var xhr = new XMLHttpRequest();
				xhr.open('GET', 'http://staging.igniteui.local/17-1/data-files/FormattingData.xlsx', true);
				xhr.responseType = 'arraybuffer';

				xhr.onload = function (e) {
					// response is unsigned 8 bit integer
					var responseArray = new Uint8Array(this.response);
					$.ig.excel.Workbook.load(responseArray, function () {
						workbook = arguments[0];
						$("#spreadsheet").igSpreadsheet("option", "workbook", workbook);
					}, function () {
						console.log("fail");
					})
				};

				xhr.send();

				$("#zoomSlider").slider({
					change: function (event, ui) {
						$("#spreadsheet").igSpreadsheet("option", "zoomLevel", ui.value);
					},
					min: 10,
					max: 400,
					value: 100,
					step: 1
				});

				$("#zoomIn").click(function () {
					$('#spreadsheet').igSpreadsheet('executeAction', "zoomIn");
					var zoomInLevel = $('#spreadsheet').igSpreadsheet('option', "zoomLevel");
					$("#zoomSlider").slider("value", zoomInLevel);
				});
				$("#zoomOut").click(function () {
					$('#spreadsheet').igSpreadsheet('executeAction', "zoomOut");
					var zoomOutLevel = $('#spreadsheet').igSpreadsheet('option', "zoomLevel");
					$("#zoomSlider").slider("value", zoomOutLevel);
				});
				$("#zoom").click(function () {
					$('#spreadsheet').igSpreadsheet('executeAction', "zoomTo100");
					var zoomLevel = $('#spreadsheet').igSpreadsheet('option', "zoomLevel");
					$("#zoomSlider").slider("value", zoomLevel);
				});
				$("#zoomSelection").click(function () {
					$('#spreadsheet').igSpreadsheet('executeAction', "zoomToSelection");
					var zoomSelectionLevel = $('#spreadsheet').igSpreadsheet('option', "zoomLevel");
					$("#zoomSlider").slider("value", zoomSelectionLevel);
				});

				$("#split").click(function () {
					$('#spreadsheet').igSpreadsheet('executeAction', "toggleSplitPanes");
				});

				$("#gridlines").igCheckboxEditor({
					checked: true,
					valueChanged: function (evt, ui) {
						if (ui.newState) {
							$("#spreadsheet").igSpreadsheet("option", "areGridlinesVisible", true);
						} else {
							$("#spreadsheet").igSpreadsheet("option", "areGridlinesVisible", false);
						}
					}
				});
				$("#headings").igCheckboxEditor({
					checked: true,
					valueChanged: function (evt, ui) {
						if (ui.newState) {
							$("#spreadsheet").igSpreadsheet("option", "areHeadersVisible", true);
						} else {
							$("#spreadsheet").igSpreadsheet("option", "areHeadersVisible", false);
						}
					}
				});
				$("#formulabar").igCheckboxEditor({
					checked: true,
					valueChanged: function (evt, ui) {
						if (ui.newState) {
							$("#spreadsheet").igSpreadsheet("option", "isFormulaBarVisible", true);
						} else {
							$("#spreadsheet").igSpreadsheet("option", "isFormulaBarVisible", false);
						}
					}
				});
				var listItems = [{ id: 1, action: "freeze pane" }, { id: 2, action: "freeze first row" }, { id: 3, action: "freeze first column" }];
				$("#freeze").igCombo({
					dataSource: listItems,
					textKey: "action",
					valueKey: "id",
					width: "150px",
					autoSelectFirstMatch: false,
					selectionChanged: function (evt, ui) {
						if (ui.items[0].data.id == 1) {
							if (ui.items[0].data.action == "unfreeze pane") {
								listItems[0].action = "freeze pane";
								$("#freeze").igCombo("dataBind");
							} else {
								listItems[0].action = "unfreeze pane";
								$("#freeze").igCombo("dataBind");
							}
							$('#spreadsheet').igSpreadsheet('executeAction', "toggleFreezePanes");
						} else if (ui.items[0].data.id == 2) {
							$('#spreadsheet').igSpreadsheet('executeAction', "freezeFirstRow");
							listItems[0].action = "unfreeze pane";
							$("#freeze").igCombo("dataBind");
						} else {
							$('#spreadsheet').igSpreadsheet('executeAction', "freezeFirstColumn");
							listItems[0].action = "unfreeze pane";
							$("#freeze").igCombo("dataBind");
						}
					}
				});
				$("#delSheet").click(function () {
					$('#spreadsheet').igSpreadsheet('executeAction', "deleteWorksheets");
				});
				$("#delContent").click(function () {
					$('#spreadsheet').igSpreadsheet('executeAction', "clearContents");
				});
				$("#bold").click(function () {
					$('#spreadsheet').igSpreadsheet('executeAction', "toggleBold");
				});
				$("#italic").click(function () {
					$('#spreadsheet').igSpreadsheet('executeAction', "toggleItalic");
				});
				$("#underline").click(function () {
					$('#spreadsheet').igSpreadsheet('executeAction', "toggleUnderline");
				});
			}
		});
});
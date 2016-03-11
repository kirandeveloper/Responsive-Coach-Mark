var options  =  {
	"isCoachMarksDisplay" :true,
	"closeOnEscape"	: true,
	"clickAnyWhereClose" : false,
	"coachMarksItems": [
					{ "domReference":".textboxDemo",
	                "title":"Main Menu Items",
	                "description":"Lorem ipsum dolor sit amet, qui cu hinc tincidunt. Vel gubergren liberavisse te, pro ut invenire intellegam.",
	                "descPosition": "left",
	                "seqOrder":"2"
	                }, {
	                "domReference":".radioDemo",
	                "title":"Main Menu Items",
	                "description":"Lorem ipsum dolor sit amet, qui cu hinc tincidunt. Vel gubergren liberavisse te, pro ut invenire intellegam.",
	                "descPosition": "left",
	                "seqOrder":"1"
	                }, {
	                "domReference":".radioDemo1",
	                "title":"Main Menu Items",
	                "description":"Lorem ipsum dolor sit amet, qui cu hinc tincidunt. Vel gubergren liberavisse te, pro ut invenire intellegam.",
	                "descPosition": "left",
	                "seqOrder":"3"
	                }]
};
$('.coachMarks').coachMarks(options);
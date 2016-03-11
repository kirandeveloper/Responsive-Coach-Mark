(function($) {
	$.widget('CI.coachMarks', {
		
		options : {
			isCoachMarksDisplay : false,
			closeOnEscape	: false,
			clickAnyWhereClose : false,
			coachMarksItems : []
		},

		_create : function() {
			this.isCoachMarkOn = false;
			this.element.on('click.CI.coachMarks', $.proxy(this.showCoachMarks, this))
			$(window).resize($.proxy(this.reSizeCoachMarks,this));
			
		},

		_init : function() {
			if(this.options.isCoachMarksDisplay === false) {
				this.element.hide();
			}			
			this.sortCoachMarks();
		},

		sortCoachMarks : function() {
			var currentPageCoachMarks = [];	
			$.each(this.options.coachMarksItems, function(index,coachMarks) {
				if ($(coachMarks.domReference).is(':visible')) {
					currentPageCoachMarks.push(coachMarks);
				}
			});	
			currentPageCoachMarks.sort(function(a,b) { return parseFloat(a.seqOrder) - parseFloat(b.seqOrder); });	 		
			this.pagination = this.currentPageCoachMarks = currentPageCoachMarks;
		},

		showCoachMarks: function() {
			this.isCoachMarkOn = true;
			var coachMarkTemplate = '<div class="coachmarks-closeBtn"> </div>' +
									'<div class="coachmarks-coach-overlay"></div>';

			this._coachContainer = $(coachMarkTemplate).appendTo("body");
			this._coachContainer.filter('.coachmarks-closeBtn').on('click', $.proxy(this._destroy, this));
			this._coachContainer.filter('.coachmarks-coach-overlay').on('click', $.proxy(this.anyWhereClick, this));			
			$('body').on('keyup', $.proxy( this.closeOnEscape, this));
			this.createPagination();
			this.createcoachMarker();
		},

		createPagination : function() {
			this.currentPage = 0;
			var pagination = '<div class="coachmarks-paging"> <button class="coachmarks-leftNavigation"></button>'; 

			for(var i=0; i < this.currentPageCoachMarks.length; i++) {
				pagination += '<span class="coachmarks_pagination"></span>' ;
			}
			pagination += '<button class="coachmarks-rightNavigation"></button></div>';
			window.bb = $(pagination).find('.coachmarks_pagination').eq(this.currentPage)
			$(pagination).find('.coachmarks_pagination').eq(this.currentPage).addClass('active');
			this._pagination =  $(pagination).appendTo("body");

			this._pagination.find('.coachmarks_pagination').on('click', $.proxy(this.gotoPage, this, null));
			this._pagination.find('.coachmarks-rightNavigation').on('click', $.proxy(this.gotoPage, this, "right"));
			this._pagination.find('.coachmarks-leftNavigation').on('click', $.proxy(this.gotoPage, this,  "left"));
		},

		createcoachMarker : function (){
			this.removecoachMarks();
			$('<div class="coachmarks-disabled-layer"></div>' + '<div class="coachmarks-lineDiv"></div>' + '<div class="coachmarks-hintHolder"><div class="coachmarks-title"></div><div class="coachmarks-description"></div></div>' ).appendTo("body");	    					
			this.renderCoachMark();			
		},

		renderCoachMark : function(){
			var hintHolderDom = $(".coachmarks-hintHolder"),
				hintHolderTitle = $(".coachmarks-title"),
				hintHolderDescription = $(".coachmarks-description"),
				coachMarkOverlay = $(".coachmarks-coach-overlay"),
				coachMarkLineDiv = $(".coachmarks-lineDiv"),
				DisableLayer = $(".coachmarks-disabled-layer"),

		

				coachMarkObj = this.currentPageCoachMarks[this.currentPage],
				coachMarkDom = $(coachMarkObj.domReference),
				coachMarkTitle = coachMarkObj.title,
				coachMarkDescription = coachMarkObj.description,
				coachMarkPosition = coachMarkObj.descPosition.toLowerCase(),

				width = coachMarkDom.outerWidth(),
				height = coachMarkDom.outerHeight(),
				objTop = coachMarkDom.offset().top,
				objLeft = coachMarkDom.offset().left;
				
				hintHolderTitle.text(coachMarkTitle);	
				hintHolderDescription.text(coachMarkDescription);	

			var hintHolderHeight = hintHolderDom.outerHeight(),
				hintHolderWidth = hintHolderDom.outerWidth(),
				zIndexOverlay = coachMarkOverlay.css("z-index"),
				DisableLayerBorderWidth = DisableLayer.css("border-width").replace('px',''),
				lineDivDimension = 32,

				lineDivAttr, hintHolderAttr, elemDisabledAttr;
				this.constructOverlay(coachMarkDom);

				coachMarkPosition = ($(window).width() <= width + hintHolderWidth + lineDivDimension + 4) ? "bottom"  : coachMarkPosition;
			
			switch(coachMarkPosition) {
				case "right":
					lineDivAttr = {
						"width" : lineDivDimension,
						"top" : objTop + height/2,
						"left": width + objLeft,
						"z-index" : parseInt(zIndexOverlay) + 10000000
					};
					hintHolderAttr = {
						"top": objTop + height/2 - hintHolderHeight/2,
						"left":Math.max(0, width+objLeft+lineDivDimension),							
						"z-index" : parseInt(zIndexOverlay) + 10000000
					};
				break;

				case "left":
					lineDivAttr = {
						"width": lineDivDimension,
						"top" : (objTop+height/2),
						"left" : (objLeft-lineDivDimension),
						"z-index" : parseInt(zIndexOverlay) + 10000000
						};

					hintHolderAttr = {
						"top":objTop + height/2- hintHolderHeight/2,
						"left": Math.max(0, objLeft-lineDivDimension-hintHolderWidth),	
						"z-index" : parseInt(zIndexOverlay) + 10000000
					};
				break;

				case "top":
					
					lineDivAttr = {
						"height": lineDivDimension,
						"top" : objTop-lineDivDimension,
						"left" : objLeft+width/2,
						"z-index" : parseInt(zIndexOverlay) + 10000000
						};
					hintHolderAttr = {
						"top" : objTop-lineDivDimension-hintHolderHeight,
						"left": Math.max(0, objLeft+width/2- hintHolderWidth/2 ),
						"z-index" : parseInt(zIndexOverlay) + 10000000
					};
				break;

				default:
					lineDivAttr = {
						"height" : lineDivDimension,
						"top" : objTop+height,
						"left" : objLeft+(width/2),
						"z-index" : parseInt(zIndexOverlay) + 10000000
					};
					hintHolderAttr = {
						"top" : objTop+height+lineDivDimension,
						"left" : Math.max(0, objLeft + width/2 - hintHolderWidth/2),
						"z-index" : parseInt(zIndexOverlay) + 10000000
					};	 
				break;
			}

			/* Fix position to bottom on defualt if its doesnt have enough space to accomodate */
			if( hintHolderAttr.left <= 0) {
					lineDivAttr = {
						"height" : lineDivDimension,
						"top" : objTop+height,
						"left" : objLeft+(width/2),
						"z-index" : parseInt(zIndexOverlay) + 10000000
					};
					hintHolderAttr = {
						"top" : objTop+height+lineDivDimension,
						"left" : Math.max(0, objLeft + width/2 - hintHolderWidth/2),
						"z-index" : parseInt(zIndexOverlay) + 10000000
					};
			}


			elemDisabledAttr = {
				"width":width,
				"height":height,
				"left":objLeft-DisableLayerBorderWidth,
				"top":objTop-DisableLayerBorderWidth,
				"z-index": parseInt(zIndexOverlay) + 10000000
			};				
			
			coachMarkLineDiv.css(lineDivAttr);
			hintHolderDom.css(hintHolderAttr);
			DisableLayer.css(elemDisabledAttr);

			$("html,body").animate( {scrollTop: objTop - ($(window).height()/3) }, "slow");		
		},

		reSizeCoachMarks : function() {
			if (this.isCoachMarkOn){
	    	 	 this.sortCoachMarks();
	    	 	 $(".coachmarks-paging span.coachmarks_pagination").removeClass('active').eq(this.currentPage).addClass('active');
		    	 this.removecoachMarks();
		    	 this.createcoachMarker();	
		    }
		},

		gotoPage : function(index,event) {
			event.stopPropagation();
			
			var $paging = $(".coachmarks-paging");

			this.currentPage = (index === null)? $(event.currentTarget).index() - 1 : 
								(index === "right")? this.currentPage+1 : this.currentPage-1;

			$paging.find('span.active').removeClass('active');
			$paging.find("button").prop('disabled',false);

			if ( this.currentPage === 0 ) {
				$paging.find("button.coachmarks-leftNavigation").prop('disabled',true);
			}
			
			if ( this.currentPage === this.pagination.length-1 ) {
				$paging.find("button.coachmarks-rightNavigation").prop('disabled',true);
			}

			this.createcoachMarker();
			$paging.find('span').eq(this.currentPage).addClass('active');
		},

		removecoachMarks : function() {
			$(".coachmarks-coach-overlay .shadowlayer").remove();
			$(".coachmarks-disabled-layer, .coachmarks-lineDiv, .coachmarks-hintHolder").remove();
		},

		anyWhereClick : function() {
			if(this.options.clickAnyWhereClose && this.isCoachMarkOn){
				this._destroy();
			}
		},

		closeOnEscape : function() {
			if (this.options.closeOnEscape && event.keyCode === 27 && this.isCoachMarkOn){
                    this._destroy();
            }
            if (this.isCoachMarkOn && event.keyCode === 9){
            		event.preventDefault();
        	}   
		},

		constructOverlay : function(DOM) {
			var offset = $(DOM).offset(),
				height = $(DOM).outerHeight(),
				width = $(DOM).outerWidth(),
				left =  offset.left,
				top = offset.top,
				bottom = top + height,
				right = left + width,
				docWidth = $(document).width(),
				docHeight = $(document).height();

			
			$('.coachmarks-coach-overlay .shadowlayer').remove();
			innerOverlay(0, 0, docWidth, top);						// top overlay
			innerOverlay(top, 0, left, height);						// left overlay		 
			innerOverlay(bottom, 0, docWidth, docHeight-bottom);	// bottom overlay
			innerOverlay(top, right, docWidth-right, height);		// right overlay

			function innerOverlay(top,left,width,height) {
				var innerOverLay =$("<div class='shadowlayer'> </div>");
				innerOverLay.css({ "top" : top, "left" : left, "width" : width, "height" : height});
				$('.coachmarks-coach-overlay').append(innerOverLay);
			}
		},

		_destroy : function() {
			this.isCoachMarkOn = false;
			$( ".coachmarks-coach-overlay, .coachmarks-paging, .coachmarks-closeBtn").remove();
			this.removecoachMarks();
			$('body').off('keyup',function() {});
		}
	});

})(jQuery);
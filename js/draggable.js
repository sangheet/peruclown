var  w_width = $(window).width();
var position_obj = [];

var half_w_width = w_width /2;
$('.obj').each(function(){ 
  position_obj.push($(this).offset().left);
});

Draggable.create(".wrapper", {
    type: "scrollLeft",
    edgeResistance: 0.9,
    throwProps: !0,
    maxDuration: 1.2,
    minDuration: 1.2,
    lockAxis:true,
    throwProps:true,
    onThrowUpdate : function(){
    var wrapper_left = this.x *(-1) + half_w_width;

    $(position_obj).each(function( i, val ) {
         obj_c = i + 1;
         if( val < wrapper_left) {
            $('.obj').removeClass('active');
            $('#obj_'+obj_c).addClass('active');
         }
     });
    },
    snap: function(e) { 
      var span_window_w = $(window).width();
        return -Math.round(Math.round(e / (.3 * span_window_w)) * (.3 * span_window_w)) // This changes the threshold for dragging and snapping the obj's
    },
  onDragStart: function() {
  
   
    },
   onThrowComplete: function() { 
       
          TweenLite.set(".obj", {className:"+=loc"})
    }
   
   
}), TweenMax.set(".wrapper", {
    overflow: "scroll",
}), $(".wrapper").scroll(function() {
    $(".parallax").each(function() {
        var leftOffset = $(this).offset().left;
        var element_w = $(this).width();
      
        leftOffset < w_width && leftOffset + element_w > 0 && TweenLite.to($(this), 1.2, {
            xPercent: (w_width - leftOffset) / w_width * $(this).attr("data-velocity"),
            overwrite: 0
        })
    })
})
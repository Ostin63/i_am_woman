$(document).ready((function(){$(".btn-pay").click((function(){$(".btn-pay").addClass("action-btn"),$(".btn-deliv").removeClass("action-btn"),$(".delivery").addClass("action-block"),$(".pay").removeClass("action-block")})),$(".btn-deliv").click((function(){$(".btn-deliv").addClass("action-btn"),$(".btn-pay").removeClass("action-btn"),$(".delivery").removeClass("action-block"),$(".pay").addClass("action-block")}))}));
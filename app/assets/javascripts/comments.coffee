# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/
$ ->
	console.log "data", document.getElementById("comments-form")
	$("#comments-form").on "ajax:success", (ev, data)->
		console.log "entro al comment"
	$(document).on "ajax:success", "form#comments-form", (ev,data)->
		console.log "ok", data
		$(this).find("textarea").val("")
		$("#comments-box").html("<%= escape_javascript(render partial: 'comments/comments_show' ) %>")

	$(document).on "ajax:error", "form#comments-form", (ev,data)->
		console.log "error", data

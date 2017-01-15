function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

$.ajaxSetup({
    beforeSend: function(xhr, settings) {
        if (!(/^http:.*/.test(settings.url) || /^https:.*/.test(settings.url))) {
            // Only send the token to relative URLs i.e. locally.
            xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
        }
    }
});

$(document).ready(function(){
	$("#bt").click(function(){
		$.ajax({
			type: 'POST',
			url: "/",
			success: function(data, status){
                window.location.replace("main/");
            },
            error: $('#err').show(),
			data: {"username": $("#username").val(), "password": $("#password").val()},
		    beforeSend: function(xhr, settings) {
			        console.log("Before Send");
			        $.ajaxSettings.beforeSend(xhr, settings);
			    },
		})
	})
})
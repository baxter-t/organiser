var request = new  XMLHttpRequest();

request.open('GET', 'https://khpgnkcm69.execute-api.us-east-1.amazonaws.com/dev/todos', true);

request.setRequestHeader("Content-Type", "application/json");

request.onload = function() {
	var data = JSON.parse(this.response);

	if (request.status >= 200 && request.status < 400) {
		data.forEach(todo => {
			console.log(todo.text)

			// Package and add to the todo section
			$('#todoList').append('<p>' + '[' + todo.weight + '] ' + todo.text + '</p>');
		})
	} else {
		console.log('error')
	}
};

request.send();

$(document).ready(function() {
	var date = new Date();

	$('#date').append('<h5>'+ date.toDateString() +'</h5>');
})
var request = new  XMLHttpRequest();

request.open('GET', 'https://xty0xbalja.execute-api.us-east-1.amazonaws.com/dev/todos', true);

request.setRequestHeader("Content-Type", "application/json");

request.onload = function() {
	var data = JSON.parse(this.response);

        var todos = [];

	if (request.status >= 200 && request.status < 400) {
		data.forEach(todo => {
			console.log(todo.text)

			// Package and add to the todo section
                        todos.push(new Array(todo.weight, todo.text));
		})
	} else {
		console.log('error')
	}

        // Order the todos
        todos.sort(sorter);

        todos.forEach(function(element) {
                $('#todoList').append('<p>' + '[' + element[0] + '] ' + element[1] + '</p>');
        })
};

function sorter(a, b) {
        if (a[0] === b[0]) {
                return 0;
        } else {
                return (a[0] < b[0]) ? -1 : 1;
        }
}

request.send();

$(document).ready(function() {
	var date = new Date();

	$('#date').append('<h5>'+ date.toDateString() +'</h5>');
})

var requestTodos = new  XMLHttpRequest();

var TODO_URL = 'https://xty0xbalja.execute-api.us-east-1.amazonaws.com/dev/todos';
var APPT_URL = 'https://k9pu3s151h.execute-api.us-east-1.amazonaws.com/dev/appts/filter/' 

requestTodos.open('GET', TODO_URL, true);

requestTodos.setRequestHeader("Content-Type", "application/json");

requestTodos.onload = function() {
	var data = JSON.parse(this.response);

        var todos = [];

	if (requestTodos.status >= 200 && requestTodos.status < 400) {
		data.forEach(todo => {

			// Package and add to the todo section
                        todos.push(new Array(todo.weight, todo.text));
		})
	} else {
		console.log('error');
	}

        // Order the todos
        todos.sort(sorter);

        todos.forEach(function(element) {
                $('#todoList').append('<p>' + '[' + element[0] + '] ' + element[1] + '</p>');
        })
};

requestTodos.send();

var requestAppts = new XMLHttpRequest();

var date = new Date();
date.setHours(0, 0, 0, 0);
var stamp = Math.floor(date.getTime() / 1000);

requestAppts.open('GET', APPT_URL + stamp, true);
requestAppts.setRequestHeader("Content-Type", "application/json");

requestAppts.onload = function() {
        var data = JSON.parse(this.response);

        var appts = [];

        if (requestAppts.status >= 200 && requestAppts.status < 400) {
                data.forEach(appt => {

                        var start = new Date(appt.start * 1000);
                        var end = new Date(appt.end * 1000);

                        startHour = start.getHours() < 10 ? "0" + start.getHours() : start.getHours();
                        startMin = start.getMinutes() < 10 ? "0" + start.getMinutes() : start.getMinutes();

                        endHour = end.getHours() < 10 ? "0" + end.getHours() : end.getHours();
                        endMin = end.getMinutes() < 10 ? "0" + end.getMinutes() : end.getMinutes();

                        startStr = "" + startHour + ":" + startMin;
                        endStr = "" + endHour + ":" + endMin;

                        appts.push(new Array(appt.name, appt.start, startStr, endStr));
                })
        } else {
                console.log("error");
        }

        appts.sort()

        appts.forEach(function(e) {
                $('#appts').append("<p>" + e[2] + " - " + e[3] + "   " + e[0] +"</p>");
        });

}

requestAppts.send()


function isToday(date) {
        var today = new Date();

        return date.getDate() === today.getDate && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
}


function sorter(a, b) {
        if (a[0] === b[0]) {
                return 0;
        } else {
                return (a[0] < b[0]) ? -1 : 1;
        }
}


$(document).ready(function() {
	var date = new Date();

	$('#date').append('<h5>'+ date.toDateString() +'</h5>');
})

$('#newTodo').click(function() {
        alert("New todo");
        var name = prompt("Todo Name?");
        var weight = parseInt(prompt("Weight?"), 10);
        
        // $.post(TODO_URL, data, function(data, status) {
        $.ajax({
                url: TODO_URL,
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({
                        text: name, 
                        weight: weight
                }),
                dataType: 'json'
        });


});

$('#newAppt').click(function() {

        var name = "name";
        var weight = "weight";

        alert("new appt");
});



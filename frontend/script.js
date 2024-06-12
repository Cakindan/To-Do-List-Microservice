document.getElementById('task-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const taskInput = document.getElementById('task-input');
    const taskText = taskInput.value;

    if (taskText === '') return;

    // console.log('Adding task:', taskText);

    // // Call the task service to add the new task
    // fetch('http://localhost:3001/tasks', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({ task: taskText })
    // }).then(response => {
    //     if (!response.ok) {
    //         throw new Error('Network response was not ok');
    //     }
    //     return response.json();
    // }).then(data => {
    //     console.log('Task added:', data);
    //     // Add the new task to the UI
    //     addTaskToList(taskText);
    //     taskInput.value = '';
    // }).catch(error => {
    //     console.error('Error:', error);
    //     alert('Failed to add task: ' + error.message);
    // });
    
    console.log('Attempting to add task:', taskText);

    // Call the task service to add the new task
    fetch('http://localhost:3001/tasks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ task: taskText })
    }).then(response => {
        console.log('Received response:', response.status, response.statusText);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    }).then(data => {
        console.log('Task added:', data);
        // Add the new task to the UI
        addTaskToList(taskText);
        taskInput.value = '';
    }).catch(error => {
        console.error('Error adding task:', error);
        alert('Failed to add task: ' + error.message);
    });
});

// Load existing tasks
fetch('http://localhost:3001/tasks')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        const taskList = document.getElementById('task-list');
        data.tasks.forEach(task => {
            addTaskToList(task);
        });

        // Add a default task if no tasks are present
        if (data.tasks.length === 0) {
            const defaultTask = "Add task as soon as possible";
            addTaskToList(defaultTask);
            // Optionally, add the default task to the backend as well
            fetch('http://localhost:3001/tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ task: defaultTask })
            }).catch(error => console.error('Error adding default task:', error));
        }
    }).catch(error => {
        console.error('Error:', error);
        alert('Failed to load tasks: ' + error.message);
    });

// Function to add a task to the list
function addTaskToList(task) {
    const taskList = document.getElementById('task-list');
    const taskRow = document.createElement('tr');
    taskRow.innerHTML = `<td contenteditable="true">${task}</td><td><button onclick="deleteTask(this)">Delete</button></td>`;
    taskList.appendChild(taskRow);

    taskRow.querySelector('td[contenteditable="true"]').addEventListener('blur', function() {
        modifyTask(task, this.innerText);
    });
}

// Function to delete a task from the list
function deleteTask(button) {
    const taskRow = button.parentElement.parentElement;
    const taskText = taskRow.querySelector('td').innerText;

    // Call the task service to delete the task
    fetch(`http://localhost:3001/tasks/${taskText}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    }).then(data => {
        // Remove the task from the UI
        taskRow.remove();
    }).catch(error => {
        console.error('Error:', error);
        alert('Failed to delete task: ' + error.message);
    });
}

// Function to modify a task
function modifyTask(oldTask, newTask) {
    // Call the task service to modify the task
    fetch('http://localhost:3001/tasks', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ oldTask: oldTask, newTask: newTask })
    }).then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    }).then(data => {
        console.log('Task modified:', data);
    }).catch(error => {
        console.error('Error:', error);
        alert('Failed to modify task: ' + error.message);
    });
}


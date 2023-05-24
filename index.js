let todoController = (function() {

    let todo = function (id, activity) {
        this.id = id
        this.activity = activity
    }

    let data = {
        todos: []
    }

    
    return {
        addItem: function (activity) {
            let newTodo, ID;
            if (data.todos.length === 0) {
                ID = 0
            } else {
                ID = data.todos.indexOf(data.todos[data.todos.length - 1]) + 1
            }
            newTodo = new todo(ID, activity)
            data.todos.push(newTodo)
            console.log(data.todos)
            return newTodo
            
        }
    }



})()



let UIController = (function () {

    let domStrings = {
        todo: '#todo',
        deleteBtn: '.delete',
        todoListContainer: '.todo-list-container'
    }

    return {
        getTodo: function () {
            console.log('Tobi')
            return {
                activity: document.querySelector(domStrings.todo).value,
            }
        },
        clearField: function () {
            document.querySelector(domStrings.todo).value = ''
        },
        addListItem: function (todoObj) {
            let action
            action = `<div class="list-item"><div class="part-one"><button class="delete">Del</button><p class="item-text">${todoObj.activity}</p></div><div class="check"><input type="checkbox" name="checkbox" id="checkbox"></div></div>`
            
            setTimeout(() => {
                document.querySelector(domStrings.todoListContainer).insertAdjacentHTML('beforeend', action)
            }, 150);
            
          }


    }

})()
    
    

let controller = (function (tCtrl, UIctrl) {

    let itemBtn = function () {
        document.querySelector('.add-btn').addEventListener('click', addTodo)
        document.querySelector('body').addEventListener('keypress', function (e) {
            if (e.keycode === 13 || e.which === 13) {
                addTodo()
            }
        })
    }

    let addTodo = function () {
        // Get todo values
        let todoValue
        todoValue = UIctrl.getTodo()
        // Clear Fields
        
        if (todoValue.activity != '') {
            console.log(UIctrl.getTodo())
        //store todo values as objects
        tCtrl.addItem(todoValue.activity)
        // add todo values to list
            UIctrl.addListItem(todoValue)
            UIctrl.clearField()
        }
        
    }




    return {
        init: function () {
            itemBtn()
        }

    }
    
})(todoController, UIController)
controller.init()

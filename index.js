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
            
        },
        data
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
            action = `<div class="list-item" id = "item-${todoObj.id}"><div class="part-one"><button class="delete">Del</button><div class="item-text"> <p>${todoObj.activity}</p></div></div><div class="check"><input type="checkbox" name="checkbox" id="checkbox"></div></div>`
            console.log(action)
            setTimeout(() => {
                document.querySelector(domStrings.todoListContainer).insertAdjacentHTML('beforeend', action)
            }, 150);
            
        },
        domStrings
        
        


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
        document.querySelector(UIctrl.domStrings.todoListContainer).addEventListener('click', function (e) {
            let delItem, delItemArray
            delItem = e.target.parentElement.parentElement.id
            delItemArray = delItem.split('-')
            delTodo(tCtrl, delItemArray, delItem)
            console.log(delItemArray)

          })
        
    }

    let delTodo = function (sarr, iarr, iitem) {
        sarr.data.todos.forEach((i, j, k) => {
            if (i.id === Number(iarr[1])) {
                sarr.data.todos.splice(j, 1)
                document.getElementById(iitem).remove()
                console.log(sarr.data.todos)
            }
        })
    }

    let addTodo = function () {
        // Get todo values
        let todoValue,todoObject
        todoValue = UIctrl.getTodo()
        // Clear Fields
        
        if (todoValue.activity != '') {
            console.log(UIctrl.getTodo())
        //store todo values as objects
        todoObject = tCtrl.addItem(todoValue.activity)
        // add todo values to list
            UIctrl.addListItem(todoObject)
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

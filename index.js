let todoController = (function() {

    let todo = function (id, activity) {
        this.id = id
        this.activity = activity
    }

    let data = {
        todos: [],
        points: 0
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
            action = `<div class="list-item" id = "item-${todoObj.id}"><div class="part-one"><button class="delete">Del</button><div class="item-text"> <p>${todoObj.activity}</p></div></div><div class="check"><input type="checkbox" name="checkbox" class="checkbox" id="check-${todoObj.id}"></div></div>`
            console.log(action)
            setTimeout(() => {
                document.querySelector(domStrings.todoListContainer).insertAdjacentHTML('beforeend', action)
            }, 150);
            
        },
        domStrings
        
        


    }

})()
    
    

let controller = (function (tCtrl, UIctrl) {
    let y
    let itemBtn = function () {
        document.querySelector('.add-btn').addEventListener('click', addTodo)
        document.querySelector('body').addEventListener('keypress', function (e) {
            if (e.keycode === 13 || e.which === 13) {
                addTodo()
            }
        })
        document.querySelector(UIctrl.domStrings.todoListContainer).addEventListener('click', function (e) {
            let delItem, delItemArray, checkItem, checkItemArray
            console.log(e.target.tagName)
            if (e.target.tagName === 'BUTTON') {
                delItem = e.target.parentElement.parentElement.id
                delItemArray = delItem.split('-')
                delTodo(tCtrl, delItemArray, delItem)
                console.log(delItemArray)
            } else if (e.target.type === 'checkbox') {
                checkItem = e.target.id
                console.log(checkItem)
                if (document.getElementById(e.target.id).checked) {
                    checkItemArray = checkItem.split('-')
                checkk(tCtrl, checkItemArray, y)
                if (tCtrl.data.points < 50) {
                    document.querySelector('.score').textContent = `Your plans are ${tCtrl.data.points.toFixed(2)}% complete!`
                }
                else {
                    document.querySelector('.score').classList.add('win')
                    document.querySelector('.score').textContent = `Your plans are ${tCtrl.data.points.toFixed(2)}% complete!`
               
                }
                }
                
                

                // let pp = document.querySelectorAll('.checkbox')
                // pp.forEach((i, j, k) => {
                //     i.addEventListener('click', function () {  
                //          if (i.checked) {
                //         y += 5
                //         console.log(y)
                //     }
                //     })
                   
                // })
                console.log('Please help')
                // let pp = document.getElementById(e.target.id)
                // pp.forEach()
                // if (document.getElementById(e.target.id).checked) {
                //     y += 5
                //     console.log(y)
                // }
            }
            

        })
        
    }
    let checkk = function (sarr, iarr, varr) { 
        sarr.data.todos.forEach((i, j, k) => {
            if (i.id === Number(iarr[1])) {
                varr = 100 / sarr.data.todos.length
                sarr.data.points += varr
                console.log(sarr.data.points)
            }
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

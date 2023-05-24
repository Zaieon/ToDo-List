let todoController = (function() {

    let todo = function (id, activity) {
        
    }

    
    return {

    }



})()



let UIController = (function () {

    let domStrings = {
        todo: '#todo',
        deleteBtn: '.delete'
    }

    return {
        getTodo: function () {
            console.log('Tobi')
            return {
                activity: document.querySelector(domStrings.todo).value,
            }
        }

    }
})()
    
    

let controller = (function (tCtrl, UIctrl) {

    let itemBtn = function () {
        document.querySelector('.add-btn').addEventListener('click', addTodo)
        document.querySelector('body').addEventListener('keypress', function (e) {
            if (e.keycode === 13 || e.which === 13) {
                console.log('btn fired!!')
                addTodo()
            }
        })
    }

    let addTodo = function () {
        // Get todo values
        console.log(UIctrl.getTodo())
        //store todo values as objects

        // add todo values to list
    }




    return {
        init: function () {
            itemBtn()
        }

    }
    
})(todoController, UIController)
controller.init()

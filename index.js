//گرفتن تودز از لوکال استوریج
let todos = localStorage.getItem("todos");


//این ترای برای این است اگر تودز فرمتش تبدیل نشد بیاد برابرش کنه با نال و  شرطمون هم این که اگر مقدار تودز پر بود خوده تودز را نشون بده وگرنه مقدار نال
try {
    todos = JSON.parse(todos);
    todos = todos.length ? todos : null;
} catch (e) {
    todos = null;
}

//ست کردن مقدار اگر تودز برابر باشه با نال
if (!todos) {
    todos = [
        { content: "shopping", status: true},
        { content: "watch videos", status: false},
        {content: "like videos", status: true},
    ]
    localStorage.setItem("todos", JSON.stringify(todos));
}

//ایجاد یا اپدیت کردن تودز لبیست در طرح
function createTodos(todos) {
    let todosList = document.querySelector("#todos-list");
    todosList.innerHTML = "";

    //ایجاد لیست تگ با فور ایچ
    todos.forEach((todo, index) => {
        let li = document.createElement("li");
        li.className = "list-group-item";
        let content = document.createElement("span");
        content.textContent = todo.content;
        content.style.textDecoration = todo.status ? "initial" : "line-through"
        let deleteBtn = document.createElement("img");
        deleteBtn.src = "img.png";
        deleteBtn.alt = "delete icon";

        //اضافه کردن کانتنت و دکمه بی تی ان به ال ای
        li.append(content);
        li.append(deleteBtn);

        //اضافه کن ال ای را به تودز لیست
        todosList.append(li);
        
        //اضافه کردن دکمه دیلیت
        deleteBtn.addEventListener("click", e => {
            todos.splice(index, 1);
            localStorage.setItem("todos", JSON.stringify(todos));
            createTodos(todos)
        });

         //اضافه کردن دکمه خط
        content.addEventListener("click", e => {
            todos[index].status = !todos[index].status;
            localStorage.setItem("todos", JSON.stringify(todos));
            createTodos(todos)
        });
    });
};

createTodos(todos);

//اکشن اد و سرچ
let actions = document.querySelector("#actions");
let formWrapper = document.querySelector("#form-wrapper");

Array.from(actions.children).forEach(action => {
    // اضافه کردن دکمه اد
    if (action.dataset.action == "add") {
        action.addEventListener("click", e => {
            formWrapper.innerHTML = `
                <form id="add">
                    <input  name="add" id="add-input" placeholder="Add todos ...">
                </form>
            `
            createTodos(todos);
            let add = document.querySelector("#add");
            add.addEventListener("submit", e => {
                e.preventDefault();
                if (add.add.value) {
                    todos.push({ content: add.add.value, status: true });
                    add.add.value = "";
                    localStorage.setItem("todos", JSON.stringify(todos));
                    createTodos(todos);
                }
                
            })
        });
        //اضافه کردن دکمه سرچ
    } else if (action.dataset.action == "search") {
        action.addEventListener("click", e => {
            formWrapper.innerHTML = `
                <form id="search">
                    <input  name="search" id="search-input" placeholder="Search todos ...">
                </form>
            `
            let search = document.querySelector("#search");
            search.addEventListener("keyup", e => {
                e.preventDefault();
                if (search.search.value) {
                    let filterd_todos = todos.filter(
                        todo => todo.content.toLowerCase().includes(search.search.value.toLowerCase())
                    )
                    createTodos(filterd_todos);
                } else {
                    createTodos(todos);
                }
            })
        });
    }
})
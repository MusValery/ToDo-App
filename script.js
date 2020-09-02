window.onload = function () {
    let myNodelist = document.querySelector('ul');
    let app;

    function toLocal() {
        app = myNodelist.innerHTML;
        localStorage.setItem('app', app)
    }

    myNodelist.addEventListener('click', function (ev) {
        if (ev.target.tagName === "LI") {
            ev.target.classList.toggle('checked');
        } else if (ev.target.tagName === "SPAN") {
            let div = ev.target.parentNode;
            div.remove();
            toLocal();
        }
    }, false);
    for (i = 0; i < myNodelist.length; i++) {
        let span = document.createElement("SPAN");
        let txt = document.createTextNode("\u00D7");
        span.className = "close";
        span.appendChild(txt);
        myNodelist[i].appendChild(span);
    }

    let close = document.getElementsByClassName("close");
    let a;
    for (a = 0; a < close.length; a++) {
        close[a].onclick = function () {
            let div = this.parentElement;
            div.style.display = "none";
        }
    }
    document.getElementById("addBtn").addEventListener("click", newElement, false);

    function newElement() {
        let li = document.createElement("li");
        let inputValue = document.getElementById("myInput").value;
        let newText = document.createTextNode(inputValue);
        li.appendChild(newText);
        if (inputValue === '') {
            alert("You must write something!");
        } else {
            document.getElementById("list").appendChild(li);
        }
        document.getElementById("myInput").value = "";

        let span = document.createElement("SPAN");
        let txt = document.createTextNode("X");
        span.className = "close";
        span.appendChild(txt);
        li.appendChild(span);
        toLocal();

        for (a = 0; a < close.length; a++) {
            close[a].onclick = function () {
                let div = this.parentElement;
                div.style.display = "none";
            }
        }
    }

    document.getElementById("clear_all").addEventListener("click", clearAll);

    function clearAll() {
        let list = document.getElementById('list');
        document.getElementById('myInput').value = "";
        list.remove();
        let package_list = document.getElementById('package_list');
        let ul = document.createElement('ul')
        package_list.appendChild(ul);
        ul.id = "list";
        toLocal();
    }
}
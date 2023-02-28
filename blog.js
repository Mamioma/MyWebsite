const showButton = document.getElementById("addCourse");
const CourseDialog = document.getElementById("dialog");
localStorage.clear();
showButton.addEventListener('click', showResult);
const postButton = document.getElementById("post");
const cancelButton = document.getElementById("cancel");
postButton.addEventListener('click', UpPostData);
let editIndex = -1;

function UpPostData() {
    const courseTitle = cleanInput(document.getElementById("Title").value)
    const courseDate = cleanInput(document.getElementById("Date").value)
    const courseSummary = cleanInput(document.getElementById("Summary").value)


    let postData = {
        id: `${courseTitle}`,
        title: `${courseTitle}`,
        date: `${courseDate}`,
        summary: `${courseSummary}`,
    };

    let postList = localStorage.getItem("postList");
    postList = JSON.parse(postList);
    if (postList == null) {
        postList = [];
    }

    postList.push(postData);
    writePost(postData);
    localStorage.setItem("postList", JSON.stringify(postList));

    CourseDialog.close();
}

cancelButton.addEventListener('click', () => {
    CourseDialog.close();
});

function showResult() {
    CourseDialog.showModal();
}


function writePost(postData) {
    let output = document.getElementById("postData");
    let container = document.createElement("div");
    container.id = postData.title;
    let courseTitle = postData.title;
    let courseSummary = postData.summary;
    let courseDate = postData.date;

    container.innerHTML = `
                <h3>${courseTitle} ${courseDate}</h3>
                <p>${courseSummary}</p>
            `;

    let editButton = document.createElement("button");
    editButton.innerHTML = "Edit";
    editButton.type = "button";
    editButton.id = "editButton:" + courseTitle;
    editButton.addEventListener('click', editPost);
    container.appendChild(editButton);

    let deleteButton = document.createElement("button");
    deleteButton.innerHTML = "Delete";
    deleteButton.type = "button";
    deleteButton.id = "deleteButton:" + courseTitle;
    deleteButton.addEventListener('click', deletePost);
    container.appendChild(deleteButton);

    output.appendChild(container);
}

function editPost() {
    const CourseDialog2 = document.getElementById("dialog2");
    CourseDialog2.showModal();
    const postButton = document.getElementById("post2");
    const cancelButton = document.getElementById("cancel2");
    cancelButton.addEventListener('click', () => {
        CourseDialog.close();
    });
    editIndex = this.parentNode.id;
    postButton.addEventListener('click', () => {
        const courseTitle = cleanInput(document.getElementById("Title2").value);
        const courseDate = cleanInput(document.getElementById("Date2").value);
        const courseSummary = cleanInput(document.getElementById("Summary2").value);

        let postList = localStorage.getItem("postList");
        postList = JSON.parse(postList);
        let index = -1;
        for (let i = 0; i < postList.length; i++) {
            if (postList[i].id == this.parentNode.id) {
                index = i;
                break;
            }
        }
        if (index == -1) {
            console.log("error");
        }
        postList.splice(index, 1);
        postList.push(postData);
        localStorage.setItem("postList", JSON.stringify(postList));
        let output = document.getElementById("postData");
        let children = output.children;
        for (let i = 0; i < children.length; i++) {
            if (children[i].id == editIndex) {
                console.log(children[i]);
                children[i].innerHTML = `
                            <h3>${courseTitle} ${courseDate}</h3>
                            <p>${courseSummary}</p>
                        `;
                children[i].id = courseTitle;
                let editButton = document.createElement("button");
                editButton.innerHTML = "Edit";
                editButton.type = "button";
                editButton.id = "editButton:" + courseTitle;
                editButton.addEventListener('click', editPost);
                children[i].appendChild(editButton);

                let deleteButton = document.createElement("button");
                deleteButton.innerHTML = "Delete";
                deleteButton.type = "button";
                deleteButton.id = "deleteButton:" + courseTitle;
                deleteButton.addEventListener('click', deletePost);
                children[i].appendChild(deleteButton);
            }
        }
        CourseDialog2.close();
        // let container = document.getElementById("newDiv");
        // container.innerHTML = `
        //     <h3>${courseTitle} ${courseDate}</h3>
        //     <p>${courseSummary}</p>
        // `;

        // let editButton = document.createElement("button");
        // editButton.innerHTML = "Edit";
        // editButton.type = "button";
        // editButton.id = "editButton:" + courseTitle;
        // editButton.addEventListener('click', editPost);
        // container.appendChild(editButton);

        // let deleteButton = document.createElement("button");
        // deleteButton.innerHTML = "Delete";
        // deleteButton.type = "button";
        // deleteButton.id = "deleteButton:" + courseTitle;
        // deleteButton.addEventListener('click', deletePost);
        // container.appendChild(deleteButton);

        // output.replaceChild(this.parentNode, container);
    });
}

function deletePost() {
    let postList = localStorage.getItem("postList");
    postList = JSON.parse(postList);
    let index = -1;
    for (let i = 0; i < postList.length; i++) {
        if (postList[i].id == this.parentNode.id) {
            index = i;
            break;
        }
    }
    if (index == -1) {
        console.log("error");
    }
    postList.splice(index, 1);
    localStorage.setItem("postList", JSON.stringify(postList));
    let output = document.getElementById("postData");
    output.removeChild(this.parentNode);
}

function cleanInput(str) {
    return DOMPurify.sanitize(str);
}
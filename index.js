const quiz_questions = [
    {
        question: "What does the term CPU stand for?",
        type: "radio",
        options: [
            "Central Processing Unit",
            "Central Process Unit",
            "Computer Personal Unit",
            "Central Processor Unit",
        ],
        answer: "Central Processing Unit",
    },
    {
        question: "Which programming language is primarily used for web development?",
        type: "dropdown",
        options: ["Python", "JavaScript", "C++", "Java"],
        answer: "JavaScript",
    },
    {
        question: "What is the time complexity of binary search algorithm?",
        type: "checkbox",
        options: ["O(n)", "O(log n)", "O(n^2)", "O(1)"],
        answer: ["O(log n)"],
    },
    {
        question: "What is the main purpose of an operating system?",
        type: "text",
        answer: "To manage hardware and software resources",
    },
    {
        question: "Which data structure uses LIFO (Last In First Out) method?",
        type: "radio",
        options: ["Queue", "Array", "Stack", "Linked List"],
        answer: "Stack",
    },
    {
        question: "Which of the following is not a type of database?",
        type: "dropdown",
        options: ["SQL", "NoSQL", "Flat File", "HTTP"],
        answer: "HTTP",
    },
    {
        question: "What does HTML stand for?",
        type: "checkbox",
        options: [
            "HyperText Markup Language",
            "HyperText Machine Language",
            "Hyper Transfer Markup Language",
            "HyperText Marking Language",
        ],
        answer: ["HyperText Markup Language"],
    },
    {
        question: "Which sorting algorithm has the best average case time complexity?",
        type: "text",
        answer: "Merge Sort",
    },
    {
        question: "Which of the following is a NoSQL database?",
        type: "radio",
        options: ["MySQL", "PostgreSQL", "MongoDB", "SQLite"],
        answer: "MongoDB",
    },
    {
        question: "What is the purpose of DNS in networking?",
        type: "dropdown",
        options: [
            "To convert domain names to IP addresses",
            "To secure data transmission",
            "To manage network traffic",
            "To assign dynamic IP addresses",
        ],
        answer: "To convert domain names to IP addresses",
    },
    {
        question: "Which of the following is a principle of object-oriented programming?",
        type: "checkbox",
        options: ["Inheritance", "Recursion", "Abstraction", "None of the above"],
        answer: ["Inheritance", "Recursion", "Abstraction"],
    },
    {
        question: "In a relational database, a table is also known as a:",
        type: "text",
        answer: "Relation",
    },
    {
        question: "Which of the following is used to uniquely identify a record in a database table?",
        type: "radio",
        options: ["Foreign key", "Primary key", "Index", "Attribute"],
        answer: "Primary key",
    },
    {
        question: "Which protocol is used to send email?",
        type: "dropdown",
        options: ["HTTP", "FTP", "SMTP", "SNMP"],
        answer: "SMTP",
    },
    {
        question: "What does API stand for?",
        type: "checkbox",
        options: [
            "Application Program Interface",
            "Application Programming Interface",
            "Application Protocol Interface",
            "Application Proxy Interface",
        ],
        answer: ["Application Programming Interface"],
    },
    {
        question: "Which of the following is not a programming paradigm?",
        type: "text",
        answer: "Relational",
    },
    {
        question: "Which data structure is used in Breadth-First Search of a graph?",
        type: "radio",
        options: ["Stack", "Queue", "Heap", "Tree"],
        answer: "Queue",
    },
    {
        question: "What is the main difference between RAM and ROM?",
        type: "dropdown",
        options: [
            "RAM is non-volatile, ROM is volatile",
            "RAM can be written to, ROM cannot be written to",
            "RAM is used for long-term storage, ROM is used for short-term storage",
            "RAM is slower than ROM",
        ],
        answer: "RAM can be written to, ROM cannot be written to",
    },
    {
        question: "Which of the following is not an operating system?",
        type: "checkbox",
        options: ["Linux", "Windows", "MacOS", "Oracle"],
        answer: ["Oracle"],
    },
    {
        question: "Which of the following algorithms is used to find the shortest path in a graph?",
        type: "text",
        answer: "Dijkstra's Algorithm",
    },
];

let current_question = 1;
let user_score = -1;
const total_question = quiz_questions.length;

function fetch_json_data() {
    fetch("./data.json")
        .then((res) => {
            return res.json();
        })
        .then((questions) => {
            console.log(questions);
            data = questions;
        })
        .catch((err) => {
            console.log(err);
        });
    return data;
}

function isEqual(a, b) {
    return a.join() == b.join();
}

function clear_parent() {
    parent_div = document.getElementById("current_answers");
    while (parent_div.childElementCount > 0) {
        parent_div.removeChild(parent_div.lastChild);
    }
}

function prevQues() {
    current_question--;
    if (current_question < 0) {
        current_question = 0;
        show_current_question();
        document.getElementById("user_info").innerHTML = "This is the first Question";
    } else {
        show_current_question();
    }
}

function nextQues() {
    current_question++;
    if (current_question >= total_question) {
        end_screen();
    } else {
        show_current_question();
    }
}

async function checkAns() {
    // TODO - update func to account for other input types
    var current_choices = new Array();
    var current_choice;
    if (quiz_questions[current_question]["type"] == "radio") {
        options = document.getElementsByName("question_answer");
        for (var i = 0; i < options.length; i++) {
            if (options[i].checked) {
                current_choice = options[i].value;
            }
        }
        if (current_choice == quiz_questions[current_question]["answer"]) {
            user_score++;
            document.getElementById("user_info").innerHTML = "Correct Answer";
            await new Promise((r) => setTimeout(r, 750));
            nextQues();
        } else {
            document.getElementById("user_info").innerHTML = "Wrong Answer";
        }
    } else if (quiz_questions[current_question]["type"] == "checkbox") {
        current_choice = new Array();
        options = document.getElementsByName("question_answer");
        for (var i = 0; i < options.length; i++) {
            if (options[i].checked) {
                current_choices.push(options[i].value);
            }
        }
        if (isEqual(quiz_questions[current_question]["answer"], current_choices)) {
            user_score++;
            document.getElementById("user_info").innerHTML = "Correct Answer";
            await new Promise((r) => setTimeout(r, 750));
            nextQues();
        } else {
            document.getElementById("user_info").innerHTML = "Wrong Answer";
        }
    } else if (quiz_questions[current_question]["type"] == "text") {
        user_answer = document.getElementById("question_answer").value;

        if (user_answer.toLowerCase().localeCompare(quiz_questions[current_question]["answer"].toLowerCase()) == 0) {
            user_score++;
            document.getElementById("user_info").innerHTML = "Correct Answer";
            await new Promise((r) => setTimeout(r, 750));
            nextQues();
        } else {
            document.getElementById("user_info").innerHTML = "Wrong Answer";
        }
    } else {
        current_choice = document.getElementById("question_answer").value;
        if (current_choice == quiz_questions[current_question]["answer"]) {
            user_score++;
            document.getElementById("user_info").innerHTML = "Correct Answer";
            await new Promise((r) => setTimeout(r, 750));
            nextQues();
        } else {
            document.getElementById("user_info").innerHTML = "Wrong Answer";
        }
    }
}

function show_current_question() {
    clear_parent();
    document.getElementById("current_question").innerHTML = `${current_question + 1}. ${
        quiz_questions[current_question]["question"]
    }`;
    answer_container = document.getElementById("current_answers");
    document.getElementById("user_info").innerHTML = "";
    // console.clear();
    // console.log(quiz_questions[current_question]["question"]);
    // console.log(quiz_questions[current_question]["answer"]);
    // console.log(quiz_questions[current_question]["type"]);
    // console.log(quiz_questions[current_question]["options"]);

    if (quiz_questions[current_question]["type"] == "radio") {
        let current_options = quiz_questions[current_question]["options"];

        for (let i = 0; i < 4; i++) {
            var ans = current_options[i];
            current_option_btn = document.createElement("input");
            current_option_btn.setAttribute("type", "radio");
            current_option_btn.setAttribute("name", "question_answer");
            current_option_btn.setAttribute("id", `option_${i}`);
            current_option_btn.setAttribute("value", ans);

            current_option_label = document.createElement("label");
            current_option_label.setAttribute("for", `option_${i}`);
            current_option_label.setAttribute("id", `current_option_${i + 1}`);

            answer_container.appendChild(current_option_btn);
            answer_container.appendChild(current_option_label);

            document.getElementById(`current_option_${i + 1}`).innerText = ans;
            answer_container.appendChild(document.createElement("br"));
        }
    } else if (quiz_questions[current_question]["type"] == "dropdown") {
        current_dropdown_menu = document.createElement("select");
        current_dropdown_menu.setAttribute("id", "question_answer");
        // TODO - Data not Showing
        console.clear();
        for (let i = 0; i < 4; i++) {
            var ans = quiz_questions[current_question]["options"][i];
            current_dd_option = document.createElement("option");
            current_dd_option.setAttribute("value", ans);
            current_dd_option.setAttribute("id", `dd_option_${i}`);
            current_dd_option.setAttribute("textContent", ans);
            console.log(ans);
            current_dropdown_menu.appendChild(current_dd_option);
        }
        answer_container.appendChild(current_dropdown_menu);
    } else if (quiz_questions[current_question]["type"] == "text") {
        current_textarea = document.createElement("input");
        current_textarea.setAttribute("type", "text");
        current_textarea.setAttribute("id", "question_answer");
        current_textarea.setAttribute("placeholder", "Answer");
        answer_container.appendChild(current_textarea);
    } else if (quiz_questions[current_question]["type"] == "checkbox") {
        let current_options = quiz_questions[current_question]["options"];

        for (let i = 0; i < 4; i++) {
            var ans = current_options[i];
            console.log(ans);
            current_option_btn = document.createElement("input");
            current_option_btn.setAttribute("type", "checkbox");
            current_option_btn.setAttribute("name", "question_answer");
            current_option_btn.setAttribute("id", `cb_option_${i}`);
            current_option_btn.setAttribute("value", ans);

            current_option_label = document.createElement("label");
            current_option_label.setAttribute("for", `cb_option_${i}`);
            current_option_label.setAttribute("id", `current_option_${i + 1}`);
            current_option_label.setAttribute("innerHTML", ans);

            answer_container.appendChild(current_option_btn);
            answer_container.appendChild(current_option_label);
            answer_container.appendChild(document.createElement("br"));
            document.getElementById(`current_option_${i + 1}`).innerHTML = ans;
        }
    } else {
        console.log(quiz_questions[current_question]["type"]);
    }
}

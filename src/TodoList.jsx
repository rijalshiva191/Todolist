import { Form, Container, Button, Alert, Row, Col } from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.css"
import React, { useState } from 'react'
import { FaPlus, FaTrash } from "react-icons/fa"


const TodoList = () => {
    //useStatereturns an array with two values :the current state and a function to Update it.
    //the hook takes two value as an arguement and returns an updated state value as an argument and returns an updated state value whenever the setter function is called.  
    const [todoList, setTodoList] = useState([]);
    const [text, setText] = useState("");

    // //format:
    // [
    //     {

    //yo todo chai kaha define vakko xa ra maile bujina kinaki button vanda tala yo kura define gareragarya xum
    //         data:"todo"
    //         date:"current date"
    //         isCompleted:"true/false"



    //     }
    // ]

    //yini haruma hamile define garnu parxa ki nai or kina garenum tara pani chaliraxa
    //object diyeko hO?
    const addTodo = () => {

        setTodoList([
            ...todoList,
            {
                data: text,
                date: new Date().toLocaleString().split(",")[0],
                isCompleted: false
            }
        ]);
        setText(" ");
        localStorage.setItem("todos")

    }


    const toggleTodoCompletion = (idx) => {
        const newTodo = todoList.map((ram, index) => {
            if (index === idx) return { ...ram, isCompleted: !ram.isCompleted }
            else return ram;
        });
        setTodoList(newTodo);

    };

    const deleteTodo = (idx) => {

        const response = window.confirm("do you want to delete?");
        if (response) {
            const newTodo = todoList.filter((ram, index) => {
                if (index === idx) return false;
                else return true;
            });
            setTodoList(newTodo);
        }
    };






    return (



        <Container className="mt-3 text-center" >

            <h3>TodoList App</h3>
            <Form.Control
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyPress={(e) => (e.key === "Enter" ? addTodo() : null)} />
            <br />
            <Button onClick={addTodo}  >

                <FaPlus />
                <label className="ms-2">Add</label>
            </Button>
            <br />
            <br />
            {todoList.length > 0 ?
                todoList.map((ram, index) => {


                    return (
                        <Row>
                            <Col xs={9}>
                                <Alert
                                    variant={ram.isCompleted ? "danger" : "primary"}
                                    className="text-start"
                                    style={{
                                        cursor: "pointer",
                                        textDecoration: ram.isCompleted ? "line-through" : "none"
                                    }}
                                    onClick={() => toggleTodoCompletion(index)}
                                >
                                    <h3>{ram.data}</h3>
                                    <small>{ram.date}</small>
                                </Alert>
                            </Col>
                            <Col className="mt-4">
                                <FaTrash size="30" color="red" onClick={() => deleteTodo(index)} />
                            </Col>
                        </Row>

                    );


                }) : "No todos"}



        </Container>

    );

}

export default TodoList

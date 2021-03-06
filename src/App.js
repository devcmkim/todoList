import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

let todoId = 0 // todo 아이템의 id를 증가시키며 저장하는 변수

class App extends Component {
    constructor (props) {
        super(props)
        this.state = {
            todoItems: [],
            todoInput: '' //새 할일 value 값을 저장하는 state
        }
        //함수선언 -> 함수에 인스턴스 바인딩 해줘야함
        this._handleOnClickAddItem = this._handleOnClickAddItem.bind(this)
        this._handleOnChangeTodoInput = this._handleOnChangeTodoInput.bind(this)
        this._handleOnClickToggleState = this._handleOnClickToggleState.bind(this)
        this._handleOnClickRemove = this._handleOnClickRemove.bind(this)
    }

    _handleOnClickAddItem () {
        const { todoInput, todoItems } = this.state
        if (todoInput.length === 0) return alert('내용을 입력해주세요.')
        const todoItem = {
            id: todoId++,
            title: todoInput,
            isCompleted: false
        }
        const newTodoItems = todoItems.slice(0)
        newTodoItems.push(todoItem)
        this.setState({ todoItems: newTodoItems, todoInput: '' })
    }

    _handleOnChangeTodoInput (e) {
        this.setState({ todoInput: e.target.value })
    }

    _handleOnClickToggleState (index) { // index에 해당하는 아이템의 isCompleted 를 토글한다.
        const { todoItems } = this.state
        const newTodoItems = todoItems.slice(0)
        newTodoItems[index].isCompleted = !todoItems[index].isCompleted
        this.setState({ todoItems: newTodoItems })
    }

    _handleOnClickRemove (id) {
        const { todoItems } = this.state
        const newTodoItems = todoItems.filter(item => item.id !== id)
        this.setState({ todoItems: newTodoItems })
    }

    render () {
        const renderCancelButton = item => (
            <button
                className='btn btn-danger btn-sm'
                style={{ marginLeft: 5 }}
                onClick={() => this._handleOnClickRemove(item.id)}>
                삭제
            </button>
        )
        return (
            <div className='container' style={{ maxWidth: 600, padding: '40px' }}>
                <div className='row'>
                    <div className='col text-center'>
                        <div className='input-group'>
                            <input
                                type='text'
                                className='form-control'
                                placeholder='this is todolist.'
                                value={this.state.todoInput}
                                onChange={this._handleOnChangeTodoInput} //키보드 입력시에 otodoInput 의 state 가 변경됨
                                onKeyDown={e => e.keyCode === 13 ? this._handleOnClickAddItem() : null}//키보드 입력이 에네터일 경우 같은 기능 수행
                            />
                            <div className='input-group-append'>
                                <button
                                    className='btn btn-outline-secondary'
                                    onClick={this._handleOnClickAddItem}
                                >
                                    등록
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row' style={ { marginTop: 20 } }>
                    <div className='col-6'>
                        <h3>해야할 일(jenkins)</h3>
                        {
                            this.state.todoItems.filter(item => !item.isCompleted).map(item =>
                                <div key={item.id} style={{ margin: 10 }}>
                                    <span style={{ marginRight: 5 }}>- {item.title}</span>
                                    <button
                                        className='btn btn-success btn-sm'
                                        onClick={() => this._handleOnClickToggleState(item.id)}
                                    >
                                        완료
                                    </button>
                                    {renderCancelButton(item)}
                                </div>
                            )
                        }
                    </div>
                    <div className='col-6'>
                        <h3>완료한 일</h3>
                        {
                            this.state.todoItems.filter(item => item.isCompleted).map(item =>
                                <div key={item.id} style={{ margin: 10 }}>
                                    <span style={{ marginRight: 5 }}>- {item.title}</span>
                                    <button
                                        className='btn btn-warning btn-sm'
                                        onClick={() => this._handleOnClickToggleState(item.id)}
                                    >
                                        취소
                                    </button>
                                    {renderCancelButton(item)}
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
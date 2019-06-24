import React from "react";
import ToDoItem from "./todoitem.js"

class App extends React.Component {
    constructor(props) {
        super(props);
        let LSItems = JSON.parse(localStorage.getItem('items')) || [];
        this.state = {
            items: LSItems,
            text: ''
        };
        this.handleInput = this.handleInput.bind(this);
        this.formSubmit = this.formSubmit.bind(this);
        this.removeItem = this.removeItem.bind(this);
        this.editItem = this.editItem.bind(this);
    }

    handleInput(event) {
        this.setState({
            text: event.target.value
        });
    }

    formSubmit(event) {
        event.preventDefault();
        if (!this.state.text.length) {
            return undefined;
        }
        const newItem = {
            text: this.state.text,
            id: Date.now()
        };
        this.setState((state) => ({
            items: state.items.concat(newItem),
            text: ''
        }));
    }

    removeItem(id) {
        this.setState(state => {
            return {
                items: state.items.filter(item => (item.id !== id))
            };
        });
    }

    editItem(id, text) {
        this.setState( state => {
            let itemIndex = state.items.findIndex( (element) => element.id == id );
            state.items[itemIndex].text = text;
            return {
                items: state.items
            }
        } );
    }

    render() {
        localStorage.setItem('items', JSON.stringify(this.state.items));
        return (
            <div>
                <h1>Список ваших дел:</h1>
                <form onSubmit={this.formSubmit}>
                    <label htmlFor='new-todo'>
                        Введите пункт
                </label>
                    <input type='text'
                        name="new-todo"
                        value={this.state.text}
                        onChange={this.handleInput}
                    />
                    <input type='submit' value="Добавить" />
                </form>
                <ol>
                    {this.state.items.map(item => (
                        <div key={item.id} className="list-item">
                            <ToDoItem
                                item={item}
                                removeFunc={this.removeItem}
                                editFunc={this.editItem}
                            />
                        </div>
                    ))}
                </ol>
                <div className="clear-all">
                    <input type='button' value='Очистить список' onClick={ () => this.setState({items: [], text: ''}) }/>
                </div>
            </div>
        );
    }
}

export default App;
/* eslint-disable react/prop-types */
import React from "react";

class ToDoItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            edit: false,
            editText: this.props.item.text
        };
        this.changeEditState = this.changeEditState.bind(this);
        this.handleEditInput = this.handleEditInput.bind(this);
        this.handleEditBtn = this.handleEditBtn.bind(this);
    }
    changeEditState () {
        this.setState(state => ({
            edit: !state.edit
        }));
    }
    handleEditInput (event) {
        this.setState({
            editText: event.target.value
        });
    }
    handleEditBtn (id, text) {
        event.preventDefault();
        if ( !text.length ) return undefined;
        this.props.editFunc(id, text);
        this.setState({
            edit: false,
            editText: this.props.item.text
        });
    }

    render() {
        if (!this.state.edit) {
            return (
                <li>
                    {this.props.item.text}
                    <input type='button' value="Удалить" onClick={ () => this.props.removeFunc(this.props.item.id) } />
                    <input type='button' value='Редактировать' onClick={this.changeEditState} />
                </li>
            )
        } else {
            return (
                <li>
                    <form onSubmit={ () => this.handleEditBtn(this.props.item.id, this.state.editText) }>
                        <input type="text" placeholder="Введите изменения"
                            value={this.state.editText}
                            onChange={this.handleEditInput}
                        />
                        <input type="submit" value="Сохранить"/>
                    </form>
                </li>
            )
        }
    }
}

export default ToDoItem;
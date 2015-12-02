//library imports
import React from 'react';
import {markdown} from 'markdown';
//custom imports
import * as API from '../api';

class Section extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.getState(props);
    }
    componentWillReceiveProps(nextProps) {
        var state = this.getState(nextProps);
        this.setState(state);
    }
	getState = props => ({
        editing: !!props.user && props.user.username === props.section.editor,
		content: props.section.content,
        html: !!props.section.content ? markdown.toHTML(props.section.content) : ''
	})
    render() {
        let content;

        if( this.state.editing ){
            content = <textarea className="twelve columns" defaultValue={ this.state.content }
            onChange={this.updateContent} onBlur={this.save} />
        }
        else {
            content = <span dangerouslySetInnerHTML={ { __html: this.state.html } } />;
        }

        let classes = ['row', 'section'];

        if(!!this.props.user){
            classes.push('editable');
        }
        if(this.state.editing){
            classes.push('editing');
        }
        
        return <section className={ classes.join(' ') } onClick={this.startEditing} >
        	{content}
        </section>;
    }
    startEditing = evt => {
        if( !this.props.user || !!this.state.editing ){
            return;
        }
        this.setState({ editing: true});
        API.pages.child(this.props.path).update({
            editor: this.props.user.username
        });
    }
    updateContent = evt => {
        this.setState({ content: evt.target.value });
    }
    save = evt => {
        this.setState({ editing: false });
        API.pages.child(this.props.path).update({
            editor: null,
            content: this.state.content || null
        });
    }
}

export default Section;

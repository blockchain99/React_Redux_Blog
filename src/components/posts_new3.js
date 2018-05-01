import React, {Component} from 'react';
//reduxFrom is similar to connect helper in react-redux,
//allows our component to communicate with additional reducers,
//we just wired in.
//reduxForm is responsible for event handler.
import { Field, reduxForm } from 'redux-form';

class PostsNew extends Component {
//(field) arg contains event hander of two?. So Field
//can be responsible for the chang of <input>.
//field.input, obj contains bunch of event handler, bunch
//of diff props such as onChange, onBlur, onFocus ->
//{...field.input}, which is all diff props and obj
//communicated as a props to be <input> tag.
//which save codes asf.
//-- follow--
//onChange={field.input.onChange}
//onFocus={field.input.onFocus}
//onBlur={field.input.onBlur}  --end of follow

//field.meta.error automatically show
//the result of function validdate.
//rederField instead of renderTitleField.
renderField(field){
    return (
      <div className="form-group">
        <label>{field.label}</label>
        <input
          className="form-control"
          type="text"
          {...field.input}
        />
        {field.meta.error}
      </div>
    );
  }

onSubmit(values) {
  //this === component
  console.log(values);
}
//setting up actual Form inside our component.
//Field is component. in Field, We pass some properties
//such as name(1st property), component(2nd prop)
//First property of compoent Field is "title" of post.
//2nd is the func to display Field component.
//Field comp is responsible for handling any change of
//above <input>.
  render() {
//reduxForm add additional properties to be passed to
//compoent,PostsNew.To reference this.props, pull off
//handleSubmit func, in which this property is passed to
//the component on behalf of reduxForm
//this.onSubmit is callback func, excuted in diff context
//outside of our component. make sure this is our component
//So, .bind(this).
//
//properties passed to compoent
    const { handleSubmit }= this.props;
    return(
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field
          label="Title for Post"
          name="title"
          component={this.renderField}
        />
        <Field
          label="Categories"
          name="categories"
          component={this.renderField}
        />
        <Field
          label="Post Content"
          name="content"
          component={this.renderField}
        />
        <button type="submit" className="btn btn-primary">
          Submit_posts_new3
        </button>
      </form>
    );
  }
}

function validate(values) {
//console.log(values) -> {title: 'asdf',
// categories: 'asdf', content:'asdf'}
 const errors = {};
//validate the inputs from 'values'
//if errors is empty, the form is fine to submit.
//if erros has *any* properties, redux form assume
//form is invalid.

  if(values.title.length < 3) {
    errors.title = "Title must be at least 3 characters";
  }
  if(!values.title) {
    errors.title = "Enter a title.";
  }
  if(!values.categories) {
    errors.title = "Enter some categories.";
  }
  if(!values.content) {
    errors.title = "Enter some content please!";
  }
  return errors;
}
/*ReduxForm allow components to talk directly
to redux store. Let's wire up !  */
export default reduxForm({
  // validate: validate,//key:vallue ->ES6 just one
  validate,
  form: 'PostsNewForm'
})(PostsNew);

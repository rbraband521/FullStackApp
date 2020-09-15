import React from 'react';

export default (props) => {
  const {
    cancel,
    errors,
    submit,
    submitButtonText,
    elements,
  } = props;
//SUBMIT function
  function handleSubmit(event) {
    event.preventDefault();
    submit();
}
//CANCEL function 
  function handleCancel(event) {
    event.preventDefault();
    cancel();
  }
//returns the submit and cancel button and calls the functions respectively when needed
  return (
    <div>
      <ErrorsDisplay errors={errors} />
      <form onSubmit={handleSubmit}>
        {elements()}
        <div className="grid-100 pad-bottom">
          <button className="button" type="submit">{submitButtonText}</button>
          <button className="button button-secondary" onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
}
/**********VALIDATION ERROR HANDLING**********/
/* This function will display SQL validation errors on every form */
function ErrorsDisplay({ errors }) {
  let errorsDisplay = null;

  if (errors.length && typeof errors !== 'string') {
    errorsDisplay = (
      <div>
        <h2 className="validation--errors--label">Validation errors</h2>
        <div className="validation-errors">
          <ul>
            {errors.map((error, i) => <li key={i}>{error}</li>)}
          </ul>
        </div>
      </div>
    );
  } else if(errors.length && typeof errors === 'string') {
    errorsDisplay = (
        <div>
            <h2 className="validation--errors--label">Validation errors</h2>
            <div className="validation-errors">
                <ul>
                    <li key={1}>{errors}</li>
                </ul>
            </div>
        </div>
    );  
}


  return errorsDisplay;
}
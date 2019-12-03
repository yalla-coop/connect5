import Swal from 'sweetalert2';

// Copy the text and fire pop up for success
export const copyTextToClipBoard = text => {
  const element = document.createElement('p');
  element.textContent = text;
  element.setAttribute('id', 'text-element-id');

  let range;
  let selection;
  if (document.body.createTextRange) {
    range = document.body.createTextRange();
    range.moveToElementText(element);
    range.select();
  } else if (window.getSelection) {
    selection = window.getSelection();
    range = document.createRange();
    range.selectNodeContents(element);
    selection.removeAllRanges();
    selection.addRange(range);
  }

  try {
    document.execCommand('copy');
    Swal.fire({
      title: 'Success',
      text: 'Link copied!',
      type: 'success',
      timer: 2000,
      confirmButtonText: 'Ok',
    });
  } catch (err) {
    Swal.fire({
      title: 'Error',
      text: 'Unable to copy the Link',
      type: 'error',
      timer: 2000,
      confirmButtonText: 'Ok',
    });
  }
};

export const splitEmailsList = emailsAsString => {
  // split on "," & ";" and " "
  const splittedEmails = emailsAsString.split(/[, ;]/g);
  return splittedEmails.splittedEmails
    .filter(item => !!item)
    .map(item => item.trim());
};

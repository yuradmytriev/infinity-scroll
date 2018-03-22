import axios from 'axios';

const sendData = async (link, data) => await axios.post(link, data);
const getFormValues = that => {
  const form = {};
  for (const name in that.refs) {
    form[name] = that.refs[name].value;
  }
  return form;
};




export {sendData, getFormValues};
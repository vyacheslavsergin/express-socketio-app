import axios from 'axios';

class Upload {
  constructor(element) {
    this.el = element;

    this.uploadInput = this.el.querySelector('[data-upload-ref="upload-input"]');
    this.uploadBtn = this.el.querySelector('[data-upload-ref="upload-btn"]');
    this.filePath = this.el.querySelector('[data-upload-ref="file-path"]');

    this.init();
  }

  init() {
    this.uploadInput.addEventListener('change', this.onChangeUploadBtn, false);
    this.uploadBtn.addEventListener('click', this.onClickUploadBtn, false);
  }

  uploadImage = async (formData, contentType) => {
    try {
      return await axios.post('/uploadFile', formData, contentType);
    } catch (e) {
      throw new Error('Error');
    }
  }

  onClickUploadBtn = () => {
    if (this.uploadInput.value === '') {
      return false;
    }

    const formData = new FormData();

    formData.append('upload', this.uploadInput.files[0]);

    const contentType = {
      header: {'content-type': 'multipart/form-data'}
    }

    const uploadInput = this.uploadInput;
    const filePath = this.filePath;

    // const response = this.uploadImage(formData, contentType);
    // console.log('response', response);
    // response.then((res) => {
    //   console.log('res', res);
    // })

    axios.post('/uploadFile', formData, contentType)
      .then(function (response) {
        uploadInput.value = '';
        filePath.value = '';
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onChangeUploadBtn = () => {
    console.log('onChangeUploadBtn');
  }
}

export default Upload
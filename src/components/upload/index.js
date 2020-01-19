import Upload from './upload';

// const upload = [...document.querySelectorAll('[data-app-component="upload"]')].map(n => new Upload(n))

import factory from '../../general/js/factory'
factory.create(Upload, 'upload');

// export { Upload }
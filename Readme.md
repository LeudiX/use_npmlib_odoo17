# Steps to Generate QR Code in Node and use the library bundle in Odoo

- Initialize generic node app

```cmd
npm init -y
```

- Create **qrcode-bundle.js** file
- Install qrcode library

```cmd
npm install qrcode
```

- Install browserify library

```cmd
npm install browserify
```

- Create an **“entry”** JS file to bundle

```js
// src/qrcode-bundle.js
var QRCode = require('qrcode'); //Browserify will pull in the library and all its dependencies
window.MyQRCode = QRCode; // Reference namespace to use in Odoo
```

- run node name_file.js to test

- Create the cmd bundle with Browserify in your *package.json*

```json
"scripts": {
  "bundle:qrcode": "browserify src/qrcode-bundle.js -o dist/qrcode.bundle.js --debug"
}
```

- Run cmd with **npm run bundle:qrcode**

- Integrate the bundle into your Odoo module

```python
assets': {
    'web.assets_frontend': [
        'your_odoo_module/static/dist/qrcode.bundle.js',
        # ... other JS, CSS assets
    ],
    # you might also include in web.assets_backend if needed
}
```

- Use it in your OWl local component

```js
/** @odoo-module **/
import { Component, onMounted } from '@odoo/owl';

export class MyQrComponent extends Component {
  setup() {
    onMounted(() => {
      const QRCode = window.MyQRCode;
      if (!QRCode) {
        console.error('QRCode not found');
        return;
      }
      const canvas = this.el.querySelector('canvas');
      QRCode.toCanvas(canvas, this.props.text, { width: 256 })
        .then(() => {
          console.log('QR code done');
        })
        .catch(err => console.error(err));
    });
  }
}
MyQrComponent.template = 'MyModule.MyQrComponent';
```

- Then in your component related template

```xml
<t t-name="your_odoo_module.MyQrComponent">
  <canvas></canvas>
</t>
```

- For more inf visit:

[QRCode library NPM repository](https://www.npmjs.com/package/qrcode)

[Browserify documentation](https://browserify.org/)
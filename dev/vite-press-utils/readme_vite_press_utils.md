# Vite Press Utils
* currently inside project material-design-3-import-export-ext
* move me / extract to a separate project
  * probably to nuxt3-win32-posix-path?
```js
const path = require('path');

function reverseResolvePath(basePath, targetPath) {
  const resolvedBasePath = path.resolve(basePath);
  const resolvedTargetPath = path.resolve(targetPath);

  const relativePath = path.relative(resolvedBasePath, resolvedTargetPath);
  console.log(relativePath);
}

reverseResolvePath('/path/to', '/path/to/file.txt');
reverseResolvePath('/path', '/path/to/file.txt');
reverseResolvePath('/path/to/folder/inside/deep', '/path/to/file.txt');

```
```log
file.txt
to\file.txt
..\..\..\file.txt
```

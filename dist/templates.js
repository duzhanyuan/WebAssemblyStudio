{
  "empty_c": {
    "files": [
      {
        "name": "README.md",
        "data": "# Empty C Project\n"
      },
      {
        "name": "build.ts",
        "data": "import * as gulp from \"gulp\";\nimport { Service, project } from \"@wasm/studio-utils\";\n\ngulp.task(\"build\", async () => {\n  const data = await Service.compileFile(project.getFile(\"src/main.c\"), \"c\", \"wasm\", \"-g -O3\");\n  const outWasm = project.newFile(\"out/main.wasm\", \"wasm\", true);\n  outWasm.setData(data);\n});\n\ngulp.task(\"default\", [\"build\"], async () => {});\n"
      },
      {
        "name": "package.json",
        "data": "{\n  \"name\": \"@wasm/empty_c\",\n  \"description\": \"\",\n  \"version\": \"1.0.0\",\n  \"scripts\": {\n    \"build\": \"gulp --gulpfile ./build.ts\"\n  },\n  \"devDependencies\": {\n    \"@wasm/studio-utils\": \"*\",\n    \"gulp\": \"~3.9.1\",\n    \"ts-node\": \"~5.0.0\",\n    \"typescript\": \"~2.7.2\"\n  },\n  \"wasmStudio\": {\n    \"name\": \"Empty C Project\",\n    \"description\": \"# Empty C Project\",\n    \"icon\": \"c-lang-file-icon\"\n  }\n}"
      },
      {
        "name": "src/main.c",
        "data": "#define WASM_EXPORT __attribute__((visibility(\"default\")))\n\nWASM_EXPORT\nint main() {\n  return 42;\n}\n"
      },
      {
        "name": "src/main.html",
        "data": "<!DOCTYPE html>\n<html>\n<head>\n  <meta charset=\"utf-8\">\n  <style>\n    body {\n      background-color: rgb(255, 255, 255);\n    }\n  </style>\n</head>\n<body>\n  <span id=\"container\"></span>\n  <script src=\"./main.js\"></script>\n</body>\n</html>"
      },
      {
        "name": "src/main.js",
        "data": "fetch('../out/main.wasm').then(response =>\n  response.arrayBuffer()\n).then(bytes => WebAssembly.instantiate(bytes)).then(results => {\n  instance = results.instance;\n  document.getElementById(\"container\").innerText = instance.exports.main();\n});"
      }
    ]
  },
  "empty_rust": {
    "files": [
      {
        "name": "README.md",
        "data": "# Empty Rust Project\n"
      },
      {
        "name": "build.ts",
        "data": "import * as gulp from \"gulp\";\nimport { Service, project } from \"@wasm/studio-utils\";\n\ngulp.task(\"build\", async () => {\n  const options = { lto: true, opt_level: 's', debug: true };\n  const data = await Service.compileFile(project.getFile(\"src/main.rs\"), \"rust\", \"wasm\", options);\n  const outWasm = project.newFile(\"out/main.wasm\", \"wasm\", true);\n  outWasm.setData(data);\n});\n\ngulp.task(\"default\", [\"build\"], async () => {});\n"
      },
      {
        "name": "package.json",
        "data": "{\n  \"name\": \"@wasm/empty_rust\",\n  \"description\": \"\",\n  \"version\": \"1.0.0\",\n  \"scripts\": {\n    \"build\": \"gulp --gulpfile ./build.ts\"\n  },\n  \"devDependencies\": {\n    \"@wasm/studio-utils\": \"*\",\n    \"gulp\": \"~3.9.1\",\n    \"ts-node\": \"~5.0.0\",\n    \"typescript\": \"~2.7.2\"\n  },\n  \"wasmStudio\": {\n    \"name\": \"Empty Rust Project\",\n    \"description\": \"# Empty Rust Project\",\n    \"icon\": \"rust-lang-file-icon\"\n  }\n}"
      },
      {
        "name": "src/main.html",
        "data": "<!DOCTYPE html>\n<html>\n<head>\n  <meta charset=\"utf-8\">\n  <style>\n    body {\n      background-color: rgb(255, 255, 255);\n    }\n  </style>\n</head>\n<body>\n  <span id=\"container\"></span>\n  <script src=\"./main.js\"></script>\n</body>\n</html>"
      },
      {
        "name": "src/main.js",
        "data": "fetch('../out/main.wasm').then(response =>\n  response.arrayBuffer()\n).then(bytes => WebAssembly.instantiate(bytes)).then(results => {\n  instance = results.instance;\n  document.getElementById(\"container\").innerText = instance.exports.add_one(41);\n});"
      },
      {
        "name": "src/main.rs",
        "data": "#[no_mangle]\npub extern \"C\" fn add_one(x: i32) -> i32 {\n    x + 1\n}"
      }
    ]
  },
  "empty_ts": {
    "files": [
      {
        "name": "README.md",
        "data": "# Empty AssemblyScript Project\n"
      },
      {
        "name": "assembly/main.ts",
        "data": "declare function sayHello(): void;\n\nsayHello();\n\nexport function add(x: i32, y: i32): i32 {\n  return x + y;\n}\n"
      },
      {
        "name": "assembly/tsconfig.json",
        "data": "{\n  \"extends\": \"../node_modules/assemblyscript/std/assembly.json\",\n  \"include\": [\n    \"./**/*.ts\"\n  ]\n}\n"
      },
      {
        "name": "gulpfile.js",
        "data": "const gulp = require(\"gulp\");\n\ngulp.task(\"build\", callback => {\n  const asc = require(\"assemblyscript/bin/asc\");\n  asc.main([\n    \"main.ts\",\n    \"--baseDir\", \"assembly\",\n    \"--binaryFile\", \"../out/main.wasm\",\n    \"--sourceMap\",\n    \"--measure\"\n  ], callback);\n});\n\ngulp.task(\"default\", [\"build\"]);\n\ngulp.task(\"project:load\", () => { // WebAssembly Studio only\n  const utils = require(\"@wasm/studio-utils\");\n  eval(utils.project.getFile(\"setup.js\").getData());\n});\n"
      },
      {
        "name": "package.json",
        "data": "{\n  \"name\": \"@wasm/empty_ts\",\n  \"description\": \"\",\n  \"version\": \"1.0.0\",\n  \"scripts\": {\n    \"build\": \"gulp\"\n  },\n  \"devDependencies\": {\n    \"assemblyscript\": \"AssemblyScript/assemblyscript\",\n    \"gulp\": \"^3.9.1\"\n  },\n  \"wasmStudio\": {\n    \"name\": \"Empty AssemblyScript Project\",\n    \"description\": \"# Empty AssemblyScript Project\\n\\n[AssemblyScript](https://github.com/AssemblyScript/assemblyscript) compiles strictly typed TypeScript to WebAssembly using Binaryen.\\n\\nSee the [AssemblyScript wiki](https://github.com/AssemblyScript/assemblyscript/wiki) for further instructions and documentation.\",\n    \"icon\": \"typescript-lang-file-icon\"\n  }\n}"
      },
      {
        "name": "setup.js",
        "data": "// WebAssembly Studio only\nrequire.config({\n  paths: {\n    \"binaryen\": \"https://rawgit.com/AssemblyScript/binaryen.js/master/index\",\n    \"assemblyscript\": \"https://rawgit.com/AssemblyScript/assemblyscript/master/dist/assemblyscript\",\n    \"assemblyscript/bin/asc\": \"https://rawgit.com/AssemblyScript/assemblyscript/master/dist/asc\"\n  }\n});\nlogLn(\"Loading AssemblyScript compiler ...\");\nrequire([\"assemblyscript/bin/asc\"], asc => {\n  monaco.languages.typescript.typescriptDefaults.addExtraLib(asc.definitionFiles.assembly);\n  asc.main = (main => (args, options, fn) => {\n    if (typeof options === \"function\") {\n      fn = options;\n      options = undefined;\n    }\n    return main(args, options || {\n      stdout: asc.createMemoryStream(),\n      stderr: asc.createMemoryStream(logLn),\n      readFile: (filename) => {\n        const file = project.getFile(filename.replace(/^\\//, \"\"));\n        return file ? file.data : null;\n      },\n      writeFile: (filename, contents) => {\n        const name = filename.startsWith(\"/\") ? filename.substring(1) : filename;\n        const type = fileTypeForExtension(name.substring(name.lastIndexOf(\".\") + 1));\n        project.newFile(name, type, true).setData(contents);\n      },\n      listFiles: (dirname) => []\n    }, fn);\n  })(asc.main);\n  logLn(\"AssemblyScript compiler is ready!\");\n});\n"
      },
      {
        "name": "src/main.html",
        "data": "<!DOCTYPE html>\n<html>\n<head>\n  <meta charset=\"utf-8\">\n</head>\n<body style=\"background: #fff\">\n  <span id=\"container\"></span>\n  <script src=\"./main.js\"></script>\n</body>\n</html>\n"
      },
      {
        "name": "src/main.js",
        "data": "WebAssembly.instantiateStreaming(fetch(\"../out/main.wasm\"), {\n  env: {\n    sayHello: function() {\n      console.log(\"Hello from WebAssembly!\");\n    },\n    abort: function(msg, file, line, column) {\n      console.error(\"abort called at main.ts:\" + line + \":\" + column);\n    }\n  }\n}).then(result => {\n  const exports = result.instance.exports;\n  document.getElementById(\"container\").innerText = \"Result: \" + exports.add(19, 23);\n});\n"
      }
    ]
  },
  "empty_wat": {
    "files": [
      {
        "name": "README.md",
        "data": "# Empty Wat Project\n"
      },
      {
        "name": "build.ts",
        "data": "import * as gulp from \"gulp\";\nimport { Service, project } from \"@wasm/studio-utils\";\n\ngulp.task(\"build\", async () => {\n  const data = await Service.assembleWat(project.getFile(\"src/main.wat\").getData());\n  const outWasm = project.newFile(\"out/main.wasm\", \"wasm\", true);\n  outWasm.setData(data);\n});\n\ngulp.task(\"default\", [\"build\"], async () => {});\n"
      },
      {
        "name": "package.json",
        "data": "{\n  \"name\": \"@wasm/empty_wat\",\n  \"description\": \"\",\n  \"version\": \"1.0.0\",\n  \"scripts\": {\n    \"build\": \"gulp --gulpfile ./build.ts\"\n  },\n  \"devDependencies\": {\n    \"@wasm/studio-utils\": \"*\",\n    \"gulp\": \"~3.9.1\",\n    \"ts-node\": \"~5.0.0\",\n    \"typescript\": \"~2.7.2\"\n  },\n  \"wasmStudio\": {\n    \"name\": \"Empty Wat Project\",\n    \"description\": \"# Empty Wat Project\",\n    \"icon\": \"wat-lang-file-icon\"\n  }\n}"
      },
      {
        "name": "src/main.html",
        "data": "<!DOCTYPE html>\n<html>\n<head>\n  <meta charset=\"utf-8\">\n  <style>\n    body {\n      background-color: rgb(255, 255, 255);\n    }\n  </style>\n</head>\n<body>\n  <span id=\"container\"></span>\n  <script src=\"./main.js\"></script>\n</body>\n</html>"
      },
      {
        "name": "src/main.js",
        "data": "fetch('../out/main.wasm').then(response =>\n  response.arrayBuffer()\n).then(bytes => WebAssembly.instantiate(bytes)).then(results => {\n  instance = results.instance;\n  document.getElementById(\"container\").innerText = instance.exports.add(1,1);\n});\n"
      },
      {
        "name": "src/main.wat",
        "data": "(module\n  (func $add (param $lhs i32) (param $rhs i32) (result i32)\n    get_local $lhs\n    get_local $rhs\n    i32.add)\n  (export \"add\" (func $add))\n)"
      }
    ]
  },
  "hello_world_c": {
    "files": [
      {
        "name": "README.md",
        "data": "# Hello World in C\n\nLevel: *Advanced*\n\nThis project prints `\"Hello World\"` using the well known C `printf` function. This function in turn uses several POSIX APIs that are implemented in JavaScript using DOM APIs.\n\n### Project Overview\n\n* `main.c` - Imports `stdio.h` and calls `printf(\"Hello World\")`.\n* `main.js` - Initializes a runtime environment for the WebAssembly module and implements the necessary WebAssembly imports.\n\n### Things to Explore\n\n1. Click Build to compile `main.c` file to `out/main.wasm`.\n\n2. Open the `out/main.wasm` file and notice that there's quite a bit of code. This is somewhat surprising given that our program is so small. The vast majority of this code implements the `printf` function. \n\n3. Notice the imports section, these are SysCalls. To get this WebAssembly module running you'll have to implement these functions first. However, note that these import names don't actually tell you what SysCalls are used, they are merely function stubs (one for each number of parameters). \n\n```\n  (import \"env\" \"__syscall0\" (func $env.__syscall0 (type $t2)))\n  (import \"env\" \"__syscall3\" (func $env.__syscall3 (type $t5)))\n  (import \"env\" \"__syscall1\" (func $env.__syscall1 (type $t8)))\n  ...\n```\n\n4. To figure that out which SysCalls are being used, you'll have to run the module. I ran it and got `45`, `146` and `192`. You can figure out what these numbers mean by looking them up in the [Linux SysCall Reference](https://syscalls.kernelgrok.com/). They are [brk()](http://man7.org/linux/man-pages/man2/brk.2.html), [writev()](http://man7.org/linux/man-pages/man2/writev.2.html) and [mmap()](http://man7.org/linux/man-pages/man2/mmap2.2.html). To make this WebAssembly module run, you'll just have to implement a tiny Linux kernel in JavaScript, no biggie.\n\n5. Take a look at `src/main.js`, this file emulates these basic SysCalls in JavaScript.\n\n6. `brk()` can be stubbed to return `0`, which is the success error code. `brk()` is used to allocate more memory to a process. WebAssembly does handles memory differently, so there's no need to do special here. \n\n7. `mmap2()` is used to request more memory within the process. In our example, it's implemented as a call to the WebAssembly `memory.grow()` function.\n\n8. `writev()` is used to write data to files. Its signature is `writev(int fd, const struct iovec *iov, int iovcnt)`. We can ignore the `fd` file descriptor parameter, and focus on the `iov` structure. The problem here is that on the JavaScript side we have a hard time pulling the `struct iovec` abart. We could figure it out, but a neat hack is to call back into the WebAssembly module and have some C code unpack it for us.\n\n9. Click Run\n\n```\nHello World\n```"
      },
      {
        "name": "build.ts",
        "data": "import * as gulp from \"gulp\";\nimport { Service, project } from \"@wasm/studio-utils\";\n\ngulp.task(\"build\", async () => {\n  const data = await Service.compileFile(project.getFile(\"src/main.c\"), \"c\", \"wasm\", \"-g -O3\");\n  const outWasm = project.newFile(\"out/main.wasm\", \"wasm\", true);\n  outWasm.setData(data);\n});\n\ngulp.task(\"default\", [\"build\"], async () => {});\n"
      },
      {
        "name": "package.json",
        "data": "{\n  \"name\": \"@wasm/hello_world_c\",\n  \"description\": \"\",\n  \"version\": \"1.0.0\",\n  \"scripts\": {\n    \"build\": \"gulp --gulpfile ./build.ts\"\n  },\n  \"devDependencies\": {\n    \"@wasm/studio-utils\": \"*\",\n    \"gulp\": \"~3.9.1\",\n    \"ts-node\": \"~5.0.0\",\n    \"typescript\": \"~2.7.2\"\n  },\n  \"wasmStudio\": {\n    \"name\": \"Hello World in C\",\n    \"description\": \"# Hello World in C\\n\\nPrint \\\\`Hello World\\\\` using a minimal POSIX API.\\nLevel: *Advanced*\\nTopics: Low-Level, Memory, Linux, System Calls\",\n    \"icon\": \"c-lang-file-icon\"\n  }\n}"
      },
      {
        "name": "src/main.c",
        "data": "#include <stdio.h>\n#include <sys/uio.h>\n\n#define WASM_EXPORT __attribute__((visibility(\"default\")))\n\nWASM_EXPORT\nint main() {\n  printf(\"Hello World\\n\");\n}\n\n/* External function that is implemented in JavaScript. */\nextern putc_js(char c);\n\n/* Basic implementation of the writev sys call. */ \nWASM_EXPORT\nsize_t writev_c(int fd, const struct iovec *iov, int iovcnt) {\n  size_t cnt = 0;\n  for (int i = 0; i < iovcnt; i++) {\n    for (int j = 0; j < iov[i].iov_len; j++) {\n      putc_js(((char *)iov[i].iov_base)[j]);\n    }\n    cnt += iov[i].iov_len;\n  }\n  return cnt;\n}"
      },
      {
        "name": "src/main.html",
        "data": "<!DOCTYPE html>\n<html>\n<head>\n  <meta charset='utf-8'>\n  <style>\n    body {\n        background-color: green;\n    }\n  </style>\n</head>\n<body>\n  <span id=\"container\"></span>\n  <script src=\"./main.js\"></script>\n</body>\n</html>"
      },
      {
        "name": "src/main.js",
        "data": "let x = '../out/main.wasm';\n\nlet instance = null;\nlet memoryStates = new WeakMap();\n\nfunction syscall(instance, n, args) {\n  switch (n) {\n    default:\n      // console.log(\"Syscall \" + n + \" NYI.\");\n      break;\n    case /* brk */ 45: return 0;\n    case /* writev */ 146:\n      return instance.exports.writev_c(args[0], args[1], args[2]);\n    case /* mmap2 */ 192:\n      debugger;\n      const memory = instance.exports.memory;\n      let memoryState = memoryStates.get(instance);\n      const requested = args[1];\n      if (!memoryState) {\n        memoryState = {\n          object: memory,\n          currentPosition: memory.buffer.byteLength,\n        };\n        memoryStates.set(instance, memoryState);\n      }\n      let cur = memoryState.currentPosition;\n      if (cur + requested > memory.buffer.byteLength) {\n        const need = Math.ceil((cur + requested - memory.buffer.byteLength) / 65536);\n        memory.grow(need);\n      }\n      memoryState.currentPosition += requested;\n      return cur;\n  }\n}\n\nlet s = \"\";\nfetch(x).then(response =>\n  response.arrayBuffer()\n).then(bytes =>\n  WebAssembly.instantiate(bytes, {\n    env: {\n      __syscall0: function __syscall0(n) { return syscall(instance, n, []); },\n      __syscall1: function __syscall1(n, a) { return syscall(instance, n, [a]); },\n      __syscall2: function __syscall2(n, a, b) { return syscall(instance, n, [a, b]); },\n      __syscall3: function __syscall3(n, a, b, c) { return syscall(instance, n, [a, b, c]); },\n      __syscall4: function __syscall4(n, a, b, c, d) { return syscall(instance, n, [a, b, c, d]); },\n      __syscall5: function __syscall5(n, a, b, c, d, e) { return syscall(instance, n, [a, b, c, d, e]); },\n      __syscall6: function __syscall6(n, a, b, c, d, e, f) { return syscall(instance, n, [a, b, c, d, e, f]); },\n      putc_js: function (c) {\n        c = String.fromCharCode(c);\n        if (c == \"\\n\") {\n          console.log(s);\n          s = \"\";\n        } else {\n          s += c;\n        }\n      }\n    }\n  })\n).then(results => {\n  instance = results.instance;\n  document.getElementById(\"container\").innerText = instance.exports.main();\n});\n"
      }
    ]
  },
  "hello_world_rust": {
    "files": [
      {
        "name": "README.md",
        "data": "# \"Hello, World!\" Rust Project\n\nThis is a sample Rust project which uses the [`wasm_bindgen` crate][crate] to\nenable richer interactions between Rust and JS such as communicating with\nstrings rather than just numbers.\n\nTypically `wasm-bindgen` is paired with a bundler but here we're not using a\nbundler so you can poke around all the raw output!\n\nSome files you may be interested in are:\n\n* `main.rs` - this is the main body of Rust code, annotated with\n  `#[wasm_bindgen]` to have its functionality exported to JS.\n* `main.js` - this is the application's supporting JS, automatically run by\n  `main.html`. Here you'll import items implemented in Rust through the\n  `wasmBindgen` global.\n\nWhen building the project you'll get `out/main_bg.wasm`, the generated wasm\nfiltered through the `wasm-bindgen` CLI tool, as well as `out/main.js` which is\nan auxiliary JS file generated by the `wasm-bindgen` tool, included by default\nin `main.html`. The `out/main.js` file is responsible for creating the\n`wasmBindgen` global and filling it in.\n\n[crate]: https://github.com/rustwasm/wasm-bindgen\n"
      },
      {
        "name": "build.ts",
        "data": "import * as gulp from \"gulp\";\nimport { Service, project } from \"@wasm/studio-utils\";\n\ngulp.task(\"build\", async () => {\n  // Optimize for small builds for now\n  const options = { lto: true, opt_level: 's', debug: true };\n  const libSrc = project.getFile(\"src/lib.rs\");\n  const data = await Service.compileFileWithBindings(libSrc, \"rust\", \"wasm\", options);\n\n  const outWasm = project.newFile(\"out/main_bg.wasm\", \"wasm\", true);\n  outWasm.setData(data.wasm);\n  const outJs = project.newFile(\"out/main.js\", \"javascript\", true);\n  outJs.setData(data.wasmBindgenJs);\n});\n\ngulp.task(\"default\", [\"build\"], async () => {});\n"
      },
      {
        "name": "package.json",
        "data": "{\n  \"name\": \"@wasm/hello_world_rust\",\n  \"description\": \"\",\n  \"version\": \"1.0.0\",\n  \"scripts\": {\n    \"build\": \"gulp --gulpfile ./build.ts\"\n  },\n  \"devDependencies\": {\n    \"@wasm/studio-utils\": \"*\",\n    \"gulp\": \"~3.9.1\",\n    \"ts-node\": \"~5.0.0\",\n    \"typescript\": \"~2.7.2\"\n  },\n  \"wasmStudio\": {\n    \"name\": \"Hello World Rust Project\",\n    \"description\": \"# Hello World Rust Project\",\n    \"icon\": \"rust-lang-file-icon\"\n  }\n}\n"
      },
      {
        "name": "src/lib.rs",
        "data": "// Current prelude for using `wasm_bindgen`, and this'll get smaller over time!\n#![feature(proc_macro, wasm_custom_section, wasm_import_module)]\nextern crate wasm_bindgen;\nuse wasm_bindgen::prelude::*;\n\n// Here we're importing the `alert` function from the browser, using\n// `#[wasm_bindgen]` to generate correct wrappers.\n#[wasm_bindgen]\nextern {\n    fn alert(s: &str);\n}\n\n// Here we're exporting a function called `greet` which will display a greeting\n// for `name` through a dialog.\n#[wasm_bindgen]\npub fn greet(name: &str) {\n    alert(&format!(\"Hello, {}!\", name));\n}\n"
      },
      {
        "name": "src/main.html",
        "data": "<!DOCTYPE html>\n<html>\n<head>\n  <meta charset=\"utf-8\">\n  <style>\n    body {\n      background-color: rgb(255, 255, 255);\n    }\n  </style>\n</head>\n<body>\n  <span id=\"container\"></span>\n  <script src=\"../out/main.js\"></script>\n  <script src=\"./main.js\"></script>\n</body>\n</html>\n"
      },
      {
        "name": "src/main.js",
        "data": "const { greet } = wasm_bindgen;\n\nfunction runApp() {\n  greet('World');\n}\n\n// Load and instantiate the wasm file, and we specify the source of the wasm\n// file here. Once the returned promise is resolved we're ready to go and\n// use our imports.\nwasm_bindgen('../out/main_bg.wasm').then(runApp);\n"
      }
    ]
  }
}